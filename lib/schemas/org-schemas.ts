import { z } from "zod";

export const createOrgProcedureSchema = z.object({
    name: z
        .string()
        .min(2, "Organisation name must be at least 2 characters long")
        .max(100, "Organisation name cannot exceed 100 characters")
        .regex(/^[^%$?]*$/, "Organisation name cannot contain %, $, or ?")
        .transform((value) => value.trim()),
    bio: z
        .string()
        .max(500, "Bio cannot exceed 500 characters")
        .optional()
        .transform((value) => (value ? value.trim() : undefined)),
    image: z
        .string()
        .url()
        .optional()
        .nullable()
        .transform((value) => (value ? value.trim() : null)),
    initialMembers: z
        .array(z.string().uuid())
        .max(20, "Cannot add more than 20 initial members")
        .optional(),
});

export const createOrganisationFormSchema = z.object({
    name: z
        .string()
        .min(2, "Organisation name must be at least 2 characters long")
        .max(100, "Organisation name cannot exceed 100 characters")
        .regex(/^[^%$?]*$/, "Organisation name cannot contain %, $, or ?")
        .transform((value) => value.trim()),
    description: z
        .string()
        .max(500, "Description cannot exceed 500 characters")
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
                src: z
                    .string()
                    .url("Invalid URL format")
                    .transform((value) => value.trim()),
            }),
        ])
        .optional(),
    initialMembers: z
        .array(
            z.object({
                id: z.string().uuid(),
                username: z
                    .string()
                    .min(2, "Username must be at least 2 character")
                    .max(50, "Username cannot exceed 50 characters")
                    .transform((value) => value.trim()),
                image: z
                    .string()
                    .url("Invalid URL format")
                    .optional()
                    .transform((value) => (value ? value.trim() : undefined)), // Sanitize image URL
            }),
        )
        .max(20, "Cannot add more than 20 initial members")
        .optional(),
});

export const orgSearchSchema = z.object({
    nameSearchTerm: z
        .string()
        .max(100, "Search term cannot exceed 100 characters")
        .transform((value) => value.trim())
        .optional(),
    page: z.number().int().min(0).default(0),
    pageSize: z.number().int().min(1).max(100).default(10),
});

export const editOrganisationProcedureSchema = z.object({
    orgId: z.string().uuid(),
    name: z
        .string()
        .min(2, "Organisation name must be at least 2 characters long")
        .max(100, "Organisation name cannot exceed 100 characters")
        .regex(/^[^%$?]*$/, "Organisation name cannot contain %, $, or ?")
        .optional()
        .transform((value) => value?.trim()),
    bio: z
        .string()
        .max(500, "Bio cannot exceed 500 characters")
        .optional()
        .transform((value) => value?.trim()),
    image: z
        .string()
        .optional()
        .transform((value) => value?.trim()),
});

export const editOrganisationFormSchema = z.object({
    name: z
        .string()
        .min(2, "Organisation name must be at least 2 characters long")
        .max(100, "Organisation name cannot exceed 100 characters")
        .regex(/^[^%$?]*$/, "Organisation name cannot contain %, $, or ?")
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

export const leaveOrgSchema = z.object({
    organizationId: z.string().uuid(),
    newAdminUserId: z.string().uuid().optional(),
});
