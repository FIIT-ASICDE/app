import { z } from "zod";

export const addItemSchema = z.object({
    repoId: z.string().uuid(),
    type: z.enum(["file", "directory"]),
    name: z
        .string()
        .refine(
            (s) =>
                !(
                    s.includes("/") ||
                    s.includes("\\") ||
                    s === "." ||
                    s === ".."
                ),
            {
                message:
                    "Invalid item name. Name cannot contain slashes or be a special directory name.",
            },
        ),
    path: z.string().optional(),
});

export const renameItemSchema = z.object({
    repoId: z.string().uuid(),
    originalPath: z.string(),
    newPath: z.string(),
});

export const deleteItemSchema = z.object({
    repoId: z.string().uuid(),
    path: z.string(),
});
