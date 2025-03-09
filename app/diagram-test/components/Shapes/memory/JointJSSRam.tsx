import { Ram } from '../classes/ram';
import { shapes } from "@joint/core";

export const JointJSSRam = (ram: Ram) => {

    const dimension = 200;
    const portItems = [];

    const ramRefD = ram.clkEdge === 'rising'
        ? 'M 0 0 L 30 0 L 25 10 L 20 0 L 50 0 L 50 100 L 0 100 Z'
        : 'M 0 0 L 30 0 L 25 10 L 20 0 L 50 0 L 50 100 L 0 100 Z M 23 2 a 2,2 0 1,0 0,-0.1 Z';


    portItems.push({
        id: 'input1',
        bandwidth: ram.dataBandwidth,
        group: 'input',
        args: {
            x: 0,
            y: (dimension/2 / (3 - 1))
        },
        attrs: {
            portLabel: { text: 'data_in' }
        }
    });

    portItems.push({
        id: 'input2',
        bandwidth: ram.addressBandwidth,
        group: 'input',
        args: {
            x: 0,
            y: (dimension/2 / (3 - 1)) * 2
        },
        attrs: {
            portLabel: { text: 'addr' }
        }
    });

    portItems.push({
        id: 'input3',
        bandwidth: 1,
        group: 'input',
        args: {
            x: 0,
            y: (dimension/2 / (3 - 1)) * 3
        },
        attrs: {
            portLabel: { text: 'we' }
        }
    });

    portItems.push({
        id: 'input4',
        bandwidth: 1,
        group: 'input',
        args: {
            x: dimension / 4,
            y: -15
        },
        attrs: {
            portLine: {
                x1: 0,    y1: 15,
                x2: 0,    y2: -5,
            },
            portCircle: {
                cx: 0,   cy: -5
            },
            portLabel: { text: 'clk' }
        }
    });

    portItems.push({
        id: 'output1',
        bandwidth: ram.dataBandwidth,
        group: 'output',
        args: {
            x: dimension / 2,
            y: dimension / 2
        },
        attrs: {
            portLabel: { text: 'data_out' }
        }
    });


    return new shapes.standard.Path({
        elType: 'ram',
        name: ram.name,
        clkEdge: ram.clkEdge,
        bandwidth: ram.dataBandwidth,
        addressBandwidth: ram.addressBandwidth,
        position: { x: ram.position?.x || 100, y: ram.position?.y || 100 },
        size: { width: dimension/2, height: dimension},
        attrs: {
            body: {
                refD: ramRefD,
                fill: 'white',
                stroke: '#000',
                strokeWidth: 2,
            },
            label: {
                text: `SRAM\n${ram.name}`,
                fontSize: 14,
                fontFamily: 'Arial',
                fontWeight: 'bold',
                fill: '#333',
                x: dimension / 4,
                y: dimension + 20,
            },
        },
        ports: {
            items: portItems,
            groups: {
                input: {
                    position: { name: 'absolute' },
                    markup: [
                        { tagName: 'line',   selector: 'portLine' },
                        { tagName: 'circle', selector: 'portCircle' },
                        { tagName: 'text',   selector: 'portLabel' }
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
                        },
                        portLabel: {
                            textAnchor: 'start',
                            fontSize: 12,
                            fill: '#000',

                            x: 5,
                            y: 4
                        }
                    }
                },
                output: {
                    position: { name: 'absolute' },

                    markup: [
                        { tagName: 'line',   selector: 'portLine' },
                        { tagName: 'circle', selector: 'portCircle' },
                        { tagName: 'text',   selector: 'portLabel' }
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
                        },
                        portLabel: {
                            textAnchor: 'start',
                            fontSize: 12,
                            fill: '#000',
                            x: -55,
                            y: 4
                        }
                    }
                },
            }
        },
    });
};

