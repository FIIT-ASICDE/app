// pages/diagram-test/components/PropertiesPanel/PropertiesPanel.tsx
import React, { useState, useEffect, useRef } from "react";
import { useHotkeys } from "@/app/diagram-test/hooks/useHotkeys";
import { useDiagramContext } from "@/app/diagram-test/context/useDiagramContext";
import ResizablePanel from '@/app/diagram-test/components/common/ResizablePanel';
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
import {Sram} from "@/app/diagram-test/components/Shapes/classes/sram";
import {JointJSCombiner} from "@/app/diagram-test/components/Shapes/bitOperations/JointJSCombiner";
import {Combiner} from "@/app/diagram-test/components/Shapes/classes/combiner";
import {JointJSSplitter} from "@/app/diagram-test/components/Shapes/bitOperations/JointJSSplitter";
import {Splitter} from "@/app/diagram-test/components/Shapes/classes/splitter";
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
import { parseSystemVerilogText } from '@/app/diagram-test/utils/DiagramGeneration/SystemVerilog/SVParser'
import { dia } from "@joint/core";


interface Properties {
    label?: string;
    comparatorType?: string;
    aluType?: string;
    bandwidth?: number;
    bandwidthType?: string;
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
    bitPortType?: string;
}


const PropertiesPanel = () => {
    const { selectedElement,graph,setSelectedElement, updateElement, setHasFormErrors } = useDiagramContext();
    const [properties, setProperties] = useState<Properties>({
        label: '',
        instance: '',
        bandwidth: 1,
        bandwidthType: 'bit',
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
        bitPortType: 'custom'
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [showAddPortDialog, setShowAddPortDialog] = useState(false);
    const [newPortType, setNewPortType] = useState<'input' | 'output'>('input');
    const [newPortData, setNewPortData] = useState({ name: '', bandwidth: 1, startBit: 0, endBit: 0 });
    const [isEditingPort, setIsEditingPort] = useState(false);
    const [editPortIndex, setEditPortIndex] = useState<number | null>(null);
    const [editPortType, setEditPortType] = useState<'input' | 'output'>('input');
    const [showSaveNotification, setShowSaveNotification] = useState(false);
    const [showErrorNotification, setShowErrorNotification] = useState(false);
    const [panelWidth, setPanelWidth] = useState(300);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [clipboardCell, setClipboardCell] = useState<dia.Cell | null>(null);
    const panelRef = useRef<HTMLDivElement | null>(null);
    const [parseResults, setParseResults] = useState<any>(null);


    const handleWidthChange = (newWidth: number) => {
        setPanelWidth(newWidth);
    };

    useEffect(() => {
        if (selectedElement) {
            const props: Properties = {
                label: selectedElement.attributes.name || '',
                bandwidth: selectedElement.attributes.bandwidth || 1,
                bandwidthType: selectedElement.attributes.bandwidth === 1 ? 'bit' : selectedElement.attributes.isStruct ? 'struct' : 'vector',
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
                bitPortType: selectedElement.attributes.bitPortType || 'custom',

            };

            setProperties(props);
        } else {
            setProperties({
                label: '',
                instance: '',
                bandwidth: 1,
                bandwidthType: 'bit',
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
                bitPortType: 'custom'

            });
        }
    }, [selectedElement]);

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        // Чтение файла как текст
        const reader = new FileReader();
        reader.onload = (e) => {
            const content = e.target?.result as string;
            if (content) {
                const packages = parseSystemVerilogText(content);
                console.log('Parsed packages:', packages);
                // Здесь вы можете обработать результаты парсинга
            }
        };
        reader.readAsText(file);
    };

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
        if (showErrorNotification) {
            const timer = setTimeout(() => {
                setShowErrorNotification(false);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [showSaveNotification, showErrorNotification]);

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
        if (['combiner', 'newModule'].includes(selectedElement.attributes.elType) && newPortData.bandwidth < 1) {
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

    const handleSplitterPortChange = () => {
        if (!selectedElement) return;

        const newSplitter = new Splitter();
        newSplitter.name = properties.label || '';
        newSplitter.bitPortType = properties.bitPortType || 'custom';

        newSplitter.outPorts = properties.createdOutPorts.map((p, i) => ({
            name: p.name,
            bandwidth: p.bandwidth,
            startBit: p.startBit,
            endBit: p.endBit
        }));

        const { x, y } = selectedElement.position();
        newSplitter.position = { x, y };

        graph.removeCells([selectedElement]);

        const newSplitterCell = JointJSSplitter(newSplitter);
        graph.addCell(newSplitterCell);

        setSelectedElement(newSplitterCell);
    };

    const handleCombinerPortChange = () => {
        if (!selectedElement) return;

        const newCombiner = new Combiner();
        newCombiner.name = properties.label || '';
        newCombiner.bitPortType = properties.bitPortType || 'custom';

        newCombiner.inPorts = properties.createdInPorts.map((p, i) => ({
            name: p.name,
            bandwidth: p.bandwidth,
        }));

        const { x, y } = selectedElement.position();
        newCombiner.position = { x, y };

        graph.removeCells([selectedElement]);

        const newCombinerCell = JointJSCombiner(newCombiner);
        graph.addCell(newCombinerCell);

        setSelectedElement(newCombinerCell);
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
        if (selectedElement?.attributes.elType === 'sram') {
            const { x, y } = selectedElement.position();
            const sramData = new Sram();
            sramData.name = properties.label || '';
            sramData.dataBandwidth = properties.bandwidth || 1;
            sramData.addressBandwidth = properties.addressBandwidth || 8;
            sramData.position = { x, y };
            sramData.clkEdge = properties.clkEdge;

            graph.removeCells([selectedElement]);
            const newSram = JointJSSRam(sramData);
            graph.addCell(newSram);
            setSelectedElement(newSram);
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
            setShowErrorNotification(true);
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
        else if (selectedElement.attributes.elType === 'sram') {
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
        else if (selectedElement.attributes.elType === 'combiner') {
            handleCombinerPortChange()
            return;
        }
        else if (selectedElement.attributes.elType === 'splitter') {
            handleSplitterPortChange()
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


    function toTitleCase(str: string) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }


    if (!selectedElement || selectedElement.isLink()) {
        return (
            <ResizablePanel
                className="bg-white border-l border-gray-200 shadow-md h-full overflow-y-auto"
                defaultWidth={300}
                direction="left"
                onWidthChange={handleWidthChange}
            >
                <h3 className="text-lg font-semibold p-4 border-b border-gray-200">Properties</h3>
                <p className="p-4 text-gray-600">Select an element to see its properties.</p>
            </ResizablePanel>
        );
    }

    return (
        <ResizablePanel
            ref={panelRef}
            className="bg-white border-l border-gray-200 shadow-md h-full overflow-y-auto"
            defaultWidth={300}
            direction="left"
            onWidthChange={handleWidthChange}
        >
            <h3 className="text-lg font-semibold p-4 border-b border-gray-200">
                {selectedElement.attributes.elType.toUpperCase()} Properties
            </h3>

            <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2">Test SystemVerilog Parser</h3>
                <input
                    type="file"
                    accept=".sv,.v"
                    onChange={handleFileUpload}
                    className="block w-full text-sm"
                />
            </div>

            <div className="p-4 space-y-4">
                {(['output', 'input', 'and', 'nand', 'xor', 'or', 'nor', 'not', 'xnor', 'multiplexer', 'decoder', 'encoder', 'alu', 'comparator', 'newModule', 'sram', 'register', 'combiner'].includes(selectedElement.attributes.elType)) && (
                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700">
                            {toTitleCase(selectedElement.attributes.elType)} name:
                        </label>
                        <input
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            type="text"
                            name="label"
                            placeholder="Port's name..."
                            value={properties.label || ''}
                            onChange={handleChange}
                        />
                        {errors.label && (
                            <div className="text-red-500 text-sm mt-1 flex items-center">
                                <CircleAlert className="w-4 h-4 mr-1" />
                                {errors.label}
                            </div>
                        )}
                    </div>
                )}

                {(['output', 'input', 'and', 'nand', 'xor', 'or', 'nor', 'not', 'xnor', 'multiplexer', 'decoder', 'encoder', 'alu', 'comparator', 'sram', 'register'].includes(selectedElement.attributes.elType)) && (
                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700">
                            Select Data width:
                        </label>
                        <select
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            name="bandwidthType"
                            value={properties.bandwidthType}
                            onChange={handleChange}>
                            <option value="bit">Bit</option>
                            <option value="vector">Vector</option>
                            {(['output', 'input', 'multiplexer', 'sram', 'register'].includes(selectedElement.attributes.elType)) && (
                                <option value="struct">User Defined</option>
                            )}
                        </select>
                        {properties.bandwidthType === 'vector' && (
                            <div className="space-y-1">
                                <label className="block text-sm font-medium text-gray-700">
                                    Width of vector:
                                </label>
                                <input
                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    type="number"
                                    name="bandwidth"
                                    value={properties.bandwidth || 0}
                                    onChange={handleChange}
                                />
                                {errors.bandwidth && (
                                    <div className="text-red-500 text-sm mt-1 flex items-center">
                                        <CircleAlert className="w-4 h-4 mr-1" />
                                        {errors.bandwidth}
                                    </div>
                                )}
                            </div>
                        )}

                        {properties.bandwidthType === 'struct' && (
                            <div className="space-y-3">
                                <div className="space-y-1">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Choose package file:
                                    </label>
                                    <select
                                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        value='packageFile'
                                    >
                                        <option value="">--Select--</option>
                                    </select>
                                </div>
                                <div className="space-y-1">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Choose user defined type:
                                    </label>
                                    <select
                                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        value='packageType'
                                    >
                                        <option value="">--Select--</option>
                                    </select>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {(['and', 'nand', 'xor', 'or', 'nor', 'xnor'].includes(selectedElement.attributes.elType)) && (
                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700">
                            Number of input ports:
                        </label>
                        <input
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            type="number"
                            name="inputPorts"
                            value={properties.inputPorts || 0}
                            onChange={handleChange}
                        />
                        {errors.inputPorts && (
                            <div className="text-red-500 text-sm mt-1 flex items-center">
                                <CircleAlert className="w-4 h-4 mr-1" />
                                {errors.inputPorts}
                            </div>
                        )}
                    </div>
                )}

                {selectedElement.attributes.elType === 'multiplexer' && (
                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700">
                            Multiplexer type:
                        </label>
                        <select
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            onChange={handleChange}
                            defaultValue="2"
                            name="inputPorts"
                        >
                            <option value="2">2-to-1</option>
                            <option value="4">4-to-1</option>
                            <option value="8">8-to-1</option>
                        </select>
                    </div>
                )}

                {selectedElement.attributes.elType === 'alu' && (
                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700">
                            ALU Type:
                        </label>
                        <select
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    </div>
                )}

                {selectedElement.attributes.elType === 'comparator' && (
                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700">
                            Comparator Type:
                        </label>
                        <select
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    </div>
                )}

                {(['newModule'].includes(selectedElement.attributes.elType)) && (
                    <>
                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-gray-700">
                                Instance name:
                            </label>
                            <input
                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                type="text"
                                name="instance"
                                placeholder="Insert instance..."
                                value={properties.instance || ''}
                                onChange={handleChange}
                            />
                            {errors.instance && (
                                <div className="text-red-500 text-sm mt-1 flex items-center">
                                    <CircleAlert className="w-4 h-4 mr-1" />
                                    {errors.instance}
                                </div>
                            )}
                        </div>

                        <div className="mt-6 border-t border-gray-200 pt-4">
                            <h4 className="font-medium text-gray-800 mb-2">Input Ports</h4>
                            <div className="space-y-1 max-h-40 overflow-y-auto">
                                {properties.createdInPorts.map((p, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-2 border-b border-gray-100">
                                        <span className="text-sm">{p.name} (bw={p.bandwidth})</span>
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => handleEditPort('input', idx)}
                                                className="text-blue-500 hover:text-blue-700"
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDeletePort('input', idx)}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button
                                onClick={handleAddInputPort}
                                className="mt-2 px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors"
                            >
                                Add Input Port
                            </button>
                        </div>

                        <div className="mt-4 border-t border-gray-200 pt-4">
                            <h4 className="font-medium text-gray-800 mb-2">Output Ports</h4>
                            <div className="space-y-1 max-h-40 overflow-y-auto">
                                {properties.createdOutPorts.map((p, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-2 border-b border-gray-100">
                                        <span className="text-sm">{p.name} (bw={p.bandwidth})</span>
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => handleEditPort('output', idx)}
                                                className="text-blue-500 hover:text-blue-700"
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDeletePort('output', idx)}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button
                                onClick={handleAddOutputPort}
                                className="mt-2 px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors"
                            >
                                Add Output Port
                            </button>
                        </div>
                    </>
                )}

                {(['sram', 'register'].includes(selectedElement.attributes.elType)) && (
                    <>
                        {(['sram'].includes(selectedElement.attributes.elType)) && (
                            <div className="space-y-1">
                                <label className="block text-sm font-medium text-gray-700">
                                    Address width:
                                </label>
                                <input
                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    type="number"
                                    name="addressBandwidth"
                                    placeholder="Insert width..."
                                    value={properties.addressBandwidth || ''}
                                    onChange={handleChange}
                                />
                                {errors.addressBandwidth && (
                                    <div className="text-red-500 text-sm mt-1 flex items-center">
                                        <CircleAlert className="w-4 h-4 mr-1" />
                                        {errors.addressBandwidth}
                                    </div>
                                )}
                            </div>
                        )}

                        {(['register'].includes(selectedElement.attributes.elType)) && (
                            <>
                                <div className="flex items-center space-x-2 mt-2">
                                    <input
                                        id="resetPort"
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                        type="checkbox"
                                        name="resetPort"
                                        checked={!!properties.resetPort}
                                        onChange={handleChange}
                                    />
                                    <label htmlFor="resetPort" className="text-sm font-medium text-gray-700">
                                        Reset Port
                                    </label>
                                </div>

                                <div className="flex items-center space-x-2 mt-2">
                                    <input
                                        id="enablePort"
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                        type="checkbox"
                                        name="enablePort"
                                        checked={!!properties.enablePort}
                                        onChange={handleChange}
                                    />
                                    <label htmlFor="enablePort" className="text-sm font-medium text-gray-700">
                                        Enable Port
                                    </label>
                                </div>

                                <div className="flex items-center space-x-2 mt-2">
                                    <input
                                        id="qInverted"
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                        type="checkbox"
                                        name="qInverted"
                                        checked={!!properties.qInverted}
                                        onChange={handleChange}
                                    />
                                    <label htmlFor="qInverted" className="text-sm font-medium text-gray-700">
                                        Q Output Inversion
                                    </label>
                                </div>

                                {(properties.resetPort) && (
                                    <div className="space-y-1 mt-3">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Reset Edge:
                                        </label>
                                        <select
                                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            name="rstEdge"
                                            value={properties.rstEdge}
                                            onChange={handleChange}>
                                            <option value="rising">Rising</option>
                                            <option value="falling">Falling</option>
                                        </select>
                                    </div>
                                )}

                                {(properties.resetPort) && (
                                    <div className="space-y-1 mt-3">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Reset Type:
                                        </label>
                                        <select
                                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            name="rstType"
                                            value={properties.rstType}
                                            onChange={handleChange}>
                                            <option value="async">Asynchronous</option>
                                            <option value="sync">Synchronous</option>
                                        </select>
                                    </div>
                                )}
                            </>
                        )}
                        <div className="space-y-1 mt-3">
                            <label className="block text-sm font-medium text-gray-700">
                                Clock Edge:
                            </label>
                            <select
                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                name="clkEdge"
                                value={properties.clkEdge}
                                onChange={handleChange}>
                                <option value="rising">Rising</option>
                                <option value="falling">Falling</option>
                            </select>
                        </div>
                    </>
                )}
                {(['combiner', 'splitter'].includes(selectedElement.attributes.elType)) && (
                    <>
                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700">
                            {selectedElement.attributes.elType === 'combiner' ? 'Input' : 'Output'} Ports Type
                        </label>
                        <select
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            name="bitPortType"
                            value={properties.bitPortType}
                            onChange={handleChange}>
                            <option value="custom">Custom Ports</option>
                            <option value="struct">User Defined</option>
                        </select>
                    </div>
                    {(['combiner'].includes(selectedElement.attributes.elType) && properties.bitPortType === 'custom') && (
                        <div className="mt-6 border-t border-gray-200 pt-4">
                            <h4 className="font-medium text-gray-800 mb-2">Input Ports</h4>
                            <div className="space-y-1 max-h-40 overflow-y-auto">
                                {properties.createdInPorts.map((p, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-2 border-b border-gray-100">
                                        <span className="text-sm">{p.name} (bw={p.bandwidth})</span>
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => handleEditPort('input', idx)}
                                                className="text-blue-500 hover:text-blue-700"
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDeletePort('input', idx)}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button
                                onClick={handleAddInputPort}
                                className="mt-2 px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors"
                            >
                                Add Input Port
                            </button>
                        </div>
                        )}
                    {(['splitter'].includes(selectedElement.attributes.elType) && properties.bitPortType === 'custom') && (
                        <div className="mt-4 border-t border-gray-200 pt-4">
                            <h4 className="font-medium text-gray-800 mb-2">Output Ports</h4>
                            <div className="space-y-1 max-h-40 overflow-y-auto">
                                {properties.createdOutPorts.map((p, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-2 border-b border-gray-100">
                                        <span className="text-sm">{p.name} ({p.startBit} - {p.endBit})</span>
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => handleEditPort('output', idx)}
                                                className="text-blue-500 hover:text-blue-700"
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDeletePort('output', idx)}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button
                                onClick={handleAddOutputPort}
                                className="mt-2 px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors"
                            >
                                Add Output Port
                            </button>
                        </div>
                    )}
                    {properties.bitPortType === 'struct' && (
                        <div className="space-y-3">
                            <div className="space-y-1">
                                <label className="block text-sm font-medium text-gray-700">
                                    Choose package file:
                                </label>
                                <select
                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    value='packageFile'
                                >
                                    <option value="">--Select--</option>
                                </select>
                            </div>
                            <div className="space-y-1">
                                <label className="block text-sm font-medium text-gray-700">
                                    Choose user defined type:
                                </label>
                                <select
                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    value='packageType'
                                >
                                    <option value="">--Select--</option>
                                </select>
                            </div>
                        </div>
                    )}

                    </>
                )}

                <div className="mt-6 pt-4 border-t border-gray-200">
                    <button
                        onClick={handleSave}
                        className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                    >
                        Save Changes
                    </button>
                </div>
            </div>

            {showSaveNotification && (
                <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg">
                    Changes saved successfully!
                </div>
            )}
            {showErrorNotification && (
                <div className="fixed bottom-4 right-4 bg-red-500 text-white px-4 py-2 rounded shadow-lg">
                    Changes cannot be saved!
                </div>
            )}

            {showAddPortDialog && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-96 shadow-xl">
                        <h3 className="text-lg font-semibold mb-4">
                            {isEditingPort ? 'Edit Port' : 'Add New Port'}
                        </h3>

                        {errorMessage && (
                            <div className="text-red-500 text-sm mt-1 flex items-center">
                                <CircleAlert className="w-4 h-4 mr-1" />
                                {errorMessage}
                            </div>
                        )}

                        <div className="space-y-4">
                            <div className="space-y-1">
                                <label className="block text-sm font-medium text-gray-700">
                                    Port Name:
                                </label>
                                <input
                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    type="text"
                                    name="name"
                                    value={newPortData.name}
                                    onChange={handleNewPortDataChange}
                                />
                            </div>
                            {(['combiner', 'newModule'].includes(selectedElement.attributes.elType)) && (
                                <div className="space-y-1">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Bandwidth:
                                    </label>
                                    <input
                                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        type="number"
                                        name="bandwidth"
                                        value={newPortData.bandwidth}
                                        onChange={handleNewPortDataChange}
                                    />
                                </div>
                                )}


                            {(['splitter'].includes(selectedElement.attributes.elType)) && (
                                <>
                                    <div className="space-y-1">
                                        <label className="block text-sm font-medium text-gray-700">
                                            End Bit:
                                        </label>
                                        <input
                                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            type="number"
                                            name="endBit"
                                            value={newPortData.endBit}
                                            onChange={handleNewPortDataChange}
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Start Bit:
                                        </label>
                                        <input
                                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            type="number"
                                            name="startBit"
                                            value={newPortData.startBit}
                                            onChange={handleNewPortDataChange}
                                        />
                                    </div>
                                </>
                            )}
                        </div>

                        <div className="flex justify-end mt-6 space-x-2">
                            <button
                                onClick={handleNewPortCancel}
                                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleNewPortSubmit}
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                            >
                                {isEditingPort ? 'Update' : 'Add'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </ResizablePanel>
    );
};

export default PropertiesPanel;
