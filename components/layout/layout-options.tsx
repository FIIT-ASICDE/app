"use client";

import type { LayoutType } from "@/lib/types/generic";
import { cn } from "@/lib/utils";
import { LayoutGrid, Rows3 } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface LayoutOptionsProps {
    layout: LayoutType;
    className?: string;
}

export const LayoutOptions = ({
    layout,
    className,
}: LayoutOptionsProps) => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    const handleLayoutChange = (newLayout: LayoutType) => {
        const params = new URLSearchParams(searchParams);
        if (newLayout === "rows") {
            params.set("rows", "true");
        } else {
            params.delete("rows");
        }
        router.replace(`${pathname}?${params.toString()}`);
    };

    return (
        <div className={cn("flex items-center space-x-1", className)}>
            <Tooltip>
                <TooltipTrigger
                    className={cn(
                        "rounded bg-transparent p-2 hover:bg-accent",
                    )}
                    onClick={() => handleLayoutChange("grid")}
                >
                    <LayoutGrid
                        className={
                            layout === "grid" ? "text-foreground" : "text-muted-foreground"
                        }
                    />
                </TooltipTrigger>
                <TooltipContent>
                    Grid layout
                </TooltipContent>
            </Tooltip>
            <Tooltip>
                <TooltipTrigger
                    className="rounded bg-transparent p-2 hover:bg-accent"
                    onClick={() => handleLayoutChange("rows")}
                >
                    <Rows3
                        className={
                            layout === "rows" ? "text-foreground" : "text-muted-foreground"
                        }
                    />
                </TooltipTrigger>
                <TooltipContent>Row layout</TooltipContent>
            </Tooltip>
        </div>
    );
};
