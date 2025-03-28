"use client";

import { commitSchema } from "@/lib/schemas/git-schemas";
import type { SidebarContentTab } from "@/lib/types/editor";
import type {
    Repository,
    RepositoryItem,
    RepositoryItemChange,
} from "@/lib/types/repository";
import { Dispatch, SetStateAction } from "react";
import { z } from "zod";

import { FileExplorerTabContent } from "@/components/editor/sidebar-content/file-explorer/file-explorer-tab-content";
import { SearchTabContent } from "@/components/editor/sidebar-content/search/search-tab-content";
import { SourceControlTabContent } from "@/components/editor/sidebar-content/source-control/source-control-tab-content";

interface SidebarTabContentProps {
    activeSidebarContent: SidebarContentTab;
    repository: Repository;
    tree: Array<RepositoryItem>;
    setTreeAction: Dispatch<SetStateAction<Array<RepositoryItem>>>;
    changes: Array<RepositoryItemChange>;
    handleCloseSidebarAction: () => void;
    onFileClick?: (item: RepositoryItem) => void;
    onCommit: {
        action: (data: z.infer<typeof commitSchema>) => Promise<void>;
        isLoading: boolean;
    };
}

export const SidebarTabContent = ({
    activeSidebarContent,
    repository,
    tree,
    setTreeAction,
    changes,
    handleCloseSidebarAction,
    onFileClick,
    onCommit,
}: SidebarTabContentProps) => {
    return (
        <div className="flex h-full">
            {activeSidebarContent === "fileExplorer" && (
                <FileExplorerTabContent
                    repository={repository}
                    tree={tree}
                    setTreeAction={setTreeAction}
                    handleCloseSidebarAction={handleCloseSidebarAction}
                    onFileClick={onFileClick}
                />
            )}
            {activeSidebarContent === "search" && (
                <SearchTabContent
                    repository={repository}
                    handleCloseSidebar={handleCloseSidebarAction}
                />
            )}
            {activeSidebarContent === "sourceControl" && (
                <SourceControlTabContent
                    repositoryId={repository.id}
                    changes={changes}
                    handleCloseSidebarAction={handleCloseSidebarAction}
                    onCommitAction={onCommit.action}
                    isLoading={onCommit.isLoading}
                />
            )}
        </div>
    );
};
