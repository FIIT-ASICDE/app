import { Repository } from "@/lib/types/repository";
import { Globe, Lock } from "lucide-react";

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

interface ChangeVisibilityDialogProps {
    repository: Repository;
}

export const ChangeVisibilityDialog = ({
    repository,
}: ChangeVisibilityDialogProps) => {
    const getRepositoryVisibilityChangeMessage = () => {
        if (repository.visibility === "public") {
            return (
                <p className="text-center">
                    If you change the visibility to
                    <span className="font-bold"> private </span>, only you will
                    be able to see this repository.
                </p>
            );
        } else {
            return (
                <p className="text-center">
                    If you change the visibility to
                    <span className="font-bold"> public </span>, anyone will be
                    able to see this repository.
                </p>
            );
        }
    };

    const handleChangeVisibility = () => {
        /* TODO: change visibility */
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant="default"
                    className="w-60 hover:bg-primary-button-hover"
                >
                    {repository.visibility !== "public" ? <Globe /> : <Lock />}
                    Change visibility to{" "}
                    {repository.visibility === "public" ? "private" : "public"}
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="mb-5 text-center">
                        Change visibility
                    </DialogTitle>
                    <DialogDescription className="text-center">
                        You are about to change the visibility of your
                        repository{" "}
                        <span className="font-bold">{repository.name}</span> to{" "}
                        {repository.visibility === "public"
                            ? "private"
                            : "public"}
                        .
                    </DialogDescription>
                </DialogHeader>
                {getRepositoryVisibilityChangeMessage()}
                <DialogFooter className="justify-center">
                    <DialogTrigger asChild>
                        <Button
                            onClick={() => handleChangeVisibility()}
                            className="w-full hover:bg-destructive-hover"
                            variant="destructive"
                        >
                            {repository.visibility === "public" ? (
                                <>
                                    <Lock />
                                    Change visibility to private
                                </>
                            ) : (
                                <>
                                    <Globe />
                                    Change visibility to public
                                </>
                            )}
                        </Button>
                    </DialogTrigger>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
