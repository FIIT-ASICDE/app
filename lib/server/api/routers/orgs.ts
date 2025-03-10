import {
    createOrgProcedureSchema,
    editOrganisationProcedureSchema,
    leaveOrgSchema,
} from "@/lib/schemas/org-schemas";
import { pinnedRepos } from "@/lib/server/api/routers/repos";
import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure,
} from "@/lib/server/api/trpc";
import { Invitation, InvitationStatus } from "@/lib/types/invitation";
import {
    Organisation,
    OrganisationDisplay,
    OrganisationMember,
    OrganisationOverview,
    OrganisationRole,
    OrganizationSettings,
} from "@/lib/types/organisation";
import { UserDisplay } from "@/lib/types/user";
import { PrismaType } from "@/prisma";
import { $Enums, Organization, OrganizationRole } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { Session } from "next-auth";
import { z } from "zod";

export const orgRouter = createTRPCRouter({
    create: createOrg(),
    edit: editOrg(),
    overview: orgOverview(),
    search: search(),
    byName: byName(),
    userOrgs: usersOrgs(),
    getMembers: getMembers(),
    fetchUserOrgs: fetchUserOrgs(),
    leave: leave(),
    delete: deleteOrg(),
    settings: settings(),
    setShowMembers: setShowMembers(),
    promoteToAdmin: promoteToAdmin(),
    expelMember: expelMember(),
});

function getMembers() {
    return protectedProcedure
        .input(
            z.object({
                organisationName: z.string(),
                nameSearchTerm: z.string().optional(),
                roleFilter: z.enum(["ADMIN", "MEMBER"]).optional(),
                page: z.number().min(1),
                pageSize: z.number().min(1).max(100),
            }),
        )
        .query(async ({ ctx, input }) => {
            const {
                organisationName,
                nameSearchTerm,
                roleFilter,
                page,
                pageSize,
            } = input;
            const decodedOrganisationName =
                decodeURIComponent(organisationName);
            const decodedQuery = decodeURIComponent(nameSearchTerm ?? "");
            const prisma = ctx.prisma;

            const organization = await prisma.organization.findUnique({
                where: { name: decodedOrganisationName },
            });

            if (!organization) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Organization not found",
                });
            }

            const isMember = await isUserMember(prisma, {
                by: "id",
                id: ctx.session.user.id,
            });
            if (!isMember || organization.hideMembers) {
                return {
                    members: [],
                    pagination: {
                        total: 0,
                        pageCount: 0,
                        page,
                        pageSize,
                    },
                };
            }

            const organizationId = organization.id;

            const totalCount = await prisma.organizationUser.count({
                where: {
                    organizationId,
                    userMetadata: {
                        user: {
                            name: {
                                contains: decodedQuery || "",
                                mode: "insensitive",
                            },
                        },
                    },
                    role: roleFilter,
                },
            });

            const members = await prisma.organizationUser.findMany({
                where: {
                    organizationId,
                    userMetadata: {
                        user: {
                            name: {
                                contains: decodedQuery || "",
                                mode: "insensitive",
                            },
                        },
                    },
                    role: roleFilter,
                },
                include: {
                    userMetadata: {
                        include: {
                            user: true,
                        },
                    },
                },
                orderBy: { userMetadata: { user: { name: "asc" } } },
                skip: (page - 1) * pageSize,
                take: pageSize,
            });

            return {
                members: members.map((member) => ({
                    id: member.userMetadata.user.id,
                    username: member.userMetadata.user.name ?? "",
                    name: member.userMetadata.firstName,
                    surname: member.userMetadata.surname,
                    image:
                        member.userMetadata.user.image ||
                        "/avatars/default.png",
                    role: mapOrganizationRoleToOrganisationRole(member.role),
                })),
                pagination: {
                    total: totalCount,
                    pageCount: Math.ceil(totalCount / pageSize),
                    page,
                    pageSize,
                },
            };
        });
}

