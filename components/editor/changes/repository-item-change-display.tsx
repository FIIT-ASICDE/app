import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RepositoryItemChange } from "@/lib/types/repository";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { RepositoryItemChangeIcon } from "@/components/editor/changes/repository-item-change-icon";
import { Dispatch, SetStateAction } from "react";
import { FileIcon } from "lucide-react";

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
            return <span>{itemChange.change.type[0].toUpperCase() + itemChange.change.type.slice(1)}</span>
        } else if (itemChange.change.type === "renamed") {
            const oldName: string | undefined = itemChange.change.oldName.split("/").pop();
            return <span>Renamed from <span className="text-foreground">{oldName}</span> to <span className="text-foreground">{itemChange.itemPath}</span></span>
        } else if (itemChange.change.type === "moved") {
            return <span>Moved from <span className="text-foreground">{itemChange.change.oldPath}</span> to <span className="text-foreground">{itemChange.itemPath}</span></span>
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
            className="flex flex-row gap-x-3 items-center cursor-pointer border border-transparent hover:border-accent p-1 px-2 rounded"
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
            <Label
                className="flex flex-row gap-x-2 items-center justify-between text-sm cursor-pointer flex-1 font-normal"
            >
                <div className="flex flex-row gap-x-2 items-center">
                    <FileIcon className="w-4 h-4" />
                    {itemChange.itemPath.split("/").pop()}
                </div>
                {getChangeContent(itemChange)}
            </Label>
        </div>
    );
};