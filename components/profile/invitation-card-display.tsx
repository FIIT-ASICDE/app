"use client";

import { imgSrc } from "@/lib/client-file-utils";
import { api } from "@/lib/trpc/react";
import { CardType } from "@/lib/types/generic";
import { Invitation } from "@/lib/types/invitation";
import { cn } from "@/lib/utils";
import { Calendar, CircleCheck, CircleX } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { AvatarDisplay } from "@/components/avatar-display/avatar-display";
import { DynamicTitle } from "@/components/dynamic-title-link/dynamic-title";
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
    const router = useRouter();

    const invitationDisplayData = getInvitationDisplayData(invitation);

    const onAcceptedSuccessAction = () => {
        toast.success("Invitation successfully accepted", {
            description:
                invitation.type === "repository"
                    ? "You are now a collaborator on the " +
                      invitationDisplayData.displayName +
                      " repository"
                    : "You are now a member of the " +
                      invitationDisplayData.displayName +
                      " organisation",
        });
        router.refresh();
    };

    const onDeclinedSuccessAction = () => {
        toast.success("Invitation successfully declined");
        router.refresh();
    };

    const acceptOrgMutation = api.user.acceptOrgInvitation.useMutation({
        onSuccess: onAcceptedSuccessAction,
        onError: (error) => {
            toast.error(error.message);
            router.refresh();
        },
    });

    const declineOrgMutation = api.user.declineOrgInvitation.useMutation({
        onSuccess: onDeclinedSuccessAction,
        onError: (error) => {
            toast.error(error.message);
            router.refresh();
        },
    });

    const acceptRepoMutation = api.user.acceptRepoInvitation.useMutation({
        onSuccess: onAcceptedSuccessAction,
        onError: (error) => {
            toast.error(error.message);
            router.refresh();
        },
    });

    const declineRepoMutation = api.user.declineRepoInvitation.useMutation({
        onSuccess: onDeclinedSuccessAction,
        onError: (error) => {
            toast.error(error.message);
            router.refresh();
        },
    });

    return (
        <Card
            className={cn(
                "max-w-full pl-1.5 shadow-lg",
                getCardStripe((invitation.status + "Invitation") as CardType),
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
                    <DynamicTitle
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
                            if (invitation.type == "organisation") {
                                if (!invitation.organisation?.id) return;
                                declineOrgMutation.mutate({
                                    organizationId: invitation.organisation.id,
                                });
                            } else {
                                if (!invitation.repository?.id) return;
                                declineRepoMutation.mutate({
                                    repositoryId: invitation.repository.id,
                                });
                            }
                        }}
                        disabled={
                            declineOrgMutation.isPending ||
                            declineRepoMutation.isPending
                        }
                    >
                        {declineOrgMutation.isPending ||
                        declineRepoMutation.isPending ? (
                            "Declining..."
                        ) : (
                            <>
                                <CircleX />
                                Decline
                            </>
                        )}
                    </Button>
                    <Button
                        variant="default"
                        className="hover:bg-primary-button-hover"
                        onClick={() => {
                            if (invitation.type == "organisation") {
                                if (!invitation.organisation?.id) return;
                                acceptOrgMutation.mutate({
                                    organizationId: invitation.organisation.id,
                                });
                            } else {
                                if (!invitation.repository?.id) return;
                                acceptRepoMutation.mutate({
                                    repositoryId: invitation.repository.id,
                                });
                            }
                        }}
                        disabled={
                            acceptOrgMutation.isPending ||
                            acceptRepoMutation.isPending
                        }
                    >
                        {acceptOrgMutation.isPending ||
                        acceptRepoMutation.isPending ? (
                            "Accepting..."
                        ) : (
                            <>
                                <CircleCheck />
                                Accept
                            </>
                        )}
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
};
