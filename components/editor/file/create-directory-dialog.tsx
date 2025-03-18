import { RepositoryItem } from "@/lib/types/repository";
import { Folder, FolderPlus } from "lucide-react";
import { FormEvent, useState } from "react";

import { FileExplorerControlButton } from "@/components/editor/sidebar-content/file-explorer-control-button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface CreateDirectoryDialogProps {
    repositoryItem?: RepositoryItem;
    buttonSize: "icon" | "full";
}

export const CreateDirectoryDialog = ({
    repositoryItem,
    buttonSize,
}: CreateDirectoryDialogProps) => {
    const [open, setOpen] = useState<boolean>(false);
    const [directoryName, setDirectoryName] = useState<string>("");

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (directoryName.trim()) {
            // TODO: handle create directory
            console.log(
                "Create directory on path: " +
                    (repositoryItem !== undefined ? repositoryItem.name : "") +
                    "/" +
                    directoryName,
            );
            setDirectoryName("");
            setOpen(false);
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
