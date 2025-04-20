"use client";

import { Repository } from "@/lib/types/repository";
import { SearchIcon } from "lucide-react";
import { ReactElement, useState } from "react";

import { CloseButton } from "@/components/editor/navigation/close-button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface SearchTabContentProps {
    repository: Repository;
    handleCloseSidebarAction: () => void;
}

/**
 * Tab content component that lets the user search for items within the repository
 *
 * @param {SearchTabContentProps} props - Component props
 * @returns {ReactElement} Tab content component
 */
export const SearchTabContent = ({
    repository,
    handleCloseSidebarAction,
}: SearchTabContentProps): ReactElement => {
    const [repositorySearchTerm, setRepositorySearchTerm] =
        useState<string>("");

    return (
        <div className="relative flex h-full w-full flex-col">
            <header className="flex w-full flex-col gap-y-3 p-4">
                <div className="flex flex-row items-center justify-between gap-x-3">
                    <span className="pr-8 text-lg font-medium">Search</span>
                    <CloseButton
                        onClick={handleCloseSidebarAction}
                        tooltip="Close sidebar"
                        className="absolute right-4 top-4"
                    />
                </div>
            </header>

            <Separator />

            <ScrollArea className="relative h-full w-full">
                <div className="text-nowrap p-4">
                    <div className="space-y-3">
                        <div className="relative w-full">
                            <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder={"Search in " + repository.name}
                                value={repositorySearchTerm}
                                onChange={(e) =>
                                    setRepositorySearchTerm(e.target.value)
                                }
                                className="pl-9"
                            />
                        </div>
                    </div>
                </div>
            </ScrollArea>
        </div>
    );
};
