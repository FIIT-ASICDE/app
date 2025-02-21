// pages/diagram-test/components/Sidebar/Sidebar.tsx

import React, { useRef } from "react";
import {
    FaShapes,
    FaSearchPlus,
    FaSearchMinus,
    FaExpand,
    FaSave,
    FaFolderOpen,
    FaCode,
    FaHandPaper,
    FaBars,
    FaPlug,
    FaTools,
    FaRegFileCode
} from 'react-icons/fa';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // Импорт стилей Tippy
import { useDiagramContext } from '../../context/useDiagramContext';
import { generateSystemVerilogCode } from '../../utils/codeGenerator';
import { saveDiagram, loadDiagram } from '../../utils/diagramStorage';
import styles from './Sidebar.module.css';

const Sidebar = () => {
    const { zoomIn, zoomOut, fitToView, graph, isPanning, togglePanning } = useDiagramContext();
    const [isLogicCollapsed, setIsLogicCollapsed] = React.useState(false);
    const [isIOCollapsed, setIsIOCollapsed] = React.useState(false);
    const [isModulesCollapsed, setIsModulesCollapsed] = React.useState(false);
    const [isToolsCollapsed, setIsToolsCollapsed] = React.useState(false);
    const [isSaveLoadCollapsed, setIsSaveLoadCollapsed] = React.useState(false);
    const [isActionsCollapsed, setIsActionsCollapsed] = React.useState(false);
    const [isComplexLogicCollapsed, setIsComplexLogicCollapsed] = React.useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDragStart = (event: React.DragEvent, toolType: string) => {
        event.dataTransfer.setData('toolType', toolType);
    };

    // const handleSave = async () => {
    //     const code = saveDiagramAsCode(graph);
    //     const name = prompt('Введите имя диаграммы:');
    //     if (name) {
    //         try {
    //             const response = await fetch('/api/saveDiagram', {
    //                 method: 'POST',
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                 },
    //                 body: JSON.stringify({ name, code }),
    //             });
    //             const result = await response.json();
    //             if (response.ok) {
    //                 alert('Диаграмма успешно сохранена');
    //             } else {
    //                 alert(`Ошибка: ${result.error}`);
    //             }
    //         } catch (error) {
    //             alert('Произошла ошибка при сохранении диаграммы');
    //         }
    //     }
    // };
    //
    // const handleLoad = () => {
    //     const code = prompt('Вставьте ваш SystemVerilog код:');
    //     if (code) {
    //         loadCodeToDiagram(code, graph);
    //     }
    // };

    const handleGenerateCode = () => {
        const code = generateSystemVerilogCode(graph);
        // Создаем Blob и ссылку для скачивания
        const blob = new Blob([code], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'diagram.sv';
        a.click();
        URL.revokeObjectURL(url);
    };
    // Сохранение диаграммы в файл
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

    // Обработчик выбора файла для загрузки диаграммы
    const handleLoadDiagram = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const json = JSON.parse(event.target?.result as string);
                    graph.fromJSON(json);
                    alert('Диаграмма загружена');
                } catch (error) {
                    console.error("Error parsing file", error);
                    alert("Ошибка при загрузке диаграммы");
                }
            };
            reader.readAsText(file);
        }
    };

    // Функция для запуска выбора файла
    const triggerLoadDiagram = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handlePanToggle = () => {
        togglePanning();
    };

    return (
        <div className={styles.sidebar}>
            {/* Logic Elements Group */}
            <div className={styles.group}>
                <div className={styles.groupHeader} onClick={() => setIsLogicCollapsed(!isLogicCollapsed)}>
                    <FaPlug className={styles.collapseIcon} />
                    <h3>Logic</h3>
                    <FaBars className={styles.toggleIcon} />
                </div>
                {!isLogicCollapsed && (
                    <div className={styles.iconList}>
                        <Tippy content="AND Gate" placement="right" delay={[500, 0]}>
                            <div
                                className={styles.iconItem}
                                draggable
                                onDragStart={(e) => handleDragStart(e, 'and')}
                            >
                                <img
                                    src="/images/svg/andIcon.svg"
                                    alt="AND Gate"
                                    className={styles.svgIcon}
                                />
                            </div>
                        </Tippy>
                        <Tippy content="OR Gate" placement="right" delay={[500, 0]}>
                            <div
                                className={styles.iconItem}
                                draggable
                                onDragStart={(e) => handleDragStart(e, 'or')}
                            >
                                <img
                                    src="/images/svg/orIcon.svg"
                                    alt="OR Gate"
                                    className={styles.svgIcon}
                                />
                            </div>
                        </Tippy>
                        <Tippy content="XOR Gate" placement="right" delay={[500, 0]}>
                            <div
                                className={styles.iconItem}
                                draggable
                                onDragStart={(e) => handleDragStart(e, 'xor')}
                            >
                                <img
                                    src="/images/svg/xorIcon.svg"
                                    alt="XOR Gate"
                                    className={styles.svgIcon}
                                />
                            </div>
                        </Tippy>
                        <Tippy content="XNOR Gate" placement="right" delay={[500, 0]}>
                            <div
                                className={styles.iconItem}
                                draggable
                                onDragStart={(e) => handleDragStart(e, 'xnor')}
                            >
                                <img
                                    src="/images/svg/xnorIcon.svg"
                                    alt="XNOR Gate"
                                    className={styles.svgIcon}
                                />
                            </div>
                        </Tippy>
                        <Tippy content="NAND Gate" placement="right" delay={[500, 0]}>
                            <div
                                className={styles.iconItem}
                                draggable
                                onDragStart={(e) => handleDragStart(e, 'nand')}
                            >
                                <img
                                    src="/images/svg/nandIcon.svg"
                                    alt="NAND Gate"
                                    className={styles.svgIcon}
                                />
                            </div>
                        </Tippy>
                        <Tippy content="NOR Gate" placement="right" delay={[500, 0]}>
                            <div
                                className={styles.iconItem}
                                draggable
                                onDragStart={(e) => handleDragStart(e, 'nor')}
                            >
                                <img
                                    src="/images/svg/norIcon.svg"
                                    alt="NOR Gate"
                                    className={styles.svgIcon}
                                />
                            </div>
                        </Tippy>
                        <Tippy content="NOT Gate" placement="right" delay={[500, 0]}>
                            <div
                                className={styles.iconItem}
                                draggable
                                onDragStart={(e) => handleDragStart(e, 'not')}
                            >
                                <img
                                    src="/images/svg/notIcon.svg"
                                    alt="NOT Gate"
                                    className={styles.svgIcon}
                                />
                            </div>
                        </Tippy>
                        {/* Добавьте другие логические элементы по мере необходимости */}
                    </div>
                )}
            </div>
            {/* Complex Logic Elements Group */}
            <div className={styles.group}>
                <div className={styles.groupHeader} onClick={() => setIsComplexLogicCollapsed(!isComplexLogicCollapsed)}>
                    <FaPlug className={styles.collapseIcon} />
                    <h3>Complex Logic</h3>
                    <FaBars className={styles.toggleIcon} />
                </div>
                {!isComplexLogicCollapsed && (
                    <div className={styles.iconList}>
                        <Tippy content="Multiplexer" placement="right" delay={[500, 0]}>
                            <div
                                className={styles.iconItem}
                                draggable
                                onDragStart={(e) => handleDragStart(e, 'multiplexer')}
                            >
                                <img
                                    src="/images/svg/multiplexer_2_ports.svg"
                                    alt="Multiplexer"
                                    className={styles.svgIcon}
                                />
                            </div>
                        </Tippy>
                        <Tippy content="Decoder" placement="right" delay={[500, 0]}>
                            <div
                                className={styles.iconItem}
                                draggable
                                onDragStart={(e) => handleDragStart(e, 'decoder')}
                            >
                                <img
                                    src="/images/svg/decoder.svg"
                                    alt="Decoder"
                                    className={styles.svgIcon}
                                />
                            </div>
                        </Tippy>
                        <Tippy content="Encoder" placement="right" delay={[500, 0]}>
                            <div
                                className={styles.iconItem}
                                draggable
                                onDragStart={(e) => handleDragStart(e, 'encoder')}
                            >
                                <img
                                    src="/images/svg/encoder.svg"
                                    alt="Encoder"
                                    className={styles.svgIcon}
                                />
                            </div>
                        </Tippy>
                        <Tippy content="Adder" placement="right" delay={[500, 0]}>
                            <div
                                className={styles.iconItem}
                                draggable
                                onDragStart={(e) => handleDragStart(e, 'adder')}
                            >
                                <img
                                    src="/images/svg/adderIcon.svg"
                                    alt="Adder"
                                    className={styles.svgIcon}
                                />
                            </div>
                        </Tippy>
                        <Tippy content="Subtractor" placement="right" delay={[500, 0]}>
                            <div
                                className={styles.iconItem}
                                draggable
                                onDragStart={(e) => handleDragStart(e, 'sub')}
                            >
                                <img
                                    src="/images/svg/subtractorIcon.svg"
                                    alt="Subtractor"
                                    className={styles.svgIcon}
                                />
                            </div>
                        </Tippy>
                        <Tippy content="Comparator" placement="right" delay={[500, 0]}>
                            <div
                                className={styles.iconItem}
                                draggable
                                onDragStart={(e) => handleDragStart(e, 'comp')}
                            >
                                <img
                                    src="/images/svg/comparatorIcon.svg"
                                    alt="Comparator"
                                    className={styles.svgIcon}
                                />
                            </div>
                        </Tippy>
                    </div>
                )}
            </div>
            {/* I/O Elements Group */}
            <div className={styles.group}>
                <div className={styles.groupHeader} onClick={() => setIsIOCollapsed(!isIOCollapsed)}>
                    <FaPlug className={styles.collapseIcon} />
                    <h3>I/O</h3>
                    <FaBars className={styles.toggleIcon} />
                </div>
                {!isIOCollapsed && (
                    <div className={styles.iconList}>
                        <Tippy content="Input Port" placement="right" delay={[500, 0]}>
                            <div
                                className={styles.iconItem}
                                draggable
                                onDragStart={(e) => handleDragStart(e, 'input')}
                            >
                                <img
                                    src="/images/svg/inputPort.svg"
                                    alt="Input Port"
                                    className={styles.svgIcon}
                                />
                            </div>
                        </Tippy>
                        <Tippy content="Output Port" placement="right" delay={[500, 0]}>
                            <div
                                className={styles.iconItem}
                                draggable
                                onDragStart={(e) => handleDragStart(e, 'output')}
                            >
                                <img
                                    src="/images/svg/outputPort.svg"
                                    alt="Output Port"
                                    className={styles.svgIcon}
                                />
                            </div>
                        </Tippy>
                        {/* Добавьте другие I/O элементы по мере необходимости */}
                    </div>
                )}
            </div>
            {/* Module Group */}
            <div className={styles.group}>
                <div className={styles.groupHeader} onClick={() => setIsModulesCollapsed(!isModulesCollapsed)}>
                    <FaPlug className={styles.collapseIcon} />
                    <h3>I/O</h3>
                    <FaBars className={styles.toggleIcon} />
                </div>
                {!isModulesCollapsed && (
                    <div className={styles.iconList}>
                        <Tippy content="New Module" placement="right" delay={[500, 0]}>
                            <div
                                className={styles.iconItem}
                                draggable
                                onDragStart={(e) => handleDragStart(e, 'newModule')}
                            >
                                <img
                                    src="/images/svg/NewModule.svg"
                                    alt="New Module"
                                    className={styles.svgIcon}
                                />
                            </div>
                        </Tippy>
                        <Tippy content="Existing Module" placement="right" delay={[500, 0]}>
                            <div
                                className={styles.iconItem}
                                draggable
                                onDragStart={(e) => handleDragStart(e, 'newModule')}
                            >
                                <img
                                    src="/images/svg/ExistingModule.svg"
                                    alt="Existing Module"
                                    className={styles.svgIcon}
                                />
                            </div>
                        </Tippy>

                    </div>
                )}
            </div>

            {/* Tools Group */}
            <div className={styles.group}>
                <div className={styles.groupHeader} onClick={() => setIsToolsCollapsed(!isToolsCollapsed)}>
                    <FaTools className={styles.collapseIcon} />
                    <h3>Tools</h3>
                    <FaBars className={styles.toggleIcon} />
                </div>
                {!isToolsCollapsed && (
                    <div className={styles.iconList}>
                        <Tippy content={isPanning ? "Disable Panning" : "Enable Panning"} placement="right" delay={[500, 0]}>
                            <div
                                className={`${styles.iconItem} ${isPanning ? styles.active : ''}`}
                                onClick={handlePanToggle}
                            >
                                <FaHandPaper size={24} />
                            </div>
                        </Tippy>
                    </div>
                )}
            </div>

            {/* Paper Actions Group */}
            <div className={styles.group}>
                <div className={styles.groupHeader} onClick={() => setIsActionsCollapsed(!isActionsCollapsed)}>
                    <FaExpand className={styles.collapseIcon} />
                    <h3>Paper Actions</h3>
                    <FaBars className={styles.toggleIcon} />
                </div>
                {!isActionsCollapsed && (
                    <div className={styles.iconList}>
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
                        {/* Добавьте другие действия по мере необходимости */}
                    </div>
                )}
            </div>

            {/* Save & Load Group */}
            <div className={styles.group}>
                <div className={styles.groupHeader} onClick={() => setIsSaveLoadCollapsed(!isSaveLoadCollapsed)}>
                    <FaRegFileCode className={styles.collapseIcon} />
                    <h3>Generate</h3>
                    <FaBars className={styles.toggleIcon} />
                </div>
                {!isSaveLoadCollapsed && (
                    <div className={styles.iconList}>
                        <Tippy content="Generate Code" placement="right" delay={[500, 0]}>
                            <div
                                className={styles.iconItem}

                                onClick={handleGenerateCode}
                            >
                                <FaCode size={24} />
                                <span>Generate Code</span>
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
                        {/* Скрытый input для загрузки файла */}
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
        </div>
    );

};

export default Sidebar;
