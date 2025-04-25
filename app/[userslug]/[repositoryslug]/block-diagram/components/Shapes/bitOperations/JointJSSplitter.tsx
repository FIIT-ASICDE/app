import { Splitter } from "@/app/[userslug]/[repositoryslug]/block-diagram/components/Shapes/classes/splitter";
import { shapes } from "@joint/core";
import { UnifiedPackage } from "@/app/[userslug]/[repositoryslug]/block-diagram/utils/DiagramGeneration/interfaces";

export const JointJSSplitter = (splitter: Splitter, parseResults: UnifiedPackage[]) => {

    const selectOutPorts = splitter.outPorts || [];
    const outCount = selectOutPorts.length;
    let dimension = 100 + (outCount - 2) * 20;
    const totalBandwidth = selectOutPorts.reduce((sum, port) => sum + (port.bandwidth || 1), 0);
    const isStruct = splitter.structPackage ? splitter.structPackage.length > 0 : false;

    const portItems = [];

    if (isStruct) {
        const targetPackage = parseResults.find(pkg => pkg.name === splitter.structPackage);
        const targetStruct = targetPackage?.structs.find(s => s.name === splitter.structTypeDef);

        if (targetStruct) {
            dimension = 100 + (targetStruct.fields.length - 2) * 20;
            for (let i = 0; i < targetStruct.fields.length; i++) {
                const field = targetStruct.fields[i];
                const portY = (dimension / (targetStruct.fields.length + 1)) * (i+1);

                portItems.push({
                    id: `output${i}`,
                    name: field.name,
                    group: 'output',
                    bandwidth: field.bandwidth,
                    startBit: field.startBit,
                    endBit: field.endBit,
                    isStruct: false,
                    args: { x: 0, y: portY }
                });
            }
        }
    }
    else {
        for (let i = 0; i < outCount; i++) {
            const portY = (dimension / (outCount + 1)) * (i+1);
            const endBit = selectOutPorts[i].endBit || 0;
            const startBit = selectOutPorts[i].startBit || 0;
            portItems.push({
                id: `output${i}`,
                bandwidth: (endBit - startBit) + 1,
                name: selectOutPorts[i].name,
                startBit: selectOutPorts[i].startBit,
                endBit: selectOutPorts[i].endBit,
                isStruct: false,
                group: 'output',
                args: { x: 0, y: portY }
            });
        }
    }

    portItems.push({
        id: 'input1',
        group: 'input',
        bandwidth: totalBandwidth,
        isStruct: isStruct,
        structPackage: splitter.structPackage,
        structTypeDef: splitter.structTypeDef,
        args: {
            x: 0,
            y: dimension / 2
        }
    });


    return new shapes.standard.Path({
        elType: 'splitter',
        name: splitter.name,
        bitPortType: splitter.bitPortType,
        outPorts: outCount,
        selectOutPorts: selectOutPorts,
        structPackage: splitter.structPackage,
        structTypeDef: splitter.structTypeDef,
        isStruct: isStruct,
        language: splitter.language,
        position: { x: splitter.position?.x || 100, y: splitter.position?.y || 100 },
        size: { width: 2, height: dimension},
        attrs: {
            body: {
                refD: 'M 0 0 L 2 0 L 2 100 L 0 100 Z',
                fill: 'white',
                stroke: '#000',
                strokeWidth: 2,
            },
            label: {
                text: splitter.name,
                fontSize: 14,
                fontFamily: 'Arial',
                fontWeight: 'bold',
                fill: '#333',
                x: 0,
                y: dimension + 10,
            },
        },
        ports: {
            items: portItems,
            groups: {
                input: {
                    position: { name: 'absolute' },
                    markup: [
                        {
                            tagName: 'line',
                            selector: 'portLine'
                        },
                        {
                            tagName: 'circle',
                            selector: 'portCircle'
                        }
                    ],
                    attrs: {
                        portBody: {
                        },
                        portLine: {
                            x1: 0,   y1: 0,
                            x2: -20, y2: 0,
                            stroke: '#000',
                            strokeWidth: 2,

                        },
                        portCircle: {
                            cx: -20,
                            cy: 0,
                            r: 4,
                            fill: '#fff',
                            stroke: '#000',
                            strokeWidth: 2,
                            magnet: 'passive',
                            'port-group': 'input',
                        }
                    }
                },
                output: {
                    position: { name: 'absolute' },

                    markup: [
                        {
                            tagName: 'line',
                            selector: 'portLine'
                        },
                        {
                            tagName: 'circle',
                            selector: 'portCircle'
                        }
                    ],
                    attrs: {
                        portBody: {
                        },
                        portLine: {
                            x1: 0,   y1: 0,
                            x2: 20, y2: 0,
                            stroke: '#000',
                            strokeWidth: 2,

                        },
                        portCircle: {
                            cx: 20,
                            cy: 0,
                            r: 4,
                            fill: '#e3d12d',
                            stroke: '#000',
                            strokeWidth: 2,
                            magnet: true,
                            'port-group': 'output',
                        }
                    }
                },
            }
        },
    });
};

