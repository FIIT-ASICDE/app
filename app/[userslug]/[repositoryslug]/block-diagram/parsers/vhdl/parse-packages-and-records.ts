import { CharStreams, CommonTokenStream } from 'antlr4ts';
import { vhdlLexer } from '@/app/antlr/VHDL/generated/vhdlLexer';
import { vhdlParser } from '@/app/antlr/VHDL/generated/vhdlParser';
import { AbstractParseTreeVisitor } from 'antlr4ts/tree/AbstractParseTreeVisitor';
import { vhdlVisitor } from '@/app/antlr/VHDL/generated/vhdlVisitor';
import * as parser from '@/app/antlr/VHDL/generated/vhdlParser';
import { ParseTree } from 'antlr4ts/tree/ParseTree';
import { QuietErrorListener } from "@/app/[userslug]/[repositoryslug]/block-diagram/parsers/quiet-error-listener";

export interface VhdlStructField {
    name: string;
    type: string;
    startBit: number;
    endBit: number;
    bandwidth: number;
}

export interface VhdlStructType {
    name: string;
    fields: VhdlStructField[];
}

export interface VhdlPackage {
    name: string;
    structs: VhdlStructType[];
}

export class PackageRecordVisitor
    extends AbstractParseTreeVisitor<void>
    implements vhdlVisitor<void> {

    public packages: VhdlPackage[] = [];
    private currentPackage: VhdlPackage | null = null;
    private currentStruct: VhdlStructType | null = null;
    private bitPointer = 0;

    constructor() {
        super();
    }

    protected defaultResult(): void {
        return;
    }

    visitChildren(ctx: ParseTree): void {
        for (let i = 0; i < ctx.childCount; i++) {
            const child = ctx.getChild(i);
            child.accept(this);
        }
    }

    visitDesign_file(ctx: parser.Design_fileContext): void {
        this.visitChildren(ctx);
    }

    visitDesign_unit(ctx: parser.Design_unitContext): void {
        this.visitChildren(ctx);
    }

    visitPackage_declaration(ctx: parser.Package_declarationContext): void {

        const identifier = ctx.identifier();
        if (identifier) {
            const packageName = identifier[0].text;

            this.currentPackage = {
                name: packageName,
                structs: []
            };
            const packageDeclarativePart = ctx.package_declarative_part();
            if (packageDeclarativePart) {
                this.visit(packageDeclarativePart);
            }

            this.packages.push(this.currentPackage);
            this.currentPackage = null;
        }
    }

    visitPackage_declarative_part(ctx: parser.Package_declarative_partContext): void {
        const packageDeclarativeItems = ctx.package_declarative_item();
        if (packageDeclarativeItems) {
            for (const item of packageDeclarativeItems) {
                this.visit(item);
            }
        }
    }

    visitPackage_declarative_item(ctx: parser.Package_declarative_itemContext): void {
        this.visitChildren(ctx);
    }

    visitType_declaration(ctx: parser.Type_declarationContext): void {

        const identifier = ctx.identifier();
        if (identifier && this.currentPackage) {
            const typeName = identifier.text;

            const typeDefinition = ctx.type_definition();
            if (typeDefinition) {
                const compositeTypeDefinition = typeDefinition.composite_type_definition();
                if (compositeTypeDefinition) {
                    const recordTypeDefinition = compositeTypeDefinition.record_type_definition();
                    if (recordTypeDefinition) {

                        this.currentStruct = {
                            name: typeName,
                            fields: []
                        };

                        this.bitPointer = 0;

                        this.processRecordElements(recordTypeDefinition);

                        this.currentPackage.structs.push(this.currentStruct);
                        this.currentStruct = null;
                    }
                }
            }
        }
    }
    private processRecordElements(ctx: parser.Record_type_definitionContext): void {
        if (!this.currentStruct) return;
        const elementDeclarations = ctx.element_declaration();
        if (elementDeclarations) {
            console.log(`Found ${elementDeclarations.length} record elements`);
            for (const element of elementDeclarations) {
                this.processElementDeclaration(element);
            }
        }
    }

    private processElementDeclaration(ctx: parser.Element_declarationContext): void {
        console.log("Processing element declaration:", ctx.text);
        if (!this.currentStruct) return;
        const identifierList = ctx.identifier_list();
        if (identifierList) {
            const identifiers = this.extractIdentifiers(identifierList);

            if (ctx.childCount >= 3) {
                let fieldType = '';
                let subtypeNode = null;

                for (let i = 0; i < ctx.childCount; i++) {
                    const child = ctx.getChild(i);
                    if (child.text === ':' && i + 1 < ctx.childCount) {
                        subtypeNode = ctx.getChild(i + 1);
                        fieldType = subtypeNode.text;
                        break;
                    }
                }

                console.log(`Field type: ${fieldType}`);

                let bandwidth = 1;

                if (subtypeNode) {
                    bandwidth = this.calculateBandwidthFromText(fieldType);
                    console.log(`Calculated bandwidth: ${bandwidth}`);
                }

                for (const fieldName of identifiers) {
                    console.log(`Field name: ${fieldName}`);

                    const startBit = this.bitPointer;
                    const endBit = this.bitPointer + bandwidth - 1;
                    this.bitPointer += bandwidth;

                    this.currentStruct.fields.push({
                        name: fieldName,
                        type: fieldType,
                        startBit,
                        endBit,
                        bandwidth
                    });
                }
            }
        }
    }

    private calculateBandwidthFromText(typeText: string): number {

        if (typeText.includes('STD_LOGIC_VECTOR') || typeText.includes('BIT_VECTOR')) {
            const openParenIndex = typeText.indexOf('(');
            const closeParenIndex = typeText.indexOf(')');

            if (openParenIndex !== -1 && closeParenIndex !== -1) {
                const rangeText = typeText.substring(openParenIndex + 1, closeParenIndex).trim();

                let parts: string[] = [];
                if (rangeText.includes('DOWNTO')) {
                    parts = rangeText.split('DOWNTO').map(part => part.trim());
                } else if (rangeText.includes('TO')) {
                    parts = rangeText.split('TO').map(part => part.trim());
                }

                if (parts.length === 2) {
                    const high = parseInt(parts[0]);
                    const low = parseInt(parts[1]);

                    if (!isNaN(high) && !isNaN(low)) {
                        return Math.abs(high - low) + 1;
                    }
                }
            }
        }
        if (typeText.includes('ARRAY')) {
            const openParenIndex = typeText.indexOf('(');
            const closeParenIndex = typeText.indexOf(')');

            if (openParenIndex !== -1 && closeParenIndex !== -1) {
                const rangeText = typeText.substring(openParenIndex + 1, closeParenIndex).trim();

                let parts: string[] = [];
                if (rangeText.includes('TO')) {
                    parts = rangeText.split('TO').map(part => part.trim());

                    if (parts.length === 2) {
                        const low = parseInt(parts[0]);
                        const high = parseInt(parts[1]);

                        if (!isNaN(low) && !isNaN(high)) {
                            return high - low + 1;
                        }
                    }
                }
            }
        }
        return 1;
    }

    private extractIdentifiers(ctx: parser.Identifier_listContext): string[] {
        const identifiers: string[] = [];

        const identifierContexts = ctx.identifier();
        if (identifierContexts) {
            for (const identifierContext of identifierContexts) {
                identifiers.push(identifierContext.text);
            }
        }

        return identifiers;
    }
}



export function parsePackagesAndRecords(vhdlText: string): VhdlPackage[] {
    try {
        const upperCaseVhdlText = vhdlText.toUpperCase();
        const inputStream = CharStreams.fromString(upperCaseVhdlText);
        const lexer = new vhdlLexer(inputStream);
        const tokenStream = new CommonTokenStream(lexer);
        const parser = new vhdlParser(tokenStream);
        parser.removeErrorListeners();
        parser.addErrorListener(new QuietErrorListener());
        const tree = parser.design_file();
        const visitor = new PackageRecordVisitor();
        visitor.visit(tree);
        return visitor.packages;
    } catch (error) {
        console.error("Error parsing vhdl:", error);
        return [];
    }
}
