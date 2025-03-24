// hooks/useResizable.ts
import { useEffect, useState } from "react";

interface ResizableOptions {
    defaultWidth?: number;
    maxWidth?: number;
    minWidth?: number;
    onWidthChange?: (width: number) => void;
    direction?: 'right' | 'left';
}

export const useResizable = ({
    defaultWidth = 250,
    minWidth = 150,
    maxWidth = 600,
    onWidthChange,
    direction,
}: ResizableOptions = {}) => {
    const [width, setWidth] = useState(defaultWidth);
    const [isResizing, setIsResizing] = useState(false);

    const startResizing = (mouseDownEvent: React.MouseEvent) => {
        mouseDownEvent.preventDefault();

        const startWidth = width;
        const startPosition = mouseDownEvent.clientX;

        function onMouseMove(mouseMoveEvent: MouseEvent) {
            let newWidth;
            if (direction === 'right') {
                newWidth = startWidth + mouseMoveEvent.clientX - startPosition;
            } else {
                newWidth = startWidth - (mouseMoveEvent.clientX - startPosition);
            }

            if (newWidth > minWidth && newWidth < maxWidth) {
                setWidth(newWidth);
                if (onWidthChange) {
                    onWidthChange(newWidth);
                }
            }
        }

        function onMouseUp() {
            document.body.removeEventListener("mousemove", onMouseMove);
            document.body.removeEventListener("mouseup", onMouseUp);
            setIsResizing(false);
        }

        setIsResizing(true);
        document.body.addEventListener("mousemove", onMouseMove);
        document.body.addEventListener("mouseup", onMouseUp);
    };

    return {
        width,
        isResizing,
        startResizing,
        setWidth,
    };
};
