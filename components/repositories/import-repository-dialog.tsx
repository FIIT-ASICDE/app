"use client";

import { api } from "@/lib/trpc/react";
import {
    GithubRepoDisplay,
    RepositoryVisibility,
} from "@/lib/types/repository";
import { cn } from "@/lib/utils";
import { GitBranch, Globe, Loader2, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { useUser } from "@/components/context/user-context";
import { AvatarDisplay } from "@/components/generic/avatar-display";
import GithubIcon from "@/components/icons/github";
import { SelectRepositoryItem } from "@/components/repositories/select-repository-item";
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
import { Label } from "@/components/ui/label";
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
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";

export const ImportRepositoryDialog = () => {
    const { user } = useUser();
    const router = useRouter();

    const usersOrganisations = api.org.userOrgs.useQuery({
        usersId: user.id,
        role: "ADMIN",
    });

    const githubOwnerRepositories = api.git.userGithubRepos.useQuery({
        affiliation: "owner",
        page: 1,
        pageSize: 100,
    });

    const githubCollaboratorRepositories = api.git.userGithubRepos.useQuery({
        affiliation: "collaborator",
        page: 1,
        pageSize: 100,
    });

    const githubMemberRepositories = api.git.userGithubRepos.useQuery({
        affiliation: "organization_member",
        page: 1,
        pageSize: 100,
    });

    const [selectedRepository, setSelectedRepository] = useState<
        GithubRepoDisplay | undefined
    >(undefined);
    const [selectedOwner, setSelectedOwner] = useState<string | undefined>(
        undefined,
    );
    const [selectedBranch, setSelectedBranch] = useState<string | undefined>(
        undefined,
    );
    const [selectedVisibility, setSelectedVisibility] =
        useState<string>("public");

    const cloneGithubRepoMutation = api.git.clone.useMutation({
        onSuccess: () => {
            toast.success("Repository successfully cloned.");
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    const handleImportRepository = async () => {
        const newImportRepo = await cloneGithubRepoMutation.mutateAsync({
            ...selectedRepository,
            githubFullName: selectedRepository?.githubFullName ?? "",
            visibility: selectedVisibility as RepositoryVisibility,
            branch: selectedBranch,
            ownerType: selectedOwner === user.id ? "user" : "org",
            ownerId: selectedOwner ?? user.id,
        });
        router.push(
            "/" + newImportRepo.ownerName + "/" + newImportRepo.repoName,
        );
    };

    const branches = api.git.githubBranches.useQuery(
        {
            githubFullName: selectedRepository?.githubFullName ?? "",
        },
        { enabled: selectedRepository !== undefined },
    );

    const getOrganisationName = () => {
        const organisation = usersOrganisations.data?.find(
            (organisation) => organisation.id === selectedOwner,
        );
        return organisation?.name;
    };

    const showSubmitButtonContent = () => {
        if (cloneGithubRepoMutation.isPending) {
            return (
                <>
                    <Loader2 className="animate-spin" />
                    Cloning repository...
                </>
            );
        }
        if (cloneGithubRepoMutation.isSuccess) {
            return (
                <>
                    <Loader2 className="animate-spin text-muted-foreground" />
                    Redirecting...
                </>
            );
        }
        return (
            <>
                <GithubIcon />
                Import
            </>
        );
    };

    return (
        <Dialog>
            <Tooltip>
                <TooltipTrigger asChild>
                    <DialogTrigger asChild>
                        <Button variant="outline">
                            <GithubIcon className="h-4 w-4 sm:mr-2" />
                            <span className="hidden sm:inline">
                                Import repository
                            </span>
                        </Button>
                    </DialogTrigger>
                </TooltipTrigger>
                <TooltipContent className="sm:hidden">
                    Import repository
                </TooltipContent>
            </Tooltip>
            <DialogContent className="max-h-[90vh] max-w-[425px] overflow-clip p-0">
                <ScrollArea className="h-full max-h-[90vh]">
                    <div className="p-6">
                        <DialogHeader>
                            <DialogTitle className="text-center text-xl">
                                Import an existing repository
                            </DialogTitle>
                            <DialogDescription className="text-muted-foreground">
                                Here you can import an existing repository
                                connected to your GitHub account.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="space-y-4 pt-4">
                            <div className="space-y-2">
                                <Label className="text-muted-foreground">
                                    Repository
                                </Label>
                                <Select
                                    value={selectedRepository?.name}
                                    onValueChange={(value: string) => {
                                        setSelectedRepository(
                                            githubOwnerRepositories.data?.repos?.find(
                                                (ownerRepo) =>
                                                    ownerRepo.name === value,
                                            ) ??
                                                githubCollaboratorRepositories.data?.repos?.find(
                                                    (contributorRepo) =>
                                                        contributorRepo.name ===
                                                        value,
                                                ) ??
                                                githubMemberRepositories.data?.repos?.find(
                                                    (memberRepo) =>
                                                        memberRepo.name ===
                                                        value,
                                                ),
                                        );
                                    }}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select your GitHub repository" />
                                    </SelectTrigger>
                                    <SelectContent className="max-h-[200px] max-w-[375px]">
                                        <SelectGroup>
                                            <SelectLabel className="text-muted-foreground">
                                                Personal repositories
                                            </SelectLabel>
                                            {githubOwnerRepositories.data?.repos?.map(
                                                (
                                                    ownerRepo: GithubRepoDisplay,
                                                    index: number,
                                                ) => (
                                                    <SelectRepositoryItem
                                                        key={
                                                            index +
                                                            ownerRepo.githubFullName
                                                        }
                                                        repository={ownerRepo}
                                                    />
                                                ),
                                            )}
                                        </SelectGroup>

                                        <SelectGroup>
                                            <SelectLabel className="text-muted-foreground">
                                                Collaborator repositories
                                            </SelectLabel>
                                            {githubCollaboratorRepositories.data?.repos?.map(
                                                (
                                                    contributorRepo: GithubRepoDisplay,
                                                    index: number,
                                                ) => (
                                                    <SelectRepositoryItem
                                                        key={
                                                            index +
                                                            contributorRepo.githubFullName
                                                        }
                                                        repository={
                                                            contributorRepo
                                                        }
                                                    />
                                                ),
                                            )}
                                        </SelectGroup>

                                        <SelectGroup>
                                            <SelectLabel className="text-muted-foreground">
                                                Organisation repositories
                                            </SelectLabel>
                                            {githubMemberRepositories.data?.repos?.map(
                                                (
                                                    memberRepo: GithubRepoDisplay,
                                                    index: number,
                                                ) => (
                                                    <SelectRepositoryItem
                                                        key={
                                                            index +
                                                            memberRepo.githubFullName
                                                        }
                                                        repository={memberRepo}
                                                    />
                                                ),
                                            )}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-muted-foreground">
                                    Owner
                                </Label>
                                <Select
                                    value={selectedOwner}
                                    onValueChange={setSelectedOwner}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select an owner" />
                                    </SelectTrigger>
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
                                                        displayType="select"
                                                        image={user.image}
                                                        name={
                                                            user.name +
                                                            " " +
                                                            user.surname
                                                        }
                                                    />
                                                    <span>{user.username}</span>
                                                </div>
                                            </SelectItem>
                                        </SelectGroup>
                                        {usersOrganisations.data?.length !==
                                            0 && (
                                            <SelectGroup>
                                                <SelectLabel className="text-muted-foreground">
                                                    Your organisations
                                                </SelectLabel>
                                                {usersOrganisations.data?.map(
                                                    (organisation) => (
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
                                                                    displayType="select"
                                                                    image={
                                                                        organisation.image
                                                                    }
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
                            </div>

                            <div className="space-y-2">
                                <Label className="text-muted-foreground">
                                    Branch
                                </Label>
                                <Select
                                    value={selectedBranch}
                                    onValueChange={setSelectedBranch}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a branch" />
                                    </SelectTrigger>
                                    <SelectContent className="max-h-[200px] max-w-[375px]">
                                        <SelectGroup>
                                            <SelectLabel className="text-muted-foreground">
                                                Branches
                                            </SelectLabel>
                                            {branches.data &&
                                                branches.data.map(
                                                    (
                                                        branch: string,
                                                        index: number,
                                                    ) => (
                                                        <SelectItem
                                                            key={index + branch}
                                                            value={branch}
                                                            className="cursor-pointer hover:bg-accent"
                                                        >
                                                            <div className="flex w-[315px] min-w-0 flex-row items-center gap-x-2">
                                                                <GitBranch className="h-4 w-4 text-muted-foreground" />
                                                                {branch}
                                                            </div>
                                                        </SelectItem>
                                                    ),
                                                )}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-muted-foreground">
                                    Visibility
                                </Label>
                                <RadioGroup
                                    value={selectedVisibility}
                                    onValueChange={setSelectedVisibility}
                                    className="flex flex-col gap-2"
                                >
                                    <div
                                        className={cn(
                                            "flex cursor-pointer flex-row items-center space-x-3 space-y-0 rounded border p-3 hover:bg-accent",
                                            selectedVisibility === "public"
                                                ? "border-accent"
                                                : "border-transparent",
                                        )}
                                        onClick={() =>
                                            setSelectedVisibility("public")
                                        }
                                    >
                                        <RadioGroupItem value="public" />
                                        <Label className="flex w-full cursor-pointer flex-row items-center gap-x-3 font-normal">
                                            <Globe className="h-5 w-5" />
                                            <div className="space-y-1">
                                                <p className="text-sm font-medium leading-none">
                                                    Public
                                                </p>
                                                <p className="text-sm text-muted-foreground">
                                                    Anyone can see this
                                                    repository.
                                                </p>
                                            </div>
                                        </Label>
                                    </div>
                                    <div
                                        className={cn(
                                            "flex cursor-pointer flex-row items-center space-x-3 space-y-0 rounded border p-3 hover:bg-accent",
                                            selectedVisibility === "private"
                                                ? "border-accent"
                                                : "border-transparent",
                                        )}
                                        onClick={() =>
                                            setSelectedVisibility("private")
                                        }
                                    >
                                        <RadioGroupItem value="private" />
                                        <Label className="flex w-full cursor-pointer flex-row items-center gap-x-3 font-normal">
                                            <Lock className="h-5 w-5" />
                                            <div className="space-y-1">
                                                <p className="text-sm font-medium leading-none">
                                                    Private
                                                </p>
                                                <p className="text-sm text-muted-foreground">
                                                    Only you can see this
                                                    repository.
                                                </p>
                                            </div>
                                        </Label>
                                    </div>
                                </RadioGroup>
                            </div>

                            {selectedRepository &&
                                selectedBranch &&
                                selectedOwner &&
                                selectedVisibility && (
                                    <DialogDescription className="text-muted-foreground">
                                        You are about to import a{" "}
                                        {selectedVisibility} repository called
                                        <span className="font-bold">
                                            {" "}
                                            {selectedRepository.name}{" "}
                                        </span>
                                        and its
                                        <span className="font-bold">
                                            {" "}
                                            {selectedBranch}{" "}
                                        </span>
                                        branch. This repository will be under
                                        {selectedOwner === user.id ? (
                                            <span> your personal account.</span>
                                        ) : (
                                            <span>
                                                {" "}
                                                the {getOrganisationName()}{" "}
                                                organisation.
                                            </span>
                                        )}
                                    </DialogDescription>
                                )}
                        </div>

                        <DialogFooter className="mt-5">
                            <Button
                                type="submit"
                                variant="outline"
                                className="w-full"
                                onClick={handleImportRepository}
                                disabled={cloneGithubRepoMutation.isPending}
                            >
                                {showSubmitButtonContent()}
                            </Button>
                        </DialogFooter>
                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
};
