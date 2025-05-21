import { indexRepositorySymbols } from "@/antlr/SystemVerilog/utilities/monacoEditor/indexRepositorySymbols";
import { symbolTableManager } from "@/antlr/SystemVerilog/utilities/monacoEditor/symbolTable";
import {
    calculateLanguageStatistics,
    findReadmeFile,
    loadRepoDirOrFile,
    loadRepoItems,
} from "@/lib/files/repo-files";
import { $Enums } from "@/lib/prisma";
import {
    createRepositoryFormSchema,
    editRepositoryFormSchema,
    repoBySlugsSchema,
    repoItemSchema,
} from "@/lib/schemas/repo-schemas";
import { createTRPCRouter, protectedProcedure } from "@/lib/server/api/trpc";
import { PaginationResult } from "@/lib/types/generic";
import { Invitation, InvitationStatus } from "@/lib/types/invitation";
import {
    FileItem,
    Repository,
    RepositoryDisplay,
    RepositoryItem,
    RepositoryOverview,
    RepositorySettings,
} from "@/lib/types/repository";
import { UserDisplay } from "@/lib/types/user";
import { PrismaType } from "@/prisma";
import { TRPCError } from "@trpc/server";
import { exec } from "child_process";
import { access, mkdir, rename, rm, writeFile } from "fs/promises";
import { Session } from "next-auth";
import path from "path";
import util from "util";
import { z } from "zod";

const execPromise = util.promisify(exec);

export const repoRouter = createTRPCRouter({
    create: create(),
    search: searchByOwnerAndRepoSlug(),
    overview: repositoryOverview(),
    loadRepoItem: loadRepoItem(),
    ownersRepos: reposByOwnerSlug(),
    toggleState: toggleStateOnRepo(),
    fetchUserRepos: fetchUserRepos(),
    fetchOrgRepos: fetchOrgRepos(),
    fetchUserFavoriteRepos: fetchUserFavoriteRepos(),
    settings: repoSettings(),
    changeVisibility: changeVisibility(),
    delete: deleteRepo(),
    transfer: transfer(),
    edit: edit(),
    removeContributor: removeContributor(),
    loadAllFilesInRepo: loadAllFilesInRepo(),
    saveFileContent: saveFileContent(),
    loadOwnerAndRepoById: loadOwnerAndRepoById(),
});

function create() {
    return protectedProcedure
        .input(createRepositoryFormSchema)
        .mutation(async ({ ctx, input }): Promise<Repository> => {
            const { prisma, session } = ctx;
            const { ownerId, name, description, visibility } = input;

            if (await doesRepoExist(ctx.prisma, name, ownerId)) {
                throw new TRPCError({
                    code: "CONFLICT",
                    message:
                        "A repository with this name already exists under this owner",
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
                            "You must be a member of the organisation to create repositories",
                    });
                }
                ownerName = organization.name;
                ownerImage = organization.image;
                userRole = $Enums.RepoRole.ADMIN;
            } else {
                if (ownerId !== session.user.id) {
                    throw new TRPCError({
                        code: "FORBIDDEN",
                        message: "Invalid owner ID",
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
                        message: "Owner not found",
                    });
                }

                ownerName = user.name;
                ownerImage = user.image;
                userRole = $Enums.RepoRole.OWNER;
            }
            const repoPath = absoluteRepoPath(ownerName, name);
            return prisma.$transaction(async (tx) => {
                const repo = await tx.repo.create({
                    data: {
                        name,
                        description,
                        public: visibility === "public",
                    },
                });

                const userMetadata = await tx.userMetadata.findUniqueOrThrow({
                    where: { userId: session.user.id },
                    include: { user: true },
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
                    try {
                        await initializeGit(
                            name,
                            repoPath,
                            userMetadata.user.email,
                            userMetadata.user.name!,
                        );
                    } catch (gitError) {
                        console.error(
                            "Error initializing git repository:",
                            gitError,
                        );
                    }
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
                    userRole: userRole,
                } satisfies Repository;
            });
        });
}

function searchByOwnerAndRepoSlug() {
    return protectedProcedure
        .input(repoBySlugsSchema)
        .query(async ({ ctx, input }): Promise<Repository> => {
            const owner = await ownerBySlug(
                ctx.prisma,
                decodeURIComponent(input.ownerSlug.trim()),
            );
            const decodedRepositorySlug = decodeURIComponent(
                input.repositorySlug.trim(),
            );

            const repo = await repoBySlug(
                ctx.prisma,
                decodedRepositorySlug,
                ctx.session.user.id,
                owner,
            );
            if (!repo) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Repository not found",
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
            const repoPath = absoluteRepoPath(owner.name!, repo.name);

            const virtualPrefix = `${owner.name}/${repo.name}`;
            await indexRepositorySymbols(repoPath, virtualPrefix);
            
            const contentsTree = loadRepoItems(
                repoPath,
                input.loadItemsDisplaysDepth,
                false,
            );

            const isGitRepo =
                contentsTree.findIndex(
                    (item) =>
                        (item.type === "directory" ||
                            item.type === "directory-display") &&
                        item.name === ".git",
                ) !== -1;

            return {
                id: repo.id,
                ownerId: owner.id!,
                ownerName: owner.name!,
                name: repo.name,
                visibility: repo.public ? "public" : "private",
                favorite: userRepoRelation?.favorite ?? false,
                pinned: false,
                description: repo.description ?? undefined,
                ownerImage: owner.image,
                createdAt: repo.createdAt,
                userRole: userRepoRelation?.repoRole ?? "GUEST",
                tree: contentsTree,
                isGitRepo,
                symbolTable: {
                    globalSymbols: symbolTableManager.getAllSymbols(),
                    fileSymbols: symbolTableManager.debug(),
                },
            } satisfies Repository;
        });
}

