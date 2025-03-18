import { RepositoryItem } from "@/lib/types/repository";
import { X } from "lucide-react";
import { FormEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

interface DeleteItemDialogProps {
    repositoryItem: RepositoryItem;
}

export const DeleteItemDialog = ({ repositoryItem }: DeleteItemDialogProps) => {
    const [open, setOpen] = useState<boolean>(false);

    const itemName: string =
        repositoryItem.name.split("/").pop() ?? repositoryItem.name;

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        // TODO: handle delete item
        console.log("Delete item " + repositoryItem.name);
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="flex w-full cursor-default flex-row items-center justify-between rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent">
                Delete
                <X className="h-4 w-4 text-muted-foreground" />
            </DialogTrigger>
            <DialogContent className="max-w-sm">
                <DialogHeader>
                    <DialogTitle className="text-center">
                        Delete{" "}
                        <span className="text-muted-foreground">
                            {itemName}
                        </span>
                    </DialogTitle>
                    <DialogDescription className="text-center">
                        Are you sure? This action cannot be fully undone.
                    </DialogDescription>
                    {repositoryItem.type === "directory" ||
                        (repositoryItem.type === "directory-display" && (
                            <span>
                                Since this is a directory, all files in this
                                directory will be deleted as well.
                            </span>
                        ))}
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <DialogFooter>
                        <Button variant="outline">Cancel</Button>
                        <Button variant="destructive">
                            <X />
                            Delete
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};
