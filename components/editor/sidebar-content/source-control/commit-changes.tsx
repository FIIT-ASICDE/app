"use client";

import { commitSchema } from "@/lib/schemas/git-schemas";
import { RepositoryItemChange } from "@/lib/types/repository";
import { FileText, GitCommitHorizontal, Loader2 } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface CommitChangesProps {
    repositoryId: string;
    changes: Array<RepositoryItemChange>;
    changesSelected: Array<RepositoryItemChange>;
    setChangesSelectedAction: Dispatch<
        SetStateAction<Array<RepositoryItemChange>>
    >;
    onCommitAction?: (data: z.infer<typeof commitSchema>) => Promise<void>;
    isLoading?: boolean;
}

export const CommitChanges = ({
    repositoryId,
    changes,
    changesSelected,
    setChangesSelectedAction,
    onCommitAction,
    isLoading,
}: CommitChangesProps) => {
    const [commitMessage, setCommitMessage] = useState<string>("");

    const handleCommitChanges = () => {
        onCommitAction?.({
            message: commitMessage,
            files: changesSelected,
            repoId: repositoryId,
        }).then(() => {
            setChangesSelectedAction([]);
            setCommitMessage("");
        });
    };

    return (
        <div className="space-y-3">
            <div className="relative">
                <FileText className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Textarea
                    placeholder="Commit message"
                    className="resize-none pl-9 pt-2 text-sm"
                    value={commitMessage}
                    onChange={(e) => setCommitMessage(e.target.value)}
                />
            </div>

            {changesSelected.length === 0 || commitMessage === "" ? (
                <Tooltip>
                    <TooltipTrigger asChild>
                        <div className="cursor-not-allowed">
                            <Button
                                variant="outline"
                                className="w-full"
                                disabled
                            >
                                <GitCommitHorizontal />
                                Commit
                            </Button>
                        </div>
                    </TooltipTrigger>
                    <TooltipContent>
                        {changes.length === 0
                            ? "No changes yet"
                            : changesSelected.length === 0
                              ? "Select changes to commit first"
                              : "Commit message cannot be empty"}
                    </TooltipContent>
                </Tooltip>
            ) : (
                <Button
                    variant="outline"
                    className="w-full"
                    onClick={handleCommitChanges}
                >
                    {isLoading ? (
                        <Loader2 className="animate-spin" />
                    ) : (
                        <>
                            <GitCommitHorizontal />
                            Commit
                        </>
                    )}
                </Button>
            )}
        </div>
    );
};
