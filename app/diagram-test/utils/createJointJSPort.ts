// src/utils/createJointJSPort.ts

import { Port } from '../models/Port';
import { shapes } from "@joint/core";

export const createJointJSPort = (port: Port) => {
    let bandwidth: number | null = null;
    let struct: string | undefined = undefined;
    let portLabel: string = '   ';
    let position: 'left' | 'right' | 'top' | 'bottom' = 'right';

    // Логика определения bandwidth и struct
    if (port.bit) {
        bandwidth = 1;
    } else if (port.struct) {
        struct = port.struct;
        bandwidth = null;
    } else {
        bandwidth = port.bandwidth ?? null;
    }

    // Логика определения позиции и метки порта
    if (port.direction === 'in') {
        portLabel = '   ';
        position = 'left';
    } else if (port.direction === 'out') {
        portLabel = '   ';
        position = 'right';
    }

    // Создание объекта порта для JointJS
    const portEl = {
        id: port.id,
        name: port.name,
        bandwidth,
        struct,
        standalone: port.standalone,
        group: port.direction,
        args: {},
        label: {
            position: {
                name: position,
            },
        },
        attrs: port.standalone
            ? { text: { text: portLabel, fill: 'black' } }
            : { text: { text: port.name, fill: 'black', x: 0, y: 0 } },
    };

    return portEl;
};
