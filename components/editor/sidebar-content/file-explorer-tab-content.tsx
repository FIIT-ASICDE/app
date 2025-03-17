import { AvatarDisplay } from "@/components/generic/avatar-display";
import { imgSrc } from "@/lib/client-file-utils";
import { FileTree } from "@/components/editor/file/file-tree";
import { NoData } from "@/components/generic/no-data";
import { FileX } from "lucide-react";
import { Repository } from "@/lib/types/repository";
import { CloseButton } from "@/components/editor/navigation/close-button";
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
        <ScrollArea className="h-full w-full relative">
            <div className="p-4 text-nowrap">
                <header className="flex flex-row items-center justify-between pb-4">
                    <div className="flex flex-row gap-x-2 text-xl font-medium">
                        <AvatarDisplay
                            displayType="select"
                            name={repository.ownerName}
                            image={imgSrc(repository.ownerImage)}
                        />
                        {repository.ownerName + "/" + repository.name}
                    </div>
                    <CloseButton onClick={handleCloseSidebar} />
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