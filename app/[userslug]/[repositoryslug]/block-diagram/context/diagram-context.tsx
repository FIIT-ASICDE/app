// pages/block-diagram/context/diagram-context.tsx

import React, { createContext, useState, ReactNode, useEffect } from "react";
import { dia, shapes } from "@joint/core";
import { Repository, FileDisplayItem, RepositoryItem } from "@/lib/types/repository";
import { UnifiedPackage, ParsedModule } from "@/app/[userslug]/[repositoryslug]/block-diagram/utils/diagram-generation/interfaces";


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
    parseResults:UnifiedPackage[];
    setParseResults: (parseResults: UnifiedPackage[]) => void;
    parseModulesResults: ParsedModule[];
    setParseModulesResults: (parseModulesResults: ParsedModule[]) => void;
    checkLanguageLock: () => boolean;

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
    const [parseResults, setParseResults] = useState<UnifiedPackage[]>([]);
    const [parseModulesResults, setParseModulesResults] = useState<ParsedModule[]>([]);

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

    const checkLanguageLock = (): boolean => {
        const cells = graph.getCells();
        const languageSet = new Set<string>();

        cells.forEach((cell) => {
            const elType = cell.attributes?.elType;
            if (
                elType &&
                ["module", "sram", "register", "input", "output", "splitter", "combiner", "multiplexer"].includes(elType)
            ) {
                const language = cell.attributes?.language;
                if (language) {
                    languageSet.add(language);
                }
            }
        });

        console.log(languageSet);

        if (languageSet.size === 1) {
            const lang = languageSet.has("VHDL") ? "VHDL" : "SystemVerilog";
            setSelectedLanguage(lang);
            return true; // locked
        } else if (languageSet.size > 1) {
            const lang = languageSet.has("SystemVerilog") ? "SystemVerilog" : "VHDL";
            setSelectedLanguage(lang);
            return true; // locked
        } else {
            setSelectedLanguage("SystemVerilog");
            return false; // not locked
        }
    }

    useEffect(() => {
        checkLanguageLock();
    }, [graph]);


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
                setSelectedLanguage,
                parseResults,
                setParseResults,
                parseModulesResults,
                setParseModulesResults,
                checkLanguageLock
            }}
        >
            {children}
        </DiagramContext.Provider>
    );
};
