import {
    createRepositoryFormSchema,
    repoBySlugsSchema,
} from "@/lib/schemas/repo-schemas";
import {
    RepoUserRole,
    Repository,
    RepositoryDisplay,
} from "@/lib/types/repository";
import { PrismaType } from "@/prisma";
import { $Enums } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { mkdir } from "fs/promises";
import { Session } from "next-auth";
import path from "path";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const repoRouter = createTRPCRouter({
    create: create(),
    search: searchByOwnerAndRepoSlug(),
    ownersRepos: reposByOwnerSlug(),
    toggleState: toggleStateOnRepo(),
});

function create() {
    return protectedProcedure
        .input(createRepositoryFormSchema)
        .mutation(async ({ ctx, input }) => {
            const { prisma, session } = ctx;
            const { ownerId, name, description, visibility } = input;

            // check for duplicate repo names under the owner
            const existingRepo = await prisma.repoUserOrganization.findFirst({
                where: {
                    repo: { name },
                    OR: [
                        { userMetadata: { userId: ownerId } },
                        { organizationId: ownerId },
                    ],
                },
            });

            if (existingRepo) {
                throw new TRPCError({
                    code: "CONFLICT",
                    message:
                        "A repository with this name already exists under this owner.",
                });
            }

            const organization = await prisma.organization.findUnique({
                where: { id: ownerId },
                select: {
                    id: true,
                    name: true,
                    image: true,
                    users: {
                        select: { role: true },
                        where: { userMetadata: { userId: session.user.id } },
                    },
                },
            });

            let ownerName: string;
            let ownerImage: string | null = null;
            let userRole: $Enums.RepoRole;

            if (organization) {
                if (organization.users.length === 0) {
                    throw new TRPCError({
                        code: "FORBIDDEN",
                        message:
                            "You must be a member of the organization to create repositories.",
                    });
                }
                ownerName = organization.name;
                ownerImage = organization.image;
                userRole = $Enums.RepoRole.ADMIN;
            } else {
                if (ownerId !== session.user.id) {
                    throw new TRPCError({
                        code: "FORBIDDEN",
                        message: "Invalid owner ID.",
                    });
                }

                const user = await prisma.user.findUnique({
                    where: { id: ownerId },
                    select: {
                        name: true,
                        image: true,
                    },
                });

                if (!user || !user.name) {
                    throw new TRPCError({
                        code: "NOT_FOUND",
                        message: "Owner not found.",
                    });
                }

                ownerName = user.name;
                ownerImage = user.image;
                userRole = $Enums.RepoRole.OWNER;
            }
            const repoPath = path.join(
                process.env.REPOSITORIES_STORAGE_ROOT!,
                ownerName,
                name,
            );
            return await prisma.$transaction(async (tx) => {
                const repo = await tx.repo.create({
                    data: {
                        name,
                        description,
                        public: visibility === "public",
                    },
                });

                const userMetadata = await tx.userMetadata.findUniqueOrThrow({
                    where: { userId: session.user.id },
                });

                await tx.repoUserOrganization.create({
                    data: {
                        repoId: repo.id,
                        userMetadataId: userMetadata.id,
                        organizationId: organization ? ownerId : undefined,
                        repoRole: userRole,
                        favorite: false,
                    },
                });

                try {
                    await mkdir(repoPath, { recursive: true });
                } catch (error) {
                    throw new TRPCError({
                        code: "INTERNAL_SERVER_ERROR",
                        message: "Failed to create repository directory",
                        cause: error,
                    });
                }

                return {
                    id: repo.id,
                    ownerId,
                    ownerName,
                    name: repo.name,
                    visibility,
                    favorite: false,
                    pinned: false,
                    description: repo.description ?? undefined,
                    ownerImage: ownerImage ?? undefined,
                    createdAt: repo.createdAt,
                    userRole: dbUserRoleToAppUserRole(userRole),
                } satisfies Repository;
            });
        });
}

