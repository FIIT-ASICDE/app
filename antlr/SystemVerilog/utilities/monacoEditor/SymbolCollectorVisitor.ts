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
  Variable_decl_assignmentContext,
} from "../../grammar/generated/SystemVerilogParser";

import { AbstractParseTreeVisitor } from "antlr4ts/tree";
import { SystemVerilogParserVisitor } from "../../grammar/generated/SystemVerilogParserVisitor";
import {
  SymbolInfo,
  ModuleSymbolInfo,
  FunctionSymbolInfo,
  TaskSymbolInfo,
  TypedefSymbolInfo,
  ClassSymbolInfo,
  PackageSymbolInfo,
  ProgramSymbolInfo,
  InterfaceSymbolInfo,
  PortInfo,
  VariableSymbolInfo,
} from "./symbolTable";

const lastVisitTime: Record<string, number> = {};

export class SymbolCollectorVisitor
  extends AbstractParseTreeVisitor<void>
  implements SystemVerilogParserVisitor<void>
{
  constructor(private readonly uri: string) {
    super();
  }

  private scopeStack: string[] = [];
  private scopeRanges: { name: string; startLine: number; endLine: number }[] = [];
  private currentScopeStartLine: number | null = null;

  private enterScope(scopeName: string, ctx: { start: { line: number } }) {
    this.scopeStack.push(scopeName);
    this.currentScopeStartLine = ctx.start.line;
  }

  private exitScope(ctx: { stop?: { line: number } }) {
    const name = this.scopeStack.pop();
    if (name && this.currentScopeStartLine !== null) {
      this.scopeRanges.push({
        name,
        startLine: this.currentScopeStartLine,
        endLine: ctx.stop?.line ?? this.currentScopeStartLine,
      });
    }
    this.currentScopeStartLine = null;
  }
  

  private get currentScope(): string {
    return this.scopeStack[this.scopeStack.length - 1] ?? "<global>";
  }

  private symbolTable: Record<string, SymbolInfo[]> = {};

public getSymbolTable(): Record<string, SymbolInfo[]> {
  return this.symbolTable;
}
public getSymbols(): SymbolInfo[] {
  return this.symbolTable[this.uri] ?? [];
}

public getScopeRanges(): { name: string; startLine: number; endLine: number }[] {
  return this.scopeRanges;
}

  private addSymbol(type: SymbolInfo["type"], ident?: { text: string; start: any }, ports?: PortInfo[]) {
    if (!ident || !ident.start) return;
    const { text: name, start } = ident;

    const common = {
      name,
      uri: this.uri,
      line: start.line,
      column: start.charPositionInLine,
      scope: this.currentScope,
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
      case "variable":
        symbol = { ...common, type } satisfies VariableSymbolInfo;
        break;  
      default:
        return;
    }

    this.symbolTable[this.uri] ??= [];
    this.symbolTable[this.uri].push(symbol);
  }

  visitVariable_decl_assignment(ctx: Variable_decl_assignmentContext) {
    const ident = ctx.variable_identifier()
      ?.identifier()
      ?.simple_identifier?.();
    this.addSymbol("variable", ident);
    this.visitChildren(ctx);
  }
  
    private extractPorts(ctx: any): PortInfo[] {
        const portDeclCtx = ctx?.module_header?.()?.list_of_port_declarations?.()
            ?? ctx?.interface_header?.()?.list_of_port_declarations?.()
            ?? ctx?.program_header?.()?.list_of_port_declarations?.();

        if (!portDeclCtx) return [];

        const ports: PortInfo[] = [];

        function walk(node: any) {
            if (!node || !node.children) return;
            for (const child of node.children) {
                if (typeof child.port_identifier === "function") {
                    const ident = child.port_identifier?.();
                    const direction = typeof child.port_direction === "function"
                        ? child.port_direction()?.text ?? "unknown"
                        : "unknown";
                    const datatype = typeof child.data_type === "function"
                        ? child.data_type()?.text ?? "unknown"
                        : "unknown";

                    if (ident?.text) {
                        ports.push({
                            name: ident.text,
                            direction,
                            datatype,
                        });
                    }
                } else {
                    walk(child);
                }
            }
        }

        walk(portDeclCtx);
        return ports;
    }


  private extractFunctionParams(ctx: Function_body_declarationContext | Task_body_declarationContext): { name: string; start: any }[] {
    const params: { name: string; start: any }[] = [];
    const portItems = ctx.tf_port_list?.()?.tf_port_item() ?? [];
  
    for (const item of portItems) {
      const ident = item.tf_port_id?.()?.port_identifier?.()?.identifier?.()?.simple_identifier?.();
      if (ident?.start) {
        params.push({ name: ident.text, start: ident.start });
      }
    }
  
    return params;
  }

  visitModule_declaration(ctx: Module_declarationContext): void {
    const ident = ctx.module_header?.()
      ?.module_identifier?.()
      ?.identifier?.()
      ?.simple_identifier?.();
  
    if (ident) {
      this.enterScope(ident.text, ctx);
      const ports = this.extractPorts(ctx);
      this.addSymbol("module", ident, ports);
      if (ports) {
        for (const port of ports) {
          this.addSymbol("variable", {
            text: port.name,
            start: ident.start
          });
        }
      }
    }
  
    this.visitChildren(ctx);
  
    if (ident) {
      this.exitScope(ctx);
    }
  }
  

  visitProgram_declaration(ctx: Program_declarationContext): void {
    const ident = ctx.program_identifier?.()
      ?.identifier?.()
      ?.simple_identifier?.();
    if (ident) {
      this.enterScope(ident.text, ctx);
      const ports = this.extractPorts(ctx);
      this.addSymbol("program", ident, ports);
      if (ports) {
        for (const port of ports) {
          this.addSymbol("variable", {
            text: port.name,
            start: ident.start
          });
        }
      }
    }
  
    this.visitChildren(ctx);
  
    if (ident) {
      this.exitScope(ctx);
    }
  }

  visitInterface_declaration(ctx: Interface_declarationContext): void {
    const ident = ctx.interface_header?.()
      ?.interface_identifier?.()
      ?.identifier?.()
      ?.simple_identifier?.();
  
    if (ident) {
      this.enterScope(ident.text, ctx);
      const ports = this.extractPorts(ctx);
      this.addSymbol("interface", ident, ports);
  
      for (const port of ports) {
        this.addSymbol("variable", {
          text: port.name,
          start: ident.start,
        });
      }
    }
  
    this.visitChildren(ctx);
  
    if (ident) {
      this.exitScope(ctx);
    }
  }
  

  visitPackage_declaration(ctx: Package_declarationContext): void {
    const ident = ctx.package_identifier?.()
      ?.identifier?.()
      ?.simple_identifier?.();
    if (ident) {
      this.enterScope(ident.text, ctx);
      this.addSymbol("package", ident);
    }
  
    this.visitChildren(ctx);
  
    if (ident) {
      this.exitScope(ctx);
    }
  }

  visitClass_declaration(ctx: Class_declarationContext): void {
    const ident = ctx.class_identifier?.()
      ?.identifier?.()
      ?.simple_identifier?.();
    if (ident) {
      this.enterScope(ident.text, ctx);
      this.addSymbol("class", ident);
    }
  
    this.visitChildren(ctx);
  
    if (ident) {
      this.exitScope(ctx);
    }
  }

  visitFunction_body_declaration(ctx: Function_body_declarationContext): void {
    const identCtx = ctx.function_identifier()?.identifier?.();
    const simple = identCtx?.simple_identifier?.();
  
    if (simple) {
      this.enterScope(simple.text, ctx);
      this.addSymbol("function", simple);
  
      const params = this.extractFunctionParams(ctx);
      for (const param of params) {
        this.addSymbol("variable", {
          text: param.name,
          start: param.start
        });
      }
  
      this.visitChildren(ctx);
  
      this.exitScope(ctx);
    } else {
      this.visitChildren(ctx);
    }
  }

  visitTask_body_declaration(ctx: Task_body_declarationContext): void {
    const identCtx = ctx.task_identifier()?.identifier?.();
    const simple = identCtx?.simple_identifier?.();
  
    if (simple) {
      this.enterScope(simple.text, ctx);
      this.addSymbol("task", simple);
  
      const params = this.extractFunctionParams(ctx);
      for (const param of params) {
        this.addSymbol("variable", {
          text: param.name,
          start: param.start
        });
      }
  
      this.visitChildren(ctx);
  
      this.exitScope(ctx);
    } else {
      this.visitChildren(ctx);
    }
  }
  

  visitType_declaration(ctx: Type_declarationContext): void {
    const typedef = ctx.TYPEDEF();
    if (!typedef) return;
  
    // Get the last type_identifier as the typedef name
    const typeIdents = ctx.type_identifier?.() ?? [];
    const lastIdent = typeIdents[typeIdents.length - 1];
  
    const ident = lastIdent?.identifier?.()?.simple_identifier?.();
    if (ident?.start) {
      this.addSymbol("typedef", ident);
    }
  
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
