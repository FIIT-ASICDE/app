// Parser for extracting top-level module information from SystemVerilog source code
// Uses ANTLR4-generated lexer and parser for SystemVerilog grammar
import { CharStreams, CommonTokenStream } from 'antlr4ts';
import { AbstractParseTreeVisitor } from 'antlr4ts/tree/AbstractParseTreeVisitor';
import { ParseTree } from 'antlr4ts/tree/ParseTree';
import {
    SystemVerilogLexer
} from '@/antlr/SystemVerilog/grammar/generated/SystemVerilogLexer';
import {
    SystemVerilogParser,
    Module_program_interface_instantiationContext
} from '@/antlr/SystemVerilog/grammar/generated/SystemVerilogParser';
import {
    SystemVerilogParserVisitor
} from '@/antlr/SystemVerilog/grammar/generated/SystemVerilogParserVisitor';
import * as parser from '@/antlr/SystemVerilog/grammar/generated/SystemVerilogParser';
import {QuietErrorListener } from '@/app/[userslug]/[repositoryslug]/block-diagram/parsers/quiet-error-listener'

// Interface representing a port in a SystemVerilog module
export interface ModulePort {
    name: string;           // Port identifier
    direction: 'input' | 'output' | 'inout' | 'in' | 'out'; // Port direction
    type?: string;         // Data type of the port
    width?: number;        // Bit width of the port
}

// Interface representing a parsed SystemVerilog module
export interface ParsedModule {
    name: string;          // Module identifier
    ports: ModulePort[];   // List of module ports
}

// Interface representing a port in the top-level module
export interface TopModulePort {
    direction: 'input' | 'output' | 'inout';  // Port direction
    name: string;                             // Port identifier
    width: number;                            // Bit width of the port
}

// Interface representing a submodule instantiation within the top module
export interface SubModule {
    moduleName: string;     // Name of the module being instantiated
    instanceName: string;   // Name of this specific instance
    portConnections: {      // List of port connections for this instance
        portName: string;   // Port name in the submodule
        connectedTo: string; // Signal/port it's connected to in the top module
        width: number;      // Bit width of the connection
        direction: 'input' | 'output' | 'inout' | 'in' | 'out'; // Port direction
    }[];
}

// Interface representing the parsed top-level module
export interface ParsedTopModule {
    name: string;           // Module identifier
    ports: TopModulePort[]; // List of module ports
    subModules: SubModule[]; // List of instantiated submodules
}

/**
 * Parses a SystemVerilog top module and extracts its structure
 * @param svText - text of one top module
 * @param externalMods - list of ParsedModule from other files
 * @returns ParsedTopModule or null if parsing failed
 */
export function parseTopModule(
    svText: string,
    externalMods: ParsedModule[]
): ParsedTopModule | null {
    try {
        // Set up ANTLR parsing pipeline
    const inputStream = CharStreams.fromString(svText);
    const lexer = new SystemVerilogLexer(inputStream);
    const tokens = new CommonTokenStream(lexer);
    const parserInstance = new SystemVerilogParser(tokens);

        // Configure error handling
        parserInstance.removeErrorListeners();
        parserInstance.addErrorListener(new QuietErrorListener());

        // Parse and visit the syntax tree
    const tree = parserInstance.source_text();
    const visitor = new TopModuleVisitor(externalMods);
    visitor.visit(tree);

    return visitor.topModule;
    } catch (error) {
        console.error('Error parsing top module:', error);
        return null;
    }
}

