// pages/diagram-test/components/Layout/Layout.tsx

"use client";

import React from 'react';
import Sidebar from '@/app/diagram-test/components/Sidebar/Sidebar';
import DiagramArea from '@/app/diagram-test/components/DiagramArea/DiagramArea';
import PropertiesPanel from '@/app/diagram-test/components/PropertiesPanel/PropertiesPanel';
import {
    ResizablePanelGroup,
    ResizablePanel,
    ResizableHandle,
} from '@/components/ui/resizable';

const Layout = () => {
    return (
        <ResizablePanelGroup direction="horizontal" className="h-screen w-full">
            <ResizablePanel defaultSize={20} minSize={10} maxSize={30}>
                <Sidebar />
            </ResizablePanel>

            <ResizableHandle withHandle />

            <ResizablePanel defaultSize={60} minSize={30}>
                <DiagramArea />
            </ResizablePanel>

            <ResizableHandle withHandle />

            <ResizablePanel defaultSize={20} minSize={10} maxSize={30}>
                <PropertiesPanel />
            </ResizablePanel>
        </ResizablePanelGroup>
    );
};

export default Layout;
