import { ChevronDown, ChevronRight } from "lucide-react";

interface ExpandCollapseIconProps {
    expanded?: boolean;
    hasChildren?: boolean;
    handleToggle: () => void;
    className?: string;
}

export const ExpandCollapseIcon = ({
    expanded,
    hasChildren,
    handleToggle,
    className,
}: ExpandCollapseIconProps) => {
    if (!hasChildren) {
        return <span className="max-h-4 min-h-4 min-w-4 max-w-4 mr-2"></span>;
    }

    return (
        <span className={className}>
            {(expanded && hasChildren) ? (
                <div onClick={handleToggle}>
                    <ChevronDown className="max-h-4 min-h-4 min-w-4 max-w-4 cursor-pointer" />
                </div>
            ) : (
                <div onClick={handleToggle}>
                    <ChevronRight className="max-h-4 min-h-4 min-w-4 max-w-4 cursor-pointer" />
                </div>
            )}
        </span>
    );
};