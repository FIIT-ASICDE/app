import { SidebarContentTab } from "@/lib/types/editor";
import { cn } from "@/lib/utils";
import { ElementType, ReactElement } from "react";

import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface SidebarNavigationButtonProps {
    value: SidebarContentTab;
    icon: ElementType;
    tooltip: string;
    activeSidebarContent: string;
    sidebarOpen: boolean;
    onClick?: () => void;
}

/**
 * Navigation button component within the editor navigation that interacts with the sidebar
 *
 * @param {SidebarNavigationButtonProps} props - Component props
 * @returns {ReactElement} Button component
 */
export const SidebarNavigationButton = ({
    value,
    icon: Icon,
    tooltip,
    activeSidebarContent,
    sidebarOpen,
    onClick,
}: SidebarNavigationButtonProps): ReactElement => {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <button
                    className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-md p-0",
                        "text-header-foreground",
                        "hover:bg-header-button-hover hover:text-header-foreground",
                        value === activeSidebarContent && sidebarOpen
                            ? "bg-header-button-hover"
                            : "bg-header-button",
                    )}
                    onClick={onClick}
                >
                    <Icon className="h-5 w-5" />
                </button>
            </TooltipTrigger>
            <TooltipContent side="right">
                <p>{tooltip}</p>
            </TooltipContent>
        </Tooltip>
    );
};
