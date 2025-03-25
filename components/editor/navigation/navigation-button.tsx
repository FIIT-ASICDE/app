import { cn } from "@/lib/utils";
import { ElementType } from "react";

import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface NavigationButtonProps {
    icon: ElementType;
    tooltip: string;
    tooltipSide?: "right" | "top" | "bottom" | "left";
    onClick?: () => void;
}

export const NavigationButton = ({
    icon: Icon,
    tooltip,
    tooltipSide,
    onClick,
}: NavigationButtonProps) => {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <button
                    className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-md p-0",
                        "text-header-foreground",
                        "hover:bg-header-button-hover hover:text-header-foreground",
                    )}
                    onClick={onClick}
                >
                    <Icon className="h-5 w-5" />
                </button>
            </TooltipTrigger>
            <TooltipContent side={tooltipSide || "right"}>
                {tooltip === "Simulation" ? (
                    <></>
                ) : tooltip}
            </TooltipContent>
        </Tooltip>
    );
};
