import { api } from "@/lib/trpc/react";
import { RepositoryItem } from "@/lib/types/repository";
import { X } from "lucide-react";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { toast } from "sonner";

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
import { deleteItemFromTree } from "@/components/generic/generic";

interface DeleteItemDialogProps {
    repositoryId: string;
    repositoryItem: RepositoryItem;
    tree: Array<RepositoryItem>;
    setTree: Dispatch<SetStateAction<Array<RepositoryItem>>>;
    onAction?: () => void;
}

export const DeleteItemDialog = ({
    repositoryId,
    repositoryItem,
    tree,
    setTree,
    onAction,
}: DeleteItemDialogProps) => {
    const [open, setOpen] = useState<boolean>(false);

    const itemDisplayType: string =
        repositoryItem.type === "file" || repositoryItem.type === "file-display"
            ? "File"
            : "Directory";

    const deleteItemMutation = api.editor.deleteItem.useMutation({
        onSuccess: () => {
            toast.success(itemDisplayType + " deleted successfully");

            const updatedTree: Array<RepositoryItem> = deleteItemFromTree(
                tree,
                repositoryItem.absolutePath
            );
            setTree(updatedTree);

            onAction?.();
            setOpen(false);
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        deleteItemMutation.mutate({
            repoId: repositoryId,
            path: repositoryItem.absolutePath,
        });
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
                            {repositoryItem.name}
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
