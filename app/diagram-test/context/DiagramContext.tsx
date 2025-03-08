// pages/diagram-test/context/DiagramContext.tsx

import React, { createContext, useState, ReactNode } from 'react';
import {customNamespace} from '../hooks/useJointJS'
import { dia } from "@joint/core";
import * as joint from "@joint/core";

interface DiagramContextProps {
    graph: dia.Graph;
    paper: dia.Paper | null;
    selectedElement: dia.Cell | null;
    setSelectedElement: (cell: dia.Cell | null) => void;
    updateElement: (cell: dia.Cell) => void;
    setPaper: (paper: dia.Paper | null) => void;
    zoomIn: () => void;
    zoomOut: () => void;
    fitToView: () => void;
    isPanning: boolean;
    togglePanning: () => void;
    removeElement: () => void;
    hasFormErrors: boolean;
    setHasFormErrors: (val: boolean) => void;
}

export const DiagramContext = createContext<DiagramContextProps | undefined>(undefined);

interface DiagramProviderProps {
    children: ReactNode;
}

export const DiagramProvider = ({ children }: DiagramProviderProps) => {
    const [graph] = useState(
        () =>
            new dia.Graph({}, {
                cellNamespace: customNamespace
            })
    );
    const [paper, setPaper] = useState<dia.Paper | null>(null);
    const [selectedElement, setSelectedElement] = useState<dia.Cell | null>(null);
    const [isPanning, setIsPanning] = useState(false);
    const [hasFormErrors, setHasFormErrors] = useState<boolean>(false);

    const updateElement = (cell: dia.Cell) => {
        graph.addCell(cell);
    };

    const zoomIn = () => {
        if (paper) {
            const scale = paper.scale().sx + 0.1;
            paper.scale(scale, scale);
        }
    };


    const zoomOut = () => {
        if (paper) {
            const scale = paper.scale().sx - 0.1;
            if (scale > 0.1) {
                paper.scale(scale, scale);
            }
        }
    };

    const fitToView = () => {
        if (paper) {
            paper.scaleContentToFit({
                padding: 20,
            });
        }
    };

    const togglePanning = () => {
        setIsPanning(prev => !prev);
    };

    const removeElement = () => {
        if (selectedElement) {
            graph.removeCells([selectedElement]);
            setSelectedElement(null);
        }
    };

    return (
        <DiagramContext.Provider
            value={{
                graph,
                paper,
                selectedElement,
                setSelectedElement,
                updateElement,
                setPaper,
                zoomIn,
                zoomOut,
                fitToView,
                isPanning,
                removeElement,
                togglePanning,
                hasFormErrors,
                setHasFormErrors,

            }}
        >
            {children}
        </DiagramContext.Provider>
    );
};
