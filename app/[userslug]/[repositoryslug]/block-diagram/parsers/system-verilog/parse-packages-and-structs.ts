// Parser for extracting package and struct definitions from SystemVerilog source code
// Uses ANTLR4-generated lexer and parser for SystemVerilog grammar
import { CharStreams, CommonTokenStream } from 'antlr4ts';
import { SystemVerilogLexer } from '@/app/antlr/SystemVerilog/generated/SystemVerilogLexer';
import { SystemVerilogParser } from '@/app/antlr/SystemVerilog/generated/SystemVerilogParser';
import { AbstractParseTreeVisitor } from 'antlr4ts/tree/AbstractParseTreeVisitor';
import { SystemVerilogParserVisitor } from '@/app/antlr/SystemVerilog/generated/SystemVerilogParserVisitor';
import * as parser from '@/app/antlr/SystemVerilog/generated/SystemVerilogParser';
import { ParseTree } from 'antlr4ts/tree/ParseTree';
import { QuietErrorListener } from "@/app/[userslug]/[repositoryslug]/block-diagram/parsers/quiet-error-listener";

// Interface representing a field within a struct
export interface StructField {
    name: string;       // Field identifier
    type: string;       // Data type of the field
    startBit: number;   // Starting bit position in the packed struct
    endBit: number;     // Ending bit position in the packed struct
    bandwidth: number;  // Bit width of the field
}

// Interface representing a struct type definition
export interface StructType {
    name: string;           // Struct type identifier
    fields: StructField[];  // List of fields in the struct
    isPacked: boolean;      // Whether the struct is packed (affects memory layout)
}

// Interface representing a SystemVerilog package
export interface Package {
    name: string;           // Package identifier
    structs: StructType[];  // List of struct types defined in the package
}

