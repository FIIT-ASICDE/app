// pages/diagram-test/utils/diagramUtils.ts

import { shapes } from '@jointjs/core';

// Функция для создания прямоугольника с портами
export const createRectangle = (x: number, y: number, label: string) => {
    const rect = new shapes.standard.Rectangle();
    rect.position(x, y);
    rect.resize(100, 40);
    rect.attr({
        body: {
            fill: '#3498db',
            stroke: '#2980b9',
            strokeWidth: 2,
        },
        label: {
            text: label,
            fill: 'white',
            fontSize: 14,
        },
    });

    // Добавляем порты
    rect.addPorts([
        {
            id: 'top',
            group: 'top',
        },
        {
            id: 'bottom',
            group: 'bottom',
        },
    ]);

    // Определяем группы портов
    rect.set('ports/groups', {
        top: {
            position: {
                name: 'top',
            },
            attrs: {
                circle: {
                    r: 5,
                    magnet: true,
                    stroke: '#fff',
                    fill: '#2980b9',
                },
            },
        },
        bottom: {
            position: {
                name: 'bottom',
            },
            attrs: {
                circle: {
                    r: 5,
                    magnet: true,
                    stroke: '#fff',
                    fill: '#2980b9',
                },
            },
        },
    });

    return rect;
};

// Аналогичные функции для других форм
export const createCircle = (x: number, y: number, label: string) => {
    const circle = new shapes.standard.Circle();
    circle.position(x, y);
    circle.resize(80, 80);
    circle.attr({
        body: {
            fill: '#2ecc71',
            stroke: '#27ae60',
            strokeWidth: 2,
        },
        label: {
            text: label,
            fill: 'white',
            fontSize: 14,
        },
    });

    // Добавляем порты
    circle.addPorts([
        {
            id: 'left',
            group: 'left',
        },
        {
            id: 'right',
            group: 'right',
        },
    ]);

    // Определяем группы портов
    circle.set('ports/groups', {
        left: {
            position: {
                name: 'left',
            },
            attrs: {
                circle: {
                    r: 5,
                    magnet: true,
                    stroke: '#fff',
                    fill: '#27ae60',
                },
            },
        },
        right: {
            position: {
                name: 'right',
            },
            attrs: {
                circle: {
                    r: 5,
                    magnet: true,
                    stroke: '#fff',
                    fill: '#27ae60',
                },
            },
        },
    });

    return circle;
};

export const createPolygon = (x: number, y: number, label: string) => {
    const polygon = new shapes.standard.Polygon();
    polygon.position(x, y);
    polygon.resize(100, 60);
    polygon.attr({
        body: {
            fill: '#e67e22',
            stroke: '#d35400',
            strokeWidth: 2,
        },
        label: {
            text: label,
            fill: 'white',
            fontSize: 14,
        },
    });

    // Добавляем порты
    polygon.addPorts([
        {
            id: 'left',
            group: 'left',
        },
        {
            id: 'right',
            group: 'right',
        },
    ]);

    // Определяем группы портов
    polygon.set('ports/groups', {
        left: {
            position: {
                name: 'left',
            },
            attrs: {
                circle: {
                    r: 5,
                    magnet: true,
                    stroke: '#fff',
                    fill: '#d35400',
                },
            },
        },
        right: {
            position: {
                name: 'right',
            },
            attrs: {
                circle: {
                    r: 5,
                    magnet: true,
                    stroke: '#fff',
                    fill: '#d35400',
                },
            },
        },
    });

    return polygon;
};
