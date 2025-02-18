import { RoleOrganisationFilter } from "@/lib/types/organisation";
import { MemberCountSort } from "@/lib/types/organisation";
import { ArrowDown01, ArrowUp10, Shield, UserRound, X } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

import { Badge } from "@/components/ui/badge";

interface OrganisationFilterBadgesProps {
    roleFilter: RoleOrganisationFilter;
    setRoleFilter: Dispatch<SetStateAction<RoleOrganisationFilter>>;
    memberCountSort: MemberCountSort;
    setMemberCountSort: Dispatch<SetStateAction<MemberCountSort>>;
}

export const OrganisationFilterBadges = ({
    roleFilter,
    setRoleFilter,
    memberCountSort,
    setMemberCountSort,
}: OrganisationFilterBadgesProps) => {
    return (
        <div className="flex h-8 flex-row justify-center gap-x-2">
            {roleFilter === "admin" ? (
                <Badge
                    variant="secondary"
                    className="h-10 cursor-pointer space-x-1"
                    onClick={() => setRoleFilter("all")}
                >
                    <Shield className="h-5 w-5 text-muted-foreground" />
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
            {memberCountSort === "asc" ? (
                <Badge
                    variant="secondary"
                    className="h-10 cursor-pointer space-x-1"
                    onClick={() => setMemberCountSort("none")}
                >
                    <ArrowDown01 className="h-5 w-5 text-muted-foreground" />
                    <X className="h-4 w-4 text-muted-foreground" />
                </Badge>
            ) : memberCountSort === "desc" ? (
                <Badge
                    variant="secondary"
                    className="h-10 cursor-pointer space-x-1"
                    onClick={() => setMemberCountSort("none")}
                >
                    <ArrowUp10 className="h-5 w-5 text-muted-foreground" />
                    <X className="h-4 w-4 text-muted-foreground" />
                </Badge>
            ) : undefined}
        </div>
    );
};