function repositoryOverview() {
    return protectedProcedure
        .input(repoBySlugsSchema)
        .query(async ({ ctx, input }): Promise<RepositoryOverview> => {
            const owner = await ownerBySlug(ctx.prisma, input.ownerSlug);
            const decodedRepositorySlug = decodeURIComponent(
                input.repositorySlug.trim(),
            );
            const repo = await repoBySlug(
                ctx.prisma,
                decodedRepositorySlug,
                ctx.session.user.id,
                owner,
            );
            if (!repo) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Repository not found",
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
            const repoPath = absoluteRepoPath(owner.name!, repo.name);
            const readme = findReadmeFile(repoPath);
            const stats = await calculateLanguageStatistics(repoPath);

            return {
                id: repo.id,
                ownerId: owner.id!,
                ownerName: owner.name!,
                name: repo.name,
                visibility: repo.public ? "public" : "private",
                favorite: userRepoRelation?.favorite ?? false,
                pinned: false,
                description: repo.description ?? undefined,
                ownerImage: owner.image,
                createdAt: repo.createdAt,
                userRole: userRepoRelation?.repoRole ?? "GUEST",
                readme,
                stats,
            } satisfies RepositoryOverview;
        });
}
function loadRepoItem() {
    return protectedProcedure
        .input(repoItemSchema)
        .query(async ({ ctx, input }): Promise<RepositoryItem> => {
            const owner = await ownerBySlug(
                ctx.prisma,
                decodeURIComponent(input.ownerSlug),
            );
            const decodedRepositorySlug = decodeURIComponent(
                input.repositorySlug.trim(),
            );
            const repo = await repoBySlug(
                ctx.prisma,
                decodedRepositorySlug,
                ctx.session.user.id,
                owner,
            );
            if (!repo) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Repository not found",
                });
            }

            const itemPath = path.join(
                absoluteRepoPath(owner.name!, repo.name),
                input.path,
            );

            return loadRepoDirOrFile(
                itemPath,
                input.loadItemsDisplaysDepth,
                false,
            );
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
            const decodedOwnerSlug = decodeURIComponent(input.ownerSlug.trim());
            const organization = await ctx.prisma.organization.findFirst({
                where: { name: decodedOwnerSlug },
            });

            // if no organization found, try to find user by username
            const user = !organization
                ? await ctx.prisma.user.findFirst({
                      where: { name: decodedOwnerSlug },
                  })
                : null;

            if (!organization && !user) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Repositories not found",
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
                    message: "Repository not found",
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
                    userRole:
                        repo.userOrganizationRepo.at(0)?.repoRole ?? "GUEST",
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

function fetchUserRepos() {
    return protectedProcedure
        .input(
            z.object({
                ownerSlug: z.string(),
                nameSearchTerm: z.string().optional(),
                pinnedFilter: z.boolean().optional(),
                favoriteFilter: z.boolean().optional(),
                publicFilter: z.boolean().optional(),
                page: z.number().min(1),
                pageSize: z.number().min(1).max(100),
            }),
        )
        .query(async ({ ctx, input }) => {
            const {
                ownerSlug,
                nameSearchTerm,
                pinnedFilter,
                favoriteFilter,
                publicFilter,
                page,
                pageSize,
            } = input;

            const decodedUsername = decodeURIComponent(ownerSlug);
            const decodedQuery = decodeURIComponent(nameSearchTerm ?? "");

            const prisma = ctx.prisma;

            const owner = await prisma.user.findFirst({
                where: { name: decodedUsername },
                include: { metadata: true },
            });

            if (!owner || !owner.metadata) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Owner not found",
                });
            }

            const userMetadataId = owner.metadata.id;
            const sessionUserId = ctx.session?.user.id;
            const isCurrentUser = sessionUserId === owner.id;
            const shouldFilterPublic = isCurrentUser
                ? (publicFilter ?? undefined)
                : true;

            // Počítame celkový počet repozitárov (pre pagináciu)
            const total = await prisma.repoUserOrganization.count({
                where: {
                    userMetadataId,
                    repo: {
                        name: {
                            contains: decodedQuery ?? "",
                            mode: "insensitive",
                        },
                        public: shouldFilterPublic,
                    },
                    pinned: pinnedFilter ?? undefined,
                    favorite: favoriteFilter ?? undefined,
                },
            });

            // Fetch repozitárov s filtrom a pagináciou
            const repos = await prisma.repoUserOrganization.findMany({
                where: {
                    userMetadataId,
                    organizationId: null,
                    repo: {
                        name: {
                            contains: decodedQuery ?? "",
                            mode: "insensitive",
                        },
                        public: shouldFilterPublic,
                    },
                    pinned: pinnedFilter ?? undefined,
                    favorite: favoriteFilter ?? undefined,
                },
                include: {
                    repo: true,
                    userMetadata: {
                        include: { user: true },
                    },
                },
                orderBy: {
                    repo: {
                        name: "asc",
                    },
                },
                skip: (page - 1) * pageSize,
                take: pageSize,
            });

            const userRepos = repos.map(
                (repoUser): Repository => ({
                    id: repoUser.repo.id,
                    ownerId: repoUser.userMetadata.user.id,
                    ownerName: repoUser.userMetadata.user.name ?? "",
                    ownerImage: repoUser.userMetadata.user.image ?? undefined,
                    name: repoUser.repo.name,
                    description: repoUser.repo.description ?? undefined,
                    visibility: repoUser.repo.public ? "public" : "private",
                    favorite: repoUser.favorite,
                    pinned: repoUser.pinned ?? false,
                    createdAt: repoUser.repo.createdAt,
                    userRole: repoUser.repoRole,
                }),
            );

            const pagination: PaginationResult = {
                total,
                pageCount: Math.ceil(total / pageSize),
                page,
                pageSize,
            };

            return { userRepos, pagination };
        });
}

