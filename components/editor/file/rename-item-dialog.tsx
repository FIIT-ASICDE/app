import { api } from "@/lib/trpc/react";
import { RepositoryItem } from "@/lib/types/repository";
import { FileIcon, Folder, Pen } from "lucide-react";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { toast } from "sonner";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface RenameItemDialogProps {
    repositoryId: string;
    repositoryItem: RepositoryItem;
    tree: Array<RepositoryItem>;
    setTree: Dispatch<SetStateAction<Array<RepositoryItem>>>;
    onAction?: () => void;
}

export const RenameItemDialog = ({
    repositoryId,
    repositoryItem,
    tree,
    setTree,
    onAction,
}: RenameItemDialogProps) => {
    const [open, setOpen] = useState<boolean>(false);
    const [newItemName, setNewItemName] = useState<string>("");

    const itemName: string =
        repositoryItem.name.split("/").pop() ?? repositoryItem.name;

    const itemDisplayType: string =
        repositoryItem.type === "file" || repositoryItem.type === "file-display"
            ? "File"
            : "Directory";

    const renameItemMutation = api.editor.renameItem.useMutation({
        onSuccess: () => {
            toast.success(itemDisplayType + " renamed successfully", {
                description: newItemName.trim(),
            });

            const trimmedNewItemName = newItemName.trim();

            const itemToRename: RepositoryItem | undefined = tree.find(
                (item) => item.name === repositoryItem.name,
            );

            if (itemToRename) {
                itemToRename.name = repositoryItem.name.replace(
                    /[^/]+$/,
                    trimmedNewItemName,
                );
                const filteredTree: Array<RepositoryItem> = tree.filter(
                    (item) => item.name !== repositoryItem.name,
                );
                setTree([...filteredTree, itemToRename]);
            }

            if (onAction) {
                onAction();
            }
            setNewItemName("");
            setOpen(false);
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const trimmedNewItemName: string = newItemName.trim();

        if (trimmedNewItemName) {
            renameItemMutation.mutate({
                repoId: repositoryId,
                originalPath: repositoryItem.name,
                newPath: repositoryItem.name.replace(
                    /[^/]+$/,
                    trimmedNewItemName,
                ),
            });
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
