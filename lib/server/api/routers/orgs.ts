import {
    createOrgProcedureSchema,
} from "@/lib/schemas/org-schemas";
import { pinnedRepos } from "@/lib/server/api/routers/repos";
import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure,
} from "@/lib/server/api/trpc";
import {
    Organisation,
    OrganisationDisplay,
    OrganisationMember,
    OrganisationOverview,
    OrganisationRole,
} from "@/lib/types/organisation";
import { PrismaType } from "@/prisma";
import { $Enums, OrganizationRole } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { Session } from "next-auth";
import { z } from "zod";

export const orgRouter = createTRPCRouter({
    create: createOrg(),
    overview: orgOverview(),
    search: search(),
    byName: byName(),
    userOrgs: usersOrgs(),
    getMembers: getMembers(),
    fetchUserOrgs: fetchUserOrgs()
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
            })
        )
        .query(async ({ ctx, input }) => {
            const { organisationName, nameSearchTerm, roleFilter, page, pageSize } = input;
            const decodedOrganisationName = decodeURIComponent(organisationName)
            const decodedQuery = decodeURIComponent(nameSearchTerm ?? "")
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
                    image: member.userMetadata.user.image || "/avatars/default.png",
                    role: mapOrganizationRoleToOrganisationRole(member.role)
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

function search() {
    return protectedProcedure
        .input(
            z.object({
                nameSearchTerm: z.string().optional(),
                page: z.number().min(1),
                pageSize: z.number().min(1).max(100),
            })
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
            })
        )
        .query(async ({ ctx, input }) => {
            const { username, nameSearchTerm, roleFilter, page, pageSize } = input;
            const decodedUsername = decodeURIComponent(username)
            const decodedQuery = decodeURIComponent(nameSearchTerm ?? "")
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

    const members: Array<OrganisationMember> = organization.users
        .map(({ userMetadata, role }) => ({
            id: userMetadata.user.id,
            username: userMetadata.user.name!,
            name: userMetadata.firstName,
            surname: userMetadata.surname,
            image: userMetadata.user.image || undefined,
            role: (role === "ADMIN" ? "admin" : "member") as OrganisationRole,
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

// ONLY TEMPORARILY - TODO MISO treba zrusit na FE celu OrganisationRole a zacat pouzivat OrganizationRole aj na FE
function mapOrganizationRoleToOrganisationRole(organizationRole: OrganizationRole): OrganisationRole {
    const roleMapping: Record<OrganizationRole, OrganisationRole> = {
        MEMBER: "member",
        ADMIN: "admin"
    };

    return roleMapping[organizationRole];
}

