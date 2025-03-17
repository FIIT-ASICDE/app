export class Port {
    public name: string;
    public id: string;
    public bandwidth?: number;
    startBit?: number;
    endBit?: number;
    public position?: {
        x: number,
        y: number
    };
}
