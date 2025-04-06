"use client";

import { X, MoreHorizontal, ChevronDown } from "lucide-react";
import { useRef, useState, useEffect, useCallback, Dispatch, SetStateAction } from "react";
import { FileDisplayItem } from "@/lib/types/repository";
import { cn } from "@/lib/utils";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface EditorTabsProps {
    openFiles: Array<FileDisplayItem>;
    setOpenFilesAction: Dispatch<SetStateAction<Array<FileDisplayItem>>>;
    activeFile: FileDisplayItem | null;
    setActiveFileAction: Dispatch<SetStateAction<FileDisplayItem | null>>;
    handleTabSwitchAction: (tab: FileDisplayItem) => void;
    handleCloseTabAction: (tab: FileDisplayItem) => void;
}

export const EditorTabs = ({
    openFiles,
    setOpenFilesAction,
    activeFile,
    setActiveFileAction,
    handleTabSwitchAction,
    handleCloseTabAction,
}: EditorTabsProps) => {
    const tabsContainerRef = useRef<HTMLDivElement>(null);
    const [visibleTabs, setVisibleTabs] = useState<FileDisplayItem[]>([]);
    const [hiddenTabs, setHiddenTabs] = useState<FileDisplayItem[]>([]);

    const calculateVisibleTabs = useCallback(() => {
        if (!tabsContainerRef.current) return;

        const containerWidth = tabsContainerRef.current.offsetWidth;
        const availableWidth = containerWidth - (hiddenTabs.length > 0 ? 64 : 0);
        const tabWidth = 128;

        const maxVisibleTabs = Math.floor(availableWidth / tabWidth);

        let newVisibleTabs: FileDisplayItem[];
        let newHiddenTabs: FileDisplayItem[];

        if (maxVisibleTabs >= openFiles.length) {
            newVisibleTabs = [...openFiles];
            newHiddenTabs = [];
        } else {
            if (activeFile) {
                const activeIndex = openFiles.findIndex(
                    (file) => file.absolutePath === activeFile.absolutePath
                );

                const halfVisible = Math.floor(maxVisibleTabs / 2);
                let startIndex = Math.max(0, activeIndex - halfVisible);

                if (startIndex + maxVisibleTabs > openFiles.length) {
                    startIndex = Math.max(0, openFiles.length - maxVisibleTabs);
                }

                newVisibleTabs = openFiles.slice(startIndex, startIndex + maxVisibleTabs);
                newHiddenTabs = [
                    ...openFiles.slice(0, startIndex),
                    ...openFiles.slice(startIndex + maxVisibleTabs),
                ];
            } else {
                newVisibleTabs = openFiles.slice(0, maxVisibleTabs);
                newHiddenTabs = openFiles.slice(maxVisibleTabs);
            }
        }

        setVisibleTabs(newVisibleTabs);
        setHiddenTabs(newHiddenTabs);
    }, [openFiles, activeFile, hiddenTabs.length]);

    useEffect(() => {
        const currentTabsContainerRef: HTMLDivElement | null = tabsContainerRef.current;

        if (!currentTabsContainerRef) return;

        calculateVisibleTabs();

        const resizeObserver = new ResizeObserver(() => {
            calculateVisibleTabs();
        });

        resizeObserver.observe(currentTabsContainerRef);

        window.addEventListener("resize", calculateVisibleTabs);

        return () => {
            if (currentTabsContainerRef) {
                resizeObserver.unobserve(currentTabsContainerRef);
            }
            resizeObserver.disconnect();
            window.removeEventListener("resize", calculateVisibleTabs);
        };
    }, [calculateVisibleTabs]);

    useEffect(() => {
        calculateVisibleTabs();
    }, [calculateVisibleTabs]);

    const handleCloseAllTabs = () => {
        setOpenFilesAction([]);
        setActiveFileAction(null);
    };

    return (
        <div className="flex flex-col">
            <div
                ref={tabsContainerRef}
                className="flex flex-row justify-between items-center relative"
            >
                <div className="flex flex-row justify-start items-center">
                    {visibleTabs.map((file: FileDisplayItem, index: number) => {
                        const isActive: boolean = activeFile?.absolutePath === file.absolutePath;

                        return (
                            <div
                                key={index + file.absolutePath}
                                className={cn(
                                    "border-x border-accent text-sm w-32 flex cursor-pointer items-center justify-center px-2 py-2",
                                    isActive
                                        ? "text-foreground bg-[#1e1e1e]"
                                        : "text-muted-foreground hover:text-foreground"
                                )}
                                onClick={() => handleTabSwitchAction(file)}
                            >
                                <TooltipProvider delayDuration={500}>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <span className="truncate">{file.name}</span>
                                        </TooltipTrigger>
                                        <TooltipContent>{file.absolutePath}</TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                                <button
                                    className="ml-2 flex-shrink-0 hover:bg-accent rounded p-0.5 text-muted-foreground"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleCloseTabAction(file);
                                    }}
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            </div>
                        );
                    })}
                </div>

                <div className="flex flex-row items-center">
                    {hiddenTabs.length > 0 && (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button className="rounded w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent">
                                    <ChevronDown className="h-4 w-4" />
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                {hiddenTabs.map((file, index) => {
                                    const isActive = activeFile?.absolutePath === file.absolutePath;

                                    return (
                                        <DropdownMenuItem
                                            key={index + file.absolutePath}
                                            className={cn(
                                                "flex items-center justify-between",
                                                isActive && "bg-accent"
                                            )}
                                            onClick={() => handleTabSwitchAction(file)}
                                        >
                                            <span className="truncate max-w-64">{file.name}</span>
                                            <button
                                                className="ml-2 hover:bg-accent rounded p-0.5"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleCloseTabAction(file);
                                                }}
                                            >
                                                <X className="h-3 w-3" />
                                            </button>
                                        </DropdownMenuItem>
                                    );
                                })}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}
                    {openFiles.length > 0 && (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button className="rounded w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent">
                                    <MoreHorizontal className="h-4 w-4" />
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                    onClick={handleCloseAllTabs}
                                >
                                    Close all tabs
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}
                </div>
            </div>
            {activeFile && (
                <div className="bg-[#1e1e1e] w-full truncate h-8 flex items-center text-xs text-muted-foreground p-2">
                    {activeFile.absolutePath}
                </div>
            )}
        </div>
    );
};
