// pages/diagram-test/components/PropertiesPanel/PropertiesPanel.tsx
import React, { useState, useEffect, useRef } from "react";
import { useHotkeys } from "@/app/diagram-test/hooks/useHotkeys";
import { useDiagramContext } from "@/app/diagram-test/context/useDiagramContext";
import styles from './PropertiesPanel.module.css';
import ResizablePanel from '../common/ResizablePanel';
import {Multiplexer} from "@/app/diagram-test/components/Shapes/classes/multiplexer";
import {JointJSMultiplexer} from "@/app/diagram-test/components/Shapes/complexLogic/JointJSMultiplexer";
import {JointJSAnd} from "@/app/diagram-test/components/Shapes/gates/JointJSAnd";
import {And} from "@/app/diagram-test/components/Shapes/classes/and";
import {JointJSOr} from "@/app/diagram-test/components/Shapes/gates/JointJSOr";
import {Or} from "@/app/diagram-test/components/Shapes/classes/or";
import {JointJSXor} from "@/app/diagram-test/components/Shapes/gates/JointJSXor";
import {Xor} from "@/app/diagram-test/components/Shapes/classes/xor";
import {JointJSXnor} from "@/app/diagram-test/components/Shapes/gates/JointJSXnor";
import {Xnor} from "@/app/diagram-test/components/Shapes/classes/xnor";
import {JointJSNand} from "@/app/diagram-test/components/Shapes/gates/JointJSNand";
import {Nand} from "@/app/diagram-test/components/Shapes/classes/nand";
import {JointJSNor} from "@/app/diagram-test/components/Shapes/gates/JointJSNor";
import {Nor} from "@/app/diagram-test/components/Shapes/classes/nor";
import {JointJSNewModule} from "@/app/diagram-test/components/Shapes/modules/JointJSNewModule";
import {Module} from "@/app/diagram-test/components/Shapes/classes/module";
import {JointJSRegister} from "@/app/diagram-test/components/Shapes/memory/JointJSRegister";
import {Register} from "@/app/diagram-test/components/Shapes/classes/register";
import {JointJSSRam} from "@/app/diagram-test/components/Shapes/memory/JointJSSRam";
import {Ram} from "@/app/diagram-test/components/Shapes/classes/ram";
import {JointJSBitCombine} from "@/app/diagram-test/components/Shapes/bitOperations/JointJSBitCombine";
import {BitCombine} from "@/app/diagram-test/components/Shapes/classes/bitCombine";
import {JointJSBitSelect} from "@/app/diagram-test/components/Shapes/bitOperations/JointJSBitSelect";
import {BitSelect} from "@/app/diagram-test/components/Shapes/classes/bitSelect";
import {JointJSInputPort} from "@/app/diagram-test/components/Shapes/io/JointJSInputPort";
import {JointJSOutputPort} from "@/app/diagram-test/components/Shapes/io/JointJSOutputPort";
import {Port} from "@/app/diagram-test/components/Shapes/classes/port";
import {JointJSAlu} from "@/app/diagram-test/components/Shapes/complexLogic/JointJSAlu";
import {Alu} from "@/app/diagram-test/components/Shapes/classes/alu";
import {JointJSComparator} from "@/app/diagram-test/components/Shapes/complexLogic/JointJSComparator";
import {Comparator} from "@/app/diagram-test/components/Shapes/classes/comparator";
import {JointJSDecoder} from "@/app/diagram-test/components/Shapes/complexLogic/JointJSDecoder";
import {Decoder} from "@/app/diagram-test/components/Shapes/classes/decoder";
import {JointJSEncoder} from "@/app/diagram-test/components/Shapes/complexLogic/JointJSEncoder";
import {Encoder} from "@/app/diagram-test/components/Shapes/classes/encoder";
import { Pencil, Trash2, CircleAlert } from 'lucide-react';
import { dia } from "@joint/core";

interface Properties {
    label?: string;
    comparatorType?: string;
    aluType?: string;
    bandwidth?: number;
    addressBandwidth?: number;
    inputPorts?: number;
    instance?: string;
    createdInPorts?: { name: string; bandwidth: number; startBit?: number; endBit?: number }[];
    createdOutPorts?: { name: string; bandwidth: number; startBit?: number; endBit?: number }[];
    resetPort?: boolean;
    enablePort?: boolean;
    qInverted?: boolean;
    clkEdge?: 'rising' | 'falling';
    rstEdge?: 'rising' | 'falling';
    rstType?: 'async' | 'sync';
}


