// app/antlr/vhdl/parse-top-entity.ts
import { CharStreams, CommonTokenStream } from 'antlr4ts';
import { AbstractParseTreeVisitor } from 'antlr4ts/tree/AbstractParseTreeVisitor';
import { ParseTree } from 'antlr4ts/tree/ParseTree';
import { vhdlLexer } from '@/app/antlr/VHDL/generated/vhdlLexer';
import { vhdlParser } from '@/app/antlr/VHDL/generated/vhdlParser';
import { vhdlVisitor } from '@/app/antlr/VHDL/generated/vhdlVisitor';
import * as parser from '@/app/antlr/VHDL/generated/vhdlParser';
import { ParsedModule, ModulePort, ParsedTopModule, SubModule, TopModulePort } from "@/app/[userslug]/[repositoryslug]/block-diagram/utils/diagram-generation/interfaces";
import { QuietErrorListener } from "@/app/[userslug]/[repositoryslug]/block-diagram/parsers/quiet-error-listener";


/**
 * @param vhdlText     — text of one file with top-entity + architecture
 * @param externals    — array of external entities (ParsedEntity)
 * @returns ParsedTopModule or null if no entity was found
 */
export function parseTopEntity(
    vhdlText: string,
    externals: ParsedModule[]
): ParsedTopModule | null {
    const input = CharStreams.fromString(vhdlText);
    const lex = new vhdlLexer(input);
    const tokens = new CommonTokenStream(lex);
    const p = new vhdlParser(tokens);
    p.removeErrorListeners();
    p.addErrorListener(new QuietErrorListener());
    const tree = p.design_file();
    const visitor = new TopEntityVisitor(externals);
    visitor.visit(tree);
    return visitor.top;
}

class TopEntityVisitor
    extends AbstractParseTreeVisitor<void>
    implements vhdlVisitor<void>
{
    public top: ParsedTopModule | null = null;
    private current: ParsedTopModule | null = null;
    private externals: ParsedModule[];

    constructor(externals: ParsedModule[]) {
        super();
        this.externals = externals;
    }

    protected defaultResult(): void {}

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

    visitInterface_port_declaration(
        ctx: parser.Interface_port_declarationContext
    ): void {
        if (!this.current) return;
        const ids = ctx.identifier_list()?.identifier() ?? [];
        const mode = ctx.signal_mode()?.text.toLowerCase();
        const dir: TopModulePort['direction'] =
            mode === 'out' ? 'output' : mode === 'inout' ? 'inout' : 'input';

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

        for (const id of ids) {
            this.current.ports.push({ name: id.text, direction: dir, width });
        }
    }

    visitArchitecture_declarative_part(
        ctx: parser.Architecture_declarative_partContext
    ): void {
        this.visitChildren(ctx);
    }

    visitComponent_instantiation_statement(
        ctx: parser.Component_instantiation_statementContext
    ): void {
        if (!this.current) return;

        const labelCtx = ctx.label_colon();
        const instanceName = labelCtx?.identifier()?.text ?? `u_unknown`;

        const instUnit = ctx.instantiated_unit();
        const moduleName = instUnit?.text ?? 'UNKNOWN';

        const assocListCtx = ctx.port_map_aspect()?.association_list();
        const elems = assocListCtx?.association_element() ?? [];

        const conns: SubModule['portConnections'] = elems.map(ae => {
            const formal =
                ae.formal_part()?.identifier()?.text.replace(/:$/, '') ?? '';
            const actual = ae.actual_part()?.text ?? '';

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
            const tp = this.current!.ports.find(p => p.name === actual);
            if (tp) width = tp.width;

            return { portName: formal, connectedTo: actual, direction: dir, width };
        });

        this.current.subModules.push({
            moduleName,
            instanceName,
            portConnections: conns
        });
    }
    visitChildren(ctx: ParseTree): void {
        for (let i = 0; i < ctx.childCount; i++) {
            ctx.getChild(i).accept(this);
        }
    }
}
