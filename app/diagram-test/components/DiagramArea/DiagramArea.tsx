// pages/diagram-test/components/DiagramArea/DiagramArea.tsx

import React, {useRef, useState} from 'react';
import { dia, shapes } from "@joint/core";
import useJointJS from '../../hooks/useJointJS';
import { useDiagramContext } from '../../context/useDiagramContext';
import styles from './DiagramArea.module.css';
import { JointJSAnd } from '../Shapes/gates/JointJSAnd';
import { And } from '../Shapes/classes/and';
import { JointJSNand } from '../Shapes/gates/JointJSNand';
import { Nand } from '../Shapes/classes/nand';
import { JointJSNor } from '../Shapes/gates/JointJSNor';
import { Nor } from '../Shapes/classes/nor';
import { JointJSNot } from '../Shapes/gates/JointJSNot';
import { Not } from '../Shapes/classes/not';
import { JointJSOr } from '../Shapes/gates/JointJSOr';
import { Or } from '../Shapes/classes/or';
import { JointJSXnor } from '../Shapes/gates/JointJSXnor';
import { Xnor } from '../Shapes/classes/xnor';
import { JointJSXor } from '../Shapes/gates/JointJSXor';
import { Xor } from '../Shapes/classes/xor';
import { JointJSInputPort } from '../Shapes/io/JointJSInputPort';
import { Port } from '../Shapes/classes/port';
import { JointJSOutputPort } from '../Shapes/io/JointJSOutputPort';
import {Multiplexer} from "../Shapes/classes/multiplexer";
import { JointJSMultiplexer } from '../Shapes/complexLogic/JointJSMultiplexer';
import {JointJSDecoder} from '../Shapes/complexLogic/JointJSDecoder';
import { Decoder } from '../Shapes/classes/decoder';
import {JointJSEncoder} from '../Shapes/complexLogic/JointJSEncoder';
import { Encoder } from '../Shapes/classes/encoder';
import {JointJSAlu} from '../Shapes/complexLogic/JointJSAlu';
import { Alu } from '../Shapes/classes/alu';
import { JointJSComparator } from '../Shapes/complexLogic/JointJSComparator';
import { Comparator } from '../Shapes/classes/comparator';
import { JointJSNewModule } from '../Shapes/modules/JointJSNewModule';
import { Module } from '../Shapes/classes/module';
import { JointJSSRam } from '../Shapes/memory/JointJSSRam';
import { Ram } from '../Shapes/classes/ram';
import { JointJSRegister } from '../Shapes/memory/JointJSRegister';
import { Register } from '../Shapes/classes/register';
import { JointJSBitSelect } from '../Shapes/bitOperations/JointJSBitSelect';
import { BitSelect } from '../Shapes/classes/bitSelect';
import { JointJSBitCombine } from '../Shapes/bitOperations/JointJSBitCombine';
import { BitCombine } from '../Shapes/classes/bitCombine';
import {useDiagramEvents} from "@/app/diagram-test/hooks/useDiagramEvents";



