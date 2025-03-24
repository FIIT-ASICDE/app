import { createTRPCRouter, protectedProcedure } from "@/lib/server/api/trpc";
import { FileDisplayItem } from "@/lib/types/repository";
import { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const editorRouter = createTRPCRouter({
    getSession: getEditorSession(),
    saveSession: saveEditorSession(),
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
                        absolutePath: z.string()
                    }),
                ),
                activeFile: z
                    .object({
                        type: z.string(),
                        name: z.string(),
                        lastActivity: z.date(),
                        language: z.string(),
                        absolutePath: z.string()
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
