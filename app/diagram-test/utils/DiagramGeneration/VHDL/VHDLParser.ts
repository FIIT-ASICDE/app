// VHDLParser.ts

import { CharStreams, CommonTokenStream } from 'antlr4ts';
import { ParseTreeWalker } from 'antlr4ts/tree/ParseTreeWalker';
import { ErrorNode } from 'antlr4ts/tree/ErrorNode';
import { vhdlLexer } from "@/app/diagram-test/utils/DiagramGeneration/VHDL/generated/vhdlLexer";
import { vhdlParser } from "@/app/diagram-test/utils/DiagramGeneration/VHDL/generated/vhdlParser";
import { vhdlListener } from "@/app/diagram-test/utils/DiagramGeneration/VHDL/generated/vhdlListener";

export interface VhdlStructField {
    name: string;
    type: string;
}

export interface VhdlStructType {
    name: string;
    fields: VhdlStructField[];
}

export interface VhdlPackage {
    name: string;
    structs: VhdlStructType[];
}

class VHDLListener implements vhdlListener {
    packages: VhdlPackage[] = [];
    currentPackage: VhdlPackage | null = null;

    enterPackage_declaration(ctx: vhdlParser.Package_declarationContext): void {
        const idCtx = ctx.identifier();
        if (idCtx) {
            const packageName = idCtx.text;
            this.currentPackage = {
                name: packageName,
                structs: [],
            };
        }
    }

    exitPackage_declaration(): void {
        if (this.currentPackage) {
            this.packages.push(this.currentPackage);
            this.currentPackage = null;
        }
    }

    visitErrorNode(node: ErrorNode): void {
        console.error(`Error parsing node: ${node.text}`);
    }
}

export function parseVHDLText(vhdlText: string): VhdlPackage[] {
    try {
        const inputStream = CharStreams.fromString(vhdlText);
        const lexer = new vhdlLexer(inputStream);
        const tokenStream = new CommonTokenStream(lexer);
        const parser = new vhdlParser(tokenStream);
        const tree = parser.design_file();

        const listener = new VHDLListener();
        ParseTreeWalker.DEFAULT.walk(listener, tree);

        // допарсим вручну записи (records) у пакеті
        for (const pkg of listener.packages) {
            const packageRegex = new RegExp(
                `package\\s+${pkg.name}\\s+is([\\s\\S]*?)end\\s+package`,
                'i',
            );
            const packageMatch = vhdlText.match(packageRegex);

            if (packageMatch && packageMatch[1]) {
                const body = packageMatch[1];
                const recordRegex = /type\s+(\w+)\s+is\s+record\s+([\s\S]*?)end\s+record\s*;/gi;
                let match;

                while ((match = recordRegex.exec(body)) !== null) {
                    const recordName = match[1];
                    const fieldsBlock = match[2];

                    const fields: VhdlStructField[] = [];

                    const lines = fieldsBlock.split(/;/).map((line) => line.trim()).filter(Boolean);
                    for (const line of lines) {
                        const [namePart, typePart] = line.split(':').map((s) => s.trim());
                        if (namePart && typePart) {
                            fields.push({
                                name: namePart,
                                type: typePart.replace(/\s+/g, ' '), // normalize spacing
                            });
                        }
                    }

                    pkg.structs.push({
                        name: recordName,
                        fields,
                    });
                }
            }
        }

        return listener.packages;
    } catch (error) {
        console.error("Failed to parse VHDL text:", error);
        return [];
    }
}
