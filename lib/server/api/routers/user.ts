import {
    editUserProcedureSchema,
    onboardSchema,
    userSearchSchema,
} from "@/lib/schemas/user-schemas";
import { PaginationResult } from "@/lib/types/generic";
import { OrganisationDisplay } from "@/lib/types/organisation";
import {
    OnboardedUser,
    User,
    UserDisplay, UsersDashboard,
    UsersOverview
} from "@/lib/types/user";
import { PrismaType } from "@/prisma";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { favoriteRepos, pinnedRepos, recentRepos } from "./repos";

export const userRouter = createTRPCRouter({
    completeOnboarding: completeOnboarding(),
    byId: userById(),
    byUsername: byUsername(),
    usersOverview: usersOverview(),
    edit: editUser(),
    search: trigramSearch(),
    usersDashboard: usersDashboard(),
    usersOrganisations: usersOrganisations()
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
                },
            });

            return {
                type: "onboarded",
                id: updatedUser.id,
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
            const user = await userByUsername(ctx.prisma, decodedUsername);
            const favorite = await favoriteRepos(
                ctx.prisma,
                user.id,
                ctx.session?.user.id === user.id
            );
            const recent = await recentRepos(
                ctx.prisma,
                user.id,
                ctx.session?.user.id === user.id
            )

            return {
                favoriteRepositories: favorite,
                recentRepositories: recent
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
            const orgs = await getUsersOrgs(ctx.prisma, user.id);

            return orgs
        });
}


async function userByUsername(
    prisma: PrismaType,
    username: string,
): Promise<OnboardedUser> {
    const userMetadata = await prisma.userMetadata.findFirst({
        where: { user: { name: username } },
        select: {
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
