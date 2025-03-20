// pages/diagram-test/components/Sidebar/Sidebar.tsx
import Image from 'next/image';
import React, { useRef, useState } from "react";
import {
    FaSearchPlus,
    FaSearchMinus,
    FaExpand,
    FaSave,
    FaFolderOpen,
    FaCode,
    FaBars,
    FaTools,
    FaRegFileCode
} from 'react-icons/fa';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { useDiagramContext } from '../../context/useDiagramContext';
import { generateSystemVerilogCode } from '../../utils/CodeGeneration/SystemVerilogGeneration/SystemVerilogCodeGenerator';
import { generateVHDLCode } from '../../utils/CodeGeneration/VHDLGeneration/VDHLCodeGenerator';
import ResizablePanel from '../common/ResizablePanel';
import styles from './Sidebar.module.css';

const Sidebar = () => {
    const { zoomIn, zoomOut, fitToView, graph } = useDiagramContext();
    const [isElementsCollapsed, setIsElementsCollapsed] = useState(true);
    const [isSaveLoadCollapsed, setIsSaveLoadCollapsed] = useState(true);
    const [isActionsCollapsed, setIsActionsCollapsed] = useState(true);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [gridColumns, setGridColumns] = useState(3);

    const calculateGridColumns = (width: number) => {
        if (width < 200) return 1;
        if (width < 350) return 2;
        if (width < 450) return 3;
        return 4;
    };

    const iconListStyle = {
        display: 'grid',
        gridTemplateColumns: `repeat(${gridColumns}, 1fr)`,
        gap: '8px',
        padding: '4px'
    };

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
            className={styles.sidebar}
            onWidthChange={handleWidthChange}
            direction="right"
        >
            {/* Logic Elements Group */}
            <div>
                <div className={styles.groupHeader} onClick={() => setIsElementsCollapsed(!isElementsCollapsed)}>
                    <FaTools className={styles.collapseIcon} />
                    <h3>Elements</h3>
                    <FaBars className={styles.toggleIcon} />
                </div>
                {!isElementsCollapsed && (
                    <div style={iconListStyle}>
                        <Tippy content="AND Gate" placement="right" delay={[500, 0]}>
                            <div
                                className={styles.iconItem}
                                draggable
                                onDragStart={(e) => handleDragStart(e, 'and')}
                            >
                                <Image
                                    src="/images/svg/andIcon.svg"
                                    alt="AND Gate"
                                    className={styles.svgIcon}
                                    width={40}
                                    height={40}
                                />
                            </div>
                        </Tippy>
                        <Tippy content="OR Gate" placement="right" delay={[500, 0]}>
                            <div
                                className={styles.iconItem}
                                draggable
                                onDragStart={(e) => handleDragStart(e, 'or')}
                            >
                                <Image
                                    src="/images/svg/orIcon.svg"
                                    alt="OR Gate"
                                    className={styles.svgIcon}
                                    width={40}
                                    height={40}
                                />
                            </div>
                        </Tippy>
                        <Tippy content="XOR Gate" placement="right" delay={[500, 0]}>
                            <div
                                className={styles.iconItem}
                                draggable
                                onDragStart={(e) => handleDragStart(e, 'xor')}
                            >
                                <Image
                                    src="/images/svg/xorIcon.svg"
                                    alt="XOR Gate"
                                    className={styles.svgIcon}
                                    width={40}
                                    height={40}
                                />
                            </div>
                        </Tippy>
                        <Tippy content="XNOR Gate" placement="right" delay={[500, 0]}>
                            <div
                                className={styles.iconItem}
                                draggable
                                onDragStart={(e) => handleDragStart(e, 'xnor')}
                            >
                                <Image
                                    src="/images/svg/xnorIcon.svg"
                                    alt="XNOR Gate"
                                    className={styles.svgIcon}
                                    width={40}
                                    height={40}
                                />
                            </div>
                        </Tippy>
                        <Tippy content="NAND Gate" placement="right" delay={[500, 0]}>
                            <div
                                className={styles.iconItem}
                                draggable
                                onDragStart={(e) => handleDragStart(e, 'nand')}
                            >
                                <Image
                                    src="/images/svg/nandIcon.svg"
                                    alt="NAND Gate"
                                    className={styles.svgIcon}
                                    width={40}
                                    height={40}
                                />
                            </div>
                        </Tippy>
                        <Tippy content="NOR Gate" placement="right" delay={[500, 0]}>
                            <div
                                className={styles.iconItem}
                                draggable
                                onDragStart={(e) => handleDragStart(e, 'nor')}
                            >
                                <Image
                                    src="/images/svg/norIcon.svg"
                                    alt="NOR Gate"
                                    className={styles.svgIcon}
                                    width={40}
                                    height={40}
                                />
                            </div>
                        </Tippy>
                        <Tippy content="NOT Gate" placement="right" delay={[500, 0]}>
                            <div
                                className={styles.iconItem}
                                draggable
                                onDragStart={(e) => handleDragStart(e, 'not')}
                            >
                                <Image
                                    src="/images/svg/notIcon.svg"
                                    alt="NOT Gate"
                                    className={styles.svgIcon}
                                    width={40}
                                    height={40}
                                />
                            </div>
                        </Tippy>
                        {/* Complex Logic Elements Group */}
                        <Tippy content="Multiplexer" placement="right" delay={[500, 0]}>
                            <div
                                className={styles.iconItem}
                                draggable
                                onDragStart={(e) => handleDragStart(e, 'multiplexer')}
                            >
                                <Image
                                    src="/images/svg/multiplexer_2_ports.svg"
                                    alt="Multiplexer"
                                    className={styles.svgIcon}
                                    width={40}
                                    height={40}
                                />
                            </div>
                        </Tippy>
                        <Tippy content="Decoder" placement="right" delay={[500, 0]}>
                            <div
                                className={styles.iconItem}
                                draggable
                                onDragStart={(e) => handleDragStart(e, 'decoder')}
                            >
                                <Image
                                    src="/images/svg/decoder.svg"
                                    alt="Decoder"
                                    className={styles.svgIcon}
                                    width={40}
                                    height={40}
                                />
                            </div>
                        </Tippy>
                        <Tippy content="Encoder" placement="right" delay={[500, 0]}>
                            <div
                                className={styles.iconItem}
                                draggable
                                onDragStart={(e) => handleDragStart(e, 'encoder')}
                            >
                                <Image
                                    src="/images/svg/encoder.svg"
                                    alt="Encoder"
                                    className={styles.svgIcon}
                                    width={40}
                                    height={40}
                                />
                            </div>
                        </Tippy>
                        <Tippy content="Alu" placement="right" delay={[500, 0]}>
                            <div
                                className={styles.iconItem}
                                draggable
                                onDragStart={(e) => handleDragStart(e, 'alu')}
                            >
                                <Image
                                    src="/images/svg/adderIcon.svg"
                                    alt="Alu"
                                    className={styles.svgIcon}
                                    width={40}
                                    height={40}
                                />
                            </div>
                        </Tippy>
                        <Tippy content="Comparator" placement="right" delay={[500, 0]}>
                            <div
                                className={styles.iconItem}
                                draggable
                                onDragStart={(e) => handleDragStart(e, 'comp')}
                            >
                                <Image
                                    src="/images/svg/comparatorIcon.svg"
                                    alt="Comparator"
                                    className={styles.svgIcon}
                                    width={40}
                                    height={40}
                                />
                            </div>
                        </Tippy>
                        {/* I/O Elements Group */}
                        <Tippy content="Input Port" placement="right" delay={[500, 0]}>
                            <div
                                className={styles.iconItem}
                                draggable
                                onDragStart={(e) => handleDragStart(e, 'input')}
                            >
                                <Image
                                    src="/images/svg/inputPort.svg"
                                    alt="Input Port"
                                    className={styles.svgIcon}
                                    width={40}
                                    height={40}

                                />
                            </div>
                        </Tippy>
                        <Tippy content="Output Port" placement="right" delay={[500, 0]}>
                            <div
                                className={styles.iconItem}
                                draggable
                                onDragStart={(e) => handleDragStart(e, 'output')}
                            >
                                <Image
                                    src="/images/svg/outputPort.svg"
                                    alt="Output Port"
                                    className={styles.svgIcon}
                                    width={40}
                                    height={40}
                                />
                            </div>
                        </Tippy>
                        {/* Module Group */}
                        <Tippy content="New Module" placement="right" delay={[500, 0]}>
                            <div
                                className={styles.iconItem}
                                draggable
                                onDragStart={(e) => handleDragStart(e, 'newModule')}
                            >
                                <Image
                                    src="/images/svg/NewModule.svg"
                                    alt="New Module"
                                    className={styles.svgIcon}
                                    width={40}
                                    height={40}
                                />
                            </div>
                        </Tippy>
                        <Tippy content="Existing Module" placement="right" delay={[500, 0]}>
                            <div
                                className={styles.iconItem}
                                draggable
                                onDragStart={(e) => handleDragStart(e, 'newModule')}
                            >
                                <Image
                                    src="/images/svg/ExistingModule.svg"
                                    alt="Existing Module"
                                    className={styles.svgIcon}
                                    width={40}
                                    height={40}
                                />
                            </div>
                        </Tippy>
                        {/* Memory Group */}
                        <Tippy content="SRAM" placement="right" delay={[500, 0]}>
                            <div
                                className={styles.iconItem}
                                draggable
                                onDragStart={(e) => handleDragStart(e, 'ram')}
                            >
                                <Image
                                    src="/images/svg/Ram.svg"
                                    alt="SRAM"
                                    className={styles.svgIcon}
                                    width={40}
                                    height={40}
                                />
                            </div>
                        </Tippy>
                        <Tippy content="REGISTER" placement="right" delay={[500, 0]}>
                            <div
                                className={styles.iconItem}
                                draggable
                                onDragStart={(e) => handleDragStart(e, 'register')}
                            >
                                <Image
                                    src="/images/svg/Register.svg"
                                    alt="REGISTER"
                                    className={styles.svgIcon}
                                    width={40}
                                    height={40}
                                />
                            </div>
                        </Tippy>
                        {/* Bit Operations Group */}
                        <Tippy content="Bit Select" placement="right" delay={[500, 0]}>
                            <div
                                className={styles.iconItem}
                                draggable
                                onDragStart={(e) => handleDragStart(e, 'bitSelect')}
                            >
                                <Image
                                    src="/images/svg/BitSelect.svg"
                                    alt="Bit Select"
                                    className={styles.svgIcon}
                                    width={40}
                                    height={40}
                                />
                            </div>
                        </Tippy>
                        <Tippy content="Bit Combine" placement="right" delay={[500, 0]}>
                            <div
                                className={styles.iconItem}
                                draggable
                                onDragStart={(e) => handleDragStart(e, 'bitCombine')}
                            >
                                <Image
                                    src="/images/svg/BitCombine.svg"
                                    alt="Bit Combine"
                                    className={styles.svgIcon}
                                    width={40}
                                    height={40}
                                />
                            </div>
                        </Tippy>
                    </div>
                )}
            </div>

            {/* Paper Actions Group */}
            <div>
                <div className={styles.groupHeader} onClick={() => setIsActionsCollapsed(!isActionsCollapsed)}>
                    <FaExpand className={styles.collapseIcon} />
                    <h3>Paper Actions</h3>
                    <FaBars className={styles.toggleIcon} />
                </div>
                {!isActionsCollapsed && (
                    <div style={iconListStyle}>
                        <Tippy content="Zoom In" placement="right" delay={[500, 0]}>
                            <div
                                className={styles.iconItem}
                                onClick={zoomIn}
                            >
                                <FaSearchPlus size={24} />
                            </div>
                        </Tippy>
                        <Tippy content="Zoom Out" placement="right" delay={[500, 0]}>
                            <div
                                className={styles.iconItem}
                                onClick={zoomOut}
                            >
                                <FaSearchMinus size={24} />
                            </div>
                        </Tippy>
                        <Tippy content="Fit to View" placement="right" delay={[500, 0]}>
                            <div
                                className={styles.iconItem}
                                onClick={fitToView}
                            >
                                <FaExpand size={24} />
                            </div>
                        </Tippy>
                    </div>
                )}
            </div>

            {/* Save & Load Group */}
            <div>
                <div className={styles.groupHeader} onClick={() => setIsSaveLoadCollapsed(!isSaveLoadCollapsed)}>
                    <FaRegFileCode className={styles.collapseIcon} />
                    <h3>Generate</h3>
                    <FaBars className={styles.toggleIcon} />
                </div>
                {!isSaveLoadCollapsed && (
                    <div style={iconListStyle}>
                        <Tippy content="Generate SystemVerilog Code" placement="right" delay={[500, 0]}>
                            <div
                                className={styles.iconItem}

                                onClick={handleGenerateSystemVerilogCode}
                            >
                                <FaCode size={24} />
                                <span>Generate SystemVerilog Code</span>
                            </div>
                        </Tippy>
                        <Tippy content="Generate VHDL Code" placement="right" delay={[500, 0]}>
                            <div
                                className={styles.iconItem}

                                onClick={handleGenerateVHDLCode}
                            >
                                <FaCode size={24} />
                                <span>Generate VHDL Code</span>
                            </div>
                        </Tippy>
                        <Tippy content="Save Diagram" placement="right" delay={[500, 0]}>
                            <div className={styles.iconItem} onClick={handleSaveDiagram}>
                                <FaSave size={24} />
                                <span>Save Diagram</span>
                            </div>
                        </Tippy>
                        <Tippy content="Load Diagram" placement="right" delay={[500, 0]}>
                            <div className={styles.iconItem} onClick={triggerLoadDiagram}>
                                <FaFolderOpen size={24} />
                                <span>Load Diagram</span>
                            </div>
                        </Tippy>
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
