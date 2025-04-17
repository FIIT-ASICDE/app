// pages/block-diagram/components/Layout/Layout.tsx

"use client";

import React from 'react';
import Sidebar from '@/app/[userslug]/[repositoryslug]/block-diagram/components/Sidebar/Sidebar';
import DiagramArea from '@/app/[userslug]/[repositoryslug]/block-diagram/components/DiagramArea/DiagramArea';
import PropertiesPanel from '@/app/[userslug]/[repositoryslug]/block-diagram/components/PropertiesPanel/PropertiesPanel';
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
