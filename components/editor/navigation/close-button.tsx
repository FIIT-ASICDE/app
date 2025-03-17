import { Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface CloseButtonProps {
    onClick?: () => void;
    className?: string;
}

export const CloseButton = ({
    onClick,
    className,
}: CloseButtonProps) => {
    return (
        <button
            className={cn("border border-transparent hover:border-accent p-[4px] rounded", className)}
            onClick={onClick}
        >
            <Minus className="min-w-4 min-h-4 max-w-4 max-h-4" />
        </button>
    );
};