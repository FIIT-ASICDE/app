import { api } from "@/lib/trpc/react";
import { UserDisplay } from "@/lib/types/user";
import { CircleX } from "lucide-react";
import { useRouter } from "next/navigation";
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
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface BlockContributorDialogProps {
    contributor: UserDisplay;
    repositoryId: string;
}

export const BlockContributorDialog = ({
    contributor,
    repositoryId,
}: BlockContributorDialogProps) => {
    const [revokeContributionInput, setRevokeContributionInput] =
        useState<string>("");

    const deleteConfirmationPhrase: string = contributor.username;

    const router = useRouter();
    const revokeContributorMutation = api.repo.removeContributor.useMutation();

    const handleRevokeContribution = () => {
        revokeContributorMutation
            .mutateAsync({
                contributorId: contributor.id,
                repoId: repositoryId,
            })
            .then(router.refresh);
    };

    return (
        <Dialog>
            <Tooltip>
                <TooltipTrigger asChild>
                    <DialogTrigger asChild>
                        <button className="rounded p-1.5 align-middle hover:bg-accent">
                            <CircleX className="h-5 w-5 text-muted-foreground" />
                        </button>
                    </DialogTrigger>
                </TooltipTrigger>
                <TooltipContent className="text-muted-foreground">
                    Revoke{" "}
                    <span className="font-semibold text-foreground">
                        {contributor.username}
                    </span>
                    &#39;s contribution
                </TooltipContent>
            </Tooltip>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="mb-5 text-center">
                        Revoke contribution
                    </DialogTitle>
                    <DialogDescription className="text-center">
                        You are about to revoke
                        <span className="font-bold">
                            {" " + contributor.username + " "}
                        </span>
                        of their rights to collaborate on this repository.
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
                    value={revokeContributionInput}
                    onChange={(e) => setRevokeContributionInput(e.target.value)}
                />
                <DialogFooter className="justify-center">
                    <DialogTrigger asChild>
                        <Button
                            onClick={() => handleRevokeContribution()}
                            className="w-full hover:bg-destructive-hover"
                            variant="destructive"
                            disabled={
                                revokeContributionInput !==
                                deleteConfirmationPhrase
                            }
                        >
                            <CircleX />
                            Revoke
                        </Button>
                    </DialogTrigger>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
