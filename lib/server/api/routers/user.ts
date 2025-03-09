import { editUserProcedureSchema, onboardSchema, userSearchSchema } from "@/lib/schemas/user-schemas";
import { favoriteRepos, pinnedRepos, recentRepos } from "@/lib/server/api/routers/repos";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "@/lib/server/api/trpc";
import { PaginationResult } from "@/lib/types/generic";
import { Invitation, InvitationStatus, InvitationType } from "@/lib/types/invitation";
import { OrganisationDisplay } from "@/lib/types/organisation";
import { OnboardedUser, User, UserDisplay, UsersDashboard, UsersOverview } from "@/lib/types/user";
import prisma, { PrismaType } from "@/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { RepositoryDisplay, RepositoryVisibility } from "@/lib/types/repository";

export const userRouter = createTRPCRouter({
    completeOnboarding: completeOnboarding(),
    byId: userById(),
    byUsername: byUsername(),
    usersOverview: usersOverview(),
    edit: editUser(),
    search: trigramSearch(),
    usersDashboard: usersDashboard(),
    usersOrganisations: usersOrganisations(),
    fulltextSearchUsers: fulltextSearchUsers(),
    inviteUserToOrganization: inviteUserToOrganization(),
    inviteUserToRepo: inviteUserToRepo(),
    acceptOrgInvitation: acceptOrgInvitation(),
    declineOrgInvitation: declineOrgInvitation(),
    acceptRepoInvitation: acceptRepoInvitation(),
    declineRepoInvitation: declineRepoInvitation(),
    fetchAllUsers: fetchAllUsers(),
    usersAdminOrganisations: usersAdminOrganisations(),
    usersAdminRepos: usersAdminRepos()
});

function completeOnboarding() {
    return protectedProcedure
        .input(onboardSchema)
        .mutation(async ({ ctx, input }): Promise<User> => {
            const user = await ctx.prisma.user.findUnique({
                where: { id: ctx.session.user.id },
                include: { metadata: true },
            });

            if (!user) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "User not found",
                });
            }
            if (user.metadata) {
                throw new TRPCError({
                    code: "FORBIDDEN",
                    message: "User already onboarded",
                });
            }

            const userMetadata = await ctx.prisma.userMetadata.create({
                data: {
                    firstName: input.name,
                    surname: input.surname,
                    bio: input.bio,
                    user: { connect: { id: user.id } },
                },
            });

            return {
                type: "onboarded",
                id: user.id,
                userMetadataId: userMetadata.id,
                username: user.name!,
                name: userMetadata.firstName,
                surname: userMetadata.surname,
                email: user.email,
                role: userMetadata.role,
                image: user.image || undefined,
                bio: userMetadata.bio || undefined,
                createdAt: user.createdAt,
            };
        });
}

function userById() {
    return protectedProcedure
        .input(z.string().uuid())
        .query(async ({ ctx, input: id }): Promise<User | undefined> => {
            const prisma = ctx.prisma;

            if (ctx.session.user.id !== id) {
                throw new TRPCError({
                    code: "FORBIDDEN",
                    message: "You can't fetch other users by id",
                });
            }

            const user = await prisma.user.findUnique({
                where: { id },
                include: { metadata: true },
            });

            if (!user) {
                return undefined;
            }

            if (user.metadata) {
                return {
                    type: "onboarded",
                    id: user.id,
                    userMetadataId: user.metadata.id,
                    username: user.name!,
                    name: user.metadata.firstName,
                    surname: user.metadata.surname,
                    email: user.email,
                    role: user.metadata.role,
                    image: user.image || undefined,
                    bio: user.metadata.bio || undefined,
                    createdAt: user.createdAt,
                };
            }

            return {
                type: "non-onboarded",
                id: user.id,
                username: user.name!,
                email: user.email,
                image: user.image || undefined,
            };
        });
}

