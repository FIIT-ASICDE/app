import { Splitter } from "@/app/diagram-test/components/Shapes/classes/splitter";
import { shapes } from "@joint/core";

export const JointJSBitSplitter = (bitSelect: Splitter) => {

    const selectOutPorts = bitSelect.outPorts || [];
    const outCount = selectOutPorts.length;
    const dimension = 100 + (outCount - 2) * 20;
    const totalBandwidth = selectOutPorts.reduce((sum, port) => sum + port.bandwidth, 0);

    const portItems = [];
    for (let i = 0; i < outCount; i++) {
        const portY = (dimension / (outCount + 1)) * (i+1);
        portItems.push({
            id: `output${i}`,
            bandwidth: (selectOutPorts[i].endBit - selectOutPorts[i].startBit) + 1,
            name: selectOutPorts[i].name,
            startBit: selectOutPorts[i].startBit,
            endBit: selectOutPorts[i].endBit,
            group: 'output',
            args: { x: dimension/2, y: portY }
        });
    }

    portItems.push({
        id: 'input1',
        group: 'input',
        bandwidth: totalBandwidth,
        args: {
            x: 0,
            y: dimension / 2
        }
    });


    return new shapes.standard.Path({
        elType: 'splitter',
        name: bitSelect.name,
        bandwidth: bitSelect.dataBandwidth,
        outPorts: outCount,
        selectOutPorts: selectOutPorts,
        position: { x: bitSelect.position?.x || 100, y: bitSelect.position?.y || 100 },
        size: { width: dimension/2, height: dimension},
        attrs: {
            body: {
                refD: 'M 0 30 L 50 0 L 50 100 L 0 70 Z',
                fill: 'white',
                stroke: '#000',
                strokeWidth: 2,
            },
            label: {
                text: bitSelect.name,
                fontSize: 14,
                fontFamily: 'Arial',
                fontWeight: 'bold',
                fill: '#333',
                x: dimension/4,
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

