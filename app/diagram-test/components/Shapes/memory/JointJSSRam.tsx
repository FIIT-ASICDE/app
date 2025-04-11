import { Sram } from "@/app/diagram-test/components/Shapes/classes/sram";
import { shapes } from "@joint/core";

export const JointJSSRam = (sram: Sram) => {

    const dimension = 200;
    const portItems = [];
    const isStruct = sram.structPackage ? sram.structPackage.length > 0 : false;


    const ramRefD = sram.clkEdge === 'rising'
        ? 'M 0 0 L 30 0 L 25 10 L 20 0 L 50 0 L 50 100 L 0 100 Z'
        : 'M 0 0 L 30 0 L 25 10 L 20 0 L 50 0 L 50 100 L 0 100 Z M 23 2 a 2,2 0 1,0 0,-0.1 Z';


    portItems.push({
        id: 'data_in',
        bandwidth: sram.dataBandwidth,
        group: 'input',
        isStruct: isStruct,
        structPackage: sram.structPackage,
        structTypeDef: sram.structTypeDef,
        args: {
            x: 0,
            y: (dimension/2 / (3 - 1))
        },
        attrs: {
            portLabel: { text: 'data_in' }
        }
    });

    portItems.push({
        id: 'addr',
        bandwidth: sram.addressBandwidth,
        group: 'input',
        isStruct: false,
        args: {
            x: 0,
            y: (dimension/2 / (3 - 1)) * 2
        },
        attrs: {
            portLabel: { text: 'addr' }
        }
    });

    portItems.push({
        id: 'we',
        bandwidth: 1,
        group: 'input',
        isStruct: false,
        args: {
            x: 0,
            y: (dimension/2 / (3 - 1)) * 3
        },
        attrs: {
            portLabel: { text: 'we' }
        }
    });

    portItems.push({
        id: 'clk',
        bandwidth: 1,
        group: 'input',
        isStruct: false,
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
        id: 'data_out',
        bandwidth: sram.dataBandwidth,
        group: 'output',
        isStruct: isStruct,
        structPackage: sram.structPackage,
        structTypeDef: sram.structTypeDef,
        args: {
            x: dimension / 2,
            y: dimension / 2
        },
        attrs: {
            portLabel: { text: 'data_out' }
        }
    });


    return new shapes.standard.Path({
        elType: 'sram',
        name: sram.name,
        clkEdge: sram.clkEdge,
        bandwidth: sram.dataBandwidth,
        addressBandwidth: sram.addressBandwidth,
        structPackage: sram.structPackage,
        structTypeDef: sram.structTypeDef,
        isStruct: isStruct,
        language: sram.language,
        position: { x: sram.position?.x || 100, y: sram.position?.y || 100 },
        size: { width: dimension/2, height: dimension},
        attrs: {
            body: {
                refD: ramRefD,
                fill: 'white',
                stroke: '#000',
                strokeWidth: 2,
            },
            label: {
                text: `SRAM\n${sram.name}`,
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

