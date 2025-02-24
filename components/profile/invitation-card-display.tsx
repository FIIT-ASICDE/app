import { imgSrc } from "@/lib/client-file-utils";
import { Invitation } from "@/lib/types/invitation";
import { Calendar, CircleCheck, CircleX } from "lucide-react";
import Link from "next/link";

import { AvatarDisplay } from "@/components/avatar-display/avatar-display";
import {
    getInvitationDisplayData,
    getTimeDeltaString,
} from "@/components/generic/generic";
import { InvitationBadge } from "@/components/profile/invitation-badge";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";

interface InvitationCardDisplayProps {
    invitation: Invitation;
    className?: string;
}

export const InvitationCardDisplay = ({
    invitation,
    className,
}: InvitationCardDisplayProps) => {
    const invitationDisplayData = getInvitationDisplayData(invitation);

    return (
        <Card className={className}>
            <CardHeader className="flex flex-row items-center justify-between p-3">
                <div className="flex flex-row items-center gap-x-3">
                    <AvatarDisplay
                        displayType={"card"}
                        image={imgSrc(invitationDisplayData.image)}
                        name={
                            invitation.organisation?.name ||
                            invitation.repository?.ownerName ||
                            ""
                        }
                    />
                    <Link href={invitationDisplayData.link}>
                        <Button
                            variant="link"
                            className="m-0 max-w-full overflow-hidden truncate whitespace-nowrap p-0 text-xl font-semibold leading-none tracking-tight"
                        >
                            {invitationDisplayData.displayName}
                        </Button>
                    </Link>
                    <InvitationBadge invitationType={invitation.type} />
                </div>
                <div className="flex flex-row items-center gap-x-3 pr-3">
                    <span className="flex flex-row gap-x-2 text-sm text-muted-foreground">
                        <Calendar className="h-5 w-5" />
                        {getTimeDeltaString(invitation.createdAt)}
                    </span>
                </div>
            </CardHeader>
            <CardFooter className="flex flex-row justify-between">
                <div className="flex flex-row items-center gap-x-3">
                    <span className="text-sm text-muted-foreground">From:</span>
                    <div className="flex flex-row items-center gap-x-2">
                        <AvatarDisplay
                            displayType="select"
                            name={invitation.sender.username}
                            image={imgSrc(invitation.sender.image)}
                        />
                        <span className="text-sm">
                            {invitation.sender.username}
                        </span>
                    </div>
                </div>
                <div className="flex flex-row gap-x-3">
                    <Button variant="outline">
                        <CircleX />
                        Decline
                    </Button>
                    <Button
                        variant="default"
                        className="hover:bg-primary-button-hover"
                    >
                        <CircleCheck />
                        Accept
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
};
