import { imgSrc } from "@/lib/client-file-utils";
import { OrganisationMember } from "@/lib/types/organisation";

import { AvatarDisplay } from "@/components/avatar-display/avatar-display";
import { RoleIcon } from "@/components/organisations/role-icon";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { DynamicTitleLink } from "@/components/dynamic-title-link/dynamic-title-link";

interface MemberCardDisplayProps {
    member: OrganisationMember;
}

export const MemberCardDisplay = (
    {
        member
    }: MemberCardDisplayProps
) => {
    const memberLink: string = "/" + member.username;

    return (
        <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row items-center gap-x-3 min-w-0">
                <AvatarDisplay
                    displayType={"card"}
                    image={imgSrc(member.image)}
                    name={member.username}
                />
                <DynamicTitleLink
                    title={member.username}
                    link={memberLink}
                />
            </div>
            <Tooltip>
                <TooltipTrigger asChild>
                    <RoleIcon
                        role={member.role}
                        className="text-muted-foreground hover:opacity-70 flex-shrink-0"
                    />
                </TooltipTrigger>
                <TooltipContent>
                    {member.role === "admin" ? "Admin" : "Member"}
                </TooltipContent>
            </Tooltip>
        </div>
    );
};