function fetchOrgRepos() {
    return protectedProcedure
        .input(
            z.object({
                organizationName: z.string(),
                nameSearchTerm: z.string().optional(),
                publicFilter: z.boolean().optional(),
                page: z.number().min(1),
                pageSize: z.number().min(1).max(100),
            }),
        )
        .query(async ({ ctx, input }) => {
            const {
                organizationName,
                nameSearchTerm,
                publicFilter,
                page,
                pageSize,
            } = input;

            const decodedOrgName = decodeURIComponent(organizationName);
            const decodedQuery = decodeURIComponent(nameSearchTerm ?? "");

            const prisma = ctx.prisma;
            const userId = ctx.session.user.id;

            const organization = await prisma.organization.findFirst({
                where: { name: decodedOrgName },
                include: { users: true },
            });

            if (!organization) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Organisation not found",
                });
            }

            const user = await prisma.user.findFirst({
                where: { id: userId },
                include: { metadata: true },
            });

            if (!user) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "User not found",
                });
            }

            const isMember = organization.users.some(
                (orgUser) => user?.metadata?.id === orgUser.userMetadataId,
            );

            const shouldFilterByPublic = isMember
                ? (publicFilter ?? undefined)
                : true;

            const total = await prisma.repo.count({
                where: {
                    userOrganizationRepo: {
                        some: {
                            organizationId: organization.id,
                        },
                    },
                    name: {
                        contains: decodedQuery ?? "",
                        mode: "insensitive",
                    },
                    public: shouldFilterByPublic,
                },
            });

            const repos = await prisma.repo.findMany({
                where: {
                    userOrganizationRepo: {
                        some: {
                            organizationId: organization.id,
                        },
                    },
                    name: {
                        contains: decodedQuery ?? "",
                        mode: "insensitive",
                    },
                    public: shouldFilterByPublic,
                },
                include: {
                    userOrganizationRepo: {
                        include: {
                            userMetadata: {
                                include: { user: true },
                            },
                        },
                    },
                },
                orderBy: {
                    name: "asc",
                },
                skip: (page - 1) * pageSize,
                take: pageSize,
            });

            const repositories = repos.map((repo): Repository => {
                return {
                    id: repo.id,
                    ownerId: organization.id,
                    ownerName: organization.name,
                    ownerImage: organization.image ?? undefined,
                    name: repo.name,
                    description: repo.description ?? undefined,
                    visibility: repo.public ? "public" : "private",
                    favorite: undefined,
                    pinned: undefined,
                    createdAt: repo.createdAt,
                    userRole: undefined,
                };
            });

            const pagination: PaginationResult = {
                total,
                pageCount: Math.ceil(total / pageSize),
                page,
                pageSize,
            };

            return { repositories, pagination };
        });
}

function fetchUserFavoriteRepos() {
    return protectedProcedure
        .input(
            z.object({
                username: z.string(),
                page: z.number().min(1),
                pageSize: z.number().min(1).max(100),
            }),
        )
        .query(async ({ ctx, input }) => {
            const { username, page, pageSize } = input;
            const decodedUsername = decodeURIComponent(username);

            const prisma = ctx.prisma;
            const sessionUserId = ctx.session?.user.id;

            // Fetch user metadata
            const userMetadata = await prisma.userMetadata.findFirst({
                where: { user: { name: decodedUsername } },
                include: { user: true },
            });

            if (!userMetadata) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "User not found",
                });
            }

            const isCurrentUser = sessionUserId === userMetadata.userId;

            // Fetch favorite repos using helper function
            const total = await prisma.repoUserOrganization.count({
                where: {
                    favorite: true,
                    userMetadataId: userMetadata.id,
                    ...(isCurrentUser ? {} : { repo: { public: true } }),
                },
            });

            const favoriteRepoConnections =
                await prisma.repoUserOrganization.findMany({
                    where: {
                        favorite: true,
                        userMetadataId: userMetadata.id,
                        ...(isCurrentUser ? {} : { repo: { public: true } }),
                    },
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
                        repo: { name: "asc" },
                    },
                    skip: (page - 1) * pageSize,
                    take: pageSize,
                });

            const favoriteRepositories: RepositoryDisplay[] =
                favoriteRepoConnections.map(({ repo, userMetadata }) => ({
                    id: repo.id,
                    ownerName: userMetadata.user.name!,
                    ownerImage: userMetadata.user.image || undefined,
                    name: repo.name,
                    visibility: repo.public ? "public" : "private",
                }));

            const pagination: PaginationResult = {
                total,
                pageCount: Math.ceil(total / pageSize),
                page,
                pageSize,
            };

            return { favoriteRepositories, pagination };
        });
}

