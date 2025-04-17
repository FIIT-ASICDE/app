import {Alu} from "@/app/block-diagram/components/Shapes/classes/alu";
import { shapes } from "@joint/core";

export const JointJSAlu = (alu: Alu) => {

    const dimension = 100;
    const portItems = [];
    const outputBandwidth = (alu.type === '+' || alu.type === '-')
        ? alu.dataBandwidth + 1
        : alu.type === '*'
            ? alu.dataBandwidth * 2
            : alu.dataBandwidth;

    portItems.push({
        id: 'input1',
        group: 'input',
        bandwidth: alu.dataBandwidth,
        isStruct: false,
        args: {
            x: 0,
            y: 25
        }
    });

    portItems.push({
        id: 'input2',
        group: 'input',
        bandwidth: alu.dataBandwidth,
        isStruct: false,
        args: {
            x: 0,
            y: dimension - 25
        }
    });

    portItems.push({
        id: 'output1',
        group: 'output',
        bandwidth: outputBandwidth,
        isStruct: false,
        args: {
            x: dimension / 2,
            y: dimension / 2
        }
    });


    return new shapes.standard.Path({
        elType: 'alu',
        name: alu.name,
        aluType: alu.type,
        bandwidth: alu.dataBandwidth,
        position: { x: alu.position?.x || 100, y: alu.position?.y || 100 },
        size: { width: dimension/2, height: dimension},
        attrs: {
            body: {
                refD: 'M 0 0 L 10 3 10 7 0 10 0 6 3 5 0 4 z',
                fill: 'white',
                stroke: '#000',
                strokeWidth: 2,
            },
            label: {
                text: `${alu.type}\n\n\n\n${alu.name}`,
                fontSize: 14,
                fontFamily: 'Arial',
                fontWeight: 'bold',
                fill: '#333',
                x: dimension/4 + 5,
                y: dimension-20,
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


