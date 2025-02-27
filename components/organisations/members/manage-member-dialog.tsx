import { ManageMemberTab, OrganisationMember } from "@/lib/types/organisation";
import { CircleFadingArrowUp, CircleX, Pen } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface ManageMemberDialogProps {
    organisationId: string;
    organisationMember: OrganisationMember;
}

export const ManageMemberDialog = ({
    organisationId,
    organisationMember,
}: ManageMemberDialogProps) => {
    const [activeManageMemberTab, setActiveManageMemberTab] =
        useState<ManageMemberTab>("promote");

    /* TODO: connect handlePromote with be */
    const handlePromote = () => {
        console.log(
            "Promote member with ID: " +
                organisationMember.id +
                " to an admin in organisation with ID: " +
                organisationId,
        );
    };

    /* TODO: connect handleExpel with be */
    const handleExpel = () => {
        console.log(
            "Expel member with ID: " +
                organisationMember.id +
                " from organisation with ID: " +
                organisationId,
        );
    };

    return (
        <Dialog>
            <Tooltip>
                <TooltipTrigger asChild>
                    <DialogTrigger asChild>
                        <button className="rounded p-1.5 align-middle hover:bg-accent">
                            <Pen className="h-5 w-5 text-muted-foreground" />
                        </button>
                    </DialogTrigger>
                </TooltipTrigger>
                <TooltipContent className="text-muted-foreground">
                    Manage{" "}
                    <span className="font-semibold text-foreground">
                        {organisationMember.username}
                    </span>
                </TooltipContent>
            </Tooltip>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="mb-5 text-center">
                        Manage a member
                    </DialogTitle>
                    <DialogDescription>
                        Here you can either promote a member to an admin or
                        expel a member from your organisation.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex w-full flex-row gap-x-3">
                    <Button
                        variant={
                            activeManageMemberTab === "promote"
                                ? "secondary"
                                : "outline"
                        }
                        onClick={() => setActiveManageMemberTab("promote")}
                        className="flex w-1/2 flex-row items-center justify-center gap-x-2"
                    >
                        <CircleFadingArrowUp />
                        <span>Promote</span>
                    </Button>
                    <Button
                        variant={
                            activeManageMemberTab === "expel"
                                ? "destructive"
                                : "outline"
                        }
                        onClick={() => setActiveManageMemberTab("expel")}
                        className="flex w-1/2 flex-row items-center justify-center gap-x-2 border-destructive hover:bg-destructive-hover"
                    >
                        <CircleX />
                        <span>Expel</span>
                    </Button>
                </div>

                {activeManageMemberTab === "promote" && (
                    <>
                        <div className="mx-5 mb-1 text-center">
                            You are about to promote
                            <span className="font-bold">
                                {" "}
                                {organisationMember.username}{" "}
                            </span>
                            to an admin.
                        </div>
                        <DialogTrigger asChild>
                            <Button
                                onClick={() => handlePromote()}
                                className="w-full hover:bg-primary-button-hover"
                                variant="default"
                            >
                                <CircleFadingArrowUp />
                                Promote
                            </Button>
                        </DialogTrigger>
                    </>
                )}
                {activeManageMemberTab === "expel" && (
                    <>
                        <div className="mx-5 mb-1 text-center">
                            You are about to expel
                            <span className="font-bold">
                                {" "}
                                {organisationMember.username}{" "}
                            </span>
                            from your organisation.
                        </div>
                        <DialogTrigger asChild>
                            <Button
                                onClick={() => handleExpel()}
                                className="w-full hover:bg-destructive-hover"
                                variant="destructive"
                            >
                                <CircleX />
                                Expel
                            </Button>
                        </DialogTrigger>
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
};
