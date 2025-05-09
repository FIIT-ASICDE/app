// pages/block-diagram/components/properties-panel/properties-panel.tsx
import React, { useState, useEffect } from "react";
import { useHotkeys } from "@/app/[userslug]/[repositoryslug]/block-diagram/hooks/use-hotkeys";
import { useDiagramContext } from "@/app/[userslug]/[repositoryslug]/block-diagram/context/use-diagram-context";
import {Multiplexer} from "@/app/[userslug]/[repositoryslug]/block-diagram/components/shapes/classes/multiplexer";
import {JointJsMultiplexer} from "@/app/[userslug]/[repositoryslug]/block-diagram/components/shapes/complex-logic/joint-js-multiplexer";
import {JointJsAnd} from "@/app/[userslug]/[repositoryslug]/block-diagram/components/shapes/gates/joint-js-and";
import {And} from "@/app/[userslug]/[repositoryslug]/block-diagram/components/shapes/classes/and";
import {JointJsOr} from "@/app/[userslug]/[repositoryslug]/block-diagram/components/shapes/gates/joint-js-or";
import {Or} from "@/app/[userslug]/[repositoryslug]/block-diagram/components/shapes/classes/or";
import {JointJsXor} from "@/app/[userslug]/[repositoryslug]/block-diagram/components/shapes/gates/joint-js-xor";
import {Xor} from "@/app/[userslug]/[repositoryslug]/block-diagram/components/shapes/classes/xor";
import {JointJsXnor} from "@/app/[userslug]/[repositoryslug]/block-diagram/components/shapes/gates/joint-js-xnor";
import {Xnor} from "@/app/[userslug]/[repositoryslug]/block-diagram/components/shapes/classes/xnor";
import {JointJsNand} from "@/app/[userslug]/[repositoryslug]/block-diagram/components/shapes/gates/joint-js-nand";
import {Nand} from "@/app/[userslug]/[repositoryslug]/block-diagram/components/shapes/classes/nand";
import {JointJsNor} from "@/app/[userslug]/[repositoryslug]/block-diagram/components/shapes/gates/joint-js-nor";
import {Nor} from "@/app/[userslug]/[repositoryslug]/block-diagram/components/shapes/classes/nor";
import {JointJsNot} from "@/app/[userslug]/[repositoryslug]/block-diagram/components/shapes/gates/joint-js-not";
import { Not } from "@/app/[userslug]/[repositoryslug]/block-diagram/components/shapes/classes/not";
import {JointJsModule} from "@/app/[userslug]/[repositoryslug]/block-diagram/components/shapes/modules/joint-js-module";
import {Module} from "@/app/[userslug]/[repositoryslug]/block-diagram/components/shapes/classes/module";
import {JointJsRegister} from "@/app/[userslug]/[repositoryslug]/block-diagram/components/shapes/memory/joint-js-register";
import {Register} from "@/app/[userslug]/[repositoryslug]/block-diagram/components/shapes/classes/register";
import {JointJsSram} from "@/app/[userslug]/[repositoryslug]/block-diagram/components/shapes/memory/joint-js-sram";
import {Sram} from "@/app/[userslug]/[repositoryslug]/block-diagram/components/shapes/classes/sram";
import {JointJsCombiner} from "@/app/[userslug]/[repositoryslug]/block-diagram/components/shapes/bit-operations/joint-js-combiner";
import {Combiner} from "@/app/[userslug]/[repositoryslug]/block-diagram/components/shapes/classes/combiner";
import {JointJsSplitter} from "@/app/[userslug]/[repositoryslug]/block-diagram/components/shapes/bit-operations/joint-js-splitter";
import {Splitter} from "@/app/[userslug]/[repositoryslug]/block-diagram/components/shapes/classes/splitter";
import {JointJsInputPort} from "@/app/[userslug]/[repositoryslug]/block-diagram/components/shapes/io/joint-js-input-port";
import {JointJsOutputPort} from "@/app/[userslug]/[repositoryslug]/block-diagram/components/shapes/io/joint-js-output-port";
import {Port} from "@/app/[userslug]/[repositoryslug]/block-diagram/components/shapes/classes/port";
import {JointJsAlu} from "@/app/[userslug]/[repositoryslug]/block-diagram/components/shapes/complex-logic/joint-js-alu";
import {Alu} from "@/app/[userslug]/[repositoryslug]/block-diagram/components/shapes/classes/alu";
import {JointJsComparator} from "@/app/[userslug]/[repositoryslug]/block-diagram/components/shapes/complex-logic/joint-js-comparator";
import {Comparator} from "@/app/[userslug]/[repositoryslug]/block-diagram/components/shapes/classes/comparator";
import {JointJsDecoder} from "@/app/[userslug]/[repositoryslug]/block-diagram/components/shapes/complex-logic/joint-js-decoder";
import {Decoder} from "@/app/[userslug]/[repositoryslug]/block-diagram/components/shapes/classes/decoder";
import {JointJsEncoder} from "@/app/[userslug]/[repositoryslug]/block-diagram/components/shapes/complex-logic/joint-js-encoder";
import {Encoder} from "@/app/[userslug]/[repositoryslug]/block-diagram/components/shapes/classes/encoder";
import { Pencil, Trash2, CircleAlert } from 'lucide-react';
import { api } from "@/lib/trpc/react";
import { dia } from "@joint/core";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import {Label} from "@/components/ui/label";
import { UnifiedPackage, ParsedModule } from "@/app/[userslug]/[repositoryslug]/block-diagram/utils/diagram-generation/interfaces";
import { toast } from "sonner";
import {
    parsePackagesAndStructs
} from "@/app/[userslug]/[repositoryslug]/block-diagram/parsers/system-verilog/parse-packages-and-structs";
import {
    parsePackagesAndRecords
} from "@/app/[userslug]/[repositoryslug]/block-diagram/parsers/vhdl/parse-packages-and-records";
import {
    parseEntities
} from "@/app/[userslug]/[repositoryslug]/block-diagram/parsers/vhdl/parse-entities";
import {
    parseModules
} from "@/app/[userslug]/[repositoryslug]/block-diagram/parsers/system-verilog/parse-modules";



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
    structPackage?: string;
    structTypeDef?: string;
    moduleType?: 'new' | 'existing';
    existingModule?: string;
}

