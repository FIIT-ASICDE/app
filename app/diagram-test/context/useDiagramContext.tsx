// pages/diagram-test/context/useDiagramContext.tsx

import { useContext } from 'react';
import { DiagramContext } from "@/app/diagram-test/context/DiagramContext";

export const useDiagramContext = () => {
    const context = useContext(DiagramContext);
    if (!context) {
        throw new Error('useDiagramContext will be inside DiagramProvider');
    }
    return context;
};