function createOrg() {
    return protectedProcedure
        .input(createOrgProcedureSchema)
        .mutation(async ({ ctx, input }): Promise<Organisation> => {
            const { name, image, bio, initialMembers = [] } = input;

            const existingOrg = await ctx.prisma.organization.findFirst({
                where: { name },
            });

            if (existingOrg) {
                throw new TRPCError({
                    code: "CONFLICT",
                    message: "An organization with this name already exists",
                });
            }

            return await ctx.prisma.$transaction(async (tx) => {
                const creatorUserMetadata =
                    await tx.userMetadata.findFirstOrThrow({
                        where: { userId: ctx.session.user.id },
                    });

                const initialMembersMetadata = await tx.userMetadata.findMany({
                    where: { userId: { in: initialMembers } },
                });

                const organization = await tx.organization.create({
                    data: {
                        name,
                        bio,
                        image,
                        users: {
                            create: [
                                {
                                    userMetadataId: creatorUserMetadata.id,
                                    role: $Enums.OrganizationRole.ADMIN,
                                },
                                ...initialMembersMetadata.map((metadata) => ({
                                    userMetadataId: metadata.id,
                                    role: $Enums.OrganizationRole.MEMBER,
                                })),
                            ],
                        },
                    },
                });

                const orgUsers = await tx.organization.findUnique({
                    where: { id: organization.id },
                    include: {
                        users: {
                            include: {
                                userMetadata: {
                                    select: {
                                        firstName: true,
                                        surname: true,
                                        user: true,
                                    },
                                },
                            },
                        },
                    },
                });

                if (!orgUsers) {
                    throw new TRPCError({
                        code: "INTERNAL_SERVER_ERROR",
                        message: "Failed to create organization",
                    });
                }

                return {
                    id: orgUsers.id,
                    name: orgUsers.name,
                    image: orgUsers.image ?? undefined,
                    bio: orgUsers.bio ?? undefined,
                    createdAt: orgUsers.createdAt,
                    repositories: [],
                    members: orgUsers.users.map(({ userMetadata, role }) => ({
                        id: userMetadata.user.id,
                        // AuthJS requires name to be nullable, but it will be always there
                        //  if not there is a bug
                        username: userMetadata.user.name!,
                        name: userMetadata.firstName,
                        surname: userMetadata.surname,
                        image: userMetadata.user.image || undefined,
                        role: role === "ADMIN" ? "admin" : "member",
                    })),
                } satisfies Organisation;
            });
        });
}

function editOrg() {
    return protectedProcedure
        .input(editOrganisationProcedureSchema)
        .mutation(async ({ ctx, input }) => {
            const { org, userRole } = await getOrgAsMember(
                ctx.prisma,
                ctx.session.user.id,
                {
                    by: "id",
                    id: input.orgId,
                },
            );

            if (userRole !== $Enums.OrganizationRole.ADMIN) {
                throw new TRPCError({
                    code: "FORBIDDEN",
                    message: "You are not an admin of this organization",
                });
            }

            return await ctx.prisma.organization.update({
                where: { id: input.orgId },
                data: {
                    name: input.name ?? org.name,
                    bio: input.bio ?? org.bio,
                    image: input.image ?? org.image,
                },
                select: { name: true, bio: true, image: true },
            });
        });
}

function search() {
    return protectedProcedure
        .input(
            z.object({
                nameSearchTerm: z.string().optional(),
                page: z.number().min(1),
                pageSize: z.number().min(1).max(100),
            }),
        )
        .query(async ({ ctx, input }) => {
            const { nameSearchTerm, page, pageSize } = input;
            const prisma = ctx.prisma;

            const totalCount = await prisma.organization.count({
                where: {
                    name: {
                        contains: nameSearchTerm || "",
                        mode: "insensitive",
                    },
                },
            });

            const organizations = await prisma.organization.findMany({
                where: {
                    name: {
                        contains: nameSearchTerm || "",
                        mode: "insensitive",
                    },
                },
                include: {
                    _count: {
                        select: { users: true },
                    },
                },
                orderBy: { name: "asc" },
                skip: (page - 1) * pageSize,
                take: pageSize,
            });

            return {
                organisations: organizations.map((org) => ({
                    id: org.id,
                    name: org.name,
                    image: org.image || "/avatars/default.png",
                    bio: org.bio || undefined,
                    memberCount: org._count.users,
                })),
                pagination: {
                    total: totalCount,
                    pageCount: Math.ceil(totalCount / pageSize),
                    page,
                    pageSize,
                },
            };
        });
}

