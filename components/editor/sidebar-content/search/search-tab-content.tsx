import { Repository } from "@/lib/types/repository";
import { SearchIcon } from "lucide-react";
import { useState } from "react";

import { CloseButton } from "@/components/editor/navigation/close-button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SearchTabContentProps {
    repository: Repository;
    handleCloseSidebar: () => void;
}

export const SearchTabContent = ({
    repository,
    handleCloseSidebar,
}: SearchTabContentProps) => {
    const [repositorySearchTerm, setRepositorySearchTerm] =
        useState<string>("");

    return (
        <ScrollArea className="relative h-full w-full">
            <div className="text-nowrap p-4">
                <header className="flex flex-row items-center justify-between pb-4">
                    <span className="text-xl font-medium">Search</span>
                    <CloseButton
                        onClick={handleCloseSidebar}
                        tooltip="Close sidebar"
                    />
                </header>
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
    );
};
