import { CharStreams, CommonTokenStream } from 'antlr4ts';
import { vhdlLexer } from '@/app/antlr/VHDL/generated/vhdlLexer';
import { vhdlParser } from '@/app/antlr/VHDL/generated/vhdlParser';
import { PackageRecordVisitor, VhdlPackage } from './PackageRecordVisitor';

export function parseVHDLText(vhdlText: string): VhdlPackage[] {
    try {
        console.log("Starting VHDL parsing...");
        
        // Преобразуем весь текст в верхний регистр для лексера
        const upperCaseVhdlText = vhdlText.toUpperCase();
        
        // Создаем лексер и парсер
        const inputStream = CharStreams.fromString(upperCaseVhdlText);
        const lexer = new vhdlLexer(inputStream);
        const tokenStream = new CommonTokenStream(lexer);
        const parser = new vhdlParser(tokenStream);
        
        // Парсим входной текст
        console.log("Parsing design file...");
        const tree = parser.design_file();
        
        // Создаем и запускаем посетителя
        console.log("Starting visitor...");
        const visitor = new PackageRecordVisitor();
        visitor.visit(tree);
        
        console.log("Parsing complete.");
        return visitor.packages;
    } catch (error) {
        console.error("Error parsing VHDL:", error);
        return [];
    }
}
