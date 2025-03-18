import { RepositoryItem } from "@/lib/types/repository";
import { FileIcon, Folder, Pen } from "lucide-react";
import { FormEvent, useState } from "react";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface RenameItemDialogProps {
    repositoryItem: RepositoryItem;
}

export const RenameItemDialog = ({ repositoryItem }: RenameItemDialogProps) => {
    const [open, setOpen] = useState<boolean>(false);
    const [newItemName, setNewItemName] = useState<string>("");

    const itemName: string =
        repositoryItem.name.split("/").pop() ?? repositoryItem.name;

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (newItemName.trim()) {
            // TODO: handle rename item
            console.log(
                "Rename item " +
                    repositoryItem.name +
                    " to " +
                    newItemName.trim(),
            );
            setNewItemName("");
            setOpen(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="flex w-full cursor-default flex-row items-center justify-between rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent">
                Rename
                <Pen className="h-4 w-4 text-muted-foreground" />
            </DialogTrigger>
            <DialogContent className="max-w-sm">
                <DialogHeader>
                    <DialogTitle className="text-center">
                        Rename{" "}
                        <span className="text-muted-foreground">
                            {itemName}
                        </span>
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="relative">
                        {repositoryItem.type === "directory" ||
                        repositoryItem.type === "directory-display" ? (
                            <Folder
                                className="absolute left-3 top-3 h-4 w-4 text-muted-foreground"
                                fill="currentColor"
                            />
                        ) : (
                            <FileIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        )}
                        <Input
                            placeholder="New name"
                            className="pl-9"
                            value={newItemName}
                            onChange={(e) => setNewItemName(e.target.value)}
                        />
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};
