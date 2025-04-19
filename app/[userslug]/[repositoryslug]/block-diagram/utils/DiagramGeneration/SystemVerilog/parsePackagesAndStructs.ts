import { CharStreams, CommonTokenStream } from 'antlr4ts';
import { SystemVerilogLexer } from '@/app/antlr/SystemVerilog/generated/SystemVerilogLexer';
import { SystemVerilogParser } from '@/app/antlr/SystemVerilog/generated/SystemVerilogParser';
import { PackageStructVisitor, Package } from './PackageStructVisitor';

export function parseSystemVerilogText(svText: string): Package[] {
    try {
        console.log("Starting SystemVerilog parsing...");
        
        // Создаем лексер и парсер
        const inputStream = CharStreams.fromString(svText);
        const lexer = new SystemVerilogLexer(inputStream);
        const tokenStream = new CommonTokenStream(lexer);
        const parser = new SystemVerilogParser(tokenStream);
        
        // Парсим входной текст
        console.log("Parsing source text...");
        const tree = parser.source_text();
        
        // Создаем и запускаем посетителя
        console.log("Starting visitor...");
        const visitor = new PackageStructVisitor();
        visitor.visit(tree);
        
        console.log("Parsing complete.");
        // Возвращаем собранные пакеты
        return visitor.packages;
    } catch (error) {
        console.error('Error parsing SystemVerilog:', error);
        return [];
    }
}
