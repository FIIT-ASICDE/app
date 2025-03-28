import { api } from "@/lib/trpc/react";
import { FileDisplayItem, RepositoryItem } from "@/lib/types/repository";
import { FileIcon, FilePlus } from "lucide-react";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { toast } from "sonner";

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
    repositoryId: string;
    parentItem?: RepositoryItem;
    buttonSize?: "icon" | "full";
    tree: Array<RepositoryItem>;
    setTree: Dispatch<SetStateAction<Array<RepositoryItem>>>;
    onAction?: () => void;
}

export const CreateFileDialog = ({
    repositoryId,
    parentItem,
    buttonSize,
    tree,
    setTree,
    onAction,
}: CreateFileDialogProps) => {
    const [open, setOpen] = useState<boolean>(false);
    const [fileName, setFileName] = useState<string>("");

    const addFileMutation = api.editor.addItem.useMutation({
        onSuccess: (item) => {
            toast.success("File created successfully");

            const trimmedFileName: string = fileName.trim();

            const newFile: FileDisplayItem = {
                type: "file-display",
                name: item.name,
                lastActivity: item.lastActivity,
                language: trimmedFileName.split(".").pop() ?? "",
                absolutePath: parentItem
                    ? parentItem.name + "/" + item.name
                    : item.name,
            };

            if (!parentItem) {
                setTree([...tree, newFile]);
            }

            onAction?.();
            setFileName("");
            setOpen(false);
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (fileName.trim()) {
            addFileMutation.mutate({
                type: "file",
                name: fileName.trim(),
                repoId: repositoryId,
                path: parentItem?.name,
            });
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
                        {parentItem && (
                            <span>
                                {" "}
                                in{" "}
                                <span className="text-muted-foreground">
                                    {parentItem.name.split("/").pop() ??
                                        parentItem.name}
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
