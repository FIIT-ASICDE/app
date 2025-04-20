import { InvitationType } from "@/lib/types/invitation";
import { cn } from "@/lib/utils";
import { ReactElement } from "react";

import { getBadgeStyle } from "@/components/generic/generic";
import { Badge } from "@/components/ui/badge";

interface InvitationBadgeProps {
    invitationType: InvitationType;
}

/**
 * Badge component depicting an invitation type
 *
 * @param {InvitationBadgeProps} props - Component props
 * @returns {ReactElement} Badge component
 */
export const InvitationBadge = ({
    invitationType,
}: InvitationBadgeProps): ReactElement => {
    return (
        <Badge
            variant="default"
            className={cn(
                "flex h-8 w-24 items-center justify-center",
                getBadgeStyle(invitationType),
            )}
        >
            {invitationType === "repository" ? "Repository" : "Organisation"}
        </Badge>
    );
};
