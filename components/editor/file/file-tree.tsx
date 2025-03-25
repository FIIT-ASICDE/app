"use client";

import type { RepositoryItem } from "@/lib/types/repository";
import { Dispatch, SetStateAction } from "react";

import { FileTreeItem } from "@/components/editor/file/file-tree-item";

interface FileTreeProps {
    tree: Array<RepositoryItem>;
    setTreeAction: Dispatch<SetStateAction<Array<RepositoryItem>>>;
    onItemClick?: (item: RepositoryItem) => void;
    selectedItem: RepositoryItem | undefined;
    setSelectedItemAction: Dispatch<SetStateAction<RepositoryItem | undefined>>;
    expandedItems: Array<RepositoryItem>;
    setExpandedItemsAction: Dispatch<SetStateAction<Array<RepositoryItem>>>;
}

export const FileTree = ({
    tree,
    setTreeAction,
    onItemClick,
    selectedItem,
    setSelectedItemAction,
    expandedItems,
    setExpandedItemsAction,
}: FileTreeProps) => {
    const sortedTree: Array<RepositoryItem> = [...tree].sort(
        (a: RepositoryItem, b: RepositoryItem) => {
            if (
                (a.type === "directory" || a.type === "directory-display") &&
                (b.type === "file" || b.type === "file-display")
            )
                return -1;
            if (
                (a.type === "file" || a.type === "file-display") &&
                (b.type === "directory" || b.type === "directory-display")
            )
                return 1;
            return a.name.localeCompare(b.name);
        },
    );

    const compareRepositoryItems = (repositoryItem: RepositoryItem) => {
        return (
            selectedItem !== undefined &&
            repositoryItem.type === selectedItem.type &&
            repositoryItem.name === selectedItem.name
        );
    };

    return (
        <div className="space-y-1">
            {sortedTree.map((item: RepositoryItem, index: number) => (
                <FileTreeItem
                    key={index + item.lastActivity.toLocaleString()}
                    item={item}
                    tree={tree}
                    setTreeAction={setTreeAction}
                    onItemClick={() => {
                        setSelectedItemAction(item);
                        if (onItemClick) {
                            onItemClick(item);
                        }
                    }}
                    isSelected={compareRepositoryItems(item)}
                    expandedItems={expandedItems}
                    setExpandedItemsAction={setExpandedItemsAction}
                />
            ))}
        </div>
    );
};
