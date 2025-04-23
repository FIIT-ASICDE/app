"use client";

import { api } from "@/lib/trpc/react";
import { OrganisationDisplay } from "@/lib/types/organisation";
import { CircleX, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { ReactElement, useState } from "react";
import { toast } from "sonner";

import { useUser } from "@/components/context/user-context";
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
import { Input } from "@/components/ui/input";

interface DeleteOrganisationDialogProps {
    organisation: OrganisationDisplay;
}

/**
 * Dialog component that lets the user delete an organisation
 *
 * @param {DeleteOrganisationDialogProps} props - Component props
 * @returns {ReactElement} Dialog component
 */
export const DeleteOrganisationDialog = ({
    organisation,
}: DeleteOrganisationDialogProps): ReactElement => {
    const router = useRouter();
    const { user } = useUser();
    const [deleteOrganisationInput, setDeleteOrganisationInput] =
        useState<string>("");

    const deleteConfirmationPhrase: string = organisation.name;

    const deleteOrgMutation = api.org.delete.useMutation({
        onSuccess: () => {
            toast.success("Organisation deleted successfully");
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    const handleDeleteOrganisation = () => {
        deleteOrgMutation
            .mutateAsync({ organizationId: organisation.id })
            .then(() => router.replace("/" + user.username));
    };

    const showSubmitButtonContent = () => {
        if (deleteOrgMutation.isPending) {
            return (
                <>
                    <Loader2 className="animate-spin" />
                    Deleting...
                </>
            );
        }
        if (deleteOrgMutation.isSuccess) {
            return (
                <>
                    <Loader2 className="animate-spin" />
                    Redirecting...
                </>
            );
        }
        return (
            <>
                <CircleX />
                Delete
            </>
        );
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant="destructive"
                    className="w-60 hover:bg-destructive-hover"
                    disabled={deleteOrgMutation.isPending}
                >
                    {deleteOrgMutation.isPending ? (
                        <Loader2 className="animate-spin" />
                    ) : (
                        <>
                            <CircleX />
                            Delete organisation
                        </>
                    )}
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="mb-5 text-center">
                        Delete this organisation
                    </DialogTitle>
                    <DialogDescription>
                        You are about to delete your organisation called
                        <span className="font-bold"> {organisation.name}</span>.
                    </DialogDescription>
                </DialogHeader>
                <span>
                    To confirm this action, type{" "}
                    <span className="no-select font-bold text-destructive">
                        {deleteConfirmationPhrase}
                    </span>
                </span>

                <Input
                    type="text"
                    value={deleteOrganisationInput}
                    onChange={(e) => setDeleteOrganisationInput(e.target.value)}
                />
                <DialogFooter className="justify-center">
                    <DialogTrigger asChild>
                        {deleteOrgMutation.error?.message ? (
                            <span className="text-destructive">
                                {deleteOrgMutation.error.message}
                            </span>
                        ) : (
                            <Button
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleDeleteOrganisation();
                                }}
                                className="w-full hover:bg-destructive-hover"
                                variant="destructive"
                                disabled={
                                    deleteOrganisationInput !==
                                        deleteConfirmationPhrase ||
                                    deleteOrgMutation.isPending ||
                                    deleteOrgMutation.isError
                                }
                            >
                                {showSubmitButtonContent()}
                            </Button>
                        )}
                    </DialogTrigger>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
