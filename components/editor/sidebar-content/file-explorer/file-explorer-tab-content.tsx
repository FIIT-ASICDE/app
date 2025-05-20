"use client";

import { imgSrc } from "@/lib/client-file-utils";
import { Repository, RepositoryItem } from "@/lib/types/repository";
import { CopyMinus } from "lucide-react";
import { Dispatch, ReactElement, SetStateAction } from "react";

import { CreateDirectoryDialog } from "@/components/editor/file/create-directory-dialog";
import { CreateFileDialog } from "@/components/editor/file/create-file-dialog";
import { CreateDiagramDialog } from "@/components/editor/file/create-diagram-dialog";
import { FileTree } from "@/components/editor/file/file-tree";
import { CloseButton } from "@/components/editor/navigation/close-button";
import { FileExplorerControlButton } from "@/components/editor/sidebar-content/file-explorer/file-explorer-control-button";
import { AvatarDisplay } from "@/components/generic/avatar-display";
import { DynamicTitle } from "@/components/generic/dynamic-title";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Configuration } from "@/lib/types/editor";

interface FileExplorerTabContentProps {
    repository: Repository;
    tree: Array<RepositoryItem>;
    selectedItem: RepositoryItem | undefined;
    setSelectedItemAction: Dispatch<SetStateAction<RepositoryItem | undefined>>;
    expandedItems: Array<RepositoryItem>;
    setExpandedItemsAction: Dispatch<SetStateAction<Array<RepositoryItem>>>;
    setTreeAction: Dispatch<SetStateAction<Array<RepositoryItem>>>;
    handleCloseSidebarAction: () => void;
    onFileClick?: (item: RepositoryItem) => void;
    configuration: Configuration | undefined;
    setConfigurationAction: Dispatch<SetStateAction<Configuration | undefined>>;
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
    selectedItem,
    setSelectedItemAction,
    expandedItems,
    setExpandedItemsAction,
    setTreeAction,
    handleCloseSidebarAction,
    onFileClick,
    configuration,
    setConfigurationAction,
}: FileExplorerTabContentProps): ReactElement => {
    return (
        <div className="relative flex h-full w-full flex-col">
            <header className="flex h-[88px] w-full flex-col gap-y-3 p-4 pb-2">
                <div className="flex flex-row items-center justify-between gap-x-3">
                    <div className="flex min-w-0 flex-row gap-x-2 pr-8 font-medium">
                        <AvatarDisplay
                            displayType="select"
                            name={repository.ownerName}
                            image={imgSrc(repository.ownerImage)}
                        />
                        <DynamicTitle
                            title={repository.ownerName + "/" + repository.name}
                            className="text-md text-foreground hover:text-foreground"
                            tooltipVisible
                        />
                    </div>
                    <CloseButton
                        onClick={handleCloseSidebarAction}
                        tooltip="Close sidebar"
                        className="absolute right-4 top-4"
                    />
                </div>
                <div className="flex flex-row gap-x-1">
                    <CreateDirectoryDialog
                        repositoryId={repository.id}
                        buttonSize="icon"
                        parentItem={selectedItem}
                        tree={tree}
                        setTree={setTreeAction}
                    />
                    <CreateFileDialog
                        repositoryId={repository.id}
                        buttonSize="icon"
                        parentItem={selectedItem}
                        tree={tree}
                        setTree={setTreeAction}
                    />
                    <CreateDiagramDialog
                        repositoryId={repository.id}
                        buttonSize="icon"
                        parentItem={selectedItem}
                        tree={tree}
                        setTree={setTreeAction}
                    />
                    <FileExplorerControlButton
                        icon={CopyMinus}
                        tooltipContent="Collapse all"
                        onClick={() => {
                            setExpandedItemsAction([]);
                        }}
                    />
                </div>
            </header>

            <Separator />

            <ScrollArea className="relative min-h-0 w-full flex-1">
                <div className="flex flex-auto flex-col text-nowrap">
                    {tree.length > 0 ? (
                        <FileTree
                            repositoryId={repository.id}
                            tree={tree}
                            setTreeAction={setTreeAction}
                            onItemClick={onFileClick}
                            selectedItem={selectedItem}
                            setSelectedItemAction={setSelectedItemAction}
                            expandedItems={expandedItems}
                            setExpandedItemsAction={setExpandedItemsAction}
                            configuration={configuration}
                            setConfigurationAction={setConfigurationAction}
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