function repoSettings() {
    return protectedProcedure
        .input(repoBySlugsSchema)
        .query(async ({ ctx, input }): Promise<RepositorySettings> => {
            const owner = await ownerBySlug(
                ctx.prisma,
                decodeURIComponent(input.ownerSlug.trim()),
            );
            const decodedRepositorySlug = decodeURIComponent(
                input.repositorySlug.trim(),
            );
            const repo = await repoBySlug(
                ctx.prisma,
                decodedRepositorySlug,
                ctx.session.user.id,
                owner,
            );
            if (!repo) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Repository not found",
                });
            }

            const isUserAdmin =
                repo.userOrganizationRepo.at(0)?.repoRole === "ADMIN";

            const invitations = await reposInvitations(ctx.prisma, repo.id);

            const pendingInvitations = await Promise.all(
                invitations
                    .filter(
                        (inv) => inv.status === $Enums.InvitationStatus.PENDING,
                    )
                    .map(async (inv) => await formatInvitation(inv, owner)),
            );

            const acceptedInvitations = await Promise.all(
                invitations
                    .filter(
                        (inv) =>
                            inv.status === $Enums.InvitationStatus.ACCEPTED,
                    )
                    .map(async (inv) => await formatInvitation(inv, owner)),
            );

            const declinedInvitations = await Promise.all(
                invitations
                    .filter(
                        (inv) =>
                            inv.status === $Enums.InvitationStatus.DECLINED,
                    )
                    .map(async (inv) => await formatInvitation(inv, owner)),
            );

            const contributors = (
                await repoContributors(ctx.prisma, repo.id)
            ).filter((c) => c.id !== ctx.session.user.id);

            const repository: Repository = {
                id: repo.id,
                ownerId: owner.id!,
                ownerName: owner.name!,
                name: repo.name,
                visibility: repo.public ? "public" : "private",
                favorite: repo.userOrganizationRepo[0].favorite ?? false,
                pinned: false,
                description: repo.description ?? undefined,
                ownerImage: owner.image,
                createdAt: repo.createdAt,
                contributors,
                userRole: repo.userOrganizationRepo[0].repoRole,
            };

            return {
                repository,
                pendingInvitations,
                acceptedInvitations,
                declinedInvitations,
                isUserAdmin,
            };
        });
}

function changeVisibility() {
    return protectedProcedure
        .input(z.object({ repoId: z.string().uuid(), public: z.boolean() }))
        .mutation(async ({ ctx, input }) => {
            const repo = await ctx.prisma.repo.findUniqueOrThrow({
                where: { id: input.repoId },
                include: {
                    userOrganizationRepo: {
                        select: { repoRole: true },
                        where: {
                            userMetadata: { userId: ctx.session.user.id },
                        },
                    },
                },
            });

            if (repo.userOrganizationRepo.length > 1) {
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message:
                        "Failed server condition, there must be max one userOrganizationRepo row for a user",
                });
            }

            if (
                repo.userOrganizationRepo[0].repoRole !==
                    $Enums.RepoRole.ADMIN &&
                repo.userOrganizationRepo[0].repoRole !== $Enums.RepoRole.OWNER
            ) {
                throw new TRPCError({
                    code: "FORBIDDEN",
                    message: "You are not an admin of this repository",
                });
            }

            await ctx.prisma.repo.update({
                where: { id: input.repoId },
                data: { public: input.public },
            });
        });
}

function deleteRepo() {
    return protectedProcedure
        .input(z.object({ repoId: z.string().uuid() }))
        .mutation(async ({ ctx, input }) => {
            const userMetadata =
                await ctx.prisma.userMetadata.findUniqueOrThrow({
                    where: { userId: ctx.session.user.id },
                });

            // check if the user has permission to delete the repository
            const userRepoRelation =
                await ctx.prisma.repoUserOrganization.findUnique({
                    where: {
                        userMetadataId_repoId: {
                            userMetadataId: userMetadata.id,
                            repoId: input.repoId,
                        },
                    },
                });

            // Only OWNER or ADMIN can delete a repository
            if (
                !userRepoRelation ||
                (userRepoRelation.repoRole !== $Enums.RepoRole.OWNER &&
                    userRepoRelation.repoRole !== $Enums.RepoRole.ADMIN)
            ) {
                throw new TRPCError({
                    code: "FORBIDDEN",
                    message:
                        "You do not have permission to delete this repository",
                });
            }

            const repoPath = await resolveRepoPath(
                ctx.prisma,
                userRepoRelation.repoId,
            );

            return ctx.prisma.$transaction(async (tx) => {
                // delete all repository invitations
                await tx.repoUserInvitation.deleteMany({
                    where: { repoId: input.repoId },
                });

                // delete all repository user organization relationships
                await tx.repoUserOrganization.deleteMany({
                    where: { repoId: input.repoId },
                });

                // delete the repository itself
                await tx.repo.delete({
                    where: { id: input.repoId },
                });

                // delete the repository itself from file system
                try {
                    if (!repoPath) return;
                    await access(repoPath);
                    await rm(repoPath, { recursive: true, force: true });
                } catch (fsError) {
                    console.error(
                        `Error deleting repository files at ${repoPath}:`,
                        fsError,
                    );
                }
            });
        });
}