const PropertiesPanel = () => {
    const { selectedElement, graph, setSelectedElement, setHasFormErrors, selectedLanguage, setSelectedLanguage, parseResults, setParseResults, repository, parseModulesResults, setParseModulesResults, checkLanguageLock } = useDiagramContext();
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
        bitPortType: 'custom',
        structPackage: '',
        structTypeDef: '',
        moduleType: 'new',
        existingModule: '',
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
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [clipboardCell, setClipboardCell] = useState<dia.Cell | null>(null);
    type ElementTypeKey =
        | 'input' | 'output' | 'and' | 'or' | 'xor' | 'xnor' | 'nand' | 'nor' | 'not'
        | 'alu' | 'comparator' | 'decoder' | 'encoder'
        | 'multiplexer' | 'splitter' | 'combiner'
        | 'sram' | 'register' | 'module';

    const elementTypes: Record<ElementTypeKey, { class: any; create: any }> = {
        'input': { class: Port, create: JointJsInputPort },
        'output': { class: Port, create: JointJsOutputPort },
        'and': { class: And, create: JointJsAnd },
        'or': { class: Or, create: JointJsOr },
        'xor': { class: Xor, create: JointJsXor },
        'xnor': { class: Xnor, create: JointJsXnor },
        'nand': { class: Nand, create: JointJsNand },
        'nor': { class: Nor, create: JointJsNor },
        'not': {class: Not, create: JointJsNot },
        'alu': { class: Alu, create: JointJsAlu },
        'comparator': { class: Comparator, create: JointJsComparator },
        'decoder': { class: Decoder, create: JointJsDecoder },
        'encoder': { class: Encoder, create: JointJsEncoder },
        'multiplexer': { class: Multiplexer, create: JointJsMultiplexer },
        'splitter': { class: Splitter, create: JointJsSplitter },
        'combiner': { class: Combiner, create: JointJsCombiner },
        'sram': { class: Sram, create: JointJsSram },
        'register': { class: Register, create: JointJsRegister },
        'module': { class: Module, create: JointJsModule}

    };


    useEffect(() => {
        if (selectedElement) {
            const props: Properties = {
                label: selectedElement.attributes.name || '',
                bandwidth: selectedElement.attributes.bandwidth || 1,
                bandwidthType: selectedElement.attributes.isStruct ? 'struct' : selectedElement.attributes.bandwidth === 1 ? 'bit' : 'vector',
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
                structPackage: selectedElement.attributes.structPackage || '',
                structTypeDef: selectedElement.attributes.structTypeDef || '',
                moduleType: selectedElement.attributes.moduleType || 'new',
                existingModule: selectedElement.attributes.existingModule || ''
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
                bitPortType: 'custom',
                structPackage: '',
                structTypeDef: '',
                moduleType: 'new',
                existingModule: '',

            });
        }
    }, [selectedElement]);


    const { data: allFiles } = api.repo.loadAllFilesInRepo.useQuery({
        ownerSlug: repository.ownerName,
        repositorySlug: repository.name,
    });
    useEffect(() => {
        if (allFiles) {
            console.log("📂 All loaded files with content:", allFiles);
        }
    }, [allFiles]);

    useEffect(() => {
        if (!allFiles) return;

        let parsedPackages: UnifiedPackage[] = [];

        const svFiles = allFiles.filter(
            (file) =>
                file.type === "file" &&
                file.name.toLowerCase().endsWith(".sv") &&
                file.content
        );
        const vhdlFiles = allFiles.filter(
            (file) =>
                file.type === "file" &&
                file.name.toLowerCase().endsWith(".vhd") &&
                file.content
        );

        if (selectedLanguage === "SystemVerilog") {
            parsedPackages = svFiles.flatMap((file) => {
                try {
                    return parsePackagesAndStructs(file.content);
                } catch (err) {
                    console.warn(`Failed to parse ${file.name}`, err);
                    return [];
                }
            });
        } else if (selectedLanguage === "VHDL") {
            parsedPackages = vhdlFiles.flatMap((file) => {
                try {
                    return parsePackagesAndRecords(file.content);
                } catch (err) {
                    console.warn(`Failed to parse ${file.name}`, err);
                    return [];
                }
            });
        }

        setParseResults(parsedPackages);

        let parsedModules: ParsedModule[] = [];

        if (selectedLanguage === "SystemVerilog") {
            parsedModules = svFiles.flatMap((file) => {
                try {
                    return parseModules(file.content);
                } catch (err) {
                    console.warn(`Failed to parse modules in ${file.name}`, err);
                    return [];
                }
            });
        } else if (selectedLanguage === "VHDL") {
            parsedModules = vhdlFiles.flatMap((file) => {
                try {
                    return parseEntities(file.content.toUpperCase());
                } catch (err) {
                    console.warn(`Failed to parse entities in ${file.name}`, err);
                    return [];
                }
            });
        }

        setParseModulesResults(parsedModules);

        console.log("📦 Parsed modules:", parsedModules);
    }, [allFiles, selectedLanguage, setParseResults, setParseModulesResults]);


    function validateField(fieldName: string, fieldValue: string | number | boolean | undefined): string {
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
            if (fieldName === 'bandwidth' && fieldValue === 1) {
                return "The value must be > 1";
            }
            if (fieldValue <= 0) {
                return "The value must be > 0";
            }
        }

        return "";
    }

    const handleChange = (e: { target: { name: string; type: string; checked?: boolean; value?: string | number | boolean; }; }) => {
        const { name, type, checked, value} = e.target;

        let newValue: string | number | boolean | undefined = value;
        if (type === 'checkbox') {
            newValue = checked as boolean;
        } else if (type === 'number') {
            newValue = Number(value);
        }

        if (name === 'bandwidthType') {
            setErrors({});
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
        if (['combiner', 'module'].includes(selectedElement.attributes.elType) && newPortData.bandwidth < 1) {
            setErrorMessage('Bandwidth must be > 0');
            return;
        }

        if (isEditingPort && editPortIndex !== null) {
            if (editPortType === 'input') {
                const updated = [...(properties.createdInPorts || [])];
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
                const updated = [...(properties.createdOutPorts || [])];
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
                        ...(prev.createdInPorts || []),
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
                                    ...(prev.createdOutPorts || []),
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

    const handleEditPort = (portType: 'input' | 'output', index: number) => {
        setIsEditingPort(true);
        setEditPortIndex(index);
        setEditPortType(portType);
        setErrorMessage('');

        const currentPort = portType === 'input'
        ? properties.createdInPorts?.[index] 
        : properties.createdOutPorts?.[index];

        if (!currentPort) return;

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
            const updatedInPorts = [...(properties.createdInPorts || [])];
            updatedInPorts.splice(index, 1);
            setProperties(prev => ({ ...prev, createdInPorts: updatedInPorts }));
        } else {
            const updatedOutPorts = [...(properties.createdOutPorts || [])];
            updatedOutPorts.splice(index, 1);
            setProperties(prev => ({ ...prev, createdOutPorts: updatedOutPorts }));
        }
    };

    const handleElementChange = () => {
        if (!selectedElement) return;

        const elType = selectedElement.attributes.elType;
        const elementType = elementTypes[elType as ElementTypeKey];

        if (elementType) {
            const { x, y } = selectedElement.position();
            const elementData = new elementType.class();
            elementData.name = properties.label || '';
            elementData.position = { x, y };

            if (!['splitter', 'combiner', 'module', ].includes(elType)) {
                if (properties.bandwidthType === 'bit') {
                    elementData.dataBandwidth = 1;
                }
                else {
                    elementData.dataBandwidth = properties.bandwidth;
                }
            }
            if (elType === 'comparator') {
                elementData.type = properties.comparatorType || '>';
            }
            if (elType === 'alu') {
                elementData.type = properties.aluType || '+';
            }
            if (['input', 'output', 'multiplexer', 'register', 'sram'].includes(elType)) {
                if (properties.bandwidthType === 'struct') {
                    elementData.structPackage = properties.structPackage || '';
                    elementData.structTypeDef = properties.structTypeDef || '';
                    elementData.language = selectedLanguage;
                }
                else {
                    elementData.structPackage = '';
                    elementData.structTypeDef = '';
                    elementData.language = '';
                }
            }
            if (['combiner', 'splitter'].includes(elType)) {
                if (properties.bitPortType === 'struct') {
                    elementData.structPackage = properties.structPackage || '';
                    elementData.structTypeDef = properties.structTypeDef || '';
                    elementData.language = selectedLanguage;
                }
                else {
                    elementData.structPackage = '';
                    elementData.structTypeDef = '';
                    elementData.language = '';
                }

            }
            if (['and', 'or', 'nor', 'xnor', 'nand', 'xor'].includes(elType)) {
                elementData.inPorts = properties.inputPorts || 2;
            }
            if (elType === 'multiplexer') {
                elementData.dataPorts = properties.inputPorts || 2;
            }
            if (elType === 'sram') {
                elementData.addressBandwidth = properties.addressBandwidth || 8;
                elementData.clkEdge = properties.clkEdge;
            }
            if (elType === 'register') {
                elementData.resetPort = properties.resetPort || false;
                elementData.enablePort = properties.enablePort || false;
                elementData.clkEdge = properties.clkEdge;
                elementData.rstEdge = properties.rstEdge;
                elementData.qInverted = properties.qInverted;
                elementData.rstType = properties.rstType;
            }
            if (elType === 'combiner') {
                elementData.bitPortType = properties.bitPortType || 'custom';
                if (properties.bitPortType === 'custom') {
                    elementData.inPorts = properties.createdInPorts?.map((p) => ({
                        name: p.name,
                        bandwidth: p.bandwidth,
                    }));
                }
            }
            if (elType === 'splitter') {
                elementData.bitPortType = properties.bitPortType || 'custom';
                if (properties.bitPortType === 'custom') {
                    elementData.outPorts = properties.createdOutPorts?.map((p) => ({
                        name: p.name,
                        bandwidth: p.bandwidth,
                        startBit: p.startBit,
                        endBit: p.endBit
                    }));
                }
            }
            if (elType === 'module') {
                elementData.moduleType = properties.moduleType;

                elementData.existingModule = properties.moduleType === 'existing' ? properties.existingModule : '';

                elementData.instance = properties.instance || '';

                elementData.inPorts = properties.createdInPorts?.map((p) => ({
                    name: p.name,
                    bandwidth: p.bandwidth,
                }));
                elementData.outPorts = properties.createdOutPorts?.map((p) => ({
                    name: p.name,
                    bandwidth: p.bandwidth,
                }));
            }

            graph.removeCells([selectedElement]);
            let newElement;
            if (elType === 'splitter' || elType === 'combiner') {
                newElement = elementType.create(elementData, parseResults);
            }
            else if (elType === 'module') {
                newElement = elementType.create(elementData, parseModulesResults);
            }
            else {
                newElement = elementType.create(elementData);
            }
            graph.addCell(newElement);
            setSelectedElement(newElement);

        }

    };



    const handleSave = () => {
        if (!selectedElement) return;

        const hasAnyErrors = Object.values(errors).some((msg) => msg);
        if (hasAnyErrors) {
            setShowErrorNotification(true);
            return;
        }
        setShowSaveNotification(true);
        handleElementChange();
    };


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

        newCell.position();
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
            <div className='h-full overflow-y-auto'>
                <div className="p-4 space-y-4">
                    <div className="space-y-1">
                        <Label>Select language for packages</Label>
                        <Select
                            value={selectedLanguage}
                            onValueChange={(value) => {
                                const isLocked = checkLanguageLock();
                                if (!isLocked) {
                                    setSelectedLanguage(value as "SystemVerilog" | "VHDL");
                                } else {
                                    toast.error("You can't change language because there are elements with assigned language.");
                                }
                            }}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Choose a language" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="SystemVerilog">SystemVerilog</SelectItem>
                                <SelectItem value="VHDL">VHDL</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="h-full overflow-auto">
            <h3 className="text-lg font-semibold p-4 border-b border-gray-200">
                {selectedElement.attributes.elType.toUpperCase()} Properties
            </h3>

            <div className="p-4 space-y-4">
                {(['output', 'input', 'and', 'nand', 'xor', 'or', 'nor', 'not', 'xnor', 'multiplexer', 'decoder', 'encoder', 'alu', 'comparator', 'module', 'sram', 'register', 'combiner'].includes(selectedElement.attributes.elType)) && (
                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700">
                            {toTitleCase(selectedElement.attributes.elType)} name:
                        </label>
                        <Input
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
                        <Label>
                            Select Data width:
                        </Label>

                        <Select
                            name="bandwidthType"
                            value={properties.bandwidthType}
                            onValueChange={(value) => {
                                handleChange({ target: { name: 'bandwidthType', type: 'select', value } });
                            }}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select Data width" />
                            </SelectTrigger>
                            <SelectContent>
                                {!(['encoder'].includes(selectedElement.attributes.elType)) && (
                                    <SelectItem value="bit">Bit</SelectItem>
                                )}
                                <SelectItem value="vector">Vector</SelectItem>
                                {(['output', 'input', 'multiplexer', 'sram', 'register'].includes(selectedElement.attributes.elType)) && (
                                    <SelectItem value="struct">Structure from package</SelectItem>
                                )}
                            </SelectContent>
                        </Select>
                        {properties.bandwidthType === 'vector' && (
                            <div className="space-y-1">
                                <Label>
                                    Width of vector:
                                </Label>
                                <Input
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
                                {/* PACKAGE FILE SELECT */}
                                <div className="space-y-1">
                                    <Label>Choose package file:</Label>
                                    <Select
                                        name="structPackage"
                                        value={properties.structPackage}
                                        onValueChange={(value) => {
                                            handleChange({ target: { name: 'structPackage', type: 'select', value } });
                                        }}
                                        >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select package file" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {parseResults.map((pkg, idx) => (
                                                <SelectItem key={idx} value={pkg.name}>
                                                    {pkg.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* STRUCT TYPE SELECT */}
                                <div className="space-y-1">
                                    <Label>Choose structure from package:</Label>
                                    <Select
                                        name="structTypeDef"
                                        value={properties.structTypeDef}
                                        onValueChange={(value) => {
                                            handleChange({ target: { name: 'structTypeDef', type: 'select', value } });
                                        }}
                                        disabled={!properties.structPackage}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {parseResults
                                                .find(pkg => pkg.name === properties.structPackage)
                                                ?.structs.map((strct, idx) => (
                                                    <SelectItem key={idx} value={strct.name}>
                                                        {strct.name}
                                                    </SelectItem>
                                                ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {(['and', 'nand', 'xor', 'or', 'nor', 'xnor'].includes(selectedElement.attributes.elType)) && (
                    <div className="space-y-1">
                        <Label>
                            Number of input ports:
                        </Label>
                        <Input
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
                        <Label>
                            Multiplexer type:
                        </Label>

                        <Select
                            name="inputPorts"
                            value={properties.inputPorts?.toString()}
                            onValueChange={(value) => {
                                handleChange({ target: { name: 'inputPorts', type: 'select', value } });
                            }}>
                            <SelectTrigger>
                                <SelectValue placeholder="Multiplexer type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="2">2-to-1</SelectItem>
                                <SelectItem value="4">4-to-1</SelectItem>
                                <SelectItem value="8">8-to-1</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                )}

                {selectedElement.attributes.elType === 'alu' && (
                    <div className="space-y-1">
                        <Label>
                            ALU Type:
                        </Label>
                        <Select
                            name="aluType"
                            value={properties.aluType}
                            onValueChange={(value) => {
                                handleChange({ target: { name: 'aluType', type: 'select', value } });
                            }}>
                            <SelectTrigger>
                                <SelectValue placeholder="ALU Type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="+">Addition (+)</SelectItem>
                                <SelectItem value="-">Subtraction (-)</SelectItem>
                                <SelectItem value="*">Multiplication (*)</SelectItem>
                                <SelectItem value="/">Division (/)</SelectItem>
                                <SelectItem value="%">Residuals (%)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                )}

                {selectedElement.attributes.elType === 'comparator' && (
                    <div className="space-y-1">
                        <Label>
                            Comparator Type:
                        </Label>
                        <Select
                            name="comparatorType"
                            value={properties.comparatorType}
                            onValueChange={(value) => {
                                handleChange({ target: { name: 'comparatorType', type: 'select', value } });
                            }}>
                            <SelectTrigger>
                                <SelectValue placeholder="Comparator Type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value=">">Greater than (&gt;)</SelectItem>
                                <SelectItem value="<">Less than (&lt;)</SelectItem>
                                <SelectItem value="==">Equal (==)</SelectItem>
                                <SelectItem value="!=">Not equal (!=)</SelectItem>
                                <SelectItem value=">=">Greater or equal (&gt;=)</SelectItem>
                                <SelectItem value="<=">Less or equal (&lt;=)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                )}

                {(['module'].includes(selectedElement.attributes.elType)) && (
                    <>
                        <div className="space-y-1">
                            <Label>
                                Module Type:
                            </Label>
                            <Select
                                name="moduleType"
                                value={properties.moduleType}
                                onValueChange={(value) => {
                                    handleChange({ target: { name: 'moduleType', type: 'select', value } });
                                }}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Module Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="new">New Module</SelectItem>
                                    <SelectItem value="existing">Existing Module</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        {properties.moduleType === 'existing' && (
                            <div className="space-y-1">
                                <Label>
                                    Choose Existing Module:
                                </Label>
                                <Select
                                    name="existingModule"
                                    value={properties.existingModule}
                                    onValueChange={(value) => {
                                        handleChange({ target: { name: 'existingModule', type: 'select', value } });
                                    }}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Choose Existing Module" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {parseModulesResults.map((module, idx) => (
                                            <SelectItem key={idx} value={module.name}>
                                                {module.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        )}

                        {properties.moduleType === 'new' && (
                        <>
                            <div className="space-y-1">
                                <Label>
                                    Instance name:
                                </Label>
                                <Input
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
                                    {properties.createdInPorts?.map((p, idx) => (
                                        <div key={idx} className="flex items-center justify-between p-2 border-b border-gray-100">
                                            <span className="text-sm">{p.name} (bw={p.bandwidth})</span>
                                            <div className="flex space-x-2">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleEditPort('input', idx)}
                                                    className="text-blue-500 hover:text-blue-700"
                                                >
                                                    <Pencil className="w-4 h-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => handleDeletePort('input', idx)}
                                                    className="text-red-500 hover:text-red-700"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <Button
                                    size="sm"
                                    onClick={handleAddInputPort}
                                >
                                    Add Input Port
                                </Button>
                            </div>

                            <div className="mt-4 border-t border-gray-200 pt-4">
                                <h4 className="font-medium text-gray-800 mb-2">Output Ports</h4>
                                <div className="space-y-1 max-h-40 overflow-y-auto">
                                    {properties.createdOutPorts?.map((p, idx) => (
                                        <div key={idx} className="flex items-center justify-between p-2 border-b border-gray-100">
                                            <span className="text-sm">{p.name} (bw={p.bandwidth})</span>
                                            <div className="flex space-x-2">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleEditPort('output', idx)}
                                                    className="text-blue-500 hover:text-blue-700"
                                                >
                                                    <Pencil className="w-4 h-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleDeletePort('output', idx)}
                                                    className="text-red-500 hover:text-red-700"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <Button
                                    size="sm"
                                    onClick={handleAddOutputPort}
                                >
                                    Add Output Port
                                </Button>
                            </div>
                        </>
                        )}
                    </>
                )}

                {(['sram', 'register'].includes(selectedElement.attributes.elType)) && (
                    <>
                        {(['sram'].includes(selectedElement.attributes.elType)) && (
                            <div className="space-y-1">
                                <Label>
                                    Address width:
                                </Label>
                                <Input
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
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="resetPort"
                                        name="resetPort"
                                        checked={properties.resetPort}
                                        onCheckedChange={(checked) => {
                                            handleChange({ target: { name: 'resetPort', type: 'checkbox', checked: checked === true } });
                                        }}
                                    />
                                    <Label htmlFor="resetPort">
                                        Add reset port
                                    </Label>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="enablePort"
                                        name="enablePort"
                                        checked={properties.enablePort}
                                        onCheckedChange={(checked) => {
                                            handleChange({ target: { name: 'enablePort', type: 'checkbox', checked: checked === true } });
                                        }}
                                    />
                                    <Label htmlFor="enablePort">
                                        Add enable port
                                    </Label>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="qInverted"
                                        name="qInverted"
                                        checked={properties.qInverted}
                                        onCheckedChange={(checked) => {
                                            handleChange({ target: { name: 'qInverted', type: 'checkbox', checked: checked === true } });
                                        }}
                                    />
                                    <Label htmlFor="qInverted">
                                        Invert Q output
                                    </Label>
                                </div>

                                {(properties.resetPort) && (
                                    <div className="space-y-1 mt-3">
                                        <Label>
                                            Reset Edge:
                                        </Label>
                                        <Select
                                            name="rstEdge"
                                            value={properties.rstEdge}
                                            onValueChange={(value) => {
                                                handleChange({ target: { name: 'rstEdge', type: 'select', value } });
                                            }}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Reset Edge" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="rising">Rising</SelectItem>
                                                <SelectItem value="falling">Falling</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                )}

                                {(properties.resetPort) && (
                                    <div className="space-y-1 mt-3">
                                        <Label>
                                            Reset Type:
                                        </Label>
                                        <Select
                                            name="rstType"
                                            value={properties.rstType}
                                            onValueChange={(value) => {
                                                handleChange({ target: { name: 'rstType', type: 'select', value } });
                                            }}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Reset Type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="async">Asynchronous</SelectItem>
                                                <SelectItem value="sync">Synchronous</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                )}
                            </>
                        )}
                        <div className="space-y-1 mt-3">
                            <Label>
                                Clock Edge:
                            </Label>

                            <Select
                                name="clkEdge"
                                value={properties.clkEdge}
                                onValueChange={(value) => {
                                    handleChange({ target: { name: 'clkEdge', type: 'select', value } });
                                }}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Clock Edge" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="rising">Rising</SelectItem>
                                    <SelectItem value="falling">Falling</SelectItem>
                                </SelectContent>
                            </Select>


                        </div>
                    </>
                )}
                {(['combiner', 'splitter'].includes(selectedElement.attributes.elType)) && (
                    <>
                    <div className="space-y-1">
                        <Label>
                            {selectedElement.attributes.elType === 'combiner' ? 'Output' : 'Input'} Ports Type
                        </Label>
                        <Select
                            name="bitPortType"
                            value={properties.bitPortType}
                            onValueChange={(value) => {
                                handleChange({ target: { name: 'bitPortType', type: 'select', value } });
                            }}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select ports type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="custom">Vector</SelectItem>
                                <SelectItem value="struct">Structure from package</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    {(['combiner'].includes(selectedElement.attributes.elType) && properties.bitPortType === 'custom') && (
                        <div className="mt-6 border-t border-gray-200 pt-4">
                            <h4 className="font-medium text-gray-800 mb-2">Input Ports</h4>
                            <div className="space-y-1 max-h-40 overflow-y-auto">
                                {properties.createdInPorts?.map((p, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-2 border-b border-gray-100">
                                        <span className="text-sm">{p.name} (bw={p.bandwidth})</span>
                                        <div className="flex space-x-2">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleEditPort('input', idx)}
                                                className="text-blue-500 hover:text-blue-700"
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleDeletePort('input', idx)}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <Button
                                size="sm"
                                onClick={handleAddInputPort}
                            >
                                Add Input Port
                            </Button>
                        </div>
                        )}
                    {(['splitter'].includes(selectedElement.attributes.elType) && properties.bitPortType === 'custom') && (
                        <div className="mt-4 border-t border-gray-200 pt-4">
                            <h4 className="font-medium text-gray-800 mb-2">Output Ports</h4>
                            <div className="space-y-1 max-h-40 overflow-y-auto">
                                {properties.createdOutPorts?.map((p, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-2 border-b border-gray-100">
                                        <span className="text-sm">{p.name} ({p.startBit} - {p.endBit})</span>
                                        <div className="flex space-x-2">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleEditPort('output', idx)}
                                                className="text-blue-500 hover:text-blue-700"
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleDeletePort('output', idx)}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <Button
                                size="sm"
                                onClick={handleAddOutputPort}
                            >
                                Add Output Port
                            </Button>
                        </div>
                    )}
                    {properties.bitPortType === 'struct' && (
                        <div className="space-y-3">
                            {/* PACKAGE FILE SELECT */}
                            <div className="space-y-1">
                                <Label>Choose package file:</Label>
                                <Select
                                    name="structPackage"
                                    value={properties.structPackage}
                                    onValueChange={(value) => {
                                        handleChange({ target: { name: 'structPackage', type: 'select', value } });
                                    }}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select package file" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {parseResults.map((pkg, idx) => (
                                            <SelectItem key={idx} value={pkg.name}>
                                                {pkg.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* STRUCT TYPE SELECT */}
                            <div className="space-y-1">
                                <Label>Choose structure from package:</Label>
                                <Select
                                    name="structTypeDef"
                                    value={properties.structTypeDef}
                                    onValueChange={(value) => {
                                        handleChange({ target: { name: 'structTypeDef', type: 'select', value } });
                                    }}
                                    disabled={!properties.structPackage}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {parseResults
                                            .find(pkg => pkg.name === properties.structPackage)
                                            ?.structs.map((strct, idx) => (
                                                <SelectItem key={idx} value={strct.name}>
                                                    {strct.name}
                                                </SelectItem>
                                            ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    )}

                    </>
                )}
                <div className="mt-6 pt-4 border-t border-gray-200">
                    <Button
                        onClick={handleSave}
                        className="w-full"
                    >
                        Save Changes
                    </Button>
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
                                <Label>
                                    Port Name:
                                </Label>
                                <Input
                                    type="text"
                                    name="name"
                                    value={newPortData.name}
                                    onChange={handleNewPortDataChange}
                                />
                            </div>
                            {(['combiner', 'module'].includes(selectedElement.attributes.elType)) && (
                                <div className="space-y-1">
                                    <Label>
                                        Bandwidth:
                                    </Label>
                                    <Input
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
                                        <Label>
                                            End Bit:
                                        </Label>
                                        <Input
                                            type="number"
                                            name="endBit"
                                            value={newPortData.endBit}
                                            onChange={handleNewPortDataChange}
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <Label>
                                            Start Bit:
                                        </Label>
                                        <Input
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
                            <Button
                                variant="outline"
                                onClick={handleNewPortCancel}
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleNewPortSubmit}
                            >
                                {isEditingPort ? 'Update' : 'Add'}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PropertiesPanel;
