// pages/diagram-test/components/PropertiesPanel/PropertiesPanel.tsx
import React, { useState, useEffect } from 'react';
import { useHotkeys } from '../../hooks/useHotkeys';
import { useDiagramContext } from '../../context/useDiagramContext';
import styles from './PropertiesPanel.module.css';
import ResizablePanel from '../common/ResizablePanel';
import {Multiplexer} from "../Shapes/classes/multiplexer";
import {JointJSComparator} from "../Shapes/complexLogic/JointJSComparator";
import {JointJSMultiplexer} from "../Shapes/complexLogic/JointJSMultiplexer";
import {JointJSAnd} from "../Shapes/gates/JointJSAnd";
import {And} from "../Shapes/classes/and";
import {JointJSOr} from "../Shapes/gates/JointJSOr";
import {Or} from "../Shapes/classes/or";
import {JointJSXor} from "../Shapes/gates/JointJSXor";
import {Xor} from "../Shapes/classes/xor";
import {JointJSXnor} from "../Shapes/gates/JointJSXnor";
import {Xnor} from "../Shapes/classes/xnor";
import {JointJSNand} from "../Shapes/gates/JointJSNand";
import {Nand} from "../Shapes/classes/nand";
import {JointJSNor} from "../Shapes/gates/JointJSNor";
import {Nor} from "../Shapes/classes/nor";
import {JointJSNewModule} from "../Shapes/modules/JointJSNewModule";
import {Module} from "../Shapes/classes/module";
import {JointJSRegister} from "../Shapes/memory/JointJSRegister";
import {Register} from "../Shapes/classes/register";
import { MdErrorOutline } from "react-icons/md";
import { FaEdit, FaTrash } from 'react-icons/fa';
interface Properties {
    label?: string;
    stroke?: string;
    strokeWidth?: number;
    comparatorType?: string;
    bandwidth?: number;
    addressBandwidth?: number;
    inputPorts?: number;
    instance?: string;
    inPortsModule?: { name: string; bandwidth: number }[];
    outPortsModule?: { name: string; bandwidth: number }[];
    resetPort?: boolean;
}

