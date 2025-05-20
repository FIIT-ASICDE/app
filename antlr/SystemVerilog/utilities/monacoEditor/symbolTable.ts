
export interface BaseSymbolInfo {
    name: string;
    line: number;
    column: number;
    uri: string;
    scope: string;
  }
  
  export interface PortInfo {
    name: string;
    direction: string;
    datatype: string;
  }
  
  export interface ModuleSymbolInfo extends BaseSymbolInfo {
    type: "module";
    ports: PortInfo[];
  }
  
  export interface InterfaceSymbolInfo extends BaseSymbolInfo {
    type: "interface";
    ports: PortInfo[];
  }
  
  export interface ProgramSymbolInfo extends BaseSymbolInfo {
    type: "program";
    ports: PortInfo[];
  }
  
  export interface ClassSymbolInfo extends BaseSymbolInfo {
    type: "class";
  }
  
  export interface PackageSymbolInfo extends BaseSymbolInfo {
    type: "package";
  }
  
  export interface FunctionSymbolInfo extends BaseSymbolInfo {
    type: "function";
  }
  
  export interface TaskSymbolInfo extends BaseSymbolInfo {
    type: "task";
  }
  
  export interface TypedefSymbolInfo extends BaseSymbolInfo {
    type: "typedef";
  }
  export interface VariableSymbolInfo extends BaseSymbolInfo {
    type: "variable";
  }
  
  export type SymbolInfo =
    | ModuleSymbolInfo
    | InterfaceSymbolInfo
    | ClassSymbolInfo
    | ProgramSymbolInfo
    | PackageSymbolInfo
    | FunctionSymbolInfo
    | TaskSymbolInfo
    | TypedefSymbolInfo
    | VariableSymbolInfo;
  
  export type SymbolTable = Record<string, SymbolInfo>;
  const scopeMap: Record<string, { name: string; startLine: number; endLine: number }[]> = {};
  
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

    getSymbolByKey(key: string): SymbolInfo | undefined {
      return globalSymbolTable[key];
    },

    storeScopeMap(uri: string, scopes: { name: string; startLine: number; endLine: number }[]) {
      scopeMap[uri] = scopes;
    },
    
    getScopeForLine(uri: string, line: number): string | null {
      const scopes = scopeMap[uri];
      if (!scopes) return null;
    
      const match = scopes.find(s => line >= s.startLine && line <= s.endLine);
      return match?.name ?? null;
    },
  
    initializeWithData(data: {
        globalSymbols: Record<string, SymbolInfo>;
        fileSymbols: {
          isInitialized: boolean;
          totalSymbols: number;
          files: number;
          symbols: Array<SymbolInfo>;
        };
      }) {
        if (!data || !data.globalSymbols || !data.fileSymbols) {
          return;
        }
      
        globalSymbolTable = data.globalSymbols;
      
        fileSymbolTables = {};
        for (const symbol of data.fileSymbols.symbols) {
          if (!fileSymbolTables[symbol.uri]) {
            fileSymbolTables[symbol.uri] = {};
          }
          fileSymbolTables[symbol.uri][symbol.name] = symbol;
        }
      
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
  
        Object.entries(symbols).forEach(([key, info]) => {
          globalSymbolTable[key] = info;
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
      symbols: SymbolInfo[];
    } {
      const symbols = Object.values(globalSymbolTable);
    
      console.log('[SymbolTable] Current State:', {
        isInitialized,
        totalSymbols: symbols.length,
        files: Object.keys(fileSymbolTables).length,
        symbols
      });
    
      return {
        isInitialized,
        totalSymbols: symbols.length,
        files: Object.keys(fileSymbolTables).length,
        symbols
      };
    }
    
  };
  
  symbolTableManager.initialize();
  