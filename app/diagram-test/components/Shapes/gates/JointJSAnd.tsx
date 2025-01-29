// src/components/Shapes/JointJSAnd.tsx
import { BaseSvgElement } from '../base/BaseSvgElement';
import { And } from '../classes/and'; // Ваш класс для хранения данных and

export const JointJSAnd = (and: And) => {
    // Минимальный размер, с которого начинаем:
    // например, 60 + 10 * (количество портов - 2) или любая ваша формула
    const inCount = and.inPorts || 2;         // если inPorts не задан, пусть будет хотя бы 2
    const dimension = 50 + (inCount - 2) * 20; // пример формулы, можно менять по вкусу

    // Координаты входных портов
    // Здесь, для примера, используем «линейный» подход, когда порты равномерно распределены по левой стороне.
    const portItems = [];
    for (let i = 1; i <= inCount; i++) {
        const portY = (dimension / (inCount + 1)) * i;
        portItems.push({
            id: `input${i}`,
            group: 'input',
            args: { x: 0, y: portY } // абсолютная позиция: (0, portY)
        });
    }

    // Выходной порт (один) справа, по центру
    portItems.push({
        id: 'output1',
        group: 'output',
        args: {
            x: dimension,
            y: dimension / 2
        }
    });

    // Для наглядности можно менять «путь» (Path) или «Image»:
    // Здесь для примера используем «Image» c SVG andIcon, но можем и path-форму применить
    return new BaseSvgElement({
        elType: 'and',
        name: and.name,
        bandwidth: and.bandwidth,
        inPorts: inCount, // можно сохранить сюда, если нужно
        position: { x: and.position?.x || 100, y: and.position?.y || 100 },
        size: { width: dimension, height: dimension},
        attrs: {
            body: {
                refD: 'M 32 40 L 0 40 L 0 0 L 32 0 C 42 13 42 26 32 40',
                fill: 'white',
                stroke: '#000',
                strokeWidth: 2,
            },
            label: {
            text: '',
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
