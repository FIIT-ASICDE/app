// app/antlr/VHDL/ParseEntities.ts
import { AbstractParseTreeVisitor } from 'antlr4ts/tree/AbstractParseTreeVisitor';
import { ParseTree }                   from 'antlr4ts/tree/ParseTree';
import { CharStreams, CommonTokenStream } from 'antlr4ts';
import { vhdlLexer }     from '@/app/antlr/VHDL/generated/vhdlLexer';
import { vhdlParser }    from '@/app/antlr/VHDL/generated/vhdlParser';
import { vhdlVisitor }   from '@/app/antlr/VHDL/generated/vhdlVisitor';
import * as parser       from '@/app/antlr/VHDL/generated/vhdlParser';

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

    protected defaultResult(): void { /* ничего */ }

    // Точка входа
    visitDesign_file(ctx: parser.Design_fileContext): void {
        this.visitChildren(ctx);
    }

    // entity ... end entity
    visitEntity_declaration(ctx: parser.Entity_declarationContext): void {
        const name = ctx.identifier(0)?.text;
        if (!name) return;
        this.currentEntity = { name, ports: [] };

        // обходим subtree, чтобы попасть на все interface_port_declaration
        this.visitChildren(ctx);

        this.entities.push(this.currentEntity);
        this.currentEntity = null;
    }

    // Для каждого interface_port_declaration
    visitInterface_port_declaration(
        ctx: parser.Interface_port_declarationContext
    ): void {
        if (!this.currentEntity) return;

        // 1) Имена
        const ids = ctx.identifier_list()?.identifier() ?? [];

        // 2) Направление: signal_mode() вместо порт_моде
        const modeCtx = ctx.signal_mode();
        const txt = modeCtx?.text.toLowerCase();
        const direction: EntityPort['direction'] =
            txt === 'out'   ? 'out'
                : txt === 'inout'? 'inout'
                    : /* иначе */      'in';

        // 3) Тип
        const subtype = ctx.subtype_indication();
        const typeName = subtype.selected_name(0)?.text || 'unknown';

        // 4) Вычисляем width — ищем два первых целых поддеревом subtype
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

        // 5) Пушим порт для каждого идентификатора
        for (const id of ids) {
            this.currentEntity.ports.push({
                name: id.text,
                direction,
                type: typeName,
                width
            });
        }
    }

    // Обход всего дерева по умолчанию
    visitChildren(ctx: ParseTree): void {
        for (let i = 0; i < ctx.childCount; i++) {
            ctx.getChild(i).accept(this);
        }
    }
}

// Функция‑обёртка
export function parseEntities(vhdlText: string): ParsedEntity[] {
    const inputStream = CharStreams.fromString(vhdlText);
    const lexer       = new vhdlLexer(inputStream);
    const tokens      = new CommonTokenStream(lexer);
    const parserInst  = new vhdlParser(tokens);
    const tree        = parserInst.design_file();
    const visitor     = new ParseEntities();
    visitor.visit(tree);
    return visitor.entities;
}
