import { Card, CardContent } from "@/components/ui/card";
import { AvatarDisplay } from "@/components/avatar-display/avatar-display";
import { imgSrc } from "@/lib/client-file-utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Invitation } from "@/lib/types/invitation";
import { InvitationCardDialog } from "@/components/profile/invitation-card-dialog";
import { Badge } from "@/components/ui/badge";
import { getInvitationDisplayData, getTimeDeltaString } from "@/components/generic/generic";

interface InvitationCardDisplayProps {
    invitation: Invitation;
}

export const InvitationCardDisplay = (
    {
        invitation
    } : InvitationCardDisplayProps
) => {
    const invitationDisplayData = getInvitationDisplayData(invitation);

    return (
        <Card className="flex flex-row items-center justify-between p-4">
            <CardContent className="flex flex-col space-y-3 p-0">
                <div className="flex flex-row items-center gap-x-3">
                    <AvatarDisplay
                        displayType={"card"}
                        image={imgSrc(invitationDisplayData.image)}
                        name={invitation.organisation?.name || invitation.repository?.ownerName || ""}
                    />
                    <Link href={invitationDisplayData.link}>
                        <Button
                            variant="link"
                            className="m-0 max-w-full overflow-hidden truncate whitespace-nowrap p-0 text-base font-semibold leading-none tracking-tight"
                        >
                            {invitationDisplayData.displayName}
                        </Button>
                    </Link>
                </div>
                <div className="flex flex-row gap-x-3">
                    <Badge variant={invitation.type === "repository" ? "secondary" : "outline"} className="max-w-fit">{invitation.type[0].toUpperCase() + invitation.type.slice(1)}</Badge>
                    <span className="text-sm text-muted-foreground">{getTimeDeltaString(invitation.createdAt)}</span>
                </div>
            </CardContent>

            <InvitationCardDialog
                invitation={invitation}
            />
        </Card>
    );
};