import React, { useState, useEffect } from 'react';
import { useDiagramContext } from "@/app/diagram-test/context/useDiagramContext";
import { Code, Expand } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { api } from "@/lib/trpc/react";
import type { FileDisplayItem } from "@/lib/types/repository";
import {
    generateSystemVerilogCode
} from "@/app/diagram-test/utils/CodeGeneration/SystemVerilogGeneration/SystemVerilogCodeGenerator";
import { generateVHDLCode } from "@/app/diagram-test/utils/CodeGeneration/VHDLGeneration/VDHLCodeGenerator";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";


const PaperToolbar: React.FC = () => {
    const [zoomValue, setZoomValue] = useState(0);
    const { paper, fitToView, graph, repository, activeFile, tree, setTree, selectedLanguage } = useDiagramContext();

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

    const saveFileMutation = api.repo.saveFileContent.useMutation();

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

    const saveCodeToRepo = (ext: string, generator: typeof generateSystemVerilogCode | typeof generateVHDLCode, language: string) => {
        if (!repository || !activeFile) return;

        const code = generator(graph);
        const fileName = activeFile.name.replace(/\.bd$/, `.${ext}`);
        const filePath = activeFile.absolutePath.replace(/[^/]+$/, fileName);

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


    const handleGenerateCode = () => {
        if (selectedLanguage === "SystemVerilog") {
            saveCodeToRepo("sv", generateSystemVerilogCode, "system verilog");
        } else {
            saveCodeToRepo("vhd", generateVHDLCode, "vhdl");
        }
    };

    const tooltipText = selectedLanguage === "SystemVerilog" ? "Generate SystemVerilog Code" : "Generate VHDL Code";


    return (
        <div className="flex items-center gap-2 px-2 py-1 h-10 border-b bg-white dark:bg-black shadow-sm">
            <div className="flex items-center gap-2 min-w-[140px]">
                <span className="text-xs text-muted-foreground w-[40px] text-right">{displayZoom()}</span>
                <input
                    type="range"
                    min="-100"
                    max="100"
                    step="5"
                    value={zoomValue}
                    onChange={handleZoomChange}
                    className="flex-1 h-1 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                />
            </div>

            <div className="border-r h-4 mx-2" />

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
