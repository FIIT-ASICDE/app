// Parser for extracting module definitions from SystemVerilog source code
// Uses ANTLR4-generated lexer and parser for SystemVerilog grammar
import { CharStreams, CommonTokenStream } from 'antlr4ts';
import { AbstractParseTreeVisitor } from 'antlr4ts/tree/AbstractParseTreeVisitor';
import { ParseTree } from 'antlr4ts/tree/ParseTree';
import { SystemVerilogLexer } from "@/app/antlr/SystemVerilog/generated/SystemVerilogLexer";
import { SystemVerilogParser } from "@/app/antlr/SystemVerilog/generated/SystemVerilogParser";
import { SystemVerilogParserVisitor } from "@/app/antlr/SystemVerilog/generated/SystemVerilogParserVisitor";
import * as parser from '@/app/antlr/SystemVerilog/generated/SystemVerilogParser';
import { QuietErrorListener } from "@/app/[userslug]/[repositoryslug]/block-diagram/parsers/quiet-error-listener";

// Interface representing a port in a SystemVerilog module
export interface ModulePort {
    name: string;           // Port identifier
    direction: 'input' | 'output' | 'inout';  // Port direction
    type?: string;         // Data type (e.g., 'logic', 'wire')
    width?: number;        // Bit width of the port
}

// Interface representing a parsed SystemVerilog module
export interface ParsedModule {
    name: string;          // Module identifier
    ports: ModulePort[];   // List of module ports
}

// Visitor class for traversing the SystemVerilog parse tree and extracting module information
class ModuleVisitor 
    extends AbstractParseTreeVisitor<void>
    implements SystemVerilogParserVisitor<void> {
    
    public modules: ParsedModule[] = [];  // Collection of parsed modules
    private currentModule: ParsedModule | null = null;  // Currently processed module

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

    // Process module declarations and extract module information
    visitModule_declaration(ctx: parser.Module_declarationContext): void {
        const moduleHeader = ctx.module_header();
        if (moduleHeader) {
            const moduleIdentifier = moduleHeader.module_identifier();
            if (moduleIdentifier) {
                const moduleName = moduleIdentifier.text;
                
                // Initialize new module structure
                this.currentModule = {
                    name: moduleName,
                    ports: []
                };

                // Process port declarations if present
                const portList = moduleHeader.list_of_port_declarations();
                if (portList) {
                    this.visitList_of_port_declarations(portList);
                }

                // Store completed module and reset current module
                this.modules.push(this.currentModule);
                this.currentModule = null;
            }
        }

        this.visitChildren(ctx);
    }

    // Process list of port declarations in a module
    visitList_of_port_declarations(ctx: parser.List_of_port_declarationsContext): void {
        const portDeclarations = ctx.port_decl();
        if (portDeclarations) {
            // Process each port declaration
            for (let i = 0; i < portDeclarations.length; i++) {
                const ansiPortDecl = portDeclarations[i].ansi_port_declaration();
                if (ansiPortDecl) {
                    this.visitAnsi_port_declaration(ansiPortDecl);
                }
            }
        }
    }

    // Extract information from ANSI-style port declarations
    visitAnsi_port_declaration(ctx: parser.Ansi_port_declarationContext) {
        if (!this.currentModule) return;
        const id = ctx.port_identifier();
        if (!id) return;

        // Extract port name and direction
        const portName = id.text;
        let direction: 'input'|'output'|'inout' = 'input';
        const pd = ctx.port_direction()?.text;
        if (pd === 'output') direction = 'output';
        else if (pd === 'inout') direction = 'inout';

        // Get type information from either explicit or implicit declarations
        const explicitTypeCtx = ctx.data_type();
        const implicitTypeCtx = ctx.implicit_data_type();

        let typeStr: string|undefined;
        let width = 1;  // Default width is 1 bit
        let dims: parser.Packed_dimensionContext[] = [];

        // Handle explicit type declarations (e.g., 'logic [7:0]')
        if (explicitTypeCtx) {
            typeStr = explicitTypeCtx.getChild(0).text;
            dims = explicitTypeCtx.packed_dimension();
        } 
        // Handle implicit type declarations (assumed to be 'logic')
        else if (implicitTypeCtx) {
            typeStr = 'logic';
            dims = implicitTypeCtx.packed_dimension();
        }

        // Calculate port width from dimensions if present
        if (dims.length > 0) {
            const rangeCtx = dims[0].constant_range();
            if (rangeCtx) {
                const exprs = rangeCtx.constant_expression();
                if (exprs.length >= 2) {
                    const msb = parseInt(exprs[0].text, 10);
                    const lsb = parseInt(exprs[1].text, 10);
                    width = Math.abs(msb - lsb) + 1;
                }
            }
        }

        // Add parsed port to current module
        this.currentModule.ports.push({ name: portName, direction, type: typeStr, width });
    }
}

// Main function to parse SystemVerilog text and extract module information
export function parseModules(svText: string): ParsedModule[] {
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
        const visitor = new ModuleVisitor();
        visitor.visit(tree);
        
        return visitor.modules;
    } catch (error) {
        console.error('Error parsing system-verilog modules:', error);
        return [];
    }
}
