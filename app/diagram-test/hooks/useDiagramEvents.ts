import { useEffect } from 'react';
import { dia } from '@joint/core';

interface UseDiagramEventsProps {
    paper: dia.Paper | null;
    paperElement: HTMLDivElement | null;
}

export function useDiagramEvents({ paper, paperElement }: UseDiagramEventsProps) {
    useEffect(() => {
        if (!paper || !paperElement) return;

        const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;

        const handleWheel = (event: WheelEvent) => {
            event.preventDefault();

            const deltaX = event.deltaX;
            const deltaY = event.deltaY;
            const scaleFactor = event.deltaMode === 0 ? 1 : 20;

            if ((isMac && event.metaKey) || (!isMac && event.ctrlKey)) {
                const currentScale = paper.scale().sx;
                const zoomSpeed = 0.05;
                let newScale = currentScale + (deltaY < 0 ? zoomSpeed : -zoomSpeed);
                if (newScale < 0.1) newScale = 0.1;
                if (newScale > 5) newScale = 5;
                paper.scale(newScale, newScale);
            } else if ((isMac && event.altKey) || (!isMac && event.shiftKey)) {
                const { tx, ty } = paper.translate();
                paper.translate(tx - deltaY * scaleFactor * 0.5, ty);
            } else {
                const { tx, ty } = paper.translate();
                paper.translate(tx - deltaX * scaleFactor * 0.5, ty - deltaY * scaleFactor * 0.5);
            }
        };

        paperElement.addEventListener('wheel', handleWheel, { passive: false });


        return () => {
            paperElement.removeEventListener('wheel', handleWheel);
        };
    }, [paper, paperElement]);
}
