import { imgSrc } from "@/lib/client-file-utils";
import { OrganisationMember } from "@/lib/types/organisation";

import { AvatarDisplay } from "@/components/generic/avatar-display";
import { DynamicTitle } from "@/components/generic/dynamic-title";
import { RoleIcon } from "@/components/organisations/members/role-icon";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface MemberCardDisplayProps {
    member: OrganisationMember;
}

export const MemberCardDisplay = ({ member }: MemberCardDisplayProps) => {
    const memberLink: string = "/" + member.username;

    return (
        <div className="flex flex-row items-center justify-between">
            <div className="flex min-w-0 flex-row items-center gap-x-3">
                <AvatarDisplay
                    displayType={"card"}
                    image={imgSrc(member.image)}
                    name={member.username}
                />
                <DynamicTitle title={member.username} link={memberLink} />
            </div>
            <Tooltip>
                <TooltipTrigger asChild>
                    <RoleIcon
                        role={member.role}
                        className="flex-shrink-0 text-muted-foreground hover:opacity-70"
                    />
                </TooltipTrigger>
                <TooltipContent>
                    {member.role === "ADMIN" ? "Admin" : "Member"}
                </TooltipContent>
            </Tooltip>
        </div>
    );
};
