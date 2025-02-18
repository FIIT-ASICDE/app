import { imgSrc } from "@/lib/client-file-utils";
import { OrganisationRole } from "@/lib/types/organisation";

import { AvatarDisplay } from "@/components/avatar-display/avatar-display";
import { RoleIcon } from "@/components/organisations/role-icon";

interface MemberCardDisplayProps {
    username: string;
    image: string | undefined;
    role: OrganisationRole;
}

export const MemberCardDisplay = ({
    username,
    image,
    role,
}: MemberCardDisplayProps) => {
    return (
        <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row items-center gap-x-3">
                <AvatarDisplay
                    displayType={"card"}
                    image={imgSrc(image)}
                    name={username}
                />
                <span>{username}</span>
            </div>
            <RoleIcon role={role} className="text-muted-foreground" />
        </div>
    );
};
