import { api } from "@/lib/trpc/react";
import { DirectoryItem, RepositoryItem } from "@/lib/types/repository";
import { Folder, FolderPlus } from "lucide-react";
import { Dispatch, FormEvent, ReactElement, SetStateAction, useState } from "react";
import { toast } from "sonner";

import { FileExplorerControlButton } from "@/components/editor/sidebar-content/file-explorer/file-explorer-control-button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { addItemToTree } from "@/components/generic/generic";

interface CreateDirectoryDialogProps {
    repositoryId: string;
    parentItem?: RepositoryItem;
    buttonSize: "icon" | "full";
    tree: Array<RepositoryItem>;
    setTree: Dispatch<SetStateAction<Array<RepositoryItem>>>;
    onAction?: () => void;
}

/**
 * Dialog that lets the user create a new directory within a repository
 *
 * @param {CreateDirectoryDialogProps} props - Component props
 * @returns {ReactElement} Dialog component
 */
export const CreateDirectoryDialog = ({
    repositoryId,
    parentItem,
    buttonSize,
    tree,
    setTree,
    onAction,
}: CreateDirectoryDialogProps): ReactElement => {
    const [open, setOpen] = useState<boolean>(false);
    const [directoryName, setDirectoryName] = useState<string>("");

    const addDirectoryMutation = api.editor.addItem.useMutation({
        onSuccess: (item) => {
            toast.success("Directory created successfully");

            const newDirectory: DirectoryItem = {
                type: "directory",
                name: item.name,
                lastActivity: item.lastActivity,
                absolutePath: item.absolutePath,
                children: [],
            };

            if (!parentItem) {
                setTree([...tree, newDirectory]);
            } else {
                const updatedTree = addItemToTree(
                    tree,
                    parentItem.absolutePath,
                    newDirectory
                );
                setTree(updatedTree);
            }

            onAction?.();
            setDirectoryName("");
            setOpen(false);
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (directoryName.trim()) {
            addDirectoryMutation.mutate({
                type: "directory",
                name: directoryName.trim(),
                repoId: repositoryId,
                path: parentItem?.absolutePath,
            });
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            {buttonSize === "icon" ? (
                <FileExplorerControlButton
                    icon={FolderPlus}
                    tooltipContent="Create directory"
                    dialogTrigger
                />
            ) : (
                <DialogTrigger className="flex w-full cursor-default flex-row items-center justify-between rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent">
                    Create directory
                    <FolderPlus className="h-4 w-4 text-muted-foreground" />
                </DialogTrigger>
            )}
            <DialogContent className="max-w-sm">
                <DialogHeader>
                    <DialogTitle className="text-center">
                        Create a new directory
                        {parentItem && (
                            <span>
                                {" "}
                                in{" "}
                                <span className="text-muted-foreground">
                                    {parentItem.name}
                                </span>
                            </span>
                        )}
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="relative">
                        <Folder
                            className="absolute left-3 top-3 h-4 w-4 text-muted-foreground"
                            fill="currentColor"
                        />
                        <Input
                            placeholder="Directory name"
                            className="pl-9"
                            value={directoryName}
                            onChange={(e) => setDirectoryName(e.target.value)}
                        />
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};
