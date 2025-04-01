// pages/diagram-test/components/Layout/Layout.tsx
import React from 'react';
import Sidebar from '@/app/diagram-test/components/Sidebar/Sidebar';
import DiagramArea from '@/app/diagram-test/components/DiagramArea/DiagramArea';
import PropertiesPanel from '@/app/diagram-test/components/PropertiesPanel/PropertiesPanel';

const Layout = () => {
    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col relative">
                <DiagramArea />
            </div>
            <PropertiesPanel />
        </div>
    );
};

export default Layout;
