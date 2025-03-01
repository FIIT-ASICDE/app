import { cn } from "@/lib/utils";
import Link from "next/link";

import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface DynamicTitleLinkProps {
    title: string;
    link: string;
    tooltipVisible?: boolean;
    className?: string;
}

export const DynamicTitleLink = ({
    title,
    link,
    tooltipVisible,
    className,
}: DynamicTitleLinkProps) => {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
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
            </TooltipTrigger>
            {tooltipVisible && <TooltipContent>{title}</TooltipContent>}
        </Tooltip>
    );
};
