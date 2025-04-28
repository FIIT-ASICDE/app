export class Splitter {
    public name!: string;
    public id!: string;
    public dataBandwidth!: number;
    public position!: {
        x: number,
        y: number
    };
    public outPorts!: ModulePort[];
    public bitPortType!: string;
    public structPackage!: string;
    public structTypeDef!: string;
    public language!: string;
}

export interface ModulePort {
    name?: string;
    bandwidth?: number;
    startBit?: number;
    endBit?: number;
}
