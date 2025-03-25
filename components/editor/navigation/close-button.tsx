import { cn } from "@/lib/utils";
import { Minus } from "lucide-react";

import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface CloseButtonProps {
    onClick?: () => void;
    className?: string;
    tooltip?: string;
}

export const CloseButton = ({
    onClick,
    className,
    tooltip,
}: CloseButtonProps) => {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <button
                    className={cn(
                        "rounded border border-transparent p-[4px] hover:border-accent",
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
