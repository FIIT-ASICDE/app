import type { SidebarContentTab } from "@/lib/types/editor";
import type { Repository } from "@/lib/types/repository";
import { FileExplorerTabContent } from "@/components/editor/file-explorer-tab-content";
import { SearchTabContent } from "@/components/editor/search-tab-content";
import { SourceControlTabContent } from "@/components/editor/source-control-tab-content";

interface SidebarTabContentProps {
    activeSidebarContent: SidebarContentTab;
    repository: Repository;
}

export const SidebarTabContent = ({
    activeSidebarContent,
    repository,
}: SidebarTabContentProps) => {
    return (
        <div className="flex h-full">
            {activeSidebarContent === "fileExplorer" && (
                <FileExplorerTabContent repository={repository} />
            )}
            {activeSidebarContent === "search" && (
                <SearchTabContent  repository={repository} />
            )}
            {activeSidebarContent === "sourceControl" && (
                <SourceControlTabContent />
            )}
        </div>
    );
};
