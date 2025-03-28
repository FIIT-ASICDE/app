"use client";

import { api } from "@/lib/trpc/react";
import { ManageMemberTab, OrganisationMember } from "@/lib/types/organisation";
import { CircleFadingArrowUp, CircleX, Loader2, Pen } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

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
    const router = useRouter();
    const [activeManageMemberTab, setActiveManageMemberTab] =
        useState<ManageMemberTab>("promote");

    const promoteMutation = api.org.promoteToAdmin.useMutation({
        onSuccess: () => {
            toast.success("Promoted successfully", {
                description:
                    organisationMember.username +
                    " has been promoted to an admin.",
            });
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
    const handlePromote = () => {
        promoteMutation
            .mutateAsync({
                userId: organisationMember.id,
                orgId: organisationId,
            })
            .then(router.refresh);
    };

    const expelMutation = api.org.expelMember.useMutation({
        onSuccess: () => {
            toast.success("Expelled successfully", {
                description:
                    organisationMember.username +
                    " has been expelled from your organisation.",
            });
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    const handleExpel = () => {
        expelMutation
            .mutateAsync({
                userId: organisationMember.id,
                orgId: organisationId,
            })
            .then(router.refresh);
    };

    const showSubmitButtonContent = (type: "promote" | "expel") => {
        if (promoteMutation.isPending || expelMutation.isPending) {
            return (
                <>
                    <Loader2 className="animate-spin" />
                    {type === "promote" ? "Promoting..." : "Expelling..."}
                </>
            );
        }
        return (
            <>
                {type === "promote" ? <CircleFadingArrowUp /> : <CircleX />}
                {type === "promote" ? "Promote" : "Expel"}
            </>
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
                                disabled={
                                    promoteMutation.isPending ||
                                    expelMutation.isPending
                                }
                            >
                                {showSubmitButtonContent("promote")}
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
                                {showSubmitButtonContent("expel")}
                            </Button>
                        </DialogTrigger>
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
};
