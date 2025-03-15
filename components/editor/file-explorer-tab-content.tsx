import { AvatarDisplay } from "@/components/generic/avatar-display";
import { imgSrc } from "@/lib/client-file-utils";
import { FileTree } from "@/components/editor/file/file-tree";
import { NoData } from "@/components/generic/no-data";
import { FileX } from "lucide-react";
import { Repository } from "@/lib/types/repository";

interface FileExplorerTabContentProps {
    repository: Repository;
}

export const FileExplorerTabContent = ({
    repository,
}: FileExplorerTabContentProps) => {
    return (
        <div className="text-nowrap p-4">
            <header className="flex flex-row gap-x-2 pb-4 text-xl font-medium">
                <AvatarDisplay
                    displayType="select"
                    name={repository.ownerName}
                    image={imgSrc(repository.ownerImage)}
                />
                {repository.ownerName + "/" + repository.name}
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
    );
};