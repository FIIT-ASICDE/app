import type { SidebarContentTab } from "@/lib/types/editor";
import type { Repository, RepositoryItemChange } from "@/lib/types/repository";
import { FileExplorerTabContent } from "@/components/editor/sidebar-content/file-explorer-tab-content";
import { SearchTabContent } from "@/components/editor/sidebar-content/search-tab-content";
import { SourceControlTabContent } from "@/components/editor/sidebar-content/source-control-tab-content";

interface SidebarTabContentProps {
    activeSidebarContent: SidebarContentTab;
    repository: Repository;
    changes: Array<RepositoryItemChange>;
    handleCloseSidebar: () => void;
}

export const SidebarTabContent = ({
    activeSidebarContent,
    repository,
    changes,
    handleCloseSidebar,
}: SidebarTabContentProps) => {
    return (
        <div className="flex h-full">
            {activeSidebarContent === "fileExplorer" && (
                <FileExplorerTabContent
                    repository={repository}
                    handleCloseSidebar={handleCloseSidebar}
                />
            )}
            {activeSidebarContent === "search" && (
                <SearchTabContent
                    repository={repository}
                    handleCloseSidebar={handleCloseSidebar}
                />
            )}
            {activeSidebarContent === "sourceControl" && (
                <SourceControlTabContent
                    changes={changes}
                    handleCloseSidebar={handleCloseSidebar}
                />
            )}
        </div>
    );
};
