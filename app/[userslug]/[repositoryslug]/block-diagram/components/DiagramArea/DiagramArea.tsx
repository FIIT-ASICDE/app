import React, { useEffect, useRef, useState } from "react";
import { dia } from "@joint/core";
import useJointJS from '@/app/[userslug]/[repositoryslug]/block-diagram/hooks/useJointJS';
import { useDiagramContext } from '@/app/[userslug]/[repositoryslug]/block-diagram/context/useDiagramContext';
import { JointJSAnd } from "@/app/[userslug]/[repositoryslug]/block-diagram/components/Shapes/gates/JointJSAnd";
import { And } from "@/app/[userslug]/[repositoryslug]/block-diagram/components/Shapes/classes/and";
import { JointJSNand } from "@/app/[userslug]/[repositoryslug]/block-diagram/components/Shapes/gates/JointJSNand";
import { Nand } from "@/app/[userslug]/[repositoryslug]/block-diagram/components/Shapes/classes/nand";
import { JointJSNor } from "@/app/[userslug]/[repositoryslug]/block-diagram/components/Shapes/gates/JointJSNor";
import { Nor } from "@/app/[userslug]/[repositoryslug]/block-diagram/components/Shapes/classes/nor";
import { JointJSNot } from "@/app/[userslug]/[repositoryslug]/block-diagram/components/Shapes/gates/JointJSNot";
import { Not } from "@/app/[userslug]/[repositoryslug]/block-diagram/components/Shapes/classes/not";
import { JointJSOr } from "@/app/[userslug]/[repositoryslug]/block-diagram/components/Shapes/gates/JointJSOr";
import { Or } from "@/app/[userslug]/[repositoryslug]/block-diagram/components/Shapes/classes/or";
import { JointJSXnor } from "@/app/[userslug]/[repositoryslug]/block-diagram/components/Shapes/gates/JointJSXnor";
import { Xnor } from "@/app/[userslug]/[repositoryslug]/block-diagram/components/Shapes/classes/xnor";
import { JointJSXor } from "@/app/[userslug]/[repositoryslug]/block-diagram/components/Shapes/gates/JointJSXor";
import { Xor } from "@/app/[userslug]/[repositoryslug]/block-diagram/components/Shapes/classes/xor";
import { JointJSInputPort } from "@/app/[userslug]/[repositoryslug]/block-diagram/components/Shapes/io/JointJSInputPort";
import { Port } from "@/app/[userslug]/[repositoryslug]/block-diagram/components/Shapes/classes/port";
import { JointJSOutputPort } from "@/app/[userslug]/[repositoryslug]/block-diagram/components/Shapes/io/JointJSOutputPort";
import {Multiplexer} from "@/app/[userslug]/[repositoryslug]/block-diagram/components/Shapes/classes/multiplexer";
import { JointJSMultiplexer } from "@/app/[userslug]/[repositoryslug]/block-diagram/components/Shapes/complexLogic/JointJSMultiplexer";
import {JointJSDecoder} from "@/app/[userslug]/[repositoryslug]/block-diagram/components/Shapes/complexLogic/JointJSDecoder";
import { Decoder } from "@/app/[userslug]/[repositoryslug]/block-diagram/components/Shapes/classes/decoder";
import {JointJSEncoder} from "@/app/[userslug]/[repositoryslug]/block-diagram/components/Shapes/complexLogic/JointJSEncoder";
import { Encoder } from "@/app/[userslug]/[repositoryslug]/block-diagram/components/Shapes/classes/encoder";
import {JointJSAlu} from "@/app/[userslug]/[repositoryslug]/block-diagram/components/Shapes/complexLogic/JointJSAlu";
import { Alu } from "@/app/[userslug]/[repositoryslug]/block-diagram/components/Shapes/classes/alu";
import { JointJSComparator } from "@/app/[userslug]/[repositoryslug]/block-diagram/components/Shapes/complexLogic/JointJSComparator";
import { Comparator } from "@/app/[userslug]/[repositoryslug]/block-diagram/components/Shapes/classes/comparator";
import { JointJSModule } from "@/app/[userslug]/[repositoryslug]/block-diagram/components/Shapes/modules/JointJSModule";
import { Module } from "@/app/[userslug]/[repositoryslug]/block-diagram/components/Shapes/classes/module";
import { JointJSSRam } from "@/app/[userslug]/[repositoryslug]/block-diagram/components/Shapes/memory/JointJSSRam";
import { Sram } from "@/app/[userslug]/[repositoryslug]/block-diagram/components/Shapes/classes/sram";
import { JointJSRegister } from "@/app/[userslug]/[repositoryslug]/block-diagram/components/Shapes/memory/JointJSRegister";
import { Register } from "@/app/[userslug]/[repositoryslug]/block-diagram/components/Shapes/classes/register";
import { JointJSSplitter } from "@/app/[userslug]/[repositoryslug]/block-diagram/components/Shapes/bitOperations/JointJSSplitter";
import { Splitter } from "@/app/[userslug]/[repositoryslug]/block-diagram/components/Shapes/classes/splitter";
import { JointJSCombiner } from "@/app/[userslug]/[repositoryslug]/block-diagram/components/Shapes/bitOperations/JointJSCombiner";
import { Combiner } from "@/app/[userslug]/[repositoryslug]/block-diagram/components/Shapes/classes/combiner";
import {useDiagramEvents} from "@/app/[userslug]/[repositoryslug]/block-diagram/hooks/useDiagramEvents";
import PaperToolbar from "@/app/[userslug]/[repositoryslug]/block-diagram/components/Sidebar/PaperToolbar";
import { useDebouncedCallback } from "use-debounce";
import { api } from "@/lib/trpc/react";

