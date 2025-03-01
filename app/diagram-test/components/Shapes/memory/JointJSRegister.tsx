import { Register } from '../classes/register';
import { shapes } from "@joint/core";

export const JointJSRegister = (register: Register) => {

    const dimension = 200;
    const portItems = [];
    const inLeftCount = register.resetPort ? 3 : 2;
    const registerRefD = register.resetPort ? 'M 0 0 L 50 0 L 50 100 L 0 100 L 0 70 L 10 75 L 0 80 Z' : 'M 0 0 L 50 0 L 50 100 L 0 100 Z';
    const portLeftY = (idx: number) => (dimension / (inLeftCount + 1)) * (idx + 1);

    portItems.push({
        id: 'input1',
        group: 'input',
        args: {
            x: 0,
            y: portLeftY(0),
        },
        attrs: {
            portLabel: { text: 'D' }
        }
    });

    portItems.push({
        id: 'input2',
        group: 'input',
        args: {
            x: 0,
            y: portLeftY(1)
        },
        attrs: {
            portLabel: { text: 'EN' }
        }
    });
    if (register.resetPort) {
        portItems.push({
            id: 'input3',
            group: 'input',
            args: {
                x: 0,
                y: portLeftY(2)
            },
            attrs: {
                portLabel: {
                    text: 'RST',
                    x: 25
                }
            }
        });
    }

    portItems.push({
        id: 'input4',
        group: 'input',
        args: {
            x: dimension / 4,
            y: -15
        },
        attrs: {
            portLine: {
                x1: 0,  y1: 15,
                x2: 0,  y2: -5,
            },
            portCircle: {
                cx: 0,  cy: -5
            },
            portLabel: {
                text: 'CLK',
                x: -10,
                y: 30
            }
        }
    });

    portItems.push({
        id: 'output1',
        group: 'output',
        args: {
            x: dimension / 2,
            y: dimension / 2
        },
        attrs: {
            portLabel: { text: 'Q' }
        }
    });

    return new shapes.standard.Path({
        elType: 'register',
        name: register.name,
        bandwidth: register.dataBandwidth,
        resetPort: register.resetPort,
        position: { x: register.position?.x || 100, y: register.position?.y || 100 },
        size: { width: dimension/2, height: dimension},
        attrs: {
            body: {
                refD: registerRefD,
                fill: 'white',
                stroke: '#000',
                strokeWidth: 2,
            },
            label: {
                text: `REGISTER\n${register.name}`,
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
                            x: -15,
                            y: 4
                        }
                    }
                },
            }
        },
    });
};

