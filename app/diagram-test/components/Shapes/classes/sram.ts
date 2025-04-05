export class Sram {
    public name: string;
    public id: string;
    public position: {
        x: number,
        y: number
    };
    public dataBandwidth: number;
    public addressBandwidth: number;
    clkEdge?: 'rising' | 'falling';
    public structPackage: string;
    public structTypeDef: string;

}