function byName() {
    return publicProcedure
        .input(z.string())
        .query(async ({ ctx, input }): Promise<OrganisationDisplay> => {
            const decodedInput = decodeURIComponent(input);
            const { org } = await orgByName(
                ctx.prisma,
                decodedInput,
                ctx.session?.user,
            );

            const userRole = org.members.find(
                (m) => m.id === ctx.session?.user.id,
            )?.role;

            return {
                id: org.id,
                name: org.name,
                image: org.image ?? undefined,
                bio: org.bio ?? undefined,
                memberCount: org.members.length,
                userRole,
            };
        });
}

function orgOverview() {
    return publicProcedure
        .input(z.string())
        .query(async ({ ctx, input }): Promise<OrganisationOverview> => {
            const decodedInput = decodeURIComponent(input);
            const { isUserAdmin, org } = await orgByName(
                ctx.prisma,
                decodedInput,
                ctx.session?.user,
            );
            const pinnedOrgRepos = await pinnedRepos(
                ctx.prisma,
                org.id,
                isUserAdmin,
            );

            return {
                isUserAdmin,
                organisation: {
                    id: org.id,
                    name: org.name,
                    image: org.image ?? undefined,
                    bio: org.bio ?? undefined,
                    createdAt: org.createdAt,
                    members: org.members,
                    repositories: pinnedOrgRepos,
                },
            };
        });
}

function fetchUserOrgs() {
    return protectedProcedure
        .input(
            z.object({
                username: z.string(),
                nameSearchTerm: z.string().optional(),
                roleFilter: z.enum(["ADMIN", "MEMBER"]).optional(),
                page: z.number().min(1),
                pageSize: z.number().min(1).max(100),
            }),
        )
        .query(async ({ ctx, input }) => {
            const { username, nameSearchTerm, roleFilter, page, pageSize } =
                input;
            const decodedUsername = decodeURIComponent(username);
            const decodedQuery = decodeURIComponent(nameSearchTerm ?? "");
            const prisma = ctx.prisma;

            const user = await prisma.user.findFirst({
                where: { name: decodedUsername },
                include: { metadata: true },
            });

            if (!user || !user.metadata) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "User not found",
                });
            }

            const userMetadataId = user.metadata.id;

            const totalCount = await prisma.organizationUser.count({
                where: {
                    userMetadataId,
                    organization: {
                        name: {
                            contains: decodedQuery || "",
                            mode: "insensitive",
                        },
                    },
                    role: roleFilter,
                },
            });

            const organizations = await prisma.organizationUser.findMany({
                where: {
                    userMetadataId,
                    organization: {
                        name: {
                            contains: decodedQuery || "",
                            mode: "insensitive",
                        },
                    },
                    role: roleFilter,
                },
                include: {
                    organization: {
                        include: {
                            _count: {
                                select: { users: true },
                            },
                        },
                    },
                },
                orderBy: { organization: { name: "asc" } },
                skip: (page - 1) * pageSize,
                take: pageSize,
            });

            return {
                usersOrganisations: organizations.map((orgUser) => ({
                    id: orgUser.organization.id,
                    name: orgUser.organization.name,
                    image: orgUser.organization.image || "/avatars/default.png",
                    bio: orgUser.organization.bio || undefined,
                    memberCount: orgUser.organization._count.users,
                    userRole: orgUser.role.toLowerCase() as OrganisationRole,
                })),
                pagination: {
                    total: totalCount,
                    pageCount: Math.ceil(totalCount / pageSize),
                    page,
                    pageSize,
                },
            };
        });
}

