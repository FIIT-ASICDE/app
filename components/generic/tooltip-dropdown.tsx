import { ReactElement, ReactNode } from "react";

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

/**
 * Dropdown menu component with a button that has a tooltip
 *
 * @param {TooltipDropdownProps} props - Component props
 * @returns {ReactElement} Dropdown menu component
 */
export const TooltipDropdown = ({
    tooltip,
    dropdownTrigger,
    dropdownContent,
    tooltipSide,
}: TooltipDropdownProps): ReactElement => {
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
