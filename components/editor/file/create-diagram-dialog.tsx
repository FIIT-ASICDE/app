/**
 * Provides a dialog interface for creating new block diagram files in the repository.
 * The component supports both icon and full-width button displays and handles
 * file creation within the repository structure.
 */

import { api } from "@/lib/trpc/react";
import { FileDisplayItem, RepositoryItem } from "@/lib/types/repository";
import { Blocks } from "lucide-react";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
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


interface CreateDiagramDialogProps {
    repositoryId: string; // Unique identifier of the current repository
    parentItem?: RepositoryItem; //Parent directory item where the diagram will be created
    buttonSize?: "icon" | "full"; //Display style of the create button
    tree: Array<RepositoryItem>; //Current repository file tree structure
    setTree: Dispatch<SetStateAction<Array<RepositoryItem>>>; //Function to update the file tree
    onAction?: () => void; //Optional callback triggered after successful diagram creation
}

/**
 * CreateDiagramDialog Component
 * Provides a dialog interface for creating new block diagram files.
 * Supports both icon and full-width button displays and handles file creation
 * within the repository structure.
 */
export const CreateDiagramDialog = ({
    repositoryId,
    parentItem,
    buttonSize,
    tree,
    setTree,
    onAction,
}: CreateDiagramDialogProps) => {
    // Dialog open state
    const [open, setOpen] = useState<boolean>(false);
    // New diagram name input state
    const [diagramName, setDiagramName] = useState<string>("");

    /**
     * Mutation hook for adding new diagram files to the repository
     * Handles success and error states, updates the file tree,
     * and manages the dialog state
     */
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

    /**
     * Handles the form submission for creating a new diagram
     * Ensures proper file extension (.bd) and triggers the creation mutation
     * @param {FormEvent} e - Form submission event
     */
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
            {/* Render either an icon button or full-width button based on buttonSize prop */}
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
            {/* Dialog content with form for diagram name input */}
            <DialogContent className="max-w-sm">
                <DialogHeader>
                    <DialogTitle className="text-center">
                        Create a new diagram
                        {/* Display parent directory name if creating inside a directory */}
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
                {/* Form with styled input for diagram name */}
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
