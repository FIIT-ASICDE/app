import { Invitation } from "@/lib/types/invitation";

import { Button } from "@/components/ui/button";
import { CircleCheck, CircleX, Ellipsis } from "lucide-react";
import { AvatarDisplay } from "@/components/avatar-display/avatar-display";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { getInvitationDisplayData, getTimeDeltaString } from "@/components/generic/generic";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { imgSrc } from "@/lib/client-file-utils";


interface InvitationCardProps {
    invitation: Invitation
}

export const InvitationCardDialog = (
    {
        invitation
    } : InvitationCardProps
) => {
    const invitationDisplayData = getInvitationDisplayData(invitation);

    const getInvitationDescription = () => {
        return (
            <DialogDescription className="text-center">
                You have been invited to{" "}
                {invitation.type === "repository" ?
                    "collaborate on a repository." :
                    "join an organisation."
                }
            </DialogDescription>
        );
    };

    const getInvitationFooter = () => {
        switch (invitation.status) {
            case "pending":
                return (
                    <DialogFooter className="flex flex-row w-full gap-x-1">
                        <Button variant="outline" className="w-1/2">
                            <CircleX />
                            Reject
                        </Button>
                        <Button variant="default" className="w-1/2 hover:bg-primary-button-hover">
                            <CircleCheck />
                            Accept
                        </Button>
                    </DialogFooter>
                )
            case "accepted":
                return (
                    <div className="text-muted-foreground justify-center flex flex-row gap-x-3">
                        <CircleCheck className="text-green-900 dark:text-green-600" />
                        <div>This invitation has already been{" "}
                            <span className="font-bold text-green-900 dark:text-green-600">accepted</span>.
                        </div>
                    </div>
                );
            case "declined":
                return (
                    <div className="text-muted-foreground justify-center flex flex-row gap-x-3">
                        <CircleX className="text-destructive" />
                        <div>This invitation has already been{" "}
                            <span className="font-bold text-destructive">declined</span>.
                        </div>
                    </div>
                );
        }
    };

    return (
        <Dialog>
            <Tooltip>
                <TooltipTrigger asChild>
                    <DialogTrigger asChild>
                        <button className="p-1.5 hover:bg-accent rounded">
                            <Ellipsis />
                        </button>
                    </DialogTrigger>
                </TooltipTrigger>
                <TooltipContent>
                    Invitation details
                </TooltipContent>
            </Tooltip>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className={cn(
                        "flex items-center gap-3 justify-center",
                        invitation.type === "repository" ? "flex-row mb-3" : "flex-col"
                    )}>
                        <AvatarDisplay
                            displayType={invitation.type === "repository" ? "card" : "profile"}
                            name={invitation.organisation?.name || invitation.repository?.ownerName || ""}
                            image={imgSrc(invitationDisplayData.image)}
                        />
                        <Link href={invitationDisplayData.link}>
                            <Button
                                variant="link"
                                className="m-0 p-0 text-xl font-semibold leading-none tracking-tight"
                            >
                                {invitationDisplayData.displayName}
                            </Button>
                        </Link>
                        <span></span>
                    </DialogTitle>
                    {getInvitationDescription()}
                </DialogHeader>
                <div className="flex flex-row justify-between items-center my-3">
                    <div className="flex flex-row gap-x-3 items-center">
                        <span className="text-muted-foreground text-sm">From:</span>
                        <div className="flex flex-row gap-x-2 items-center">
                            <AvatarDisplay
                                displayType="select"
                                name={invitation.sender.username}
                                image={invitation.sender.image}
                            />
                            <span className="text-sm">{invitation.sender.username}</span>
                        </div>
                    </div>
                    <span className="text-sm text-muted-foreground">{getTimeDeltaString(invitation.createdAt)}</span>
                </div>
                {getInvitationFooter()}
            </DialogContent>
        </Dialog>
    );
};