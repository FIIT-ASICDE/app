import { Combiner } from "@/app/diagram-test/components/Shapes/classes/combiner";
import { shapes } from "@joint/core";

export const JointJSCombiner = (combiner: Combiner) => {

    const combineInPorts = combiner.inPorts || [];
    const inCount = combineInPorts.length;
    const dimension = 100 + (inCount - 2) * 20;
    const totalBandwidth = combineInPorts.reduce((sum, port) => sum + port.dataBandwidth, 0);


    const portItems = [];
    for (let i = 0; i < inCount; i++) {
        const portY = (dimension / (inCount + 1)) * (i+1);
        portItems.push({
            id: `input${i}`,
            bandwidth: combineInPorts[i].dataBandwidth,
            name: combineInPorts[i].name,
            group: 'input',
            args: { x: 0, y: portY }
        });
    }

    portItems.push({
        id: 'output1',
        group: 'output',
        bandwidth: totalBandwidth,
        args: {
            x: dimension/2,
            y: dimension / 2
        }
    });


    return new shapes.standard.Path({
        elType: 'combiner',
        name: combiner.name,
        bitPortType: combiner.bitPortType,
        inPorts: inCount,
        combineInPorts: combineInPorts,
        structPackage: combiner.structPackage,
        structTypeDef: combiner.structTypeDef,
        position: { x: combiner.position?.x || 100, y: combiner.position?.y || 100 },
        size: { width: dimension/2, height: dimension},
        attrs: {
            body: {
                refD: 'M 0 0 L 50 30 L 50 70 L 0 100 Z',
                fill: 'white',
                stroke: '#000',
                strokeWidth: 2,
            },
            label: {
                text: combiner.name,
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

