"use client";

import { commitSchema } from "@/lib/schemas/git-schemas";
import { api } from "@/lib/trpc/react";
import type {
    BottomPanelContentTab,
    SidebarContentTab,
} from "@/lib/types/editor";
import type { Repository } from "@/lib/types/repository";
import dynamic from "next/dynamic";
import { type ElementRef, useRef, useState } from "react";
import { z } from "zod";

import { BottomPanelTabContent } from "@/components/editor/bottom-panel-content/bottom-panel-tab-content";
import { EditorNavigation } from "@/components/editor/navigation/editor-navigation";
import { SidebarTabContent } from "@/components/editor/sidebar-content/sidebar-tab-content";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";

interface EditorPageProps {
    repository: Repository;
}

const DynamicEditor = dynamic(() => import("@/components/editor/editor"), {
    loading: () => <p>Loading...</p>,
    ssr: false,
});

export default function EditorPage({ repository }: EditorPageProps) {
    const [activeSidebarContent, setActiveSidebarContent] =
        useState<SidebarContentTab>("fileExplorer");
    const [activeBottomPanelContent, setActiveBottomPanelContent] =
        useState<BottomPanelContentTab>("terminal");

    const verticalGroupRef =
        useRef<ElementRef<typeof ResizablePanelGroup>>(null);
    const horizontalGroupRef =
        useRef<ElementRef<typeof ResizablePanelGroup>>(null);

    const [verticalCollapsed, setVerticalCollapsed] = useState<boolean>(false);
    const [horizontalCollapsed, setHorizontalCollapsed] =
        useState<boolean>(false);
    const [lastOpenedSidebarSize, setLastOpenedSidebarSize] =
        useState<number>(20);
    const [lastOpenedBottomPanelSize, setLastOpenedBottomPanelSize] =
        useState<number>(20);

    const changes = api.git.changes.useQuery(
        { repoId: repository.id },
        {
            enabled: repository.isGitRepo,
            refetchInterval: 5_000,
        },
    );

    const commitMutation = api.git.commit.useMutation();

    const handleOnCommit = async (data: z.infer<typeof commitSchema>) => {
        await commitMutation.mutateAsync(data);
        await changes.refetch();
    };

    const handleCloseSidebar = () => {
        if (horizontalGroupRef && horizontalGroupRef.current) {
            setLastOpenedSidebarSize(horizontalGroupRef.current.getLayout()[0]);
            horizontalGroupRef.current.setLayout([0, 100]);
            setHorizontalCollapsed(true);
        }
    };

    const handleCloseBottomPanel = () => {
        if (verticalGroupRef && verticalGroupRef.current) {
            setLastOpenedBottomPanelSize(
                verticalGroupRef.current.getLayout()[1],
            );
            verticalGroupRef.current.setLayout([100, 0]);
            setVerticalCollapsed(true);
        }
    };

    return (
        <div className="flex h-screen flex-row">
            <EditorNavigation
                activeSidebarContent={activeSidebarContent}
                setActiveSidebarContent={setActiveSidebarContent}
                activeBottomPanelContent={activeBottomPanelContent}
                setActiveBottomPanelContent={setActiveBottomPanelContent}
                verticalGroupRef={verticalGroupRef}
                horizontalGroupRef={horizontalGroupRef}
                verticalCollapsed={verticalCollapsed}
                setVerticalCollapsed={setVerticalCollapsed}
                horizontalCollapsed={horizontalCollapsed}
                setHorizontalCollapsed={setHorizontalCollapsed}
                lastOpenedBottomPanelSize={lastOpenedBottomPanelSize}
                setLastOpenedBottomPanelSize={setLastOpenedBottomPanelSize}
                lastOpenedSidebarSize={lastOpenedSidebarSize}
                setLastOpenedSidebarSize={setLastOpenedSidebarSize}
                isGitRepo={repository.isGitRepo}
            />

            <ResizablePanelGroup
                direction="vertical"
                ref={verticalGroupRef}
                onLayout={(sizes) => {
                    setVerticalCollapsed(sizes[1] === 0);
                    if (sizes[1] > 0) {
                        setLastOpenedBottomPanelSize(sizes[1]);
                    }
                }}
            >
                <ResizablePanel defaultSize={80}>
                    <ResizablePanelGroup
                        direction="horizontal"
                        ref={horizontalGroupRef}
                        onLayout={(sizes) => {
                            setHorizontalCollapsed(sizes[0] === 0);
                            if (sizes[0] > 0) {
                                setLastOpenedSidebarSize(sizes[0]);
                            }
                        }}
                    >
                        <ResizablePanel
                            defaultSize={20}
                            collapsible
                            collapsedSize={0}
                        >
                            <SidebarTabContent
                                activeSidebarContent={activeSidebarContent}
                                repository={repository}
                                changes={changes.data?.changes ?? []}
                                handleCloseSidebar={handleCloseSidebar}
                                onCommitAction={handleOnCommit}
                            />
                        </ResizablePanel>

                        <ResizableHandle />

                        <ResizablePanel defaultSize={80}>
                            <DynamicEditor filePath="/testing-collab" />
                        </ResizablePanel>
                    </ResizablePanelGroup>
                </ResizablePanel>

                <ResizableHandle />

                <ResizablePanel defaultSize={20} collapsible collapsedSize={0}>
                    <BottomPanelTabContent
                        activeBottomPanelContent={activeBottomPanelContent}
                        handleCloseBottomPanel={handleCloseBottomPanel}
                    />
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    );
}
