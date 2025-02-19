import { Eye, EyeOff } from "lucide-react";

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
    id: string;
    name: string;
    showMembers: boolean;
}

export const ToggleMembersVisibilityDialog = ({
    id,
    name,
    showMembers,
}: ToggleMembersVisibilityDialogProps) => {
    const getChangeMembersVisibilityMessage = () => {
        return (
            <span>
                This will result in{" "}
                <span className="font-bold">
                    {showMembers ? "hiding" : "showing"}
                </span>{" "}
                the members of your organisation {showMembers ? "from" : "to"}{" "}
                the public.
            </span>
        );
    };

    const handleMembersVisibilityChange = () => {
        /* TODO: change visibility */
        console.log(
            "Organisation " +
                name +
                " with ID: " +
                id +
                " toggled members visibility from " +
                showMembers +
                " to " +
                !showMembers,
        );
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant="default"
                    className="w-60 hover:bg-primary-button-hover"
                >
                    {showMembers ? <EyeOff /> : <Eye />}
                    Change members visibility
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
                            {showMembers ? (
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
