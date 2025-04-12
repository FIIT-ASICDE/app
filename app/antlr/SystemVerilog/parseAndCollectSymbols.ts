import { ANTLRInputStream, CommonTokenStream } from "antlr4ts";
import { SystemVerilogLexer } from "./generated/SystemVerilogLexer";
import { SystemVerilogParser } from "./generated/SystemVerilogParser";
import { SymbolCollectorVisitor } from "./SymbolCollectorVisitor";
import { symbolIndex } from "./symbolTable";

export function parseAndCollectSymbols(code: string, uri: string) {
    try {
        const inputStream = new ANTLRInputStream(code);
        const lexer = new SystemVerilogLexer(inputStream);
        const tokenStream = new CommonTokenStream(lexer);
        const parser = new SystemVerilogParser(tokenStream);

        const tree = parser.source_text();
        const visitor = new SymbolCollectorVisitor(uri);
        visitor.visit(tree);
        console.log("[parseAndCollectSymbols] visitor.symbolTable");
        console.log(visitor.symbolTable);
        symbolIndex[uri] = visitor.symbolTable;

    } catch (err) {
        console.error("Error parsing SystemVerilog:", err);
    }
}
  