function transfer() {
    return protectedProcedure
        .input(
            z.object({
                repoId: z.string().uuid(),
                newOwnerType: z.enum(["user", "org"]),
                newOwnerId: z.string().uuid(),
            }),
        )
        .mutation(async ({ ctx, input }) => {
            const currentUserRole =
                await ctx.prisma.repoUserOrganization.findFirstOrThrow({
                    select: { repoRole: true, organizationId: true },
                    where: {
                        AND: [
                            { userMetadata: { userId: ctx.session.user.id } },
                            { repoId: input.repoId },
                        ],
                    },
                });

            if (
                currentUserRole.repoRole !== $Enums.RepoRole.ADMIN &&
                currentUserRole.repoRole !== $Enums.RepoRole.OWNER
            ) {
                throw new TRPCError({
                    code: "FORBIDDEN",
                    message:
                        "You do not have permission to transfer ownership of this repository",
                });
            }

            const oldRepoPath = await resolveRepoPathOrThrow(
                ctx.prisma,
                input.repoId,
            );
            const isOwnerByOrg = currentUserRole.organizationId !== null;

            let newOwner: { ownerName: string; repoName: string };
            if (input.newOwnerType === "user") {
                newOwner = await transferOwnershipToUser(
                    ctx.prisma,
                    input.repoId,
                    input.newOwnerId,
                    isOwnerByOrg,
                );
            } else {
                newOwner = await transferOwnershipToOrg(
                    ctx.prisma,
                    input.repoId,
                    input.newOwnerId,
                    isOwnerByOrg,
                );
            }

            const newRepoPath = absoluteRepoPath(
                newOwner.ownerName,
                newOwner.repoName,
            );

            const newOwnerDir = absoluteRepoPath(newOwner.ownerName);

            try {
                await mkdir(newOwnerDir, { recursive: true });
                await rename(oldRepoPath, newRepoPath);

                return {
                    ownerName: newOwner.ownerName,
                    repoName: newOwner.repoName,
                };
            } catch (error) {
                console.error("Failed to move repository files:", error);
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: "Failed to move repository files",
                });
            }
        });
}

function edit() {
    return protectedProcedure
        .input(editRepositoryFormSchema)
        .mutation(async ({ ctx, input }) => {
            const userId = ctx.session.user.id;
            const userMetadata =
                await ctx.prisma.userMetadata.findUniqueOrThrow({
                    where: { userId },
                });

            const userRepoRelation =
                await ctx.prisma.repoUserOrganization.findUnique({
                    where: {
                        userMetadataId_repoId: {
                            userMetadataId: userMetadata.id,
                            repoId: input.repoId,
                        },
                    },
                    select: {
                        repoRole: true,
                    },
                });

            if (
                !userRepoRelation ||
                (userRepoRelation.repoRole !== "ADMIN" &&
                    userRepoRelation.repoRole !== "OWNER")
            ) {
                throw new TRPCError({
                    code: "FORBIDDEN",
                    message:
                        "You don't have permission to edit this repository",
                });
            }

            const currentRepo = await ctx.prisma.repo.findUniqueOrThrow({
                where: { id: input.repoId },
                select: { name: true },
            });

            const repoOwnerInfo = await resolveRepoOwnerAndName(
                ctx.prisma,
                input.repoId,
            );
            if (!repoOwnerInfo) {
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: "Failed to resolve repository owner information",
                });
            }

            if (currentRepo.name !== input.name) {
                const currentRepoPath = absoluteRepoPath(
                    repoOwnerInfo.ownerName,
                    currentRepo.name,
                );
                const newRepoPath = absoluteRepoPath(
                    repoOwnerInfo.ownerName,
                    input.name,
                );
                try {
                    await mkdir(path.dirname(newRepoPath), { recursive: true });
                    await rename(currentRepoPath, newRepoPath);
                } catch (error) {
                    console.error("Failed to move repository files:", error);
                    throw new TRPCError({
                        code: "INTERNAL_SERVER_ERROR",
                        message: "Failed to move repository files",
                        cause: error,
                    });
                }
            }

            await ctx.prisma.repo.update({
                where: {
                    id: input.repoId,
                },
                data: {
                    name: input.name,
                    description: input.description,
                },
            });

            return {
                ownerName: repoOwnerInfo.ownerName,
                repoName: input.name,
            };
        });
}

function removeContributor() {
    return protectedProcedure
        .input(
            z.object({
                contributorId: z.string().uuid(),
                repoId: z.string().uuid(),
            }),
        )
        .mutation(async ({ ctx, input }) => {
            const currentUserMetadata =
                await ctx.prisma.userMetadata.findUniqueOrThrow({
                    where: { userId: ctx.session.user.id },
                });

            const currentUserRepoRelation =
                await ctx.prisma.repoUserOrganization.findUnique({
                    where: {
                        userMetadataId_repoId: {
                            userMetadataId: currentUserMetadata.id,
                            repoId: input.repoId,
                        },
                    },
                    select: { repoRole: true },
                });

            if (
                !currentUserRepoRelation ||
                (currentUserRepoRelation.repoRole !== "ADMIN" &&
                    currentUserRepoRelation.repoRole !== "OWNER")
            ) {
                throw new TRPCError({
                    code: "FORBIDDEN",
                    message:
                        "You don't have permission to remove contributors from this repository",
                });
            }

            const contributorMetadata =
                await ctx.prisma.userMetadata.findUnique({
                    where: { userId: input.contributorId },
                });

            if (!contributorMetadata) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Contributor not found",
                });
            }

            const contributorRepoRelation =
                await ctx.prisma.repoUserOrganization.findUnique({
                    where: {
                        userMetadataId_repoId: {
                            userMetadataId: contributorMetadata.id,
                            repoId: input.repoId,
                        },
                    },
                    select: { repoRole: true },
                });

            if (!contributorRepoRelation) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message:
                        "This user is not a contributor to this repository",
                });
            }

            // prevent removing an OWNER (only OWNER can remove themselves)
            if (
                contributorRepoRelation.repoRole === "OWNER" &&
                currentUserRepoRelation.repoRole !== "OWNER"
            ) {
                throw new TRPCError({
                    code: "FORBIDDEN",
                    message: "You cannot remove an owner from the repository",
                });
            }

            // prevent removing yourself if you're the only OWNER
            if (
                contributorMetadata.id === currentUserMetadata.id &&
                contributorRepoRelation.repoRole === "OWNER"
            ) {
                const ownersCount = await ctx.prisma.repoUserOrganization.count(
                    {
                        where: {
                            repoId: input.repoId,
                            repoRole: { in: ["OWNER", "ADMIN"] },
                        },
                    },
                );

                if (ownersCount <= 1) {
                    throw new TRPCError({
                        code: "FORBIDDEN",
                        message:
                            "You cannot remove yourself as the only owner. Transfer ownership first.",
                    });
                }
            }

            await ctx.prisma.repoUserOrganization.delete({
                where: {
                    userMetadataId_repoId: {
                        userMetadataId: contributorMetadata.id,
                        repoId: input.repoId,
                    },
                },
            });

            // Also delete any invitations for this user to this repo
            await ctx.prisma.repoUserInvitation.deleteMany({
                where: {
                    userMetadataId: contributorMetadata.id,
                    repoId: input.repoId,
                },
            });
        });
}

