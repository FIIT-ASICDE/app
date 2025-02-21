// src/models/Port.ts

export interface Port {
    parentElementId?: string;
    parentElementPosition?: {
        x: number;
        y: number;
    };
    id?: string;
    name: string;
    bandwidth?: number;
    direction?: 'in' | 'out';
    standalone?: boolean;
    bit?: boolean;
    struct?: string;
}
