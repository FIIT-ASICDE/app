import { InvitationType } from "@/lib/types/invitation";
import { cn } from "@/lib/utils";

import { getBadgeStyle } from "@/components/generic/generic";
import { Badge } from "@/components/ui/badge";

interface InvitationBadgeProps {
    invitationType: InvitationType;
}

export const InvitationBadge = ({ invitationType }: InvitationBadgeProps) => {
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
