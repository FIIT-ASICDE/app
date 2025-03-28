import { RepositoryItemChange } from "@/lib/types/repository";
import { FileIcon } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

import { getChangeContent } from "@/components/generic/generic";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

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
