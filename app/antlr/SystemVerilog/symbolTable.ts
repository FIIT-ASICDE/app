export type SymbolInfo = {
    name: string;
    line: number;
    column: number;
    uri: string;
    type: 'module' | 'interface' | 'class' | 'program' | 'package';
};

export type SymbolTable = Record<string, SymbolInfo>;

// Initialize all tables with empty objects
let globalSymbolTable: SymbolTable = {};
let fileSymbolTables: Record<string, SymbolTable> = {};
let lastUpdateTime: Record<string, number> = {};
let isInitialized = false;

// Methods to manage the symbol tables
export const symbolTableManager = {
    // Initialize the symbol table (only if not already initialized)
    initialize() {
        if (!isInitialized) {
            globalSymbolTable = {};
            fileSymbolTables = {};
            lastUpdateTime = {};
            isInitialized = true;
            console.log("[SymbolTable] Initialized", symbolTableManager.debug());
        }
    },

    // Initialize with existing data
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
            console.warn("[SymbolTable] Invalid data provided for initialization");
            return;
        }

        globalSymbolTable = data.globalSymbols;
        
        // Reconstruct fileSymbolTables from the global symbols
        fileSymbolTables = {};
        Object.values(globalSymbolTable).forEach(symbol => {
            if (!fileSymbolTables[symbol.uri]) {
                fileSymbolTables[symbol.uri] = {};
            }
            fileSymbolTables[symbol.uri][symbol.name] = symbol;
        });

        isInitialized = true;
        console.log("[SymbolTable] Initialized with data", symbolTableManager.debug());
    },

    // Add symbols from a file to both global and file-specific tables
    addSymbols(uri: string, symbols: SymbolTable): void {
        if (!isInitialized) {
            this.initialize();
        }
        
        const now = Date.now();
        const lastUpdate = lastUpdateTime[uri] || 0;
        
        // Only update if it's been more than 1 second since last update
        if (now - lastUpdate > 1000) {
            // Get existing symbols for this file
            const existingSymbols = fileSymbolTables[uri] || {};
            
            // Merge new symbols with existing ones
            const mergedSymbols = { ...existingSymbols, ...symbols };
            
            // Update file-specific table
            fileSymbolTables[uri] = mergedSymbols;
            
            // Update global table - only add new symbols, don't remove existing ones
            Object.entries(symbols).forEach(([name, info]) => {
                globalSymbolTable[name] = info;
            });

            // Only log if we actually added symbols
            if (Object.keys(symbols).length > 0) {
                console.log(`[SymbolTable] Updated ${uri} with ${Object.keys(symbols).length} symbols`);
                // Debug: Show current state
                this.debug();
            }

            lastUpdateTime[uri] = now;
        }
    },

    // Remove symbols for a specific file
    removeSymbols(uri: string): void {
        if (!isInitialized) {
            this.initialize();
        }
        
        const now = Date.now();
        const lastUpdate = lastUpdateTime[uri] || 0;
        
        // Only remove if it's been more than 1 second since last update
        if (now - lastUpdate > 1000) {
            // Remove from file-specific table
            const fileSymbols = fileSymbolTables[uri];
            if (fileSymbols) {
                delete fileSymbolTables[uri];
                
                // Remove from global table
                Object.keys(fileSymbols).forEach(name => {
                    if (globalSymbolTable[name]?.uri === uri) {
                        delete globalSymbolTable[name];
                    }
                });

                console.log(`[SymbolTable] Removed ${Object.keys(fileSymbols).length} symbols for ${uri}`);
                // Debug: Show current state
                this.debug();
            }

            lastUpdateTime[uri] = now;
        }
    },

    // Get all symbols
    getAllSymbols(): SymbolTable {
        if (!isInitialized) {
            this.initialize();
        }
        return globalSymbolTable;
    },

    // Get symbols for a specific file
    getFileSymbols(uri: string): SymbolTable {
        if (!isInitialized) {
            this.initialize();
        }
        return fileSymbolTables[uri] || {};
    },

    // Find symbols by name (case-insensitive)
    findSymbols(name: string): SymbolInfo[] {
        if (!isInitialized) {
            this.initialize();
        }
        const lowerName = name.toLowerCase();
        return Object.values(globalSymbolTable).filter(
            symbol => symbol.name.toLowerCase().includes(lowerName)
        );
    },

    // Debug method to show current state
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
