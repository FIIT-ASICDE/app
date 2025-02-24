export class Register {
    public name: string;
    public id: string;
    public position: {
        x: number,
        y: number
    };
    public dataBandwidth: number;
    public enablePort: boolean;
    public resetPort: boolean | undefined;

}
