import { RoleOrganisationFilter } from "@/lib/types/organisation";
import { Shield, UserRound, X } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

import { Badge } from "@/components/ui/badge";

interface MemberFilterBadgesProps {
    roleFilter: RoleOrganisationFilter;
    setRoleFilter: Dispatch<SetStateAction<RoleOrganisationFilter>>;
}

export const MemberFilterBadges = ({
    roleFilter,
    setRoleFilter,
}: MemberFilterBadgesProps) => {
    return (
        <div className="flex h-8 flex-row justify-center gap-x-2">
            {roleFilter === "admin" ? (
                <Badge
                    variant="secondary"
                    className="h-10 cursor-pointer space-x-1"
                    onClick={() => setRoleFilter("all")}
                >
                    <Shield
                        fill="currentColor"
                        className="h-5 w-5 text-muted-foreground"
                    />
                    <X className="h-4 w-4 text-muted-foreground" />
                </Badge>
            ) : roleFilter === "member" ? (
                <Badge
                    variant="secondary"
                    className="h-10 cursor-pointer space-x-1"
                    onClick={() => setRoleFilter("all")}
                >
                    <UserRound className="h-5 w-5 text-muted-foreground" />
                    <X className="h-4 w-4 text-muted-foreground" />
                </Badge>
            ) : undefined}
        </div>
    );
};