async function orgByName(
    prisma: PrismaType,
    name: string,
    currentUser?: Session["user"],
): Promise<{
    isUserAdmin: boolean;
    org: Omit<Organisation, "repositories">;
}> {
    const organization = await prisma.organization.findFirst({
        where: { name },
        include: {
            users: {
                include: { userMetadata: { include: { user: true } } },
            },
        },
    });

    if (!organization) {
        throw new TRPCError({
            code: "NOT_FOUND",
            message: "Organization not found",
        });
    }

    const isMember = await isUserMember(prisma, {
        by: "id",
        id: currentUser!.id,
    });

    const members: Array<OrganisationMember> =
        !isMember || organization.hideMembers
            ? []
            : organization.users
                  .map(({ userMetadata, role }) => ({
                      id: userMetadata.user.id,
                      username: userMetadata.user.name!,
                      name: userMetadata.firstName,
                      surname: userMetadata.surname,
                      image: userMetadata.user.image || undefined,
                      role: (role === "ADMIN"
                          ? "admin"
                          : "member") as OrganisationRole,
                  }))
                  .sort((a, b) => {
                      if (a.role === "admin" && b.role === "member") return -1;
                      if (a.role === "member" && b.role === "admin") return 1;
                      return a.name.localeCompare(b.name);
                  });
    const isUserAdmin = members.some(
        (m) => m.id === currentUser?.id && m.role === "admin",
    );

    return {
        isUserAdmin,
        org: {
            id: organization.id,
            name: organization.name,
            image: organization.image ?? undefined,
            bio: organization.bio ?? undefined,
            createdAt: organization.createdAt,
            members,
        },
    };
}

function usersOrgs() {
    return publicProcedure
        .input(
            z.object({
                usersId: z.string().uuid().optional(),
                role: z.nativeEnum($Enums.OrganizationRole).optional(),
            }),
        )
        .query(
            async ({
                ctx,
                input,
            }): Promise<
                Array<Omit<OrganisationDisplay, "memberCount">> | undefined
            > => {
                if (!input.usersId || !ctx.session || !ctx.session.user.id) {
                    return undefined;
                }

                const orgs = await ctx.prisma.organizationUser.findMany({
                    where: {
                        AND: [
                            { userMetadata: { userId: input.usersId } },
                            input.role ? { role: input.role } : {},
                        ],
                    },
                    include: { organization: true },
                });

                return orgs.map(({ role, organization: org }) => {
                    const userOrg: Omit<OrganisationDisplay, "memberCount"> = {
                        id: org.id,
                        name: org.name,
                        image: org.image ?? undefined,
                        bio: org.bio ?? undefined,
                        userRole: role === "ADMIN" ? "admin" : "member",
                    };
                    return userOrg;
                });
            },
        );
}

function leave() {
    return protectedProcedure
        .input(leaveOrgSchema)
        .mutation(async ({ ctx, input }) => {
            const { organizationId, newAdminUserId } = input;
            const userId = ctx.session.user.id;

            const currentUser = await ctx.prisma.user.findUnique({
                where: { id: userId },
                include: { metadata: true },
            });

            if (!currentUser?.metadata) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "User metadata not found",
                });
            }

            const userMetadataId = currentUser.metadata.id;

            return ctx.prisma.$transaction(async (tx) => {
                // 1. check if the user is a member of the organization
                const userOrg = await tx.organizationUser.findUnique({
                    where: {
                        userMetadataId_organizationId: {
                            userMetadataId,
                            organizationId,
                        },
                    },
                });

                if (!userOrg) {
                    throw new TRPCError({
                        code: "NOT_FOUND",
                        message: "You are not a member of this organization",
                    });
                }

                // 2. count total members in the organization
                const memberCount = await tx.organizationUser.count({
                    where: { organizationId },
                });

                // 3. check if user is the only member
                if (memberCount === 1) {
                    // check if organization has any repositories
                    const repoCount = await tx.repoUserOrganization.count({
                        where: { organizationId },
                    });

                    if (repoCount > 0) {
                        throw new TRPCError({
                            code: "FORBIDDEN",
                            message:
                                "Cannot leave organization with repositories. Transfer or delete them first.",
                        });
                    }

                    // delete the organization since it will be empty
                    await tx.organizationUserInvitation.deleteMany({
                        where: { organizationId },
                    });

                    await tx.organizationUser.delete({
                        where: {
                            userMetadataId_organizationId: {
                                userMetadataId,
                                organizationId,
                            },
                        },
                    });

                    await tx.organization.delete({
                        where: { id: organizationId },
                    });

                    return {
                        success: true,
                        message:
                            "Organization deleted as you were the last member",
                    };
                }

                // 4. check if user is an admin
                const isAdmin = userOrg.role === OrganizationRole.ADMIN;

                if (isAdmin) {
                    // count other admins
                    const otherAdminsCount = await tx.organizationUser.count({
                        where: {
                            organizationId,
                            role: OrganizationRole.ADMIN,
                            userMetadataId: { not: userMetadataId },
                        },
                    });

                    // if no other admins and no replacement provided
                    if (otherAdminsCount === 0 && !newAdminUserId) {
                        throw new TRPCError({
                            code: "BAD_REQUEST",
                            message:
                                "You are the only admin. Specify another user to promote to admin before leaving.",
                        });
                    }

                    // if replacement admin is provided, promote them
                    if (newAdminUserId && otherAdminsCount === 0) {
                        // get the new admin's metadata
                        const newAdmin = await tx.user.findUnique({
                            where: { id: newAdminUserId },
                            include: { metadata: true },
                        });

                        if (!newAdmin?.metadata) {
                            throw new TRPCError({
                                code: "NOT_FOUND",
                                message: "New admin user not found",
                            });
                        }

                        // check if the new admin is a member of the organization
                        const newAdminOrg =
                            await tx.organizationUser.findUnique({
                                where: {
                                    userMetadataId_organizationId: {
                                        userMetadataId: newAdmin.metadata.id,
                                        organizationId,
                                    },
                                },
                            });

                        if (!newAdminOrg) {
                            throw new TRPCError({
                                code: "BAD_REQUEST",
                                message:
                                    "The specified user is not a member of this organization",
                            });
                        }

                        // promote the new admin
                        await tx.organizationUser.update({
                            where: {
                                userMetadataId_organizationId: {
                                    userMetadataId: newAdmin.metadata.id,
                                    organizationId,
                                },
                            },
                            data: { role: OrganizationRole.ADMIN },
                        });
                    }
                }

                // 5. remove the user from the organization
                await tx.organizationUser.delete({
                    where: {
                        userMetadataId_organizationId: {
                            userMetadataId,
                            organizationId,
                        },
                    },
                });

                return {
                    success: true,
                    message: "Successfully left the organization",
                };
            });
        });
}

