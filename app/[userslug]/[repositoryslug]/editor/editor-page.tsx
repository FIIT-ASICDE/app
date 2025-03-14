"use client";

import type {
    BottomPanelContentTab,
    SidebarContentTab,
} from "@/lib/types/editor";
import type { Repository } from "@/lib/types/repository";
import dynamic from "next/dynamic";
import { type ElementRef, useRef, useState } from "react";

import { BottomPanelTabContent } from "@/components/editor/bottom-panel-tab-content";
import { EditorNavigation } from "@/components/editor/navigation/editor-navigation";
import { SidebarTabContent } from "@/components/editor/sidebar-tab-content";
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
                    />
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    );
}
