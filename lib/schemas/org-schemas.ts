import { z } from "zod";

export const createOrgProcedureSchema = z.object({
    name: z.string().min(1, "Organization name is required"),
    bio: z.string().optional(),
    image: z.string().optional().nullable(),
    initialMembers: z.array(z.string().uuid()).optional(),
});

export const createOrganisationFormSchema = z.object({
    name: z
        .string()
        .min(1, "Organisation name is required.")
        .refine((value) => !/%|\$|\?/.test(value), {
            message: "Organisation name cannot contain %, $, or ?",
        }),
    description: z.string().optional(),
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
                src: z.string(),
            }),
        ])
        .optional(),
    initialMembers: z
        .array(
            z.object({
                id: z.string().uuid(),
                username: z.string(),
                image: z.string().optional(),
            }),
        )
        .optional(),
});

export const orgSearchSchema = z.object({
    searchTerm: z.string().optional(),
    page: z.number().int().min(0).default(0),
    pageSize: z.number().int().min(1).max(100).default(10),
});

export const editOrganisationProcedureSchema = z.object({
    name: z.string().min(1, "Organisation name is required."),
    bio: z.string().optional(),
    image: z.string().optional(),
});

export const editOrganisationFormSchema = z.object({
    name: z.string().min(1, "Organisation name is required."),
    bio: z.string().optional(),
    image: z
        .instanceof(File)
        .refine((file: File) => file.size < 2000000, {
            message: "Organisation image must be less than 2MB.",
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
                message: "File must be an image (JPEG, PNG, GIF, or WebP).",
            },
        )
        .optional(),
});
