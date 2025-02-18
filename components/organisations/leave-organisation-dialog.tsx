import { UserRoundMinus } from "lucide-react";
import { useState } from "react";

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

interface LeaveOrganisationDialogProps {
    id: string;
    name: string;
}

export const LeaveOrganisationDialog = ({
    id,
    name,
}: LeaveOrganisationDialogProps) => {
    const { user } = useUser();

    const [leaveOrganisationInput, setLeaveOrganisationInput] =
        useState<string>("");

    const leaveOrganisationPhrase: string = name;

    const handleLeaveOrganisation = () => {
        /* TODO: handle leave organisation */
        console.log(
            "User with ID: " +
                user.id +
                " left an organisation called: " +
                name +
                " with ID: " +
                id,
        );
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant="destructive"
                    className="w-60 hover:bg-destructive-hover"
                >
                    <UserRoundMinus />
                    Leave organisation
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="mb-5 text-center">
                        Leave this organisation
                    </DialogTitle>
                    <DialogDescription>
                        You are about to leave your organisation called
                        <span className="font-bold"> {name}</span>.
                    </DialogDescription>
                </DialogHeader>
                <span>
                    To confirm this action, type{" "}
                    <span className="no-select font-bold text-destructive">
                        {leaveOrganisationPhrase}
                    </span>
                </span>
                <Input
                    type="text"
                    value={leaveOrganisationInput}
                    onChange={(e) => setLeaveOrganisationInput(e.target.value)}
                />
                <DialogFooter className="justify-center">
                    <DialogTrigger asChild>
                        <Button
                            onClick={() => handleLeaveOrganisation()}
                            className="w-full hover:bg-destructive-hover"
                            variant="destructive"
                            disabled={
                                leaveOrganisationInput !==
                                leaveOrganisationPhrase
                            }
                        >
                            <UserRoundMinus />
                            Leave
                        </Button>
                    </DialogTrigger>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
