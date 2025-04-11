export interface ModulePort {
    name: string;
    direction: 'input' | 'output' | 'inout' | 'in' | 'out';
    type?: string;
    width?: number;
}

export interface ParsedModule {
    name: string;
    ports: ModulePort[];
}

export interface UnifiedStructField {
    name: string;
    type: string;
    startBit: number;
    endBit: number;
    bandwidth: number;
}

export interface UnifiedStructType {
    name: string;
    fields: UnifiedStructField[];
    isPacked?: boolean;
}

export interface UnifiedPackage {
    name: string;
    structs: UnifiedStructType[];
}
