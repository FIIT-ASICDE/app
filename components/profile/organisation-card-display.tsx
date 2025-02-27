import { imgSrc } from "@/lib/client-file-utils";
import { OrganisationDisplay } from "@/lib/types/organisation";
import { UsersRound } from "lucide-react";

import { AvatarDisplay } from "@/components/avatar-display/avatar-display";
import { RoleBadge } from "@/components/organisations/members/role-badge";
import { Card, CardHeader } from "@/components/ui/card";
import { DynamicTitleLink } from "@/components/dynamic-title-link/dynamic-title-link";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { getCardStripe } from "@/components/generic/generic";

interface OrganisationCardDisplayProps {
    organisation: OrganisationDisplay;
    className?: string;
}

export const OrganisationCardDisplay = ({
    organisation,
    className,
}: OrganisationCardDisplayProps) => {
    const organisationLink: string = "/orgs" + organisation.name;

    return (
        <Card
            className={cn(
                "max-w-full shadow-lg p-0 pl-1.5",
                getCardStripe("organisation"),
                className
            )}
        >
            <CardHeader className="p-3">
                <div className="flex flex-row justify-between">
                    <div className="flex flex-row gap-x-3 items-center min-w-0">
                        <AvatarDisplay
                            displayType={"card"}
                            image={imgSrc(organisation.image)}
                            name={organisation.name}
                        />
                        <DynamicTitleLink
                            title={organisation.name}
                            link={organisationLink}
                            tooltipVisible
                        />
                    </div>
                    <div className="flex flex-row items-center justify-center gap-x-3 flex-shrink-0">
                        {organisation.userRole && <RoleBadge role={organisation.userRole} />}
                        {organisation.memberCount && (
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <div className="flex w-12 flex-row items-center gap-x-1 text-muted-foreground">
                                        <UsersRound className="h-5 w-5" />
                                        <div className="w-8">{organisation.memberCount}</div>
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent className="text-muted-foreground">
                                    There
                                    {organisation.memberCount > 1 ? " are " : " is "}
                                    <span className="text-foreground">{organisation.memberCount}</span>{" "}
                                    member at{" "}
                                    <span className="text-foreground">{organisation.name}</span>.
                                </TooltipContent>
                            </Tooltip>
                        )}
                    </div>
                </div>
            </CardHeader>
        </Card>
    );
};
