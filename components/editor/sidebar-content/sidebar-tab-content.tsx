import { commitSchema } from "@/lib/schemas/git-schemas";
import type { SidebarContentTab } from "@/lib/types/editor";
import type {
    Repository,
    RepositoryItem,
    RepositoryItemChange,
} from "@/lib/types/repository";
import { z } from "zod";

import { FileExplorerTabContent } from "@/components/editor/sidebar-content/file-explorer-tab-content";
import { SearchTabContent } from "@/components/editor/sidebar-content/search-tab-content";
import { SourceControlTabContent } from "@/components/editor/sidebar-content/source-control-tab-content";

interface SidebarTabContentProps {
    activeSidebarContent: SidebarContentTab;
    repository: Repository;
    changes: Array<RepositoryItemChange>;
    handleCloseSidebar: () => void;
    onCommitAction?: (data: z.infer<typeof commitSchema>) => Promise<void>;
    onFileClick?: (item: RepositoryItem) => void;
}

export const SidebarTabContent = ({
    activeSidebarContent,
    repository,
    changes,
    handleCloseSidebar,
    onCommitAction,
    onFileClick,
}: SidebarTabContentProps) => {
    return (
        <div className="flex h-full">
            {activeSidebarContent === "fileExplorer" && (
                <FileExplorerTabContent
                    repository={repository}
                    handleCloseSidebar={handleCloseSidebar}
                    onFileClick={onFileClick}
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
                    repoId={repository.id}
                    changes={changes}
                    handleCloseSidebar={handleCloseSidebar}
                    onCommitAction={onCommitAction}
                />
            )}
        </div>
    );
};
