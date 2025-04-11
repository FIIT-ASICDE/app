import { RepositoryItem } from "@/lib/types/repository";
import { Code, Copy, Ellipsis } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";

import { CreateDirectoryDialog } from "@/components/editor/file/create-directory-dialog";
import { CreateFileDialog } from "@/components/editor/file/create-file-dialog";
import { DeleteItemDialog } from "@/components/editor/file/delete-item-dialog";
import { RenameItemDialog } from "@/components/editor/file/rename-item-dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { GenerateCodeDialog } from "@/components/editor/file/generate-code-dialog";

interface RepositoryItemActionsProps {
    repositoryId: string;
    parentItem: RepositoryItem;
    tree: Array<RepositoryItem>;
    setTree: Dispatch<SetStateAction<Array<RepositoryItem>>>;
    dropdownOpen: boolean;
    setDropdownOpen: Dispatch<SetStateAction<boolean>>;
    onAction: () => void;
    onOpenFile?: (item: RepositoryItem) => void;
}

export const RepositoryItemActions = ({
    repositoryId,
    parentItem,
    tree,
    setTree,
    dropdownOpen,
    setDropdownOpen,
    onAction,
    onOpenFile,
}: RepositoryItemActionsProps) => {
    const openFile = () => {
        onOpenFile?.(parentItem);
    };

    const copyName = () => {
        navigator.clipboard
            .writeText(parentItem.name)
            .then(() => {
                toast.success(
                    parentItem.type === "directory" ||
                        parentItem.type === "directory-display"
                        ? "Directory name copied to clipboard"
                        : "File name copied to clipboard",
                    {
                        description: parentItem.name,
                    },
                );
            })
            .catch(() => {
                toast.error("Unable to copy name to clipboard");
            });
    };

    const copyPath = () => {
        navigator.clipboard
            .writeText(parentItem.absolutePath)
            .then(() => {
                toast.success(
                    parentItem.type === "directory" ||
                        parentItem.type === "directory-display"
                        ? "Directory path copied to clipboard"
                        : "File path copied to clipboard",
                    {
                        description: parentItem.absolutePath,
                    },
                );
            })
            .catch(() => {
                toast.error("Unable to copy path to clipboard");
            });
    };

    const isDiagramFile =
        (parentItem.type === "file-display" || parentItem.type === "file") &&
        parentItem.name.endsWith(".bd");

    return (
        <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
            <DropdownMenuTrigger asChild>
                <button className="rounded border border-transparent p-[1px] hover:border-transparent hover:text-foreground">
                    <Ellipsis className="max-h-4 min-h-4 min-w-4 max-w-4" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="min-w-40">
                {parentItem.type === "directory" ||
                parentItem.type === "directory-display" ? (
                    <>
                        <CreateFileDialog
                            repositoryId={repositoryId}
                            parentItem={parentItem}
                            buttonSize="full"
                            tree={tree}
                            setTree={setTree}
                            onAction={onAction}
                        />
                        <CreateDirectoryDialog
                            repositoryId={repositoryId}
                            parentItem={parentItem}
                            buttonSize="full"
                            tree={tree}
                            setTree={setTree}
                            onAction={onAction}
                        />
                        <DropdownMenuSeparator />
                    </>
                ) : (
                    <>
                        <DropdownMenuItem
                            className="flex flex-row items-center justify-between"
                            onClick={openFile}
                        >
                            Open
                            <Code className="text-muted-foreground" />
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                    </>
                )}

                <DropdownMenuItem
                    className="flex flex-row items-center justify-between"
                    onClick={copyName}
                >
                    Copy name
                    <Copy className="text-muted-foreground" />
                </DropdownMenuItem>

                <DropdownMenuItem
                    className="flex flex-row items-center justify-between"
                    onClick={copyPath}
                >
                    Copy path
                    <Copy className="text-muted-foreground" />
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <RenameItemDialog
                    repositoryId={repositoryId}
                    item={parentItem}
                    tree={tree}
                    setTree={setTree}
                    onAction={onAction}
                />
                <DeleteItemDialog
                    repositoryId={repositoryId}
                    repositoryItem={parentItem}
                    tree={tree}
                    setTree={setTree}
                    onAction={onAction}
                />

                {isDiagramFile && (
                    <>
                        <DropdownMenuSeparator />
                        <GenerateCodeDialog
                            repositoryId={repositoryId}
                            diagramFile={parentItem}
                            tree={tree}
                            setTree={setTree}
                        />
                    </>
                )}

            </DropdownMenuContent>
        </DropdownMenu>
    );
};
