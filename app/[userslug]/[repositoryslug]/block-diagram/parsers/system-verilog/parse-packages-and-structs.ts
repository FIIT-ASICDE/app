import { CharStreams, CommonTokenStream } from 'antlr4ts';
import { SystemVerilogLexer } from '@/app/antlr/SystemVerilog/generated/SystemVerilogLexer';
import { SystemVerilogParser } from '@/app/antlr/SystemVerilog/generated/SystemVerilogParser';
import { AbstractParseTreeVisitor } from 'antlr4ts/tree/AbstractParseTreeVisitor';
import { SystemVerilogParserVisitor } from '@/app/antlr/SystemVerilog/generated/SystemVerilogParserVisitor';
import * as parser from '@/app/antlr/SystemVerilog/generated/SystemVerilogParser';
import { ParseTree } from 'antlr4ts/tree/ParseTree';
import { QuietErrorListener } from "@/app/[userslug]/[repositoryslug]/block-diagram/parsers/quiet-error-listener";

export interface StructField {
    name: string;
    type: string;
    startBit: number;
    endBit: number;
    bandwidth: number;
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

export class PackageStructVisitor
    extends AbstractParseTreeVisitor<void>
    implements SystemVerilogParserVisitor<void> {

    public packages: Package[] = [];
    private currentPackage: Package | null = null;
    private currentStruct: StructType | null = null;
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

    visitSource_text(ctx: parser.Source_textContext): void {
        this.visitChildren(ctx);
    }

    visitDescription(ctx: parser.DescriptionContext): void {
        this.visitChildren(ctx);
    }

    visitPackage_declaration(ctx: parser.Package_declarationContext): void {

        const packageIdentifier = ctx.package_identifier();
        if (packageIdentifier) {
            const packageName = packageIdentifier.text;

            this.currentPackage = {
                name: packageName,
                structs: []
            };

            this.visitChildren(ctx);

            this.packages.push(this.currentPackage);
            this.currentPackage = null;
        }
    }

    visitPkg_decl_item(ctx: parser.Pkg_decl_itemContext): void {
        this.visitChildren(ctx);
    }

    visitPackage_item(ctx: parser.Package_itemContext): void {
        this.visitChildren(ctx);
    }

    visitPackage_or_generate_item_declaration(ctx: parser.Package_item_declarationContext): void {
        this.visitChildren(ctx);
    }

    visitData_declaration(ctx: parser.Data_declarationContext): void {
        this.visitChildren(ctx);
    }

    visitType_declaration(ctx: parser.Type_declarationContext): void {

        let hasTypedef = false;
        for (let i = 0; i < ctx.childCount; i++) {
            const child = ctx.getChild(i);
            if (child.text === 'typedef') {
                hasTypedef = true;
                break;
            }
        }

        if (hasTypedef) {


            const dataType = ctx.data_type();
            if (dataType) {

                const structUnion = this.findStructUnion(dataType);
                if (structUnion && structUnion.text.includes('struct')) {
                    const typeIdentifiers = ctx.type_identifier();
                    if (typeIdentifiers && typeIdentifiers.length > 0 && this.currentPackage) {
                        const structName = typeIdentifiers[0].text;

                        const isPacked = this.isStructPacked(dataType);

                        this.currentStruct = {
                            name: structName,
                            fields: [],
                            isPacked
                        };

                        this.bitPointer = 0;

                        this.processStructFields(dataType);

                        this.currentPackage.structs.push(this.currentStruct);
                        this.currentStruct = null;
                    }
                }
            }
        }
    }

    private findStructUnion(ctx: parser.Data_typeContext): any {
        for (let i = 0; i < ctx.childCount; i++) {
            const child = ctx.getChild(i);
            if (child.text === 'struct' || child.text === 'union') {
                return child;
            }
        }
        return null;
    }

    private isStructPacked(ctx: parser.Data_typeContext): boolean {
        for (let i = 0; i < ctx.childCount; i++) {
            const child = ctx.getChild(i);
            if (child.text === 'packed') {
                return true;
            }
        }
        return false;
    }

    private processStructFields(ctx: parser.Data_typeContext): void {
        if (!this.currentStruct) return;

        for (let i = 0; i < ctx.childCount; i++) {
            const child = ctx.getChild(i);
            if (child.constructor.name.includes('Struct_union_memberContext')) {
                this.processStructMember(child);
            }
        }
    }

    private processStructMember(ctx: any): void {
        console.log("Processing struct member");
        if (!this.currentStruct) return;

        let fieldType = '';
        let bandwidth = 1;
        let high: number | undefined;
        let low: number | undefined;

        const dataTypeOrVoid = ctx.data_type_or_void ? ctx.data_type_or_void() : null;
        if (dataTypeOrVoid) {
            fieldType = dataTypeOrVoid.text;

            const dataType = dataTypeOrVoid.data_type ? dataTypeOrVoid.data_type() : null;
            if (dataType) {
                const packedDimension = dataType.packed_dimension ? dataType.packed_dimension() : null;
                if (packedDimension && packedDimension.length > 0) {
                    const range = packedDimension[0].constant_range ? packedDimension[0].constant_range() : null;
                    if (range) {
                        const constantExpressions = range.constant_expression ? range.constant_expression() : null;
                        if (constantExpressions && constantExpressions.length >= 2) {
                            try {
                                high = parseInt(constantExpressions[0].text, 10);
                                low = parseInt(constantExpressions[1].text, 10);
                                bandwidth = Math.abs(high - low) + 1;
                                console.log(`Field range: [${high}:${low}], bandwidth: ${bandwidth}`);
                            } catch (e) {
                                bandwidth = 1;
                            }
                        }
                    }
                }
            }
        } else {
            fieldType = 'logic';
        }

        const listOfVariableDecl = ctx.list_of_variable_decl_assignments ? ctx.list_of_variable_decl_assignments() : null;
        if (listOfVariableDecl) {
            const variableDecl = listOfVariableDecl.variable_decl_assignment ? listOfVariableDecl.variable_decl_assignment() : null;
            if (variableDecl && variableDecl.length > 0) {
                for (const decl of variableDecl) {
                    const variableIdentifier = decl.variable_identifier ? decl.variable_identifier() : null;
                    if (variableIdentifier) {
                        const fieldName = variableIdentifier.text;
                        console.log(`Field name: ${fieldName}, type: ${fieldType}`);

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
    }
}


export function parsePackagesAndStructs(svText: string): Package[] {
    try {
        const inputStream = CharStreams.fromString(svText);
        const lexer = new SystemVerilogLexer(inputStream);
        const tokenStream = new CommonTokenStream(lexer);
        const parser = new SystemVerilogParser(tokenStream);
        parser.removeErrorListeners();
        parser.addErrorListener(new QuietErrorListener());
        const tree = parser.source_text();
        const visitor = new PackageStructVisitor();
        visitor.visit(tree);
        return visitor.packages;
    } catch (error) {
        console.error('Error parsing system-verilog:', error);
        return [];
    }
}
