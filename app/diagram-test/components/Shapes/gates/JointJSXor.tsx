// src/components/Shapes/JointJSAnd.tsx
import { Xor } from '../classes/xor';
import { shapes } from "@joint/core"; // Ваш класс для хранения данных and

export const JointJSXor = (xor: Xor) => {

    const inCount = xor.inPorts || 2;
    const dimension = 50 + (inCount - 2) * 20;

    function bezierX(t: number): number {
        const mt = 1 - t;
        // p0=0, p1=5, p2=5, p3=0
        // x(t) = 3 * mt^2 * t * 5 + 3 * mt * t^2 * 5
        return 9 * mt * mt * t + 9 * mt * t * t;
    }
    function bezierY(t: number): number {
        const mt = 1 - t;
        // p0=40, p1=26, p2=13, p3=0
        // y(t) = 40*(mt^3) + 3*26*(mt^2 * t) + 3*13*(mt * t^2) + 0*(t^3)
        return 40 * (mt**3)
            + 78 * (mt**2 * t)    // 3*26=78
            + 39 * (mt * t**2);   // 3*13=39
    }

    const portItems = [];
    const stepT = 1 / (inCount + 1);

    for (let i = 1; i <= inCount; i++) {
        const t = stepT * i;
        const xLocal = bezierX(t);
        const yLocal = bezierY(t);

        const scaleX = dimension / 24;
        const scaleY = dimension / 40;

        const finalX = (xLocal * scaleX);
        const finalY = (yLocal * scaleY);

        portItems.push({
            id: `input${i}`,
            group: 'input',
            bandwidth: xor.bandwidth,
            args: { x: finalX, y: finalY }
        });
    }

    portItems.push({
        id: 'output1',
        group: 'output',
        bandwidth: xor.bandwidth,
        args: {
            x: dimension,
            y: dimension / 2
        }
    });

    return new shapes.standard.Path({
        elType: 'xor',
        name: xor.name,
        bandwidth: xor.bandwidth,
        inPorts: inCount,
        position: { x: xor.position?.x || 100, y: xor.position?.y || 100 },
        size: { width: dimension, height: dimension},
        attrs: {
            body: {
                refD: 'M 24 40 L 4 40 C 9 26 9 13 4 0 M 0 0 C 5 13 5 26 0 40 M 4 0 L 24 0 C 45 13 45 26 24 40',
                fill: 'white',
                stroke: '#000',
                strokeWidth: 2,
            },
            label: {
                text: `${xor.name}`,
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
