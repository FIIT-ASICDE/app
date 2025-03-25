import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { Dispatch, SetStateAction } from "react";
import { RepositoryItem } from "@/lib/types/repository";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { FileIcon, Folder } from "lucide-react";

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
    const sourceItemName: string = sourceItem.name.split("/").pop() || sourceItem.name;
    const targetItemName: string = targetItem.name === "" ? "root directory" : targetItem.name.split("/").pop() || targetItem.name;

    const itemType = sourceItem.type === "directory" || sourceItem.type === "directory-display"
        ? "directory"
        : "file";

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="w-4xl">
                <DialogHeader>
                    <DialogTitle>
                        Move {itemType}
                    </DialogTitle>
                    <DialogDescription>
                        Are you sure you want to move
                    </DialogDescription>
                    <div className="space-y-5">
                        <div className="flex flex-row gap-x-3 items-center flex-wrap gap-y-2">
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <span className="border border-accent rounded p-1.5 max-w-48 truncate flex flex-row gap-x-2 items-center">
                                        {itemType === "file" ?
                                            <FileIcon className="min-w-4 max-w-4 min-h-4 max-h-4 text-muted-foreground" /> :
                                            <Folder className="min-w-4 max-w-4 min-h-4 max-h-4 text-muted-foreground" fill="currentColor" />
                                        }
                                        {sourceItemName}
                                    </span>
                                </TooltipTrigger>
                                <TooltipContent>
                                    {sourceItemName}
                                </TooltipContent>
                            </Tooltip>
                            <DialogDescription>{" "}to{" "}</DialogDescription>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <span className="border border-accent rounded p-1.5 max-w-48 truncate flex flex-row gap-x-2 items-center">
                                        <Folder className="min-w-4 max-w-4 min-h-4 max-h-4 text-muted-foreground" fill="currentColor" />
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