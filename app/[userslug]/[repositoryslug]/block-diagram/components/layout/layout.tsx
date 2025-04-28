// pages/block-diagram/components/layout/layout.tsx

"use client";

import React from 'react';
import Sidebar from '@/app/[userslug]/[repositoryslug]/block-diagram/components/sidebar/sidebar';
import DiagramArea from '@/app/[userslug]/[repositoryslug]/block-diagram/components/diagram-area/diagram-area';
import PropertiesPanel from '@/app/[userslug]/[repositoryslug]/block-diagram/components/properties-panel/properties-panel';
import {
    ResizablePanelGroup,
    ResizablePanel,
    ResizableHandle,
} from '@/components/ui/resizable';

const Layout = () => {
    return (
        <ResizablePanelGroup direction="horizontal" className="h-screen w-full">
            <ResizablePanel defaultSize={15} minSize={10} maxSize={30}>
                <Sidebar />
            </ResizablePanel>

            <ResizableHandle withHandle />

            <ResizablePanel defaultSize={70} minSize={30}>
                <DiagramArea />
            </ResizablePanel>

            <ResizableHandle withHandle />

            <ResizablePanel defaultSize={15} minSize={10} maxSize={30}>
                <PropertiesPanel />
            </ResizablePanel>
        </ResizablePanelGroup>
    );
};

export default Layout;
