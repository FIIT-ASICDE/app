import { imgSrc } from "@/lib/client-file-utils";
import { OrganisationDisplay } from "@/lib/types/organisation";
import { UsersRound } from "lucide-react";

import { AvatarDisplay } from "@/components/avatar-display/avatar-display";
import { RoleBadge } from "@/components/organisations/members/role-badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { DynamicTitleLink } from "@/components/dynamic-title-link/dynamic-title-link";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface OrganisationCardProps {
    organisation: OrganisationDisplay;
    className?: string;
}

export const OrganisationCard = ({
    organisation,
    className,
}: OrganisationCardProps) => {
    const organisationLink: string = "/orgs/" + organisation.name;

    return (
        <Card className={cn("shadow-lg", className)}>
            <CardHeader>
                <div className="flex flex-row items-center justify-between">
                    <div className="flex flex-row items-center gap-x-3 min-w-0">
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
                    <div className="flex flex-row items-center gap-x-3 flex-shrink-0">
                        {organisation.userRole && <RoleBadge role={organisation.userRole} />}
                        {organisation.memberCount && (
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <div className="flex w-12 flex-row items-center gap-x-1 text-muted-foreground">
                                        <UsersRound className="h-5 w-5" />
                                        {organisation.memberCount}
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
            {organisation.bio && (
                <CardContent className="space-y-2">
                    <p>{organisation.bio}</p>
                </CardContent>
            )}
        </Card>
    );
};
