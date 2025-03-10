import { cn } from "@/lib/utils";

import { getBadgeStyle } from "@/components/generic/generic";
import { Badge } from "@/components/ui/badge";
import { OrganizationRole } from "@prisma/client";

interface RoleBadgeProps {
    role: OrganizationRole;
}

export const RoleBadge = ({ role }: RoleBadgeProps) => {
    return (
        <Badge
            variant="default"
            className={cn(
                "flex h-8 w-[4.5rem] items-center justify-center",
                getBadgeStyle(role === "ADMIN" ? "admin" : "member"),
            )}
        >
            {role === "ADMIN" ? "Admin" : "Member"}
        </Badge>
    );
};
