import { z } from "zod";

export const repoSearchSchema = z.object({
    ownerSlug: z.string(),
    repositorySlug: z.string(),
});

export const createRepositoryFormSchema = z.object({
    ownerId: z.string().min(1, "Repository owner is required."),
    name: z.string().min(1, "Repository name is required."),
    description: z.string().optional(),
    visibility: z.enum(["public", "private"], {
        required_error: "Visibility is required.",
    }),
});
