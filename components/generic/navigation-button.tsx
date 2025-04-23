import type { ButtonVariant } from "@/lib/types/generic";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ElementType, ReactElement } from "react";

import { Button } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface NavigationButtonProps {
    title: string;
    icon: ElementType;
    variant: ButtonVariant;
    link: string;
    access: "interactive" | "nonInteractive" | "none";
    className?: string;
}

/**
 * Button component that handles navigation
 *
 * @param {NavigationButtonProps} props - Component props
 * @returns {ReactElement} Button component
 */
export const NavigationButton = ({
    title,
    icon: Icon,
    variant,
    link,
    access,
    className,
}: NavigationButtonProps): ReactElement => {
    const displayTitle: string = title.charAt(0).toUpperCase() + title.slice(1);

    if (access === "none") return <></>;

    if (access === "nonInteractive") {
        return (
            <Tooltip>
                <TooltipTrigger asChild>
                    <div className="inline-block cursor-not-allowed">
                        <Button
                            variant={variant}
                            className="w-full lg:w-auto"
                            disabled
                        >
                            <Icon className="h-4 w-4 lg:mr-2" />
                            <span className="hidden lg:inline">
                                {displayTitle}
                            </span>
                        </Button>
                    </div>
                </TooltipTrigger>
                <TooltipContent>
                    <p>No access to {title}</p>
                </TooltipContent>
            </Tooltip>
        );
    }

    return (
        <Tooltip>
            <Link href={link}>
                <TooltipTrigger asChild>
                    <Button
                        variant={variant}
                        className={cn("w-full lg:w-auto", className)}
                    >
                        <Icon className="h-4 w-4 lg:mr-2" />
                        <span className="hidden lg:inline">{displayTitle}</span>
                    </Button>
                </TooltipTrigger>
            </Link>
            <TooltipContent className="lg:hidden">
                {displayTitle}
            </TooltipContent>
        </Tooltip>
    );
};
