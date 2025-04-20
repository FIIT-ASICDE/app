import { cn } from "@/lib/utils";
import { Minus } from "lucide-react";

import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { ReactElement } from "react";

interface CloseButtonProps {
    onClick?: () => void;
    className?: string;
    tooltip?: string;
}

/**
 * Button component that closes the sidebar or the bottom panel on the editor page
 *
 * @param {CloseButtonProps} props - Component props
 * @returns {ReactElement} Button component
 */
export const CloseButton = ({
    onClick,
    className,
    tooltip,
}: CloseButtonProps): ReactElement => {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <button
                    className={cn(
                        "rounded border border-accent p-[4px] hover:bg-accent",
                        className,
                    )}
                    onClick={onClick}
                >
                    <Minus className="max-h-4 min-h-4 min-w-4 max-w-4" />
                </button>
            </TooltipTrigger>
            {tooltip && <TooltipContent>{tooltip}</TooltipContent>}
        </Tooltip>
    );
};
