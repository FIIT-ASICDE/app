import {Subtractor} from '../classes/subtractor';
import { shapes } from "@joint/core";

export const JointJSSubtractor = (subtractor: Subtractor) => {

    const dimension = 100;
    const portItems = [];

    portItems.push({
        id: 'input1',
        group: 'input',
        bandwidth: subtractor.dataBandwidth,
        args: {
            x: 0,
            y: 25
        }
    });

    portItems.push({
        id: 'input2',
        group: 'input',
        bandwidth: subtractor.dataBandwidth,
        args: {
            x: 0,
            y: dimension - 25
        }
    });

    portItems.push({
        id: 'output1',
        group: 'output',
        bandwidth: subtractor.dataBandwidth+1,
        args: {
            x: dimension / 2,
            y: dimension / 2
        }
    });


    return new shapes.standard.Path({
        elType: 'subtractor',
        name: subtractor.name,
        bandwidth: subtractor.dataBandwidth,
        position: { x: subtractor.position?.x || 100, y: subtractor.position?.y || 100 },
        size: { width: dimension/2, height: dimension},
        attrs: {
            body: {
                refD: 'M 0 0 L 10 3 10 7 0 10 0 6 3 5 0 4 z',
                fill: 'white',
                stroke: '#000',
                strokeWidth: 2,
            },
            label: {
                text: `-\n\n\n\n${subtractor.name}`,
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



