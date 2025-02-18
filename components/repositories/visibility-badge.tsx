import type { RepositoryVisibility } from "@/lib/types/repository";
import { cn } from "@/lib/utils";

import { getBadgeStyle } from "@/components/generic/generic";
import { Badge } from "@/components/ui/badge";

interface VisibilityBadgeProps {
    visibility: RepositoryVisibility;
}

export const VisibilityBadge = ({ visibility }: VisibilityBadgeProps) => {
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
