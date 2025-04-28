// pages/block-diagram/context/use-diagram-context.tsx

import { useContext } from 'react';
import { DiagramContext } from "@/app/[userslug]/[repositoryslug]/block-diagram/context/diagram-context";

export const useDiagramContext = () => {
    const context = useContext(DiagramContext);
    if (!context) {
        throw new Error('useDiagramContext will be inside DiagramProvider');
    }
    return context;
};
