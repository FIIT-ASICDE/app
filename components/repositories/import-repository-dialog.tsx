"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import GithubIcon from "@/components/icons/github";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { Repository } from "@/lib/types/repository";
import { AvatarDisplay } from "@/components/avatar-display/avatar-display";
import { DynamicTitle } from "@/components/dynamic-title-link/dynamic-title";

interface ImportRepositoryDialogProps {
    githubRepositories: Array<Repository>;
}

export const ImportRepositoryDialog = ({
    githubRepositories,
}: ImportRepositoryDialogProps) => {
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
                                <SelectContent className="h-[200px] max-w-[375px]">
                                    <SelectGroup>
                                        <SelectLabel className="text-muted-foreground">Your GitHub repositories</SelectLabel>
                                        {githubRepositories.map((repository: Repository) => (
                                            <SelectItem
                                                key={repository.id}
                                                value={repository.id}
                                                className="cursor-pointer hover:bg-accent"
                                            >
                                                <div className="flex flex-row items-center space-x-3 min-w-0 w-[315px]">
                                                    <AvatarDisplay
                                                        displayType="select"
                                                        image={repository.ownerImage}
                                                        name={repository.ownerName}
                                                    />
                                                    <DynamicTitle
                                                        title={repository.ownerName + "/" + repository.name}
                                                        className="truncate text-foreground hover:text-foreground text-sm font-normal tracking-normal leading-normal"
                                                    />
                                                </div>
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>

                        <DialogFooter className="mt-5">
                            <DialogTrigger asChild>
                                <Button
                                    type="submit"
                                    variant="outline"
                                    className="w-full"
                                    onClick={() => {
                                    }}
                                    disabled={false}
                                >
                                    <GithubIcon />
                                    Import
                                </Button>
                            </DialogTrigger>
                        </DialogFooter>
                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
};