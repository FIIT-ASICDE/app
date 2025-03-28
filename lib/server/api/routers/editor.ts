import { getLanguageByExtension } from "@/lib/files/repo-files";
import {
    addItemSchema,
    deleteItemSchema,
    renameItemSchema,
} from "@/lib/schemas/editor-schemas";
import {
    hasUserRole,
    resolveRepoPathOrThrow,
} from "@/lib/server/api/routers/repos";
import { createTRPCRouter, protectedProcedure } from "@/lib/server/api/trpc";
import { FileDisplayItem, RepositoryItem } from "@/lib/types/repository";
import { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { rename } from "fs/promises";
import { rm } from "fs/promises";
import { stat } from "fs/promises";
import { access, mkdir, writeFile } from "fs/promises";
import path from "path";
import { z } from "zod";

export const editorRouter = createTRPCRouter({
    getSession: getEditorSession(),
    saveSession: saveEditorSession(),
    addItem: addItem(),
    renameItem: renameItem(),
    deleteItem: deleteItem(),
});

function getEditorSession() {
    return protectedProcedure
        .input(z.object({ repoId: z.string() }))
        .query(async ({ ctx, input }) => {
            const { prisma, session } = ctx;

            const sessionData = await prisma.editorSession.findUnique({
                where: {
                    userId_repoId: {
                        userId: session.user.id,
                        repoId: input.repoId,
                    },
                },
            });

            if (sessionData) {
                return {
                    id: sessionData.id,
                    openFiles: sessionData.openFiles
                        ? (sessionData.openFiles as unknown as FileDisplayItem[])
                        : [],
                    activeFile: sessionData.activeFile
                        ? (sessionData.activeFile as unknown as FileDisplayItem)
                        : null,
                };
            }

            return null;
        });
}

function saveEditorSession() {
    return protectedProcedure
        .input(
            z.object({
                repoId: z.string(),
                openFiles: z.array(
                    z.object({
                        type: z.string(),
                        name: z.string(),
                        lastActivity: z.date(),
                        language: z.string(),
                        absolutePath: z.string(),
                    }),
                ),
                activeFile: z
                    .object({
                        type: z.string(),
                        name: z.string(),
                        lastActivity: z.date(),
                        language: z.string(),
                        absolutePath: z.string(),
                    })
                    .nullable(),
            }),
        )
        .mutation(async ({ ctx, input }) => {
            const { prisma, session } = ctx;
            const { repoId, openFiles, activeFile } = input;

            const repo = await prisma.repo.findUnique({
                where: { id: repoId },
                select: { id: true },
            });

            if (!repo) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Repository not found",
                });
            }

            await prisma.editorSession.upsert({
                where: {
                    userId_repoId: {
                        userId: session.user.id,
                        repoId: repoId,
                    },
                },
                update: {
                    openFiles,
                    activeFile: activeFile ?? Prisma.JsonNull,
                },
                create: {
                    userId: session.user.id,
                    repoId,
                    openFiles,
                    activeFile: activeFile ?? Prisma.JsonNull,
                },
            });

            return { success: true };
        });
}

