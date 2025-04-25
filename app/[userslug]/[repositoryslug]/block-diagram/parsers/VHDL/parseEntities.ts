// app/antlr/VHDL/ParseEntities.ts
import { AbstractParseTreeVisitor } from 'antlr4ts/tree/AbstractParseTreeVisitor';
import { ParseTree }                   from 'antlr4ts/tree/ParseTree';
import { CharStreams, CommonTokenStream } from 'antlr4ts';
import { vhdlLexer }     from '@/app/antlr/VHDL/generated/vhdlLexer';
import { vhdlParser }    from '@/app/antlr/VHDL/generated/vhdlParser';
import { vhdlVisitor }   from '@/app/antlr/VHDL/generated/vhdlVisitor';
import * as parser       from '@/app/antlr/VHDL/generated/vhdlParser';
import { QuietErrorListener } from "@/app/[userslug]/[repositoryslug]/block-diagram/parsers/QuietErrorListener";

export interface EntityPort {
    name: string;
    direction: 'in' | 'out' | 'inout';
    type: string;
    width: number;
}

export interface ParsedEntity {
    name: string;
    ports: EntityPort[];
}

export class ParseEntities
    extends AbstractParseTreeVisitor<void>
    implements vhdlVisitor<void>
{
    public entities: ParsedEntity[] = [];
    private currentEntity: ParsedEntity | null = null;

    protected defaultResult(): void { }

    visitDesign_file(ctx: parser.Design_fileContext): void {
        this.visitChildren(ctx);
    }

    visitEntity_declaration(ctx: parser.Entity_declarationContext): void {
        const name = ctx.identifier(0)?.text;
        if (!name) return;
        this.currentEntity = { name, ports: [] };

        this.visitChildren(ctx);

        this.entities.push(this.currentEntity);
        this.currentEntity = null;
    }

    visitInterface_port_declaration(
        ctx: parser.Interface_port_declarationContext
    ): void {
        if (!this.currentEntity) return;

        const ids = ctx.identifier_list()?.identifier() ?? [];

        const modeCtx = ctx.signal_mode();
        const txt = modeCtx?.text.toLowerCase();
        const direction: EntityPort['direction'] =
            txt === 'out'   ? 'out'
                : txt === 'inout'? 'inout'
                    : 'in';

        const subtype = ctx.subtype_indication();
        const typeName = subtype.selected_name(0)?.text || 'unknown';

        let width = 1;
        const nums: number[] = [];
        const stack: ParseTree[] = [subtype];
        while (stack.length && nums.length < 2) {
            const node = stack.pop()!;
            for (let i = 0; i < node.childCount; i++) {
                const ch = node.getChild(i);
                // если текст — чистое целое число
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

        for (const id of ids) {
            this.currentEntity.ports.push({
                name: id.text,
                direction,
                type: typeName,
                width
            });
        }
    }

    visitChildren(ctx: ParseTree): void {
        for (let i = 0; i < ctx.childCount; i++) {
            ctx.getChild(i).accept(this);
        }
    }
}

export function parseEntities(vhdlText: string): ParsedEntity[] {
    const inputStream = CharStreams.fromString(vhdlText);
    const lexer       = new vhdlLexer(inputStream);
    const tokens      = new CommonTokenStream(lexer);
    const parserInst  = new vhdlParser(tokens);
    parserInst.removeErrorListeners();
    parserInst.addErrorListener(new QuietErrorListener());
    const tree        = parserInst.design_file();
    const visitor     = new ParseEntities();
    visitor.visit(tree);
    return visitor.entities;
}
