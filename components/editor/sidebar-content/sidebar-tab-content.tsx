"use client";

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
import { Dispatch, SetStateAction } from "react";

interface SidebarTabContentProps {
    activeSidebarContent: SidebarContentTab;
    repository: Repository;
    tree: Array<RepositoryItem>;
    setTree: Dispatch<SetStateAction<Array<RepositoryItem>>>;
    changes: Array<RepositoryItemChange>;
    handleCloseSidebar: () => void;
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
    setTree,
    changes,
    handleCloseSidebar,
    onFileClick,
    onCommit,
}: SidebarTabContentProps) => {
    return (
        <div className="flex h-full">
            {activeSidebarContent === "fileExplorer" && (
                <FileExplorerTabContent
                    repository={repository}
                    tree={tree}
                    setTreeAction={setTree}
                    handleCloseSidebarAction={handleCloseSidebar}
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
                    onCommitAction={onCommit.action}
                    isLoading={onCommit.isLoading}
                />
            )}
        </div>
    );
};