export function addItem() {
    return protectedProcedure
        .input(addItemSchema)
        .mutation(async ({ ctx, input }): Promise<RepositoryItem> => {
            await hasUserRole(ctx.prisma, input.repoId, ctx.session.user.id, [
                "OWNER",
                "ADMIN",
                "CONTRIBUTOR",
            ]);

            const repoPath = await resolveRepoPathOrThrow(
                ctx.prisma,
                input.repoId,
            );

            const basePath = input.path
                ? path.join(repoPath, input.path)
                : repoPath;
            const fullPath = path.join(basePath, input.name);

            try {
                await access(basePath);
            } catch (error) {
                throw new TRPCError({
                    code: "BAD_REQUEST",
                    message:
                        "The specified path does not exist in the repository.",
                    cause: error,
                });
            }

            try {
                await access(fullPath);
                // if the access succeeds, there is duplicate
                throw new TRPCError({
                    code: "CONFLICT",
                    message: `An item with the name '${input.name}' already exists at this location.`,
                });
            } catch (e) {
                if (e instanceof TRPCError) {
                    throw e;
                }
            }

            try {
                if (input.type === "directory") {
                    await mkdir(fullPath);
                    return {
                        type: "directory-display",
                        name: input.name,
                        lastActivity: new Date(),
                        absolutePath: fullPath,
                    };
                } else {
                    await writeFile(fullPath, "");

                    const language = getLanguageByExtension(
                        path.extname(fullPath),
                    );

                    return {
                        type: "file-display",
                        name: input.name,
                        lastActivity: new Date(),
                        language,
                        absolutePath: fullPath,
                    };
                }
            } catch (error) {
                console.error("Error creating item:", error);
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: `Failed to create ${input.type}: ${error instanceof Error ? error.message : String(error)}`,
                });
            }
        });
}

export function renameItem() {
    return protectedProcedure
        .input(renameItemSchema)
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

            const originalFullPath = path.join(repoPath, input.originalPath);

            const newPathDir = path.dirname(input.newPath);
            const newPathBase = path.basename(input.newPath);

            if (
                newPathBase.includes("/") ||
                newPathBase.includes("\\") ||
                newPathBase === "." ||
                newPathBase === ".."
            ) {
                throw new TRPCError({
                    code: "BAD_REQUEST",
                    message:
                        "Invalid item name. Name cannot contain slashes or be a special directory name.",
                });
            }

            const newFullPath = path.join(repoPath, input.newPath);
            try {
                await access(originalFullPath);
            } catch (error) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "The item you're trying to rename does not exist.",
                    cause: error,
                });
            }

            // check if the destination directory exists (if not at root)
            if (newPathDir !== ".") {
                const newDirFullPath = path.join(repoPath, newPathDir);
                try {
                    await access(newDirFullPath);
                } catch (error) {
                    throw new TRPCError({
                        code: "BAD_REQUEST",
                        message: "The destination directory does not exist.",
                        cause: error,
                    });
                }
            }

            // check if an item with the new name already exists at the destination
            try {
                await access(newFullPath);
                // If access succeeds, there's a conflict
                throw new TRPCError({
                    code: "CONFLICT",
                    message: `An item with the name '${newPathBase}' already exists at the destination.`,
                });
            } catch (error) {
                if (error instanceof TRPCError) {
                    throw error;
                }
            }

            try {
                await rename(originalFullPath, newFullPath);
            } catch (error) {
                console.error("Error renaming item:", error);
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: `Failed to rename item: ${error instanceof Error ? error.message : String(error)}`,
                    cause: error,
                });
            }
        });
}

export function deleteItem() {
    return protectedProcedure
        .input(deleteItemSchema)
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

            const itemFullPath = path.join(repoPath, input.path);

            if (input.path === "" || input.path === "." || input.path === "/") {
                throw new TRPCError({
                    code: "BAD_REQUEST",
                    message: "Cannot delete the repository root.",
                });
            }

            try {
                await access(itemFullPath);
            } catch (error) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "The item you're trying to delete does not exist.",
                    cause: error,
                });
            }

            if (input.path === ".git" || input.path.startsWith(".git/")) {
                throw new TRPCError({
                    code: "BAD_REQUEST",
                    message:
                        "Cannot delete the .git directory or its contents.",
                });
            }

            const itemStat = await stat(itemFullPath);
            try {
                // delete the item (recursive for directories)
                await rm(itemFullPath, {
                    recursive: itemStat.isDirectory(),
                    force: true,
                });
            } catch (error) {
                console.error("Error deleting item:", error);
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: `Failed to delete ${itemStat.isDirectory() ? "directory" : "file"}: ${
                        error instanceof Error ? error.message : String(error)
                    }`,
                    cause: error,
                });
            }
        });
}
