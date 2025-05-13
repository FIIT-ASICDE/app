// Component for managing diagram paper controls including zoom, fit-to-view,
// and code generation functionality
import React, { useState, useEffect } from 'react';
import { useDiagramContext } from "@/app/[userslug]/[repositoryslug]/block-diagram/context/use-diagram-context";
import { Code, Expand } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { api } from "@/lib/trpc/react";
import type { FileDisplayItem } from "@/lib/types/repository";
import {
    generateSystemVerilogCode
} from "@/app/[userslug]/[repositoryslug]/block-diagram/utils/code-generation/system-verilog-generation/system-verilog-code-generator";
import { generateVHDLCode } from "@/app/[userslug]/[repositoryslug]/block-diagram/utils/code-generation/vhdl-generation/vhdl-code-generator";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

// Main toolbar component for diagram paper controls
const PaperToolbar: React.FC = () => {
    // State for managing zoom level (-100 to 100)
    const [zoomValue, setZoomValue] = useState(0);
    
    // Access diagram context for paper manipulation and file management
    const { paper, fitToView, graph, repository, activeFile, tree, setTree, selectedLanguage } = useDiagramContext();

    // Handle zoom slider changes and update paper scale
    const handleZoomChange = (values: number[]) => {
        const sliderValue = values[0];
        setZoomValue(sliderValue);

        if (paper) {
            // Calculate scale based on slider value:
            // - For negative values: slower scaling (divided by 125)
            // - For positive values: faster scaling (divided by 25)
            const scale = sliderValue <= 0
                ? 1 + (sliderValue / 125)
                : 1 + (sliderValue / 25);
            paper.scale(scale, scale);
        }
    };

    // Sync zoom slider with paper's current scale on initialization
    useEffect(() => {
        if (paper) {
            const currentScale = paper.scale().sx;
            let sliderValue: number;
            // Convert current scale back to slider value
            if (currentScale <= 1) {
                sliderValue = (currentScale - 1) * 125;
            } else {
                sliderValue = (currentScale - 1) * 25;
            }
            setZoomValue(sliderValue);
        }
    }, [paper]);

    // Convert current zoom value to percentage for display
    const displayZoom = () => {
        const scale = zoomValue <= 0
            ? 1 + (zoomValue / 125)
            : 1 + (zoomValue / 25);
        
        return `${Math.round(scale * 100)}%`;
    };

    // TRPC mutation for saving generated code files
    const saveFileMutation = api.repo.saveFileContent.useMutation();

    // Add generated file to the file tree if it doesn't exist
    const addGeneratedFileToTree = (name: string, absolutePath: string, language: string) => {
        const alreadyExists = tree.some(item => item.absolutePath === absolutePath);
        if (!alreadyExists) {
            const newFile: FileDisplayItem = {
                type: "file-display",
                name,
                lastActivity: new Date(),
                language,
                absolutePath,
            };
            setTree([...tree, newFile]);
        }
    };

    // Save generated code to repository with appropriate extension
    const saveCodeToRepo = (ext: string, generator: typeof generateSystemVerilogCode | typeof generateVHDLCode, language: string) => {
        if (!repository || !activeFile) return;

        // Generate file name and path from active block diagram file
        const fileName = activeFile.name.replace(/\.bd$/, `.${ext}`);
        const moduleName = activeFile.name.replace(/\.bd$/, '');
        const filePath = activeFile.absolutePath.replace(/[^/]+$/, fileName);
        
        // Generate code using appropriate generator
        const code = generator(graph, moduleName);

        // Save file and update UI
        saveFileMutation.mutate({
            repoId: repository.id,
            path: filePath,
            content: code,
        }, {
            onSuccess: () => {
                toast.success(`${ext.toUpperCase()} file saved`);
                addGeneratedFileToTree(fileName, filePath, language);
            },
            onError: (err) => toast.error("Failed to save file: " + err.message),
        });
    };

    // Handle code generation based on selected language
    const handleGenerateCode = () => {
        if (selectedLanguage === "SystemVerilog") {
            saveCodeToRepo("sv", generateSystemVerilogCode, "system verilog");
        } else {
            saveCodeToRepo("vhd", generateVHDLCode, "vhdl");
        }
    };

    // Dynamic tooltip text based on selected language
    const tooltipText = selectedLanguage === "SystemVerilog" ? "Generate SystemVerilog Code" : "Generate VHDL Code";

    // Render toolbar with zoom controls and action buttons
    return (
        <div className="flex items-center gap-2 px-2 py-1 h-10 border-b bg-white dark:bg-black shadow-sm">
            {/* Zoom control section */}
            <div className="flex items-center gap-2 min-w-[140px]">
                <span className="text-xs text-muted-foreground w-[40px] text-right">{displayZoom()}</span>
                <Slider
                    value={[zoomValue]}
                    min={-100}
                    max={100}
                    step={5}
                    onValueChange={handleZoomChange}
                    className="flex-1"
                />
            </div>

            <div className="border-r h-4 mx-2" />

            {/* Fit to view button */}
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" onClick={fitToView} title="Fit to View">
                        <Expand className="h-4 w-4" />
                    </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                    Fit To View
                </TooltipContent>
            </Tooltip>

            {/* Code generation button */}
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        variant="secondary"
                        size="sm"
                        onClick={handleGenerateCode}
                        className="px-3 py-1 h-8 text-xs"
                    >
                        <Code className="w-4 h-4" />
                        <span>Generate Code</span>
                    </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                    {tooltipText}
                </TooltipContent>
            </Tooltip>
        </div>
    );
};

export default PaperToolbar;
