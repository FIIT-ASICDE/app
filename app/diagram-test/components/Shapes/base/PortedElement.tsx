// src/components/Shapes/base/PortedElement.tsx
import { BaseElement } from './BaseElement';

export const PortedElement = BaseElement.define('custom.PortedElement', {
    ports: {
        groups: {
            input: {
                position: { name: 'absolute' },
                attrs: {
                    circle: { r: 5, magnet: 'passive', fill: '#fff', stroke: '#000' }
                }
            },
            output: {
                position: { name: 'absolute' },
                attrs: {
                    circle: { r: 5, magnet: true, fill: '#e3d12d', stroke: '#000' }
                }
            }
        }
    }
});

