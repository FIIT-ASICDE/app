import { imgSrc } from "@/lib/client-file-utils";
import { CardType } from "@/lib/types/generic";
import { Invitation } from "@/lib/types/invitation";
import { cn } from "@/lib/utils";
import { CircleCheck, CircleDot, CircleX, Clock } from "lucide-react";

import { AvatarDisplay } from "@/components/avatar-display/avatar-display";
import { DynamicTitle } from "@/components/dynamic-title-link/dynamic-title";
import {
    datePretty,
    getCardStripe,
    getTimeDeltaString,
} from "@/components/generic/generic";
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";

interface InvitationCardProps {
    invitation: Invitation;
    className?: string;
}

export const InvitationCard = ({
    invitation,
    className,
}: InvitationCardProps) => {
    const invitationSenderLink: string = "/" + invitation.sender.username;

    const getInvitationDescription = () => {
        switch (invitation.status) {
            case "pending":
                return (
                    <div className="flex flex-row items-center gap-x-3">
                        <CircleDot />
                        <p>This invitation is pending.</p>
                    </div>
                );
            case "accepted":
                return (
                    <div className="flex flex-row items-center gap-x-3">
                        <CircleCheck className="min-h-6 min-w-6" />
                        <p>
                            This invitation was
                            <span className="mx-1 text-green-900">
                                accepted
                            </span>
                            on {datePretty(invitation.resolvedAt)}
                        </p>
                    </div>
                );
            case "declined":
                return (
                    <div className="flex flex-row items-center gap-x-3">
                        <CircleX className="min-h-6 min-w-6" />
                        <p>
                            This invitation was
                            <span className="mx-1 text-destructive">
                                declined
                            </span>
                            {invitation.resolvedAt && (
                                <span>
                                    on {datePretty(invitation.resolvedAt)}
                                </span>
                            )}
                        </p>
                    </div>
                );
        }
    };

    return (
        <Card
            className={cn(
                "max-w-full pl-1.5 shadow-lg",
                getCardStripe((invitation.status + "Invitation") as CardType),
                className,
            )}
        >
            <CardHeader className="flex flex-row items-center justify-between p-3 pl-6 pr-9">
                <div className="flex min-w-0 flex-row items-center gap-x-3">
                    <span className="text-muted-foreground">To:</span>
                    <AvatarDisplay
                        displayType={"card"}
                        image={imgSrc(
                            invitation.receiver
                                ? invitation.receiver.image
                                : undefined,
                        )}
                        name={
                            invitation.receiver
                                ? invitation.receiver.username
                                : ""
                        }
                    />
                    <DynamicTitle
                        title={
                            invitation.receiver
                                ? invitation.receiver.username
                                : ""
                        }
                        link={invitationSenderLink}
                    />
                </div>
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
            </CardHeader>
            <CardFooter className="flex flex-row justify-between gap-x-5">
                <CardDescription>{getInvitationDescription()}</CardDescription>
                <div className="flex flex-shrink-0 flex-row items-center gap-x-3 pr-3">
                    <span className="flex flex-row gap-x-2 text-sm text-muted-foreground">
                        <Clock className="h-5 w-5" />
                        {getTimeDeltaString(invitation.createdAt)}
                    </span>
                </div>
            </CardFooter>
        </Card>
    );
};
