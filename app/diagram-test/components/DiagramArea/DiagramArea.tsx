// pages/diagram-test/components/DiagramArea/DiagramArea.tsx

import React, {useRef, useState} from 'react';
import { shapes } from "@joint/core";
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
import {JointJSAdder} from '../Shapes/complexLogic/JointJSAdder';
import { Adder } from '../Shapes/classes/adder';
import {JointJSSubtractor} from '../Shapes/complexLogic/JointJSSubtractor';
import { Subtractor } from '../Shapes/classes/subtractor';
import { JointJSComparator } from '../Shapes/complexLogic/JointJSComparator';
import { Comparator } from '../Shapes/classes/comparator';
import { JointJSNewModule } from '../Shapes/modules/JointJSNewModule';
import { Module } from '../Shapes/classes/module';
import {useDiagramEvents} from "@/app/diagram-test/hooks/useDiagramEvents";



const DiagramArea = () => {
    const paperElement = useRef<HTMLDivElement>(null);
    const { graph, isPanning } = useDiagramContext();
    const paper = useJointJS(paperElement);
    const [isModalOpen, setIsModalOpen] = useState(false);
    useDiagramEvents({
        paper: paper,
        paperElement: paperElement.current
    });

    const handleDrop = (event: React.DragEvent) => {
        event.preventDefault();
        const toolType = event.dataTransfer.getData('toolType');
        const rect = paperElement.current!.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;


        let element;
        switch(toolType) {
        case 'and':
            const and = new And();
            and.name = "New And";
            and.position = {x, y};
            and.inPorts = 2;
            element = JointJSAnd(and);
            break;
        case 'or':
            const or = new Or();
            or.name = "New Or";
            or.position = {x, y};
            or.inPorts = 2;
            element = JointJSOr(or);
            break;
        case 'xor':
            const xor = new Xor();
            xor.name = "New Xor";
            xor.position = {x, y};
            xor.inPorts = 2;
            element = JointJSXor(xor);
            break;
        case 'xnor':
            const xnor = new Xnor();
            xnor.name = "New Xnor";
            xnor.position = {x, y};
            xnor.inPorts = 2;
            element = JointJSXnor(xnor);
            break;
        case 'input':
            const input = new Port();
            input.name = "New Port";
            input.position = {x, y};
            input.direction = "in";
            element = JointJSInputPort(input);
            break;
        case 'nand':
            const nand = new Nand();
            nand.name = "New Nand";
            nand.position = {x, y};
            nand.inPorts = 2;
            element = JointJSNand(nand);
            break;
        case 'nor':
            const nor = new Nor();
            nor.name = "New Nor";
            nor.position = {x, y};
            nor.inPorts = 2;
            element = JointJSNor(nor);
            break;
        case 'not':
            const not = new Not();
            not.name = "New Not";
            not.position = {x, y};
            element = JointJSNot(not);
            break;
        case 'output':
            const output = new Port();
            output.name = "New Output";
            output.position = {x, y};
            output.direction = "out";
            element = JointJSOutputPort(output);
            break;
        case 'multiplexer':
            const multiplexer = new Multiplexer();
            multiplexer.name = "New Multiplexer";
            multiplexer.dataPorts = 2;
            multiplexer.position = {x, y};
            element = JointJSMultiplexer(multiplexer);
            break;
        case 'decoder':
            const decoder = new Decoder();
            decoder.name = "New Decoder";
            decoder.position = {x, y};
            element = JointJSDecoder(decoder);
            break;
        case 'encoder':
            const encoder = new Encoder();
            encoder.name = "New Encoder";
            encoder.position = {x, y};
            element = JointJSEncoder(encoder);
            break;
        case 'adder':
            const adder = new Adder();
            adder.name = "New Adder";
            adder.position = {x, y};
            element = JointJSAdder(adder);
            break;
        case 'sub':
            const subtractor = new Subtractor();
            subtractor.name = "New Subtractor";
            subtractor.position = {x, y};
            element = JointJSSubtractor(subtractor);
            break;
        case 'comp':
            const comparator = new Comparator();
            comparator.name = "New Comparator";
            comparator.type = ">";
            element = JointJSComparator(comparator);
            break;
        case 'newModule':
            const newModule = new Module();
            newModule.name = "New Module";
            newModule.instance = "";
            element = JointJSNewModule(newModule);
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
