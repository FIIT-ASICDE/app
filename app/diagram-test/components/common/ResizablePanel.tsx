// components/common/ResizablePanel.tsx
import React from 'react';
import { useResizable } from "@/app/diagram-test/hooks/useResizable";
import styles from './ResizablePanel.module.css';

interface ResizablePanelProps {
    children: React.ReactNode;
    defaultWidth?: number;
    minWidth?: number;
    maxWidth?: number;
    className?: string;
    resizerClassName?: string;
    direction?: 'right' | 'left';
    onWidthChange?: (width: number) => void;
}

const ResizablePanel: React.FC<ResizablePanelProps> = ({
    children,
    defaultWidth = 250,
    minWidth = 150,
    maxWidth = 600,
    className = '',
    resizerClassName = '',
    direction = 'right',
    onWidthChange
}) => {
    const { width, isResizing, startResizing } = useResizable({
        defaultWidth,
        minWidth,
        maxWidth,
        onWidthChange,
        direction
    });

    return (
        <div className={styles.resizableContainer}>
            <div
                className={`${styles.resizableContent} ${className}`}
                style={{ width: `${width}px` }}
            >
                {children}
            </div>
            <div
                className={`${styles.resizer} ${isResizing ? styles.active : ''} ${resizerClassName}`}
                onMouseDown={startResizing}
                style={{
                    [direction === 'right' ? 'right' : 'left']: 0
                }}
            />
        </div>
    );
};

export default ResizablePanel;
