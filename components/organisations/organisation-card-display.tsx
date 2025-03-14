import { imgSrc } from "@/lib/client-file-utils";
import { OrganisationDisplay } from "@/lib/types/organisation";
import { cn } from "@/lib/utils";
import { UsersRound } from "lucide-react";

import { AvatarDisplay } from "@/components/generic/avatar-display";
import { DynamicTitle } from "@/components/generic/dynamic-title";
import { getCardStripe } from "@/components/generic/generic";
import { RoleBadge } from "@/components/organisations/members/role-badge";
import { Card, CardHeader } from "@/components/ui/card";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface OrganisationCardDisplayProps {
    organisation: OrganisationDisplay;
    className?: string;
}

export const OrganisationCardDisplay = ({
    organisation,
    className,
}: OrganisationCardDisplayProps) => {
    const organisationLink: string = "/orgs/" + organisation.name;

    return (
        <Card
            className={cn(
                "max-w-full p-0 pl-1.5 shadow-lg",
                getCardStripe("organisation"),
                className,
            )}
        >
            <CardHeader className="p-3 pr-6">
                <div className="flex flex-row justify-between gap-x-3">
                    <div className="flex min-w-0 flex-row items-center gap-x-3">
                        <AvatarDisplay
                            displayType={"card"}
                            image={imgSrc(organisation.image)}
                            name={organisation.name}
                        />
                        <DynamicTitle
                            title={organisation.name}
                            link={organisationLink}
                            tooltipVisible
                        />
                    </div>
                    <div className="flex flex-shrink-0 flex-row items-center justify-center gap-x-3">
                        {organisation.userRole && (
                            <RoleBadge role={organisation.userRole} />
                        )}
                        {organisation.memberCount && (
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <div className="flex flex-row items-center gap-x-1 text-muted-foreground">
                                        <UsersRound className="h-5 w-5" />
                                        {organisation.memberCount}
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent className="text-muted-foreground">
                                    There
                                    {organisation.memberCount > 1
                                        ? " are "
                                        : " is "}
                                    <span className="text-foreground">
                                        {organisation.memberCount}
                                    </span>{" "}
                                    member at{" "}
                                    <span className="text-foreground">
                                        {organisation.name}
                                    </span>
                                    .
                                </TooltipContent>
                            </Tooltip>
                        )}
                    </div>
                </div>
            </CardHeader>
        </Card>
    );
};
