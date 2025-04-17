import { And } from "@/app/[userslug]/[repositoryslug]/block-diagram/components/Shapes/classes/and";
import { shapes } from "@joint/core";

export const JointJSAnd = (and: And) => {

    const inCount = and.inPorts || 2;
    const dimension = 50 + (inCount - 2) * 20;
    const portItems = [];

    for (let i = 1; i <= inCount; i++) {
        const portY = (dimension / (inCount + 1)) * i;
        portItems.push({
            id: `input${i}`,
            group: 'input',
            bandwidth: and.dataBandwidth,
            isStruct: false,
            args: {
                x: 0,
                y: portY,
            }
        });
    }

    portItems.push({
        id: 'output1',
        group: 'output',
        bandwidth: and.dataBandwidth,
        isStruct: false,
        args: {
            x: dimension,
            y: dimension / 2
        }
    });

    return new shapes.standard.Path({
        elType: 'and',
        name: and.name,
        bandwidth: and.dataBandwidth,
        inPorts: inCount,
        position: { x: and.position?.x || 100, y: and.position?.y || 100 },
        size: { width: dimension, height: dimension},
        attrs: {
            body: {
                refD: 'M 32 40 L 0 40 L 0 0 L 32 0 C 42 13 42 26 32 40',
                fill: 'white',
                stroke: '#000',
                strokeWidth: 2,
            },
            label: {
                text: `${and.name}`,
                fontSize: 14,
                fontFamily: 'Arial',
                fontWeight: 'bold',
                fill: '#333',
                x: dimension / 2,
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



