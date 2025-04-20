import {
  Module_declarationContext,
  Program_declarationContext,
  Interface_declarationContext,
  Package_declarationContext,
  Class_declarationContext,
  Type_declarationContext,
  DescriptionContext,
  Source_textContext,
  Function_body_declarationContext,
  Task_body_declarationContext,
} from "./generated/SystemVerilogParser";

import { AbstractParseTreeVisitor } from "antlr4ts/tree";
import { SystemVerilogParserVisitor } from "./generated/SystemVerilogParserVisitor";
import {
  SymbolInfo,
  SymbolTable,
  ModuleSymbolInfo,
  FunctionSymbolInfo,
  TaskSymbolInfo,
  TypedefSymbolInfo,
  ClassSymbolInfo,
  PackageSymbolInfo,
  ProgramSymbolInfo,
  InterfaceSymbolInfo,
  PortInfo,
} from "./symbolTable";

const lastVisitTime: Record<string, number> = {};

export class SymbolCollectorVisitor
  extends AbstractParseTreeVisitor<void>
  implements SystemVerilogParserVisitor<void>
{
  constructor(private readonly uri: string) {
    super();
  }

  public symbolTable: SymbolTable = {};

  private addSymbol(type: SymbolInfo["type"], ident?: { text: string; start: any }, ports?: PortInfo[]) {
    if (!ident || !ident.start) return;
    const { text: name, start } = ident;

    const common = {
      name,
      uri: this.uri,
      line: start.line,
      column: start.charPositionInLine,
    };

    let symbol: SymbolInfo;

    switch (type) {
      case "module":
        symbol = {
          ...common,
          type,
          ports: ports ?? [],
        } satisfies ModuleSymbolInfo;
        break;
      case "interface":
        symbol = {
          ...common,
          type,
          ports: ports ?? [],
        } satisfies InterfaceSymbolInfo;
        break;
      case "program":
        symbol = {
          ...common,
          type,
          ports: ports ?? [],
        } satisfies ProgramSymbolInfo;
        break;
      case "function":
        symbol = { ...common, type } satisfies FunctionSymbolInfo;
        break;
      case "task":
        symbol = { ...common, type } satisfies TaskSymbolInfo;
        break;
      case "typedef":
        symbol = { ...common, type } satisfies TypedefSymbolInfo;
        break;
      case "class":
        symbol = { ...common, type } satisfies ClassSymbolInfo;
        break;
      case "package":
        symbol = { ...common, type } satisfies PackageSymbolInfo;
        break;
      default:
        return;
    }

    this.symbolTable[name] = symbol;
  }

  private extractPorts(ctx: any): PortInfo[] {
    const portDeclCtx = ctx?.module_header?.()?.list_of_port_declarations?.()
      || ctx?.interface_header?.()?.list_of_port_declarations?.()
      || ctx?.program_header?.()?.list_of_port_declarations?.();
  
    if (!portDeclCtx) return [];
  
    const ports: PortInfo[] = [];
  
    function walk(node: any) {
      if (!node || !node.children) return;
      for (const child of node.children) {
        if (typeof child.port_identifier === "function") {
          const ident = child.port_identifier();
          const direction = child.port_direction().text;
          const datatype = child.data_type().text;
          if (ident?.text) {
            ports.push({name: ident.text, direction: direction, datatype: datatype});
          }
        } else {
          walk(child);
        }
      }
    }
  
    walk(portDeclCtx);
    return ports;
  }

  visitModule_declaration(ctx: Module_declarationContext): void {
    const ident = ctx.module_header?.()
      ?.module_identifier?.()
      ?.identifier?.()
      ?.simple_identifier?.();
    const ports = this.extractPorts(ctx);
    this.addSymbol("module", ident, ports);
    this.visitChildren(ctx);
  }

  visitProgram_declaration(ctx: Program_declarationContext): void {
    const ident = ctx.program_identifier?.()
      ?.identifier?.()
      ?.simple_identifier?.();
    const ports = this.extractPorts(ctx);
    this.addSymbol("program", ident, ports);
    this.visitChildren(ctx);
  }

  visitInterface_declaration(ctx: Interface_declarationContext): void {
    const ident = ctx.interface_header?.()
      ?.interface_identifier?.()
      ?.identifier?.()
      ?.simple_identifier?.();
      const ports = this.extractPorts(ctx);
    this.addSymbol("interface", ident, ports);
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
