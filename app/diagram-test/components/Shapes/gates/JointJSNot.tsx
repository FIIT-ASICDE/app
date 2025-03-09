import { Not } from '../classes/not';
import { shapes } from "@joint/core";

export const JointJSNot = (not: Not) => {

    const inCount = 1
    const dimension = 50;
    const portItems = [];

    portItems.push({
        id: 'input1',
        group: 'input',
        bandwidth: not.bandwidth,
        args: {
            x: 0,
            y: dimension / 2
        }
    });

    portItems.push({
        id: 'output1',
        group: 'output',
        bandwidth: not.bandwidth,
        args: {
            x: dimension,
            y: dimension / 2
        }
    });

    return new shapes.standard.Path({
        elType: 'not',
        name: not.name,
        bandwidth: not.bandwidth,
        inPorts: inCount,
        position: { x: not.position?.x || 100, y: not.position?.y || 100 },
        size: { width: dimension, height: dimension},
        attrs: {
            body: {
                refD: 'M 100 50 L 0 0 L 0 100 Z M 120 50 A 10 10 0 1 0 100 50 A 10 10 0 1 0 120 50',
                fill: 'white',
                stroke: '#000',
                strokeWidth: 2,
            },
            label: {
                text: `${not.name}`,
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
