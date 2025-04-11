// pages/diagram-test/components/Sidebar/Sidebar.tsx
import Image from 'next/image';
import React, { useState } from "react";
import {Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

const Sidebar = () => {

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
        { type: 'module', label: 'Module', img: 'module.svg' },
        { type: 'sram', label: 'SRAM', img: 'Sram.svg' },
        { type: 'register', label: 'REGISTER', img: 'Register.svg' },
        { type: 'splitter', label: 'Splitter', img: 'Splitter.svg' },
        { type: 'combiner', label: 'Combiner', img: 'Combiner.svg' },
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
    // { createShape1, createShape2 } = useBlockDiagrams()
    // Button - onDragStart, onClick{() => createSpecificShape}





    const handleWidthChange = (newWidth: number) => {
        setGridColumns(calculateGridColumns(newWidth));
    };

    const handleDragStart = (event: React.DragEvent, toolType: string) => {
        event.dataTransfer.setData('toolType', toolType);
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
        <div className={iconListStyle}>
            {elements.map((el) => (
                <ElementIcon key={`${el.type}-${el.label}`} {...el} />
            ))}
        </div>
    );

};

export default Sidebar;
