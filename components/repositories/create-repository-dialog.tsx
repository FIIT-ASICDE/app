"use client";

import { imgSrc } from "@/lib/client-file-utils";
import { createRepositoryFormSchema } from "@/lib/schemas/repo-schemas";
import { api } from "@/lib/trpc/react";
import { OrganisationDisplay } from "@/lib/types/organisation";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    FileText,
    FolderPlus,
    Globe,
    Loader2,
    Lock,
    UserRound,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { UseFormReturn, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { useUser } from "@/components/context/user-context";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface CreateRepositoryDialogProps {
    usersOrganisations: Array<Omit<OrganisationDisplay, "memberCount">>;
    fromOrg: boolean;
}

export const CreateRepositoryDialog = ({
    usersOrganisations,
    fromOrg,
}: CreateRepositoryDialogProps) => {
    const { user } = useUser();
    const router = useRouter();

    const form = useForm<z.infer<typeof createRepositoryFormSchema>>({
        resolver: zodResolver(createRepositoryFormSchema),
        defaultValues: {
            ownerId: user.id,
            name: "",
            description: "",
            visibility: "public",
        },
    });

    const createRepoMutation = api.repo.create.useMutation({
        onSuccess: () => {
            toast.success("Repository successfully created");
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    const onCreateRepository = async (
        data: z.infer<typeof createRepositoryFormSchema>,
    ) => {
        const newRepo = await createRepoMutation.mutateAsync(data);
        router.push(`/${newRepo.ownerName}/${newRepo.name}`);
    };

    const getValidFormMessage = (
        form: UseFormReturn<z.infer<typeof createRepositoryFormSchema>>,
    ) => {
        return !form.formState.isValid ? (
            <></>
        ) : (
            <div
                role="note"
                className="my-5 w-[375px] overflow-hidden text-center text-sm font-normal text-muted-foreground"
            >
                You are creating a{" "}
                <span className="font-bold">{form.watch("visibility")}</span>{" "}
                repository called{" "}
                <span className="font-bold">{form.watch("name")}</span>.
            </div>
        );
    };

    const showSubmitButtonContent = () => {
        if (createRepoMutation.isPending) {
            return (
                <>
                    <Loader2 className="animate-spin" />
                    Creating repository...
                </>
            );
        }
        if (createRepoMutation.isSuccess) {
            return (
                <>
                    <Loader2 className="animate-spin text-muted-foreground" />
                    Redirecting...
                </>
            );
        }
        return (
            <>
                <FolderPlus />
                Create
            </>
        );
    };

    return (
        <Dialog>
            <Tooltip>
                <TooltipTrigger asChild>
                    <DialogTrigger asChild>
                        <Button
                            variant="default"
                            className="hover:bg-primary-button-hover"
                        >
                            <FolderPlus className="h-4 w-4 sm:mr-2" />
                            <span className="hidden sm:inline">
                                Create repository
                            </span>
                        </Button>
                    </DialogTrigger>
                </TooltipTrigger>
                <TooltipContent className="sm:hidden">
                    Create repository
                </TooltipContent>
            </Tooltip>
            <DialogContent className="max-h-[90vh] w-[425px] p-0">
                <ScrollArea className="h-full max-h-[90vh] w-[425px]">
                    <div className="p-6">
                        <DialogHeader className="w-[413px]">
                            <DialogTitle className="text-center text-xl">
                                Create a new repository
                            </DialogTitle>
                            <DialogDescription>
                                Here you can create a new repository by
                                providing the owner, name, description and
                                visibility.
                            </DialogDescription>
                        </DialogHeader>
                        <Form {...form}>
                            <form>
                                <fieldset
                                    disabled={createRepoMutation.isPending}
                                    className="w-[375px] space-y-3 pt-3"
                                >
                                    <FormField
                                        control={form.control}
                                        name="ownerId"
                                        render={({ field }) => (
                                            <FormItem className="w-[375px]">
                                                <FormLabel className="text-muted-foreground">
                                                    Owner
                                                </FormLabel>
                                                <Select
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                    defaultValue={
                                                        fromOrg
                                                            ? usersOrganisations[0]
                                                                  .id
                                                            : field.value
                                                    }
                                                >
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select an owner" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectLabel className="text-muted-foreground">
                                                                You
                                                            </SelectLabel>
                                                            <SelectItem
                                                                key={user.id}
                                                                value={user.id}
                                                                className="cursor-pointer hover:bg-accent"
                                                            >
                                                                <div className="flex flex-row items-center space-x-3">
                                                                    <AvatarDisplay
                                                                        displayType={
                                                                            "select"
                                                                        }
                                                                        image={imgSrc(
                                                                            user.image,
                                                                        )}
                                                                        name={
                                                                            user.name +
                                                                            " " +
                                                                            user.surname
                                                                        }
                                                                    />
                                                                    <span>
                                                                        {
                                                                            user.username
                                                                        }
                                                                    </span>
                                                                </div>
                                                            </SelectItem>
                                                        </SelectGroup>
                                                        {usersOrganisations.length !==
                                                            0 && (
                                                            <SelectGroup>
                                                                <SelectLabel className="text-muted-foreground">
                                                                    Your
                                                                    organisations
                                                                </SelectLabel>
                                                                {usersOrganisations.map(
                                                                    (
                                                                        organisation,
                                                                    ) => (
                                                                        <SelectItem
                                                                            key={
                                                                                organisation.id
                                                                            }
                                                                            value={
                                                                                organisation.id
                                                                            }
                                                                            className="cursor-pointer hover:bg-accent"
                                                                        >
                                                                            <div className="flex flex-row items-center space-x-3">
                                                                                <AvatarDisplay
                                                                                    displayType={
                                                                                        "select"
                                                                                    }
                                                                                    image={imgSrc(
                                                                                        organisation.image,
                                                                                    )}
                                                                                    name={
                                                                                        organisation.name
                                                                                    }
                                                                                />
                                                                                <span>
                                                                                    {
                                                                                        organisation.name
                                                                                    }
                                                                                </span>
                                                                            </div>
                                                                        </SelectItem>
                                                                    ),
                                                                )}
                                                            </SelectGroup>
                                                        )}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem className="w-[375px]">
                                                <FormLabel className="text-muted-foreground">
                                                    Name
                                                </FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <UserRound className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
                                                        <Input
                                                            placeholder="* repository-name"
                                                            className="pl-8"
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
                                            <FormItem className="w-[375px]">
                                                <FormLabel className="text-muted-foreground">
                                                    Description
                                                </FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <FileText className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                                        <Textarea
                                                            placeholder="Optional description of your repository"
                                                            className="resize-none pl-8 pt-2"
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
                                        name="visibility"
                                        render={({ field }) => (
                                            <FormItem className="w-[375px]">
                                                <FormLabel className="text-muted-foreground">
                                                    Visibility
                                                </FormLabel>
                                                <FormControl>
                                                    <RadioGroup
                                                        onValueChange={
                                                            field.onChange
                                                        }
                                                        defaultValue={
                                                            field.value
                                                        }
                                                        className="flex flex-col gap-2"
                                                    >
                                                        <FormItem
                                                            className={cn(
                                                                "flex cursor-pointer flex-row items-center space-x-3 space-y-0 rounded border p-3 hover:bg-accent",
                                                                field.value ===
                                                                    "public"
                                                                    ? "border-accent"
                                                                    : "border-transparent",
                                                            )}
                                                        >
                                                            <FormControl>
                                                                <RadioGroupItem value="public" />
                                                            </FormControl>
                                                            <FormLabel className="flex w-full cursor-pointer flex-row items-center gap-x-3 font-normal">
                                                                <Globe className="h-5 w-5" />
                                                                <div className="space-y-1">
                                                                    <p className="text-sm font-medium leading-none">
                                                                        Public
                                                                    </p>
                                                                    <p className="text-sm text-muted-foreground">
                                                                        Anyone
                                                                        can see
                                                                        this
                                                                        repository.
                                                                    </p>
                                                                </div>
                                                            </FormLabel>
                                                        </FormItem>
                                                        <FormItem
                                                            className={cn(
                                                                "flex cursor-pointer flex-row items-center space-x-3 space-y-0 rounded border p-3 hover:bg-accent",
                                                                field.value ===
                                                                    "private"
                                                                    ? "border-accent"
                                                                    : "border-transparent",
                                                            )}
                                                        >
                                                            <FormControl>
                                                                <RadioGroupItem value="private" />
                                                            </FormControl>
                                                            <FormLabel className="flex w-full cursor-pointer flex-row items-center gap-x-3 font-normal">
                                                                <Lock className="h-5 w-5" />
                                                                <div className="space-y-1">
                                                                    <p className="text-sm font-medium leading-none">
                                                                        Private
                                                                    </p>
                                                                    <p className="text-sm text-muted-foreground">
                                                                        Only you
                                                                        can see
                                                                        this
                                                                        repository.
                                                                    </p>
                                                                </div>
                                                            </FormLabel>
                                                        </FormItem>
                                                    </RadioGroup>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    {getValidFormMessage(form)}
                                </fieldset>
                            </form>
                        </Form>
                        <DialogFooter className="mt-5 w-[375px]">
                            <DialogTrigger asChild>
                                <Button
                                    type="submit"
                                    variant="default"
                                    className="w-full hover:bg-primary-button-hover"
                                    onClick={form.handleSubmit(
                                        onCreateRepository,
                                    )}
                                    disabled={
                                        Object.keys(
                                            form.formState.touchedFields,
                                        ).length === 0
                                    }
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
