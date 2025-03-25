import { api } from "@/lib/trpc/react";
import { Repository } from "@/lib/types/repository";
import { CircleX } from "lucide-react";
import { useRouter } from "next/navigation";
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

interface DeleteRepositoryDialogProps {
    repository: Repository;
}

export const DeleteRepositoryDialog = ({
    repository,
}: DeleteRepositoryDialogProps) => {
    const router = useRouter();
    const { user } = useUser();

    const [deleteRepositoryInput, setDeleteRepositoryInput] =
        useState<string>("");

    const deleteConfirmationPhrase: string =
        repository.ownerName + "/" + repository.name;

    const deleteRepoMutation = api.repo.delete.useMutation();

    const handleDeleteRepository = () => {
        deleteRepoMutation
            .mutateAsync({ repoId: repository.id })
            .then(() => router.replace("/" + user.username));
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant="destructive"
                    className="w-60 hover:bg-destructive-hover"
                >
                    <CircleX />
                    Delete repository
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="mb-5 text-center">
                        Delete this repository
                    </DialogTitle>
                    <DialogDescription className="text-center">
                        You are about to delete your
                        <span className="font-bold">
                            {" "}
                            {repository.visibility}{" "}
                        </span>
                        repository called
                        <span className="font-bold"> {repository.name}</span>.
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
                    value={deleteRepositoryInput}
                    onChange={(e) => setDeleteRepositoryInput(e.target.value)}
                />
                <DialogFooter className="justify-center">
                    <DialogTrigger asChild>
                        <Button
                            onClick={() => handleDeleteRepository()}
                            className="w-full hover:bg-destructive-hover"
                            variant="destructive"
                            disabled={
                                deleteRepositoryInput !==
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