function deleteOrg() {
    return protectedProcedure
        .input(
            z.object({
                organizationId: z.string().uuid(),
            }),
        )
        .mutation(async ({ ctx, input }) => {
            const { organizationId } = input;
            const userId = ctx.session.user.id;

            const currentUser = await ctx.prisma.user.findUnique({
                where: { id: userId },
                include: { metadata: true },
            });

            if (!currentUser?.metadata) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "User metadata not found",
                });
            }

            const userMetadataId = currentUser.metadata.id;

            return ctx.prisma.$transaction(async (tx) => {
                const userOrg = await tx.organizationUser.findUnique({
                    where: {
                        userMetadataId_organizationId: {
                            userMetadataId,
                            organizationId,
                        },
                    },
                });

                if (!userOrg) {
                    throw new TRPCError({
                        code: "NOT_FOUND",
                        message: "You are not a member of this organization",
                    });
                }
                if (userOrg.role !== $Enums.OrganizationRole.ADMIN) {
                    throw new TRPCError({
                        code: "FORBIDDEN",
                        message: "You are not an admin of this organization",
                    });
                }

                const repoCount = await tx.repoUserOrganization.count({
                    where: { organizationId },
                });

                if (repoCount > 0) {
                    throw new TRPCError({
                        code: "FORBIDDEN",
                        message:
                            "Cannot delete organization with repositories. Transfer or delete them first.",
                    });
                }

                // delete the organization since it will be empty
                await tx.organizationUserInvitation.deleteMany({
                    where: { organizationId },
                });

                await tx.organizationUser.deleteMany({
                    where: { organizationId },
                });

                await tx.organization.delete({
                    where: { id: organizationId },
                });
            });
        });
}