function editUser() {
    return protectedProcedure
        .input(editUserProcedureSchema)
        .mutation(async ({ ctx, input }): Promise<OnboardedUser> => {
            const userId = ctx.session.user.id;

            // there may be user with the same username
            const withSameUsername = await ctx.prisma.user.findFirst({
                where: { name: input.username, NOT: { id: userId } },
            });

            if (withSameUsername) {
                throw new TRPCError({
                    code: "CONFLICT",
                    message: "Username is already taken",
                });
            }

            const updatedUser = await ctx.prisma.user.update({
                where: { id: userId },
                data: {
                    name: input.username,
                    image: input.image,
                },
                select: {
                    id: true,
                    name: true,
                    image: true,
                    email: true,
                    createdAt: true,
                    updatedAt: true,
                },
            });

            const updatedUserMetadata = await ctx.prisma.userMetadata.update({
                where: { userId },
                data: {
                    firstName: input.name,
                    surname: input.surname,
                    bio: input.bio,
                },
                select: {
                    firstName: true,
                    surname: true,
                    bio: true,
                    role: true,
                    id: true,
                },
            });

            return {
                type: "onboarded",
                id: updatedUser.id,
                userMetadataId: updatedUserMetadata.id,
                name: updatedUserMetadata.firstName,
                surname: updatedUserMetadata.surname,
                username: updatedUser.name!,
                email: updatedUser.email,
                bio: updatedUserMetadata.bio || undefined,
                role: updatedUserMetadata.role,
                image: updatedUser.image || undefined,
                createdAt: updatedUser.createdAt,
            };
        });
}

function trigramSearch() {
    return protectedProcedure.input(userSearchSchema).query(
        async ({
            ctx,
            input,
        }): Promise<{
            users: UserDisplay[];
            pagination: PaginationResult;
        }> => {
            const { searchTerm, page, pageSize } = input;
            const offset = page * pageSize;

            // Get total count and results in a single transaction
            const [total, users] = await ctx.prisma.$transaction([
                ctx.prisma.$queryRaw<[{ count: number }]>`
          select count(*) as count
          from "User"
          where similarity(name, ${searchTerm}) > 0.1
        `,
                ctx.prisma.$queryRaw<
                    { id: string; name: string; image?: string }[]
                >`
          select id, name, image, similarity(COALESCE(name, ''), ${searchTerm}) as rank
          from "User"
          where similarity(name, ${searchTerm}) > 0.1
          order by rank desc limit ${pageSize} offset ${offset}
        `,
            ]);

            return {
                users: users.map(({ id, name, image }) => ({
                    id,
                    username: name,
                    image,
                })),
                pagination: {
                    total: Number(total[0].count),
                    pageCount: Math.ceil(Number(total[0].count) / pageSize),
                    page,
                    pageSize,
                },
            };
        },
    );
}

function byUsername() {
    return publicProcedure
        .input(
            z.object({
                username: z.string(),
            }),
        )
        .query(async ({ ctx, input }): Promise<OnboardedUser> => {
            const decodedUsername = decodeURIComponent(input.username.trim());
            return await userByUsername(ctx.prisma, decodedUsername);
        });
}

function usersOverview() {
    return publicProcedure
        .input(
            z.object({
                username: z.string(),
            }),
        )
        .query(async ({ ctx, input }): Promise<UsersOverview> => {
            const decodedUsername = decodeURIComponent(input.username.trim());
            const user = await userByUsername(ctx.prisma, decodedUsername);
            const orgs = await getUsersOrgs(ctx.prisma, user.id);
            const pinned = await pinnedRepos(
                ctx.prisma,
                user.id,
                ctx.session?.user.id === user.id,
            );

            return {
                isItMe: user.id === ctx.session?.user.id,
                profile: user,
                organisations: orgs,
                pinnedRepositories: pinned,
            };
        });
}

function usersDashboard() {
    return protectedProcedure
        .input(
            z.object({
                username: z.string(),
            }),
        )
        .query(async ({ ctx, input }): Promise<UsersDashboard> => {
            const decodedUsername = decodeURIComponent(input.username.trim());
            const prisma = ctx.prisma;

            const userMetadata = await prisma.userMetadata.findFirst({
                where: { user: { name: decodedUsername } },
                select: {
                    id: true,
                    userId: true,
                },
            });

            if (!userMetadata) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "User not found",
                });
            }

            const invitations: Invitation[] = await getUserInvitations(
                userMetadata.id,
            );

            const favorite = await favoriteRepos(
                prisma,
                userMetadata.userId,
                ctx.session?.user.id === userMetadata.userId,
            );
            const recent = await recentRepos(
                prisma,
                userMetadata.userId,
                ctx.session?.user.id === userMetadata.userId,
            );

            return {
                favoriteRepositories: favorite,
                recentRepositories: recent,
                invitations: invitations,
            };
        });
}

