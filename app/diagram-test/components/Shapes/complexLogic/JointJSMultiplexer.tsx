import { BaseSvgElement } from '../base/BaseSvgElement';
import { Multiplexer } from '../classes/multiplexer'; // Ваш класс для хранения данных and

export const JointJSMultiplexer = (multiplexer: Multiplexer) => {
    // Минимальный размер, с которого начинаем:
    // например, 60 + 10 * (количество портов - 2) или любая ваша формула
    const inCount = multiplexer.dataPorts || 2;         // если inPorts не задан, пусть будет хотя бы 2
    const dimension = 100 + (inCount - 2) * 20; // пример формулы, можно менять по вкусу

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
            x: dimension/2,
            y: dimension / 2
        }
    });

    portItems.push({
        id: 'select',
        group: 'input',
        args: {
            x: 25,
            y: 0
        },
        attrs: {
            // Переопределяем именно line и circle
            // Линию делаем «вертикальной вверх»
            portLine: {
                x1: 0,    y1: 15,
                x2: 0,    y2: -5
            },
            portCircle: {
                cx: 0,   cy: -5
            }
        }
    });

    // Для наглядности можно менять «путь» (Path) или «Image»:
    // Здесь для примера используем «Image» c SVG andIcon, но можем и path-форму применить
    return new BaseSvgElement({
        elType: 'multiplexer',
        name: multiplexer.name,
        bandwidth: multiplexer.dataBandwidth,
        inPorts: inCount, // можно сохранить сюда, если нужно
        position: { x: multiplexer.position?.x || 100, y: multiplexer.position?.y || 100 },
        size: { width: dimension/2, height: dimension},
        attrs: {
            body: {
                refD: 'M 0 0 L 50 30 L 50 70 L 0 100 Z',
                fill: 'white',
                stroke: '#000',
                strokeWidth: 2,
            },
            label: {
                text: multiplexer.name,
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

