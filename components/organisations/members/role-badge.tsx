import type { OrganisationRole } from "@/lib/types/organisation";
import { cn } from "@/lib/utils";

import { getBadgeStyle } from "@/components/generic/generic";
import { Badge } from "@/components/ui/badge";

interface RoleBadgeProps {
    role: OrganisationRole;
}

export const RoleBadge = ({ role }: RoleBadgeProps) => {
    return (
        <Badge
            variant="default"
            className={cn(
                "flex h-8 w-[4.5rem] items-center justify-center",
                getBadgeStyle(role as "admin" | "member"),
            )}
        >
            {role === "admin" ? "Admin" : "Member"}
        </Badge>
    );
};
