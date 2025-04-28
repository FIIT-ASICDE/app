import { CharStreams, CommonTokenStream } from "antlr4ts";
import { SystemVerilogLexer } from "./generated/SystemVerilogLexer";
import { SystemVerilogParser } from "./generated/SystemVerilogParser";
import { SymbolCollectorVisitor } from "./SymbolCollectorVisitor";
import { symbolTableManager } from "./symbolTable";

export function parseAndCollectSymbols(input: string, uri: string): void {
    try {
        // Create the lexer and parser
        const inputStream = CharStreams.fromString(input);
        const lexer = new SystemVerilogLexer(inputStream);
        const tokenStream = new CommonTokenStream(lexer);
        const parser = new SystemVerilogParser(tokenStream);

        // Parse the input
        const tree = parser.source_text();

        // Create and run the visitor
        const visitor = new SymbolCollectorVisitor(uri);
        visitor.visit(tree);

        // Get the symbols from the visitor
        const symbols = visitor.symbolTable;

        // Get existing symbols for this file
        const existingSymbols = symbolTableManager.getFileSymbols(uri);
        
        // Merge new symbols with existing ones
        const mergedSymbols = { ...existingSymbols, ...symbols };

        // Update the symbol table using the manager
        symbolTableManager.addSymbols(uri, mergedSymbols);

    } catch (error) {
        console.error("[parseAndCollectSymbols] Error parsing system-verilog:", error);
        // If there's an error, remove any existing symbols for this file
        symbolTableManager.removeSymbols(uri);
    }
}
