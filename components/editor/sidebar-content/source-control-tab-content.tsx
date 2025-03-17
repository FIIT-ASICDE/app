import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import type { RepositoryItemChange } from "@/lib/types/repository";
import { RepositoryItemChangeDisplay } from "@/components/editor/changes/repository-item-change-display";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import GithubIcon from "@/components/icons/github";
import { CloseButton } from "@/components/editor/navigation/close-button";

interface SourceControlTabContentProps {
    changes: Array<RepositoryItemChange>;
    handleCloseSidebar: () => void;
}

export const SourceControlTabContent = ({
    changes,
    handleCloseSidebar,
}: SourceControlTabContentProps) => {
    const [changesSelected, setChangesSelected] = useState<Array<RepositoryItemChange>>([]);
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
        // TODO: handle commit changes
        console.log("Commit " + changesSelected.length + " changes with message: " + commitMessage);

        setChangesSelected([]);
        setCommitMessage("");
    };

    return (
        <ScrollArea className="h-full w-full relative">
            <div className="p-4 text-nowrap">
                <header className="flex flex-row items-center justify-between pb-4">
                    <span className="text-xl font-medium">Source control</span>
                    <CloseButton onClick={handleCloseSidebar} />
                </header>
                <div className="space-y-3">
                    <div
                        className="flex flex-row gap-x-3 items-center cursor-pointer border border-transparent hover:border-accent p-1 px-2 rounded">
                        <Checkbox
                            id="all-changes"
                            checked={allChangesSelected}
                            onCheckedChange={handleSelectAllChanges}
                            className="checked:bg-primary"
                        />
                        <Label
                            htmlFor="all-changes"
                            className="flex flex-row gap-x-2 items-baseline justify-between text-sm cursor-pointer flex-1"
                        >
                            <span>All changes</span>
                            <Tooltip>
                                <TooltipTrigger asChild className="text-muted-foreground">
                                    <div className="min-w-4 text-center">{changes.length}</div>
                                </TooltipTrigger>
                                <TooltipContent side="right">
                                    {changes.length} total changes
                                </TooltipContent>
                            </Tooltip>
                        </Label>
                    </div>

                    <div className="flex flex-col gap-y-1">
                        {changes.map((itemChange: RepositoryItemChange, index: number) => (
                            <RepositoryItemChangeDisplay
                                key={index}
                                index={index}
                                itemChange={itemChange}
                                changesSelected={changesSelected}
                                setChangesSelected={setChangesSelected}
                            />
                        ))}
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
                                    <Button variant="outline" className="w-full" disabled>
                                        <GithubIcon />
                                        Commit
                                    </Button>
                                </div>
                            </TooltipTrigger>
                            <TooltipContent>
                                {changesSelected.length === 0 ?
                                    "Select changes to commit first" :
                                    "Commit message cannot be empty"
                                }
                            </TooltipContent>
                        </Tooltip>
                    ) : (
                        <Button variant="outline" className="w-full" onClick={handleCommitChanges}>
                            <GithubIcon />
                            Commit
                        </Button>
                    )}
                </div>
            </div>
        </ScrollArea>
    );
};