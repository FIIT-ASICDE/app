"use client";

import { api } from "@/lib/trpc/react";
import type {
    DirectoryDisplayItem,
    RepositoryItem,
} from "@/lib/types/repository";
import { cn } from "@/lib/utils";
import {
    Dispatch,
    DragEvent,
    ReactElement,
    SetStateAction,
    useState,
} from "react";
import { toast } from "sonner";

import { FileTreeItem } from "@/components/editor/file/file-tree-item";
import { MoveItemDialog } from "@/components/editor/file/move-item-dialog";
import {
    findItemInTree,
    handleToggle,
    moveItemInTree,
    sortTree,
} from "@/components/generic/generic";

interface FileTreeProps {
    repositoryId: string;
    tree: Array<RepositoryItem>;
    setTreeAction: Dispatch<SetStateAction<Array<RepositoryItem>>>;
    onItemClick?: (item: RepositoryItem) => void;
    selectedItem: RepositoryItem | undefined;
    setSelectedItemAction: Dispatch<SetStateAction<RepositoryItem | undefined>>;
    expandedItems: Array<RepositoryItem>;
    setExpandedItemsAction: Dispatch<SetStateAction<Array<RepositoryItem>>>;
}

/**
 * Component displaying the whole file tree of a repository
 *
 * @param {FileTreeProps} props - Component props
 * @returns {ReactElement} File tree component
 */
export const FileTree = ({
    repositoryId,
    tree,
    setTreeAction,
    onItemClick,
    selectedItem,
    setSelectedItemAction,
    expandedItems,
    setExpandedItemsAction,
}: FileTreeProps): ReactElement => {
    const [moveDialogOpen, setMoveDialogOpen] = useState<boolean>(false);
    const [sourceItem, setSourceItem] = useState<RepositoryItem | undefined>(
        undefined,
    );
    const [targetItem, setTargetItem] = useState<RepositoryItem | undefined>(
        undefined,
    );
    const [isDragOverRoot, setIsDragOverRoot] = useState<boolean>(false);
    const [hoveredItem, setHoveredItem] = useState<RepositoryItem | undefined>(
        undefined,
    );

    const moveItemMutation = api.editor.renameItem.useMutation({
        onSuccess: () => {
            if (!sourceItem || !targetItem) return;

            const updatedTree: Array<RepositoryItem> = moveItemInTree(
                tree,
                sourceItem,
                targetItem,
            );
            setTreeAction(updatedTree);

            setMoveDialogOpen(false);
            setSourceItem(undefined);
            setTargetItem(undefined);

            const sourceItemDisplayType: string =
                sourceItem.type === "directory" ||
                sourceItem.type === "directory-display"
                    ? "Directory"
                    : "File";

            toast.success(sourceItemDisplayType + " moved successfully");
        },
    });

    const rootDirectoryItem: DirectoryDisplayItem = {
        type: "directory-display",
        name: "",
        lastActivity: new Date(),
        absolutePath: "",
    };

    const sortedTree: Array<RepositoryItem> = sortTree([...tree]);

    const handleMoveItem = (source: RepositoryItem, target: RepositoryItem) => {
        console.log(
            "handleMoveItem called with source:",
            source.absolutePath,
            "target:",
            target.absolutePath,
        );

        if (source && target) {
            setSourceItem(source);
            setTargetItem(target);
            setMoveDialogOpen(true);
        } else {
            console.error(
                "Cannot open move dialog: source or target is undefined",
            );
        }
    };

    const confirmMoveItem = () => {
        if (!sourceItem || !targetItem) return;

        const newPath: string =
            targetItem.name === ""
                ? sourceItem.name
                : `${targetItem.absolutePath}/${sourceItem.name}`;

        moveItemMutation.mutate({
            repoId: repositoryId,
            originalPath: sourceItem.absolutePath,
            newPath: newPath,
        });
    };

    const cancelMoveItem = () => {
        setMoveDialogOpen(false);
        setSourceItem(undefined);
        setTargetItem(undefined);
    };

    const handleRootDragOver = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
        setIsDragOverRoot(true);
    };

    const handleRootDragLeave = () => {
        setIsDragOverRoot(false);
    };

    const handleRootDrop = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragOverRoot(false);

        try {
            const sourcePath: string = event.dataTransfer.getData("text/plain");
            const sourceItem: RepositoryItem | undefined = findItemInTree(
                tree,
                sourcePath,
            );

            if (!sourceItem) return;

            const isAlreadyInRoot: boolean =
                !sourceItem.absolutePath.includes("/") &&
                !sourceItem.absolutePath.includes("\\");

            if (isAlreadyInRoot) {
                toast.info("Item is already in the root directory");
                return;
            }

            handleMoveItem(sourceItem, rootDirectoryItem);
        } catch (error) {
            console.log("Error handling drop:", error);
        }
    };

    return (
        <div
            className={cn(
                "flex min-h-full flex-1 flex-grow flex-col rounded border border-transparent p-2 pt-2",
                isDragOverRoot && "border-primary bg-accent",
            )}
            onDragOver={handleRootDragOver}
            onDragLeave={handleRootDragLeave}
            onDrop={handleRootDrop}
        >
            {sortedTree.map((item: RepositoryItem, index: number) => (
                <FileTreeItem
                    key={index + item.lastActivity.toLocaleString()}
                    repositoryId={repositoryId}
                    item={item}
                    tree={tree}
                    setTreeAction={setTreeAction}
                    onItemClick={(repoItem: RepositoryItem) => {
                        console.log("2clicked on:", repoItem);

                        if (
                            repoItem.type === "directory" ||
                            repoItem.type === "directory-display"
                        ) {
                            handleToggle(
                                repoItem,
                                expandedItems,
                                setExpandedItemsAction,
                            );
                        } else {
                            onItemClick?.(repoItem);
                        }
                    }}
                    selectedItem={selectedItem}
                    setSelectedItemAction={setSelectedItemAction}
                    depth={0}
                    expandedItems={expandedItems}
                    setExpandedItemsAction={setExpandedItemsAction}
                    hoveredItem={hoveredItem}
                    setHoveredItemAction={setHoveredItem}
                    onMoveItem={handleMoveItem}
                    onDragOverItem={() => setIsDragOverRoot(false)}
                />
            ))}

            {sourceItem && targetItem && (
                <MoveItemDialog
                    isOpen={moveDialogOpen}
                    setIsOpen={setMoveDialogOpen}
                    sourceItem={sourceItem}
                    targetItem={targetItem}
                    onConfirm={confirmMoveItem}
                    onCancel={cancelMoveItem}
                />
            )}
        </div>
    );
};
