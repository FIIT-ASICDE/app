import { commitSchema } from "@/lib/schemas/git-schemas";
import type { RepositoryItemChange } from "@/lib/types/repository";
import { FileText, GitCommitHorizontal } from "lucide-react";
import { useState } from "react";
import { z } from "zod";

import { RepositoryItemChangeDisplay } from "@/components/editor/changes/repository-item-change-display";
import { CloseButton } from "@/components/editor/navigation/close-button";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface SourceControlTabContentProps {
    repoId: string;
    changes: Array<RepositoryItemChange>;
    handleCloseSidebar: () => void;
    onCommitAction?: (data: z.infer<typeof commitSchema>) => Promise<void>;
}

export const SourceControlTabContent = ({
    repoId,
    changes,
    handleCloseSidebar,
    onCommitAction,
}: SourceControlTabContentProps) => {
    const [changesSelected, setChangesSelected] = useState<
        Array<RepositoryItemChange>
    >([]);
    const allChangesSelected: boolean =
        changes.length > 0 && changesSelected.length === changes.length;

    const [commitMessage, setCommitMessage] = useState<string>("");

    const handleSelectAllChanges = (checked: boolean) => {
        if (checked) {
            setChangesSelected([...changes]);
        } else {
            setChangesSelected([]);
        }
    };

    const handleCommitChanges = () => {
        onCommitAction?.({
            message: commitMessage,
            files: changesSelected,
            repoId,
        }).then(() => {
            setChangesSelected([]);
            setCommitMessage("");
        });
    };

    return (
        <ScrollArea className="relative h-full w-full">
            <div className="text-nowrap p-4">
                <header className="flex flex-row items-center justify-between pb-4">
                    <span className="text-xl font-medium">Source control</span>
                    <CloseButton onClick={handleCloseSidebar} />
                </header>
                <div className="space-y-3">
                    <div className="flex cursor-pointer flex-row items-center gap-x-3 rounded border border-transparent p-1 px-2 hover:border-accent">
                        <Checkbox
                            id="all-changes"
                            checked={allChangesSelected}
                            onCheckedChange={handleSelectAllChanges}
                            className="checked:bg-primary"
                        />
                        <Label
                            htmlFor="all-changes"
                            className="flex flex-1 cursor-pointer flex-row items-baseline justify-between gap-x-2 text-sm"
                        >
                            <span>All changes</span>
                            <Tooltip>
                                <TooltipTrigger
                                    asChild
                                    className="text-muted-foreground"
                                >
                                    <div className="min-w-4 text-center">
                                        {changes.length}
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent side="right">
                                    {changes.length} total changes
                                </TooltipContent>
                            </Tooltip>
                        </Label>
                    </div>

                    <div className="flex flex-col gap-y-1">
                        {changes.map(
                            (
                                itemChange: RepositoryItemChange,
                                index: number,
                            ) => (
                                <RepositoryItemChangeDisplay
                                    key={index}
                                    itemChange={itemChange}
                                    changesSelected={changesSelected}
                                    setChangesSelected={setChangesSelected}
                                />
                            ),
                        )}
                    </div>

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
                                {changesSelected.length === 0
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
                            <GitCommitHorizontal />
                            Commit
                        </Button>
                    )}
                </div>
            </div>
        </ScrollArea>
    );
};
