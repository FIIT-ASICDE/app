import { Register } from "@/app/block-diagram/components/Shapes/classes/register";
import { shapes } from "@joint/core";

export const JointJSRegister = (register: Register) => {

    const dimension = 200;
    const portItems = [];
    const inLeftCount = 3;
    const isStruct = register.structPackage ? register.structPackage.length > 0 : false;

    let registerRefD = register.resetPort
        ? (register.clkEdge === 'rising'
            ? (register.rstEdge === 'rising'
                ? 'M 0 0 L 50 0 L 50 100 L 0 100 L 0 70 L 10 75 L 0 80 Z'  // Case 1
                : 'M 0 0 L 50 0 L 50 100 L 0 100 L 0 70 L 10 75 L 0 80 Z M 23 2 a 2,2 0 1,0 0,-0.1 Z')  // Case 2
            : (register.rstEdge === 'rising'
                ? 'M 0 0 L 50 0 L 50 100 L 0 100 L 0 70 L 10 75 L 0 80 Z M 0 75 a 2,2 0 1,0 0,-0.1 Z'  // Case 6
                : 'M 0 0 L 50 0 L 50 100 L 0 100 L 0 70 L 10 75 L 0 80 Z M 23 2 a 2,2 0 1,0 0,-0.1 Z M 0 75 a 2,2 0 1,0 0,-0.1 Z'))  // Case 3
        : (register.clkEdge === 'rising'
            ? 'M 0 0 L 50 0 L 50 100 L 0 100 L 0 70 L 10 75 L 0 80 Z'  // Case 4
            : 'M 0 0 L 50 0 L 50 100 L 0 100 L 0 70 L 10 75 L 0 80 Z M 0 75 a 2,2 0 1,0 0,-0.1 Z');  // Case 5


    registerRefD = register.qInverted
        ? `${registerRefD} M 46 50 a 2,2 0 1,0 0,-0.1 Z`
        : registerRefD;

    const portLeftY = (idx: number) => (dimension / (inLeftCount + 1)) * (idx + 1);
    const portRightY = (idx: number) => (dimension / (inLeftCount + 1)) * (idx + 1);

    portItems.push({
        id: 'd',
        bandwidth: register.dataBandwidth,
        group: 'input',
        isStruct: isStruct,
        structPackage: register.structPackage,
        structTypeDef: register.structTypeDef,
        args: {
            x: 0,
            y: portLeftY(0),
        },
        attrs: {
            portLabel: { text: 'D' }
        }
    });
    if (register.enablePort) {
        portItems.push({
            id: 'en',
            bandwidth: 1,
            group: 'input',
            isStruct: false,
            args: {
                x: 0,
                y: portLeftY(1)
            },
            attrs: {
                portLabel: { text: 'EN' }
            }
        });
    }


    portItems.push({
        id: 'clk',
        bandwidth: 1,
        group: 'input',
        isStruct: false,
        args: {
            x: 0,
            y: portLeftY(2)
        },
        attrs: {
            portLabel: {
                text: 'CLK',
                x: 25
            }
        }
    });

    if (register.resetPort) {
        portItems.push({
            id: 'rst',
            bandwidth: 1,
            group: 'input',
            isStruct: false,
            args: {
                x: dimension / 4,
                y: -15
            },
            attrs: {
                portLine: {
                    x1: 0, y1: 15,
                    x2: 0, y2: -5,
                },
                portCircle: {
                    cx: 0, cy: -5
                },
                portLabel: {
                    text: 'RST',
                    x: -10,
                    y: 35
                }
            }
        });
    }

    portItems.push({
        id: 'q',
        bandwidth: register.dataBandwidth,
        group: 'output',
        isStruct: isStruct,
        structPackage: register.structPackage,
        structTypeDef: register.structTypeDef,
        args: {
            x: dimension / 2,
            y: portRightY(0)
        },
        attrs: {
            portLabel: { text: 'Q' }
        }
    });
    if (register.qInverted) {
        portItems.push({
            id: 'qInverted',
            bandwidth: register.dataBandwidth,
            group: 'output',
            isStruct: isStruct,
            structPackage: register.structPackage,
            structTypeDef: register.structTypeDef,
            args: {
                x: dimension / 2,
                y: portRightY(1)
            },
            attrs: {
                portLabel: { text: 'Q' }
            }
        });
    }

    return new shapes.standard.Path({
        elType: 'register',
        name: register.name,
        bandwidth: register.dataBandwidth,
        resetPort: register.resetPort,
        enablePort: register.enablePort,
        clkEdge: register.clkEdge,
        rstEdge: register.rstEdge,
        rstType: register.rstType,
        qInverted: register.qInverted,
        structPackage: register.structPackage,
        structTypeDef: register.structTypeDef,
        isStruct: isStruct,
        language: register.language,
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
                            x: -20,
                            y: 4
                        }
                    }
                },
            }
        },
    });
};