function usersOrganisations() {
    return protectedProcedure
        .input(
            z.object({
                username: z.string(),
            }),
        )
        .query(async ({ ctx, input }): Promise<Array<OrganisationDisplay>> => {
            const decodedUsername = decodeURIComponent(input.username.trim());
            const user = await userByUsername(ctx.prisma, decodedUsername);
            return await getUsersOrgs(ctx.prisma, user.id);
        });
}

function usersAdminOrganisations() {
    return protectedProcedure
        .query(async ({ ctx }): Promise<Array<OrganisationDisplay>> => {
            const userId = ctx.session.user.id;

            const userMetadata = await prisma.userMetadata.findUnique({
                where: { userId },
                select: { id: true },
            });

            if (!userMetadata) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "User metadata not found.",
                });
            }

            const organizations = await ctx.prisma.organization.findMany({
                where: {
                    users: {
                        some: {
                            userMetadataId: userMetadata.id,
                            role: "ADMIN",
                        },
                    },
                },
                include: {
                    _count: { select: { users: true } },
                },
                orderBy: [{ name: "asc" }],
            });

            return organizations.map((org) => ({
                id: org.id,
                name: org.name,
                image: org.image || undefined,
                bio: org.bio || undefined,
                memberCount: org._count.users,
                userRole: "admin",
            }));
        });
}

function usersAdminRepos() {
    return protectedProcedure
        .query(async ({ ctx }): Promise<Array<RepositoryDisplay>> => {
            const userId = ctx.session.user.id;

            const userMetadata = await prisma.userMetadata.findUnique({
                where: { userId },
                select: { id: true },
            });

            if (!userMetadata) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "User metadata not found.",
                });
            }

            const repos = await ctx.prisma.repoUserOrganization.findMany({
                where: {
                    userMetadataId: userMetadata.id,
                    repoRole:  { in: ["ADMIN", "OWNER"] },
                },
                include: {
                    repo: true,
                    organization: true,
                },
                orderBy: [{ repo: { name: "asc" } }],
            });

            return repos.map(({ repo, organization }) => ({
                id: repo.id,
                ownerName: organization ? organization.name : "Personal",
                ownerImage: organization ? organization.image || undefined : undefined,
                name: repo.name,
                visibility: repo.public ? "public" : "private",
            }));
        });
}

function fulltextSearchUsers() {
    return protectedProcedure
        .input(
            z.object({
                query: z.string().min(1).max(50),
                limit: z.number().min(1).max(10).default(10),
            }),
        )
        .query(async ({ ctx, input }) => {
            const { query, limit } = input;
            const decodedQuery = decodeURIComponent(query.trim());

            const users = await ctx.prisma.user.findMany({
                where: {
                    name: {
                        contains: decodedQuery,
                        mode: "insensitive",
                    },
                },
                take: limit,
                orderBy: {
                    name: "asc",
                },
                select: {
                    id: true,
                    name: true,
                    image: true,
                },
            });

            return users.map((user) => ({
                id: user.id,
                username: user.name ?? "",
                image: user.image || "/avatars/default.png",
            }));
        });
}

function acceptOrgInvitation() {
    return protectedProcedure
        .input(
            z.object({
                organizationId: z.string().uuid(),
            }),
        )
        .mutation(async ({ ctx, input }) => {
            const { organizationId } = input;
            const prisma = ctx.prisma;
            const userId = ctx.session.user.id;

            const userMetadata = await prisma.userMetadata.findUnique({
                where: { userId },
                select: { id: true },
            });

            if (!userMetadata) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "User not found",
                });
            }

            const invitation =
                await prisma.organizationUserInvitation.findUnique({
                    where: {
                        userMetadataId_organizationId: {
                            userMetadataId: userMetadata.id,
                            organizationId,
                        },
                    },
                });

            if (!invitation) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Invitation not found or already accepted.",
                });
            }

            try {
                await prisma.$transaction([
                    prisma.organizationUser.create({
                        data: {
                            userMetadataId: userMetadata.id,
                            organizationId,
                            role: invitation.role,
                        },
                    }),

                    prisma.organizationUserInvitation.update({
                        where: {
                            userMetadataId_organizationId: {
                                userMetadataId: userMetadata.id,
                                organizationId,
                            },
                        },
                        data: { status: "ACCEPTED" },
                    }),
                ]);

                return getUserInvitations(userMetadata.id);
            } catch (error) {
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: "Could not accept invitation: " + error,
                });
            }
        });
}

