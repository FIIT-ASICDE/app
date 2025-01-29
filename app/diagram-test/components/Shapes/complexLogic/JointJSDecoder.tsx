// src/components/Shapes/JointJSAnd.tsx
import { BaseSvgElement } from '../base/BaseSvgElement';
import { Decoder } from '../classes/decoder'; // Ваш класс для хранения данных and

export const JointJSDecoder = (decoder: Decoder) => {

    const dimension = 100; // пример формулы, можно менять по вкусу

    // Координаты входных портов
    // Здесь, для примера, используем «линейный» подход, когда порты равномерно распределены по левой стороне.
    const portItems = [];

    // Выходной порт (один) справа, по центру
    portItems.push({
        id: 'input1',
        group: 'input',
        args: {
            x: 0,
            y: dimension / 4
        }
    });
    // Выходной порт (один) справа, по центру
    portItems.push({
        id: 'output1',
        group: 'output',
        args: {
            x: dimension / 2,
            y: dimension / 2
        }
    });


    return new BaseSvgElement({
        elType: 'decoder',
        name: decoder.name,
        bandwidth: decoder.dataBandwidth,
        position: { x: decoder.position?.x || 100, y: decoder.position?.y || 100 },
        size: { width: dimension/2, height: dimension},
        attrs: {
            body: {
                refD: 'M 0 0 L 50 0 L 50 100 L 0 100 Z',
                fill: 'white',
                stroke: '#000',
                strokeWidth: 2,
            },
            label: {
                text: `DECODER\n${decoder.name}`,
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
                        {
                            tagName: 'line',       // непосредственно линия
                            selector: 'portLine'
                        },
                        {
                            tagName: 'circle',     // кружок на конце
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

