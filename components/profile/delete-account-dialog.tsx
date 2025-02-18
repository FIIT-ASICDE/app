import { CircleX } from "lucide-react";
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

export const DeleteAccountDialog = () => {
    const { user } = useUser();

    const [deleteAccountInput, setDeleteAccountInput] = useState<string>("");
    const deleteConfirmationPhrase: string | null = user && user.username;

    const handleDeleteAccount = () => {
        /* TODO: handle repository deletion */
        if (user) {
            console.log("Delete account with ID: " + user.id);
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant="destructive"
                    className="w-60 hover:bg-destructive-hover"
                >
                    <CircleX />
                    Delete account
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="mb-5 text-center">
                        Delete your account
                    </DialogTitle>
                    <DialogDescription className="text-center">
                        You are about to delete your account.
                    </DialogDescription>
                </DialogHeader>
                <span className="text-center">
                    To confirm this action, type{" "}
                    <span className="no-select font-bold text-destructive">
                        {deleteConfirmationPhrase}
                    </span>
                    .
                </span>
                <Input
                    type="text"
                    value={deleteAccountInput}
                    onChange={(e) => setDeleteAccountInput(e.target.value)}
                />
                <DialogFooter className="justify-center">
                    <DialogTrigger asChild>
                        <Button
                            onClick={() => handleDeleteAccount()}
                            className="w-full hover:bg-destructive-hover"
                            variant="destructive"
                            disabled={
                                deleteAccountInput !== deleteConfirmationPhrase
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
