import React, { useState, useEffect } from 'react';
import { useDiagramContext } from "@/app/diagram-test/context/useDiagramContext";
import { Button } from '@/components/ui/button';
import { Expand } from "lucide-react";

const PaperToolbar: React.FC = () => {
    const { paper, fitToView } = useDiagramContext();
    const [zoomValue, setZoomValue] = useState(0);

    const handleZoomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const sliderValue = parseInt(e.target.value);
        setZoomValue(sliderValue);

        if (paper) {
            const scale = sliderValue <= 0
                ? 1 + (sliderValue / 125)
                : 1 + (sliderValue / 25);
            paper.scale(scale, scale);
        }
    };

    useEffect(() => {
        if (paper) {
            const currentScale = paper.scale().sx;
            let sliderValue: number;
            if (currentScale <= 1) {
                sliderValue = (currentScale - 1) * 125;
            } else {
                sliderValue = (currentScale - 1) * 25;
            }
            setZoomValue(sliderValue);
        }
    }, [paper]);

    const displayZoom = () => {
        const scale = zoomValue <= 0
            ? 1 + (zoomValue / 125)
            : 1 + (zoomValue / 25);
        if (scale < 1) {
            const percentDecrease = Math.round((1 - scale) * 100);
            return `-${percentDecrease}%`;
        } else {
            return `${Math.round(scale * 100)}%`;
        }
    };

    return (
        <div className="flex items-center gap-1 p-1 bg-white border-b shadow-sm">
            <div className="flex items-center gap-1 min-w-[120px]">
                <span className="text-xs text-gray-500 min-w-[40px]">{displayZoom()}</span>
                <input
                    type="range"
                    min="-100"
                    max="100"
                    step="5"
                    value={zoomValue}
                    onChange={handleZoomChange}
                    className="flex-1 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
            </div>
            <div className="border-r h-4 mx-1" />
            <button onClick={fitToView} title="Fit to View">
                <Expand className="h-4 w-4" />
            </button>
        </div>
    );
};

export default PaperToolbar;
