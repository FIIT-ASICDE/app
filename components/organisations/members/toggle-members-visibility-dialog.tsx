"use client";

import { api } from "@/lib/trpc/react";
import { OrganisationDisplay } from "@/lib/types/organisation";
import { Eye, EyeOff, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

interface ToggleMembersVisibilityDialogProps {
    organisation: OrganisationDisplay;
    afterToggleAction?: () => void;
}

export const ToggleMembersVisibilityDialog = ({
    organisation,
    afterToggleAction,
}: ToggleMembersVisibilityDialogProps) => {
    const getChangeMembersVisibilityMessage = () => {
        return (
            <span>
                This will result in{" "}
                <span className="font-bold">
                    {organisation.showMembers ? "hiding" : "showing"}
                </span>{" "}
                the members of your organisation{" "}
                {organisation.showMembers ? "from" : "to"} the public.
            </span>
        );
    };

    const memberVisibilityMutation = api.org.setShowMembers.useMutation();
    const handleMembersVisibilityChange = () => {
        memberVisibilityMutation
            .mutateAsync({
                orgId: organisation.id,
                showMembers: !organisation.showMembers,
            })
            .then(afterToggleAction);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant="default"
                    className="w-60 hover:bg-primary-button-hover"
                >
                    {memberVisibilityMutation.isPending ? (
                        <Loader2 className="animate-spin" />
                    ) : (
                        <>
                            {organisation.showMembers ? (
                                <>
                                    <EyeOff />
                                    Hide members
                                </>
                            ) : (
                                <>
                                    <Eye />
                                    Show members
                                </>
                            )}
                        </>
                    )}
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="mb-5 text-center">
                        Change members visibility
                    </DialogTitle>
                    <DialogDescription className="text-center">
                        You are about to change the visibility of the members of
                        your organisation.
                    </DialogDescription>
                    {getChangeMembersVisibilityMessage()}
                </DialogHeader>
                <DialogFooter className="justify-center">
                    <DialogTrigger asChild>
                        <Button
                            onClick={() => handleMembersVisibilityChange()}
                            className="w-full hover:bg-primary-button-hover"
                            variant="default"
                        >
                            {organisation.showMembers ? (
                                <>
                                    <EyeOff />
                                    Hide members
                                </>
                            ) : (
                                <>
                                    <Eye />
                                    Show members
                                </>
                            )}
                        </Button>
                    </DialogTrigger>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
