// pages/diagram-test/components/Sidebar/Sidebar.tsx

import React from 'react';
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
import { saveDiagramAsCode, loadCodeToDiagram } from '../../utils/codeParser';
import styles from './Sidebar.module.css';

const Sidebar = () => {
    const { zoomIn, zoomOut, fitToView, graph, isPanning, togglePanning } = useDiagramContext();
    const [isLogicCollapsed, setIsLogicCollapsed] = React.useState(false);
    const [isIOCollapsed, setIsIOCollapsed] = React.useState(false);
    const [isToolsCollapsed, setIsToolsCollapsed] = React.useState(false);
    const [isSaveLoadCollapsed, setIsSaveLoadCollapsed] = React.useState(false);
    const [isActionsCollapsed, setIsActionsCollapsed] = React.useState(false);
    const [isComplexLogicCollapsed, setIsComplexLogicCollapsed] = React.useState(false);

    const handleDragStart = (event: React.DragEvent, toolType: string) => {
        event.dataTransfer.setData('toolType', toolType);
    };

    const handleSave = async () => {
        const code = saveDiagramAsCode(graph);
        const name = prompt('Введите имя диаграммы:');
        if (name) {
            try {
                const response = await fetch('/api/saveDiagram', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ name, code }),
                });
                const result = await response.json();
                if (response.ok) {
                    alert('Диаграмма успешно сохранена');
                } else {
                    alert(`Ошибка: ${result.error}`);
                }
            } catch (error) {
                alert('Произошла ошибка при сохранении диаграммы');
            }
        }
    };

    const handleLoad = () => {
        const code = prompt('Вставьте ваш SystemVerilog код:');
        if (code) {
            loadCodeToDiagram(code, graph);
        }
    };

    const handleGenerateCode = () => {
        const code = saveDiagramAsCode(graph);
        // Предложите скачать код как файл
        const blob = new Blob([code], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'diagram.sv';
        a.click();
        URL.revokeObjectURL(url);
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
                    </div>
                )}
            </div>
        </div>
    );

};

export default Sidebar;