function fetchAllUsers() {
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

            const decodedQuery = decodeURIComponent(nameSearchTerm ?? "");

            const prisma = ctx.prisma;

            const total = await prisma.user.count({
                where: {
                    name: {
                        contains: decodedQuery,
                        mode: "insensitive",
                    },
                },
            });

            const users = await prisma.user.findMany({
                where: {
                    name: {
                        contains: decodedQuery,
                        mode: "insensitive",
                    },
                },
                select: {
                    id: true,
                    name: true,
                    image: true,
                },
                orderBy: {
                    name: "asc",
                },
                skip: (page - 1) * pageSize,
                take: pageSize,
            });

            const userList: UserDisplay[] = users.map((user) => ({
                id: user.id,
                username: user.name ?? "",
                image: user.image ?? undefined,
            }));

            const pagination: PaginationResult = {
                total,
                pageCount: Math.ceil(total / pageSize),
                page,
                pageSize,
            };

            return { users: userList, pagination };
        });
}

function declineOrgInvitation() {
    return protectedProcedure
        .input(
            z.object({
                organizationId: z.string().uuid(),
            }),
        )
        .mutation(async ({ ctx, input }) => {
            const { organizationId } = input;
            const prisma = ctx.prisma;
            const userId = ctx.session.user.id;

            const userMetadata = await prisma.userMetadata.findUnique({
                where: { userId },
                select: { id: true },
            });

            if (!userMetadata) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "User not found",
                });
            }

            const invitation =
                await prisma.organizationUserInvitation.findUnique({
                    where: {
                        userMetadataId_organizationId: {
                            userMetadataId: userMetadata.id,
                            organizationId,
                        },
                    },
                });

            if (!invitation) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Invitation not found or already processed.",
                });
            }

            try {
                await prisma.organizationUserInvitation.update({
                    where: {
                        userMetadataId_organizationId: {
                            userMetadataId: userMetadata.id,
                            organizationId,
                        },
                    },
                    data: { status: "DECLINED" },
                });

                return getUserInvitations(userMetadata.id);
            } catch (error) {
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: "Could not decline invitation: " + error,
                });
            }
        });
}

function inviteUserToOrganization() {
    return protectedProcedure
        .input(
            z.object({
                userId: z.string().uuid(),
                organisationName: z.string(),
            }),
        )
        .mutation(async ({ ctx, input }) => {
            const { userId, organisationName } = input;
            const decodedOrganisationName =
                decodeURIComponent(organisationName);
            const prisma = ctx.prisma;
            const senderId = ctx.session.user.id;

            const userMetadata = await prisma.userMetadata.findUnique({
                where: { userId },
                select: { id: true },
            });

            const senderMetadata = await prisma.userMetadata.findUnique({
                where: { userId: senderId },
                select: { id: true },
            });

            const organization = await prisma.organization.findUnique({
                where: { name: decodedOrganisationName },
                select: {
                    id: true,
                    name: true,
                },
            });

            if (!userMetadata || !organization || !senderMetadata) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "User or organisation not found",
                });
            }

            const existingMembership = await prisma.organizationUser.findUnique({
                where: {
                    userMetadataId_organizationId: {
                        userMetadataId: userMetadata.id,
                        organizationId: organization.id,
                    },
                },
            });

            if (existingMembership) {
                throw new TRPCError({
                    code: "CONFLICT",
                    message: "User is already a member of this organization",
                });
            }

            try {
                await prisma.organizationUserInvitation.create({
                    data: {
                        userMetadataId: userMetadata.id,
                        organizationId: organization.id,
                        senderMetadataId: senderMetadata.id,
                    },
                });
            } catch (error) {
                if (error instanceof PrismaClientKnownRequestError) {
                    if (error.code === "P2002") {
                        throw new TRPCError({
                            code: "CONFLICT",
                            message:
                                "User is already invited to this organization",
                        });
                    }
                }
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: "Could not create invitation",
                });
            }
            return { success: true };
        });
}

