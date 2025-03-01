"use client";
import { api } from "@/lib/trpc/react";
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
    setInvitations: (invitations: Invitation[]) => void;
}

export const InvitationCardDisplay = ({
    invitation,
    className,
    setInvitations
}: InvitationCardDisplayProps) => {
    const invitationDisplayData = getInvitationDisplayData(invitation);
    const acceptMutation = api.user.acceptInvitation.useMutation({
        onSuccess: (newInvitations) => setInvitations(newInvitations),
    });
    const declineMutation = api.user.declineInvitation.useMutation({
        onSuccess: (newInvitations) => setInvitations(newInvitations),
    });

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
                    <Button
                        variant="outline"
                        onClick={() => {
                            if (!invitation.organisation?.id) return;
                            declineMutation.mutate({
                                organizationId: invitation.organisation.id,
                            });
                        }}
                        disabled={declineMutation.isPending}
                    >
                        {declineMutation.isPending ? "Declining..." : <>
                        <CircleX />
                        Decline
                        </>}
                    </Button>
                    <Button
                        variant="default"
                        className="hover:bg-primary-button-hover"
                        onClick={() => {
                            if (!invitation.organisation?.id) return;
                            acceptMutation.mutate({
                                organizationId: invitation.organisation.id,
                            });
                        }}
                        disabled={acceptMutation.isPending}
                    >
                        {acceptMutation.isPending ? "Accepting..." : <>
                            <CircleCheck />
                            Accept
                        </>}
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
};
