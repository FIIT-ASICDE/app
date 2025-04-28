"use client";

import { commitSchema } from "@/lib/schemas/git-schemas";
import type { Configuration, SidebarContentTab } from "@/lib/types/editor";
import type {
    Repository,
    RepositoryItem,
    RepositoryItemChange,
} from "@/lib/types/repository";
import { Dispatch, ReactElement, SetStateAction } from "react";
import { z } from "zod";

import { ConfigurationTabContent } from "@/components/editor/sidebar-content/configuration/configuration-tab-content";
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
    configuration: Configuration | undefined;
    setConfigurationAction: Dispatch<SetStateAction<Configuration | undefined>>;
}

/**
 * Content of the sidebar, can display file explorer, search, source control or configuration
 *
 * @param {SidebarTabContentProps} props - Component props
 * @returns {ReactElement} sidebar content component
 */
export const SidebarTabContent = ({
    activeSidebarContent,
    repository,
    tree,
    setTreeAction,
    changes,
    handleCloseSidebarAction,
    onFileClick,
    onCommit,
    configuration,
    setConfigurationAction,
}: SidebarTabContentProps): ReactElement => {
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
                    handleCloseSidebarAction={handleCloseSidebarAction}
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
            {activeSidebarContent === "configuration" && (
                <ConfigurationTabContent
                    repository={repository}
                    handleCloseSidebarAction={handleCloseSidebarAction}
                    configuration={configuration}
                    setConfigurationAction={setConfigurationAction}
                />
            )}
        </div>
    );
};
