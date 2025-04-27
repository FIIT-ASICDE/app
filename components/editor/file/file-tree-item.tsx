"use client";

import type { RepositoryItem } from "@/lib/types/repository";
import { cn } from "@/lib/utils";
import { FileIcon, Folder } from "lucide-react";
import {
    Dispatch,
    DragEvent,
    ReactElement,
    RefObject,
    SetStateAction,
    useRef,
    useState,
} from "react";

import { ExpandCollapseIcon } from "@/components/editor/file/expand-collapse-icon";
import { RepositoryItemActions } from "@/components/editor/sidebar-content/file-explorer/repository-item-actions";
import {
    findItemInTree,
    handleToggle,
    sortTree,
} from "@/components/generic/generic";

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

/**
 * Component that depicts a file tree item within a repository
 *
 * @param {FileTreeItemProps} props - Component props
 * @returns {ReactElement} File tree item component
 */
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
}: FileTreeItemProps): ReactElement => {
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
    const [isDragOver, setIsDragOver] = useState<boolean>(false);
    const itemRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

    const isHovered: boolean = hoveredItem?.absolutePath === item.absolutePath;

    const handleDragStart = (event: DragEvent<HTMLDivElement>) => {
        event.dataTransfer.setData("text/plain", item.absolutePath);
        event.dataTransfer.effectAllowed = "move";
    };

    const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
        event.dataTransfer.dropEffect = "move";
        setIsDragOver(true);

        onDragOverItem?.();
    };

    const handleDragEnter = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();

        onDragOverItem?.();
    };

    const handleDragLeave = () => {
        setIsDragOver(false);
    };

    const handleDrop = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
        setIsDragOver(false);

        try {
            const sourcePath: string = event.dataTransfer.getData("text/plain");
            const sourceItem: RepositoryItem | undefined = findItemInTree(
                tree,
                sourcePath,
            );

            if (!sourceItem) return;
            if (sourceItem.absolutePath === item.absolutePath) return;
            if (item.type !== "directory") return;
            if (item.absolutePath.startsWith(sourceItem.absolutePath + "/"))
                return;

            onMoveItem?.(sourceItem, item);
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
                    selectedItem?.absolutePath === item.absolutePath &&
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
                onClick={() => setSelectedItemAction(item)}
                onDoubleClick={() => onItemClick?.(item)}
                onContextMenu={(e) => {
                    e.preventDefault();
                    setSelectedItemAction(item);
                    setHoveredItemAction(item);
                    setDropdownOpen(true);
                }}
            >
                <div className="flex flex-1 flex-row items-center rounded text-sm hover:bg-accent">
                    {item.type === "directory" ||
                    item.type === "directory-display" ? (
                        <>
                            <ExpandCollapseIcon
                                expanded={expandedItems.some(
                                    (expandedItem: RepositoryItem) =>
                                        expandedItem.absolutePath ===
                                        item.absolutePath,
                                )}
                                hasChildren={
                                    item.type === "directory" &&
                                    item.children.length > 0
                                }
                                handleToggle={() =>
                                    handleToggle(
                                        item,
                                        expandedItems,
                                        setExpandedItemsAction,
                                    )
                                }
                                className="mr-2"
                            />
                            <Folder
                                className="mr-2 max-h-4 min-h-4 min-w-4 max-w-4"
                                fill="currentColor"
                            />
                        </>
                    ) : (
                        <FileIcon className="ml-6 mr-2 max-h-4 min-h-4 min-w-4 max-w-4" />
                    )}
                    {item.name}
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
                        onOpenFile={onItemClick}
                    />
                )}
            </div>

            {expandedItems.find(
                (expandedItem: RepositoryItem) =>
                    expandedItem.absolutePath === item.absolutePath,
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
                                    onItemClick={(repoItem: RepositoryItem) => {
                                        console.log("2clicked on:", repoItem);

                                        if (
                                            repoItem.type === "directory" ||
                                            repoItem.type ===
                                                "directory-display"
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
