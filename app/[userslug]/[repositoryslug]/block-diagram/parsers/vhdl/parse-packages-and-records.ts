/**
 * This module provides functionality to parse VHDL packages and record type definitions.
 * It extracts information about custom record types, their fields, and bit positions
 * within the records. Uses ANTLR4-generated lexer and parser for VHDL grammar.
 */

import { CharStreams, CommonTokenStream } from 'antlr4ts';
import { vhdlLexer } from '@/antlr/VHDL/generated/vhdlLexer';
import { vhdlParser } from '@/antlr/VHDL/generated/vhdlParser';
import { AbstractParseTreeVisitor } from 'antlr4ts/tree/AbstractParseTreeVisitor';
import { vhdlVisitor } from '@/antlr/VHDL/generated/vhdlVisitor'
import * as parser from '@/antlr/VHDL/generated/vhdlParser';
import { ParseTree } from 'antlr4ts/tree/ParseTree';
import { QuietErrorListener } from "@/app/[userslug]/[repositoryslug]/block-diagram/parsers/quiet-error-listener";

/**2
 * Represents a field within a VHDL record type
 */
export interface VhdlStructField {
    name: string;      // Field identifier
    type: string;      // VHDL data type
    startBit: number;  // Starting bit position in the record
    endBit: number;    // Ending bit position in the record
    bandwidth: number; // Number of bits used by this field
}

/**
 * Represents a VHDL record type definition
 */
export interface VhdlStructType {
    name: string;             // Record type name
    fields: VhdlStructField[]; // List of fields in the record
}

/**
 * Represents a VHDL package containing record type definitions
 */
export interface VhdlPackage {
    name: string;             // Package name
    structs: VhdlStructType[]; // List of record types defined in the package
}

/**
 * Implements the visitor pattern to traverse the VHDL parse tree and extract
 * package and record type information
 */
export class PackageRecordVisitor
    extends AbstractParseTreeVisitor<void>
    implements vhdlVisitor<void> {

    public packages: VhdlPackage[] = [];              // Stores all parsed packages
    private currentPackage: VhdlPackage | null = null;  // Currently processed package
    private currentStruct: VhdlStructType | null = null; // Currently processed record type
    private bitPointer = 0;                            // Tracks current bit position in record

    constructor() {
        super();
    }

    protected defaultResult(): void {
        return;
    }

    /**
     * Generic tree traversal method
     * Visits all children of the current node
     */
    visitChildren(ctx: ParseTree): void {
        for (let i = 0; i < ctx.childCount; i++) {
            const child = ctx.getChild(i);
            child.accept(this);
        }
    }

    /**
     * Visits the root node of the VHDL design file
     */
    visitDesign_file(ctx: parser.Design_fileContext): void {
        this.visitChildren(ctx);
    }

    /**
     * Processes a design unit node
     */
    visitDesign_unit(ctx: parser.Design_unitContext): void {
        this.visitChildren(ctx);
    }

    /**
     * Processes a package declaration
     * Creates a new VhdlPackage instance and collects its record type definitions
     */
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

    /**
     * Processes the declarative part of a package
     * Visits all package items to find record type definitions
     */
    visitPackage_declarative_part(ctx: parser.Package_declarative_partContext): void {
        const packageDeclarativeItems = ctx.package_declarative_item();
        if (packageDeclarativeItems) {
            for (const item of packageDeclarativeItems) {
                this.visit(item);
            }
        }
    }

    /**
     * Processes a package declarative item
     */
    visitPackage_declarative_item(ctx: parser.Package_declarative_itemContext): void {
        this.visitChildren(ctx);
    }

    /**
     * Processes a type declaration
     * Creates a new VhdlStructType instance for record types
     */
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

                        this.bitPointer = 0; // Reset bit position counter for new record

                        this.processRecordElements(recordTypeDefinition);

                        this.currentPackage.structs.push(this.currentStruct);
                        this.currentStruct = null;
                    }
                }
            }
        }
    }

    /**
     * Processes all elements within a record type definition
     * @param ctx Record type definition context
     */
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

    /**
     * Processes a single element declaration within a record
     * Extracts field name, type, and calculates bit positions
     * @param ctx Element declaration context
     */
    private processElementDeclaration(ctx: parser.Element_declarationContext): void {
        console.log("Processing element declaration:", ctx.text);
        if (!this.currentStruct) return;
        const identifierList = ctx.identifier_list();
        if (identifierList) {
            const identifiers = this.extractIdentifiers(identifierList);

            if (ctx.childCount >= 3) {
                let fieldType = '';
                let subtypeNode = null;

                // Find the field type after the colon
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

                // Create field entries for all identifiers sharing the same type
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

    /**
     * Calculates the bit width of a VHDL type from its textual representation
     * Handles vector types and arrays with explicit ranges
     * @param typeText The VHDL type specification text
     * @returns The calculated bandwidth in bits
     */
    private calculateBandwidthFromText(typeText: string): number {
        // Handle std_logic_vector and bit_vector types
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

        // Handle array types
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

        // Default to 1 bit for scalar types
        return 1;
    }

    /**
     * Extracts identifier names from an identifier list context
     * @param ctx Identifier list context
     * @returns Array of identifier names
     */
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

/**
 * Main parsing function
 * Takes VHDL source code as input and returns a list of parsed packages with their record types
 * @param vhdlText VHDL source code to parse
 * @returns Array of VhdlPackage objects
 */
export function parsePackagesAndRecords(vhdlText: string): VhdlPackage[] {
    try {
        // Convert to uppercase for case-insensitive parsing
        const upperCaseVhdlText = vhdlText.toUpperCase();
        
        // Set up ANTLR parsing pipeline
        const inputStream = CharStreams.fromString(upperCaseVhdlText);
        const lexer = new vhdlLexer(inputStream);
        const tokenStream = new CommonTokenStream(lexer);
        const parser = new vhdlParser(tokenStream);
        
        // Configure error handling
        parser.removeErrorListeners();
        parser.addErrorListener(new QuietErrorListener());
        
        // Parse and visit the syntax tree
        const tree = parser.design_file();
        const visitor = new PackageRecordVisitor();
        visitor.visit(tree);
        return visitor.packages;
    } catch (error) {
        console.error("Error parsing vhdl:", error);
        return [];
    }
}
