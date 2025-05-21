// Custom hook for handling diagram navigation and zoom events
import { useEffect } from 'react';
import { dia } from '@joint/core';

// Interface defining required properties for the hook
interface UseDiagramEventsProps {
    paper: dia.Paper | null;      // JointJS paper instance
    paperElement: HTMLDivElement | null;  // DOM element containing the diagram
}

// Hook for handling mouse wheel events for diagram navigation and zooming
export function useDiagramEvents({ paper, paperElement }: UseDiagramEventsProps) {
    useEffect(() => {
        if (!paper || !paperElement) return;

        // Detect if running on MacOS for platform-specific key bindings
        const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;

        // Handle mouse wheel events for pan and zoom
        const handleWheel = (event: WheelEvent) => {
            event.preventDefault();

            const deltaX = event.deltaX;
            const deltaY = event.deltaY;
            // Adjust scale factor based on wheel delta mode (pixels or lines)
            const scaleFactor = event.deltaMode === 0 ? 1 : 20;

            // Zoom: Command/Ctrl + Wheel
            if ((isMac && event.metaKey) || (!isMac && event.ctrlKey)) {
                const currentScale = paper.scale().sx;
                const zoomSpeed = 0.05;
                let newScale = currentScale + (deltaY < 0 ? zoomSpeed : -zoomSpeed);
                // Limit zoom scale between 0.1 and 5
                if (newScale < 0.1) newScale = 0.1;
                if (newScale > 5) newScale = 5;
                paper.scale(newScale, newScale);
            }
            // Horizontal scroll: Alt/Shift + Wheel
            else if ((isMac && event.altKey) || (!isMac && event.shiftKey)) {
                const { tx, ty } = paper.translate();
                paper.translate(tx - deltaY * scaleFactor * 0.5, ty);
            }
            // Normal pan: Wheel
            else {
                const { tx, ty } = paper.translate();
                paper.translate(tx - deltaX * scaleFactor * 0.5, ty - deltaY * scaleFactor * 0.5);
            }
        };

        // Add wheel event listener with passive: false to allow preventDefault
        paperElement.addEventListener('wheel', handleWheel, { passive: false });

        // Cleanup: remove event listener when component unmounts
        return () => {
            paperElement.removeEventListener('wheel', handleWheel);
        };
    }, [paper, paperElement]);
}