function searchByOwnerAndRepoSlug() {
    return protectedProcedure
        .input(repoBySlugsSchema)
        .query(async ({ ctx, input }) => {
            const organization = await ctx.prisma.organization.findFirst({
                where: { name: input.ownerSlug },
                select: { id: true, name: true, image: true },
            });

            // if no organization found, try to find user by username
            const user = !organization
                ? await ctx.prisma.user.findFirst({
                      select: { id: true, name: true, image: true },
                      where: { name: input.ownerSlug },
                  })
                : null;

            if (!organization && !user) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Repo not found",
                });
            }

            const ownerId = organization?.id || user?.id;
            const ownerName = organization?.name || user?.name;
            const ownerImage = organization?.image || user?.image;

            const repo = await ctx.prisma.repo.findFirst({
                where: {
                    name: input.repositorySlug,
                    OR: [
                        { public: true },
                        {
                            userOrganizationRepo: {
                                some: {
                                    AND: [
                                        {
                                            userMetadata: {
                                                userId: ctx.session.user.id,
                                            },
                                        },
                                        {
                                            organizationId: user
                                                ? null // if it is users repo, show if the current user has a role, or if it is public
                                                : organization!.id, // if it is a orgs repo, current user can see repo if there is any role (there is no 'guest' role)
                                        },
                                    ],
                                },
                            },
                        },
                    ],
                },
                include: {
                    userOrganizationRepo: {
                        select: { favorite: true, repoRole: true },
                        where: {
                            userMetadata: { userId: ctx.session.user.id },
                        },
                    },
                },
            });

            if (!repo) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Repo not found",
                });
            }

            if (repo.userOrganizationRepo.length > 1) {
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message:
                        "Failed server condition, there must be max one userOrganizationRepo row for a user",
                });
            }
            const userRepoRelation = repo.userOrganizationRepo.at(0);

            return {
                id: repo.id,
                ownerId: ownerId!,
                ownerName: ownerName!,
                name: repo.name,
                visibility: repo.public ? "public" : "private",
                favorite: userRepoRelation?.favorite ?? false,
                pinned: false,
                description: repo.description ?? undefined,
                ownerImage: ownerImage ?? undefined,
                createdAt: repo.createdAt,
                userRole: dbUserRoleToAppUserRole(userRepoRelation?.repoRole),
            } satisfies Repository;
        });
}

function reposByOwnerSlug() {
    return protectedProcedure
        .input(
            z.object({
                ownerSlug: z.string(),
            }),
        )
        .query(async ({ ctx, input }): Promise<Array<Repository>> => {
            const organization = await ctx.prisma.organization.findFirst({
                where: { name: input.ownerSlug },
            });

            // if no organization found, try to find user by username
            const user = !organization
                ? await ctx.prisma.user.findFirst({
                      where: { name: input.ownerSlug },
                  })
                : null;

            if (!organization && !user) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Repos not found",
                });
            }

            const ownerId = organization?.id || user?.id;
            const ownerName = organization?.name || user?.name;
            const ownerImage = organization?.image || user?.image;
            const canSeeRepoIds = await repoIdsUserCanSee(
                ctx.prisma,
                ctx.session.user,
                user ? user.id : organization!.id,
            );

            const repos = await ctx.prisma.repo.findMany({
                where: {
                    id: { in: canSeeRepoIds },
                },
                include: {
                    userOrganizationRepo: {
                        select: {
                            favorite: true,
                            repoRole: true,
                            pinned: true,
                        },
                        where: {
                            userMetadata: { userId: ctx.session.user.id },
                        },
                    },
                },
            });

            if (!repos) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Repo not found",
                });
            }

            return repos.map((repo) => {
                if (repo.userOrganizationRepo.length > 1) {
                    throw new Error(
                        "multiple userOrganizationRepo rows found for user, expected only one",
                    );
                }

                return {
                    id: repo.id,
                    ownerId: ownerId!,
                    ownerName: ownerName!,
                    name: repo.name,
                    visibility: repo.public ? "public" : "private",
                    favorite:
                        repo.userOrganizationRepo.at(0)?.favorite ?? false,
                    pinned: repo.userOrganizationRepo.at(0)?.pinned || false,
                    description: repo.description ?? undefined,
                    ownerImage: ownerImage ?? undefined,
                    createdAt: repo.createdAt,
                    userRole: dbUserRoleToAppUserRole(
                        repo.userOrganizationRepo.at(0)?.repoRole,
                    ),
                };
            });
        });
}

function toggleStateOnRepo() {
    return protectedProcedure
        .input(
            z.object({
                ownerId: z.string().uuid(),
                repoId: z.string().uuid(),
                favorite: z.boolean().optional(),
                pinned: z.boolean().optional(),
            }),
        )
        .mutation(
            async ({
                ctx,
                input,
            }): Promise<{ favorite: boolean; pinned?: boolean }> => {
                return await toggleRepoState(
                    ctx.prisma,
                    input.ownerId,
                    input.repoId,
                    input.favorite,
                    input.pinned,
                );
            },
        );
}

