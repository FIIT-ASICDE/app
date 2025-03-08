export class Ram {
    public name: string;
    public id: string;
    public position: {
        x: number,
        y: number
    };
    public dataBandwidth: number;
    public addressBandwidth: number;
    clkEdge?: 'rising' | 'falling';

}