function inviteUserToRepo() {
    return protectedProcedure
        .input(
            z.object({
                userId: z.string().uuid(),
                repositoryName: z.string(),
            }),
        )
        .mutation(async ({ ctx, input }) => {
            const { userId, repositoryName } = input;
            const decodedRepositoryName =
                decodeURIComponent(repositoryName);
            const prisma = ctx.prisma;
            const senderId = ctx.session.user.id;

            const userMetadata = await prisma.userMetadata.findUnique({
                where: { userId },
                select: { id: true },
            });

            const senderMetadata = await prisma.userMetadata.findUnique({
                where: { userId: senderId },
                select: { id: true },
            });

            const repo = await prisma.repo.findFirst({
                where: { name: decodedRepositoryName },
                select: {
                    id: true,
                    name: true,
                },
            });

            if (!userMetadata || !repo || !senderMetadata) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "User or repository not found",
                });
            }

            const existingMembership = await prisma.repoUserOrganization.findUnique({
                where: {
                    userMetadataId_repoId: {
                        userMetadataId: userMetadata.id,
                        repoId: repo.id,
                    },
                },
            });

            if (existingMembership) {
                throw new TRPCError({
                    code: "CONFLICT",
                    message: "User is already a member of this repository",
                });
            }

            try {
                await prisma.repoUserInvitation.create({
                    data: {
                        userMetadataId: userMetadata.id,
                        repoId: repo.id,
                        senderMetadataId: senderMetadata.id,
                    },
                });
            } catch (error) {
                if (error instanceof PrismaClientKnownRequestError) {
                    if (error.code === "P2002") {
                        throw new TRPCError({
                            code: "CONFLICT",
                            message:
                                "User is already invited to this repo",
                        });
                    }
                }
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: "Could not create invitation",
                });
            }
            return { success: true };
        });
}

function acceptRepoInvitation() {
    return protectedProcedure
        .input(
            z.object({
                repositoryId: z.string().uuid(),
            }),
        )
        .mutation(async ({ ctx, input }) => {
            const { repositoryId } = input;
            const prisma = ctx.prisma;
            const userId = ctx.session.user.id;

            const userMetadata = await prisma.userMetadata.findUnique({
                where: { userId },
                select: { id: true },
            });

            if (!userMetadata) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "User not found",
                });
            }

            const invitation =
                await prisma.repoUserInvitation.findUnique({
                    where: {
                        userMetadataId_repoId: {
                            userMetadataId: userMetadata.id,
                            repoId: repositoryId,
                        },
                    },
                });

            if (!invitation) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Invitation not found or already accepted.",
                });
            }

            try {
                await prisma.$transaction([
                    prisma.repoUserOrganization.create({
                        data: {
                            userMetadataId: userMetadata.id,
                            repoId: repositoryId,
                            repoRole: invitation.role,
                            favorite: false,
                            pinned: false,
                            lastVisitedAt: new Date(),
                        },
                    }),

                    prisma.repoUserInvitation.update({
                        where: {
                            userMetadataId_repoId: {
                                userMetadataId: userMetadata.id,
                                repoId: repositoryId,
                            },
                        },
                        data: { status: "ACCEPTED" },
                    }),
                ]);

                return getUserInvitations(userMetadata.id);
            } catch (error) {
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: "Could not accept invitation: " + error,
                });
            }
        });
}

function declineRepoInvitation() {
    return protectedProcedure
        .input(
            z.object({
                repositoryId: z.string().uuid(),
            }),
        )
        .mutation(async ({ ctx, input }) => {
            const { repositoryId } = input;
            const prisma = ctx.prisma;
            const userId = ctx.session.user.id;

            const userMetadata = await prisma.userMetadata.findUnique({
                where: { userId },
                select: { id: true },
            });

            if (!userMetadata) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "User not found",
                });
            }

            const invitation =
                await prisma.repoUserInvitation.findUnique({
                    where: {
                        userMetadataId_repoId: {
                            userMetadataId: userMetadata.id,
                            repoId: repositoryId,
                        },
                    },
                });

            if (!invitation) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Invitation not found or already processed.",
                });
            }

            try {
                await prisma.repoUserInvitation.update({
                    where: {
                        userMetadataId_repoId: {
                            userMetadataId: userMetadata.id,
                            repoId: repositoryId,
                        },
                    },
                    data: { status: "DECLINED" },
                });

                return getUserInvitations(userMetadata.id);
            } catch (error) {
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: "Could not decline invitation: " + error,
                });
            }
        });
}

