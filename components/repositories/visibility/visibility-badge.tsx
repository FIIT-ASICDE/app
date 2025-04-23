import type { RepositoryVisibility } from "@/lib/types/repository";
import { cn } from "@/lib/utils";
import { ReactElement } from "react";

import { getBadgeStyle } from "@/components/generic/generic";
import { Badge } from "@/components/ui/badge";

interface VisibilityBadgeProps {
    visibility: RepositoryVisibility;
}

/**
 * Component that displays a badge based on the visibility of a repository
 *
 * @param {VisibilityBadgeProps} props - Component props
 * @returns {ReactElement} Badge component
 */
export const VisibilityBadge = ({
    visibility,
}: VisibilityBadgeProps): ReactElement => {
    return (
        <Badge
            variant="default"
            className={cn(
                "flex h-8 w-16 items-center justify-center",
                getBadgeStyle(visibility as "public" | "private"),
            )}
        >
            {visibility === "public" ? "Public" : "Private"}
        </Badge>
    );
};
