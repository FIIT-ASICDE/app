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


export interface TopModulePort {
    direction: 'input' | 'output' | 'inout';
    name: string;
    width: number;
}

export interface SubModule {
    moduleName: string;
    instanceName: string;
    portConnections: { portName: string; connectedTo: string; width: number }[];
}

export interface ParsedTopModule {
    name: string;
    ports: TopModulePort[];
    subModules: SubModule[];
}
