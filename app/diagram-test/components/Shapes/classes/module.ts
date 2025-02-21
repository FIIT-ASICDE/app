import { Port } from "@/app/diagram-test/models/Port";

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
