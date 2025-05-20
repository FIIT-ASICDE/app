import { CharStreams, CommonTokenStream } from "antlr4ts";
import { SystemVerilogLexer } from "../../grammar/generated/SystemVerilogLexer";
import { SystemVerilogParser } from "../../grammar/generated/SystemVerilogParser";
import { SymbolCollectorVisitor } from "./SymbolCollectorVisitor";
import { SymbolTable, symbolTableManager } from "./symbolTable";

export function parseAndCollectSymbols(input: string, uri: string): void {
    try {
        const inputStream = CharStreams.fromString(input);
        const lexer = new SystemVerilogLexer(inputStream);
        const tokenStream = new CommonTokenStream(lexer);
        const parser = new SystemVerilogParser(tokenStream);
        
        parser.removeErrorListeners();
        parser.addErrorListener({
            syntaxError: () => {
                // Silently ignore
        }
        });
        const tree = parser.source_text();

        const visitor = new SymbolCollectorVisitor(uri);
        visitor.visit(tree);
        
        const symbolList = visitor.getSymbols();

        const scopeRanges = visitor.getScopeRanges();

        symbolTableManager.storeScopeMap(uri, scopeRanges);

        const flatSymbolTable: SymbolTable = {};
        for (const symbol of symbolList) {
          const key = `${symbol.name}::${symbol.scope}`;
          flatSymbolTable[key] = symbol;
        }
        
        symbolTableManager.addSymbols(uri, flatSymbolTable);
        //symbolTableManager.debug();

    } catch (error) {
        console.error("[parseAndCollectSymbols] Error parsing SystemVerilog:", error);
        symbolTableManager.removeSymbols(uri);
    }
}
