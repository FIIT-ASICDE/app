// src/components/Shapes/OrGate.tsx
import { BaseComplexLogic } from '../base/BaseComplexLogic';

let width = 100;
let height = 127;

export const Subtractor = BaseComplexLogic.define('custom.Subtractor', {
    attrs: {
        image: {
            href: '/images/svg/adder.svg',
            width: width,
            height: height,
        },
        label: {
            text: '-',
            fontSize: 14,
            fontFamily: 'Arial',
            fontWeight: 'bold',
            fill: '#333',
            x: width/2 + 5,
            y: height/2 - 5,
        }
    },
    ports: {
        items: [
            { id: 'input1', group: 'input', args: { x: 0, y: 28 } }, // Верхний вход
            { id: 'input2', group: 'input', args: { x: 0, y: 100 } }, // Верхний вход
            { id: 'output1', group: 'output', args: { x: 100, y: 65.5 } }, // Выход
        ],
    },
});
