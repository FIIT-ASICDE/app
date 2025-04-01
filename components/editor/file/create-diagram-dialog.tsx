import { api } from "@/lib/trpc/react";
import { FileDisplayItem, RepositoryItem } from "@/lib/types/repository";
import { Blocks } from "lucide-react";
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

interface CreateDiagramDialogProps {
    repositoryId: string;
    parentItem?: RepositoryItem;
    buttonSize?: "icon" | "full";
    tree: Array<RepositoryItem>;
    setTree: Dispatch<SetStateAction<Array<RepositoryItem>>>;
    onAction?: () => void;
}

export const CreateDiagramDialog = ({
                                        repositoryId,
                                        parentItem,
                                        buttonSize,
                                        tree,
                                        setTree,
                                        onAction,
                                    }: CreateDiagramDialogProps) => {
    const [open, setOpen] = useState<boolean>(false);
    const [diagramName, setDiagramName] = useState<string>("");

    const addFileMutation = api.editor.addItem.useMutation({
        onSuccess: (item) => {
            if (item.type !== "file-display")
                throw new Error(
                    "unexpected state when creating new diagram, didn't receive 'file-display'",
                );

            toast.success("Diagram created successfully");

            const newFile: FileDisplayItem = { ...item };

            if (!parentItem) {
                setTree([...tree, newFile]);
            }

            onAction?.();
            setDiagramName("");
            setOpen(false);
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (diagramName.trim()) {
            const fileName = diagramName.trim().endsWith('.bd')
                ? diagramName.trim()
                : `${diagramName.trim()}.bd`;

            addFileMutation.mutate({
                type: "file",
                name: fileName,
                repoId: repositoryId,
                path: parentItem?.absolutePath,
            });
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            {buttonSize === "icon" ? (
                <FileExplorerControlButton
                    icon={Blocks}
                    tooltipContent="Create diagram"
                    dialogTrigger
                />
            ) : (
                <DialogTrigger className="flex w-full cursor-default flex-row items-center justify-between rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent">
                    Create diagram
                    <Blocks className="h-4 w-4 text-muted-foreground" />
                </DialogTrigger>
            )}
            <DialogContent className="max-w-sm">
                <DialogHeader>
                    <DialogTitle className="text-center">
                        Create a new diagram
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
                        <Blocks className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Diagram name"
                            className="pl-9"
                            value={diagramName}
                            onChange={(e) => setDiagramName(e.target.value)}
                        />
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};
