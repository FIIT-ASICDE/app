import { CharStreams, CommonTokenStream } from 'antlr4ts';
import { AbstractParseTreeVisitor } from 'antlr4ts/tree/AbstractParseTreeVisitor';
import { ParseTree } from 'antlr4ts/tree/ParseTree';
import {
    SystemVerilogLexer
} from '@/app/antlr/SystemVerilog/generated/SystemVerilogLexer';
import {
    SystemVerilogParser,
    Module_program_interface_instantiationContext
} from '@/app/antlr/SystemVerilog/generated/SystemVerilogParser';
import {
    SystemVerilogParserVisitor
} from '@/app/antlr/SystemVerilog/generated/SystemVerilogParserVisitor';
import * as parser from '@/app/antlr/SystemVerilog/generated/SystemVerilogParser';
import {QuietErrorListener } from '@/app/[userslug]/[repositoryslug]/block-diagram/parsers/QuietErrorListener'

export interface ModulePort {
    name: string;
    direction: 'input' | 'output' | 'inout' | 'in' | 'out';
    type?: string;
    width?: number;
}
export interface ParsedModule {
    name: string;
    ports: ModulePort[];
}

export interface TopModulePort {
    direction: 'input' | 'output' | 'inout';
    name: string;
    width: number;
}
export interface SubModule {
    moduleName: string;
    instanceName: string;
    portConnections: {
        portName: string;
        connectedTo: string;
        width: number;
        direction: 'input' | 'output' | 'inout';
    }[];
}
export interface ParsedTopModule {
    name: string;
    ports: TopModulePort[];
    subModules: SubModule[];
}

/**
 * @param svText - text of one top module
 * @param externalMods - list of ParsedModule from other files
 * @returns ParsedTopModule or null if parsing failed
 */
export function parseTopModule(
    svText: string,
    externalMods: ParsedModule[]
): ParsedTopModule | null {
    const inputStream = CharStreams.fromString(svText);
    const lexer = new SystemVerilogLexer(inputStream);
    const tokens = new CommonTokenStream(lexer);
    const parserInstance = new SystemVerilogParser(tokens);
    const tree = parserInstance.source_text();
    const visitor = new TopModuleVisitor(externalMods);
    parserInstance.removeErrorListeners();
    parserInstance.addErrorListener(new QuietErrorListener());
    visitor.visit(tree);
    return visitor.topModule;
}

class TopModuleVisitor
    extends AbstractParseTreeVisitor<void>
    implements SystemVerilogParserVisitor<void> {
    public topModule: ParsedTopModule | null = null;
    private current: ParsedTopModule | null = null;
    private external: ParsedModule[];

    constructor(external: ParsedModule[]) {
        super();
        this.external = external;
    }

    protected defaultResult(): void { return; }

    visitModule_declaration(ctx: parser.Module_declarationContext): void {
        const header = ctx.module_header();
        const name = header?.module_identifier()?.text;
        if (!name) {
            this.visitChildren(ctx);
            return;
        }

        this.current = { name, ports: [], subModules: [] };
        const portList = header.list_of_port_declarations();
        if (portList) this.visitList_of_port_declarations(portList);
        for (const mi of ctx.module_item() ?? []) {
            mi.accept(this);
        }
        this.topModule = this.current;
        this.current = null;
    }

    visitList_of_port_declarations(
        ctx: parser.List_of_port_declarationsContext
    ): void {
        for (const pd of ctx.port_decl() ?? []) {
            const ansi = pd.ansi_port_declaration();
            if (ansi) ansi.accept(this);
        }
    }

    visitAnsi_port_declaration(ctx: parser.Ansi_port_declarationContext): void {
        if (!this.current) return;
        const id = ctx.port_identifier();
        if (!id) return;
        let dir: TopModulePort['direction'] = 'input';
        const pd = ctx.port_direction()?.text;
        if (pd === 'output') dir = 'output';
        else if (pd === 'inout') dir = 'inout';
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
        this.current.ports.push({
            name: id.text,
            direction: dir,
            width
        });
    }

    visitModule_program_interface_instantiation(
        ctx: Module_program_interface_instantiationContext
    ): void {
        if (!this.current) return;
        const moduleName = ctx.instance_identifier()?.text || 'UNKNOWN';
        const hier = ctx.hierarchical_instance(0);
        if (!hier) return;
        const instName = hier.name_of_instance().getChild(0).text;
        const extMod = this.external.find(m => m.name === moduleName);
        const connCtx = hier.list_of_port_connections();
        const ports: SubModule['portConnections'] = [];
        for (const npc of connCtx?.named_port_connection() ?? []) {
            const portName = npc.port_identifier()?.text ?? '';
            const expr = npc.port_assign()?.expression()?.text ?? '';
            let width = 1;
            let direction: 'input'|'output'|'inout' = 'input';
            if (extMod) {
                const extPort = extMod.ports.find(p => p.name === portName);
                if (extPort) {
                    direction =
                        extPort.direction === 'in' ? 'input' :
                            extPort.direction === 'out' ? 'output' :
                                extPort.direction === 'inout' ? 'inout' :
                                    extPort.direction as any;
                    width = extPort.width ?? width;
                }
            }
            const topP = this.current.ports.find(p => p.name === expr);
            if (topP) width = topP.width;
            ports.push({ portName, connectedTo: expr, width, direction });
        }
        this.current.subModules.push({ moduleName, instanceName: instName, portConnections: ports });
    }
    visitChildren(ctx: ParseTree): void {
        for (let i = 0; i < ctx.childCount; i++) {
            ctx.getChild(i).accept(this);
        }
    }
}
