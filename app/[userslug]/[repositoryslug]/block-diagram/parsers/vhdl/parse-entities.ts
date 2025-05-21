/**
 * This module provides functionality to parse VHDL source code and extract entity declarations
 * with their ports. It uses ANTLR4-generated lexer and parser for VHDL grammar.
 */

// app/antlr/vhdl/ParseEntities.ts
import { AbstractParseTreeVisitor } from 'antlr4ts/tree/AbstractParseTreeVisitor';
import { ParseTree }                   from 'antlr4ts/tree/ParseTree';
import { CharStreams, CommonTokenStream } from 'antlr4ts';
import { vhdlLexer }     from '@/antlr/VHDL/generated/vhdlLexer';
import { vhdlParser }    from '@/antlr/VHDL/generated/vhdlParser';
import { vhdlVisitor }   from '@/antlr/VHDL/generated/vhdlVisitor';
import * as parser       from '@/antlr/VHDL/generated/vhdlParser';
import { QuietErrorListener } from "@/app/[userslug]/[repositoryslug]/block-diagram/parsers/quiet-error-listener";

/**
 * Represents a port in a VHDL entity
 */
export interface EntityPort {
    name: string;        // Port identifier
    direction: 'in' | 'out' | 'inout';  // Signal direction
    type: string;        // Data type of the port
    width: number;       // Bit width of the port (1 for scalar, >1 for vector)
}

/**
 * Represents a parsed VHDL entity with its ports
 */
export interface ParsedEntity {
    name: string;        // Entity name
    ports: EntityPort[]; // List of entity ports
}

/**
 * VHDL Entity Parser Visitor
 * Implements the visitor pattern to traverse the VHDL parse tree and extract entity information
 */
export class ParseEntities
    extends AbstractParseTreeVisitor<void>
    implements vhdlVisitor<void>
{
    public entities: ParsedEntity[] = [];           // Stores all parsed entities
    private currentEntity: ParsedEntity | null = null;  // Currently processed entity

    protected defaultResult(): void { }

    /**
     * Visits the root node of the VHDL design file
     */
    visitDesign_file(ctx: parser.Design_fileContext): void {
        this.visitChildren(ctx);
    }

    /**
     * Processes an entity declaration node
     * Creates a new ParsedEntity instance and collects its ports
     */
    visitEntity_declaration(ctx: parser.Entity_declarationContext): void {
        const name = ctx.identifier(0)?.text;
        if (!name) return;
        this.currentEntity = { name, ports: [] };

        this.visitChildren(ctx);

        this.entities.push(this.currentEntity);
        this.currentEntity = null;
    }

    /**
     * Processes a port declaration within an entity
     * Extracts port name, direction, type, and width information
     */
    visitInterface_port_declaration(
        ctx: parser.Interface_port_declarationContext
    ): void {
        if (!this.currentEntity) return;

        // Get all port identifiers (multiple ports can share the same declaration)
        const ids = ctx.identifier_list()?.identifier() ?? [];

        // Determine port direction (defaults to 'in' if not specified)
        const modeCtx = ctx.signal_mode();
        const txt = modeCtx?.text.toLowerCase();
        const direction: EntityPort['direction'] =
            txt === 'out'   ? 'out'
                : txt === 'inout'? 'inout'
                    : 'in';

        // Extract port type information
        const subtype = ctx.subtype_indication();
        const typeName = subtype.selected_name(0)?.text || 'unknown';

        // Calculate port width by analyzing vector bounds if present
        let width = 1;
        const nums: number[] = [];
        const stack: ParseTree[] = [subtype];
        while (stack.length && nums.length < 2) {
            const node = stack.pop()!;
            for (let i = 0; i < node.childCount; i++) {
                const ch = node.getChild(i);
                // Check if the text is a pure integer number
                if (/^\d+$/.test(ch.text)) {
                    nums.push(Number(ch.text));
                    if (nums.length === 2) break;
                }
                stack.push(ch);
            }
        }
        if (nums.length === 2) {
            const [msb, lsb] = nums;
            width = Math.abs(msb - lsb) + 1;
        }

        // Create port entries for all identifiers in this declaration
        for (const id of ids) {
            this.currentEntity.ports.push({
                name: id.text,
                direction,
                type: typeName,
                width
            });
        }
    }

    /**
     * Generic tree traversal method
     * Visits all children of the current node
     */
    visitChildren(ctx: ParseTree): void {
        for (let i = 0; i < ctx.childCount; i++) {
            ctx.getChild(i).accept(this);
        }
    }
}

/**
 * Main parsing function
 * Takes VHDL source code as input and returns a list of parsed entities
 * @param vhdlText - VHDL source code to parse
 * @returns Array of ParsedEntity objects
 */
export function parseEntities(vhdlText: string): ParsedEntity[] {
    // Set up ANTLR parsing pipeline
    const inputStream = CharStreams.fromString(vhdlText);
    const lexer       = new vhdlLexer(inputStream);
    const tokens      = new CommonTokenStream(lexer);
    const parserInst  = new vhdlParser(tokens);
    
    // Configure error handling
    parserInst.removeErrorListeners();
    parserInst.addErrorListener(new QuietErrorListener());
    
    // Parse and visit the syntax tree
    const tree        = parserInst.design_file();
    const visitor     = new ParseEntities();
    visitor.visit(tree);
    return visitor.entities;
}
