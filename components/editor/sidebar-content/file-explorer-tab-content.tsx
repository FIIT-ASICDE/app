import { imgSrc } from "@/lib/client-file-utils";
import { Repository } from "@/lib/types/repository";
import { CopyMinus, FileX } from "lucide-react";

import { CreateDirectoryDialog } from "@/components/editor/file/create-directory-dialog";
import { CreateFileDialog } from "@/components/editor/file/create-file-dialog";
import { FileTree } from "@/components/editor/file/file-tree";
import { CloseButton } from "@/components/editor/navigation/close-button";
import { FileExplorerControlButton } from "@/components/editor/sidebar-content/file-explorer-control-button";
import { AvatarDisplay } from "@/components/generic/avatar-display";
import { DynamicTitle } from "@/components/generic/dynamic-title";
import { NoData } from "@/components/generic/no-data";
import { ScrollArea } from "@/components/ui/scroll-area";

interface FileExplorerTabContentProps {
    repository: Repository;
    handleCloseSidebar: () => void;
}

export const FileExplorerTabContent = ({
    repository,
    handleCloseSidebar,
}: FileExplorerTabContentProps) => {
    return (
        <ScrollArea className="relative h-full w-full">
            <div className="text-nowrap p-4">
                <header className="flex flex-col gap-y-3 pb-2">
                    <div className="flex flex-row items-center justify-between gap-x-3">
                        <div className="flex min-w-0 flex-row gap-x-2 text-xl font-medium">
                            <AvatarDisplay
                                displayType="select"
                                name={repository.ownerName}
                                image={imgSrc(repository.ownerImage)}
                            />
                            <DynamicTitle
                                title={
                                    repository.ownerName + "/" + repository.name
                                }
                                className="text-foreground hover:text-foreground"
                                tooltipVisible
                            />
                        </div>
                        <CloseButton onClick={handleCloseSidebar} />
                    </div>
                    <div className="flex flex-row gap-x-1">
                        <CreateDirectoryDialog buttonSize="icon" />
                        <CreateFileDialog buttonSize="icon" />
                        <FileExplorerControlButton
                            icon={CopyMinus}
                            tooltipContent="Collapse all"
                        />
                    </div>
                </header>
                {repository.tree && repository.tree.length ? (
                    <FileTree
                        tree={repository.tree}
                        onItemClick={() => console.log("clicked")}
                    />
                ) : (
                    <NoData
                        icon={FileX}
                        message={"No files or directories found"}
                    />
                )}
            </div>
        </ScrollArea>
    );
};
