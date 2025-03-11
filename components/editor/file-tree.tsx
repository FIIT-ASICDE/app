"use client";

import type { RepositoryItem } from "@/lib/types/repository";
import { FileX } from "lucide-react";

import { FileTreeItem } from "@/components/editor/file-tree-item";
import { NoData } from "@/components/no-data/no-data";

interface FileTreeProps {
    tree: Array<RepositoryItem>;
    onItemClick?: (item: RepositoryItem) => void;
}

export const FileTree = ({ tree, onItemClick }: FileTreeProps) => {
    if (!tree || tree.length === 0) {
        return (
            <NoData icon={FileX} message={"No files or directories found"} />
        );
    }

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

    return (
        <div className="space-y-1">
            {sortedTree.map((item: RepositoryItem, index: number) => (
                <FileTreeItem
                    key={index + item.lastActivity.toLocaleString()}
                    item={item}
                    onItemClick={onItemClick}
                />
            ))}
        </div>
    );
};
