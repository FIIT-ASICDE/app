"use client";

import { handleUpload, imgSrc } from "@/lib/client-file-utils";
import {
    editOrganisationFormSchema,
    editOrganisationProcedureSchema,
} from "@/lib/schemas/org-schemas";
import { api } from "@/lib/trpc/react";
import { OrganisationDisplay } from "@/lib/types/organisation";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    FileText,
    Image as ImageIcon,
    Loader2,
    Pen,
    Save,
    UserRound,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { ChangeEvent, ReactElement, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { AvatarDisplay } from "@/components/generic/avatar-display";
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

interface EditOrganisationDialogProps {
    organisation: OrganisationDisplay;
}

/**
 * Dialog component that lets the user edit information about an organisation
 *
 * @param {EditOrganisationDialogProps} props - Component props
 * @returns {ReactElement} Dialog component
 */
export const EditOrganisationDialog = ({
    organisation,
}: EditOrganisationDialogProps): ReactElement => {
    const router = useRouter();
    const [open, setOpen] = useState<boolean>(false);

    const form = useForm<z.infer<typeof editOrganisationFormSchema>>({
        resolver: zodResolver(editOrganisationFormSchema),
        defaultValues: {
            name: organisation.name,
            bio: organisation.bio,
            image: organisation.image
                ? { type: "remote", src: organisation.image }
                : undefined,
        },
    });

    useEffect(() => {
        if (organisation) {
            form.reset({
                name: organisation.name,
                bio: organisation.bio,
                image: organisation.image
                    ? { type: "remote", src: organisation.image }
                    : undefined,
            });
        }
    }, [organisation, form]);

    const editMutation = api.org.edit.useMutation({
        onSuccess: () => {
            toast.success("Organisation updated successfully");
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    const onSaveOrganisationChanges = async (
        data: z.infer<typeof editOrganisationFormSchema>,
    ) => {
        let image: string | undefined = undefined;
        if (data.image?.type === "local") {
            image = await handleUpload(data.image.file);
        } else if (data.image?.type === "remote") {
            image = data.image.src;
        }

        const transformedData: z.infer<typeof editOrganisationProcedureSchema> =
            {
                orgId: organisation.id,
                name: data.name,
                bio: data.bio,
                image,
            };

        const changed = await editMutation.mutateAsync(transformedData);
        router.replace(`/orgs/${changed.name}`);
        setOpen(false);
    };

    const showImage = (
        img: z.infer<typeof editOrganisationFormSchema>["image"],
    ) => {
        if (!img) {
            return undefined;
        } else if (img.type === "remote") {
            return imgSrc(img.src);
        } else if (img.type === "local") {
            return URL.createObjectURL(img.file);
        }
    };

    const onChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            form.setValue("image", { type: "local", file });
            const previewUrl = URL.createObjectURL(file);
            return () => URL.revokeObjectURL(previewUrl);
        }
    };

    if (organisation.userRole !== "ADMIN") {
        return <></>;
    }

    const showSubmitButtonContent = () => {
        if (editMutation.isPending) {
            return (
                <>
                    <Loader2 className="animate-spin" />
                    Saving...
                </>
            );
        }
        return (
            <>
                <Save />
                Save changes
            </>
        );
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <DialogTrigger className="mt-1 rounded bg-transparent p-2 text-muted-foreground hover:bg-accent">
                        <Pen className="h-4 w-4" />
                    </DialogTrigger>
                </TooltipTrigger>
                <TooltipContent>Edit organisation</TooltipContent>
            </Tooltip>
            <DialogContent className="max-h-[90vh] max-w-[425px] overflow-clip p-0">
                <ScrollArea className="h-full max-h-[90vh]">
                    <div className="p-6">
                        <DialogHeader>
                            <DialogTitle className="text-center text-xl">
                                Edit your organisation
                            </DialogTitle>
                            <DialogDescription>
                                Here you can edit the name, description and
                                image of your organisation.
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
                                                            placeholder="* Organisation 1"
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
                                                            placeholder="Optional description of your organisation"
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
                                        onSaveOrganisationChanges,
                                    )}
                                    disabled={!form.formState.isDirty}
                                >
                                    {showSubmitButtonContent()}
                                </Button>
                            </DialogTrigger>
                        </DialogFooter>
                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
};
