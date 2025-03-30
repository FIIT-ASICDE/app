// pages/diagram-test/components/Sidebar/Sidebar.tsx
import Image from 'next/image';
import React, { useRef, useState } from "react";
import {ArrowDownToLine, FolderOpen, Code, Menu, Frame, FileCode} from 'lucide-react'
import {Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { useDiagramContext } from "@/app/diagram-test/context/useDiagramContext";
import { generateSystemVerilogCode } from "@/app/diagram-test/utils/CodeGeneration/SystemVerilogGeneration/SystemVerilogCodeGenerator";
import { generateVHDLCode } from "@/app/diagram-test/utils/CodeGeneration/VHDLGeneration/VDHLCodeGenerator";
import ResizablePanel from '@/app/diagram-test/components/common/ResizablePanel';

const Sidebar = () => {
    const { graph } = useDiagramContext();
    const [isElementsCollapsed, setIsElementsCollapsed] = useState(true);
    const [isSaveLoadCollapsed, setIsSaveLoadCollapsed] = useState(true);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [gridColumns, setGridColumns] = useState(3);

    const getGridColsClass = (cols: number) => {
        switch (cols) {
            case 1:
                return "grid-cols-1";
            case 2:
                return "grid-cols-2";
            case 3:
                return "grid-cols-3";
            case 4:
                return "grid-cols-4";
            default:
                return "grid-cols-3"; // fallback
        }
    };
    const calculateGridColumns = (width: number) => {
        if (width < 200) return 1;
        if (width < 350) return 2;
        if (width < 450) return 3;
        return 4;
    };

    const iconListStyle = `grid ${getGridColsClass(gridColumns)} gap-2 p-1`;

    const elements = [
        { type: 'and', label: 'AND Gate', img: 'andIcon.svg' },
        { type: 'or', label: 'OR Gate', img: 'orIcon.svg' },
        { type: 'xor', label: 'XOR Gate', img: 'xorIcon.svg' },
        { type: 'xnor', label: 'XNOR Gate', img: 'xnorIcon.svg' },
        { type: 'nand', label: 'NAND Gate', img: 'nandIcon.svg' },
        { type: 'nor', label: 'NOR Gate', img: 'norIcon.svg' },
        { type: 'not', label: 'NOT Gate', img: 'notIcon.svg' },
        { type: 'multiplexer', label: 'Multiplexer', img: 'multiplexer_2_ports.svg' },
        { type: 'decoder', label: 'Decoder', img: 'decoder.svg' },
        { type: 'encoder', label: 'Encoder', img: 'encoder.svg' },
        { type: 'alu', label: 'Alu', img: 'alu.svg' },
        { type: 'comp', label: 'Comparator', img: 'comparatorIcon.svg' },
        { type: 'input', label: 'Input Port', img: 'inputPort.svg' },
        { type: 'output', label: 'Output Port', img: 'outputPort.svg' },
        { type: 'newModule', label: 'New Module', img: 'NewModule.svg' },
        { type: 'newModule', label: 'Existing Module', img: 'ExistingModule.svg' },
        { type: 'sram', label: 'SRAM', img: 'Sram.svg' },
        { type: 'register', label: 'REGISTER', img: 'Register.svg' },
        { type: 'splitter', label: 'Splitter', img: 'Splitter.svg' },
        { type: 'combiner', label: 'Combiner', img: 'Combiner.svg' },
    ];

    const saveLoadActions = [
        {
            icon: <Code size={24} />,
            label: "Generate SystemVerilog Code",
            action: () => handleGenerateSystemVerilogCode(),
            text: "Generate SystemVerilog Code"
        },
        {
            icon: <Code size={24} />,
            label: "Generate VHDL Code",
            action: () => handleGenerateVHDLCode(),
            text: "Generate VHDL Code"
        },
        {
            icon: <ArrowDownToLine size={24} />,
            label: "Save Diagram",
            action: () => handleSaveDiagram(),
            text: "Save Diagram"
        },
        {
            icon: <FolderOpen size={24} />,
            label: "Load Diagram",
            action: () => triggerLoadDiagram(),
            text: "Load Diagram"
        },
    ];
    const iconItemClass = "flex items-center justify-center p-1.5 min-h-[60px] bg-white border border-gray-300 rounded cursor-grab hover:bg-blue-50 hover:shadow-md transition-transform active:cursor-grabbing";
    const svgIconClass = "w-10 h-auto";

    const ElementIcon = ({ type, label, img }: { type: string; label: string; img: string }) => (
        <Tooltip>
            <TooltipTrigger asChild>
                <div
                    className={iconItemClass}
                    draggable
                    onDragStart={(e) => handleDragStart(e, type)}
                >
                    <Image
                        src={`/images/svg/${img}`}
                        alt={label}
                        className={svgIconClass}
                        width={40}
                        height={40}
                    />
                </div>
            </TooltipTrigger>
            <TooltipContent side="right">
                {label}
            </TooltipContent>
        </Tooltip>
    );


    const SaveLoadIcon = ({ icon, label, action, text }: { icon: React.JSX.Element; label: string; action: () => void, text: string }) => (
        <Tooltip>
            <TooltipTrigger asChild>
                <div
                    className={`${iconItemClass} space-x-2`}
                    onClick={action}
                >
                    {icon}
                    <span className="text-sm text-gray-800">{text}</span>
                </div>
            </TooltipTrigger>
            <TooltipContent side="right">
                {label}
            </TooltipContent>
        </Tooltip>
    );



    const handleWidthChange = (newWidth: number) => {
        setGridColumns(calculateGridColumns(newWidth));
    };

    const handleDragStart = (event: React.DragEvent, toolType: string) => {
        event.dataTransfer.setData('toolType', toolType);
    };


    const handleGenerateSystemVerilogCode = () => {
        const code = generateSystemVerilogCode(graph);
        const blob = new Blob([code], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'diagram.sv';
        a.click();
        URL.revokeObjectURL(url);
    };
    const handleGenerateVHDLCode = () => {
        const code = generateVHDLCode(graph);
        const blob = new Blob([code], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'diagram.vhd';
        a.click();
        URL.revokeObjectURL(url);
    };

    const handleSaveDiagram = () => {
        const diagramJSON = JSON.stringify(graph.toJSON(), null, 2);
        const blob = new Blob([diagramJSON], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'diagram.json';
        a.click();
        URL.revokeObjectURL(url);
    };

    const handleLoadDiagram = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const json = JSON.parse(event.target?.result as string);
                    graph.fromJSON(json);
                } catch(e) {
                    alert("Error parsing file");
                    console.log(e);
                }
            };
            reader.readAsText(file);
        }
    };

    const triggerLoadDiagram = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };


    return (
        <ResizablePanel
            className="bg-[#f6f6f6] text-[#333] p-2 box-border flex flex-col h-screen overflow-y-auto relative scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100"
            onWidthChange={handleWidthChange}
            direction="right"
        >
            {/* Logic Elements Group */}
            <div>
                <div className="flex items-center justify-between p-2 bg-blue-100 border border-blue-200 rounded hover:bg-blue-200 cursor-pointer" onClick={() => setIsElementsCollapsed(!isElementsCollapsed)}>
                    <Frame className="flex items-center gap-2" />
                    <h3>Elements</h3>
                    <Menu className="flex items-center gap-2" />
                </div>
                {!isElementsCollapsed && (
                    <div className={iconListStyle}>
                        {elements.map((el) => (
                            <ElementIcon key={`${el.type}-${el.label}`} {...el} />
                        ))}
                    </div>
                )}
            </div>

            {/* Save & Load Group */}
            <div>
                <div className="flex items-center justify-between p-2 bg-blue-100 border border-blue-200 rounded hover:bg-blue-200 cursor-pointer" onClick={() => setIsSaveLoadCollapsed(!isSaveLoadCollapsed)}>
                    <FileCode className="flex items-center gap-2" />
                    <h3>Generate</h3>
                    <Menu className="flex items-center gap-2" />
                </div>
                {!isSaveLoadCollapsed && (
                    <div className={iconListStyle}>
                        {saveLoadActions.map((el) => (
                            <SaveLoadIcon key={el.label} {...el} />
                        ))}
                        {/* Hidder input for loading */}
                        <input
                            type="file"
                            accept=".json"
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            onChange={handleLoadDiagram}
                        />
                    </div>
                )}
            </div>
        </ResizablePanel>

    );

};

export default Sidebar;
