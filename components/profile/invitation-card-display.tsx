"use client";

import { imgSrc } from "@/lib/client-file-utils";
import { Invitation } from "@/lib/types/invitation";
import { cn } from "@/lib/utils";
import { Calendar, CircleCheck, CircleX } from "lucide-react";

import { AvatarDisplay } from "@/components/avatar-display/avatar-display";
import { DynamicTitleLink } from "@/components/dynamic-title-link/dynamic-title-link";
import {
    getCardStripe,
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

    const handleDeclineInvitation = () => {
        console.log(
            "User declined an invitation from " +
                invitation.sender.username +
                "to join " +
                invitation.type +
                "called" +
                invitationDisplayData.displayName,
        );
    };

    const handleAcceptInvitation = () => {
        console.log(
            "User accepted an invitation from " +
                invitation.sender.username +
                "to join " +
                invitation.type +
                "called" +
                invitationDisplayData.displayName,
        );
    };

    return (
        <Card
            className={cn(
                "max-w-full pl-1.5 shadow-lg",
                getCardStripe("invitation"),
                className,
            )}
        >
            <CardHeader className="flex flex-row items-center justify-between p-3">
                <div className="flex min-w-0 flex-row items-center gap-x-3">
                    <AvatarDisplay
                        displayType={"card"}
                        image={imgSrc(invitationDisplayData.image)}
                        name={
                            invitation.organisation?.name ||
                            invitation.repository?.ownerName ||
                            ""
                        }
                    />
                    <DynamicTitleLink
                        title={invitationDisplayData.displayName}
                        link={invitationDisplayData.link}
                        tooltipVisible
                    />
                    <InvitationBadge invitationType={invitation.type} />
                </div>
                <div className="flex flex-shrink-0 flex-row items-center gap-x-3 pr-3">
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
                    <Button variant="outline" onClick={handleDeclineInvitation}>
                        <CircleX />
                        Decline
                    </Button>
                    <Button
                        variant="default"
                        className="hover:bg-primary-button-hover"
                        onClick={handleAcceptInvitation}
                    >
                        <CircleCheck />
                        Accept
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
};
