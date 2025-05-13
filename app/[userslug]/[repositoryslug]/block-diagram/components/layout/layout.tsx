// Main layout component for the block diagram editor

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

// The Layout component defines the basic structure of the editor with three main sections:
// 1. Sidebar - contains tools for adding components
// 2. Main Diagram Area - space for drawing the diagram
// 3. Properties Panel - displays and allows editing of selected component properties
const Layout = () => {
    return (
        // ResizablePanelGroup allows users to resize panels by dragging
        <ResizablePanelGroup direction="horizontal" className="h-screen w-full">
            {/* Tools sidebar */}
            <ResizablePanel defaultSize={15} minSize={10} maxSize={30}>
                <Sidebar />
            </ResizablePanel>

            {/* Panel separator */}
            <ResizableHandle withHandle />

            {/* Main diagram area */}
            <ResizablePanel defaultSize={70} minSize={30}>
                <DiagramArea />
            </ResizablePanel>

            {/* Panel separator */}
            <ResizableHandle withHandle />

            {/* Properties panel */}
            <ResizablePanel defaultSize={15} minSize={10} maxSize={30}>
                <PropertiesPanel />
            </ResizablePanel>
        </ResizablePanelGroup>
    );
};

export default Layout;
