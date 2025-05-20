"use client";

import { FileDisplayItem } from "@/lib/types/repository";
import { cn } from "@/lib/utils";
import { ChevronDown, MoreHorizontal, X } from "lucide-react";
import {
    Dispatch,
    ReactElement,
    SetStateAction,
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface EditorTabsProps {
    openFiles: Array<FileDisplayItem>;
    setOpenFilesAction: Dispatch<SetStateAction<Array<FileDisplayItem>>>;
    activeFile: FileDisplayItem | null;
    setActiveFileAction: Dispatch<SetStateAction<FileDisplayItem | null>>;
    handleTabSwitchAction: (tab: FileDisplayItem) => void;
    handleCloseTabAction: (tab: FileDisplayItem) => void;
    handleSplitEditor: (tab: FileDisplayItem) => void;
    handleCloseAllTabs: () => void;
    editorId: string;
    onTabDrop: (file: FileDisplayItem, sourceEditorId: string) => void;
}

/**
 * Editor tabs component for editor page
 *
 * @param {EditorTabsProps} props - Component props
 * @returns {ReactElement} Editor tabs component
 */
export const EditorTabs = ({
    openFiles,
    setOpenFilesAction,
    activeFile,
    handleTabSwitchAction,
    handleCloseTabAction,
    handleCloseAllTabs,
    editorId,
    onTabDrop,
}: EditorTabsProps): ReactElement => {
    const tabsContainerRef = useRef<HTMLDivElement>(null);
    const [visibleTabs, setVisibleTabs] = useState<FileDisplayItem[]>([]);
    const [hiddenTabs, setHiddenTabs] = useState<FileDisplayItem[]>([]);
    const [draggedTabIndex, setDraggedTabIndex] = useState<number | null>(null);
    const [isDraggingToRight, setIsDraggingToRight] = useState<boolean>(false);

    const calculateVisibleTabs = useCallback(() => {
        if (!tabsContainerRef.current) return;

        const containerWidth = tabsContainerRef.current.offsetWidth;
        const availableWidth =
            containerWidth - (hiddenTabs.length > 0 ? 64 : 0);
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
                    (file) => file.absolutePath === activeFile.absolutePath,
                );

                const halfVisible = Math.floor(maxVisibleTabs / 2);
                let startIndex = Math.max(0, activeIndex - halfVisible);

                if (startIndex + maxVisibleTabs > openFiles.length) {
                    startIndex = Math.max(0, openFiles.length - maxVisibleTabs);
                }

                newVisibleTabs = openFiles.slice(
                    startIndex,
                    startIndex + maxVisibleTabs,
                );
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
        const currentTabsContainerRef: HTMLDivElement | null =
            tabsContainerRef.current;

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

    return (
        <div className="flex flex-col">
            <div
                ref={tabsContainerRef}
                className="relative flex flex-row items-center justify-between"
                onDragOver={(e) => {
                    e.preventDefault();
                    e.currentTarget.classList.add("bg-accent/10");
                }}
                onDragLeave={(e) => {
                    e.currentTarget.classList.remove("bg-accent/10");
                }}
                onDrop={(e) => {
                    e.preventDefault();
                    e.currentTarget.classList.remove("bg-accent/10");
                    const sourceEditorId = e.dataTransfer.getData("editorId");
                    const fileData = e.dataTransfer.getData("file");
                    if (sourceEditorId && fileData) {
                        const file = JSON.parse(fileData);
                        if (file && sourceEditorId !== editorId) {
                            onTabDrop(file, sourceEditorId);
                        }
                    }
                }}
            >
                <div className="flex flex-row items-center justify-start">
                    {visibleTabs.map((file: FileDisplayItem, index: number) => {
                        const isActive: boolean =
                            activeFile?.absolutePath === file.absolutePath;

                        return (
                            <div
                                key={index + file.absolutePath}
                                draggable
                                onDragStart={(e) => {
                                    setDraggedTabIndex(index);
                                    e.dataTransfer.setData(
                                        "editorId",
                                        editorId,
                                    );
                                    e.dataTransfer.setData(
                                        "file",
                                        JSON.stringify(file),
                                    );
                                }}
                                onDragOver={(e) => {
                                    e.preventDefault();
                                    const rect =
                                        e.currentTarget.getBoundingClientRect();
                                    const mouseX = e.clientX;
                                    const isNearRightEdge =
                                        mouseX > rect.right - 20;
                                    setIsDraggingToRight(isNearRightEdge);
                                }}
                                onDragLeave={() => setIsDraggingToRight(false)}
                                onDrop={(e) => {
                                    e.preventDefault();
                                    if (draggedTabIndex === null) return;
                                    const newTabs = [...openFiles];
                                    const [moved] = newTabs.splice(
                                        draggedTabIndex,
                                        1,
                                    );
                                    newTabs.splice(index, 0, moved);
                                    setOpenFilesAction(newTabs);
                                    setDraggedTabIndex(null);
                                    setIsDraggingToRight(false);
                                }}
                                className={cn(
                                    "flex w-32 cursor-pointer items-center justify-between border-x border-accent px-2 py-2 text-sm",
                                    isActive
                                        ? "bg-background text-foreground dark:bg-[#1e1e1e]"
                                        : "text-muted-foreground hover:text-foreground",
                                    isDraggingToRight &&
                                        "border-r-2 border-r-primary",
                                )}
                                onClick={() => handleTabSwitchAction(file)}
                            >
                                <TooltipProvider delayDuration={500}>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <span className="truncate">
                                                {file.name}
                                            </span>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            {file.absolutePath}
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                                <button
                                    className="ml-2 flex-shrink-0 rounded p-0.5 text-muted-foreground hover:bg-accent"
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
                                <button className="flex h-8 w-8 items-center justify-center rounded text-muted-foreground hover:bg-accent hover:text-foreground">
                                    <ChevronDown className="h-4 w-4" />
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                {hiddenTabs.map((file, index) => {
                                    const isActive =
                                        activeFile?.absolutePath ===
                                        file.absolutePath;

                                    return (
                                        <DropdownMenuItem
                                            key={index + file.absolutePath}
                                            className={cn(
                                                "flex items-center justify-between",
                                                isActive && "bg-accent",
                                            )}
                                            onClick={() =>
                                                handleTabSwitchAction(file)
                                            }
                                        >
                                            <span className="max-w-64 truncate">
                                                {file.name}
                                            </span>
                                            <button
                                                className="ml-2 rounded p-0.5 hover:bg-accent"
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
                                <button className="flex h-8 w-8 items-center justify-center rounded text-muted-foreground hover:bg-accent hover:text-foreground">
                                    <MoreHorizontal className="h-4 w-4" />
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={handleCloseAllTabs}>
                                    Close all tabs
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}
                </div>
            </div>
            {activeFile && (
                <div className="flex h-8 w-full items-center truncate bg-background p-2 text-xs text-muted-foreground dark:bg-[#1e1e1e]">
                    {activeFile.absolutePath}
                </div>
            )}
        </div>
    );
};
