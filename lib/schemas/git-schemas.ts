import { paginationSchema } from "@/lib/schemas/common-schemas";
import { z } from "zod";

export const cloneRepoSchema = z.object({
    githubFullName: z.string(),
    name: z.string().optional(),
    branch: z.string().optional(),
    description: z
        .string()
        .max(500, "Description cannot exceed 500 characters")
        .optional()
        .transform((value) => (value ? value.trim() : undefined)),
    visibility: z.enum(["public", "private"], {
        required_error: "Visibility is required.",
    }),
    ownerType: z.enum(["user", "org"]),
    ownerId: z.string().uuid(),
});

const changeSchema = z.discriminatedUnion("type", [
    z.object({ type: z.literal("added") }),
    z.object({ type: z.literal("modified") }),
    z.object({ type: z.literal("deleted") }),
    z.object({ type: z.literal("renamed"), oldName: z.string() }),
    z.object({ type: z.literal("moved"), oldPath: z.string() }),
]);

const repositoryItemChangeSchema = z.object({
    itemPath: z.string(),
    change: changeSchema,
});

export const commitSchema = z.object({
    repoId: z.string().uuid(),
    files: z.array(repositoryItemChangeSchema),
    message: z.string(),
});

export const showCommitsSchema = paginationSchema.extend({
    repoId: z.string().uuid(),
});
