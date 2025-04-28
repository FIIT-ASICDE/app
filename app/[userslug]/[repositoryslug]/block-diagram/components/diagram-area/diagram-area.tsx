import React, { useEffect, useRef, useState } from "react";
import { dia } from "@joint/core";
import useJointJs from '@/app/[userslug]/[repositoryslug]/block-diagram/hooks/use-joint-js';
import { useDiagramContext } from '@/app/[userslug]/[repositoryslug]/block-diagram/context/use-diagram-context';
import { JointJsAnd } from "@/app/[userslug]/[repositoryslug]/block-diagram/components/shapes/gates/joint-js-and";
import { And } from "@/app/[userslug]/[repositoryslug]/block-diagram/components/shapes/classes/and";
import { JointJsNand } from "@/app/[userslug]/[repositoryslug]/block-diagram/components/shapes/gates/joint-js-nand";
import { Nand } from "@/app/[userslug]/[repositoryslug]/block-diagram/components/shapes/classes/nand";
import { JointJsNor } from "@/app/[userslug]/[repositoryslug]/block-diagram/components/shapes/gates/joint-js-nor";
import { Nor } from "@/app/[userslug]/[repositoryslug]/block-diagram/components/shapes/classes/nor";
import { JointJsNot } from "@/app/[userslug]/[repositoryslug]/block-diagram/components/shapes/gates/joint-js-not";
import { Not } from "@/app/[userslug]/[repositoryslug]/block-diagram/components/shapes/classes/not";
import { JointJsOr } from "@/app/[userslug]/[repositoryslug]/block-diagram/components/shapes/gates/joint-js-or";
import { Or } from "@/app/[userslug]/[repositoryslug]/block-diagram/components/shapes/classes/or";
import { JointJsXnor } from "@/app/[userslug]/[repositoryslug]/block-diagram/components/shapes/gates/joint-js-xnor";
import { Xnor } from "@/app/[userslug]/[repositoryslug]/block-diagram/components/shapes/classes/xnor";
import { JointJsXor } from "@/app/[userslug]/[repositoryslug]/block-diagram/components/shapes/gates/joint-js-xor";
import { Xor } from "@/app/[userslug]/[repositoryslug]/block-diagram/components/shapes/classes/xor";
import { JointJsInputPort } from "@/app/[userslug]/[repositoryslug]/block-diagram/components/shapes/io/joint-js-input-port";
import { Port } from "@/app/[userslug]/[repositoryslug]/block-diagram/components/shapes/classes/port";
import { JointJsOutputPort } from "@/app/[userslug]/[repositoryslug]/block-diagram/components/shapes/io/joint-js-output-port";
import {Multiplexer} from "@/app/[userslug]/[repositoryslug]/block-diagram/components/shapes/classes/multiplexer";
import { JointJsMultiplexer } from "@/app/[userslug]/[repositoryslug]/block-diagram/components/shapes/complex-logic/joint-js-multiplexer";
import {JointJsDecoder} from "@/app/[userslug]/[repositoryslug]/block-diagram/components/shapes/complex-logic/joint-js-decoder";
import { Decoder } from "@/app/[userslug]/[repositoryslug]/block-diagram/components/shapes/classes/decoder";
import {JointJsEncoder} from "@/app/[userslug]/[repositoryslug]/block-diagram/components/shapes/complex-logic/joint-js-encoder";
import { Encoder } from "@/app/[userslug]/[repositoryslug]/block-diagram/components/shapes/classes/encoder";
import {JointJsAlu} from "@/app/[userslug]/[repositoryslug]/block-diagram/components/shapes/complex-logic/joint-js-alu";
import { Alu } from "@/app/[userslug]/[repositoryslug]/block-diagram/components/shapes/classes/alu";
import { JointJsComparator } from "@/app/[userslug]/[repositoryslug]/block-diagram/components/shapes/complex-logic/joint-js-comparator";
import { Comparator } from "@/app/[userslug]/[repositoryslug]/block-diagram/components/shapes/classes/comparator";
import { JointJsModule } from "@/app/[userslug]/[repositoryslug]/block-diagram/components/shapes/modules/joint-js-module";
import { Module } from "@/app/[userslug]/[repositoryslug]/block-diagram/components/shapes/classes/module";
import { JointJsSram } from "@/app/[userslug]/[repositoryslug]/block-diagram/components/shapes/memory/joint-js-sram";
import { Sram } from "@/app/[userslug]/[repositoryslug]/block-diagram/components/shapes/classes/sram";
import { JointJsRegister } from "@/app/[userslug]/[repositoryslug]/block-diagram/components/shapes/memory/joint-js-register";
import { Register } from "@/app/[userslug]/[repositoryslug]/block-diagram/components/shapes/classes/register";
import { JointJsSplitter } from "@/app/[userslug]/[repositoryslug]/block-diagram/components/shapes/bit-operations/joint-js-splitter";
import { Splitter } from "@/app/[userslug]/[repositoryslug]/block-diagram/components/shapes/classes/splitter";
import { JointJsCombiner } from "@/app/[userslug]/[repositoryslug]/block-diagram/components/shapes/bit-operations/joint-js-combiner";
import { Combiner } from "@/app/[userslug]/[repositoryslug]/block-diagram/components/shapes/classes/combiner";
import {useDiagramEvents} from "@/app/[userslug]/[repositoryslug]/block-diagram/hooks/use-diagram-events";
import PaperToolbar from "@/app/[userslug]/[repositoryslug]/block-diagram/components/sidebar/paper-toolbar";
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

    const paper = useJointJs(paperElement, isReady);

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

    useEffect(() => {
        if (!paper || !paperElement.current) return;

        const updateTheme = () => {
            const isDark = document.documentElement.classList.contains('dark');

            // Меняем фон Paper
            paper.drawBackground({
                color: isDark ? '#0d0d0d' : '#ffffff'
            });

            // Меняем цвета всех элементов
            graph.getElements().forEach(cell => {
                cell.attr({
                    body: {
                        fill: isDark ? '#1f1f1f' : '#ffffff',
                        stroke: isDark ? '#888888' : '#000000',
                    },
                    label: {
                        fill: isDark ? '#eeeeee' : '#000000',
                    },

                });
                cell.getPorts().forEach(port => {
                    if (port.id) {
                        cell.portProp(port.id, 'attrs/portLine/fill', isDark ? '#1f1f1f' : '#ffffff');
                        cell.portProp(port.id, 'attrs/portLine/stroke', isDark ? '#888888' : '#000000');
                        cell.portProp(port.id, 'attrs/portLabel/fill', isDark ? '#ffffff' : '#000000');
                    }
                });
            });

            // Меняем цвета всех связей
            graph.getLinks().forEach(link => {
                link.attr({
                    line: {
                        stroke: isDark ? '#aaaaaa' : '#000000',
                    }
                });
            });
        };

        updateTheme(); // вызвать один раз сразу при монтировании

        const observer = new MutationObserver(() => {
            updateTheme();
        });

        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

        return () => {
            observer.disconnect();
        };
    }, [paper, graph]);


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
        graph.on('batch:stop', onGraphChange);

        return () => {
            graph.off('change', onGraphChange);
            graph.off('add', onGraphChange);
            graph.off('remove', onGraphChange);
            graph.off('batch:stop', onGraphChange);
        };
    }, [graph, debouncedSave]);


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
            element = JointJsAnd(and);
            break;
        case 'or':
            const or = new Or();
            or.name = elementName;
            or.position = {x, y};
            or.dataBandwidth = 1;
            or.inPorts = 2;
            element = JointJsOr(or);
            break;
        case 'xor':
            const xor = new Xor();
            xor.name = elementName;
            xor.position = {x, y};
            xor.dataBandwidth = 1;
            xor.inPorts = 2;
            element = JointJsXor(xor);
            break;
        case 'xnor':
            const xnor = new Xnor();
            xnor.name = elementName;
            xnor.position = {x, y};
            xnor.dataBandwidth = 1;
            xnor.inPorts = 2;
            element = JointJsXnor(xnor);
            break;
        case 'input':
            const input = new Port();
            input.name = elementName;
            input.position = {x, y};
            input.dataBandwidth = 1;
            element = JointJsInputPort(input);
            break;
        case 'nand':
            const nand = new Nand();
            nand.name = elementName;
            nand.position = {x, y};
            nand.dataBandwidth = 1;
            nand.inPorts = 2;
            element = JointJsNand(nand);
            break;
        case 'nor':
            const nor = new Nor();
            nor.name = elementName;
            nor.position = {x, y};
            nor.dataBandwidth = 1;
            nor.inPorts = 2;
            element = JointJsNor(nor);
            break;
        case 'not':
            const not = new Not();
            not.name = elementName;
            not.position = {x, y};
            not.dataBandwidth = 1;
            element = JointJsNot(not);
            break;
        case 'output':
            const output = new Port();
            output.name = elementName;
            output.position = {x, y};
            output.dataBandwidth = 1;
            element = JointJsOutputPort(output);
            break;
        case 'multiplexer':
            const multiplexer = new Multiplexer();
            multiplexer.name = elementName;
            multiplexer.dataPorts = 2;
            multiplexer.dataBandwidth = 1;
            multiplexer.position = {x, y};
            element = JointJsMultiplexer(multiplexer);
            break;
        case 'decoder':
            const decoder = new Decoder();
            decoder.name = elementName;
            decoder.dataBandwidth = 1;
            decoder.position = {x, y};
            element = JointJsDecoder(decoder);
            break;
        case 'encoder':
            const encoder = new Encoder();
            encoder.name = elementName;
            encoder.dataBandwidth = 2;
            encoder.position = {x, y};
            element = JointJsEncoder(encoder);
            break;
        case 'alu':
            const alu = new Alu();
            alu.name = elementName;
            alu.dataBandwidth = 1;
            alu.position = {x, y};
            alu.type = '+';
            element = JointJsAlu(alu);
            break;
        case 'comp':
            const comparator = new Comparator();
            comparator.name = elementName;
            comparator.dataBandwidth = 1;
            comparator.type = ">";
            element = JointJsComparator(comparator);
            break;
        case 'module':
            const moduleElement = new Module();
            moduleElement.name = elementName;
            moduleElement.instance = `instance_${elementName}`;
            element = JointJsModule(moduleElement, parseModulesResults);
            break;
        case 'sram':
            const sram = new Sram();
            sram.name = elementName;
            sram.dataBandwidth = 1;
            sram.addressBandwidth = 8;
            sram.clkEdge = "rising";
            element = JointJsSram(sram);
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
            element = JointJsRegister(register);
            break;
        case 'splitter':
            const splitter = new Splitter();
            splitter.name = elementName;
            splitter.position = {x, y};
            element = JointJsSplitter(splitter, parseResults);
            break;
        case 'combiner':
            const combiner = new Combiner();
            combiner.name = elementName;
            combiner.position = {x, y};
            element = JointJsCombiner(combiner, parseResults);
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
                className="w-full h-full bg-white overflow-hidden cursor-default dark:bg-black"
                ref={paperElement}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
            ></div>
        </div>
    );
};

export default DiagramArea;
