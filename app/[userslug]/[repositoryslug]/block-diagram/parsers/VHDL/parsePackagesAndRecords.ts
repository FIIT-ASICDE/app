import { CharStreams, CommonTokenStream } from 'antlr4ts';
import { vhdlLexer } from '@/app/antlr/VHDL/generated/vhdlLexer';
import { vhdlParser } from '@/app/antlr/VHDL/generated/vhdlParser';
import { AbstractParseTreeVisitor } from 'antlr4ts/tree/AbstractParseTreeVisitor';
import { vhdlVisitor } from '@/app/antlr/VHDL/generated/vhdlVisitor';
import * as parser from '@/app/antlr/VHDL/generated/vhdlParser';
import { ParseTree } from 'antlr4ts/tree/ParseTree';

export interface VhdlStructField {
    name: string;
    type: string;
    startBit: number;
    endBit: number;
    bandwidth: number;
}

export interface VhdlStructType {
    name: string;
    fields: VhdlStructField[];
}

export interface VhdlPackage {
    name: string;
    structs: VhdlStructType[];
}

export class PackageRecordVisitor
    extends AbstractParseTreeVisitor<void>
    implements vhdlVisitor<void> {

    public packages: VhdlPackage[] = [];
    private currentPackage: VhdlPackage | null = null;
    private currentStruct: VhdlStructType | null = null;
    private bitPointer = 0;

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

    visitDesign_file(ctx: parser.Design_fileContext): void {
        console.log("Visiting design file");
        this.visitChildren(ctx);
    }

    visitDesign_unit(ctx: parser.Design_unitContext): void {
        console.log("Visiting design unit");
        this.visitChildren(ctx);
    }

    visitPackage_declaration(ctx: parser.Package_declarationContext): void {
        console.log("Visiting package declaration");

        // Получаем имя пакета
        const identifier = ctx.identifier();
        if (identifier) {
            const packageName = identifier[0].text;
            console.log(`Found package: ${packageName}`);

            this.currentPackage = {
                name: packageName,
                structs: []
            };

            // Обходим декларативную часть пакета
            const packageDeclarativePart = ctx.package_declarative_part();
            if (packageDeclarativePart) {
                console.log("Visiting package declarative part");
                this.visit(packageDeclarativePart);
            }

            // Добавляем пакет в список
            this.packages.push(this.currentPackage);
            this.currentPackage = null;
        }
    }

    visitPackage_declarative_part(ctx: parser.Package_declarative_partContext): void {
        console.log("Processing package declarative part");

        // Обходим все декларативные элементы пакета
        const packageDeclarativeItems = ctx.package_declarative_item();
        if (packageDeclarativeItems) {
            console.log(`Found ${packageDeclarativeItems.length} package declarative items`);
            for (const item of packageDeclarativeItems) {
                this.visit(item);
            }
        }
    }

    visitPackage_declarative_item(ctx: parser.Package_declarative_itemContext): void {
        console.log("Visiting package declarative item");
        this.visitChildren(ctx);
    }

    visitType_declaration(ctx: parser.Type_declarationContext): void {
        console.log("Visiting type declaration");

        // Получаем идентификатор типа
        const identifier = ctx.identifier();
        if (identifier && this.currentPackage) {
            const typeName = identifier.text;
            console.log(`Found type: ${typeName}`);

            // Получаем определение типа
            const typeDefinition = ctx.type_definition();
            if (typeDefinition) {
                // Проверяем, является ли тип записью (record)
                const compositeTypeDefinition = typeDefinition.composite_type_definition();
                if (compositeTypeDefinition) {
                    const recordTypeDefinition = compositeTypeDefinition.record_type_definition();
                    if (recordTypeDefinition) {
                        console.log(`Found record type: ${typeName}`);

                        this.currentStruct = {
                            name: typeName,
                            fields: []
                        };

                        this.bitPointer = 0; // Сбрасываем указатель битов для новой структуры

                        // Обрабатываем элементы записи
                        this.processRecordElements(recordTypeDefinition);

                        // Добавляем структуру в текущий пакет
                        this.currentPackage.structs.push(this.currentStruct);
                        this.currentStruct = null;
                    }
                }
            }
        }
    }

    // Метод для обработки элементов записи
    private processRecordElements(ctx: parser.Record_type_definitionContext): void {
        if (!this.currentStruct) return;

        // Получаем все элементы записи
        const elementDeclarations = ctx.element_declaration();
        if (elementDeclarations) {
            console.log(`Found ${elementDeclarations.length} record elements`);
            for (const element of elementDeclarations) {
                this.processElementDeclaration(element);
            }
        }
    }

    // Обработка декларации элемента
    private processElementDeclaration(ctx: parser.Element_declarationContext): void {
        console.log("Processing element declaration:", ctx.text);
        if (!this.currentStruct) return;

        // Получаем список идентификаторов
        const identifierList = ctx.identifier_list();
        if (identifierList) {
            const identifiers = this.extractIdentifiers(identifierList);

            // В VHDL грамматике subtype_indication находится внутри element_declaration,
            // но не как прямой метод, а как часть структуры
            // Проверяем структуру AST и извлекаем тип
            if (ctx.childCount >= 3) { // Должно быть минимум: идентификаторы, ':', тип
                // Тип обычно находится после символа ':'
                let fieldType = '';
                let subtypeNode = null;

                // Ищем узел, содержащий информацию о типе
                for (let i = 0; i < ctx.childCount; i++) {
                    const child = ctx.getChild(i);
                    if (child.text === ':' && i + 1 < ctx.childCount) {
                        // Тип находится после двоеточия
                        subtypeNode = ctx.getChild(i + 1);
                        fieldType = subtypeNode.text;
                        break;
                    }
                }

                console.log(`Field type: ${fieldType}`);

                // Определяем ширину поля
                let bandwidth = 1;

                if (subtypeNode) {
                    // Проверяем, содержит ли тип информацию о диапазоне
                    bandwidth = this.calculateBandwidthFromText(fieldType);
                    console.log(`Calculated bandwidth: ${bandwidth}`);
                }

                // Добавляем поле для каждого идентификатора
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

    // Вычисление ширины типа из текстового представления
    private calculateBandwidthFromText(typeText: string): number {
        // Текст уже в верхнем регистре, поэтому не нужно преобразовывать

        // Проверяем, является ли тип векторным с указанным диапазоном
        if (typeText.includes('STD_LOGIC_VECTOR') || typeText.includes('BIT_VECTOR')) {
            // Ищем открывающую и закрывающую скобки
            const openParenIndex = typeText.indexOf('(');
            const closeParenIndex = typeText.indexOf(')');

            if (openParenIndex !== -1 && closeParenIndex !== -1) {
                // Извлекаем содержимое скобок
                const rangeText = typeText.substring(openParenIndex + 1, closeParenIndex).trim();

                // Разделяем на левую и правую части относительно DOWNTO или TO
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

        // Проверяем массивы с указанным диапазоном
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

        // Для скалярных типов (STD_LOGIC, BIT и т.д.)
        return 1;
    }

    // Вычисление ширины типа
    private calculateBandwidth(subtypeIndication: parser.Subtype_indicationContext): number {
        // Проверяем, есть ли ограничение диапазона
        const constraint = subtypeIndication.constraint();
        if (constraint) {
            const rangeConstraint = constraint.range_constraint();
            if (rangeConstraint) {
                const range = rangeConstraint.range();
                if (range) {
                    // Получаем левую и правую границы диапазона
                    const simpleExpressions = range.simple_expression();
                    if (simpleExpressions && simpleExpressions.length >= 2) {
                        try {
                            // Пытаемся извлечь числовые значения
                            const leftValue = this.extractNumericValue(simpleExpressions[0]);
                            const rightValue = this.extractNumericValue(simpleExpressions[1]);

                            if (leftValue !== null && rightValue !== null) {
                                // Вычисляем ширину диапазона
                                return Math.abs(leftValue - rightValue) + 1;
                            }
                        } catch (error) {
                            console.error("Error calculating bandwidth:", error);
                        }
                    }
                }
            }
        }

        // Проверяем, является ли тип std_logic_vector или другим векторным типом
        const selectedName = subtypeIndication.selected_name();
        if (selectedName) {
            const typeName = selectedName.text.toLowerCase();
            if (typeName.includes("std_logic_vector")) {
                // Если это std_logic_vector без явного диапазона, предполагаем ширину 1
                return 1;
            }
        }

        // Для скалярных типов (std_logic, bit и т.д.)
        return 1;
    }

    // Извлечение числового значения из выражения
    private extractNumericValue(expression: parser.Simple_expressionContext): number | null {
        const term = expression.term(0);
        if (term) {
            const factor = term.factor(0);
            if (factor) {
                const primary = factor.primary();
                if (primary) {
                    const literal = primary.literal();
                    if (literal) {
                        const numericLiteral = literal.numeric_literal();
                        if (numericLiteral) {
                            const abstractLiteral = numericLiteral.abstract_literal();
                            if (abstractLiteral) {
                                const integerValue = abstractLiteral.INTEGER();
                                if (integerValue) {
                                    return parseInt(integerValue.text);
                                }
                            }
                        }
                    }
                }
            }
        }
        return null;
    }

    // Вспомогательный метод для извлечения идентификаторов из списка
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



export function parsePackagesAndRecords(vhdlText: string): VhdlPackage[] {
    try {
        console.log("Starting VHDL parsing...");
        
        // Преобразуем весь текст в верхний регистр для лексера
        const upperCaseVhdlText = vhdlText.toUpperCase();
        
        // Создаем лексер и парсер
        const inputStream = CharStreams.fromString(upperCaseVhdlText);
        const lexer = new vhdlLexer(inputStream);
        const tokenStream = new CommonTokenStream(lexer);
        const parser = new vhdlParser(tokenStream);
        
        // Парсим входной текст
        console.log("Parsing design file...");
        const tree = parser.design_file();
        
        // Создаем и запускаем посетителя
        console.log("Starting visitor...");
        const visitor = new PackageRecordVisitor();
        visitor.visit(tree);
        
        console.log("Parsing complete.");
        return visitor.packages;
    } catch (error) {
        console.error("Error parsing VHDL:", error);
        return [];
    }
}
