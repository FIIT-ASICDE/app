export type SymbolInfo = {
    name: string;
    line: number;
    column: number;
    uri: string;
};

export type SymbolTable = Record<string, SymbolInfo>;

export const symbolIndex: Record<string, Record<string, SymbolInfo>> = {};
