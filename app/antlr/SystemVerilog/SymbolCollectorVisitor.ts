import {
  Module_declarationContext,
  Program_declarationContext,
  Interface_declarationContext,
  Package_declarationContext,
  Class_declarationContext,
  Function_declarationContext,
  Task_declarationContext,
  Type_declarationContext,
  DescriptionContext,
  Source_textContext,
  Function_identifierContext,
  IdentifierContext,
  Package_item_declarationContext,
  Function_body_declarationContext,
  Task_body_declarationContext,
} from "./generated/SystemVerilogParser";

import { AbstractParseTreeVisitor } from "antlr4ts/tree";
import { SystemVerilogParserVisitor } from "./generated/SystemVerilogParserVisitor";
import { SymbolInfo, SymbolTable } from "./symbolTable";

const lastVisitTime: Record<string, number> = {};

export class SymbolCollectorVisitor
  extends AbstractParseTreeVisitor<void>
  implements SystemVerilogParserVisitor<void>
{
  constructor(private readonly uri: string) {
    super();
  }

  public symbolTable: SymbolTable = {};

  private addSymbol(type: SymbolInfo["type"], ident?: { text: string; start: any }) {
    if (!ident || !ident.start) return;
    const { text: name, start } = ident;
    this.symbolTable[name] = {
      name,
      line: start.line,
      column: start.charPositionInLine,
      uri: this.uri,
      type,
    };
  }

  visitModule_declaration(ctx: Module_declarationContext): void {
    const ident = ctx.module_header?.()
      ?.module_identifier?.()
      ?.identifier?.()
      ?.simple_identifier?.();
    this.addSymbol("module", ident);
    this.visitChildren(ctx);
  }

  visitProgram_declaration(ctx: Program_declarationContext): void {
    const ident = ctx.program_identifier?.()
      ?.identifier?.()
      ?.simple_identifier?.();
    this.addSymbol("program", ident);
    this.visitChildren(ctx);
  }

  visitInterface_declaration(ctx: Interface_declarationContext): void {
    const ident = ctx.interface_header?.()
      ?.interface_identifier?.()
      ?.identifier?.()
      ?.simple_identifier?.();
    this.addSymbol("interface", ident);
    this.visitChildren(ctx);
  }

  visitPackage_declaration(ctx: Package_declarationContext): void {
    const ident = ctx.package_identifier?.()
      ?.identifier?.()
      ?.simple_identifier?.();
    this.addSymbol("package", ident);
    this.visitChildren(ctx);
  }

  visitClass_declaration(ctx: Class_declarationContext): void {
    const ident = ctx.class_identifier?.()
      ?.identifier?.()
      ?.simple_identifier?.();
    this.addSymbol("class", ident);
    this.visitChildren(ctx);
  }

  visitFunction_body_declaration(ctx: Function_body_declarationContext): void {
    const identCtx = ctx.function_identifier()?.identifier?.();
    const simple = identCtx?.simple_identifier?.();
    this.addSymbol("function", simple);
    this.visitChildren(ctx);
  }
  

  visitTask_body_declaration(ctx: Task_body_declarationContext): void {
    const identCtx = ctx.task_identifier()?.identifier?.();
    const simple = identCtx?.simple_identifier?.();
    this.addSymbol("task", simple);
    this.visitChildren(ctx);
  }

  visitType_declaration(ctx: Type_declarationContext): void {
    const typedef = ctx.TYPEDEF();
    const ident = ctx.data_type?.()
      ?.type_identifier?.()
      ?.identifier?.()
      ?.simple_identifier?.();
    if (typedef) this.addSymbol("typedef", ident);
    this.visitChildren(ctx);
  }

  visitSource_text(ctx: Source_textContext): void {
    return this.visitChildren(ctx);
  }

  visitDescription(ctx: DescriptionContext): void {
    return this.visitChildren(ctx);
  }

  protected defaultResult(): void {
    const now = Date.now();
    const lastVisit = lastVisitTime[this.uri] || 0;
    if (now - lastVisit > 1000 && Object.keys(this.symbolTable).length > 0) {
      lastVisitTime[this.uri] = now;
    }
    return;
  }
}