export async function pinnedRepos(
    prisma: PrismaType,
    ownerId: string,
    showPrivate: boolean,
): Promise<Array<RepositoryDisplay>> {
    // find if the ownerId is orgs
    const organization = await prisma.organization.findUnique({
        where: { id: ownerId },
        select: { id: true, name: true, image: true },
    });

    const whereClause = {
        AND: [
            { pinned: true },
            // Filter based on organization or user ownership
            organization
                ? { organizationId: ownerId }
                : {
                      AND: [
                          { userMetadata: { userId: ownerId } },
                          { organizationId: null },
                      ],
                  },
            // if not showPrivate, then return only public, else all
            ...(!showPrivate ? [{ repo: { public: true } }] : []),
        ],
    };
    const pinnedRepoConnections = await prisma.repoUserOrganization.findMany({
        where: whereClause,
        select: {
            repo: {
                select: {
                    id: true,
                    name: true,
                    public: true,
                },
            },
            userMetadata: { include: { user: true } },
        },
        orderBy: {
            repo: {
                name: "asc",
            },
        },
    });

    return pinnedRepoConnections.map(({ repo, userMetadata }) => ({
        id: repo.id,
        name: repo.name,
        ownerName: organization ? organization.name : userMetadata.user.name!,
        ownerImage: organization
            ? organization.image || undefined
            : userMetadata.user.image || undefined,
        visibility: repo.public ? "public" : "private",
    }));
}

/**
 * Current user can see repos if they are private, or, when the repos
 * are some users, then the current user must have at least a role, the
 * same applies to repos owned by orgs.
 */
async function repoIdsUserCanSee(
    prisma: PrismaType,
    currentUser: Session["user"] | null,
    ownerId: string,
): Promise<Array<string>> {
    // no current user, can't see private
    if (!currentUser) return [];

    // if (ownerUser) {
    const repos = await prisma.repo.findMany({
        where: {
            OR: [
                // repos owned by user/org, specified by ownerId
                {
                    userOrganizationRepo: {
                        some: {
                            OR: [
                                // user owns the repo
                                {
                                    userMetadata: { userId: ownerId },
                                    repoRole: $Enums.RepoRole.OWNER,
                                    organizationId: null,
                                },
                                // org owns the repo
                                {
                                    organizationId: ownerId,
                                    repoRole: {
                                        in: [
                                            $Enums.RepoRole.OWNER,
                                            $Enums.RepoRole.ADMIN,
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                },
            ],
            // in private repos, current user must have access
            AND: {
                OR: [
                    { public: true },
                    {
                        userOrganizationRepo: {
                            some: {
                                userMetadata: { userId: currentUser.id },
                            },
                        },
                    },
                ],
            },
        },
    });
    return repos.map((r) => r.id);
}

async function toggleRepoState(
    prisma: PrismaType,
    userId: string,
    repoId: string,
    favorite?: boolean,
    pinned?: boolean,
): Promise<{ favorite: boolean; pinned?: boolean }> {
    const userMetadata = await prisma.userMetadata.findUniqueOrThrow({
        where: { userId },
    });

    const userRepo = await prisma.repoUserOrganization.findUnique({
        where: {
            userMetadataId_repoId: {
                userMetadataId: userMetadata.id,
                repoId,
            },
        },
        select: {
            organizationId: true,
            repoRole: true,
            pinned: true,
            favorite: true,
        },
    });

    if (!userRepo) {
        throw new TRPCError({
            code: "FORBIDDEN",
            message: "Repository access not found",
        });
    }

    if (userRepo.organizationId !== null) {
        const allowedRoles: $Enums.RepoRole[] = ["ADMIN", "OWNER"];
        if (!allowedRoles.includes(userRepo.repoRole)) {
            throw new TRPCError({
                code: "FORBIDDEN",
                message: "Insufficient permissions to pin/unpin repository",
            });
        }
    }

    if (userRepo.organizationId !== null && pinned) {
        // user can't pin repo of an organization
        throw new TRPCError({
            code: "FORBIDDEN",
            message: "Can't pin orgs repo",
        });
    }

    const updatedRepo = await prisma.repoUserOrganization.update({
        where: {
            userMetadataId_repoId: {
                userMetadataId: userMetadata.id,
                repoId,
            },
        },
        data: { favorite, pinned },
    });

    return {
        favorite: updatedRepo.favorite,
        pinned: updatedRepo.pinned || undefined,
    };
}

function dbUserRoleToAppUserRole(userRole?: $Enums.RepoRole): RepoUserRole {
    if (!userRole) return "guest";

    switch (userRole) {
        case "ADMIN":
            return "admin";
        case "CONTRIBUTOR":
            return "contributor";
        case "VIEWER":
            return "viewer";
        case "OWNER":
            return "owner";
    }
}
