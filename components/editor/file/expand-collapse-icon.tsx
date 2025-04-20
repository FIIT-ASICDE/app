import { ChevronDown, ChevronRight } from "lucide-react";
import { ReactElement } from "react";

interface ExpandCollapseIconProps {
    expanded?: boolean;
    hasChildren?: boolean;
    handleToggle: () => void;
    className?: string;
}

/**
 * Icon that symbolises the expand & collapse actions
 *
 * @param {ExpandCollapseIconProps} props - Component props
 * @returns {ReactElement} Icon
 */
export const ExpandCollapseIcon = ({
    expanded,
    hasChildren,
    handleToggle,
    className,
}: ExpandCollapseIconProps): ReactElement => {
    if (!hasChildren) {
        return <span className="mr-2 max-h-4 min-h-4 min-w-4 max-w-4"></span>;
    }

    return (
        <span className={className}>
            {expanded && hasChildren ? (
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
