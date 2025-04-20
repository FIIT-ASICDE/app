import { cn } from "@/lib/utils";
import Link from "next/link";

import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { ReactElement } from "react";

interface DynamicTitleProps {
    title: string;
    link?: string;
    tooltipVisible?: boolean;
    className?: string;
}

/**
 * Component displaying the title of a user or an organisation that gets dynamically truncated
 *
 * @param {DynamicTitleProps} props - Component props
 * @returns {ReactElement} Title component
 */
export const DynamicTitle = ({
    title,
    link,
    tooltipVisible,
    className,
}: DynamicTitleProps): ReactElement => {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                {link ? (
                    <Link
                        href={link}
                        className="flex min-w-0 items-center truncate"
                    >
                        <div
                            className={cn(
                                "m-0 h-auto max-w-full truncate p-0 text-xl font-semibold leading-normal tracking-tight text-primary hover:text-primary-button-hover",
                                className,
                            )}
                        >
                            <span className="truncate">{title}</span>
                        </div>
                    </Link>
                ) : (
                    <div
                        className={cn(
                            "m-0 h-auto max-w-full truncate p-0 text-xl font-semibold leading-normal tracking-tight text-primary hover:text-primary-button-hover",
                            className,
                        )}
                    >
                        <span className="truncate">{title}</span>
                    </div>
                )}
            </TooltipTrigger>
            {tooltipVisible && <TooltipContent>{title}</TooltipContent>}
        </Tooltip>
    );
};
