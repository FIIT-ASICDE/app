import { cn } from "@/lib/utils";
import { ElementType, ReactElement } from "react";

interface NoDataProps {
    icon: ElementType;
    message: string;
    className?: string;
}

/**
 * Component that lets the user know there are no data fulfilling their requirements
 *
 * @param {NoDataProps} props - Component props
 * @returns {ReactElement} No data component
 */
export const NoData = ({
    icon: Icon,
    message,
    className
}: NoDataProps): ReactElement => {
    return (
        <div
            className={cn(
                "flex flex-col items-center gap-y-2 text-center text-muted-foreground",
                className,
            )}
        >
            <Icon className="h-12 w-12" />
            <span className="text-sm font-semibold">{message}</span>
        </div>
    );
};
