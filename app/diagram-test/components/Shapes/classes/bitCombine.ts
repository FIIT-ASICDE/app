import { Port } from '@/app/diagram-test/models/Port';

export class BitCombine {
    public name: string;
    public id: string;
    public dataBandwidth: number;
    public position: {
        x: number,
        y: number
    };
    public inPorts: Port[];
}
