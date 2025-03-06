"use client";

import { handleUpload, imgSrc } from "@/lib/client-file-utils";
import {
    editUserFormSchema,
    editUserProcedureSchema,
} from "@/lib/schemas/user-schemas";
import { api } from "@/lib/trpc/react";
import { OnboardedUser } from "@/lib/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    FileText,
    Image as ImageIcon,
    Loader2,
    Pen,
    UserRound,
    UserRoundPen,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { AvatarDisplay } from "@/components/avatar-display/avatar-display";
import { useUser } from "@/components/context/user-context";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface EditProfileDialogProps {
    profile: OnboardedUser;
}

export const EditProfileDialog = ({ profile }: EditProfileDialogProps) => {
    const { user } = useUser();
    const isItMe: boolean = profile.id === user.id;

    const [open, setOpen] = useState<boolean>(false);
    const router = useRouter();

    const form = useForm<z.infer<typeof editUserFormSchema>>({
        resolver: zodResolver(editUserFormSchema),
        defaultValues: {
            name: profile.name,
            surname: profile.surname,
            username: profile.username,
            bio: profile.bio,
            image: profile.image
                ? { type: "remote", src: profile.image }
                : undefined,
        },
    });

    useEffect(() => {
        if (profile) {
            form.reset({
                name: profile.name,
                surname: profile.surname,
                username: profile.username,
                bio: profile.bio,
                image: profile.image
                    ? { type: "remote", src: profile.image }
                    : undefined,
            });
        }
    }, [profile, form]);

    const editMutation = api.user.edit.useMutation({
        onSuccess: () => {
            toast.success("Profile updated successfully");
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    const onSaveProfileChanges = async (
        data: z.infer<typeof editUserFormSchema>,
    ) => {
        let image: string | undefined = undefined;
        if (data.image?.type === "local") {
            const fileHash = await handleUpload(data.image.file);
            if (!fileHash) {
                // TODO kili handle error
                return;
            }
            image = fileHash;
        } else if (data.image?.type === "remote") {
            image = data.image.src;
        }

        const transformedData: z.infer<typeof editUserProcedureSchema> = {
            name: data.name,
            surname: data.surname,
            username: data.username,
            bio: data.bio,
            image,
        };

        const newProfile = await editMutation.mutateAsync(transformedData);
        router.replace(`/${newProfile.username}`);
        setOpen(false);
    };

    const onChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            form.setValue("image", { type: "local", file });
            const previewUrl = URL.createObjectURL(file);
            return () => URL.revokeObjectURL(previewUrl);
        }
    };

    const showImage = (img: z.infer<typeof editUserFormSchema>["image"]) => {
        if (!img) {
            return undefined;
        } else if (img.type === "remote") {
            return imgSrc(img.src);
        } else if (img.type === "local") {
            return URL.createObjectURL(img.file);
        }
    };

    if (!isItMe) {
        return undefined;
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <DialogTrigger className="mt-1 rounded bg-transparent p-2 text-muted-foreground hover:bg-accent">
                        <Pen className="h-4 w-4" />
                    </DialogTrigger>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Edit profile</p>
                </TooltipContent>
            </Tooltip>
            <DialogContent className="max-h-[90vh] max-w-[425px] overflow-clip p-0">
                <ScrollArea className="h-full max-h-[90vh]">
                    <div className="p-6">
                        <DialogHeader>
                            <DialogTitle className="text-center text-xl">
                                Edit profile
                            </DialogTitle>
                            <DialogDescription>
                                Here you can edit your name, surname, username,
                                bio or icon.
                            </DialogDescription>
                        </DialogHeader>
                        <Form {...form}>
                            <form>
                                <fieldset
                                    disabled={editMutation.isPending}
                                    className="space-y-3 pt-3"
                                >
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem className="w-full">
                                                <FormLabel className="text-muted-foreground">
                                                    Name
                                                </FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <UserRound className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                                        <Input
                                                            placeholder="* John"
                                                            className="pl-9"
                                                            {...field}
                                                        />
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="surname"
                                        render={({ field }) => (
                                            <FormItem className="w-full">
                                                <FormLabel className="text-muted-foreground">
                                                    Surname
                                                </FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <UserRound className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                                        <Input
                                                            placeholder="* Doe"
                                                            className="pl-9"
                                                            {...field}
                                                        />
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="username"
                                        render={({ field }) => (
                                            <FormItem className="w-full">
                                                <FormLabel className="text-muted-foreground">
                                                    Username
                                                </FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <UserRoundPen className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                                        <Input
                                                            placeholder="* john-doe"
                                                            className="pl-9"
                                                            {...field}
                                                        />
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="bio"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-muted-foreground">
                                                    Bio
                                                </FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <FileText className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                                        <Textarea
                                                            placeholder="Optional description of your profile"
                                                            className="resize-none pl-9 pt-2"
                                                            {...field}
                                                        />
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="image"
                                        render={({
                                            field: { value, ...fieldProps },
                                        }) => (
                                            <FormItem className="flex flex-col">
                                                <div className="flex flex-row items-center gap-5">
                                                    <div className="flex flex-col justify-center">
                                                        <FormLabel className="mb-3 text-muted-foreground">
                                                            Image
                                                        </FormLabel>
                                                        <FormControl>
                                                            <div className="relative">
                                                                <ImageIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                                                <Input
                                                                    {...fieldProps}
                                                                    placeholder="User image"
                                                                    type="file"
                                                                    accept="image/*"
                                                                    onChange={
                                                                        onChangeImage
                                                                    }
                                                                    className="w-full resize-none pl-8 pt-2"
                                                                />
                                                            </div>
                                                        </FormControl>
                                                    </div>
                                                    <AvatarDisplay
                                                        displayType="profile"
                                                        image={showImage(value)}
                                                        name={form.watch(
                                                            "name",
                                                        )}
                                                    />
                                                </div>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </fieldset>
                            </form>
                        </Form>
                        <DialogFooter className="mt-5">
                            <DialogTrigger asChild>
                                <Button
                                    type="submit"
                                    variant="default"
                                    className="w-full hover:bg-primary-button-hover"
                                    onClick={form.handleSubmit(
                                        onSaveProfileChanges,
                                    )}
                                    disabled={!form.formState.isDirty}
                                >
                                    {editMutation.isPending ? (
                                        <Loader2 className="animate-spin" />
                                    ) : (
                                        "Save changes"
                                    )}
                                </Button>
                            </DialogTrigger>
                        </DialogFooter>
                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
};
