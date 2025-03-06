"use client";

import type { RepositoryItem } from "@/lib/types/repository";
import { ChevronDown, ChevronRight, FileIcon, Folder } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface FileTreeItemProps {
    item: RepositoryItem;
    depth?: number;
    onItemClick?: (item: RepositoryItem) => void;
}

export const FileTreeItem = ({
    item,
    depth = 0,
    onItemClick,
}: FileTreeItemProps) => {
    const [expanded, setExpanded] = useState(false);
    const isSelected = false;

    const handleToggle = () => {
        if (item.type === "directory" || item.type === "directory-display") {
            setExpanded(!expanded);
        }
        if (onItemClick) {
            onItemClick(item);
        }
    };

    return (
        <div>
            <div
                className={cn(
                    "flex items-center py-1 px-2 rounded-md cursor-pointer hover:bg-muted text-sm",
                    isSelected && "bg-muted font-medium",
                )}
                style={{ paddingLeft: `${depth * 12 + 8}px` }}
                onClick={handleToggle}
            >
                {item.type === "directory" || item.type === "directory-display" ? (
                    <>
                        <span className="mr-2">
                            {expanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                        </span>
                        <Folder className="h-4 w-4 mr-2" />
                    </>
                ) : (
                    <>
                        <span className="mr-2 w-4"></span>
                        <FileIcon className="h-4 w-4 mr-2" />
                    </>
                )}
                <span className="truncate">{item.name}</span>
            </div>

            {expanded && item.type === "directory" || item.type === "directory-display" && (
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
            )}
        </div>
    )
}

