// pages/diagram-test/context/useDiagramContext.tsx

import { useContext } from 'react';
import { DiagramContext } from './DiagramContext';

export const useDiagramContext = () => {
    const context = useContext(DiagramContext);
    if (!context) {
        throw new Error('useDiagramContext должен использоваться внутри DiagramProvider');
    }
    return context;
};
