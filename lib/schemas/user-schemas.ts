import { z } from "zod";

const commonNameRegex = /^[a-zA-Z\s-]+$/; // Letters, spaces, and hyphens
const usernameRegex = /^[a-zA-Z0-9._-]+$/; // Letters, numbers, periods, underscores, and hyphens

export const onboardSchema = z.object({
    name: z
        .string()
        .min(1, { message: "Name is required." })
        .max(50, "Name cannot exceed 50 characters")
        .regex(
            commonNameRegex,
            "Name can only contain letters, spaces, and hyphens",
        )
        .transform((value) => value.trim()),
    surname: z
        .string()
        .min(1, { message: "Surname is required." })
        .max(50, "Surname cannot exceed 50 characters")
        .regex(
            commonNameRegex,
            "Surname can only contain letters, spaces, and hyphens",
        )
        .transform((value) => value.trim()),
    bio: z
        .string()
        .max(500, "Bio cannot exceed 500 characters")
        .optional()
        .transform((value) => (value ? value.trim() : undefined)),
});

export const editUserProcedureSchema = z.object({
    name: z
        .string()
        .min(1, "Name is required")
        .max(50, "Name cannot exceed 50 characters")
        .regex(
            commonNameRegex,
            "Name can only contain letters, spaces, and hyphens",
        )
        .optional()
        .transform((value) => (value ? value.trim() : undefined)),
    surname: z
        .string()
        .min(1, "Surname is required")
        .max(50, "Surname cannot exceed 50 characters")
        .regex(
            commonNameRegex,
            "Surname can only contain letters, spaces, and hyphens",
        )
        .optional()
        .transform((value) => (value ? value.trim() : undefined)),
    username: z
        .string()
        .min(3, "Username must be at least 3 characters")
        .max(30, "Username cannot exceed 30 characters")
        .regex(
            usernameRegex,
            "Username can only contain letters, numbers, periods, underscores, and hyphens",
        )
        .optional()
        .transform((value) => (value ? value.trim() : undefined)),
    bio: z
        .string()
        .max(500, "Bio cannot exceed 500 characters")
        .optional()
        .transform((value) => (value ? value.trim() : undefined)),
    image: z
        .string()
        .url("Invalid URL format")
        .optional()
        .transform((value) => (value ? value.trim() : undefined)),
});

export const editUserFormSchema = z.object({
    name: z
        .string()
        .min(1, "Name is required.")
        .max(50, "Name cannot exceed 50 characters")
        .regex(
            commonNameRegex,
            "Name can only contain letters, spaces, and hyphens",
        )
        .transform((value) => value.trim()),
    surname: z
        .string()
        .min(1, "Surname is required.")
        .max(50, "Surname cannot exceed 50 characters")
        .regex(
            commonNameRegex,
            "Surname can only contain letters, spaces, and hyphens",
        )
        .transform((value) => value.trim()),
    username: z
        .string()
        .min(3, "Username must be at least 3 characters")
        .max(30, "Username cannot exceed 30 characters")
        .regex(
            usernameRegex,
            "Username can only contain letters, numbers, periods, underscores, and hyphens",
        )
        .transform((value) => value.trim()),
    bio: z
        .string()
        .max(500, "Bio cannot exceed 500 characters")
        .optional()
        .transform((value) => (value ? value.trim() : undefined)),
    image: z
        .discriminatedUnion("type", [
            z.object({
                type: z.literal("local"),
                file: z
                    .instanceof(File)
                    .refine((file: File) => file.size < 2000000, {
                        message: "Profile image must be less than 2MB.",
                    })
                    .refine(
                        (file: File) => {
                            const acceptedImageTypes: Array<string> = [
                                "image/jpeg",
                                "image/png",
                                "image/gif",
                                "image/webp",
                            ];
                            return acceptedImageTypes.includes(file.type);
                        },
                        {
                            message:
                                "File must be an image (JPEG, PNG, GIF, or WebP).",
                        },
                    ),
            }),
            z.object({
                type: z.literal("remote"),
                src: z.string().transform((value) => value.trim()),
            }),
        ])
        .optional(),
});

export const userSearchSchema = z.object({
    searchTerm: z
        .string()
        .min(0)
        .max(100, "Search term cannot exceed 100 characters")
        .transform((value) => value.trim()),
    page: z.number().int().min(0).default(0),
    pageSize: z.number().int().min(1).max(100).default(10),
});
