import { CharStreams, CommonTokenStream } from 'antlr4ts';
import { SystemVerilogLexer } from "@/app/diagram-test/utils/DiagramGeneration/SystemVerilog/generated/SystemVerilogLexer";
import { SystemVerilogParser } from "@/app/diagram-test/utils/DiagramGeneration/SystemVerilog/generated/SystemVerilogParser";
import { SystemVerilogParserListener } from "@/app/diagram-test/utils/DiagramGeneration/SystemVerilog/generated/SystemVerilogParserListener";
import { ParseTreeWalker } from 'antlr4ts/tree/ParseTreeWalker';
import { ErrorNode } from 'antlr4ts/tree/ErrorNode';

export interface StructField {
    name: string;
    type: string;
}

export interface StructType {
    name: string;
    fields: StructField[];
    isPacked: boolean;
}

export interface Package {
    name: string;
    structs: StructType[];
}

class SVListener implements SystemVerilogParserListener {
    packages: Package[] = [];
    currentPackage: Package | null = null;

    enterPackage_declaration(ctx: SystemVerilogParser.Package_declarationContext): void {
        if (ctx.package_identifier) {
            const packageName = ctx.package_identifier().text || 'unnamed';
            this.currentPackage = { name: packageName, structs: [] };
        }
    }

    exitPackage_declaration(ctx: SystemVerilogParser.Package_declarationContext): void {
        if (this.currentPackage) {
            this.packages.push(this.currentPackage);
            this.currentPackage = null;
        }
    }

    visitErrorNode(node: ErrorNode): void {
        console.error(`Error parsing node: ${node.text}`);
    }
}

/**
 *  SystemVerilog packages and struct
 * @param svText
 * @returns packages and struct
 */
export function parseSystemVerilogText(svText: string): Package[] {
    try {

        const inputStream = CharStreams.fromString(svText);
        const lexer = new SystemVerilogLexer(inputStream);

        const tokenStream = new CommonTokenStream(lexer);

        const parser = new SystemVerilogParser(tokenStream);

        const tree = parser.source_text();

        const listener = new SVListener();

        ParseTreeWalker.DEFAULT.walk(listener, tree);

        const packages = listener.packages;

        for (const pkg of packages) {

            const packageRegex = new RegExp(`package\\s+${pkg.name}\\s*;([\\s\\S]*?)endpackage`, 'i');
            const packageMatch = svText.match(packageRegex);

            if (packageMatch && packageMatch[1]) {
                const packageContent = packageMatch[1];

                const typedefStructRegex = /typedef\s+struct\s+(packed\s+)?\{([^}]*)\}\s+(\w+);/g;
                let match;

                while ((match = typedefStructRegex.exec(packageContent)) !== null) {
                    const isPacked = !!match[1];
                    const structContent = match[2];
                    const structName = match[3];

                    const fields: StructField[] = [];
                    const fieldLines = structContent.split(';').filter(line => line.trim().length > 0);

                    for (const line of fieldLines) {
                        const trimmedLine = line.trim();
                        const lastSpace = trimmedLine.lastIndexOf(' ');
                        if (lastSpace > 0) {
                            const fieldType = trimmedLine.substring(0, lastSpace).trim();
                            const fieldName = trimmedLine.substring(lastSpace + 1).trim();

                            fields.push({
                                name: fieldName,
                                type: fieldType
                            });
                        }
                    }

                    pkg.structs.push({
                        name: structName,
                        fields,
                        isPacked
                    });
                }
            }
        }

        return packages;
    } catch (error) {
        console.error(`Error parsing SystemVerilog text:`, error);
        return [];
    }
}
