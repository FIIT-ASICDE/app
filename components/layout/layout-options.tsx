import type { LayoutType, ResponsivenessCheckpoint } from "@/lib/types/generic";
import { cn } from "@/lib/utils";
import { LayoutGrid, Rows3 } from "lucide-react";
import { type Dispatch, type SetStateAction, useEffect, useState } from "react";

import { getWidthFromResponsivenessCheckpoint } from "@/components/generic/generic";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface LayoutOptionsProps {
    layout: LayoutType;
    setLayout: Dispatch<SetStateAction<LayoutType>>;
    responsivenessCheckpoint: ResponsivenessCheckpoint;
    className?: string;
}

export const LayoutOptions = ({
    layout,
    setLayout,
    responsivenessCheckpoint,
    className,
}: LayoutOptionsProps) => {
    const [isDisabled, setIsDisabled] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsDisabled(
                window.innerWidth <
                    getWidthFromResponsivenessCheckpoint(
                        responsivenessCheckpoint,
                    ),
            );
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, [responsivenessCheckpoint]);

    const handleLayoutChange = (newLayout: LayoutType) => {
        if (!isDisabled) {
            setLayout(newLayout);
        }
    };

    if (isDisabled) {
        return undefined;
    }

    return (
        <div className={cn("flex items-center space-x-1", className)}>
            <Tooltip>
                <TooltipTrigger
                    className={cn(
                        "rounded bg-transparent p-2",
                        isDisabled ? "opacity-50" : "hover:bg-accent",
                    )}
                    onClick={() => handleLayoutChange("grid")}
                    disabled={isDisabled}
                >
                    <LayoutGrid
                        className={
                            isDisabled
                                ? "text-muted-foreground"
                                : layout === "grid"
                                  ? "text-foreground"
                                  : "text-muted-foreground"
                        }
                    />
                </TooltipTrigger>
                <TooltipContent>
                    {isDisabled
                        ? "Grid layout is only available on larger screens"
                        : "Grid layout"}
                </TooltipContent>
            </Tooltip>
            <Tooltip>
                <TooltipTrigger
                    className="rounded bg-transparent p-2 hover:bg-accent"
                    onClick={() => handleLayoutChange("rows")}
                >
                    <Rows3
                        className={
                            layout === "rows"
                                ? "text-foreground"
                                : "text-muted-foreground"
                        }
                    />
                </TooltipTrigger>
                <TooltipContent>Row layout</TooltipContent>
            </Tooltip>
        </div>
    );
};