const DiagramArea = () => {
    const paperElement = useRef<HTMLDivElement>(null);
    const { graph, repository, activeFile, parseResults, parseModulesResults } = useDiagramContext();
    const [isReady, setIsReady] = useState(false);

    const { data: fileData } = api.repo.loadRepoItem.useQuery(
        {
            ownerSlug: repository.ownerName,
            repositorySlug: repository.name,
            path: activeFile?.absolutePath ?? "",
        },
        {
            enabled: !!activeFile,
        }
    );

    useEffect(() => {
        if (fileData?.type === "file" && fileData.content) {
            try {
                const json = JSON.parse(fileData.content);
                graph.fromJSON(json);
            } catch (err) {
                console.error("Failed to parse diagram JSON:", err);
            }
        }
    }, [fileData, graph]);


    useEffect(() => {
        if (paperElement.current) {
            setIsReady(true);
        }
    }, []);

    const paper = useJointJS(paperElement, isReady);

    useDiagramEvents({
        paper: paper,
        paperElement: paperElement.current
    });

    useEffect(() => {
        if (!paper || !paperElement.current) return;

        const el = paperElement.current;

        const updateSize = () => {
            const container = el.parentElement;

            if (container) {
                const width = container.offsetWidth;
                const height = container.offsetHeight;

                paper.setDimensions(width, height);
            }
        };
        updateSize();

        window.addEventListener("resize", updateSize);

        const interval = setInterval(() => {
            updateSize();
        }, 300);

        return () => {
            window.removeEventListener("resize", updateSize);
            clearInterval(interval);
        };
    }, [paper]);


    const saveDiagramMutation = api.repo.saveFileContent.useMutation();

    const debouncedSave = useDebouncedCallback(() => {
        if (!repository || !activeFile) return;
        const diagramJSON = JSON.stringify(graph.toJSON(), null, 2);
        saveDiagramMutation.mutate({
            repoId: repository.id,
            path: activeFile.absolutePath,
            content: diagramJSON,
        });
    }, 1000);

    useEffect(() => {
        const onGraphChange = () => {
            debouncedSave();
        };

        graph.on('change', onGraphChange);
        graph.on('add', onGraphChange);
        graph.on('remove', onGraphChange);
        graph.on('batch:stop', onGraphChange);  // можно добавить для групповых изменений (перемещение нескольких элементов)

        return () => {
            graph.off('change', onGraphChange);
            graph.off('add', onGraphChange);
            graph.off('remove', onGraphChange);
            graph.off('batch:stop', onGraphChange);
        };
    }, [graph, debouncedSave]);

    // // addPaperEvents()
    // // generateCode()

    // const { ... } = useBlockDiagrams()

    // useBlockDiagrams() -> generateCode(lang: Languages), generateDiagram(), getShapes(), createPaper(), addPaperEvents()

    // useEffect(() => {
    //     // Init paper -> useJointJS() -> basic paper -> add aditional attributes?
    //     // addPaperEvents()
    //     // useJointJS() -> blockDiagramShapes() -> { ... }
    //      // const paper ...
            // addPaperEvents(paper)
    // })

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
        case 'module':     return 'module';
        case 'sram':       return 'sram';
        case 'register':   return 'register';
        case 'splitter':   return 'splitter';
        case 'combiner':   return 'combiner';
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
            and.dataBandwidth = 1;
            and.inPorts = 2;
            element = JointJSAnd(and);
            break;
        case 'or':
            const or = new Or();
            or.name = elementName;
            or.position = {x, y};
            or.dataBandwidth = 1;
            or.inPorts = 2;
            element = JointJSOr(or);
            break;
        case 'xor':
            const xor = new Xor();
            xor.name = elementName;
            xor.position = {x, y};
            xor.dataBandwidth = 1;
            xor.inPorts = 2;
            element = JointJSXor(xor);
            break;
        case 'xnor':
            const xnor = new Xnor();
            xnor.name = elementName;
            xnor.position = {x, y};
            xnor.dataBandwidth = 1;
            xnor.inPorts = 2;
            element = JointJSXnor(xnor);
            break;
        case 'input':
            const input = new Port();
            input.name = elementName;
            input.position = {x, y};
            input.dataBandwidth = 1;
            element = JointJSInputPort(input);
            break;
        case 'nand':
            const nand = new Nand();
            nand.name = elementName;
            nand.position = {x, y};
            nand.dataBandwidth = 1;
            nand.inPorts = 2;
            element = JointJSNand(nand);
            break;
        case 'nor':
            const nor = new Nor();
            nor.name = elementName;
            nor.position = {x, y};
            nor.dataBandwidth = 1;
            nor.inPorts = 2;
            element = JointJSNor(nor);
            break;
        case 'not':
            const not = new Not();
            not.name = elementName;
            not.position = {x, y};
            not.dataBandwidth = 1;
            element = JointJSNot(not);
            break;
        case 'output':
            const output = new Port();
            output.name = elementName;
            output.position = {x, y};
            output.dataBandwidth = 1;
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
            encoder.dataBandwidth = 2;
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
        case 'module':
            const moduleElement = new Module();
            moduleElement.name = elementName;
            moduleElement.instance = `instance_${elementName}`;
            element = JointJSModule(moduleElement, parseModulesResults);
            break;
        case 'sram':
            const sram = new Sram();
            sram.name = elementName;
            sram.dataBandwidth = 1;
            sram.addressBandwidth = 8;
            sram.clkEdge = "rising";
            element = JointJSSRam(sram);
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
        case 'splitter':
            const splitter = new Splitter();
            splitter.name = elementName;
            splitter.position = {x, y};
            element = JointJSSplitter(splitter, parseResults);
            break;
        case 'combiner':
            const combiner = new Combiner();
            combiner.name = elementName;
            combiner.position = {x, y};
            element = JointJSCombiner(combiner, parseResults);
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
        <div className="flex flex-col h-full">
            <PaperToolbar />
            <div
                className="w-full h-full bg-white overflow-hidden cursor-default"
                ref={paperElement}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
            ></div>
        </div>
    );
};

export default DiagramArea;
