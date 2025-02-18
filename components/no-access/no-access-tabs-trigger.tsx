import { ElementType } from "react";

import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface NoAccessTabsTriggerProps {
    tabName: string;
    tabIcon: ElementType;
}

export const NoAccessTabsTrigger = ({
    tabName,
    tabIcon: Icon,
}: NoAccessTabsTriggerProps) => {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <div className="inline-block">
                    <button
                        className="flex flex-col items-center justify-center space-y-1 whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
                        disabled
                    >
                        <Icon />
                        <span>{tabName}</span>
                    </button>
                </div>
            </TooltipTrigger>
            <TooltipContent>
                <p>No access to {tabName}.</p>
            </TooltipContent>
        </Tooltip>
    );
};
