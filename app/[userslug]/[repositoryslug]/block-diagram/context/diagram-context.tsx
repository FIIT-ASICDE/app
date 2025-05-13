// pages/block-diagram/context/diagram-context.tsx

// Context provider for managing the block diagram editor state and functionality

import React, { createContext, useState, ReactNode, useEffect } from "react";
import { dia, shapes } from "@joint/core";
import { Repository, FileDisplayItem, RepositoryItem } from "@/lib/types/repository";
import { UnifiedPackage, ParsedModule } from "@/app/[userslug]/[repositoryslug]/block-diagram/utils/diagram-generation/interfaces";

// Type definition for supported HDL languages
export type LanguageOption = "SystemVerilog" | "VHDL";

// Interface defining all available context properties and methods
interface DiagramContextProps {
    graph: dia.Graph;                    // JointJS graph instance
    paper: dia.Paper | null;             // JointJS paper (rendering surface)
    selectedElement: dia.Cell | null;    // Currently selected diagram element
    setSelectedElement: (cell: dia.Cell | null) => void;  // Update selected element
    updateElement: (cell: dia.Cell) => void;              // Update element in graph
    setPaper: (paper: dia.Paper | null) => void;          // Set paper instance
    zoomIn: () => void;                  // Zoom in diagram view
    zoomOut: () => void;                 // Zoom out diagram view
    fitToView: () => void;               // Fit diagram to view
    removeElement: () => void;           // Remove selected element
    hasFormErrors: boolean;              // Form validation state
    setHasFormErrors: (val: boolean) => void;  // Update form validation state
    repository: Repository;              // Current repository information
    activeFile: FileDisplayItem;         // Currently active file
    tree: RepositoryItem[];             // Repository file tree
    setTree: React.Dispatch<React.SetStateAction<RepositoryItem[]>>;  // Update file tree
    selectedLanguage: LanguageOption;    // Selected HDL language
    setSelectedLanguage: (lang: LanguageOption) => void;  // Update selected language
    parseResults: UnifiedPackage[];      // Parsed package/struct results
    setParseResults: (parseResults: UnifiedPackage[]) => void;  // Update parsed results
    parseModulesResults: ParsedModule[]; // Parsed module results
    setParseModulesResults: (parseModulesResults: ParsedModule[]) => void;  // Update parsed modules
    checkLanguageLock: () => boolean;    // Check if language selection is locked
}

// Create context with undefined initial value
export const DiagramContext = createContext<DiagramContextProps | undefined>(undefined);

// Props interface for DiagramProvider component
interface DiagramProviderProps {
    children: ReactNode;
    repository: Repository;
    activeFile: FileDisplayItem;
    tree: RepositoryItem[];
    setTree: React.Dispatch<React.SetStateAction<RepositoryItem[]>>;
}

// Main context provider component
export const DiagramProvider = ({ children, repository, activeFile, tree, setTree }: DiagramProviderProps) => {
    // Initialize JointJS graph 
    const [graph] = useState(() =>
        new dia.Graph({}, { cellNamespace: { standard: shapes.standard } })
    );

    // State management for diagram editor
    const [paper, setPaper] = useState<dia.Paper | null>(null);
    const [selectedElement, setSelectedElement] = useState<dia.Cell | null>(null);
    const [hasFormErrors, setHasFormErrors] = useState<boolean>(false);
    const [selectedLanguage, setSelectedLanguage] = useState<LanguageOption>("SystemVerilog");
    const [parseResults, setParseResults] = useState<UnifiedPackage[]>([]);
    const [parseModulesResults, setParseModulesResults] = useState<ParsedModule[]>([]);

    // Add or update element in the graph
    const updateElement = (cell: dia.Cell) => {
        graph.addCell(cell);
    };

    // Zoom in the diagram view by 0.1 scale factor
    const zoomIn = () => {
        if (paper) {
            const scale = paper.scale().sx + 0.1;
            paper.scale(scale, scale);
        }
    };

    // Zoom out the diagram view by 0.1 scale factor
    const zoomOut = () => {
        if (paper) {
            const scale = paper.scale().sx - 0.1;
            if (scale > 0.1) {  // Prevent zooming out too far
                paper.scale(scale, scale);
            }
        }
    };

    // Fit diagram content to view with padding
    const fitToView = () => {
        if (paper) {
            paper.scaleContentToFit({
                padding: 20,
            });
        }
    };

    // Remove selected element from the diagram
    const removeElement = () => {
        if (selectedElement) {
            graph.removeCells([selectedElement]);
            setSelectedElement(null);
        }
    };

    // Check and manage language lock based on existing elements
    const checkLanguageLock = (): boolean => {
        const cells = graph.getCells();
        const languageSet = new Set<string>();

        // Check elements that can have language property
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

        // Determine language lock state
        if (languageSet.size === 1) {
            const lang = languageSet.has("VHDL") ? "VHDL" : "SystemVerilog";
            setSelectedLanguage(lang);
            return true; // locked to single language
        } else if (languageSet.size > 1) {
            const lang = languageSet.has("SystemVerilog") ? "SystemVerilog" : "VHDL";
            setSelectedLanguage(lang);
            return true; // locked due to multiple languages
        } else {
            setSelectedLanguage("SystemVerilog");
            return false; // not locked, default to SystemVerilog
        }
    }

    // Check language lock when graph changes
    useEffect(() => {
        checkLanguageLock();
    }, [graph]);

    // Provide context values to children components
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
