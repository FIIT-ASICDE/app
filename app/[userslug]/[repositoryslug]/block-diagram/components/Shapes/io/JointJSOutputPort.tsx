import { Port } from "@/app/block-diagram/components/Shapes/classes/port";
import { shapes } from "@joint/core";

export const JointJSOutputPort = (output: Port) => {
    const dimension = 40;
    const portItems = [];
    const isStruct = output.structPackage ? output.structPackage.length > 0 : false;


    portItems.push({
        id: 'input1',
        group: 'input',
        bandwidth: output.dataBandwidth,
        isStruct: isStruct,
        structPackage: output.structPackage,
        structTypeDef: output.structTypeDef,
        args: {
            x: 0,
            y: dimension / 4
        }
    });

    return new shapes.standard.Path({
        elType: 'output',
        name: output.name,
        bandwidth: output.dataBandwidth,
        structPackage: output.structPackage,
        structTypeDef: output.structTypeDef,
        isStruct: isStruct,
        language: output.language,
        position: { x: output.position?.x || 100, y: output.position?.y || 100 },
        size: { width: dimension, height: dimension/2},
        attrs: {
            body: {
                refD: 'M 5 0 L 15 0 15 10 5 10 0 5 z',
                fill: '#ededed',
                stroke: '#000',
                strokeWidth: 2,
            },
            label: {
                text: `${output.name}`,
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
            }
        },
    });
};

