// pages/diagram-test/context/DiagramContext.tsx

import React, { createContext, useState, ReactNode } from 'react';
import { dia, shapes } from "@joint/core";
import { Repository, FileDisplayItem, RepositoryItem } from "@/lib/types/repository";


export type LanguageOption = "SystemVerilog" | "VHDL";

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
    removeElement: () => void;
    hasFormErrors: boolean;
    setHasFormErrors: (val: boolean) => void;
    repository: Repository;
    activeFile: FileDisplayItem;
    tree: RepositoryItem[];
    setTree: React.Dispatch<React.SetStateAction<RepositoryItem[]>>;
    selectedLanguage: LanguageOption;
    setSelectedLanguage: (lang: LanguageOption) => void;
}

export const DiagramContext = createContext<DiagramContextProps | undefined>(undefined);

interface DiagramProviderProps {
    children: ReactNode;
    repository: Repository;
    activeFile: FileDisplayItem;
    tree: RepositoryItem[];
    setTree: React.Dispatch<React.SetStateAction<RepositoryItem[]>>;
}

export const DiagramProvider = ({ children, repository, activeFile, tree, setTree }: DiagramProviderProps) => {
    const [graph] = useState(() =>
        new dia.Graph({}, { cellNamespace: { standard: shapes.standard } })
    );
    const [paper, setPaper] = useState<dia.Paper | null>(null);
    const [selectedElement, setSelectedElement] = useState<dia.Cell | null>(null);
    const [hasFormErrors, setHasFormErrors] = useState<boolean>(false);
    const [selectedLanguage, setSelectedLanguage] = useState<LanguageOption>("SystemVerilog");

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
                removeElement,
                hasFormErrors,
                setHasFormErrors,
                repository,
                activeFile,
                tree,
                setTree,
                selectedLanguage,
                setSelectedLanguage
            }}
        >
            {children}
        </DiagramContext.Provider>
    );
};