const DiagramArea = () => {
    const paperElement = useRef<HTMLDivElement>(null);
    const { graph, isPanning} = useDiagramContext();
    const paper = useJointJS(paperElement);
    const [isModalOpen, setIsModalOpen] = useState(false);
    useDiagramEvents({
        paper: paper,
        paperElement: paperElement.current
    });

    function getElType(toolType: string): string {
        switch (toolType) {
        case 'and':        return 'and';
        case 'or':         return 'or';
        case 'xor':        return 'xor';
        case 'xnor':       return 'xnor';
        case 'nand':       return 'nand';
        case 'nor':        return 'nor';
        case 'not':        return 'not';
        case 'input':      return 'input';
        case 'output':     return 'output';
        case 'multiplexer':return 'multiplexer';
        case 'decoder':    return 'decoder';
        case 'encoder':    return 'encoder';
        case 'alu':        return 'alu';
        case 'comp':       return 'comparator';
        case 'newModule':  return 'newModule';
        case 'ram':        return 'ram';
        case 'register':   return 'register';
        case 'bitSelect':   return 'bitSelect';
        case 'bitCombine':   return 'bitCombine';
        default:           return toolType;
        }
    }

    function getNextName(graph: dia.Graph, elType: string): string {
        const all = graph.getElements();
        const sameTypeCount = all.filter(el => el.attributes.elType === elType).length;
        return elType + '_' + (sameTypeCount + 1);
    }


    const handleDrop = (event: React.DragEvent) => {
        event.preventDefault();
        const toolType = event.dataTransfer.getData('toolType');

        const elType = getElType(toolType);
        const elementName = getNextName(graph, elType);

        const rect = paperElement.current!.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;


        let element;
        switch(toolType) {
        case 'and':
            const and = new And();
            and.name = elementName;
            and.position = {x, y};
            and.bandwidth = 1;
            and.inPorts = 2;
            element = JointJSAnd(and);
            break;
        case 'or':
            const or = new Or();
            or.name = elementName;
            or.position = {x, y};
            or.bandwidth = 1;
            or.inPorts = 2;
            element = JointJSOr(or);
            break;
        case 'xor':
            const xor = new Xor();
            xor.name = elementName;
            xor.position = {x, y};
            xor.bandwidth = 1;
            xor.inPorts = 2;
            element = JointJSXor(xor);
            break;
        case 'xnor':
            const xnor = new Xnor();
            xnor.name = elementName;
            xnor.position = {x, y};
            xnor.bandwidth = 1;
            xnor.inPorts = 2;
            element = JointJSXnor(xnor);
            break;
        case 'input':
            const input = new Port();
            input.name = elementName;
            input.position = {x, y};
            input.bandwidth = 1;
            element = JointJSInputPort(input);
            break;
        case 'nand':
            const nand = new Nand();
            nand.name = elementName;
            nand.position = {x, y};
            nand.bandwidth = 1;
            nand.inPorts = 2;
            element = JointJSNand(nand);
            break;
        case 'nor':
            const nor = new Nor();
            nor.name = elementName;
            nor.position = {x, y};
            nor.bandwidth = 1;
            nor.inPorts = 2;
            element = JointJSNor(nor);
            break;
        case 'not':
            const not = new Not();
            not.name = elementName;
            not.position = {x, y};
            not.bandwidth = 1;
            element = JointJSNot(not);
            break;
        case 'output':
            const output = new Port();
            output.name = elementName;
            output.position = {x, y};
            output.bandwidth = 1;
            element = JointJSOutputPort(output);
            break;
        case 'multiplexer':
            const multiplexer = new Multiplexer();
            multiplexer.name = elementName;
            multiplexer.dataPorts = 2;
            multiplexer.dataBandwidth = 1;
            multiplexer.position = {x, y};
            element = JointJSMultiplexer(multiplexer);
            break;
        case 'decoder':
            const decoder = new Decoder();
            decoder.name = elementName;
            decoder.dataBandwidth = 1;
            decoder.position = {x, y};
            element = JointJSDecoder(decoder);
            break;
        case 'encoder':
            const encoder = new Encoder();
            encoder.name = elementName;
            encoder.dataBandwidth = 1;
            encoder.position = {x, y};
            element = JointJSEncoder(encoder);
            break;
        case 'alu':
            const alu = new Alu();
            alu.name = elementName;
            alu.dataBandwidth = 1;
            alu.position = {x, y};
            alu.type = '+';
            element = JointJSAlu(alu);
            break;
        case 'comp':
            const comparator = new Comparator();
            comparator.name = elementName;
            comparator.dataBandwidth = 1;
            comparator.type = ">";
            element = JointJSComparator(comparator);
            break;
        case 'newModule':
            const newModule = new Module();
            newModule.name = elementName;
            newModule.instance = `instance_${elementName}`;
            element = JointJSNewModule(newModule);
            break;
        case 'ram':
            const ram = new Ram();
            ram.name = elementName;
            ram.dataBandwidth = 1;
            ram.clkEdge = "rising";
            element = JointJSSRam(ram);
            break;
        case 'register':
            const register = new Register();
            register.name = elementName;
            register.dataBandwidth = 1;
            register.resetPort = true;
            register.enablePort = true;
            register.qInverted = false;
            register.clkEdge = "rising";
            register.rstEdge = "falling";
            register.rstType = "async";
            element = JointJSRegister(register);
            break;
        case 'bitSelect':
            const bitSelect = new BitSelect();
            bitSelect.name = elementName;
            bitSelect.position = {x, y};
            element = JointJSBitSelect(bitSelect);
            break;
        case 'bitCombine':
            const bitCombine = new BitCombine();
            bitCombine.name = elementName;
            bitCombine.position = {x, y};
            element = JointJSBitCombine(bitCombine);
            break;
        default:
            return;
        }

        element.position(x, y);
        graph.addCell(element);
    };

    const handleDragOver = (event: React.DragEvent) => {
        event.preventDefault();
    };



    return (

        <div
            className={`${styles.diagramArea} ${isPanning ? styles.grabbing : ''}`}
            ref={paperElement}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
        ></div>

    );
};

export default DiagramArea;
