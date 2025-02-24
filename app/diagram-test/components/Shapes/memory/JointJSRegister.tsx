
import { BaseSvgElement } from '../base/BaseSvgElement';
import { Register } from '../classes/register';
import { shapes } from "@joint/core";

export const JointJSRegister = (register: Register) => {

    const dimension = 200;

    const portItems = [];

    const inLeftCount = register.resetPort ? 3 : 2;

    const portLeftY = (idx: number) => (dimension / (inLeftCount + 1)) * (idx + 1);

    // input1 => data
    portItems.push({
        id: 'input1',
        group: 'input',
        args: {
            x: 0,
            y: portLeftY(0),
        },
        attrs: {
            portLabel: { text: 'data' }
        }
    });

    // input3 => we
    portItems.push({
        id: 'input2',
        group: 'input',
        args: {
            x: 0,
            y: portLeftY(1)
        },
        attrs: {
            portLabel: { text: 'we' }
        }
    });
    if (register.resetPort) {
        // input3 => rst
        portItems.push({
            id: 'input3',
            group: 'input',
            args: {
                x: 0,
                y: portLeftY(2)
            },
            attrs: {
                portLabel: { text: 'rst' }
            }
        });
    }


    // ----------------------------------------------------------
    // 2) input4 => clk (расположен сверху, как раньше)
    // ----------------------------------------------------------
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
            portLabel: { text: 'clk' }
        }
    });



    portItems.push({
        id: 'output1',
        group: 'output',
        args: {
            x: dimension / 2,
            y: dimension / 2
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
                refD: 'M 0 0 L 30 0 L 25 10 L 20 0 L 50 0 L 50 100 L 0 100 Z',
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
                            // Объект-атрибуты для <g>
                            // (дополнительно стили, transform, если надо)
                        },
                        portLine: {
                            x1: 0,   y1: 0,
                            x2: -20, y2: 0,      // Линия теперь идёт влево
                            stroke: '#000',
                            strokeWidth: 2,

                        },
                        portCircle: {
                            cx: -20,  // кружок тоже в левом конце
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
                            // Объект-атрибуты для <g>
                            // (дополнительно стили, transform, если надо)
                        },
                        portLine: {
                            x1: 0,   y1: 0,
                            x2: 20, y2: 0,      // Линия теперь идёт влево
                            stroke: '#000',
                            strokeWidth: 2,

                        },
                        portCircle: {
                            cx: 20,  // кружок тоже в левом конце
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

