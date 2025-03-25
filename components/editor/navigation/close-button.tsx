import { cn } from "@/lib/utils";
import { Minus } from "lucide-react";

interface CloseButtonProps {
    onClick?: () => void;
    className?: string;
}

export const CloseButton = ({ onClick, className }: CloseButtonProps) => {
    return (
        <button
            className={cn(
                "rounded border border-transparent p-[4px] hover:border-accent",
                className,
            )}
            onClick={onClick}
        >
            <Minus className="max-h-4 min-h-4 min-w-4 max-w-4" />
        </button>
    );
};
