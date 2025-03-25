"use client";

import { imgSrc } from "@/lib/client-file-utils";
import { Repository, RepositoryItem } from "@/lib/types/repository";
import { CopyMinus } from "lucide-react";

import { CreateDirectoryDialog } from "@/components/editor/file/create-directory-dialog";
import { CreateFileDialog } from "@/components/editor/file/create-file-dialog";
import { FileTree } from "@/components/editor/file/file-tree";
import { CloseButton } from "@/components/editor/navigation/close-button";
import { FileExplorerControlButton } from "@/components/editor/sidebar-content/file-explorer-control-button";
import { AvatarDisplay } from "@/components/generic/avatar-display";
import { DynamicTitle } from "@/components/generic/dynamic-title";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dispatch, SetStateAction, useState } from "react";
import { Label } from "@/components/ui/label";

interface FileExplorerTabContentProps {
    repository: Repository;
    tree: Array<RepositoryItem>;
    setTreeAction: Dispatch<SetStateAction<Array<RepositoryItem>>>;
    handleCloseSidebarAction: () => void;
    onFileClick?: (item: RepositoryItem) => void;
}

export const FileExplorerTabContent = ({
    repository,
    tree,
    setTreeAction,
    handleCloseSidebarAction,
    onFileClick,
}: FileExplorerTabContentProps) => {
    const [selectedItem, setSelectedItem] = useState<RepositoryItem | undefined>(undefined);
    const [expandedItems, setExpandedItems] = useState<Array<RepositoryItem>>([]);

    // adding dummy cpp file to test simulation dialog
    if (
        repository.tree &&
        !repository.tree.find((item) => item.name === "testbench.cpp")
    ) {
        repository.tree.push({
            type: "file-display",
            name: "testbench.cpp",
            language: "cpp",
            absolutePath: "testbench.cpp",
            lastActivity: new Date(),
        });
    }

    return (
        <ScrollArea className="relative h-full w-full">
            <div className="min-w-0 text-nowrap p-4">
                <header className="flex flex-col gap-y-3 pb-2">
                    <div className="flex flex-row items-center justify-between gap-x-3">
                        <div className="flex min-w-0 flex-row gap-x-2 text-xl font-medium">
                            <AvatarDisplay
                                displayType="select"
                                name={repository.ownerName}
                                image={imgSrc(repository.ownerImage)}
                            />
                            <DynamicTitle
                                title={
                                    repository.ownerName + "/" + repository.name
                                }
                                className="text-foreground hover:text-foreground"
                                tooltipVisible
                            />
                        </div>
                        <CloseButton onClick={handleCloseSidebarAction} />
                    </div>
                    <div className="flex flex-row gap-x-1">
                        <CreateDirectoryDialog
                            repositoryId={repository.id}
                            buttonSize="icon"
                            tree={tree}
                            setTree={setTreeAction}
                        />
                        <CreateFileDialog
                            repositoryId={repository.id}
                            buttonSize="icon"
                            tree={tree}
                            setTree={setTreeAction}
                        />
                        <FileExplorerControlButton
                            icon={CopyMinus}
                            tooltipContent="Collapse all"
                            onClick={() => {
                                setExpandedItems([]);
                            }}
                        />
                    </div>
                </header>
                {tree.length > 0 ? (
                    <FileTree
                        tree={tree}
                        setTreeAction={setTreeAction}
                        onItemClick={onFileClick}
                        selectedItem={selectedItem}
                        setSelectedItemAction={setSelectedItem}
                        expandedItems={expandedItems}
                        setExpandedItemsAction={setExpandedItems}
                    />
                ) : (
                    <Label className="text-sm text-muted-foreground">
                        No changes yet
                    </Label>
                )}
            </div>
        </ScrollArea>
    );
};
