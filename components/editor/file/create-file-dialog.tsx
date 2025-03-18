import { RepositoryItem } from "@/lib/types/repository";
import { FileIcon, FilePlus } from "lucide-react";
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

interface CreateFileDialogProps {
    repositoryItem?: RepositoryItem;
    buttonSize?: "icon" | "full";
}

export const CreateFileDialog = ({
    repositoryItem,
    buttonSize,
}: CreateFileDialogProps) => {
    const [open, setOpen] = useState<boolean>(false);
    const [fileName, setFileName] = useState<string>("");

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (fileName.trim()) {
            // TODO: handle create file
            console.log(
                "Create file on path: " +
                    (repositoryItem !== undefined ? repositoryItem.name : "") +
                    "/" +
                    fileName,
            );
            setFileName("");
            setOpen(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            {buttonSize === "icon" ? (
                <FileExplorerControlButton
                    icon={FilePlus}
                    tooltipContent="Create file"
                    dialogTrigger
                />
            ) : (
                <DialogTrigger className="flex w-full cursor-default flex-row items-center justify-between rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent">
                    Create file
                    <FilePlus className="h-4 w-4 text-muted-foreground" />
                </DialogTrigger>
            )}
            <DialogContent className="max-w-sm">
                <DialogHeader>
                    <DialogTitle className="text-center">
                        Create a new file
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
                        <FileIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="File name"
                            className="pl-9"
                            value={fileName}
                            onChange={(e) => setFileName(e.target.value)}
                        />
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};
