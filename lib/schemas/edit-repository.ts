import { z } from "zod";

export const editRepositoryFormSchema = z.object({
    name: z.string().min(1, "Repository name is required."),
    description: z.string().optional(),
});
