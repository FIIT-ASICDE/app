import { cn } from "@/lib/utils";
import { Dispatch, ElementType, SetStateAction } from "react";

import { useSidebar } from "@/components/ui/sidebar";
import { TabsTrigger } from "@/components/ui/tabs";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface SidebarNavigationButtonProps {
    value: string;
    icon: ElementType;
    tooltip: string;
    activeSidebarContent: string;
    setActiveSidebarContent: Dispatch<SetStateAction<string>>;
}

export const SidebarNavigationButton = ({
    value,
    icon: Icon,
    tooltip,
    activeSidebarContent,
    setActiveSidebarContent,
}: SidebarNavigationButtonProps) => {
    const { open, setOpen } = useSidebar();

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <TabsTrigger
                    value={value}
                    className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-md p-0",
                        "text-header-foreground",
                        "hover:bg-header-button-hover hover:text-header-foreground",
                        value === activeSidebarContent && open
                            ? "bg-header-button-hover"
                            : "bg-header-button",
                    )}
                    onClick={() => {
                        if (value === activeSidebarContent) {
                            setOpen(!open);
                        } else {
                            setActiveSidebarContent(value);
                            setOpen(true);
                        }
                    }}
                >
                    <Icon className="h-5 w-5" />
                </TabsTrigger>
            </TooltipTrigger>
            <TooltipContent side="right">
                <p>{tooltip}</p>
            </TooltipContent>
        </Tooltip>
    );
};
