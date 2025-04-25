export class Port {
    public name?: string;
    public id?: string;
    public dataBandwidth?: number;
    startBit?: number;
    endBit?: number;
    public position?: {
        x: number,
        y: number
    };
    public structPackage!: string;
    public structTypeDef!: string;
    public language!: string;
}
