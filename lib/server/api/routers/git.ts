import { readGithubRepoBranches, readUsersGithubRepos } from "@/lib/github";
import { paginationSchema } from "@/lib/schemas/common-schemas";
import { cloneRepoSchema, commitSchema } from "@/lib/schemas/git-schemas";
import {
    absoluteRepoPath,
    hasUserRole,
    resolveRepoPathOrThrow,
} from "@/lib/server/api/routers/repos";
import { createTRPCRouter, protectedProcedure } from "@/lib/server/api/trpc";
import { RepositoryItemChange } from "@/lib/types/repository";
import { ReturnTypeOf } from "@octokit/core/dist-types/types";
import { $Enums } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { exec } from "child_process";
import { access, mkdir, rm } from "fs/promises";
import path from "path";
import util from "util";
import { z } from "zod";

const execPromise = util.promisify(exec);

export const gitRouter = createTRPCRouter({
    userGithubRepos: userGithubRepos(),
    githubBranches: githubRepoBranches(),
    clone: clone(),
    changes: gitChanges(),
    commit: gitCommit(),
});

function userGithubRepos() {
    return protectedProcedure
        .input(
            paginationSchema.extend({
                affiliation: z.enum([
                    "owner",
                    "collaborator",
                    "organization_member",
                ]),
            }),
        )
        .query(
            async ({
                ctx,
                input,
            }): ReturnTypeOf<typeof readUsersGithubRepos> => {
                return readUsersGithubRepos(
                    ctx.session,
                    input.affiliation,
                    input.page,
                    input.pageSize,
                );
            },
        );
}

function clone() {
    return protectedProcedure
        .input(cloneRepoSchema)
        .mutation(async ({ ctx, input }) => {
            const user = await ctx.prisma.user.findUnique({
                where: { id: ctx.session.user.id },
                include: { metadata: true },
            });

            if (!user || !user.metadata) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "User not found",
                });
            }

            if (input.ownerType === "user") {
                if (input.ownerId !== ctx.session.user.id) {
                    throw new TRPCError({
                        code: "FORBIDDEN",
                        message:
                            "You can only create repositories for yourself or for an organisation you are a part of",
                    });
                }
            } else if (input.ownerType === "org") {
                const orgUser = await ctx.prisma.organizationUser.findUnique({
                    where: {
                        userMetadataId_organizationId: {
                            userMetadataId: user.metadata.id,
                            organizationId: input.ownerId,
                        },
                    },
                });

                if (!orgUser || orgUser.role !== "ADMIN") {
                    throw new TRPCError({
                        code: "FORBIDDEN",
                        message:
                            "You must be an admin of an organisation to create repositories",
                    });
                }
            }

            // Get the owner name (user or organization)
            let ownerName = user.name;
            if (input.ownerType === "org") {
                const organization = await ctx.prisma.organization.findUnique({
                    where: { id: input.ownerId },
                });

                if (!organization) {
                    throw new TRPCError({
                        code: "NOT_FOUND",
                        message: "Organisation not found",
                    });
                }

                ownerName = organization.name;
            }

            if (!ownerName) {
                throw new TRPCError({
                    code: "BAD_REQUEST",
                    message: "Owner name is required",
                });
            }

            const ownerReposRoot = absoluteRepoPath(ownerName);
            await mkdir(ownerReposRoot, { recursive: true });
            const [, repoName] = input.githubFullName.split("/");
            const targetDirName = input.name || repoName;
            const targetPath = path.join(ownerReposRoot, targetDirName);

            // check if repo with same name exists for this owner
            const repoExists = await ctx.prisma.repo.findFirst({
                where: {
                    name: targetDirName,
                    userOrganizationRepo:
                        input.ownerType === "user"
                            ? {
                                  some: {
                                      userMetadata: {
                                          userId: ctx.session.user.id,
                                      },
                                      organizationId: null,
                                  },
                              }
                            : {
                                  some: {
                                      organizationId: input.ownerId,
                                  },
                              },
                },
            });

            if (repoExists) {
                throw new TRPCError({
                    code: "CONFLICT",
                    message: `Repository with name '${targetDirName}' already exists`,
                });
            }

            const directoryExists = await access(targetPath)
                .then(() => true)
                .catch(() => false);
            if (directoryExists) {
                await rm(targetPath, { recursive: true, force: true });
            }

            const accessToken = ctx.session.accessToken;
            const cloneUrl = `https://oauth2:${accessToken}@github.com/${input.githubFullName}.git`;

            let cmd = "git clone";
            if (input.branch) {
                cmd += ` -b ${input.branch}`;
            }
            cmd += ` ${cloneUrl} "${targetPath}"`;

            try {
                await execPromise(cmd);

                await ctx.prisma.$transaction(async (tx) => {
                    const repo = await tx.repo.create({
                        data: {
                            name: targetDirName,
                            description:
                                input.description ||
                                `Cloned from ${input.githubFullName}`,
                            public: input.visibility === "public",
                        },
                    });

                    await tx.repoUserOrganization.create({
                        data: {
                            repoId: repo.id,
                            userMetadataId: user.metadata!.id,
                            organizationId:
                                input.ownerType === "org"
                                    ? input.ownerId
                                    : null,
                            repoRole:
                                input.ownerType === "user"
                                    ? $Enums.RepoRole.OWNER
                                    : $Enums.RepoRole.ADMIN,
                            favorite: false,
                            pinned: false,
                        },
                    });
                });

                return { ownerName, repoName: targetDirName };
            } catch (error) {
                if (
                    await access(targetPath)
                        .then(() => true)
                        .catch(() => false)
                ) {
                    await rm(targetPath, { recursive: true, force: true });
                }

                const errorMessage =
                    error instanceof Error ? error.message : String(error);

                if (errorMessage.includes("Repository not found")) {
                    throw new TRPCError({
                        code: "NOT_FOUND",
                        message: `Repository not found`,
                    });
                }

                // DO NOT return the errorMessage as message, because it
                // will leak users oauth token from the command to client
                console.error("Error cloning repo from github", errorMessage);
                throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
            }
        });
}