// Visitor class for traversing the SystemVerilog parse tree and extracting top module information
class TopModuleVisitor
    extends AbstractParseTreeVisitor<void>
    implements SystemVerilogParserVisitor<void> {

    public topModule: ParsedTopModule | null = null;  // Stores the parsed top module
    private current: ParsedTopModule | null = null;   // Currently processed module
    private external: ParsedModule[];                 // List of external module definitions

    constructor(external: ParsedModule[]) {
        super();
        this.external = external;
    }

    // Required by AbstractParseTreeVisitor
    protected defaultResult(): void { return; }

    // Process module declarations and extract module information
    visitModule_declaration(ctx: parser.Module_declarationContext): void {
        const header = ctx.module_header();
        const name = header?.module_identifier()?.text;
        if (!name) {
            this.visitChildren(ctx);
            return;
        }

        // Initialize new top module structure
        this.current = { name, ports: [], subModules: [] };

        // Process port declarations if present
        const portList = header.list_of_port_declarations();
        if (portList) this.visitList_of_port_declarations(portList);

        // Process module items (including submodule instantiations)
        for (const mi of ctx.module_item() ?? []) {
            mi.accept(this);
        }

        // Store completed module and reset current
        this.topModule = this.current;
        this.current = null;
    }

    // Process list of port declarations in the module
    visitList_of_port_declarations(
        ctx: parser.List_of_port_declarationsContext
    ): void {
        for (const pd of ctx.port_decl() ?? []) {
            const ansi = pd.ansi_port_declaration();
            if (ansi) ansi.accept(this);
        }
    }

    // Extract information from ANSI-style port declarations
    visitAnsi_port_declaration(ctx: parser.Ansi_port_declarationContext): void {
        if (!this.current) return;
        const id = ctx.port_identifier();
        if (!id) return;

        // Determine port direction
        let dir: TopModulePort['direction'] = 'input';
        const pd = ctx.port_direction()?.text;
        if (pd === 'output') dir = 'output';
        else if (pd === 'inout') dir = 'inout';

        // Calculate port width from packed dimensions
        let width = 1;
        const dt = ctx.data_type() ?? ctx.implicit_data_type();
        if (dt) {
            const dims = dt.packed_dimension();
            if (dims.length) {
                const cr = dims[0].constant_range();
                const exprs = cr?.constant_expression();
                if (exprs && exprs.length >= 2) {
                    const msb = parseInt(exprs[0].text, 10);
                    const lsb = parseInt(exprs[1].text, 10);
                    width = Math.abs(msb - lsb) + 1;
                }
            }
        }

        // Add port to current module
        this.current.ports.push({
            name: id.text,
            direction: dir,
            width
        });
    }

    // Process submodule instantiations
    visitModule_program_interface_instantiation(
        ctx: Module_program_interface_instantiationContext
    ): void {
        if (!this.current) return;

        // Extract module and instance names
        const moduleName = ctx.instance_identifier()?.text || 'UNKNOWN';
        const hier = ctx.hierarchical_instance(0);
        if (!hier) return;
        const instName = hier.name_of_instance().getChild(0).text;

        // Find external module definition if available
        const extMod = this.external.find(m => m.name === moduleName);
        const connCtx = hier.list_of_port_connections();
        const ports: SubModule['portConnections'] = [];

        // Process each port connection in the instantiation
        for (const npc of connCtx?.named_port_connection() ?? []) {
            const portName = npc.port_identifier()?.text ?? '';
            const expr = npc.port_assign()?.expression()?.text ?? '';
            let width = 1;
            let direction: 'input' | 'output' | 'inout' | 'in' | 'out' = 'input';

            // Get port information from external module if available
            if (extMod) {
                const extPort = extMod.ports.find(p => p.name === portName);
                if (extPort) {
                    direction =
                        extPort.direction === 'input' ? 'input' :
                            extPort.direction === 'output' ? 'output' :
                                extPort.direction;
                    width = extPort.width ?? width;
                }
            }

            // Update width if connected to a top-level port
            const topP = this.current.ports.find(p => p.name === expr);
            if (topP) width = topP.width;

            ports.push({ portName, connectedTo: expr, width, direction });
        }

        // Add submodule to current module
        this.current.subModules.push({ moduleName, instanceName: instName, portConnections: ports });
    }

    // Generic tree traversal method
    visitChildren(ctx: ParseTree): void {
        for (let i = 0; i < ctx.childCount; i++) {
            ctx.getChild(i).accept(this);
        }
    }
}
