import { RepositoryItem } from "@/lib/types/repository";
import { FileIcon, Folder } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface MoveItemDialogProps {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    sourceItem: RepositoryItem;
    targetItem: RepositoryItem;
    onConfirm: () => void;
    onCancel: () => void;
}

export const MoveItemDialog = ({
    isOpen,
    setIsOpen,
    sourceItem,
    targetItem,
    onConfirm,
    onCancel,
}: MoveItemDialogProps) => {
    const sourceItemName: string =
        sourceItem.name.split("/").pop() || sourceItem.name;
    const targetItemName: string =
        targetItem.name === ""
            ? "root directory"
            : targetItem.name.split("/").pop() || targetItem.name;

    const itemType =
        sourceItem.type === "directory" ||
        sourceItem.type === "directory-display"
            ? "directory"
            : "file";

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="w-4xl">
                <DialogHeader>
                    <DialogTitle>Move {itemType}</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to move
                    </DialogDescription>
                    <div className="space-y-5">
                        <div className="flex flex-row flex-wrap items-center gap-x-3 gap-y-2">
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <span className="flex max-w-48 flex-row items-center gap-x-2 truncate rounded border border-accent p-1.5">
                                        {itemType === "file" ? (
                                            <FileIcon className="max-h-4 min-h-4 min-w-4 max-w-4 text-muted-foreground" />
                                        ) : (
                                            <Folder
                                                className="max-h-4 min-h-4 min-w-4 max-w-4 text-muted-foreground"
                                                fill="currentColor"
                                            />
                                        )}
                                        {sourceItemName}
                                    </span>
                                </TooltipTrigger>
                                <TooltipContent>
                                    {sourceItemName}
                                </TooltipContent>
                            </Tooltip>
                            <DialogDescription> to </DialogDescription>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <span className="flex max-w-48 flex-row items-center gap-x-2 truncate rounded border border-accent p-1.5">
                                        <Folder
                                            className="max-h-4 min-h-4 min-w-4 max-w-4 text-muted-foreground"
                                            fill="currentColor"
                                        />
                                        {targetItemName}
                                    </span>
                                </TooltipTrigger>
                                <TooltipContent>
                                    {targetItemName}
                                </TooltipContent>
                            </Tooltip>
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={onCancel}>
                                Cancel
                            </Button>
                            <Button variant="default" onClick={onConfirm}>
                                Move
                            </Button>
                        </DialogFooter>
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};
