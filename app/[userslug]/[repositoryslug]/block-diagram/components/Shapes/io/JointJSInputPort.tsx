import { Port } from "@/app/[userslug]/[repositoryslug]/block-diagram/components/Shapes/classes/port";
import { shapes } from "@joint/core";

export const JointJSInputPort = (input: Port) => {
    const dimension = 40;
    const portItems = [];
    const isStruct = input.structPackage ? input.structPackage.length > 0 : false;

    portItems.push({
        id: 'output1',
        group: 'output',
        bandwidth: input.dataBandwidth,
        isStruct: isStruct,
        structPackage: input.structPackage,
        structTypeDef: input.structTypeDef,
        args: {
            x: dimension,
            y: dimension / 4
        }
    });

    return new shapes.standard.Path({
        elType: 'input',
        name: input.name,
        bandwidth: input.dataBandwidth,
        structPackage: input.structPackage,
        structTypeDef: input.structTypeDef,
        isStruct: isStruct,
        language: input.language,
        position: { x: input.position?.x || 100, y: input.position?.y || 100 },
        size: { width: dimension, height: dimension/2},
        attrs: {
            body: {
                refD: 'M 0 0 L 10 0 15 5 10 10 0 10 z',
                fill: '#ededed',
                stroke: '#000',
                strokeWidth: 2,
            },
            label: {
                text: `${input.name}`,
                fontSize: 14,
                fontFamily: 'Arial',
                fontWeight: 'bold',
                fill: '#333',
                x: dimension / 2,
                y: dimension/3 + 20,
            },
        },
        ports: {
            items: portItems,
            groups: {
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

