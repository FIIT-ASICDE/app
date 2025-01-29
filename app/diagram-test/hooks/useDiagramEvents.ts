// useDiagramEvents.ts
import { useEffect } from 'react';
import { dia } from '@joint/core';

interface UseDiagramEventsProps {
    paper: dia.Paper | null;          // paperRef.current
    paperElement: HTMLDivElement | null;
}

export function useDiagramEvents({ paper, paperElement }: UseDiagramEventsProps) {
    useEffect(() => {
        if (!paper || !paperElement) return;

        // 1. Логика колеса (wheel)
        const handleWheel = (event: WheelEvent) => {
            event.preventDefault();
            const currentScale = paper.scale().sx;
            const zoomSpeed = 0.05;
            let newScale = currentScale + (event.deltaY < 0 ? zoomSpeed : -zoomSpeed);
            if (newScale < 0.1) newScale = 0.1;
            paper.scale(newScale, newScale);
        };

        paperElement.addEventListener('wheel', handleWheel, { passive: false });

        // 2. Логика клавиш
        const handleKeyDown = (event: KeyboardEvent) => {
            let dx = 0;
            let dy = 0;
            const moveStep = 20;

            switch (event.key) {
                case 'ArrowUp':    dy = moveStep;   break;
                case 'ArrowDown':  dy = -moveStep;  break;
                case 'ArrowLeft':  dx = moveStep;   break;
                case 'ArrowRight': dx = -moveStep;  break;
                default: return;
            }

            const { tx, ty } = paper.translate();
            paper.translate(tx + dx, ty + dy);
        };

        window.addEventListener('keydown', handleKeyDown);

        // Отписка
        return () => {
            paperElement.removeEventListener('wheel', handleWheel);
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [paper, paperElement]);
}
