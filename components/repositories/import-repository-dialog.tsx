"use client";

import { api } from "@/lib/trpc/react";
import { GithubRepoDisplay } from "@/lib/types/repository";
import { GitBranch, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";



import { AvatarDisplay } from "@/components/avatar-display/avatar-display";
import { useUser } from "@/components/context/user-context";
import { DynamicTitle } from "@/components/dynamic-title-link/dynamic-title";
import GithubIcon from "@/components/icons/github";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";


interface ImportRepositoryDialogProps {
    githubRepositories: Array<GithubRepoDisplay>;
}

export const ImportRepositoryDialog = ({
    githubRepositories,
}: ImportRepositoryDialogProps) => {
    const { user } = useUser();

    const [branches, setBranches] = useState<Array<string>>([]);

    const [selectedRepository, setSelectedRepository] = useState<GithubRepoDisplay | undefined>(undefined);
    const [selectedBranch, setSelectedBranch] = useState<string | undefined>(undefined);

    const cloneGithubRepoMutation = api.github.clone.useMutation({
        onSuccess: () => {
            toast.success("Repository successfully cloned.");
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });

    useEffect(() => {
        // TODO: no clue how this is called
        /*setBranches(
            api.github.branches({
                ownerSlug: user.username,
                repositorySlug: selectedRepository?.name,
            })
        );*/
        // dummy data
        setBranches(["main", "master", "production"])
    }, [selectedRepository, user.username]);
    
    const handleImportRepository = () => {
        // TODO: no clue how this is called as well
        // cloneGithubRepoMutation.mutate({});
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">
                    <GithubIcon />
                    Import repository
                </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[90vh] max-w-[425px] overflow-clip p-0">
                <ScrollArea className="h-full max-h-[90vh]">
                    <div className="p-6">
                        <DialogHeader>
                            <DialogTitle className="text-center text-xl">
                                Import an existing repository
                            </DialogTitle>
                            <DialogDescription>
                                Here you can import an existing repository connected to your GitHub account.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="space-y-3 pt-3">
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select your GitHub repository" />
                                </SelectTrigger>
                                <SelectContent className="max-h-[200px] max-w-[375px]">
                                    <SelectGroup>
                                        <SelectLabel className="text-muted-foreground">Your GitHub repositories</SelectLabel>
                                        {githubRepositories.map((repository: GithubRepoDisplay, index: number) => (
                                            <SelectItem
                                                key={index + repository.githubFullName + index}
                                                value={repository.name}
                                                className="cursor-pointer hover:bg-accent"
                                                onClick={() => {
                                                    setSelectedRepository(githubRepositories.find((githubRepository) => githubRepository.name === repository.name));
                                                }}
                                            >
                                                <div className="flex flex-row items-center space-x-3 min-w-0 w-[315px]">
                                                    <AvatarDisplay
                                                        displayType="select"
                                                        image={user.image}
                                                        name={user.username}
                                                    />
                                                    <DynamicTitle
                                                        title={user.username + "/" + repository.name}
                                                        className="truncate text-foreground hover:text-foreground text-sm font-normal tracking-normal leading-normal"
                                                    />
                                                </div>
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>

                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a branch" />
                                </SelectTrigger>
                                <SelectContent className="max-h-[200px] max-w-[375px]">
                                    <SelectGroup>
                                        <SelectLabel className="text-muted-foreground">Branches</SelectLabel>
                                        {branches.map((branch: string, index: number) => (
                                            <SelectItem
                                                key={index + branch}
                                                value={branch}
                                                className="cursor-pointer hover:bg-accent"
                                                onClick={() => {
                                                    setSelectedBranch(branch);
                                                }}
                                            >
                                                <div className="flex flex-row items-center space-x-2 min-w-0 w-[315px]">
                                                    <GitBranch />
                                                    {branch}
                                                </div>
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>

                        {selectedRepository && selectedBranch && (
                            <DialogDescription>
                                You are about to import a repository called {selectedRepository.name} and its {selectedBranch} branch.
                            </DialogDescription>
                        )}

                        <DialogFooter className="mt-5">
                            <DialogTrigger asChild>
                                <Button
                                    type="submit"
                                    variant="outline"
                                    className="w-full"
                                    onClick={handleImportRepository}
                                    disabled={cloneGithubRepoMutation.isPending}
                                >
                                    {cloneGithubRepoMutation.isPending ? (
                                        <Loader2 />
                                    ) : (
                                        <>
                                            <GithubIcon />
                                            Import
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