// pages/block-diagram/components/sidebar/sidebar.tsx
// Provides a toolbox with draggable elements for diagram creation

import Image from 'next/image';
import {Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

const Sidebar = () => {
    // Array of available diagram elements with their properties
    // Each element has a type (identifier), label (display name), and associated icon
    const elements = [
        // Logic Gates
        { type: 'and', label: 'AND Gate', img: 'andIcon.svg' },
        { type: 'or', label: 'OR Gate', img: 'orIcon.svg' },
        { type: 'xor', label: 'XOR Gate', img: 'xorIcon.svg' },
        { type: 'xnor', label: 'XNOR Gate', img: 'xnorIcon.svg' },
        { type: 'nand', label: 'NAND Gate', img: 'nandIcon.svg' },
        { type: 'nor', label: 'NOR Gate', img: 'norIcon.svg' },
        { type: 'not', label: 'NOT Gate', img: 'notIcon.svg' },
        
        // Complex Logic Elements
        { type: 'multiplexer', label: 'Multiplexer', img: 'multiplexer_2_ports.svg' },
        { type: 'decoder', label: 'Decoder', img: 'decoder.svg' },
        { type: 'encoder', label: 'Encoder', img: 'encoder.svg' },
        { type: 'alu', label: 'Alu', img: 'alu.svg' },
        { type: 'comp', label: 'Comparator', img: 'comparatorIcon.svg' },
        
        // I/O  Elements
        { type: 'input', label: 'Input Port', img: 'inputPort.svg' },
        { type: 'output', label: 'Output Port', img: 'outputPort.svg' },
        
        // Module and Memory Elements
        { type: 'module', label: 'Module', img: 'module.svg' },
        { type: 'sram', label: 'SRAM', img: 'Sram.svg' },
        { type: 'register', label: 'REGISTER', img: 'Register.svg' },
        
        // bit Operation Elements
        { type: 'splitter', label: 'Splitter', img: 'Splitter.svg' },
        { type: 'combiner', label: 'Combiner', img: 'Combiner.svg' },
    ];

    // CSS classes for styling elements
    const iconItemClass = "flex items-center justify-center p-1.5 min-h-[60px] bg-white border border-gray-300 rounded cursor-grab hover:bg-blue-50 hover:shadow-md dark:bg-gray-800 transition-transform active:cursor-grabbing";
    const svgIconClass = "w-10 h-10";

    // Component for rendering individual element icons with tooltips
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

    // Handle the start of drag operation
    // Sets the element type as drag data for use in the diagram area
    const handleDragStart = (event: React.DragEvent, toolType: string) => {
        event.dataTransfer.setData('toolType', toolType);
    };

    // Render sidebar with grid of draggable elements
    return (
        <div className='h-full overflow-y-auto'>
            <div className='grid grid-cols-2 gap-2 p-1'>
                {elements.map((el) => (
                    <ElementIcon key={`${el.type}-${el.label}`} {...el} />
                ))}
            </div>
        </div>
    );
};

export default Sidebar;
