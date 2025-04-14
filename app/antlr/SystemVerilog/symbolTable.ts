export type SymbolInfo = {
    name: string;
    line: number;
    column: number;
    uri: string;
    type:
      | 'module'
      | 'interface'
      | 'class'
      | 'program'
      | 'package'
      | 'function'
      | 'task'
      | 'typedef';
  };
  

export type SymbolTable = Record<string, SymbolInfo>;

let globalSymbolTable: SymbolTable = {};
let fileSymbolTables: Record<string, SymbolTable> = {};
let lastUpdateTime: Record<string, number> = {};
let isInitialized = false;

declare global {
    interface Window {
        monaco: typeof import('monaco-editor');
    }
}

export const symbolTableManager = {
    initialize() {
        if (!isInitialized) {
            globalSymbolTable = {};
            fileSymbolTables = {};
            lastUpdateTime = {};
            isInitialized = true;
        }
    },

    initializeWithData(data: {
        globalSymbols: Record<string, SymbolInfo>;
        fileSymbols: {
            isInitialized: boolean;
            totalSymbols: number;
            files: number;
            symbols: Array<{
                name: string;
                type: string;
                uri: string;
                line: number;
                column: number;
            }>;
        };
    }) {
        if (!data || !data.globalSymbols || !data.fileSymbols) {
            return;
        }

        globalSymbolTable = data.globalSymbols;
        
        fileSymbolTables = {};
        Object.values(globalSymbolTable).forEach(symbol => {
            if (!fileSymbolTables[symbol.uri]) {
                fileSymbolTables[symbol.uri] = {};
            }
            fileSymbolTables[symbol.uri][symbol.name] = symbol;
        });

        if (typeof window !== 'undefined' && window.monaco) {
            const uniqueUris = new Set(Object.values(globalSymbolTable).map(s => s.uri));
            uniqueUris.forEach(uri => {
                const model = window.monaco.editor.getModel(window.monaco.Uri.parse(uri));
                if (!model) {
                    window.monaco.editor.createModel("", "systemverilog", window.monaco.Uri.parse(uri));
                }
            });
        }

        isInitialized = true;
    },

    addSymbols(uri: string, symbols: SymbolTable): void {
        if (!isInitialized) {
            this.initialize();
        }
        
        const now = Date.now();
        const lastUpdate = lastUpdateTime[uri] || 0;
        
        if (now - lastUpdate > 1000) {
            const existingSymbols = fileSymbolTables[uri] || {};
            
            const mergedSymbols = { ...existingSymbols, ...symbols };
            
            fileSymbolTables[uri] = mergedSymbols;
            
            Object.entries(symbols).forEach(([name, info]) => {
                globalSymbolTable[name] = info;
            });

            lastUpdateTime[uri] = now;
        }
    },

    removeSymbols(uri: string): void {
        if (!isInitialized) {
            this.initialize();
        }
        
        const now = Date.now();
        const lastUpdate = lastUpdateTime[uri] || 0;
        
        if (now - lastUpdate > 1000) {
            const fileSymbols = fileSymbolTables[uri];
            if (fileSymbols) {
                delete fileSymbolTables[uri];
                
                Object.keys(fileSymbols).forEach(name => {
                    if (globalSymbolTable[name]?.uri === uri) {
                        delete globalSymbolTable[name];
                    }
                });
            }

            lastUpdateTime[uri] = now;
        }
    },

    getAllSymbols(): SymbolTable {
        if (!isInitialized) {
            this.initialize();
        }
        return globalSymbolTable;
    },

    getFileSymbols(uri: string): SymbolTable {
        if (!isInitialized) {
            this.initialize();
        }
        return fileSymbolTables[uri] || {};
    },

    findSymbols(name: string): SymbolInfo[] {
        if (!isInitialized) {
            this.initialize();
        }
        const lowerName = name.toLowerCase();
        return Object.values(globalSymbolTable).filter(
            symbol => symbol.name.toLowerCase().includes(lowerName)
        );
    },

    debug(): {
        isInitialized: boolean;
        totalSymbols: number;
        files: number;
        symbols: Array<{
            name: string;
            type: string;
            uri: string;
            line: number;
            column: number;
        }>;
    } {
        const symbols = Object.values(globalSymbolTable).map(symbol => ({
            name: symbol.name,
            type: symbol.type,
            uri: symbol.uri,
            line: symbol.line,
            column: symbol.column
        }));

        console.log('[SymbolTable] Current State:', {
            isInitialized,
            totalSymbols: Object.keys(globalSymbolTable).length,
            files: Object.keys(fileSymbolTables).length,
            symbols
        });

        return {
            isInitialized,
            totalSymbols: Object.keys(globalSymbolTable).length,
            files: Object.keys(fileSymbolTables).length,
            symbols
        };
    }
};

// Initialize the symbol table when the module is loaded
symbolTableManager.initialize();
