import {
    editUserProcedureSchema,
    userSearchSchema,
} from "@/lib/schemas/user-schemas";
import { registerSchema } from "@/lib/schemas/user-schemas";
import { OrganisationDisplay } from "@/lib/types/organisation";
import { User, UserDisplay, UsersOverview } from "@/lib/types/user";
import { PrismaType } from "@/prisma";
import { UserRole } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import bcrypt from "bcryptjs";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { pinnedRepos } from "./repos";

export const userRouter = createTRPCRouter({
    register: registerRoute(),
    byId: userById(),
    byUsername: byUsername(),
    usersOverview: usersOverview(),
    edit: editUser(),
    search: trigramSearch(),
});

function registerRoute() {
    return publicProcedure
        .input(registerSchema)
        .mutation(async ({ ctx, input }) => {
            const prisma = ctx.prisma;
            const { username, email, password, name, surname } = input;

            const existingUser = await prisma.user.findFirst({
                where: { OR: [{ username }, { email }] },
            });

            if (existingUser) {
                throw new TRPCError({
                    code: "CONFLICT",
                    message: "User with this username or email already exists",
                });
            }

            const hashedPassword: string = await bcrypt.hash(password, 10);

            await prisma.user.create({
                data: {
                    username,
                    name,
                    surname,
                    email,
                    password: hashedPassword,
                    role: "USER",
                },
            });
        });
}

function userById() {
    return protectedProcedure
        .input(z.string().uuid())
        .query(async ({ ctx, input: id }) => {
            const prisma = ctx.prisma;

            if (ctx.session.user.id !== id) {
                throw new TRPCError({
                    code: "FORBIDDEN",
                    message: "You can't fetch other users by id",
                });
            }

            const user = await prisma.user.findUnique({
                where: { id: id },
            });

            if (!user) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "User doesn't exist",
                });
            }

            return {
                id: user.id,
                name: user.name,
                surname: user.surname,
                username: user.username,
                email: user.email,
                role: user.role,
                image: user.image || undefined,
                bio: user.bio || undefined,
                createdAt: user.createdAt,
            } satisfies User;
        });
}

function editUser() {
    return protectedProcedure
        .input(editUserProcedureSchema)
        .mutation(async ({ ctx, input }) => {
            const userId = ctx.session.user.id;

            // there may be user with the same username
            const withSameUsername = await ctx.prisma.user.findFirst({
                where: {
                    username: input.username,
                    NOT: { id: userId },
                },
            });

            if (withSameUsername) {
                throw new TRPCError({
                    code: "CONFLICT",
                    message: "Username is already taken",
                });
            }

            const updatedUser = await ctx.prisma.user.update({
                where: {
                    id: userId,
                },
                data: {
                    name: input.name,
                    surname: input.surname,
                    username: input.username,
                    bio: input.bio,
                    image: input.image,
                },
                select: {
                    id: true,
                    name: true,
                    surname: true,
                    username: true,
                    bio: true,
                    image: true,
                    email: true,
                    role: true,
                    createdAt: true,
                    updatedAt: true,
                },
            });

            return {
                id: updatedUser.id,
                name: updatedUser.name,
                surname: updatedUser.surname,
                username: updatedUser.username,
                email: updatedUser.email,
                bio: updatedUser.bio || undefined,
                role: updatedUser.role,
                image: updatedUser.image || undefined,
                createdAt: updatedUser.createdAt,
            } satisfies User;
        });
}

function trigramSearch() {
    return protectedProcedure
        .input(userSearchSchema)
        .query(async ({ ctx, input }) => {
            const { searchTerm, page, pageSize } = input;
            const offset = page * pageSize;

            // Get total count and results in a single transaction
            const [total, users] = await ctx.prisma.$transaction([
                ctx.prisma.$queryRaw<[{ count: number }]>`
          select count(*) as count
          from "User"
          where 
            (
              similarity(username, ${searchTerm}) * 0.4 +
              similarity(email, ${searchTerm}) * 0.3 +
              similarity(name, ${searchTerm}) * 0.2 +
              similarity(surname, ${searchTerm}) * 0.1
            ) > 0.1
        `,
                ctx.prisma.$queryRaw<UserDisplay[]>`
          select id, username, image, (
              -- username (highest priority: 40%)
              similarity(COALESCE(username, ''), ${searchTerm}) * 0.4 +
              -- email (second priority: 30%)
              similarity(COALESCE(email, ''), ${searchTerm}) * 0.3 +
              -- name (third priority: 20%)
              similarity(COALESCE(name, ''), ${searchTerm}) * 0.2 +
              -- surname (fourth priority: 10%)
              similarity(COALESCE(surname, ''), ${searchTerm}) * 0.1
            ) as rank
          from "User"
          where 
            (
              similarity(username, ${searchTerm}) * 0.4 +
              similarity(email, ${searchTerm}) * 0.3 +
              similarity(name, ${searchTerm}) * 0.2 +
              similarity(surname, ${searchTerm}) * 0.1
            ) > 0.1
          order by rank desc limit ${pageSize} offset ${offset}
        `,
            ]);

            return {
                users: users.map(({ id, username, image }) => ({
                    id,
                    username,
                    image,
                })),
                pagination: {
                    total: Number(total[0].count),
                    pageCount: Math.ceil(Number(total[0].count) / pageSize),
                    page,
                    pageSize,
                },
            };
        });
}

function byUsername() {
    return publicProcedure
        .input(
            z.object({
                username: z.string(),
            }),
        )
        .query(async ({ ctx, input }): Promise<User> => {
            return await userByUsername(ctx.prisma, input.username);
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
            const user = await userByUsername(ctx.prisma, input.username);
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

async function userByUsername(
    prisma: PrismaType,
    username: string,
): Promise<User> {
    const user = await prisma.user.findUnique({
        where: { username },
        select: {
            id: true,
            name: true,
            surname: true,
            username: true,
            email: true,
            role: true,
            createdAt: true,
            image: true,
            bio: true,
        },
    });

    if (!user) {
        throw new TRPCError({
            code: "NOT_FOUND",
            message: "User not found",
        });
    }

    return {
        id: user.id,
        name: user.name,
        surname: user.surname,
        username: user.username,
        email: user.email,
        role: user.role as UserRole,
        createdAt: user.createdAt,
        image: user.image || undefined,
        bio: user.bio || undefined,
    };
}

async function getUsersOrgs(
    prisma: PrismaType,
    userId: string,
): Promise<Array<OrganisationDisplay>> {
    const organizations = await prisma.organization.findMany({
        where: { users: { some: { userId } } },
        include: {
            users: { where: { userId: userId }, select: { role: true } },
            _count: { select: { users: true } },
        },
        orderBy: [{ name: "asc" }],
    });

    if (!organizations.length) {
        return [];
    }

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
