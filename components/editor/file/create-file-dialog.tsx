import { api } from "@/lib/trpc/react";
import { FileDisplayItem, RepositoryItem } from "@/lib/types/repository";
import { FileIcon, FilePlus } from "lucide-react";
import {
    Dispatch,
    FormEvent,
    ReactElement,
    SetStateAction,
    useState,
} from "react";
import { toast } from "sonner";

import { FileExplorerControlButton } from "@/components/editor/sidebar-content/file-explorer/file-explorer-control-button";
import { addItemToTree } from "@/components/generic/generic";
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

/**
 * Dialog that lets the user create a new file within a repository
 *
 * @param {CreateFileDialogProps} props - Component props
 * @returns {ReactElement} Dialog component
 */
export const CreateFileDialog = ({
    repositoryId,
    parentItem,
    buttonSize,
    tree,
    setTree,
    onAction,
}: CreateFileDialogProps): ReactElement => {
    const [open, setOpen] = useState<boolean>(false);
    const [fileName, setFileName] = useState<string>("");

    const addFileMutation = api.editor.addItem.useMutation({
        onSuccess: (item) => {
            if (item.type !== "file-display")
                throw new Error(
                    "unexpected state when creating new file, didn't receive 'file-display'",
                );

            toast.success("File created successfully");

            const newFile: FileDisplayItem = { ...item };

            if (!parentItem) {
                setTree([...tree, newFile]);
            } else {
                const updatedTree: Array<RepositoryItem> = addItemToTree(
                    tree,
                    parentItem.absolutePath,
                    newFile,
                );
                setTree(updatedTree);
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
                path: parentItem?.absolutePath,
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
                                    {parentItem.name}
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
