import { z } from "zod";

export const onboardSchema = z.object({
    name: z.string().min(1, { message: "Name is required." }),
    surname: z.string().min(1, { message: "Surname is required." }),
    bio: z.string().optional(),
});

export const editUserProcedureSchema = z.object({
    name: z.string().min(1, "Name is required").optional(),
    surname: z.string().min(1, "Surname is required").optional(),
    username: z.string().min(1, "Username is required").optional(),
    bio: z.string().optional(),
    image: z.string().optional(),
});

export const editUserFormSchema = z.object({
    name: z.string().min(1, "Name is required."),
    surname: z.string().min(1, "Surname is required."),
    username: z.string().min(1, "Username is required."),
    bio: z.string().optional(),
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
});

export const userSearchSchema = z.object({
    searchTerm: z.string().min(0).max(100),
    page: z.number().int().min(0).default(0),
    pageSize: z.number().int().min(1).max(100).default(10),
});
