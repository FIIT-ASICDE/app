"use client";

import { imgSrc } from "@/lib/client-file-utils";
import { Repository, RepositoryItem } from "@/lib/types/repository";
import { CopyMinus } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";

import { CreateDirectoryDialog } from "@/components/editor/file/create-directory-dialog";
import { CreateFileDialog } from "@/components/editor/file/create-file-dialog";
import { FileTree } from "@/components/editor/file/file-tree";
import { CloseButton } from "@/components/editor/navigation/close-button";
import { FileExplorerControlButton } from "@/components/editor/sidebar-content/file-explorer/file-explorer-control-button";
import { AvatarDisplay } from "@/components/generic/avatar-display";
import { DynamicTitle } from "@/components/generic/dynamic-title";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface FileExplorerTabContentProps {
    repository: Repository;
    tree: Array<RepositoryItem>;
    setTreeAction: Dispatch<SetStateAction<Array<RepositoryItem>>>;
    handleCloseSidebarAction: () => void;
    onFileClick?: (item: RepositoryItem) => void;
}

/**
 * Tab content component that lets the user explore the repository file tree
 *
 * @param {FileExplorerTabContentProps} props - Component props
 * @returns {ReactElement} Tab content component
 */
export const FileExplorerTabContent = ({
    repository,
    tree,
    setTreeAction,
    handleCloseSidebarAction,
    onFileClick,
}: FileExplorerTabContentProps) => {
    const [selectedItem, setSelectedItem] = useState<
        RepositoryItem | undefined
    >(undefined);
    const [expandedItems, setExpandedItems] = useState<Array<RepositoryItem>>(
        [],
    );

    return (
        <div className="flex flex-col h-full w-full relative">
            <header className="flex flex-col gap-y-3 p-4 pb-2 w-full h-[88px]">
                <div className="flex flex-row items-center justify-between gap-x-3">
                    <div className="flex min-w-0 flex-row gap-x-2 font-medium pr-8">
                        <AvatarDisplay
                            displayType="select"
                            name={repository.ownerName}
                            image={imgSrc(repository.ownerImage)}
                        />
                        <DynamicTitle
                            title={repository.ownerName + "/" + repository.name}
                            className="text-foreground hover:text-foreground text-md"
                            tooltipVisible
                        />
                    </div>
                    <CloseButton
                        onClick={handleCloseSidebarAction}
                        tooltip="Close sidebar"
                        className="absolute top-4 right-4"
                    />
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

            <Separator />

            <ScrollArea className="relative flex-1 w-full min-h-0">
                <div className="flex flex-auto flex-col text-nowrap">
                    {tree.length > 0 ? (
                        <FileTree
                            repositoryId={repository.id}
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
        </div>
    );
};
