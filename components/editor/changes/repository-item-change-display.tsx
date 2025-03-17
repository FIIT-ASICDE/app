import { RepositoryItemChange } from "@/lib/types/repository";
import { FileIcon } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

import { RepositoryItemChangeIcon } from "@/components/editor/changes/repository-item-change-icon";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface ItemChangeDisplayProps {
    itemChange: RepositoryItemChange;
    changesSelected: Array<RepositoryItemChange>;
    setChangesSelected: Dispatch<SetStateAction<Array<RepositoryItemChange>>>;
}

export const RepositoryItemChangeDisplay = ({
    itemChange,
    changesSelected,
    setChangesSelected,
}: ItemChangeDisplayProps) => {
    const handleCheckboxChange = (
        itemChange: RepositoryItemChange,
        newChecked: boolean,
    ) => {
        if (newChecked) {
            setChangesSelected([...changesSelected, itemChange]);
        } else {
            setChangesSelected(
                changesSelected.filter((change) => change !== itemChange),
            );
        }
    };

    const getChangeTooltipContent = (itemChange: RepositoryItemChange) => {
        if (["added", "modified", "deleted"].includes(itemChange.change.type)) {
            return (
                <span>
                    {itemChange.change.type[0].toUpperCase() +
                        itemChange.change.type.slice(1)}
                </span>
            );
        } else if (itemChange.change.type === "renamed") {
            const oldName: string | undefined = itemChange.change.oldName
                .split("/")
                .pop();
            return (
                <span>
                    Renamed from{" "}
                    <span className="text-foreground">{oldName}</span> to{" "}
                    <span className="text-foreground">
                        {itemChange.itemPath}
                    </span>
                </span>
            );
        } else if (itemChange.change.type === "moved") {
            return (
                <span>
                    Moved from{" "}
                    <span className="text-foreground">
                        {itemChange.change.oldPath}
                    </span>{" "}
                    to{" "}
                    <span className="text-foreground">
                        {itemChange.itemPath}
                    </span>
                </span>
            );
        }
    };

    const getChangeContent = (itemChange: RepositoryItemChange) => {
        return (
            <Tooltip>
                <TooltipTrigger asChild className="text-muted-foreground">
                    <div className="w-4">
                        <RepositoryItemChangeIcon itemChange={itemChange} />
                    </div>
                </TooltipTrigger>
                <TooltipContent side="right" className="text-muted-foreground">
                    {getChangeTooltipContent(itemChange)}
                </TooltipContent>
            </Tooltip>
        );
    };

    const handleOpenDiff = () => {
        // TODO: diff editor
        console.log("Show Diff editor of item: " + itemChange.itemPath);
    };

    return (
        <div
            className="flex cursor-pointer flex-row items-center gap-x-3 rounded border border-transparent p-1 px-2 hover:border-accent"
            role="button"
            onDoubleClick={handleOpenDiff}
        >
            <Checkbox
                checked={changesSelected.includes(itemChange)}
                onCheckedChange={(newChecked: boolean) => {
                    handleCheckboxChange(itemChange, newChecked);
                }}
                className="checked:bg-primary"
            />
            <Label className="flex flex-1 cursor-pointer flex-row items-center justify-between gap-x-2 text-sm font-normal">
                <div className="flex flex-row items-center gap-x-2">
                    <FileIcon className="h-4 w-4" />
                    {itemChange.itemPath.split("/").pop()}
                </div>
                {getChangeContent(itemChange)}
            </Label>
        </div>
    );
};
