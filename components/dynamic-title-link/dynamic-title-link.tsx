import Link from "next/link";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface DynamicTitleLinkProps {
    title: string;
    link: string;
    tooltipVisible?: boolean;
    className?: string;
}

export const DynamicTitleLink = (
    {
        title,
        link,
        tooltipVisible,
        className
    } : DynamicTitleLinkProps
) => {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Link
                    href={link}
                    className="min-w-0 truncate flex items-center"
                >
                    <div className={cn(
                        "m-0 h-auto p-0 text-xl font-semibold leading-normal tracking-tight truncate max-w-full text-primary hover:text-primary-button-hover",
                        className
                    )}>
                        <span className="truncate">
                            {title}
                        </span>
                    </div>
                </Link>
            </TooltipTrigger>
            {tooltipVisible && (
                <TooltipContent>
                    {title}
                </TooltipContent>
            )}
        </Tooltip>
    );
};