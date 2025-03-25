import { DirectoryDisplayItem, RepositoryItem } from "@/lib/types/repository";
import { Folder, FolderPlus } from "lucide-react";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";

import { FileExplorerControlButton } from "@/components/editor/sidebar-content/file-explorer-control-button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { api } from "@/lib/trpc/react";
import { toast } from "sonner";

interface CreateDirectoryDialogProps {
    repositoryId: string;
    repositoryItem?: RepositoryItem;
    buttonSize: "icon" | "full";
    tree: Array<RepositoryItem>;
    setTree: Dispatch<SetStateAction<Array<RepositoryItem>>>;
    onAction?: () => void;
}

export const CreateDirectoryDialog = ({
    repositoryId,
    repositoryItem,
    buttonSize,
    tree,
    setTree,
    onAction,
}: CreateDirectoryDialogProps) => {
    const [open, setOpen] = useState<boolean>(false);
    const [directoryName, setDirectoryName] = useState<string>("");

    const addDirectoryMutation = api.editor.addItem.useMutation({
        onSuccess: () => {
            toast.success("Directory created successfully");

            const trimmedDirectoryName: string = directoryName.trim();

            const newDirectory: DirectoryDisplayItem = {
                type: "directory-display",
                name: repositoryItem ? repositoryItem.name + "/" + trimmedDirectoryName : trimmedDirectoryName,
                lastActivity: new Date(),
            } satisfies DirectoryDisplayItem;

            if (repositoryItem === undefined) {
                setTree([
                    ...tree,
                    newDirectory,
                ]);
                console.log("Create directory in root: " + newDirectory.name);
            } else {
                console.log("Create directory on path: " + newDirectory.name);
            }

            if (onAction) {
                onAction();
            }
            setDirectoryName("");
            setOpen(false);
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (directoryName.trim()) {
            addDirectoryMutation.mutate({
                type: "directory",
                name: directoryName.trim(),
                repoId: repositoryId,
                path: repositoryItem?.name,
            })
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
                        {repositoryItem && (
                            <span>
                                {" "}
                                in{" "}
                                <span className="text-muted-foreground">
                                    {repositoryItem.name.split("/").pop() ??
                                        repositoryItem.name}
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
