// src/components/Shapes/Multiplexer.tsx
import { BaseComplexLogic } from '../base/BaseComplexLogic';

export class Multiplexer extends BaseComplexLogic {
    static createWithPorts(portCount: number, x: number, y: number): Multiplexer {
        let height, width;
        if (portCount === 2) {
            height = 135;
            width = 100;
        } else if (portCount === 4) {
            height = 162;
            width = 120;
        } else {
            height = 189;
            width = 140;
        }

        let ports = [
            { id: 'select', group: 'input', args: { x: width/2, y: 0 } },
            { id: 'output', group: 'output', args: { x: width, y: height/2 } },
        ];

        for (let i = 0; i < portCount; i++) {
            if (portCount == 2){
                ports.push({
                    id: `input${i + 1}`,
                    group: 'input',
                    args: { x: 0, y: ((height / (portCount + 1)) * (i + 1)) - 1 }
                });
            }
            else {
                ports.push({
                    id: `input${i + 1}`,
                    group: 'input',
                    args: { x: 0, y: ((height / (portCount + 1)) * (i + 1)) }
                });
            }

        }
        if (portCount === 2) {
            return new this({
                attrs: {
                    image: {
                        href: '/images/svg/multiplexer_2_ports.svg',
                        width: width,
                        height: height,
                    },
                },
                ports: {
                    items: ports,
                },
                position: { x, y },
            });
        }
        if (portCount === 4) {
            return new this({
                attrs: {
                    image: {
                        href: '/images/svg/multiplexer_4_ports.svg',
                        width: width,
                        height: height,
                    },
                },
                ports: {
                    items: ports,
                },
                position: { x, y },
            });
        }
        else {
            return new this({
                attrs: {
                    image: {
                        href: '/images/svg/multiplexer_8_ports.svg',
                        width: width,
                        height: height,
                    },
                },
                ports: {
                    items: ports,
                },
                position: { x, y },
            });
        }
    }
}