function gitChanges() {
    return protectedProcedure
        .input(z.object({ repoId: z.string().uuid() }))
        .query(
            async ({
                ctx,
                input,
            }): Promise<{ changes: Array<RepositoryItemChange> }> => {
                await hasUserRole(
                    ctx.prisma,
                    input.repoId,
                    ctx.session.user.id,
                    ["OWNER", "ADMIN", "CONTRIBUTOR"],
                );

                const repoPath = await resolveRepoPathOrThrow(
                    ctx.prisma,
                    input.repoId,
                );

                const gitDirPath = path.join(repoPath, ".git");
                try {
                    await access(gitDirPath);
                } catch (error) {
                    throw new TRPCError({
                        code: "BAD_REQUEST",
                        message: "This repository doesn't have git initialized",
                        cause: error,
                    });
                }

                try {
                    await execPromise(`git -C "${repoPath}" add .`);
                    const { stdout: statusOutput } = await execPromise(
                        `git -C "${repoPath}" status --porcelain`,
                    );

                    const renamedFiles = new Map<string, string>();
                    statusOutput
                        .split("\n")
                        .filter(Boolean)
                        .forEach((line) => {
                            const parts = line.trim().split("  ");
                            if (parts.length >= 3 && parts[0].startsWith("R")) {
                                const oldPath = parts[1];
                                const newPath = parts[2];
                                renamedFiles.set(newPath, oldPath);
                            }
                        });

                    const changes: RepositoryItemChange[] = statusOutput
                        .split("\n")
                        .filter((line) => line.trim() !== "")
                        .map((line) => {
                            const statusCode = line.substring(0, 2).trim();
                            const filePath = line.substring(3).trim();

                            if (statusCode === "A") {
                                return {
                                    itemPath: filePath,
                                    change: { type: "added" },
                                };
                            } else if (statusCode === "M") {
                                return {
                                    itemPath: filePath,
                                    change: { type: "modified" },
                                };
                            } else if (statusCode === "D") {
                                return {
                                    itemPath: filePath,
                                    change: { type: "deleted" },
                                };
                            } else if (statusCode === "R") {
                                const parts = line
                                    .substring(2)
                                    .trim()
                                    .split(" -> ");
                                if (parts.length === 2) {
                                    if (
                                        path.basename(parts[0]) ===
                                        path.basename(parts[1])
                                    ) {
                                        return {
                                            itemPath: parts[1],
                                            change: {
                                                type: "moved",
                                                oldPath: parts[0],
                                            },
                                        };
                                    }

                                    return {
                                        itemPath: parts[1],
                                        change: {
                                            type: "renamed",
                                            oldName: parts[0],
                                        },
                                    };
                                }

                                return {
                                    itemPath: filePath,
                                    change: { type: "modified" },
                                };
                            } else {
                                return {
                                    itemPath: filePath,
                                    change: { type: "added" },
                                };
                            }
                        });

                    await execPromise(`git -C "${repoPath}" reset`);
                    return { changes };
                } catch (error) {
                    console.error("Error executing git commands:", error);
                    throw new TRPCError({
                        code: "INTERNAL_SERVER_ERROR",
                        message: "Failed to execute git commands",
                    });
                }
            },
        );
}

