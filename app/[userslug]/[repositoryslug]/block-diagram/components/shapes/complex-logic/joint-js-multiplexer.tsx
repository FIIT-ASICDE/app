import { Multiplexer } from "@/app/[userslug]/[repositoryslug]/block-diagram/components/shapes/classes/multiplexer";
import { shapes } from "@joint/core";

export const JointJsMultiplexer = (multiplexer: Multiplexer) => {

    const inCount = multiplexer.dataPorts || 2;
    const dimension = 100 + (inCount - 2) * 20;
    const isStruct = multiplexer.structPackage ? multiplexer.structPackage.length > 0 : false;

    const portItems = [];
    for (let i = 1; i <= inCount; i++) {
        const portY = (dimension / (inCount + 1)) * i;
        portItems.push({
            id: `input${i}`,
            bandwidth: multiplexer.dataBandwidth,
            group: 'input',
            isStruct: isStruct,
            structPackage: multiplexer.structPackage,
            structTypeDef: multiplexer.structTypeDef,
            args: { x: 0, y: portY }
        });
    }

    portItems.push({
        id: 'output1',
        group: 'output',
        isStruct: isStruct,
        structPackage: multiplexer.structPackage,
        structTypeDef: multiplexer.structTypeDef,
        bandwidth: multiplexer.dataBandwidth,
        args: {
            x: dimension/2,
            y: dimension / 2
        }
    });

    portItems.push({
        id: 'select',
        group: 'input',
        isStruct: false,
        bandwidth: Math.ceil(Math.log2(inCount)),
        args: {
            x: 25,
            y: 0
        },
        attrs: {
            portLine: {
                x1: 0,    y1: 15,
                x2: 0,    y2: -5
            },
            portCircle: {
                cx: 0,   cy: -5
            }
        }
    });

    return new shapes.standard.Path({
        elType: 'multiplexer',
        name: multiplexer.name,
        bandwidth: multiplexer.dataBandwidth,
        structPackage: multiplexer.structPackage,
        structTypeDef: multiplexer.structTypeDef,
        isStruct: isStruct,
        inPorts: inCount,
        language: multiplexer.language,
        position: { x: multiplexer.position?.x || 100, y: multiplexer.position?.y || 100 },
        size: { width: dimension/2, height: dimension},
        attrs: {
            body: {
                refD: 'M 0 0 L 50 30 L 50 70 L 0 100 Z',
                fill: 'white',
                stroke: '#000',
                strokeWidth: 2,
            },
            label: {
                text: multiplexer.name,
                fontSize: 14,
                fontFamily: 'Arial',
                fontWeight: 'bold',
                fill: '#333',
                x: dimension/4,
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

