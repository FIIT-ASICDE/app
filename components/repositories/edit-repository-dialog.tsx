"use client";

import { editRepositoryFormSchema } from "@/lib/schemas/repo-schemas";
import { api } from "@/lib/trpc/react";
import { Repository } from "@/lib/types/repository";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileText, Loader2, Pen, Save, UserRound } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

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

interface EditRepositoryDialogProps {
    repository: Repository;
}

export const EditRepositoryDialog = ({
    repository,
}: EditRepositoryDialogProps) => {
    const router = useRouter();
    const form = useForm<z.infer<typeof editRepositoryFormSchema>>({
        resolver: zodResolver(editRepositoryFormSchema),
        defaultValues: {
            repoId: repository.id,
            name: repository.name,
            description: repository.description,
        },
    });

    useEffect(() => {
        if (repository) {
            form.reset({
                repoId: repository.id,
                name: repository.name,
                description: repository.description,
            });
        }
    }, [repository, form]);

    const editMutation = api.repo.edit.useMutation({
        onSuccess: () => {
            toast.success("Repository successfully updated");
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    const [open, setOpen] = useState<boolean>(false);
    const onSaveRepositoryChanges = async (
        data: z.infer<typeof editRepositoryFormSchema>,
    ) => {
        editMutation.mutateAsync(data).then((repoNames) => {
            setOpen(false);
            router.replace(`/${repoNames.ownerName}/${repoNames.repoName}`);
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <DialogTrigger className="mt-1 rounded bg-transparent p-2 text-muted-foreground hover:bg-accent">
                        <Pen className="h-4 w-4" />
                    </DialogTrigger>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Edit repository</p>
                </TooltipContent>
            </Tooltip>
            <DialogContent className="max-h-[90vh] max-w-[425px] overflow-clip p-0">
                <ScrollArea className="h-full max-h-[90vh]">
                    <div className="p-6">
                        <DialogHeader>
                            <DialogTitle className="text-center text-xl">
                                Edit your repository
                            </DialogTitle>
                            <DialogDescription>
                                Here you can edit the name and description of
                                your repository.
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
                                                            placeholder="* repository-name"
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
                                        name="description"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-muted-foreground">
                                                    Description
                                                </FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <FileText className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                                        <Textarea
                                                            placeholder="Optional description of your repository"
                                                            className="resize-none pl-9 pt-2"
                                                            {...field}
                                                        />
                                                    </div>
                                                </FormControl>
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
                                        onSaveRepositoryChanges,
                                    )}
                                    disabled={!form.formState.isDirty}
                                >
                                    {editMutation.isPending ? (
                                        <Loader2 className="animate-spin" />
                                    ) : (
                                        <>
                                            <Save />
                                            Save changes
                                        </>
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
