export class Port {
    public name: string;
    public id: string;
    public bandwidth?: number;
    public direction: string;
    public position: {
        x: number,
        y: number
    };
}