"use client";

import type { RepositoryItem } from "@/lib/types/repository";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronRight, FileIcon, Folder } from "lucide-react";
import { useState } from "react";

import { RepositoryItemActions } from "@/components/editor/sidebar-content/repository-item-actions";

interface FileTreeItemProps {
    item: RepositoryItem;
    isSelected: boolean;
    depth?: number;
    onItemClick?: (item: RepositoryItem) => void;
}

export const FileTreeItem = ({
    item,
    isSelected,
    depth = 0,
    onItemClick,
}: FileTreeItemProps) => {
    const [expanded, setExpanded] = useState<boolean>(false);
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

    const handleToggle = () => {
        if (item.type === "directory" || item.type === "directory-display") {
            setExpanded(!expanded);
        }
        if (onItemClick) {
            onItemClick(item);
        }
    };

    return (
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div
                className={cn(
                    "flex cursor-default flex-row items-center justify-between rounded px-2 py-1 text-sm",
                    `pl-${depth * 12 + 8}px`,
                    isSelected && "bg-secondary font-medium",
                    "hover:bg-accent",
                )}
            >
                <div
                    className="flex flex-1 flex-row items-center rounded text-sm hover:bg-accent"
                    onClick={handleToggle}
                >
                    {item.type === "directory" ||
                    item.type === "directory-display" ? (
                        <>
                            <span className="mr-2">
                                {expanded ? (
                                    <ChevronDown className="max-h-4 min-h-4 min-w-4 max-w-4" />
                                ) : (
                                    <ChevronRight className="max-h-4 min-h-4 min-w-4 max-w-4" />
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
                        repositoryItem={item}
                        dropdownOpen={dropdownOpen}
                        setDropdownOpen={setDropdownOpen}
                    />
                )}
            </div>

            {(expanded && item.type === "directory") ||
                (item.type === "directory-display" && (
                    <div>
                        {/*item.children
                        .sort((a: RepositoryItem, b: RepositoryItem) => {
                            if ((a.type === "directory" || a.type === "directory-display") && (b.type === "file" || b.type === "file-display")) return -1;
                            if ((a.type === "file" || a.type === "file-display") && (b.type === "directory" || b.type === "directory-display")) return 1;
                            return a.name.localeCompare(b.name);
                        })
                        .map((child: RepositoryItem, index: number) => (
                            <FileTreeItem
                                key={index + item.lastActivity.toLocaleString()}
                                item={child}
                                depth={depth + 1}
                                onItemClick={onItemClick}
                                selectedPath={selectedPath}
                            />
                        ))*/}
                    </div>
                ))}
        </div>
    );
};