async function transferOwnershipToUser(
    prisma: PrismaType,
    repoId: string,
    userId: string,
    isOwnerByOrg: boolean,
): Promise<{ ownerName: string; repoName: string }> {
    return prisma.$transaction(async (tx) => {
        // going from org owned repo to user owned one, delete all organizationId
        // from roles
        if (isOwnerByOrg) {
            await tx.repoUserOrganization.updateMany({
                where: { repoId },
                data: { organizationId: null },
            });
        }

        const userMetadata = await tx.userMetadata.findUniqueOrThrow({
            include: { user: true },
            where: { userId },
        });
        const userRole = await tx.repoUserOrganization.findUnique({
            where: {
                userMetadataId_repoId: {
                    repoId,
                    userMetadataId: userMetadata.id,
                },
            },
        });

        // if user already has an role, promote him to owner
        if (userRole) {
            await tx.repoUserOrganization.update({
                where: {
                    userMetadataId_repoId: {
                        repoId: userRole.repoId,
                        userMetadataId: userRole.userMetadataId,
                    },
                },
                data: { repoRole: $Enums.RepoRole.OWNER },
            });
        } else {
            await tx.repoUserOrganization.create({
                data: {
                    userMetadataId: userMetadata.id,
                    repoId: repoId,
                    repoRole: $Enums.RepoRole.OWNER,
                    favorite: false,
                },
            });
        }
        const repo = await tx.repo.findUniqueOrThrow({ where: { id: repoId } });
        return { ownerName: userMetadata.user.name!, repoName: repo.name };
    });
}

