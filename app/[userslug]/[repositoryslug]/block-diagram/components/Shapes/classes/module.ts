export class Module {
    public name!: string;
    public id!: string;
    public instance!: string;
    public position!: {
        x: number,
        y: number
    };
    public inPorts!: ModulePort[];
    public outPorts!: ModulePort[];
    public moduleType!: string;
    public existingModule!: string;
    public language!: string;
}

export interface ModulePort {
    name?: string;
    bandwidth?: number;
    startBit?: number;
    endBit?: number;
}
