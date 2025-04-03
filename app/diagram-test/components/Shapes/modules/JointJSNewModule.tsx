import { Module } from "@/app/diagram-test/components/Shapes/classes/module";
import { shapes } from "@joint/core";

export const JointJSNewModule = (module: Module) => {

    const moduleInPorts = module.inPorts || [];
    const moduleOutPorts = module.outPorts || [];

    const inCount = moduleInPorts.length;
    const outCount = moduleOutPorts.length;

    const maxPorts = Math.max(inCount, outCount, 2);
    const baseWidth = 160;
    const baseHeight = 100;
    const stepWidth = 10;
    const stepHeight = 40;

    const width = baseWidth + stepWidth * (maxPorts - 2);
    const height = baseHeight + stepHeight * (maxPorts - 2);

    const portItems = [];

    for (let i = 0; i < inCount; i++) {
        const portY = (height / (inCount + 1)) * (i + 1);
        portItems.push({
            id: `input${i}`,
            bandwidth: moduleInPorts[i].dataBandwidth,
            name: moduleInPorts[i].name,
            group: 'input',
            args: { x: 0, y: portY },
        });
    }
    for (let i = 0; i < outCount; i++) {
        const portY = (height / (outCount + 1)) * (i + 1);
        portItems.push({
            id: `output${i}`,
            bandwidth: moduleOutPorts[i].dataBandwidth,
            name: moduleOutPorts[i].name,
            group: 'output',
            args: { x: width, y: portY },
        });
    }

    return new shapes.standard.Path({
        elType: 'newModule',
        name: module.name,
        instance: module.instance,
        moduleInPorts: moduleInPorts,
        moduleOutPorts: moduleOutPorts,
        position: { x: module.position?.x || 100, y: module.position?.y || 100 },
        size: {
            width,
            height
        },
        attrs: {
            body: {
                refD: 'M 0 0 L 50 0 L 50 100 L 0 100 Z',
                fill: 'white',
                stroke: '#000',
                strokeWidth: 2,
            },
            label: {
                text: `${module.name}\n${module.instance}`,
                fontSize: 14,
                fontFamily: 'Arial',
                fontWeight: 'bold',
                fill: '#333',
                x: width / 2,
                y: height / 2,
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

