import { AbstractParseTreeVisitor } from 'antlr4ts/tree/AbstractParseTreeVisitor';
import { SystemVerilogParserVisitor } from '@/app/antlr/SystemVerilog/generated/SystemVerilogParserVisitor';
import * as parser from '@/app/antlr/SystemVerilog/generated/SystemVerilogParser';
import { ParseTree } from 'antlr4ts/tree/ParseTree';

export interface StructField {
    name: string;
    type: string;
    startBit: number;
    endBit: number;
    bandwidth: number;
}

export interface StructType {
    name: string;
    fields: StructField[];
    isPacked: boolean;
}

export interface Package {
    name: string;
    structs: StructType[];
}

export class PackageStructVisitor 
    extends AbstractParseTreeVisitor<void>
    implements SystemVerilogParserVisitor<void> {
    
    public packages: Package[] = [];
    private currentPackage: Package | null = null;
    private currentStruct: StructType | null = null;
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

    visitSource_text(ctx: parser.Source_textContext): void {
        console.log("Visiting source text");
        this.visitChildren(ctx);
    }

    visitDescription(ctx: parser.DescriptionContext): void {
        console.log("Visiting description");
        this.visitChildren(ctx);
    }

    visitPackage_declaration(ctx: parser.Package_declarationContext): void {
        console.log("Visiting package declaration");
        // Получаем имя пакета
        const packageIdentifier = ctx.package_identifier();
        if (packageIdentifier) {
            const packageName = packageIdentifier.text;
            console.log(`Found package: ${packageName}`);
            
            this.currentPackage = {
                name: packageName,
                structs: []
            };
            
            // Обходим все дочерние узлы
            this.visitChildren(ctx);
            
            // Добавляем пакет в список
            this.packages.push(this.currentPackage);
            this.currentPackage = null;
        }
    }

    visitPkg_decl_item(ctx: parser.Pkg_decl_itemContext): void {
        console.log("Visiting package declaration item");
        this.visitChildren(ctx);
    }

    visitPackage_item(ctx: parser.Package_itemContext): void {
        console.log("Visiting package item");
        this.visitChildren(ctx);
    }

    visitPackage_or_generate_item_declaration(ctx: parser.Package_item_declarationContext): void {
        console.log("Visiting package or generate item declaration");
        this.visitChildren(ctx);
    }

    visitData_declaration(ctx: parser.Data_declarationContext): void {
        console.log("Visiting data declaration");
        this.visitChildren(ctx);
    }

    visitType_declaration(ctx: parser.Type_declarationContext): void {
        console.log("Visiting type declaration");
        
        // Проверяем, есть ли typedef
        let hasTypedef = false;
        for (let i = 0; i < ctx.childCount; i++) {
            const child = ctx.getChild(i);
            if (child.text === 'typedef') {
                hasTypedef = true;
                break;
            }
        }
        
        if (hasTypedef) {
            console.log("Found typedef");
            
            // Получаем data_type
            const dataType = ctx.data_type();
            if (dataType) {
                // Проверяем, есть ли struct_union
                const structUnion = this.findStructUnion(dataType);
                if (structUnion && structUnion.text.includes('struct')) {
                    console.log("Found struct typedef");
                    
                    // Получаем имя структуры
                    const typeIdentifiers = ctx.type_identifier();
                    if (typeIdentifiers && typeIdentifiers.length > 0 && this.currentPackage) {
                        // Берем первый элемент из массива type_identifier
                        const structName = typeIdentifiers[0].text;
                        console.log(`Struct name: ${structName}`);
                        
                        // Проверяем, есть ли packed
                        const isPacked = this.isStructPacked(dataType);
                        
                        this.currentStruct = {
                            name: structName,
                            fields: [],
                            isPacked
                        };
                        
                        this.bitPointer = 0; // Сбрасываем указатель битов для новой структуры
                        
                        // Обрабатываем поля структуры
                        this.processStructFields(dataType);
                        
                        // Добавляем структуру в текущий пакет
                        this.currentPackage.structs.push(this.currentStruct);
                        this.currentStruct = null;
                    }
                }
            }
        }
    }

    // Вспомогательный метод для поиска struct_union в data_type
    private findStructUnion(ctx: parser.Data_typeContext): any {
        for (let i = 0; i < ctx.childCount; i++) {
            const child = ctx.getChild(i);
            if (child.text === 'struct' || child.text === 'union') {
                return child;
            }
        }
        return null;
    }

    // Вспомогательный метод для проверки, является ли структура packed
    private isStructPacked(ctx: parser.Data_typeContext): boolean {
        for (let i = 0; i < ctx.childCount; i++) {
            const child = ctx.getChild(i);
            if (child.text === 'packed') {
                return true;
            }
        }
        return false;
    }

    // Вспомогательный метод для обработки полей структуры
    private processStructFields(ctx: parser.Data_typeContext): void {
        if (!this.currentStruct) return;
        
        // Ищем struct_union_member в дочерних узлах
        for (let i = 0; i < ctx.childCount; i++) {
            const child = ctx.getChild(i);
            if (child.constructor.name.includes('Struct_union_memberContext')) {
                this.processStructMember(child);
            }
        }
    }

    // Вспомогательный метод для обработки одного поля структуры
    private processStructMember(ctx: any): void {
        console.log("Processing struct member");
        if (!this.currentStruct) return;
        
        // Получаем тип поля
        let fieldType = '';
        let bandwidth = 1;
        let high: number | undefined;
        let low: number | undefined;
        
        // Получаем data_type_or_void
        const dataTypeOrVoid = ctx.data_type_or_void ? ctx.data_type_or_void() : null;
        if (dataTypeOrVoid) {
            fieldType = dataTypeOrVoid.text;
            
            // Проверяем, есть ли диапазон битов
            const dataType = dataTypeOrVoid.data_type ? dataTypeOrVoid.data_type() : null;
            if (dataType) {
                const packedDimension = dataType.packed_dimension ? dataType.packed_dimension() : null;
                if (packedDimension && packedDimension.length > 0) {
                    const range = packedDimension[0].constant_range ? packedDimension[0].constant_range() : null;
                    if (range) {
                        const constantExpressions = range.constant_expression ? range.constant_expression() : null;
                        if (constantExpressions && constantExpressions.length >= 2) {
                            // Пытаемся извлечь числовые значения для диапазона
                            try {
                                high = parseInt(constantExpressions[0].text, 10);
                                low = parseInt(constantExpressions[1].text, 10);
                                bandwidth = Math.abs(high - low) + 1;
                                console.log(`Field range: [${high}:${low}], bandwidth: ${bandwidth}`);
                            } catch (e) {
                                // Если не удалось преобразовать в числа, используем значение по умолчанию
                                bandwidth = 1;
                            }
                        }
                    }
                }
            }
        } else {
            fieldType = 'logic'; // Значение по умолчанию
        }
        
        // Получаем имя поля
        const listOfVariableDecl = ctx.list_of_variable_decl_assignments ? ctx.list_of_variable_decl_assignments() : null;
        if (listOfVariableDecl) {
            const variableDecl = listOfVariableDecl.variable_decl_assignment ? listOfVariableDecl.variable_decl_assignment() : null;
            if (variableDecl && variableDecl.length > 0) {
                for (const decl of variableDecl) {
                    const variableIdentifier = decl.variable_identifier ? decl.variable_identifier() : null;
                    if (variableIdentifier) {
                        const fieldName = variableIdentifier.text;
                        console.log(`Field name: ${fieldName}, type: ${fieldType}`);
                        
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
    }
}
