"use client";

import { commitSchema } from "@/lib/schemas/git-schemas";
import type { RepositoryItemChange } from "@/lib/types/repository";
import { useState } from "react";
import { z } from "zod";

import { RepositoryItemChangeDisplay } from "@/components/editor/changes/repository-item-change-display";
import { CloseButton } from "@/components/editor/navigation/close-button";
import { CommitChanges } from "@/components/editor/sidebar-content/source-control/commit-changes";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { CommitHistoryDialog } from "@/components/editor/sidebar-content/source-control/commit-history-dialog";

interface SourceControlTabContentProps {
    repositoryId: string;
    changes: Array<RepositoryItemChange>;
    handleCloseSidebarAction: () => void;
    onCommitAction?: (data: z.infer<typeof commitSchema>) => Promise<void>;
    isLoading?: boolean;
}

export const SourceControlTabContent = ({
    repositoryId,
    changes,
    handleCloseSidebarAction,
    onCommitAction,
    isLoading,
}: SourceControlTabContentProps) => {
    const [changesSelected, setChangesSelected] = useState<
        Array<RepositoryItemChange>
    >([]);
    const allChangesSelected: boolean =
        changes.length > 0 && changesSelected.length === changes.length;

    const handleSelectAllChanges = (checked: boolean) => {
        if (checked) {
            setChangesSelected([...changes]);
        } else {
            setChangesSelected([]);
        }
    };

    return (
        <div className="flex flex-col h-full w-full relative">
            <header className="flex flex-col gap-y-3 p-4 w-full">
                <div className="flex flex-row items-center justify-between gap-x-3">
                    <span className="font-medium text-lg pr-8">Source Control</span>
                    <CloseButton
                        onClick={handleCloseSidebarAction}
                        tooltip="Close sidebar"
                        className="absolute top-4 right-4"
                    />
                </div>
            </header>

            <Separator />

            <ScrollArea className="relative h-full w-full">
                <div className="text-nowrap p-4">
                    <div className="space-y-3">
                        <div className="space-y-1">
                            {changes.length > 0 ? (
                                <>
                                    <div
                                        className="flex cursor-pointer flex-row items-center gap-x-3 rounded border border-transparent p-1 px-2 hover:border-accent">
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
                                                <TooltipContent
                                                    side="right"
                                                    className="font-normal"
                                                >
                                                    {changes.length} total change
                                                    {changes.length !== 1 && "s"}
                                                </TooltipContent>
                                            </Tooltip>
                                        </Label>
                                    </div>
                                    <Separator className="border-accent" />
                                </>
                            ) : (
                                <Label className="text-sm text-muted-foreground">
                                    No changes yet
                                </Label>
                            )}

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
                        </div>

                        <CommitChanges
                            repositoryId={repositoryId}
                            changes={changes}
                            changesSelected={changesSelected}
                            setChangesSelectedAction={setChangesSelected}
                            onCommitAction={onCommitAction}
                            isLoading={isLoading}
                        />

                        <CommitHistoryDialog repositoryId={repositoryId} />
                    </div>
                </div>
            </ScrollArea>
        </div>
    );
};
