import { z } from "zod";

export const repoBySlugsSchema = z.object({
    ownerSlug: z
        .string()
        .min(2, "Owner slug must be at least 2 characters long")
        .max(100, "Owner slug cannot exceed 100 characters")
        .regex(/^[^%$?]*$/, "Owner slug cannot contain %, $, or ?")
        .transform((value) => value.trim()),
    repositorySlug: z
        .string()
        .min(1, "Repository slug must be at least 1 character")
        .max(100, "Repository slug cannot exceed 100 characters")
        .regex(
            /^[a-zA-Z0-9-]+$/,
            "Repository slug must contain only letters, numbers, and hyphens",
        )
        .transform((value) => value.trim()),
});

export const repoItemSchema = repoBySlugsSchema.extend({
    path: z.string().transform((value) => value.trim()),
});

export const createRepositoryFormSchema = z.object({
    ownerId: z.string().uuid("Invalid UUID format"),
    name: z
        .string()
        .min(1, "Repository name is required")
        .max(100, "Repository name cannot exceed 100 characters")
        .regex(
            /^[a-zA-Z0-9._-]+$/,
            "Repository name can only contain letters, numbers, periods, underscores, and hyphens",
        )
        .transform((value) => value.trim()),
    description: z
        .string()
        .max(500, "Description cannot exceed 500 characters")
        .optional()
        .transform((value) => (value ? value.trim() : undefined)),
    visibility: z.enum(["public", "private"], {
        required_error: "Visibility is required.",
    }),
});

export const editRepositoryFormSchema = z.object({
    name: z
        .string()
        .min(1, "Repository name is required")
        .max(100, "Repository name cannot exceed 100 characters")
        .regex(
            /^[a-zA-Z0-9._-]+$/,
            "Repository name can only contain letters, numbers, periods, underscores, and hyphens",
        )
        .transform((value) => value.trim()),
    description: z
        .string()
        .max(500, "Description cannot exceed 500 characters")
        .optional()
        .transform((value) => (value ? value.trim() : undefined)),
});

export const cloneRepoSchema = z.object({
    githubFullName: z.string(),
    name: z.string().optional(),
    description: z
        .string()
        .max(500, "Description cannot exceed 500 characters")
        .optional()
        .transform((value) => (value ? value.trim() : undefined)),
    visibility: z.enum(["public", "private"], {
        required_error: "Visibility is required.",
    }),
});
