// pages/diagram-test/components/Layout/Layout.tsx

import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import DiagramArea from '../DiagramArea/DiagramArea';
import PropertiesPanel from '../PropertiesPanel/PropertiesPanel';
import styles from './Layout.module.css';

const Layout = () => {
    return (
        <div className={styles.appContainer}>
            <Sidebar />
            <div className={styles.mainContent}>
                <DiagramArea />
            </div>
            <PropertiesPanel />
        </div>
    );
};

export default Layout;
