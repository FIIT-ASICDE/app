import { imgSrc } from "@/lib/client-file-utils";
import type { SidebarContentTab } from "@/lib/types/editor";
import type { Repository } from "@/lib/types/repository";
import { FileX, SearchIcon } from "lucide-react";
import { useState } from "react";

import { FileTree } from "@/components/editor/file/file-tree";
import { AvatarDisplay } from "@/components/generic/avatar-display";
import { NoData } from "@/components/generic/no-data";
import { Input } from "@/components/ui/input";

interface SidebarTabContentProps {
    activeSidebarContent: SidebarContentTab;
    repository: Repository;
}

export const SidebarTabContent = ({
    activeSidebarContent,
    repository,
}: SidebarTabContentProps) => {
    const [repositorySearchTerm, setRepositorySearchTerm] =
        useState<string>("");

    return (
        <div className="p-2">
            {activeSidebarContent === "fileExplorer" && (
                <div className="text-nowrap p-2">
                    <header className="flex flex-row gap-x-2 pb-4 text-xl font-medium">
                        <AvatarDisplay
                            displayType="select"
                            name={repository.ownerName}
                            image={imgSrc(repository.ownerImage)}
                        />
                        {repository.ownerName + "/" + repository.name}
                    </header>
                    {repository.tree && repository.tree.length ? (
                        <FileTree
                            tree={repository.tree}
                            onItemClick={() => console.log("clicked")}
                        />
                    ) : (
                        <NoData
                            icon={FileX}
                            message={"No files or directories found"}
                        />
                    )}
                </div>
            )}
            ;
            {activeSidebarContent === "search" && (
                <div className="text-nowrap p-2">
                    <header className="pb-4 text-xl font-medium">Search</header>
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
            )}
            ;
            {activeSidebarContent === "sourceControl" && (
                <div className="text-nowrap p-2">
                    <header className="pb-4 text-xl font-medium">
                        Source control
                    </header>
                    <div className="space-y-3">
                        <p>
                            Here the source control with GitHub should be
                            implemented
                        </p>
                    </div>
                </div>
            )}
            ;
        </div>
    );
};
