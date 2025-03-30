// components/common/ResizablePanel.tsx
import React from 'react';
import { useResizable } from "@/app/diagram-test/hooks/useResizable";

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
        <div className="relative flex h-full">
            <div
                className={`h-full overflow-auto ${className}`}
                style={{ width: `${width}px` }}
            >
                {children}
            </div>
            <div
                className={`absolute w-1 h-full cursor-col-resize hover:bg-gray-400 active:bg-gray-500 ${isResizing ? 'bg-gray-500' : 'bg-gray-300'} ${resizerClassName}`}
                onMouseDown={startResizing}
                style={{
                    [direction === 'right' ? 'right' : 'left']: 0
                }}
            />
        </div>
    );
};

export default ResizablePanel;
