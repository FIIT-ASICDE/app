import { Port } from '@/app/diagram-test/models/Port';

export class BitSelect {
    public name: string;
    public id: string;
    public dataBandwidth: number;
    public position: {
        x: number,
        y: number
    };
    public outPorts: Port[];
}
