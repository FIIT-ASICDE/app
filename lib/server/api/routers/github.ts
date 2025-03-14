import { readGithubRepoBranches, readUsersGithubRepos } from "@/lib/github";
import { paginationSchema } from "@/lib/schemas/common-schemas";
import { cloneRepoSchema } from "@/lib/schemas/repo-schemas";
import { createTRPCRouter, protectedProcedure } from "@/lib/server/api/trpc";
import { ReturnTypeOf } from "@octokit/core/dist-types/types";
import { $Enums } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { exec } from "child_process";
import { access, mkdir, rm } from "fs/promises";
import path from "path";
import util from "util";
import { z } from "zod";

const execPromise = util.promisify(exec);

export const githubRouter = createTRPCRouter({
    userRepos: userGithubRepos(),
    branches: githubRepoBranches(),
    clone: clone(),
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

            const ownerReposRoot = path.join(
                process.env.REPOSITORIES_STORAGE_ROOT!,
                ownerName,
            );
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
            cmd += ` ${cloneUrl} '${targetPath}'`;

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
