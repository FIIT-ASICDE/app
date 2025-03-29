// pages/diagram-test/components/Layout/Layout.tsx

import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import DiagramArea from '../DiagramArea/DiagramArea';
import PropertiesPanel from '../PropertiesPanel/PropertiesPanel';

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
