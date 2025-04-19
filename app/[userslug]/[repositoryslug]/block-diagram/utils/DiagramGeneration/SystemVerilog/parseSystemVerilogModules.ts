import { CharStreams, CommonTokenStream } from 'antlr4ts';
import { AbstractParseTreeVisitor } from 'antlr4ts/tree/AbstractParseTreeVisitor';
import { ParseTree } from 'antlr4ts/tree/ParseTree';
import { SystemVerilogLexer } from "@/app/antlr/SystemVerilog/generated/SystemVerilogLexer";
import { SystemVerilogParser } from "@/app/antlr/SystemVerilog/generated/SystemVerilogParser";
import { SystemVerilogParserVisitor } from "@/app/antlr/SystemVerilog/generated/SystemVerilogParserVisitor";
import * as parser from '@/app/antlr/SystemVerilog/generated/SystemVerilogParser';

// Интерфейсы для представления модулей и портов
export interface ModulePort {
    name: string;
    direction: 'input' | 'output' | 'inout';
    type?: string;
    width?: number;
}

export interface ParsedModule {
    name: string;
    ports: ModulePort[];
}

// Visitor для сбора информации о модулях и их портах
class ModuleVisitor 
    extends AbstractParseTreeVisitor<void>
    implements SystemVerilogParserVisitor<void> {
    
    public modules: ParsedModule[] = [];
    private currentModule: ParsedModule | null = null;

    constructor() {
        super();
    }

    protected defaultResult(): void {
        return;
    }

    // Переопределяем метод visitChildren для обхода всех узлов
    visitChildren(ctx: ParseTree): void {
        for (let i = 0; i < ctx.childCount; i++) {
            const child = ctx.getChild(i);
            child.accept(this);
        }
    }

    visitSource_text(ctx: parser.Source_textContext): void {
        this.visitChildren(ctx);
    }

    visitDescription(ctx: parser.DescriptionContext): void {
        this.visitChildren(ctx);
    }

    visitModule_declaration(ctx: parser.Module_declarationContext): void {
        // Получаем имя модуля из заголовка
        const moduleHeader = ctx.module_header();
        if (moduleHeader) {
            const moduleIdentifier = moduleHeader.module_identifier();
            if (moduleIdentifier) {
                const moduleName = moduleIdentifier.text;
                
                this.currentModule = {
                    name: moduleName,
                    ports: []
                };
                
                // Обрабатываем порты модуля
                const portList = moduleHeader.list_of_port_declarations();
                if (portList) {
                    this.visitList_of_port_declarations(portList);
                }
                
                // Добавляем модуль в список
                this.modules.push(this.currentModule);
                this.currentModule = null;
            }
        }
        
        // Продолжаем обход дерева
        this.visitChildren(ctx);
    }

    visitList_of_port_declarations(ctx: parser.List_of_port_declarationsContext): void {
        // Обрабатываем все объявления портов
        const portDeclarations = ctx.port_decl();
        if (portDeclarations) {
            for (let i = 0; i < portDeclarations.length; i++) {
                // Получаем объявление порта ANSI из port_decl
                const ansiPortDecl = portDeclarations[i].ansi_port_declaration();
                if (ansiPortDecl) {
                    this.visitAnsi_port_declaration(ansiPortDecl);
                }
            }
        }
    }

    visitAnsi_port_declaration(ctx: parser.Ansi_port_declarationContext) {
        if (!this.currentModule) return;
        const id = ctx.port_identifier();
        if (!id) return;

        // 1) имя и направление
        const portName = id.text;
        let direction: 'input'|'output'|'inout' = 'input';
        const pd = ctx.port_direction()?.text;
        if (pd === 'output') direction = 'output';
        else if (pd === 'inout') direction = 'inout';

        // 2) разберём явный vs неявный тип
        const explicitTypeCtx = ctx.data_type();
        const implicitTypeCtx = ctx.implicit_data_type();

        let typeStr: string|undefined;
        let width = 1;
        let dims: parser.Packed_dimensionContext[] = [];

        if (explicitTypeCtx) {
            // явный data_type
            typeStr = explicitTypeCtx.getChild(0).text;                // базовый токен: logic/bit/reg/…
            dims = explicitTypeCtx.packed_dimension();                 // все [MSB:LSB]
        } else if (implicitTypeCtx) {
            // неявный — по умолчанию logic
            typeStr = 'logic';
            dims = implicitTypeCtx.packed_dimension();
        }

        // 3) вычисляем ширину (берём первый диапазон, если есть)
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

        this.currentModule.ports.push({ name: portName, direction, type: typeStr, width });
    }
}

// Функция для парсинга модулей SystemVerilog
export function parseSystemVerilogModules(svText: string): ParsedModule[] {
    try {
        // Создаем лексер и парсер
        const inputStream = CharStreams.fromString(svText);
        const lexer = new SystemVerilogLexer(inputStream);
        const tokenStream = new CommonTokenStream(lexer);
        const parser = new SystemVerilogParser(tokenStream);
        
        // Парсим входной текст
        const tree = parser.source_text();
        
        // Создаем и запускаем посетителя
        const visitor = new ModuleVisitor();
        visitor.visit(tree);
        
        // Возвращаем собранные модули
        return visitor.modules;
    } catch (error) {
        console.error('Error parsing SystemVerilog modules:', error);
        return [];
    }
}
