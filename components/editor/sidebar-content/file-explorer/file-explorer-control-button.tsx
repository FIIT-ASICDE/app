import { cn } from "@/lib/utils";
import { ElementType } from "react";

import { DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface FileExplorerControlButtonProps {
    icon: ElementType;
    tooltipContent?: string;
    dialogTrigger?: boolean;
    dropdownMenuTrigger?: boolean;
    className?: string;
    iconClassName?: string;
    onClick?: () => void;
}

export const FileExplorerControlButton = ({
    icon: Icon,
    tooltipContent,
    dialogTrigger,
    dropdownMenuTrigger,
    className,
    iconClassName,
    onClick,
}: FileExplorerControlButtonProps) => {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                {dialogTrigger ? (
                    <DialogTrigger asChild>
                        <button
                            className={cn(
                                "rounded border border-transparent p-[4px] hover:border-accent",
                                className,
                            )}
                        >
                            <Icon
                                className={cn(
                                    "max-h-4 min-h-4 min-w-4 max-w-4 text-muted-foreground",
                                    iconClassName,
                                )}
                            />
                        </button>
                    </DialogTrigger>
                ) : dropdownMenuTrigger ? (
                    <DropdownMenuTrigger asChild>
                        <button
                            className={cn(
                                "rounded border border-transparent p-[4px] hover:border-accent",
                                className,
                            )}
                        >
                            <Icon
                                className={cn(
                                    "max-h-4 min-h-4 min-w-4 max-w-4 text-muted-foreground",
                                    iconClassName,
                                )}
                            />
                        </button>
                    </DropdownMenuTrigger>
                ) : (
                    <button
                        className={cn(
                            "rounded border border-transparent p-[4px] hover:border-accent",
                            className,
                        )}
                        onClick={onClick}
                    >
                        <Icon
                            className={cn(
                                "max-h-4 min-h-4 min-w-4 max-w-4 text-muted-foreground",
                                iconClassName,
                            )}
                        />
                    </button>
                )}
            </TooltipTrigger>
            {tooltipContent && (
                <TooltipContent>{tooltipContent}</TooltipContent>
            )}
        </Tooltip>
    );
};
