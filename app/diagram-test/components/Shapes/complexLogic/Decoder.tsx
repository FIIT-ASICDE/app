
import { BaseComplexLogic } from '../base/BaseComplexLogic';

let width = 109;
let height = 150;

export const Decoder = BaseComplexLogic.define('custom.Decoder', {
    attrs: {
        image: {
            href: '/images/svg/decoder.svg',
            width: width,
            height: height,
        },
        label: {
            text: 'DECODER',
            fontSize: 14,
            fontFamily: 'Arial',
            fontWeight: 'bold',
            fill: '#333',
            x: width/2,
            y: height + 10,
        }
    },
    ports: {
        items: [
            { id: 'input1', group: 'input', args: { x: 0, y: 25 } }, // Верхний вход
            { id: 'output1', group: 'output', args: { x: 109, y: 75 } }, // Выход
        ],
    },
});
