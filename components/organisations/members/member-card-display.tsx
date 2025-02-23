import { imgSrc } from "@/lib/client-file-utils";
import { OrganisationRole } from "@/lib/types/organisation";
import Link from "next/link";

import { AvatarDisplay } from "@/components/avatar-display/avatar-display";
import { RoleIcon } from "@/components/organisations/role-icon";
import { Button } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";

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
                <Link href={"/" + username}>
                    <Button
                        variant="link"
                        className="m-0 max-w-full overflow-hidden truncate whitespace-nowrap p-0 text-base font-semibold leading-none tracking-tight"
                    >
                        {username}
                    </Button>
                </Link>
            </div>
            <Tooltip>
                <TooltipTrigger asChild>
                    <RoleIcon
                        role={role}
                        className="text-muted-foreground hover:opacity-70"
                    />
                </TooltipTrigger>
                <TooltipContent>
                    {role[0].toUpperCase() + role.slice(1)}
                </TooltipContent>
            </Tooltip>
        </div>
    );
};
