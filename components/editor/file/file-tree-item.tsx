"use client";

import type { RepositoryItem } from "@/lib/types/repository";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronRight, FileIcon, Folder } from "lucide-react";
import {
    Dispatch,
    DragEvent,
    RefObject,
    SetStateAction,
    useRef,
    useState,
} from "react";

import { RepositoryItemActions } from "@/components/editor/sidebar-content/repository-item-actions";
import { sortTree } from "@/components/generic/generic";

interface FileTreeItemProps {
    repositoryId: string;
    item: RepositoryItem;
    tree: Array<RepositoryItem>;
    setTreeAction: Dispatch<SetStateAction<Array<RepositoryItem>>>;
    selectedItem: RepositoryItem | undefined;
    setSelectedItemAction: Dispatch<SetStateAction<RepositoryItem | undefined>>;
    depth?: number;
    onItemClick?: (item: RepositoryItem) => void;
    expandedItems: Array<RepositoryItem>;
    setExpandedItemsAction: Dispatch<SetStateAction<Array<RepositoryItem>>>;
    hoveredItem: RepositoryItem | undefined;
    setHoveredItemAction: Dispatch<SetStateAction<RepositoryItem | undefined>>;
    onMoveItem?: (
        sourceItem: RepositoryItem,
        targetItem: RepositoryItem,
    ) => void;
    onDragOverItem?: () => void;
}

export const FileTreeItem = ({
    repositoryId,
    item,
    tree,
    setTreeAction,
    selectedItem,
    setSelectedItemAction,
    depth = 0,
    onItemClick,
    expandedItems,
    setExpandedItemsAction,
    hoveredItem,
    setHoveredItemAction,
    onMoveItem,
    onDragOverItem,
}: FileTreeItemProps) => {
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
    const [isDragOver, setIsDragOver] = useState<boolean>(false);
    const itemRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

    const isHovered: boolean = hoveredItem?.name === item.name;

    const handleToggle = () => {
        if (item.type === "directory" || item.type === "directory-display") {
            if (
                !expandedItems.find(
                    (expandedItem: RepositoryItem) =>
                        expandedItem.name === item.name,
                )
            ) {
                setExpandedItemsAction([...expandedItems, item]);
            } else {
                const filteredExpandedItems: Array<RepositoryItem> =
                    expandedItems.filter(
                        (expandedItem: RepositoryItem) =>
                            expandedItem.name !== item.name,
                    );
                setExpandedItemsAction(filteredExpandedItems);
            }
        }
    };

    const handleDragStart = (event: DragEvent<HTMLDivElement>) => {
        event.dataTransfer.setData("text/plain", item.name);
        event.dataTransfer.effectAllowed = "move";
    };

    const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
        event.dataTransfer.dropEffect = "move";
        setIsDragOver(true);

        if (onDragOverItem) {
            onDragOverItem();
        }
    };

    const handleDragEnter = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();

        if (onDragOverItem) {
            onDragOverItem();
        }
    };

    const handleDragLeave = () => {
        setIsDragOver(false);
    };

    const handleDrop = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
        setIsDragOver(false);

        try {
            if (event.dataTransfer) {
                const sourcePath: string =
                    event.dataTransfer.getData("text/plain");
                const sourceItem: RepositoryItem | undefined = tree.find(
                    (treeItem) => treeItem.name === sourcePath,
                );

                if (!sourceItem) return;
                if (sourceItem.name === item.name) return;
                if (
                    item.type !== "directory" &&
                    item.type !== "directory-display"
                )
                    return;
                if (item.name.startsWith(sourceItem.name + "/")) return;

                if (onMoveItem) {
                    onMoveItem(sourceItem, item);
                }
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div
            onMouseEnter={() => setHoveredItemAction(item)}
            onMouseLeave={() => {
                if (isHovered && !dropdownOpen) {
                    setHoveredItemAction(undefined);
                }
            }}
            ref={itemRef}
        >
            <div
                className={cn(
                    "flex cursor-default flex-row items-center justify-between rounded border border-transparent px-2 py-1.5 text-sm",
                    selectedItem?.name === item.name &&
                        "border-primary bg-accent font-medium",
                    isDragOver && "border-primary bg-accent",
                    "hover:bg-accent",
                )}
                style={{ paddingLeft: `${depth * 24 + 8}px` }}
                draggable
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => {
                    if (!(selectedItem?.name === item.name)) {
                        setSelectedItemAction(item);
                    } else {
                        setSelectedItemAction(undefined);
                    }
                }}
                onDoubleClick={() => {
                    if (onItemClick) {
                        onItemClick(item);
                    }
                }}
            >
                <div className="flex flex-1 flex-row items-center rounded text-sm hover:bg-accent">
                    {item.type === "directory" ||
                    item.type === "directory-display" ? (
                        <>
                            <span className="mr-2">
                                {expandedItems.find(
                                    (expandedItem: RepositoryItem) =>
                                        expandedItem.name === item.name,
                                ) ? (
                                    <div onClick={handleToggle}>
                                        <ChevronDown className="max-h-4 min-h-4 min-w-4 max-w-4 cursor-pointer" />
                                    </div>
                                ) : (
                                    <div onClick={handleToggle}>
                                        <ChevronRight className="max-h-4 min-h-4 min-w-4 max-w-4 cursor-pointer" />
                                    </div>
                                )}
                            </span>
                            <Folder
                                className="mr-2 max-h-4 min-h-4 min-w-4 max-w-4"
                                fill="currentColor"
                            />
                        </>
                    ) : (
                        <FileIcon className="ml-6 mr-2 max-h-4 min-h-4 min-w-4 max-w-4" />
                    )}
                    <span className="truncate">{item.name}</span>
                </div>
                {(isHovered || dropdownOpen) && (
                    <RepositoryItemActions
                        repositoryId={repositoryId}
                        parentItem={item}
                        tree={tree}
                        setTree={setTreeAction}
                        dropdownOpen={dropdownOpen}
                        setDropdownOpen={setDropdownOpen}
                        onAction={() => {
                            setHoveredItemAction(undefined);
                            setDropdownOpen(false);
                        }}
                    />
                )}
            </div>

            {expandedItems.find(
                (expandedItem: RepositoryItem) =>
                    expandedItem.name === item.name,
            ) &&
                item.type === "directory" && (
                    <div>
                        {sortTree(item.children).map(
                            (child: RepositoryItem, index: number) => (
                                <FileTreeItem
                                    key={
                                        index +
                                        child.lastActivity.toLocaleString()
                                    }
                                    repositoryId={repositoryId}
                                    item={child}
                                    tree={tree}
                                    setTreeAction={setTreeAction}
                                    onItemClick={() => {
                                        if (onItemClick) {
                                            onItemClick(child);
                                        }
                                    }}
                                    selectedItem={selectedItem}
                                    setSelectedItemAction={
                                        setSelectedItemAction
                                    }
                                    depth={depth + 1}
                                    expandedItems={expandedItems}
                                    setExpandedItemsAction={
                                        setExpandedItemsAction
                                    }
                                    hoveredItem={hoveredItem}
                                    setHoveredItemAction={setHoveredItemAction}
                                    onMoveItem={onMoveItem}
                                    onDragOverItem={onDragOverItem}
                                />
                            ),
                        )}
                    </div>
                )}
        </div>
    );
};
