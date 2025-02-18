import { ReactNode } from "react";

import {
    DropdownMenu,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface TooltipDropdownProps {
    tooltip: string;
    dropdownTrigger: ReactNode;
    dropdownContent: ReactNode;
    tooltipSide?: "right" | "top" | "bottom" | "left";
}

export const TooltipDropdown = ({
    tooltip,
    dropdownTrigger,
    dropdownContent,
    tooltipSide,
}: TooltipDropdownProps) => {
    return (
        <Tooltip>
            <DropdownMenu>
                <TooltipTrigger asChild>
                    <DropdownMenuTrigger asChild>
                        {dropdownTrigger}
                    </DropdownMenuTrigger>
                </TooltipTrigger>
                {dropdownContent}
            </DropdownMenu>
            <TooltipContent side={tooltipSide || "top"}>
                <p>{tooltip}</p>
            </TooltipContent>
        </Tooltip>
    );
};