async function transferOwnershipToOrg(
    prisma: PrismaType,
    repoId: string,
    orgId: string,
    isOwnerByOrg: boolean,
): Promise<{ ownerName: string; repoName: string }> {
    return prisma.$transaction(async (tx) => {
        // going from user owned repo to org owned one, demote current owner
        if (!isOwnerByOrg) {
            await tx.repoUserOrganization.updateMany({
                where: { repoId, repoRole: $Enums.RepoRole.OWNER },
                data: { repoRole: $Enums.RepoRole.ADMIN },
            });
        }

        await tx.repoUserOrganization.updateMany({
            where: { repoId },
            data: { organizationId: orgId },
        });

        const org = await tx.organization.findUniqueOrThrow({
            where: { id: orgId },
        });
        const repo = await tx.repo.findUniqueOrThrow({ where: { id: repoId } });
        return { ownerName: org.name, repoName: repo.name };
    });
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

export async function favoriteRepos(
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
            { favorite: true },
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
    const favoriteRepoConnections = await prisma.repoUserOrganization.findMany({
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

    return favoriteRepoConnections.map(({ repo, userMetadata }) => ({
        id: repo.id,
        name: repo.name,
        ownerName: organization ? organization.name : userMetadata.user.name!,
        ownerImage: organization
            ? organization.image || undefined
            : userMetadata.user.image || undefined,
        visibility: repo.public ? "public" : "private",
    }));
}

export async function recentRepos(
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
    const recentRepoConnections = await prisma.repoUserOrganization.findMany({
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
            lastVisitedAt: "desc",
        },
        take: 3,
    });

    return recentRepoConnections.map(({ repo, userMetadata }) => ({
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
            message: "Cannot pin a repository of an organisation",
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

export async function ownerBySlug(
    prisma: PrismaType,
    ownerSlug: string,
): Promise<{ type: "org" | "user"; id: string; name: string; image?: string }> {
    const decodedOwnerSlug = decodeURIComponent(ownerSlug.trim());
    const organization = await prisma.organization.findFirst({
        where: { name: decodedOwnerSlug },
        select: { id: true, name: true, image: true },
    });

    if (organization) {
        return {
            type: "org",
            id: organization.id,
            name: organization.name,
            image: organization.image || undefined,
        };
    }
    const user = await prisma.user.findFirst({
        select: { id: true, name: true, image: true },
        where: {
            name: {
                equals: decodedOwnerSlug,
                mode: "insensitive",
            },
        },
    });

    if (!user) {
        throw new TRPCError({
            code: "NOT_FOUND",
            message: "Repository not found",
        });
    }

    return {
        type: "user",
        id: user.id,
        name: user.name!,
        image: user.image || undefined,
    };
}

export async function repoBySlug(
    prisma: PrismaType,
    slug: string,
    sessionUserId: string,
    owner: Awaited<ReturnType<typeof ownerBySlug>>,
) {
    return await prisma.repo.findFirst({
        where: {
            name: slug,
            OR: [
                { public: true },
                {
                    userOrganizationRepo: {
                        some: {
                            AND: [
                                {
                                    userMetadata: {
                                        userId: sessionUserId,
                                    },
                                },
                                {
                                    organizationId:
                                        owner.type === "user"
                                            ? null // if it is users repo, show if the current user has a role, or if it is public
                                            : owner.id, // if it is a orgs repo, current user can see repo if there is any role (there is no 'guest' role)
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
                    userMetadata: { userId: sessionUserId },
                },
            },
        },
    });
}

export async function doesRepoExist(
    prisma: PrismaType,
    name: string,
    ownerId: string,
) {
    return await prisma.repoUserOrganization.findFirst({
        where: {
            repo: { name },
            OR: [
                { userMetadata: { userId: ownerId } },
                { organizationId: ownerId },
            ],
        },
    });
}

async function reposInvitations(prisma: PrismaType, repoId: string) {
    return prisma.repoUserInvitation.findMany({
        where: { repoId },
        include: {
            repo: true,
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

const formatInvitation = async (
    inv: Awaited<ReturnType<typeof reposInvitations>>[number],
    owner: Awaited<ReturnType<typeof ownerBySlug>>,
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

    const repo: RepositoryDisplay = {
        id: inv.repo.id,
        ownerName: owner.name,
        ownerImage: owner.image,
        name: inv.repo.name,
        visibility: inv.repo.public ? "public" : "private",
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
        id: `${inv.userMetadataId}_${inv.repoId}`,
        type: "repository",
        sender,
        repository: repo,
        receiver,
        status,
        createdAt: inv.createdAt,
        resolvedAt: inv.resolvedAt || undefined,
    };
};

async function repoContributors(
    prisma: PrismaType,
    repoId: string,
): Promise<Array<UserDisplay>> {
    const roles = await prisma.repoUserOrganization.findMany({
        where: { repoId },
        include: {
            userMetadata: {
                include: { user: true },
            },
        },
    });

    return roles.map((role): UserDisplay => {
        return {
            id: role.userMetadata.user.id,
            username: role.userMetadata.user.name!,
            image: role.userMetadata.user.image || undefined,
        };
    });
}

export async function resolveRepoPathOrThrow(
    prisma: PrismaType,
    repoId: string,
): Promise<string> {
    const repoPath = await resolveRepoPath(prisma, repoId);
    if (!repoPath) {
        throw new TRPCError({
            code: "NOT_FOUND",
            message: `Repository not found for repoId: ${repoId}`,
        });
    }
    return repoPath;
}

export async function resolveRepoPath(
    prisma: PrismaType,
    repoId: string,
): Promise<string | null> {
    const repoNames = await resolveRepoOwnerAndName(prisma, repoId);
    if (!repoNames) return null;

    return absoluteRepoPath(repoNames.ownerName, repoNames.repoName);
}

async function resolveRepoOwnerAndName(
    prisma: PrismaType,
    repoId: string,
): Promise<{ ownerName: string; repoName: string } | null> {
    const repo = await prisma.repo.findUnique({
        where: { id: repoId },
        select: { name: true },
    });

    if (!repo) {
        return null;
    }

    // 2. first check if it's a user-owned repository (has OWNER role)
    const ownerRelation = await prisma.repoUserOrganization.findFirst({
        where: {
            repoId,
            repoRole: $Enums.RepoRole.OWNER,
        },
        include: {
            userMetadata: {
                select: {
                    user: true,
                },
            },
        },
    });

    if (ownerRelation) {
        return {
            ownerName: ownerRelation.userMetadata.user.name!,
            repoName: repo.name,
        };
    }

    // 4. If no OWNER relation, check for organization ownership (ADMIN role with org)
    const adminOrgRelation = await prisma.repoUserOrganization.findFirst({
        where: {
            repoId,
            repoRole: $Enums.RepoRole.ADMIN,
            organizationId: { not: null },
        },
        include: {
            organization: {
                select: {
                    name: true,
                },
            },
        },
    });

    // 5. if there's an ADMIN relation with org, it's org-owned
    if (adminOrgRelation && adminOrgRelation.organization) {
        const ownerName = adminOrgRelation.organization.name;
        return {
            ownerName,
            repoName: repo.name,
        };
    }

    return null;
}

export async function hasUserRole(
    prisma: PrismaType,
    repoId: string,
    currentUserId: string,
    roles: Array<$Enums.RepoRole>,
) {
    const repo = await prisma.repo.findUnique({ where: { id: repoId } });

    if (!repo) {
        throw new TRPCError({
            code: "NOT_FOUND",
            message: "Repo not found",
        });
    }

    const userMetadata = await prisma.userMetadata.findFirstOrThrow({
        where: { userId: currentUserId },
    });

    const userRepoRelation =
        await prisma.repoUserOrganization.findUniqueOrThrow({
            where: {
                userMetadataId_repoId: {
                    userMetadataId: userMetadata.id,
                    repoId: repo.id,
                },
            },
        });

    if (!roles.includes(userRepoRelation.repoRole)) {
        throw new TRPCError({
            code: "FORBIDDEN",
            message: "You need at least contributor role to view git changes",
        });
    }
}

export function absoluteRepoPath(
    ownerName: string,
    repoName: string = "",
): string {
    const storageRoot = ensureStorageRootSet();
    return path.join(storageRoot, ownerName, repoName);
}

export function getRelativePathInRepo(absolutePath: string): string {
    const storageRoot = ensureStorageRootSet();
    const normalizedAbsolutePath = path.normalize(absolutePath);
    // path relative to the storage root
    const pathRelativeToRoot = path.relative(
        storageRoot,
        normalizedAbsolutePath,
    ); // e.g., "ownerName/repoName/src/index.ts" or "ownerName\repoName"

    const components = pathRelativeToRoot
        .split(path.sep)
        .filter((comp) => comp !== "");

    // are there enough components (at least ownerName and repoName)
    if (components.length <= 2) {
        // the path relative to root is just "ownerName", "ownerName/repoName",
        // or empty, stripping them leaves nothing (the root of the repo).
        return "";
    } else {
        // remove the first two components (ownerName, repoName)
        const remainingComponents = components.slice(2);
        // join the rest back together
        return path.join(...remainingComponents);
    }
}

function ensureStorageRootSet(): string {
    const storageRoot = process.env.REPOSITORIES_STORAGE_ROOT;
    if (!storageRoot || storageRoot === "") {
        throw new Error(
            "REPOSITORIES_STORAGE_ROOT environment variable is not set or empty.",
        );
    }
    return path.normalize(storageRoot);
}

export async function initializeGit(
    repoName: string,
    repoPath: string,
    userEmail: string,
    userName: string,
) {
    await execPromise(`git init "${repoPath}"`);

    await execPromise(`git -C "${repoPath}" config user.email "${userEmail}"`);
    await execPromise(`git -C "${repoPath}" config user.name "${userName}"`);

    const readmePath = path.join(repoPath, "README.md");
    const readmeContent = `# ${repoName}`;
    await writeFile(readmePath, readmeContent);

    await execPromise(`git -C "${repoPath}" add .`);
    await execPromise(`git -C "${repoPath}" commit -m "Initial commit"`);

    await execPromise(`git -C "${repoPath}" config --unset user.email`);
    await execPromise(`git -C "${repoPath}" config --unset user.name`);
}

/**
 * Retrieves all files from a repository, flattening the directory structure.
 * This procedure:
 * 1. Validates repository access permissions
 * 2. Loads the complete file tree recursively
 * 3. Flattens the tree structure into a single array of files
 * 
 * @param input.ownerSlug - Repository owner's slug (username/organization name)
 * @param input.repositorySlug - Repository name slug
 * @returns Array of FileItem objects representing all files in the repository
 * @throws {TRPCError} If repository is not found or user lacks access permissions
 */
function loadAllFilesInRepo() {
    return protectedProcedure
        .input(repoBySlugsSchema)
        .query(async ({ ctx, input }) => {
            const owner = await ownerBySlug(
                ctx.prisma,
                decodeURIComponent(input.ownerSlug),
            );
            const decodedRepoSlug = decodeURIComponent(input.repositorySlug);
            const repo = await repoBySlug(
                ctx.prisma,
                decodedRepoSlug,
                ctx.session.user.id,
                owner,
            );

            if (!repo) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Repository not found",
                });
            }

            const repoPath = absoluteRepoPath(owner.name!, repo.name);
            const tree = loadRepoItems(repoPath, -1, true);

            /**
             * Recursively flattens a directory tree into an array of files
             * @param item - Repository item (file or directory) to process
             * @returns Array of FileItem objects
             */
            function flattenFiles(item: RepositoryItem): FileItem[] {
                if (item.type === "file") return [item];

                if (item.type === "directory" && item.children) {
                    return item.children.flatMap(flattenFiles);
                }

                return [];
            }

            return tree.flatMap(flattenFiles);
        });
}

/**
 * Saves content to a file in a repository.
 * This protected procedure handles file writing operations with proper access control.
 * 
 * @param input.repoId - Repository ID
 * @param input.path - Path to the file within the repository
 * @param input.content - Content to write to the file
 * @returns Object indicating success of the operation
 * @throws {TRPCError} If repository is not found or file operation fails
 */
function saveFileContent() {
    return protectedProcedure
        .input(z.object({
            repoId: z.string(),
            path: z.string(),
            content: z.string(),
        }))
        .mutation(async ({ ctx, input }) => {
            const repoPath = await resolveRepoPathOrThrow(ctx.prisma, input.repoId);
            const filePath = path.join(repoPath, input.path);
            await writeFile(filePath, input.content, "utf-8");
            return { success: true };
        });
}

/**
 * Retrieves the owner name and repository name for a given repository ID.
 * Used for resolving repository information when only the ID is available.
 * 
 * @param input.repositoryId - UUID of the repository
 * @returns Object containing ownerName and repoName
 * @throws {TRPCError} If repository is not found
 */
function loadOwnerAndRepoById() {
    return protectedProcedure
        .input(z.object({ repositoryId: z.string() }))
        .query(async ({ ctx, input }) => {
            const result = await resolveRepoOwnerAndName(ctx.prisma, input.repositoryId);

            if (!result) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Repository not found",
                });
            }

            return result; // { ownerName, repoName }
        });
}