// Visitor class for traversing the SystemVerilog parse tree and extracting package and struct information
export class PackageStructVisitor
    extends AbstractParseTreeVisitor<void>
    implements SystemVerilogParserVisitor<void> {

    public packages: Package[] = [];  // Collection of parsed packages
    private currentPackage: Package | null = null;  // Currently processed package
    private currentStruct: StructType | null = null;  // Currently processed struct
    private bitPointer = 0;  // Tracks current bit position for packed struct fields

    constructor() {
        super();
    }

    // Required by AbstractParseTreeVisitor
    protected defaultResult(): void {
        return;
    }

    // Generic tree traversal method
    visitChildren(ctx: ParseTree): void {
        for (let i = 0; i < ctx.childCount; i++) {
            const child = ctx.getChild(i);
            child.accept(this);
        }
    }

    // Visit the root of the SystemVerilog source
    visitSource_text(ctx: parser.Source_textContext): void {
        this.visitChildren(ctx);
    }

    // Visit module descriptions
    visitDescription(ctx: parser.DescriptionContext): void {
        this.visitChildren(ctx);
    }

    // Process package declarations and extract package information
    visitPackage_declaration(ctx: parser.Package_declarationContext): void {
        const packageIdentifier = ctx.package_identifier();
        if (packageIdentifier) {
            const packageName = packageIdentifier.text;

            // Initialize new package structure
            this.currentPackage = {
                name: packageName,
                structs: []
            };

            this.visitChildren(ctx);

            // Store completed package and reset current package
            this.packages.push(this.currentPackage);
            this.currentPackage = null;
        }
    }

    // Visit package declaration items
    visitPkg_decl_item(ctx: parser.Pkg_decl_itemContext): void {
        this.visitChildren(ctx);
    }

    // Visit package items
    visitPackage_item(ctx: parser.Package_itemContext): void {
        this.visitChildren(ctx);
    }

    // Visit package or generate item declarations
    visitPackage_or_generate_item_declaration(ctx: parser.Package_item_declarationContext): void {
        this.visitChildren(ctx);
    }

    // Visit data declarations
    visitData_declaration(ctx: parser.Data_declarationContext): void {
        this.visitChildren(ctx);
    }

    // Process type declarations and extract struct information
    visitType_declaration(ctx: parser.Type_declarationContext): void {
        // Check if this is a typedef declaration
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
                // Check if this is a struct definition
                const structUnion = this.findStructUnion(dataType);
                if (structUnion && structUnion.text.includes('struct')) {
                    const typeIdentifiers = ctx.type_identifier();
                    if (typeIdentifiers && typeIdentifiers.length > 0 && this.currentPackage) {
                        const structName = typeIdentifiers[0].text;

                        // Check if struct is packed
                        const isPacked = this.isStructPacked(dataType);

                        // Initialize new struct structure
                        this.currentStruct = {
                            name: structName,
                            fields: [],
                            isPacked
                        };

                        // Reset bit pointer for field positioning
                        this.bitPointer = 0;

                        // Process struct fields
                        this.processStructFields(dataType);

                        // Store completed struct and reset current struct
                        this.currentPackage.structs.push(this.currentStruct);
                        this.currentStruct = null;
                    }
                }
            }
        }
    }

    // Helper method to find struct or union keyword in data type context
    private findStructUnion(ctx: parser.Data_typeContext): any {
        for (let i = 0; i < ctx.childCount; i++) {
            const child = ctx.getChild(i);
            if (child.text === 'struct' || child.text === 'union') {
                return child;
            }
        }
        return null;
    }

    // Helper method to check if struct is packed
    private isStructPacked(ctx: parser.Data_typeContext): boolean {
        for (let i = 0; i < ctx.childCount; i++) {
            const child = ctx.getChild(i);
            if (child.text === 'packed') {
                return true;
            }
        }
        return false;
    }

    // Process all fields in a struct definition
    private processStructFields(ctx: parser.Data_typeContext): void {
        if (!this.currentStruct) return;

        for (let i = 0; i < ctx.childCount; i++) {
            const child = ctx.getChild(i);
            if (child.constructor.name.includes('Struct_union_memberContext')) {
                this.processStructMember(child);
            }
        }
    }

    // Process individual struct member and extract field information
    private processStructMember(ctx: any): void {
        console.log("Processing struct member");
        if (!this.currentStruct) return;

        // Initialize field properties
        let fieldType = '';
        let bandwidth = 1;
        let high: number | undefined;
        let low: number | undefined;

        // Extract field type and bandwidth information
        const dataTypeOrVoid = ctx.data_type_or_void ? ctx.data_type_or_void() : null;
        if (dataTypeOrVoid) {
            fieldType = dataTypeOrVoid.text;

            // Process packed dimensions if present
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
            fieldType = 'logic';  // Default type if not specified
        }

        // Process field declarations
        const listOfVariableDecl = ctx.list_of_variable_decl_assignments ? ctx.list_of_variable_decl_assignments() : null;
        if (listOfVariableDecl) {
            const variableDecl = listOfVariableDecl.variable_decl_assignment ? listOfVariableDecl.variable_decl_assignment() : null;
            if (variableDecl && variableDecl.length > 0) {
                for (const decl of variableDecl) {
                    const variableIdentifier = decl.variable_identifier ? decl.variable_identifier() : null;
                    if (variableIdentifier) {
                        const fieldName = variableIdentifier.text;
                        console.log(`Field name: ${fieldName}, type: ${fieldType}`);

                        // Calculate bit positions for packed structs
                        const startBit = this.bitPointer;
                        const endBit = this.bitPointer + bandwidth - 1;
                        this.bitPointer += bandwidth;

                        // Add field to current struct
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

// Main function to parse SystemVerilog text and extract package and struct information
export function parsePackagesAndStructs(svText: string): Package[] {
    try {
        // Set up ANTLR parsing pipeline
        const inputStream = CharStreams.fromString(svText);
        const lexer = new SystemVerilogLexer(inputStream);
        const tokenStream = new CommonTokenStream(lexer);
        const parser = new SystemVerilogParser(tokenStream);
        
        // Configure error handling
        parser.removeErrorListeners();
        parser.addErrorListener(new QuietErrorListener());
        
        // Parse and visit the syntax tree
        const tree = parser.source_text();
        const visitor = new PackageStructVisitor();
        visitor.visit(tree);
        
        return visitor.packages;
    } catch (error) {
        console.error('Error parsing system-verilog:', error);
        return [];
    }
}