function gitCommit() {
    return protectedProcedure
        .input(commitSchema)
        .mutation(async ({ ctx, input }) => {
            await hasUserRole(ctx.prisma, input.repoId, ctx.session.user.id, [
                "OWNER",
                "ADMIN",
                "CONTRIBUTOR",
            ]);
            const repoPath = await resolveRepoPathOrThrow(
                ctx.prisma,
                input.repoId,
            );

            try {
                // set git configuration for the commit
                const userEmail = ctx.session.user.email;
                const userName = ctx.session.user.name || "User";

                await execPromise(
                    `git -C "${repoPath}" config user.email "${userEmail}"`,
                );
                await execPromise(
                    `git -C "${repoPath}" config user.name "${userName}"`,
                );

                for (const file of input.files) {
                    // Sanitize the file path to prevent command injection.
                    const sanitizedFile = file.itemPath.replace(/"/g, '\\"');
                    await execPromise(
                        `git -C "${repoPath}" add "${sanitizedFile}"`,
                    );

                    if (
                        file.change.type === "moved" ||
                        file.change.type === "renamed"
                    ) {
                        const oldFile =
                            file.change.type === "moved"
                                ? file.change.oldPath
                                : file.change.oldName;
                        const sanitizedOldFile = oldFile.replace(/"/g, '\\"');
                        await execPromise(
                            `git -C "${repoPath}" add "${sanitizedOldFile}"`,
                        );
                    }
                }

                const escapedMessage = input.message.replace(/"/g, '\\"');
                const { stdout } = await execPromise(
                    `git -C "${repoPath}" commit -m "${escapedMessage}"`,
                );

                const { stdout: commitHash } = await execPromise(
                    `git -C "${repoPath}" rev-parse HEAD`,
                );

                return {
                    success: true,
                    message: stdout,
                    commitHash: commitHash.trim(),
                };
            } catch (error) {
                console.error("Error executing git commands:", error);

                // check if it's a "nothing to commit" error
                if (
                    error instanceof Error &&
                    error.message.includes("nothing to commit")
                ) {
                    return {
                        success: false,
                        message: "Nothing to commit. Working tree clean.",
                        commitHash: null,
                    };
                }

                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: "Failed to commit changes",
                    cause: error,
                });
            } finally {
                try {
                    await execPromise(
                        `git -C "${repoPath}" config --unset user.email`,
                    );

                    await execPromise(
                        `git -C "${repoPath}" config --unset user.name`,
                    );
                } catch (resetError) {
                    // log but don't throw, don't want to fail the commit if resetting config fails
                    console.error("Error resetting git config:", resetError);
                }
            }
        });
}

function githubRepoBranches() {
    return protectedProcedure
        .input(
            z.object({
                githubFullName: z.string(),
            }),
        )
        .query(async ({ ctx, input }): Promise<Array<string>> => {
            const [ownerSlug, repositorySlug] = input.githubFullName.split("/");

            return readGithubRepoBranches(
                ctx.session,
                ownerSlug,
                repositorySlug,
            );
        });
}
