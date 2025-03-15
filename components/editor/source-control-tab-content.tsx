import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { type ElementRef, useRef, useState } from "react";
import type { RepositoryItemChange } from "@/lib/types/repository";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { ItemChangeDisplay } from "@/components/editor/item-change-display";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import GithubIcon from "@/components/icons/github";

const data = {
    changes: [
        {
            itemId: "1",
            itemPath: "file1.txt",
            itemType: "file",
            changeType: "added",
        } satisfies RepositoryItemChange,
        {
            itemId: "2",
            itemPath: "file2.txt",
            itemType: "file",
            changeType: "modified",
        } satisfies RepositoryItemChange,
        {
            itemId: "3",
            itemPath: "file3.txt",
            itemType: "file",
            changeType: "deleted",
        } satisfies RepositoryItemChange,
        {
            itemId: "4",
            itemPath: "dir1",
            itemType: "directory",
            changeType: "moved",
            change: "new/dir/path"
        } satisfies RepositoryItemChange,
        {
            itemId: "5",
            itemPath: "dir2",
            itemType: "directory",
            changeType: "renamed",
            change: "dir2-new-name"
        } satisfies RepositoryItemChange,
    ] satisfies Array<RepositoryItemChange>,
};

export const SourceControlTabContent = () => {
    const changes: Array<RepositoryItemChange> = data.changes;

    const [changesSelected, setChangesSelected] = useState<Array<RepositoryItemChange>>([]);
    const allChangesSelected: boolean =
        changes.length > 0 && changesSelected.length === changes.length;

    const verticalGroupRef =
        useRef<ElementRef<typeof ResizablePanelGroup>>(null);
    const [commitPanelCollapsed, setCommitPanelCollapsed] = useState<boolean>(false);
    const [lastOpenedCommitPanelSize, setLastOpenedCommitPanelSize] = useState<number>(30);

    const toggleCommitPanelCollapse = () => {
        setCommitPanelCollapsed((prevCommitPanelCollapsed) => {
            if (verticalGroupRef.current) {
                if (prevCommitPanelCollapsed) {
                    verticalGroupRef.current.setLayout([
                        100 - lastOpenedCommitPanelSize,
                        lastOpenedCommitPanelSize,
                    ]);
                    return false;
                } else {
                    setLastOpenedCommitPanelSize(
                        verticalGroupRef.current.getLayout()[1],
                    );
                    verticalGroupRef.current.setLayout([100, 0]);
                    return true;
                }
            }
            return prevCommitPanelCollapsed;
        });
    };

    const handleSelectAllChanges = (checked: boolean) => {
        if (checked) {
            setChangesSelected([...changes]);
        } else {
            setChangesSelected([]);
        }
    };

    const [commitMessage, setCommitMessage] = useState<string>("");

    return (
        <ResizablePanelGroup
            direction="vertical"
            ref={verticalGroupRef}
            onLayout={(sizes) => {
                setCommitPanelCollapsed(sizes[1] === 0);
                if (sizes[1] > 0) {
                    setLastOpenedCommitPanelSize(sizes[1]);
                }
            }}
        >
            <ResizablePanel defaultSize={70} minSize={50}>
                <div className="p-4 text-nowrap">
                    <header className="pb-4 text-xl font-medium">Source control</header>
                    <div className="space-y-3">
                        <div
                            className="flex flex-row gap-x-2 items-center cursor-pointer hover:bg-accent p-1 px-2 rounded">
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
                                <span
                                    className="text-muted-foreground font-normal">{changes.length} total changes</span>
                            </Label>
                        </div>
                        <div className="flex flex-col gap-y-1">
                            {changes.map((itemChange: RepositoryItemChange, index: number) => (
                                <ItemChangeDisplay
                                    key={index}
                                    index={index}
                                    itemChange={itemChange}
                                    changesSelected={changesSelected}
                                    setChangesSelected={setChangesSelected}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </ResizablePanel>

            <ResizableHandle />

            <ResizablePanel defaultSize={30} minSize={5} collapsible collapsedSize={5}>
                <div className="p-4 space-y-3 flex flex-col flex-1">
                    <div className="flex flex-row items-center justify-between gap-x-3">
                        <Label htmlFor="commit-message">Commit changes</Label>
                        <button onClick={() => toggleCommitPanelCollapse()}>
                            {commitPanelCollapsed ? <Plus /> : <Minus />}
                        </button>
                    </div>
                    <div className="relative">
                        <FileText className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Textarea
                            placeholder="Commit message"
                            className="resize-none pl-9 pt-2"
                            value={commitMessage}
                            onChange={(e) => setCommitMessage(e.target.value)}
                        />
                    </div>

                    <Button variant="outline" className="w-full">
                        <GithubIcon />
                        Commit
                    </Button>
                </div>
            </ResizablePanel>
        </ResizablePanelGroup>
    );
};