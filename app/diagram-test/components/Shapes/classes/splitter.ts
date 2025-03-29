import { Port } from '@/app/diagram-test/components/Shapes/classes/port';

export class Splitter {
    public name: string;
    public id: string;
    public dataBandwidth: number;
    public position: {
        x: number,
        y: number
    };
    public outPorts: Port[];
}