function settings() {
    return protectedProcedure
        .input(z.object({ orgName: z.string() }))
        .query(async ({ ctx, input }): Promise<OrganizationSettings> => {
            const { org, userRole } = await getOrgAsMember(
                ctx.prisma,
                ctx.session.user.id,
                { by: "name", name: decodeURIComponent(input.orgName) },
            );

            const isUserAdmin = userRole === OrganizationRole.ADMIN;
            const memberCount = await ctx.prisma.organizationUser.count({
                where: { organizationId: org.id },
            });

            const adminCount = await ctx.prisma.organizationUser.count({
                where: {
                    organizationId: org.id,
                    role: OrganizationRole.ADMIN,
                },
            });

            const isUserOnlyAdmin = isUserAdmin && adminCount === 1;
            const possibleAdmins = await ctx.prisma.organizationUser.findMany({
                where: {
                    organizationId: org.id,
                    role: OrganizationRole.MEMBER,
                },
                include: {
                    userMetadata: {
                        include: {
                            user: true,
                        },
                    },
                },
            });

            const invitations = await orgsInvitations(ctx.prisma, org.id);
            const orgDisplay: OrganisationDisplay = {
                id: org.id,
                name: org.name,
                image: org.image || undefined,
                bio: org.bio || undefined,
                showMembers: !org.hideMembers,
                memberCount,
            };

            const formattedPossibleAdmins = possibleAdmins.map(
                (member): UserDisplay => ({
                    id: member.userMetadata.user.id,
                    username: member.userMetadata.user.name!,
                    image: member.userMetadata.user.image || undefined,
                }),
            );

            const formatInvitation = async (
                inv: Awaited<ReturnType<typeof orgsInvitations>>[0],
            ): Promise<Invitation> => {
                const sender: UserDisplay = {
                    id: inv.senderMetadata.user.id,
                    username: inv.senderMetadata.user.name!,
                    image: inv.senderMetadata.user.image || undefined,
                };

                const receiver: UserDisplay = {
                    id: inv.userMetadata.user.id,
                    username: inv.userMetadata.user.name!,
                    image: inv.userMetadata.user.image || undefined,
                };

                const organisation: OrganisationDisplay = {
                    id: inv.organization.id,
                    name: inv.organization.name,
                    image: inv.organization.image || undefined,
                    bio: inv.organization.bio || undefined,
                    memberCount: 0,
                };

                let status: InvitationStatus;
                switch (inv.status) {
                    case "PENDING":
                        status = "pending";
                        break;
                    case "ACCEPTED":
                        status = "accepted";
                        break;
                    case "DECLINED":
                        status = "declined";
                        break;
                }

                return {
                    id: `${inv.userMetadataId}_${inv.organizationId}`,
                    type: "organisation",
                    sender,
                    organisation,
                    receiver,
                    status,
                    createdAt: inv.createdAt,
                    resolvedAt: inv.resolvedAt || undefined,
                };
            };

            const pendingInvitations = await Promise.all(
                invitations
                    .filter(
                        (inv) => inv.status === $Enums.InvitationStatus.PENDING,
                    )
                    .map(async (inv) => await formatInvitation(inv)),
            );

            const acceptedInvitations = await Promise.all(
                invitations
                    .filter(
                        (inv) =>
                            inv.status === $Enums.InvitationStatus.ACCEPTED,
                    )
                    .map(async (inv) => await formatInvitation(inv)),
            );

            const declinedInvitations = await Promise.all(
                invitations
                    .filter(
                        (inv) =>
                            inv.status === $Enums.InvitationStatus.DECLINED,
                    )
                    .map(async (inv) => await formatInvitation(inv)),
            );

            return {
                org: orgDisplay,
                isUserAdmin,
                isUserOnlyAdmin,
                possibleAdmins: formattedPossibleAdmins,
                pendingInvitations,
                acceptedInvitations,
                declinedInvitations,
            };
        });
}

function setShowMembers() {
    return protectedProcedure
        .input(
            z.object({
                orgId: z.string().uuid(),
                showMembers: z.boolean(),
            }),
        )
        .mutation(async ({ ctx, input }) => {
            const { org, userRole } = await getOrgAsMember(
                ctx.prisma,
                ctx.session.user.id,
                { by: "id", id: input.orgId },
            );

            if (userRole !== $Enums.RepoRole.ADMIN) {
                throw new TRPCError({
                    code: "FORBIDDEN",
                    message: "You are not an admin of this organization",
                });
            }

            const result = await ctx.prisma.organization.update({
                where: { id: org.id },
                data: { hideMembers: !input.showMembers },
                select: { hideMembers: true },
            });
            return { showMembers: result.hideMembers };
        });
}