async function userByUsername(
    prisma: PrismaType,
    username: string,
): Promise<OnboardedUser> {
    const userMetadata = await prisma.userMetadata.findFirst({
        where: { user: { name: username } },
        select: {
            id: true,
            firstName: true,
            surname: true,
            role: true,
            bio: true,
            user: true,
        },
    });

    if (!userMetadata) {
        throw new TRPCError({
            code: "NOT_FOUND",
            message: "User not found",
        });
    }

    return {
        type: "onboarded",
        userMetadataId: userMetadata.id,
        id: userMetadata.user.id,
        username: userMetadata.user.name!,
        name: userMetadata.firstName,
        surname: userMetadata.surname,
        email: userMetadata.user.email,
        role: userMetadata.role,
        createdAt: userMetadata.user.createdAt,
        image: userMetadata.user.image || undefined,
        bio: userMetadata.bio || undefined,
    };
}

async function getUsersOrgs(
    prisma: PrismaType,
    userId: string,
): Promise<Array<OrganisationDisplay>> {
    const organizations = await prisma.organization.findMany({
        where: { users: { some: { userMetadata: { userId } } } },
        include: {
            users: {
                select: { role: true },
                where: { userMetadata: { userId } },
            },
            _count: { select: { users: true } },
        },
        orderBy: [{ name: "asc" }],
    });

    const transformedOrgs: OrganisationDisplay[] = organizations.map((org) => ({
        id: org.id,
        name: org.name,
        image: org.image || undefined,
        bio: org.bio || undefined,
        memberCount: org._count.users,
        userRole: org.users[0]?.role === "ADMIN" ? "admin" : "member",
    }));

    return transformedOrgs.sort((a, b) => {
        if (a.userRole === "admin" && b.userRole !== "admin") return -1;
        if (a.userRole !== "admin" && b.userRole === "admin") return 1;
        return a.name.localeCompare(b.name);
    });
}

async function getUserInvitations(
    userMetadataId: string,
): Promise<Invitation[]> {
    const orgInvitations = await prisma.organizationUserInvitation.findMany({
        where: { userMetadataId, status: "PENDING" },
        include: {
            organization: {
                include: {
                    _count: {
                        select: { users: true },
                    },
                },
            },
            senderMetadata: {
                include: { user: true },
            },
        },
        orderBy: { createdAt: "desc" },
    });

    const repoInvitations = await prisma.repoUserInvitation.findMany({
        where: { userMetadataId, status: "PENDING" },
        include: {
            repo: true,
            senderMetadata: {
                include: { user: true },
            },
        },
        orderBy: { createdAt: "desc" },
    });

    const mappedOrgInvitations = orgInvitations.map((inv) => ({
        id: `${inv.userMetadataId}-${inv.organizationId}`,
        type: "organisation" as InvitationType,
        sender: {
            id: inv.senderMetadata.user.id,
            username: inv.senderMetadata.user.name ?? "",
            image: inv.senderMetadata.user.image ?? "/avatars/default.png",
        },
        organisation: {
            id: inv.organization.id,
            name: inv.organization.name,
            image: inv.organization.image ?? "/avatars/default.png",
            bio: inv.organization.bio ?? undefined,
            memberCount: inv.organization._count.users,
        },
        status: "pending" as InvitationStatus,
        createdAt: inv.createdAt,
    }));

    const mappedRepoInvitations = repoInvitations.map((inv) => ({
        id: `${inv.userMetadataId}-${inv.repoId}`,
        type: "repository" as InvitationType,
        sender: {
            id: inv.senderMetadata.user.id,
            username: inv.senderMetadata.user.name ?? "",
            image: inv.senderMetadata.user.image ?? "/avatars/default.png",
        },
        repository: {
            id: inv.repo.id,
            ownerName: "Unknown",
            ownerImage: undefined,
            name: inv.repo.name,
            visibility: inv.repo.public ? "public" : "private" as RepositoryVisibility,
        },
        status: "pending" as InvitationStatus,
        createdAt: inv.createdAt,
    }));

    return [...mappedOrgInvitations, ...mappedRepoInvitations];
}
