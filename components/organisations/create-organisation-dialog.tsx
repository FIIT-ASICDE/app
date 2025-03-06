"use client";

import { handleUpload, imgSrc } from "@/lib/client-file-utils";
import {
    createOrgProcedureSchema,
    createOrganisationFormSchema,
} from "@/lib/schemas/org-schemas";
import { api } from "@/lib/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    FileText,
    Image as ImageIcon,
    Loader2,
    UserRound,
    UserRoundPlus,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { UseFormReturn, useForm } from "react-hook-form";
import { z } from "zod";

import { AvatarDisplay } from "@/components/avatar-display/avatar-display";
import { useUser } from "@/components/context/user-context";
import { MultiSelect } from "@/components/multi-select/multi-select";
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
import { toast } from "sonner";

export const CreateOrganisationDialog = () => {
    const router = useRouter();
    const { user } = useUser();
    const [open, setOpen] = useState<boolean>(false);
    const [initialMembersSearch, setInitialMembersSearch] = useState("");

    const form = useForm<z.infer<typeof createOrganisationFormSchema>>({
        resolver: zodResolver(createOrganisationFormSchema),
        defaultValues: {
            name: "",
            description: "",
            initialMembers: [],
        },
    });

    const initialMembers = api.user.search.useQuery(
        {
            searchTerm: initialMembersSearch,
            page: 0,
            pageSize: 10,
        },
        { enabled: initialMembersSearch !== "" },
    );

    const createOrgMutation = api.org.create.useMutation({
        onSuccess: () => {
            toast.success("Organisation successfully created");
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });

    const onCreateOrganisation = async (
        data: z.infer<typeof createOrganisationFormSchema>,
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

        const transformedData = {
            name: data.name,
            bio: data.description,
            image,
            initialMembers: data.initialMembers?.map((member) => member.id),
        };
        const validatedData = createOrgProcedureSchema.parse(transformedData);
        const newOrg = await createOrgMutation.mutateAsync(validatedData);

        router.push(`/orgs/${newOrg.name}`);
    };

    const getValidFormMessage = (
        form: UseFormReturn<z.infer<typeof createOrganisationFormSchema>>,
    ) => {
        return !form.formState.isValid ? (
            <></>
        ) : (
            <div
                role="note"
                className="my-5 text-center text-sm font-normal text-muted-foreground"
            >
                You are creating an organisation called{" "}
                <span className="font-bold">{form.watch("name")}</span>
                {Array.from(form.watch("initialMembers") ?? []).length === 0 ? (
                    <span>.</span>
                ) : (
                    <span>
                        {" "}
                        with{" "}
                        <span className="font-bold">
                            {
                                Array.from(form.watch("initialMembers") ?? [])
                                    .length
                            }
                        </span>{" "}
                        initial member
                        {Array.from(form.watch("initialMembers") ?? []).length >
                            1 && "s"}{" "}
                        besides you.
                    </span>
                )}
            </div>
        );
    };

    const onChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            form.setValue("image", { type: "local", file });
            const previewUrl = URL.createObjectURL(file);
            return () => URL.revokeObjectURL(previewUrl);
        }
    };

    const showImage = (
        img: z.infer<typeof createOrganisationFormSchema>["image"],
    ) => {
        if (!img) {
            return undefined;
        } else if (img.type === "remote") {
            return imgSrc(img.src);
        } else if (img.type === "local") {
            return URL.createObjectURL(img.file);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="default"
                    className="hover:bg-primary-button-hover"
                >
                    <UserRoundPlus />
                    Create organisation
                </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[90vh] max-w-[425px] overflow-clip p-0">
                <ScrollArea className="h-full max-h-[90vh]">
                    <div className="p-6">
                        <DialogHeader>
                            <DialogTitle className="text-center text-xl">
                                Create a new organisation
                            </DialogTitle>
                            <DialogDescription>
                                Here you can create a new organisation by
                                providing the name, description, image and
                                initial members.
                            </DialogDescription>
                        </DialogHeader>
                        <Form {...form}>
                            <form>
                                <fieldset
                                    disabled={createOrgMutation.isPending}
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
                                                            placeholder="* Name of your organisation"
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
                                                                    placeholder="Organisation image"
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
                                    <FormField
                                        control={form.control}
                                        name="initialMembers"
                                        render={({ field }) => (
                                            <FormItem className="w-full">
                                                <FormLabel className="text-muted-foreground">
                                                    Initial members
                                                </FormLabel>
                                                <FormControl>
                                                    <MultiSelect
                                                        placeholder="Select initial members"
                                                        filterValues={(value) =>
                                                            value.id !== user.id
                                                        }
                                                        elements={
                                                            initialMembers.data
                                                                ?.users ?? []
                                                        }
                                                        value={
                                                            field.value ?? []
                                                        }
                                                        onChangeAction={
                                                            field.onChange
                                                        }
                                                        onInputChange={
                                                            setInitialMembersSearch
                                                        }
                                                        isLoading={
                                                            // true
                                                            initialMembers.isLoading
                                                        }
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    {getValidFormMessage(form)}
                                </fieldset>
                            </form>
                        </Form>
                        <DialogFooter className="mt-5">
                            <Button
                                type="submit"
                                variant="default"
                                className="w-full hover:bg-primary-button-hover"
                                onClick={form.handleSubmit(
                                    onCreateOrganisation,
                                )}
                                disabled={!form.formState.isDirty}
                            >
                                {createOrgMutation.isPending ? (
                                    <Loader2 className="animate-spin" />
                                ) : (
                                    <>
                                        <UserRoundPlus />
                                        Create
                                    </>
                                )}
                            </Button>
                        </DialogFooter>
                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
};