const PropertiesPanel = () => {
    const { selectedElement,graph,setSelectedElement, updateElement, hasFormErrors, setHasFormErrors } = useDiagramContext();
    const [properties, setProperties] = useState<Properties>({
        label: '',
        instance: '',
        bandwidth: 1,
        addressBandwidth: 8,
        inputPorts: 2,
        comparatorType: '',
        aluType: '',
        createdInPorts: [],
        createdOutPorts: [],
        resetPort: false,
        enablePort: false,
        qInverted: false,
        clkEdge: 'rising',
        rstEdge: 'falling',
        rstType: 'async',
    });
    const [portWidthMode, setPortWidthMode] = useState<'bit' | 'vector' | 'struct'>('bit');
    const [logicWidthMode, setLogicWidthMode] = useState<'bit' | 'vector'>('bit');
    const [errorMessage, setErrorMessage] = useState('');
    const [showAddPortDialog, setShowAddPortDialog] = useState(false);
    const [newPortType, setNewPortType] = useState<'input' | 'output'>('input');
    const [newPortData, setNewPortData] = useState({ name: '', bandwidth: 1, startBit: 0, endBit: 0 });
    const [isEditingPort, setIsEditingPort] = useState(false);
    const [editPortIndex, setEditPortIndex] = useState<number | null>(null);
    const [editPortType, setEditPortType] = useState<'input' | 'output'>('input');
    const [showSaveNotification, setShowSaveNotification] = useState(false);
    const [panelWidth, setPanelWidth] = useState(300);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [clipboardCell, setClipboardCell] = useState<dia.Cell | null>(null);
    const panelRef = useRef<HTMLDivElement | null>(null);

    const handleWidthChange = (newWidth: number) => {
        setPanelWidth(newWidth);
    };

    useEffect(() => {
        if (selectedElement) {
            const props: Properties = {
                label: selectedElement.attributes.name || '',
                bandwidth: selectedElement.attributes.bandwidth || 1,
                inputPorts: selectedElement.attributes.inPorts || 0,
                createdInPorts: selectedElement.attributes.moduleInPorts || selectedElement.attributes.combineInPorts || [],
                createdOutPorts: selectedElement.attributes.moduleOutPorts || selectedElement.attributes.selectOutPorts || [],
                instance: selectedElement.attributes.instance || '',
                comparatorType: selectedElement.attributes.comparatorType || '',
                aluType: selectedElement.attributes.aluType || '',
                addressBandwidth: selectedElement.attributes.addressBandwidth || 8,
                resetPort: selectedElement.attributes.resetPort ?? false,
                enablePort: selectedElement.attributes.enablePort ?? false,
                qInverted: selectedElement.attributes.qInverted ?? false,
                clkEdge: selectedElement.attributes.clkEdge || 'rising',
                rstEdge: selectedElement.attributes.rstEdge || 'falling',
                rstType: selectedElement.attributes.rstType || 'async',

            };

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
                comparatorType: '',
                aluType: '',
                createdInPorts: [],
                createdOutPorts: [],
                resetPort: false,
                enablePort: false,
                qInverted: false,
                clkEdge: 'rising',
                rstEdge: 'falling',
                rstType: 'async',

            });
        }
    }, [selectedElement]);


    function validateField(fieldName: string, fieldValue: any): string {
        if (typeof fieldValue === 'string') {
            const trimmedValue = fieldValue.trim();
            if (!trimmedValue) {
                return "The field can't be empty";
            }
            const nameRegex = /^[a-zA-Z_][a-zA-Z0-9_]*$/;
            if (fieldName === 'label' && !nameRegex.test(trimmedValue)) {
                return "Invalid name. Use only letters, digits and underscores. Must start with a letter or underscore.";
            }
            if (fieldName === 'label') {
                const allElements = graph.getElements();
                const duplicate = allElements.find(cell =>
                    cell.id !== selectedElement?.id && cell.attributes.name === trimmedValue
                );
                if (duplicate) {
                    return "Name must be unique. This name is already used.";
                }
            }
        }

        if (typeof fieldValue === 'number') {
            if (fieldValue <= 0) {
                return "The value must be > 0";
            }
        }

        return "";
    }

    const handleChange = (e: { target: { name: string; type: string; checked?: boolean; value?: any; }; }) => {
        const { name, type, checked, value} = e.target;

        let newValue: any = value;
        if (type === 'checkbox') {
            newValue = checked;
        } else if (type === 'number') {
            newValue = Number(value);
        }


        const errorMsg = validateField(name, newValue);

        setErrors(prev => ({
            ...prev,
            [name]: errorMsg
        }));

        const newErrors = { ...errors, [name]: errorMsg };
        const hasAnyError = Object.values(newErrors).some((msg) => msg);


        setHasFormErrors(hasAnyError);

        console.log(hasAnyError);

        setProperties(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked :
                (name === 'bandwidth' || name === 'inputPorts' || name === 'addressBandwidth'
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
        setNewPortData({ name: '', bandwidth: 1, startBit: 0, endBit: 0 });
        setShowAddPortDialog(true);

        setIsEditingPort(false);
        setEditPortIndex(null);
    };

    const handleAddOutputPort = () => {
        setNewPortType('output');
        setNewPortData({ name: '', bandwidth: 1, startBit: 0, endBit: 0 });
        setShowAddPortDialog(true);

        setIsEditingPort(false);
        setEditPortIndex(null);
    };

    const handleNewPortDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewPortData(prev => ({
            ...prev,
            [name]: name === 'bandwidth' || name === 'startBit' || name === 'endBit' ? Number(value) : value
        }));
    };

    const handleNewPortSubmit = () => {
        if (!selectedElement) return;

        setErrorMessage('');

        if (!newPortData.name.trim()) {
            setErrorMessage('Port Name is mandatory');
            return;
        }
        if (['bitCombine', 'newModule'].includes(selectedElement.attributes.elType) && newPortData.bandwidth < 1) {
            setErrorMessage('Bandwidth must be > 0');
            return;
        }

        if (isEditingPort && editPortIndex !== null) {
            if (editPortType === 'input') {
                const updated = [...properties.createdInPorts];
                updated[editPortIndex] = {
                    name: newPortData.name,
                    bandwidth: newPortData.bandwidth,
                    startBit: newPortData.startBit,
                    endBit: newPortData.endBit
                };
                setProperties(prev => ({
                    ...prev,
                    createdInPorts: updated,
                }));
            } else {
                const updated = [...properties.createdOutPorts];
                updated[editPortIndex] = {
                    name: newPortData.name,
                    bandwidth: newPortData.bandwidth,
                    startBit: newPortData.startBit,
                    endBit: newPortData.endBit
                };
                setProperties(prev => ({
                    ...prev,
                    createdOutPorts: updated,
                }));
            }
        }
        else {
            if (newPortType === 'input') {
                setProperties(prev => ({
                    ...prev,
                    createdInPorts: [
                        ...prev.createdInPorts,
                        {
                            name: newPortData.name,
                            bandwidth: newPortData.bandwidth,
                            startBit: newPortData.startBit,
                            endBit: newPortData.endBit
                        }
                    ]
                }));
            } else {
                setProperties(prev => ({
                    ...prev,
                    createdOutPorts: [
                        ...prev.createdOutPorts,
                        {
                            name: newPortData.name,
                            bandwidth: newPortData.bandwidth,
                            startBit: newPortData.startBit,
                            endBit: newPortData.endBit
                        }
                    ]
                }));
            }
        }

        setShowAddPortDialog(false);

        setIsEditingPort(false);
        setEditPortIndex(null);
    };

    const handleNewPortCancel = () => {
        setShowAddPortDialog(false);
    };


    const handleMultiplexerPortChange = () => {
        if (selectedElement?.attributes.elType === 'multiplexer') {
            const { x, y } = selectedElement.position();
            const multiplexerData = new Multiplexer();
            multiplexerData.name = properties.label || '';
            multiplexerData.dataBandwidth = properties.bandwidth || 1;
            multiplexerData.dataPorts = properties.inputPorts || 2;
            multiplexerData.position = { x, y };

            graph.removeCells([selectedElement]);
            const newMultiplexer = JointJSMultiplexer(multiplexerData);
            graph.addCell(newMultiplexer);
            setSelectedElement(newMultiplexer);
        }
    };

    const handleModulePortChange = () => {
        if (!selectedElement) return;

        const newMod = new Module();
        newMod.name = properties.label || '';
        newMod.instance = properties.instance || '';

        newMod.inPorts = properties.createdInPorts.map((p, i) => ({
            name: p.name,
            bandwidth: p.bandwidth,
        }));
        newMod.outPorts = properties.createdOutPorts.map((p, i) => ({
            name: p.name,
            bandwidth: p.bandwidth,
        }));

        const { x, y } = selectedElement.position();
        newMod.position = { x, y };

        graph.removeCells([selectedElement]);

        const newModuleCell = JointJSNewModule(newMod);
        graph.addCell(newModuleCell);

        setSelectedElement(newModuleCell);
    };

    const handleBitSelectPortChange = () => {
        if (!selectedElement) return;

        const newBitSelect = new BitSelect();
        newBitSelect.name = properties.label || '';

        newBitSelect.outPorts = properties.createdOutPorts.map((p, i) => ({
            name: p.name,
            bandwidth: p.bandwidth,
            startBit: p.startBit,
            endBit: p.endBit
        }));

        const { x, y } = selectedElement.position();
        newBitSelect.position = { x, y };

        graph.removeCells([selectedElement]);

        const newBitSelectCell = JointJSBitSelect(newBitSelect);
        graph.addCell(newBitSelectCell);

        setSelectedElement(newBitSelectCell);
    };

    const handleBitCombinePortChange = () => {
        if (!selectedElement) return;

        const bitCombine = new BitCombine();
        bitCombine.name = properties.label || '';

        bitCombine.inPorts = properties.createdInPorts.map((p, i) => ({
            name: p.name,
            bandwidth: p.bandwidth,
        }));

        const { x, y } = selectedElement.position();
        bitCombine.position = { x, y };

        graph.removeCells([selectedElement]);

        const newBitCombineCell = JointJSBitCombine(bitCombine);
        graph.addCell(newBitCombineCell);

        setSelectedElement(newBitCombineCell);
    };

    const handleEditPort = (portType: 'input' | 'output', index: number) => {
        setIsEditingPort(true);
        setEditPortIndex(index);
        setEditPortType(portType);
        setErrorMessage('');

        const currentPort = portType === 'input'
            ? properties.createdInPorts[index]
            : properties.createdOutPorts[index];

        setNewPortData({
            name: currentPort.name,
            bandwidth: currentPort.bandwidth,
            startBit: currentPort.startBit || 0,
            endBit: currentPort.endBit || 0
        });

        setShowAddPortDialog(true);
    };
    const handleDeletePort = (portType: 'input' | 'output', index: number) => {
        if (portType === 'input') {
            const updatedInPorts = [...properties.createdInPorts];
            updatedInPorts.splice(index, 1);
            setProperties(prev => ({ ...prev, createdInPorts: updatedInPorts }));
        } else {
            const updatedOutPorts = [...properties.createdOutPorts];
            updatedOutPorts.splice(index, 1);
            setProperties(prev => ({ ...prev, createdOutPorts: updatedOutPorts }));
        }
    };

    const handleMemoryPortChange = () => {
        if (selectedElement?.attributes.elType === 'register') {
            const { x, y } = selectedElement.position();
            const registerData = new Register();
            registerData.name = properties.label || '';
            registerData.resetPort = properties.resetPort || false;
            registerData.enablePort = properties.enablePort || false;
            registerData.dataBandwidth = properties.bandwidth || 1;
            registerData.position = { x, y };
            registerData.clkEdge = properties.clkEdge;
            registerData.rstEdge = properties.rstEdge;
            registerData.qInverted = properties.qInverted;
            registerData.rstType = properties.rstType;

            graph.removeCells([selectedElement]);
            const newRegister = JointJSRegister(registerData);
            graph.addCell(newRegister);
            setSelectedElement(newRegister);
        }
        if (selectedElement?.attributes.elType === 'ram') {
            const { x, y } = selectedElement.position();
            const ramData = new Ram();
            ramData.name = properties.label || '';
            ramData.dataBandwidth = properties.bandwidth || 1;
            ramData.addressBandwidth = properties.addressBandwidth || 8;
            ramData.position = { x, y };
            ramData.clkEdge = properties.clkEdge;

            graph.removeCells([selectedElement]);
            const newRam = JointJSSRam(ramData);
            graph.addCell(newRam);
            setSelectedElement(newRam);
        }
    }
    const handleLogicPortChange = () => {
        if (!selectedElement) return;

        const logicGates = {
            'and': { class: And, create: JointJSAnd },
            'or': { class: Or, create: JointJSOr },
            'xor': { class: Xor, create: JointJSXor },
            'xnor': { class: Xnor, create: JointJSXnor },
            'nand': { class: Nand, create: JointJSNand },
            'nor': { class: Nor, create: JointJSNor }
        };

        const elType = selectedElement.attributes.elType;
        const gate = logicGates[elType];

        if (gate) {
            const { x, y } = selectedElement.position();
            const gateData = new gate.class();
            gateData.name = properties.label || '';
            gateData.inPorts = properties.inputPorts || 2;
            gateData.bandwidth = properties.bandwidth || 1;
            gateData.position = { x, y };

            graph.removeCells([selectedElement]);
            const newGate = gate.create(gateData);
            graph.addCell(newGate);
            setSelectedElement(newGate);
        }
    };
    const handlePortElementChange = () => {
        if (!selectedElement) return;

        const portTypes = {
            'input': { class: Port, create: JointJSInputPort },
            'output': { class: Port, create: JointJSOutputPort },
        };

        const elType = selectedElement.attributes.elType;
        const port = portTypes[elType];

        if (port) {
            const { x, y } = selectedElement.position();
            const portData = new port.class();
            portData.name = properties.label || '';
            portData.bandwidth = properties.bandwidth || 1;
            portData.position = { x, y };

            graph.removeCells([selectedElement]);
            const newPort = port.create(portData);
            graph.addCell(newPort);
            setSelectedElement(newPort);
        }
    };

    const handleComplexLogicChange = () => {
        if (!selectedElement) return;

        const complexLogicTypes = {
            'alu': { class: Alu, create: JointJSAlu },
            'comparator': { class: Comparator, create: JointJSComparator },
        };

        const elType = selectedElement.attributes.elType;
        const complexElement = complexLogicTypes[elType];

        if (complexElement) {
            const { x, y } = selectedElement.position();
            const complexElementData = new complexElement.class();
            complexElementData.name = properties.label || '';
            complexElementData.dataBandwidth = properties.bandwidth || 1;
            if (elType === 'comparator') {

                complexElementData.type = properties.comparatorType || '>';
            }
            else {
                complexElementData.type = properties.aluType || '+';
            }
            complexElementData.position = { x, y };

            graph.removeCells([selectedElement]);
            const newComplexElement = complexElement.create(complexElementData);
            graph.addCell(newComplexElement);
            setSelectedElement(newComplexElement);
        }
    };
    const handleEncodeDecodeChange = () => {
        if (!selectedElement) return;

        const encodeDecodeTypes = {
            'decoder': { class: Decoder, create: JointJSDecoder },
            'encoder': { class: Encoder, create: JointJSEncoder },
        };

        const elType = selectedElement.attributes.elType;
        const encodeDecode = encodeDecodeTypes[elType];

        if (encodeDecode) {
            const { x, y } = selectedElement.position();
            const encodeDecodeData = new encodeDecode.class();
            encodeDecodeData.name = properties.label || '';
            encodeDecodeData.dataBandwidth = properties.bandwidth || 1;
            encodeDecodeData.position = { x, y };

            graph.removeCells([selectedElement]);
            const newEncodeDecodeElement = encodeDecode.create(encodeDecodeData);
            graph.addCell(newEncodeDecodeElement);
            setSelectedElement(newEncodeDecodeElement);
        }
    };


    const handleSave = () => {
        if (!selectedElement) return;

        const hasAnyErrors = Object.values(errors).some((msg) => msg);
        if (hasAnyErrors) {
            alert("Cannot save! Check if the fields are filled in correctly");
            return;
        }

        const attrsToUpdate: any = {};

        setShowSaveNotification(true);

        if (selectedElement.attributes.elType === 'multiplexer') {
            handleMultiplexerPortChange();
            return;
        }
        else if (selectedElement.attributes.elType === 'comparator') {
            handleComplexLogicChange();
            return;
        }
        else if (selectedElement.attributes.elType === 'decoder') {
            handleEncodeDecodeChange();
            return;
        }
        else if (selectedElement.attributes.elType === 'encoder') {
            handleEncodeDecodeChange();
            return;
        }
        else if (selectedElement.attributes.elType === 'ram') {
            selectedElement.attributes.addressBandwidth = properties.addressBandwidth;
            handleMemoryPortChange();
            return;
        }
        else if (selectedElement.attributes.elType === 'register') {
            handleMemoryPortChange();
            return;
        }

        else if (selectedElement.attributes.elType === 'newModule') {
            handleModulePortChange();
            // attrsToUpdate.label = { text: properties.label + '\n' + properties.instance };
            return;

        }
        else if (selectedElement.attributes.elType === 'bitCombine') {
            handleBitCombinePortChange()
            return;
        }
        else if (selectedElement.attributes.elType === 'bitSelect') {
            handleBitSelectPortChange()
            return;
        }
        else if (selectedElement.attributes.elType === 'alu') {
            handleComplexLogicChange();
            return;
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
        else if (selectedElement.attributes.elType === 'input') {
            handlePortElementChange();
            return;
        }
        else if (selectedElement.attributes.elType === 'output') {
            handlePortElementChange();
            return;
        }
        else {
            attrsToUpdate.label = { text: properties.label };
        }
        selectedElement.attributes.bandwidth = properties.bandwidth;

        selectedElement.attr(attrsToUpdate);
        updateElement(selectedElement);

    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
                handleSave();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [handleSave]);

    function handleCopy() {
        if (!selectedElement) return;
        const clone = selectedElement.clone();
        setClipboardCell(clone);
        console.log("Copied element:", clone);
    }

    function handlePaste() {
        if (!clipboardCell) return;

        const newCell = clipboardCell.clone();

        if (newCell.attributes.name && newCell.attributes.attrs?.label?.text) {
            newCell.attr('label/text', newCell.attributes.attrs.label.text + '_copy');
            newCell.attributes.name = newCell.attributes.name + '_copy';
        }

        const pos = newCell.position();
        newCell.position(pos.x + 20, pos.y + 20);
        graph.addCell(newCell);

        setSelectedElement(newCell);
        console.log("Pasted element:", newCell);
    }

    useHotkeys({
        onSave: handleSave,
        onCopy: handleCopy,
        onPaste: handlePaste,
    });

    const handleBandwidthRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newMode = e.target.value as 'bit' | 'vector' | 'struct';
        setPortWidthMode(newMode);

        if (newMode === 'bit') {
            setProperties(prev => ({ ...prev, bandwidth: 1 }));
        } else if (newMode === 'vector') {
            setProperties(prev => ({ ...prev, bandwidth: 2 }));
        } else {
            setProperties(prev => ({ ...prev, bandwidth: 0 }));
        }
    };
    const handleLogicRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newMode = e.target.value as 'bit' | 'vector';
        setLogicWidthMode(newMode);

        if (newMode === 'bit') {
            setProperties(prev => ({ ...prev, bandwidth: 1 }));
        } else {
            setProperties(prev => ({...prev, bandwidth: 2}));
        }
    };
    function toTitleCase(str: string) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }


    if (!selectedElement || selectedElement.isLink()) {
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
            ref={panelRef}
            className={styles.propertiesPanel}
            defaultWidth={300}
            direction="left"
            onWidthChange={handleWidthChange}
        >
            <h3>{selectedElement.attributes.elType.toUpperCase()} Properties</h3>


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
                        {errors.label && (
                            <div className={styles.errorMessage}>
                                <CircleAlert className={styles.errorIcon} />
                                {errors.label}
                            </div>
                        )}
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
                            {errors.bandwidth && (
                                <div className={styles.errorMessage}>
                                    <CircleAlert className={styles.errorIcon} />
                                    {errors.bandwidth}
                                </div>
                            )}
                        </label>
                    )}
                    {portWidthMode === 'struct' && (
                        <label>
                            Choose package file:
                            <select
                                value='packageFile'
                            >
                                <option value="">--Select--</option>
                            </select>
                            Choose user defined type:
                            <select
                                value='packageType'
                            >
                                <option value="">--Select--</option>
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
                        {errors.label && (
                            <div className={styles.errorMessage}>
                                <CircleAlert className={styles.errorIcon} />
                                {errors.label}
                            </div>
                        )}
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
                                type="number"
                                name="inputPorts"
                                value={properties.inputPorts || 0}
                                onChange={handleChange}
                            />
                            {errors.inputPorts && (
                                <div className={styles.errorMessage}>
                                    <CircleAlert className={styles.errorIcon} />
                                    {errors.inputPorts}
                                </div>
                            )}
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
                            {errors.bandwidth && (
                                <div className={styles.errorMessage}>
                                    <CircleAlert className={styles.errorIcon} />
                                    {errors.bandwidth}
                                </div>
                            )}
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
                        {errors.label && (
                            <div className={styles.errorMessage}>
                                <CircleAlert className={styles.errorIcon} />
                                {errors.label}
                            </div>
                        )}
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
                            {errors.bandwidth && (
                                <div className={styles.errorMessage}>
                                    <CircleAlert className={styles.errorIcon} />
                                    {errors.bandwidth}
                                </div>
                            )}
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
                                name="packageType"
                            >
                                {/*<option value=">">{'>'}</option>*/}
                            </select>
                        </label>
                    )}

                    <label>
                        Multiplexer type:
                        <select onChange={handleChange} defaultValue="2" name="inputPorts">
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
                        {errors.label && (
                            <div className={styles.errorMessage}>
                                <CircleAlert className={styles.errorIcon} />
                                {errors.label}
                            </div>
                        )}
                    </label>
                    <label>
                    DATA width:
                        <input
                            type="number"
                            name="bandwidth"
                            value={properties.bandwidth || 0}
                            onChange={handleChange}
                        />
                        {errors.bandwidth && (
                            <div className={styles.errorMessage}>
                                <CircleAlert className={styles.errorIcon} />
                                {errors.bandwidth}
                            </div>
                        )}
                    </label>

                </>

            )}

            {(['alu', 'comparator'].includes(selectedElement.attributes.elType)) && (
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
                        {errors.label && (
                            <div className={styles.errorMessage}>
                                <CircleAlert className={styles.errorIcon} />
                                {errors.label}
                            </div>
                        )}
                    </label>
                    <label>
                        DATA width:
                        <input
                            type="number"
                            name="bandwidth"
                            value={properties.bandwidth || 0}
                            onChange={handleChange}
                        />
                        {errors.bandwidth && (
                            <div className={styles.errorMessage}>
                                <CircleAlert className={styles.errorIcon} />
                                {errors.bandwidth}
                            </div>
                        )}
                    </label>
                    {selectedElement.attributes.elType === 'alu' && (
                        <label>
                            ALU Type:
                            <select
                                name="aluType"
                                value={properties.aluType}
                                onChange={handleChange}
                            >
                                <option value="+">{'+'}</option>
                                <option value="-">{'-'}</option>
                                <option value="*">{'*'}</option>
                                <option value="/">{'/'}</option>
                                <option value="%">{'%'}</option>
                            </select>
                        </label>
                    )}
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
                        {errors.label && (
                            <div className={styles.errorMessage}>
                                <CircleAlert className={styles.errorIcon} />
                                {errors.label}
                            </div>
                        )}
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
                        {errors.instance && (
                            <div className={styles.errorMessage}>
                                <CircleAlert className={styles.errorIcon} />
                                {errors.instance}
                            </div>
                        )}
                    </label>

                    <div className={styles.portSection}>
                        <h4>Input Ports</h4>
                        {properties.createdInPorts.map((p, idx) => (
                            <div key={idx} className={styles.portItem}>
                                <span>{p.name} (bw={p.bandwidth})</span>

                                <Pencil
                                    className={styles.portIcon}
                                    onClick={() => handleEditPort('input', idx)}
                                />

                                <Trash2
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
                        {properties.createdOutPorts.map((p, idx) => (
                            <div key={idx} className={styles.portItem}>
                                <span>{p.name} (bw={p.bandwidth})</span>

                                <Pencil
                                    className={styles.portIcon}
                                    onClick={() => handleEditPort('output', idx)}
                                />

                                <Trash2
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
                        {errors.label && (
                            <div className={styles.errorMessage}>
                                <CircleAlert className={styles.errorIcon} />
                                {errors.label}
                            </div>
                        )}
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
                            {errors.addressBandwidth && (
                                <div className={styles.errorMessage}>
                                    <CircleAlert className={styles.errorIcon} />
                                    {errors.addressBandwidth}
                                </div>
                            )}
                        </label>
                    )}
                    {(['register'].includes(selectedElement.attributes.elType)) && (
                        <>
                            <label>
                                Reset Port:
                                <input
                                    type="checkbox"
                                    name="resetPort"
                                    checked={!!properties.resetPort}
                                    onChange={handleChange}
                                />
                            </label>
                            <label>
                                Enable Port:
                                <input
                                    type="checkbox"
                                    name="enablePort"
                                    checked={!!properties.enablePort}
                                    onChange={handleChange}
                                />
                            </label>
                            <label>
                                Q Output Inversion:
                                <input
                                    type="checkbox"
                                    name="qInverted"
                                    checked={!!properties.qInverted}
                                    onChange={handleChange}
                                />
                            </label>
                            {(properties.resetPort) && (
                                <>
                                    <label>
                                        Reset Edge:
                                        <select
                                            name="rstEdge"
                                            value={properties.rstEdge}
                                            onChange={handleChange}>
                                            <option value="rising">Rising</option>
                                            <option value="falling">Falling</option>
                                        </select>
                                    </label>
                                    <label>
                                        Reset Type:
                                        <select
                                            name="rstType"
                                            value={properties.rstType}
                                            onChange={handleChange}>
                                            <option value="async">Asynchronous</option>
                                            <option value="sync">Synchronous</option>
                                        </select>
                                    </label>

                                </>
                            )}
                        </>
                    )}


                    <label>
                        Clock Edge:
                        <select
                            name="clkEdge"
                            value={properties.clkEdge}
                            onChange={handleChange}>
                            <option value="rising">Rising</option>
                            <option value="falling">Falling</option>
                        </select>
                    </label>
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
                            {errors.bandwidth && (
                                <div className={styles.errorMessage}>
                                    <CircleAlert className={styles.errorIcon} />
                                    {errors.bandwidth}
                                </div>
                            )}
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
                                name="packageType"
                            >
                                {/*<option value=">">{'>'}</option>*/}
                            </select>
                        </label>
                    )}
                </>
            )}
            {(['bitCombine', 'bitSelect'].includes(selectedElement.attributes.elType)) && (
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
                        {errors.label && (
                            <div className={styles.errorMessage}>
                                <CircleAlert className={styles.errorIcon} />
                                {errors.label}
                            </div>
                        )}
                    </label>
                    {(['bitCombine'].includes(selectedElement.attributes.elType)) && (
                        <div className={styles.portSection}>
                            <h4>Input Ports</h4>
                            {properties.createdInPorts.map((p, idx) => (
                                <div key={idx} className={styles.portItem}>
                                    <span>{p.name} (bw={p.bandwidth})</span>

                                    <Pencil
                                        className={styles.portIcon}
                                        onClick={() => handleEditPort('input', idx)}
                                    />

                                    <Trash2
                                        className={styles.portIcon}
                                        onClick={() => handleDeletePort('input', idx)}
                                    />
                                </div>
                            ))}
                            <button onClick={handleAddInputPort} className={styles.addPortButton}>
                                Add Input Port
                            </button>
                        </div>
                    )}
                    {(['bitSelect'].includes(selectedElement.attributes.elType)) && (
                        <div className={styles.portSection}>
                            <h4>Output Ports</h4>
                            {properties.createdOutPorts.map((p, idx) => (
                                <div key={idx} className={styles.portItem}>
                                    <span>{p.name} ({p.startBit} - {p.endBit})</span>

                                    <Pencil
                                        className={styles.portIcon}
                                        onClick={() => handleEditPort('output', idx)}
                                    />

                                    <Trash2
                                        className={styles.portIcon}
                                        onClick={() => handleDeletePort('output', idx)}
                                    />
                                </div>
                            ))}
                            <button onClick={handleAddOutputPort} className={styles.addPortButton}>
                                Add Output Port
                            </button>
                        </div>
                    )}



                </>

            )}

            <div className={styles.buttonContainer}>
                <button onClick={handleSave} className={styles.saveButton}>
                    Save
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
                                <CircleAlert className={styles.errorIcon} />
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
                            {errors.label && (
                                <div className={styles.errorMessage}>
                                    <CircleAlert className={styles.errorIcon} />
                                    {errors.label}
                                </div>
                            )}
                        </label>
                        {(['bitCombine', 'newModule'].includes(selectedElement.attributes.elType)) && (
                            <label>
                                Bandwidth:
                                <input
                                    type="number"
                                    name="bandwidth"
                                    value={newPortData.bandwidth}
                                    onChange={handleNewPortDataChange}
                                />
                            </label>
                        )
                        }
                        {(['bitSelect'].includes(selectedElement.attributes.elType)) && (
                            <>
                                <label>
                                    End Bit:
                                    <input
                                        type="number"
                                        name="endBit"
                                        value={newPortData.endBit}
                                        onChange={handleNewPortDataChange}
                                    />
                                </label>
                                <label>
                                    Start Bit:
                                    <input
                                        type="number"
                                        name="startBit"
                                        value={newPortData.startBit}
                                        onChange={handleNewPortDataChange}
                                    />
                                </label>
                            </>
                        )
                        }
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
