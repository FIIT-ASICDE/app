import { Port } from '@/app/diagram-test/components/Shapes/classes/port';

export class Module {
    public name: string;
    public id: string;
    public instance: string;
    public position: {
        x: number,
        y: number
    };
    public inPorts: Port[];
    public outPorts: Port[];
}
