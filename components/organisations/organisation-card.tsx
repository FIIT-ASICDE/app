import { imgSrc } from "@/lib/client-file-utils";
import { OrganisationDisplay } from "@/lib/types/organisation";
import { cn } from "@/lib/utils";
import { UsersRound } from "lucide-react";

import { AvatarDisplay } from "@/components/generic/avatar-display";
import { DynamicTitle } from "@/components/generic/dynamic-title";
import { getCardStripe } from "@/components/generic/generic";
import { RoleBadge } from "@/components/organisations/members/role-badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { ReactElement } from "react";

interface OrganisationCardProps {
    organisation: OrganisationDisplay;
    className?: string;
}

/**
 * Card component displaying information about an organisation
 *
 * @param {OrganisationCardProps} props - Component props
 * @returns {ReactElement} Card component
 */
export const OrganisationCard = ({
    organisation,
    className,
}: OrganisationCardProps): ReactElement => {
    const organisationLink: string = "/orgs/" + organisation.name;

    return (
        <Card
            className={cn(
                "max-w-full pl-1.5 shadow-lg",
                getCardStripe("organisation"),
                className,
            )}
        >
            <CardHeader>
                <div className="flex flex-row items-center justify-between">
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
                    <div className="flex flex-shrink-0 flex-row items-center gap-x-3">
                        {organisation.userRole && (
                            <RoleBadge role={organisation.userRole} />
                        )}
                        {organisation.memberCount && (
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <div className="flex w-12 flex-row items-center gap-x-1 text-muted-foreground">
                                        <UsersRound className="h-5 w-5" />
                                        <div className="w-8">
                                            {organisation.memberCount}
                                        </div>
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
            {organisation.bio && (
                <CardContent className="space-y-2">
                    <p>{organisation.bio}</p>
                </CardContent>
            )}
        </Card>
    );
};
