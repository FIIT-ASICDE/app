"use client";

import { OrganisationDisplay } from "@/lib/types/organisation";
import { CircleX } from "lucide-react";
import { useState } from "react";

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

export const DeleteOrganisationDialog = ({
    organisation,
}: DeleteOrganisationDialogProps) => {
    const [deleteOrganisationInput, setDeleteOrganisationInput] =
        useState<string>("");

    const deleteConfirmationPhrase: string = organisation.name;

    const handleDeleteOrganisation = () => {
        /* TODO: handle organisation deletion */
        console.log("Delete organisation with ID: " + organisation.id);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant="destructive"
                    className="w-60 hover:bg-destructive-hover"
                >
                    <CircleX />
                    Delete organisation
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
                        <Button
                            onClick={() => handleDeleteOrganisation()}
                            className="w-full hover:bg-destructive-hover"
                            variant="destructive"
                            disabled={
                                deleteOrganisationInput !==
                                deleteConfirmationPhrase
                            }
                        >
                            <CircleX />
                            Delete
                        </Button>
                    </DialogTrigger>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
