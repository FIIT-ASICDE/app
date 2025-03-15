import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RepositoryItemChange } from "@/lib/types/repository";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { ItemChangeIcon } from "@/components/editor/item-change-icon";
import { Dispatch, SetStateAction } from "react";

interface ItemChangeDisplayProps {
    index: number;
    itemChange: RepositoryItemChange;
    changesSelected: Array<RepositoryItemChange>;
    setChangesSelected: Dispatch<SetStateAction<Array<RepositoryItemChange>>>;
}

export const ItemChangeDisplay = ({
    index,
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
        if (["added", "modified", "deleted"].includes(itemChange.changeType)) {
            return <span>{itemChange.changeType[0].toUpperCase() + itemChange.changeType.slice(1)}</span>
        } else if (itemChange.changeType === "renamed") {
            const oldName: string | undefined = itemChange.itemPath.split("/").pop();
            return <span>Renamed from <span className="text-foreground">{oldName}</span> to <span className="text-foreground">{itemChange.change}</span></span>
        } else if (itemChange.changeType === "moved") {
            return <span>Moved from <span className="text-foreground">{itemChange.itemPath}</span> to <span className="text-foreground">{itemChange.change}</span></span>
        }
    };

    const getChangeContent = (itemChange: RepositoryItemChange) => {
        return (
            <Tooltip>
                <TooltipTrigger asChild className="text-muted-foreground">
                    <div>
                        <ItemChangeIcon itemChange={itemChange} />
                    </div>
                </TooltipTrigger>
                <TooltipContent side="right" className="text-muted-foreground">
                    {getChangeTooltipContent(itemChange)}
                </TooltipContent>
            </Tooltip>
        );
    };

    return (
        <div
            className="flex flex-row gap-x-2 items-center cursor-pointer hover:bg-accent p-1 px-2 rounded"
        >
            <Checkbox
                id={"change-" + index}
                checked={changesSelected.includes(itemChange)}
                onCheckedChange={(newChecked: boolean) => {
                    handleCheckboxChange(itemChange, newChecked);
                }}
                className="checked:bg-primary"
            />
            <Label
                htmlFor={"change-" + index}
                className="flex flex-row gap-x-2 items-baseline justify-between text-sm cursor-pointer flex-1 font-normal"
            >
                {itemChange.itemPath}
                {getChangeContent(itemChange)}
            </Label>
        </div>
    );
};