function promoteToAdmin() {
    return protectedProcedure
        .input(
            z.object({
                orgId: z.string().uuid(),
                userId: z.string().uuid(),
            }),
        )
        .mutation(async ({ ctx, input }) => {
            const currentUser = await ctx.prisma.userMetadata.findUniqueOrThrow(
                { where: { userId: ctx.session.user.id } },
            );

            const promoterRole = await ctx.prisma.organizationUser.findUnique({
                where: {
                    userMetadataId_organizationId: {
                        userMetadataId: currentUser.id,
                        organizationId: input.orgId,
                    },
                },
            });

            if (
                !promoterRole ||
                promoterRole.role !== $Enums.OrganizationRole.ADMIN
            ) {
                throw new TRPCError({
                    code: "FORBIDDEN",
                    message: "You are not an admin of this organization",
                });
            }

            await ctx.prisma.organizationUser.updateMany({
                where: {
                    userMetadata: { userId: input.userId },
                    organizationId: input.orgId,
                },
                data: { role: $Enums.OrganizationRole.ADMIN },
            });
        });
}

function expelMember() {
    return protectedProcedure
        .input(
            z.object({
                orgId: z.string().uuid(),
                userId: z.string().uuid(),
            }),
        )
        .mutation(async ({ ctx, input }) => {
            const currentUserRole = await ctx.prisma.organizationUser.findFirst(
                {
                    where: {
                        userMetadata: { userId: ctx.session.user.id },
                        organizationId: input.orgId,
                    },
                },
            );

            if (!currentUserRole) {
                throw new TRPCError({
                    code: "FORBIDDEN",
                    message: "You are not an admin of this organization",
                });
            }

            await ctx.prisma.organizationUser.deleteMany({
                where: {
                    userMetadata: { userId: input.userId },
                    organizationId: input.orgId,
                },
            });
        });
}

// ONLY TEMPORARILY - TODO MISO treba zrusit na FE celu OrganisationRole a zacat pouzivat OrganizationRole aj na FE
function mapOrganizationRoleToOrganisationRole(
    organizationRole: OrganizationRole,
): OrganisationRole {
    const roleMapping: Record<OrganizationRole, OrganisationRole> = {
        MEMBER: "member",
        ADMIN: "admin",
    };

    return roleMapping[organizationRole];
}

async function isUserMember(
    prisma: PrismaType,
    getBy:
        | { by: "id"; id: string }
        | { by: "userMetadataId"; userMetadataId: string },
): Promise<boolean> {
    const userRole = await prisma.organizationUser.findFirst({
        where: {
            ...(getBy.by === "id"
                ? { userMetadata: { userId: getBy.id } }
                : { userMetadataId: getBy.userMetadataId }),
        },
    });
    return !!userRole;
}

async function orgsInvitations(prisma: PrismaType, organizationId: string) {
    return prisma.organizationUserInvitation.findMany({
        where: {
            organizationId: organizationId,
        },
        include: {
            organization: true,
            userMetadata: {
                include: {
                    user: true,
                },
            },
            senderMetadata: {
                include: {
                    user: true,
                },
            },
        },
    });
}

async function getOrgAsMember(
    prisma: PrismaType,
    currentUserId: string,
    getBy: { by: "id"; id: string } | { by: "name"; name: string },
): Promise<{ org: Organization; userRole: $Enums.OrganizationRole }> {
    const currentUser = await prisma.user.findUnique({
        where: { id: currentUserId },
        include: { metadata: true },
    });

    if (!currentUser?.metadata) {
        throw new TRPCError({
            code: "NOT_FOUND",
            message: "User metadata not found",
        });
    }

    const organization = await prisma.organization.findUnique({
        where: {
            ...(getBy.by === "id" ? { id: getBy.id } : { name: getBy.name }),
        },
    });

    if (!organization) {
        throw new TRPCError({
            code: "NOT_FOUND",
            message: "Organization not found",
        });
    }

    const userOrg = await prisma.organizationUser.findUnique({
        where: {
            userMetadataId_organizationId: {
                userMetadataId: currentUser.metadata.id,
                organizationId: organization.id,
            },
        },
    });

    if (!userOrg) {
        throw new TRPCError({
            code: "FORBIDDEN",
            message: "You are not a member of this organization",
        });
    }

    return { org: organization, userRole: userOrg.role };
}
