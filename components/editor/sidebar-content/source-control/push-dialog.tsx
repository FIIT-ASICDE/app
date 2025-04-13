"use client";

import { GitCommit } from "@/lib/types/repository";
import { MoveUpRight, X } from "lucide-react";
import { useState } from "react";

import { getTimeDeltaString } from "@/components/generic/generic";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface PushDialogProps {
    singleCommit?: boolean;
    commits: Array<GitCommit>;
    onPushAction: (commits: Array<GitCommit>) => void;
}

export const PushDialog = ({
    singleCommit,
    commits,
    onPushAction,
}: PushDialogProps) => {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            {singleCommit ? (
                <Tooltip>
                    <TooltipTrigger asChild>
                        <DialogTrigger asChild>
                            <button className="flex items-center justify-center rounded border border-primary p-2 hover:bg-primary-button-hover">
                                <MoveUpRight className="h-3.5 w-3.5" />
                            </button>
                        </DialogTrigger>
                    </TooltipTrigger>
                    <TooltipContent>
                        Push{" "}
                        <span className="font-mono text-sm text-muted-foreground">
                            {commits[0].hash.substring(0, 8)}
                        </span>
                    </TooltipContent>
                </Tooltip>
            ) : (
                <DialogTrigger asChild>
                    <button className="flex flex-row items-center justify-center gap-x-2 rounded bg-primary px-4 py-2 text-sm hover:bg-primary-button-hover">
                        <MoveUpRight className="h-3.5 w-3.5" />
                        Push all
                    </button>
                </DialogTrigger>
            )}
            <DialogContent className="max-w-2xl p-0">
                <ScrollArea className="h-full max-h-[90vh] max-w-2xl">
                    <div className="space-y-5 p-6">
                        <DialogHeader>
                            <DialogTitle>Push</DialogTitle>
                            <DialogDescription>
                                You are about to push the following commit
                                {commits.length !== 1 && "s"}:
                            </DialogDescription>
                        </DialogHeader>
                        <div className="overflow-x-auto">
                            <table className="min-w-full border-collapse">
                                <thead>
                                    <tr className="border border-accent">
                                        <th
                                            scope="col"
                                            className="whitespace-nowrap p-2 text-left text-sm font-medium text-muted-foreground"
                                        >
                                            Message
                                        </th>
                                        <th
                                            scope="col"
                                            className="whitespace-nowrap p-2 text-right text-sm font-medium text-muted-foreground"
                                        >
                                            Time
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {commits.map(
                                        (commit: GitCommit, index: number) => (
                                            <tr
                                                key={index + commit.hash}
                                                className="border border-accent"
                                            >
                                                <td className="max-w-lg truncate whitespace-nowrap p-2 text-sm">
                                                    {commit.message}
                                                </td>
                                                <td className="whitespace-nowrap p-2 text-right text-sm text-muted-foreground">
                                                    {getTimeDeltaString(
                                                        commit.authorDate,
                                                    )}
                                                </td>
                                            </tr>
                                        ),
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <DialogFooter className="flex flex-col items-stretch gap-2 sm:flex-row sm:justify-end">
                            <Button
                                variant="outline"
                                onClick={() => setOpen(false)}
                            >
                                <X />
                                Cancel
                            </Button>
                            <Button
                                variant="default"
                                className="hover:bg-primary-button-hover"
                                onClick={() => {
                                    onPushAction(commits);
                                    setOpen(false);
                                }}
                            >
                                <MoveUpRight />
                                Push
                            </Button>
                        </DialogFooter>
                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
};
