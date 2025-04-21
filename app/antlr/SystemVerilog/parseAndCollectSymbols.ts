import { CharStreams, CommonTokenStream } from "antlr4ts";
import { SystemVerilogLexer } from "./generated/SystemVerilogLexer";
import { SystemVerilogParser } from "./generated/SystemVerilogParser";
import { SymbolCollectorVisitor } from "./SymbolCollectorVisitor";
import { symbolTableManager } from "./symbolTable";

export function parseAndCollectSymbols(input: string, uri: string): void {
    try {
        const inputStream = CharStreams.fromString(input);
        const lexer = new SystemVerilogLexer(inputStream);
        const tokenStream = new CommonTokenStream(lexer);
        const parser = new SystemVerilogParser(tokenStream);

        const tree = parser.source_text();

        const visitor = new SymbolCollectorVisitor(uri);
        visitor.visit(tree);

        const symbols = visitor.symbolTable;

        const existingSymbols = symbolTableManager.getFileSymbols(uri);
        
        const mergedSymbols = { ...existingSymbols, ...symbols };

        symbolTableManager.addSymbols(uri, mergedSymbols);

    } catch (error) {
        console.error("[parseAndCollectSymbols] Error parsing SystemVerilog:", error);
        symbolTableManager.removeSymbols(uri);
    }
}
