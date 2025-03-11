"use client";

import { imgSrc } from "@/lib/client-file-utils";
import { editOrganisationFormSchema } from "@/lib/schemas/org-schemas";
import { OrganisationDisplay } from "@/lib/types/organisation";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    FileText,
    Image as ImageIcon,
    Pen,
    Save,
    UserRound,
} from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { AvatarDisplay } from "@/components/avatar-display/avatar-display";
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

// import { toast } from "sonner";
// import { api } from "@/lib/trpc/server";

interface EditOrganisationDialogProps {
    organisation: OrganisationDisplay;
}

export const EditOrganisationDialog = ({
    organisation,
}: EditOrganisationDialogProps) => {
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

    /* TODO: lukas */
    /*const editMutation = api.organisation.edit.useMutation({
        onSuccess: () => {
            toast.success("Organisation updated successfully");
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });*/

    const onSaveOrganisationChanges = async (
        data: z.infer<typeof editOrganisationFormSchema>,
    ) => {
        console.log(data);
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

    if (organisation.userRole !== "ADMIN") {
        return undefined;
    }

    return (
        <Dialog>
            <Tooltip>
                <TooltipTrigger asChild>
                    <DialogTrigger className="mt-1 rounded bg-transparent p-2 text-muted-foreground hover:bg-accent">
                        <Pen className="h-4 w-4" />
                    </DialogTrigger>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Edit organisation</p>
                </TooltipContent>
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
                                    // disabled={editMutation.isPending}
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
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="image"
                                        render={({
                                            field: {
                                                value,
                                                onChange,
                                                ...fieldProps
                                            },
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
                                                                    placeholder="Organisation image"
                                                                    type="file"
                                                                    accept="image/*"
                                                                    onChange={(
                                                                        event,
                                                                    ) =>
                                                                        onChange(
                                                                            event
                                                                                .target
                                                                                .files &&
                                                                                event
                                                                                    .target
                                                                                    .files[0],
                                                                        )
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
                                    <Save />
                                    Save changes
                                </Button>
                            </DialogTrigger>
                        </DialogFooter>
                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
};
