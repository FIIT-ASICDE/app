/**
 * This module provides functionality to parse VHDL top-level entities and their architectures.
 * It extracts information about entity ports and component instantiations within the architecture.
 * The parser is used to analyze the hierarchical structure of VHDL designs.
 */

import { CharStreams, CommonTokenStream } from 'antlr4ts';
import { AbstractParseTreeVisitor } from 'antlr4ts/tree/AbstractParseTreeVisitor';
import { ParseTree } from 'antlr4ts/tree/ParseTree';
import { vhdlLexer } from '@/antlr/VHDL/generated/vhdlLexer';
import { vhdlParser } from '@/antlr/VHDL/generated/vhdlParser';
import { vhdlVisitor } from '@/antlr/VHDL/generated/vhdlVisitor';
import * as parser from '@/antlr/VHDL/generated/vhdlParser';
import { ParsedModule, ParsedTopModule, SubModule, TopModulePort } from "@/app/[userslug]/[repositoryslug]/block-diagram/utils/diagram-generation/interfaces";
import { QuietErrorListener } from "@/app/[userslug]/[repositoryslug]/block-diagram/parsers/quiet-error-listener";

/**
 * Main parsing function for VHDL top-level entities
 * Analyzes a VHDL file containing a top-level entity and its architecture
 *
 * @param vhdlText - VHDL source code containing the top-level entity and architecture
 * @param externals - Array of external entities that might be instantiated within the top entity
 * @returns ParsedTopModule object containing the entity structure, or null if no entity was found
 */
export function parseTopEntity(
    vhdlText: string,
    externals: ParsedModule[]
): ParsedTopModule | null {
    // Set up ANTLR parsing pipeline
    const input = CharStreams.fromString(vhdlText);
    const lex = new vhdlLexer(input);
    const tokens = new CommonTokenStream(lex);
    const p = new vhdlParser(tokens);

    // Configure error handling
    p.removeErrorListeners();
    p.addErrorListener(new QuietErrorListener());

    // Parse and visit the syntax tree
    const tree = p.design_file();
    const visitor = new TopEntityVisitor(externals);
    visitor.visit(tree);
    return visitor.top;
}

/**
 * Implements the visitor pattern to traverse the VHDL parse tree and extract
 * information about the top-level entity and its component instantiations
 */
class TopEntityVisitor
    extends AbstractParseTreeVisitor<void>
    implements vhdlVisitor<void>
{
    public top: ParsedTopModule | null = null;         // Stores the parsed top-level entity
    private current: ParsedTopModule | null = null;    // Currently processed entity
    private externals: ParsedModule[];                 // List of external entity definitions

    constructor(externals: ParsedModule[]) {
        super();
        this.externals = externals;
    }

    protected defaultResult(): void {}

    /**
     * Processes an entity declaration
     * Creates a new ParsedTopModule instance for the top-level entity
     */
    visitEntity_declaration(ctx: parser.Entity_declarationContext): void {
        const name = ctx.identifier(0)?.text;
        if (!name) {
            this.visitChildren(ctx);
            return;
        }
        this.current = { name, ports: [], subModules: [] };
        this.visitChildren(ctx);
        this.top = this.current;
    }

    /**
     * Processes a port declaration within the entity
     * Extracts port name, direction, and width information
     */
    visitInterface_port_declaration(
        ctx: parser.Interface_port_declarationContext
    ): void {
        if (!this.current) return;

        // Get all port identifiers (multiple ports can share the same declaration)
        const ids = ctx.identifier_list()?.identifier() ?? [];

        // Determine port direction
        const mode = ctx.signal_mode()?.text.toLowerCase();
        const dir: TopModulePort['direction'] =
            mode === 'out' ? 'output' : mode === 'inout' ? 'inout' : 'input';

        // Calculate port width by analyzing vector bounds if present
        let width = 1;
        const nums: number[] = [];
        const stack: ParseTree[] = [ctx.subtype_indication()];
        while (stack.length && nums.length < 2) {
            const node = stack.pop()!;
            for (let i = 0; i < node.childCount; i++) {
                const ch = node.getChild(i);
                if (/^\d+$/.test(ch.text)) {
                    nums.push(+ch.text);
                    if (nums.length === 2) break;
                }
                stack.push(ch);
            }
        }
        if (nums.length === 2) {
            width = Math.abs(nums[0] - nums[1]) + 1;
        }

        // Create port entries for all identifiers in this declaration
        for (const id of ids) {
            this.current.ports.push({ name: id.text, direction: dir, width });
        }
    }

    /**
     * Processes the declarative part of the architecture
     * This section contains component instantiations
     */
    visitArchitecture_declarative_part(
        ctx: parser.Architecture_declarative_partContext
    ): void {
        this.visitChildren(ctx);
    }

    /**
     * Processes a component instantiation statement
     * Creates a SubModule entry with port mappings and connection information
     */
    visitComponent_instantiation_statement(
        ctx: parser.Component_instantiation_statementContext
    ): void {
        if (!this.current) return;

        // Extract instance and module names
        const labelCtx = ctx.label_colon();
        const instanceName = labelCtx?.identifier()?.text ?? `u_unknown`;
        const instUnit = ctx.instantiated_unit();
        const moduleName = instUnit?.text ?? 'UNKNOWN';

        // Process port mappings
        const assocListCtx = ctx.port_map_aspect()?.association_list();
        const elems = assocListCtx?.association_element() ?? [];

        // Create port connection entries
        const conns: SubModule['portConnections'] = elems.map(ae => {
            const formal =
                ae.formal_part()?.identifier()?.text.replace(/:$/, '') ?? '';
            const actual = ae.actual_part()?.text ?? '';

            // Determine port direction and width from external entity definition
            let dir: 'input' | 'output' | 'inout' = 'input';
            let width = 1;
            const ext = this.externals.find(e => e.name === moduleName);
            if (ext) {
                const ep = ext.ports.find(p => p.name === formal);
                if (ep) {
                    dir = ep.direction === 'out' ? 'output' : ep.direction === 'inout' ? 'inout' : 'input';
                    width = ep.width || 1;
                }
            }
            // Update width if connected to a top-level port
            const tp = this.current!.ports.find(p => p.name === actual);
            if (tp) width = tp.width;

            return { portName: formal, connectedTo: actual, direction: dir, width };
        });

        // Add submodule to current entity
        this.current.subModules.push({
            moduleName,
            instanceName,
            portConnections: conns
        });
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