const PropertiesPanel = () => {
    const { selectedElement,graph,setSelectedElement, updateElement, removeElement } = useDiagramContext();
    const [properties, setProperties] = useState<Properties>({
        label: '',
        instance: '',
        bandwidth: 1,
        addressBandwidth: 8,
        inputPorts: 2,
        stroke: '#000',
        strokeWidth: 2,
        comparatorType: '',
        inPortsModule: [],
        outPortsModule: [],
        resetPort: false,
    });
    const [isHover, setIsHover] = useState(false);
    const [portWidthMode, setPortWidthMode] = useState<'bit' | 'vector' | 'struct'>('bit');
    const [logicWidthMode, setLogicWidthMode] = useState<'bit' | 'vector'>('bit');
    const [errorMessage, setErrorMessage] = useState('');
    const [showAddPortDialog, setShowAddPortDialog] = useState(false);
    const [newPortType, setNewPortType] = useState<'input' | 'output'>('input');
    const [newPortData, setNewPortData] = useState({ name: '', bandwidth: 1 });
    const [isEditingPort, setIsEditingPort] = useState(false);
    const [editPortIndex, setEditPortIndex] = useState<number | null>(null);
    const [editPortType, setEditPortType] = useState<'input' | 'output'>('input');
    const [showSaveNotification, setShowSaveNotification] = useState(false);
    const [panelWidth, setPanelWidth] = useState(300);


    const handleWidthChange = (newWidth: number) => {
        setPanelWidth(newWidth);
    };

    useEffect(() => {
        if (selectedElement) {
            const props: Properties = {
                label: selectedElement.attributes.attrs?.label?.text || '',
                bandwidth: selectedElement.attributes.bandwidth || 1,
                inputPorts: selectedElement.attributes.inPorts || 0,
                inPortsModule: selectedElement.attributes.moduleInPorts || [],
                outPortsModule: selectedElement.attributes.moduleOutPorts || [],
                instance: selectedElement.attributes.instance || '',
                addressBandwidth: selectedElement.attributes.addressBandwidth || 8,
                resetPort: selectedElement.attributes.resetPort ?? false,

            };
            if (selectedElement.isLink()) {
                props.stroke = selectedElement.attributes.line?.stroke || '#000';
                props.strokeWidth = selectedElement.attributes.line?.strokeWidth || 2;
            }

            if (props.bandwidth === 1) {
                setPortWidthMode('bit');
            } else if (props.bandwidth != undefined) {
                if (props.bandwidth > 1) {
                    setPortWidthMode('vector');
                }
            } else {
                setPortWidthMode('struct');
            }
            setProperties(props);
        } else {
            setProperties({
                label: '',
                instance: '',
                bandwidth: 1,
                addressBandwidth: 8,
                inputPorts: 2,
                stroke: '#000',
                strokeWidth: 2,
                comparatorType: '',
                inPortsModule: [],
                outPortsModule: [],
                resetPort: false,
            });
        }
    }, [selectedElement]);


    useEffect(() => {
        if (!selectedElement) return;

        const elType = selectedElement.attributes.elType;
        const labelText = selectedElement.attributes.attrs?.label?.text || "";
        const labelLines4 = labelText.split('\n\n\n\n');
        const labelLines1 = labelText.split('\n');

        if (['comparator', 'adder', 'subtractor'].includes(elType)) {
            setProperties(prev => ({
                ...prev,
                label: labelLines4[1],
                comparatorType: labelLines4[0],
            }));
        } else if (['decoder', 'encoder', 'ram', 'register'].includes(elType)) {
            setProperties(prev => ({
                ...prev,
                label: labelLines1[1],
            }));
        }
        else if (['newModule'].includes(elType)) {
            setProperties(prev => ({
                ...prev,
                label: labelLines1[0],
            }));
        }
    }, [selectedElement]);


    const handleChange = (e: { target: { name: string; type: string; checked?: boolean; value?: any; }; }) => {
        const { name, type, checked, value} = e.target;
        setProperties(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked :
                (name === 'strokeWidth' || name === 'bandwidth' || name === 'inputPorts' || name === 'addressBandwidth'
                    ? Number(value) : value)
        }));

    };
    useEffect(() => {
        if (showSaveNotification) {
            const timer = setTimeout(() => {
                setShowSaveNotification(false);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [showSaveNotification]);

    const handleAddInputPort = () => {
        setNewPortType('input');
        setNewPortData({ name: '', bandwidth: 1 });
        setShowAddPortDialog(true);

        setIsEditingPort(false);
        setEditPortIndex(null);
    };

    const handleAddOutputPort = () => {
        setNewPortType('output');
        setNewPortData({ name: '', bandwidth: 1 });
        setShowAddPortDialog(true);

        setIsEditingPort(false);
        setEditPortIndex(null);
    };

    // Обработчик изменения данных нового порта
    const handleNewPortDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewPortData(prev => ({
            ...prev,
            [name]: name === 'bandwidth' ? Number(value) : value
        }));
    };

    const handleNewPortSubmit = () => {
        if (!selectedElement) return;

        // Сброс сообщения
        setErrorMessage('');

        // Валидация
        if (!newPortData.name.trim()) {
            setErrorMessage('Port Name is mandatory');
            return;
        }
        if (newPortData.bandwidth < 1) {
            setErrorMessage('Bandwidth must be >= 1');
            return;
        }

        // Если мы РЕДАКТИРУЕМ порт
        if (isEditingPort && editPortIndex !== null) {
            if (editPortType === 'input') {
                const updated = [...properties.inPortsModule];
                updated[editPortIndex] = {
                    name: newPortData.name,
                    bandwidth: newPortData.bandwidth,
                };
                setProperties(prev => ({
                    ...prev,
                    inPortsModule: updated,
                }));
            } else {
                const updated = [...properties.outPortsModule];
                updated[editPortIndex] = {
                    name: newPortData.name,
                    bandwidth: newPortData.bandwidth,
                };
                setProperties(prev => ({
                    ...prev,
                    outPortsModule: updated,
                }));
            }
        }
        else {
            // Иначе мы ДОБАВЛЯЕМ новый порт
            if (newPortType === 'input') {
                setProperties(prev => ({
                    ...prev,
                    inPortsModule: [
                        ...prev.inPortsModule,
                        {
                            name: newPortData.name,
                            bandwidth: newPortData.bandwidth,
                        }
                    ]
                }));
            } else {
                setProperties(prev => ({
                    ...prev,
                    outPortsModule: [
                        ...prev.outPortsModule,
                        {
                            name: newPortData.name,
                            bandwidth: newPortData.bandwidth,
                        }
                    ]
                }));
            }
        }

        // Закрываем диалог
        setShowAddPortDialog(false);

        // Сбрасываем флаги
        setIsEditingPort(false);
        setEditPortIndex(null);
    };

    const handleNewPortCancel = () => {
        setShowAddPortDialog(false);
    };


    const handleMultiplexerPortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const portCount = parseInt(event.target.value);
        if (selectedElement?.attributes.elType === 'multiplexer') {
            const { x, y } = selectedElement.position();
            const multiplexerData = new Multiplexer();
            multiplexerData.name = selectedElement.attributes.attrs?.label?.text || 'Default Name';
            multiplexerData.dataPorts = portCount;
            multiplexerData.position = { x, y };

            graph.removeCells([selectedElement]);
            const newMultiplexer = JointJSMultiplexer(multiplexerData);
            graph.addCell(newMultiplexer);
            setSelectedElement(newMultiplexer);
        }
    };

    const handleModulePortChange = () => {
        if (!selectedElement) return;

        // Создаём новый объект модуля
        const newMod = new Module();
        newMod.name = properties.label || '';
        newMod.instance = properties.instance || '';

        // Конвертируем локальные inPortsModule / outPortsModule в Port[]
        newMod.inPorts = properties.inPortsModule.map((p, i) => ({
            name: p.name,
            bandwidth: p.bandwidth,
        }));
        newMod.outPorts = properties.outPortsModule.map((p, i) => ({
            name: p.name,
            bandwidth: p.bandwidth,
        }));

        // Позицию и т.д.
        const { x, y } = selectedElement.position();
        newMod.position = { x, y };

        // Удаляем старый элемент из графа
        graph.removeCells([selectedElement]);

        // Создаем новый элемент через JointJSNewModule и добавляем в граф
        const newModuleCell = JointJSNewModule(newMod);
        graph.addCell(newModuleCell);

        // Выбираем его
        setSelectedElement(newModuleCell);
    };
    const handleEditPort = (portType: 'input' | 'output', index: number) => {
        setIsEditingPort(true);
        setEditPortIndex(index);
        setEditPortType(portType);
        setErrorMessage('');

        // Находим текущий порт
        const currentPort = portType === 'input'
            ? properties.inPortsModule[index]
            : properties.outPortsModule[index];

        // Заполняем форму (modal) данными порта
        setNewPortData({
            name: currentPort.name,
            bandwidth: currentPort.bandwidth,
        });

        setShowAddPortDialog(true);
    };
    const handleDeletePort = (portType: 'input' | 'output', index: number) => {
        if (portType === 'input') {
            const updatedInPorts = [...properties.inPortsModule];
            updatedInPorts.splice(index, 1); // удаляем порт
            setProperties(prev => ({ ...prev, inPortsModule: updatedInPorts }));
        } else {
            const updatedOutPorts = [...properties.outPortsModule];
            updatedOutPorts.splice(index, 1);
            setProperties(prev => ({ ...prev, outPortsModule: updatedOutPorts }));
        }
    };

    const handleMemoryPortChange = () => {
        if (selectedElement?.attributes.elType === 'register') {
            const { x, y } = selectedElement.position();
            const registerData = new Register();
            registerData.name = properties.label || '';
            registerData.resetPort = properties.resetPort;
            registerData.dataBandwidth = properties.bandwidth || 1;
            registerData.position = { x, y };

            graph.removeCells([selectedElement]);
            const newRegister = JointJSRegister(registerData);
            graph.addCell(newRegister);
            setSelectedElement(newRegister);
        }
    }

    const handleLogicPortChange = () => {

        if (selectedElement?.attributes.elType === 'and') {
            const { x, y } = selectedElement.position();
            const andData = new And();
            andData.name = properties.label || '';
            andData.inPorts = properties.inputPorts || 2;
            console.log(andData.inPorts);
            andData.bandwidth = properties.bandwidth || 1;
            andData.position = { x, y };

            graph.removeCells([selectedElement]);
            const newAnd = JointJSAnd(andData);
            newAnd.attr({ label: { text: properties.label } });
            graph.addCell(newAnd);
            setSelectedElement(newAnd);
        }

        if (selectedElement?.attributes.elType === 'or') {
            const { x, y } = selectedElement.position();
            const orData = new Or();
            orData.name = properties.label || '';
            orData.inPorts = properties.inputPorts || 2;
            console.log(orData.inPorts);
            orData.bandwidth = properties.bandwidth || 1;
            orData.position = { x, y };

            graph.removeCells([selectedElement]);
            const newOr = JointJSOr(orData);
            newOr.attr({ label: { text: properties.label } });
            graph.addCell(newOr);
            setSelectedElement(newOr);
        }
        if (selectedElement?.attributes.elType === 'xor') {
            const { x, y } = selectedElement.position();
            const xorData = new Xor();
            xorData.name = properties.label || '';
            xorData.inPorts = properties.inputPorts || 2;
            console.log(xorData.inPorts);
            xorData.bandwidth = properties.bandwidth || 1;
            xorData.position = { x, y };

            graph.removeCells([selectedElement]);
            const newXor = JointJSXor(xorData);
            newXor.attr({ label: { text: properties.label } });
            graph.addCell(newXor);
            setSelectedElement(newXor);
        }
        if (selectedElement?.attributes.elType === 'xnor') {
            const { x, y } = selectedElement.position();
            const xnorData = new Xnor();
            xnorData.name = properties.label || '';
            xnorData.inPorts = properties.inputPorts || 2;
            console.log(xnorData.inPorts);
            xnorData.bandwidth = properties.bandwidth || 1;
            xnorData.position = { x, y };

            graph.removeCells([selectedElement]);
            const newXnor = JointJSXnor(xnorData);
            newXnor.attr({ label: { text: properties.label } });
            graph.addCell(newXnor);
            setSelectedElement(newXnor);
        }
        if (selectedElement?.attributes.elType === 'nand') {
            const { x, y } = selectedElement.position();
            const nandData = new Nand();
            nandData.name = properties.label || '';
            nandData.inPorts = properties.inputPorts || 2;
            console.log(nandData.inPorts);
            nandData.bandwidth = properties.bandwidth || 1;
            nandData.position = { x, y };

            graph.removeCells([selectedElement]);
            const newNand = JointJSNand(nandData);
            newNand.attr({ label: { text: properties.label } });
            graph.addCell(newNand);
            setSelectedElement(newNand);
        }
        if (selectedElement?.attributes.elType === 'nor') {
            const { x, y } = selectedElement.position();
            const norData = new Nor();
            norData.name = properties.label || '';
            norData.inPorts = properties.inputPorts || 2;
            console.log(norData.inPorts);
            norData.bandwidth = properties.bandwidth || 1;
            norData.position = { x, y };

            graph.removeCells([selectedElement]);
            const newNor = JointJSNor(norData);
            newNor.attr({ label: { text: properties.label } });
            graph.addCell(newNor);
            setSelectedElement(newNor);
        }

    };

    const handleSave = () => {
        if (!selectedElement) return;
        const attrsToUpdate: any = {};

        if (selectedElement.isLink()) {
            attrsToUpdate.line = {
                stroke: properties.stroke || '#000',
                strokeWidth: properties.strokeWidth || 2,
            };
        }
        else if (selectedElement.attributes.elType === 'comparator') {
            attrsToUpdate.label = { text: properties.comparatorType + '\n\n\n\n' + properties.label };
        }
        else if (selectedElement.attributes.elType === 'decoder') {
            attrsToUpdate.label = { text: 'DECODER\n' + properties.label };
        }
        else if (selectedElement.attributes.elType === 'ram') {
            selectedElement.attributes.addressBandwidth = properties.addressBandwidth;
            attrsToUpdate.label = { text: 'RAM\n' + properties.label };
        }
        else if (selectedElement.attributes.elType === 'register') {
            handleMemoryPortChange();
            return;
        }
        else if (selectedElement.attributes.elType === 'encoder') {
            attrsToUpdate.label = { text: 'ENCODER\n' + properties.label };
        }
        else if (selectedElement.attributes.elType === 'newModule') {
            handleModulePortChange();
            // attrsToUpdate.label = { text: properties.label + '\n' + properties.instance };
            return;

        }
        else if (selectedElement.attributes.elType === 'adder') {
            attrsToUpdate.label = { text: '+\n\n\n\n' + properties.label };
        }
        else if (selectedElement.attributes.elType === 'subtractor') {
            attrsToUpdate.label = { text: '-\n\n\n\n' + properties.label };
        }
        else if (selectedElement.attributes.elType === 'and') {
            handleLogicPortChange();
            return;
        }
        else if (selectedElement.attributes.elType === 'or') {
            handleLogicPortChange();
            return;
        }
        else if (selectedElement.attributes.elType === 'xor') {
            handleLogicPortChange();
            return;
        }
        else if (selectedElement.attributes.elType === 'xnor') {
            handleLogicPortChange();
            return;
        }
        else if (selectedElement.attributes.elType === 'nand') {
            handleLogicPortChange();
            return;
        }
        else if (selectedElement.attributes.elType === 'nor') {
            handleLogicPortChange();
            return;
        }

        else {
            attrsToUpdate.label = { text: properties.label };
        }
        selectedElement.attributes.bandwidth = properties.bandwidth;

        selectedElement.attr(attrsToUpdate);
        console.log(selectedElement);
        updateElement(selectedElement);
        setShowSaveNotification(true);
    };

    const handleDelete = () => {
        if (selectedElement) {
            removeElement();
        }
    };
    useHotkeys({
        onSave: handleSave,
        onDelete: handleDelete,
        enabled: isHover  // например, только при наведении мыши на панель
    });

    // Вызывается при переключении радио-кнопок
    const handleBandwidthRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newMode = e.target.value as 'bit' | 'vector' | 'struct';
        setPortWidthMode(newMode);

        // Обновляем свойства, например, bandwidth:
        if (newMode === 'bit') {
            setProperties(prev => ({ ...prev, bandwidth: 1 }));
        } else if (newMode === 'vector') {
            setProperties(prev => ({ ...prev, bandwidth: 2 }));
        } else {
            setProperties(prev => ({ ...prev, bandwidth: 0 }));
        }
    };
    // Вызывается при переключении радио-кнопок
    const handleLogicRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newMode = e.target.value as 'bit' | 'vector';
        setLogicWidthMode(newMode);

        // Обновляем свойства, например, bandwidth:
        if (newMode === 'bit') {
            setProperties(prev => ({ ...prev, bandwidth: 1 }));
        } else {
            setProperties(prev => ({...prev, bandwidth: 2}));
        }
    };
    function toTitleCase(str: string) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }


    if (!selectedElement) {
        return (
            <ResizablePanel
                className={styles.propertiesPanel}
                defaultWidth={300}
                direction="left"
                onWidthChange={handleWidthChange}
            >
                <h3>Properties</h3>
                <p>Select an element to see its properties.</p>
            </ResizablePanel>
        );
    }

    return (
        <ResizablePanel
            className={styles.propertiesPanel}
            defaultWidth={300}
            direction="left"
            onWidthChange={handleWidthChange}
        >
            <h3>Properties</h3>
            {/* Пример для I/O портов */}
            {(['output', 'input'].includes(selectedElement.attributes.elType)) && (
                <>
                    <label>
                        Name of your Port:
                        <input
                            type="text"
                            name="label"
                            placeholder="Port's name..."
                            value={properties.label || ''}
                            onChange={handleChange}
                        />
                    </label>

                    <div className={styles.radioContainer}>
                        <span>Select Port width:</span>
                        <div className={styles.radioOption}>
                            <input
                                type="radio"
                                name="portWidth"
                                value="bit"
                                checked={portWidthMode === 'bit'}
                                onChange={handleBandwidthRadioChange}
                            />
                            <label>Bit</label>
                        </div>

                        <div className={styles.radioOption}>
                            <input
                                type="radio"
                                name="portWidth"
                                value="vector"
                                checked={portWidthMode === 'vector'}
                                onChange={handleBandwidthRadioChange}
                            />
                            <label>Vector</label>
                        </div>

                        <div className={styles.radioOption}>
                            <input
                                type="radio"
                                name="portWidth"
                                value="struct"
                                checked={portWidthMode === 'struct'}
                                onChange={handleBandwidthRadioChange}
                            />
                            <label>User defined</label>
                        </div>
                    </div>

                    {portWidthMode === 'vector' && (
                        <label>
                            Width of vector:
                            <input
                                type="number"
                                name="bandwidth"
                                value={properties.bandwidth || 0}
                                onChange={handleChange}
                            />
                        </label>
                    )}
                    {portWidthMode === 'struct' && (
                        <label>
                            Choose package file:
                            <select
                                name="packageFile"
                            >
                                {/*<option value=">">{'>'}</option>*/}
                            </select>
                            Choose user defined type:
                            <select
                                name="packageFile"
                            >
                                {/*<option value=">">{'>'}</option>*/}
                            </select>
                        </label>
                    )}
                </>
            )}

            {(['and', 'nand', 'xor', 'or', 'nor', 'not', 'xnor'].includes(selectedElement.attributes.elType)) && (
                <>
                    <label>
                        {selectedElement.attributes.elType.toUpperCase()} signal name:
                        <input
                            type="text"
                            name="label"
                            placeholder="Insert name..."
                            value={properties.label || ''}
                            onChange={handleChange}
                        />
                    </label>

                    <div className={styles.radioContainer}>
                        <span>Select {selectedElement.attributes.elType.toUpperCase()} width:</span>
                        <div className={styles.radioOption}>
                            <input
                                type="radio"
                                name="logicWidth"
                                value="bit"
                                checked={logicWidthMode === 'bit'}
                                onChange={handleLogicRadioChange}
                            />
                            <label>Bit</label>
                        </div>

                        <div className={styles.radioOption}>
                            <input
                                type="radio"
                                name="logicWidth"
                                value="vector"
                                checked={logicWidthMode === 'vector'}
                                onChange={handleLogicRadioChange}
                            />
                            <label>Vector</label>
                        </div>

                    </div>
                    {(['and', 'nand', 'xor', 'or', 'nor', 'xnor'].includes(selectedElement.attributes.elType)) && (
                        <label>
                            Number of input ports:
                            <input
                                type="text"
                                name="inputPorts"
                                value={properties.inputPorts || ''}
                                onChange={handleChange}
                            />
                        </label>
                    )
                    }
                    {logicWidthMode === 'vector' && (
                        <label>
                            Width of vector:
                            <input
                                type="number"
                                name="bandwidth"
                                value={properties.bandwidth || 0}
                                onChange={handleChange}
                            />
                        </label>
                    )}
                </>
            )}


            {selectedElement.attributes.elType === 'multiplexer' && (
                <>
                    <label>
                        {toTitleCase(selectedElement.attributes.elType)} signal name:
                        <input
                            type="text"
                            name="label"
                            placeholder="Insert name..."
                            value={properties.label || ''}
                            onChange={handleChange}
                        />
                    </label>

                    <div className={styles.radioContainer}>
                        <span>Select DATA input(s) width:</span>
                        <div className={styles.radioOption}>
                            <input
                                type="radio"
                                name="portWidth"
                                value="bit"
                                checked={portWidthMode === 'bit'}
                                onChange={handleBandwidthRadioChange}
                            />
                            <label>Bit</label>
                        </div>

                        <div className={styles.radioOption}>
                            <input
                                type="radio"
                                name="portWidth"
                                value="vector"
                                checked={portWidthMode === 'vector'}
                                onChange={handleBandwidthRadioChange}
                            />
                            <label>Vector</label>
                        </div>

                        <div className={styles.radioOption}>
                            <input
                                type="radio"
                                name="portWidth"
                                value="struct"
                                checked={portWidthMode === 'struct'}
                                onChange={handleBandwidthRadioChange}
                            />
                            <label>User defined</label>
                        </div>
                    </div>

                    {portWidthMode === 'vector' && (
                        <label>
                            Width of vector:
                            <input
                                type="number"
                                name="bandwidth"
                                value={properties.bandwidth || 0}
                                onChange={handleChange}
                            />
                        </label>
                    )}
                    {portWidthMode === 'struct' && (
                        <label>
                            Choose package file:
                            <select
                                name="packageFile"
                            >
                                {/*<option value=">">{'>'}</option>*/}
                            </select>
                            Choose user defined type:
                            <select
                                name="packageFile"
                            >
                                {/*<option value=">">{'>'}</option>*/}
                            </select>
                        </label>
                    )}

                    <label>
                        Multiplexer type:
                        <select onChange={handleMultiplexerPortChange} defaultValue="2" name="inputPorts">
                            <option value="2">2-to-1</option>
                            <option value="4">4-to-1</option>
                            <option value="8">8-to-1</option>
                        </select>
                    </label>
                </>

            )}
            {(['decoder', 'encoder'].includes(selectedElement.attributes.elType)) && (
                <>
                    <label>
                        {selectedElement.attributes.elType.toUpperCase()} name:
                        <input
                            type="text"
                            name="label"
                            placeholder="Insert name..."
                            value={properties.label || ''}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                    DATA width:
                        <input
                            type="number"
                            name="bandwidth"
                            value={properties.bandwidth || 0}
                            onChange={handleChange}
                        />
                    </label>

                </>

            )}

            {(['adder', 'subtractor', 'comparator'].includes(selectedElement.attributes.elType)) && (
                <>
                    <label>
                        {selectedElement.attributes.elType.toUpperCase()} name:
                        <input
                            type="text"
                            name="label"
                            placeholder="Insert name..."
                            value={properties.label || ''}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        DATA width:
                        <input
                            type="number"
                            name="bandwidth"
                            value={properties.bandwidth || 0}
                            onChange={handleChange}
                        />
                    </label>
                    {selectedElement.attributes.elType === 'comparator' && (
                        <label>
                            Comparator Type:
                            <select
                                name="comparatorType"
                                value={properties.comparatorType}
                                onChange={handleChange}
                            >
                                <option value=">">{'>'}</option>
                                <option value="<">{'<'}</option>
                                <option value=">=">{'>='}</option>
                                <option value="<=">{'<='}</option>
                                <option value="==">{'=='}</option>
                                <option value="!=">{'!='}</option>
                            </select>
                        </label>
                    )}
                </>

            )}
            {(['newModule'].includes(selectedElement.attributes.elType)) && (
                <>
                    <label>
                        New Module name:
                        <input
                            type="text"
                            name="label"
                            placeholder="Insert name..."
                            value={properties.label || ''}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Instance name:
                        <input
                            type="text"
                            name="instance"
                            placeholder="Insert instance..."
                            value={properties.instance || ''}
                            onChange={handleChange}
                        />
                    </label>

                    <div className={styles.portSection}>
                        <h4>Input Ports</h4>
                        {properties.inPortsModule.map((p, idx) => (
                            <div key={idx} className={styles.portItem}>
                                <span>{p.name} (bw={p.bandwidth})</span>

                                {/* Иконка редактирования */}
                                <FaEdit
                                    className={styles.portIcon}
                                    onClick={() => handleEditPort('input', idx)}
                                />

                                {/* Иконка удаления */}
                                <FaTrash
                                    className={styles.portIcon}
                                    onClick={() => handleDeletePort('input', idx)}
                                />
                            </div>
                        ))}
                        <button onClick={handleAddInputPort} className={styles.addPortButton}>
                            Add Input Port
                        </button>
                    </div>
                    <div className={styles.portSection}>
                        <h4>Output Ports</h4>
                        {properties.outPortsModule.map((p, idx) => (
                            <div key={idx} className={styles.portItem}>
                                <span>{p.name} (bw={p.bandwidth})</span>

                                <FaEdit
                                    className={styles.portIcon}
                                    onClick={() => handleEditPort('output', idx)}
                                />

                                <FaTrash
                                    className={styles.portIcon}
                                    onClick={() => handleDeletePort('output', idx)}
                                />
                            </div>
                        ))}
                        <button onClick={handleAddOutputPort} className={styles.addPortButton}>
                            Add Output Port
                        </button>
                    </div>
                </>
            )}
            {(['ram', 'register'].includes(selectedElement.attributes.elType)) && (
                <>
                    <label>
                        SRAM name:
                        <input
                            type="text"
                            name="label"
                            placeholder="Insert name..."
                            value={properties.label || ''}
                            onChange={handleChange}
                        />
                    </label>
                    {(['ram'].includes(selectedElement.attributes.elType)) && (
                        <label>
                            Address width:
                            <input
                                type="number"
                                name="addressBandwidth"
                                placeholder="Insert width..."
                                value={properties.addressBandwidth || ''}
                                onChange={handleChange}
                            />
                        </label>
                    )}
                    {(['register'].includes(selectedElement.attributes.elType)) && (
                        <label>
                            Reset Port:
                            <input
                                type="checkbox"
                                name="resetPort"
                                checked={!!properties.resetPort} // Преобразуем в boolean
                                onChange={handleChange}
                            />
                        </label>
                    )}
                    <div className={styles.radioContainer}>
                        <span>Select DATA width:</span>
                        <div className={styles.radioOption}>
                            <input
                                type="radio"
                                name="portWidth"
                                value="bit"
                                checked={portWidthMode === 'bit'}
                                onChange={handleBandwidthRadioChange}
                            />
                            <label>Bit</label>
                        </div>

                        <div className={styles.radioOption}>
                            <input
                                type="radio"
                                name="portWidth"
                                value="vector"
                                checked={portWidthMode === 'vector'}
                                onChange={handleBandwidthRadioChange}
                            />
                            <label>Vector</label>
                        </div>

                        <div className={styles.radioOption}>
                            <input
                                type="radio"
                                name="portWidth"
                                value="struct"
                                checked={portWidthMode === 'struct'}
                                onChange={handleBandwidthRadioChange}
                            />
                            <label>User defined</label>
                        </div>
                    </div>

                    {portWidthMode === 'vector' && (
                        <label>
                            Width of vector:
                            <input
                                type="number"
                                name="bandwidth"
                                value={properties.bandwidth || 0}
                                onChange={handleChange}
                            />
                        </label>
                    )}
                    {portWidthMode === 'struct' && (
                        <label>
                            Choose package file:
                            <select
                                name="packageFile"
                            >
                                {/*<option value=">">{'>'}</option>*/}
                            </select>
                            Choose user defined type:
                            <select
                                name="packageFile"
                            >
                                {/*<option value=">">{'>'}</option>*/}
                            </select>
                        </label>
                    )}
                </>
            )}


            {/* Если это связь — показываем настройки stroke, strokeWidth */}
            {selectedElement.isLink() && (
                <>
                    <label>
                        Line color:
                        <input
                            type="color"
                            name="stroke"
                            value={properties.stroke || '#000000'}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Line width:
                        <input
                            type="number"
                            name="strokeWidth"
                            value={properties.strokeWidth || 2}
                            onChange={handleChange}
                            min="1"
                            max="10"
                        />
                    </label>
                </>
            )}

            <div className={styles.buttonContainer}>
                <button onClick={handleSave} className={styles.saveButton}>
                    Save
                </button>
                <button onClick={handleDelete} className={styles.deleteButton}>
                    Delete
                </button>
            </div>
            {showSaveNotification && (
                <div className={styles.saveNotification}>Element saved successfully!</div>
            )}
            {/* Модальное окно для добавления порта */}
            {showAddPortDialog && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modal}>
                        <h3>Add {newPortType === 'input' ? 'Input' : 'Output'} Port</h3>
                        {errorMessage && (
                            <div className={styles.errorMessage}>
                                <MdErrorOutline className={styles.errorIcon} />
                                <span>{errorMessage}</span>
                            </div>
                        )}
                        <label>
                            Port Name:
                            <input
                                type="text"
                                name="name"
                                value={newPortData.name}
                                onChange={handleNewPortDataChange}
                            />
                        </label>
                        <label>
                            Bandwidth:
                            <input
                                type="number"
                                name="bandwidth"
                                value={newPortData.bandwidth}
                                onChange={handleNewPortDataChange}
                            />
                        </label>
                        <div className={styles.modalButtons}>
                            <button onClick={handleNewPortSubmit}>Add Port</button>
                            <button onClick={handleNewPortCancel}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </ResizablePanel>
    );
};

export default PropertiesPanel;
