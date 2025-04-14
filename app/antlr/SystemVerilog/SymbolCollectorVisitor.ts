import {
  Module_declarationContext,
  Program_declarationContext,
  Interface_declarationContext,
  Package_declarationContext,
  Class_declarationContext,
} from "./generated/SystemVerilogParser";

import { AbstractParseTreeVisitor } from "antlr4ts/tree";
import { SystemVerilogParserVisitor } from "./generated/SystemVerilogParserVisitor";
import { SymbolInfo, SymbolTable } from "./symbolTable";
import { DescriptionContext, Source_textContext } from "./generated/SystemVerilogParser";

// Track last visit time for each file
const lastVisitTime: Record<string, number> = {};

export class SymbolCollectorVisitor
  extends AbstractParseTreeVisitor<void>
  implements SystemVerilogParserVisitor<void>
{
  constructor(private readonly uri: string) {
    super();
  }
  public symbolTable: SymbolTable = {};

  visitModule_declaration(ctx: Module_declarationContext): void {
    const header = ctx.module_header?.();
    const modIdent = header?.module_identifier?.();
    const ident = modIdent?.identifier?.();
    const simple = ident?.simple_identifier?.();
    const token = simple?.start;
  
    if (simple && token) {
      const name = simple.text;
      this.symbolTable[name] = {
        name,
        line: token.line,
        column: token.charPositionInLine,
        uri: this.uri,
        type: 'module'
      };
    }
  
    this.visitChildren(ctx);
  }

  visitProgram_declaration(ctx: Program_declarationContext): void {
    const ident = ctx.program_identifier()?.identifier()?.simple_identifier();
    const token = ident?.start;
  
    if (ident && token) {
      const name = ident.text;
      this.symbolTable[name] = {
        name,
        line: token.line,
        column: token.charPositionInLine,
        uri: this.uri,
        type: 'program'
      };
    }
  
    this.visitChildren(ctx);
  }
  
  visitInterface_declaration(ctx: Interface_declarationContext): void {
    const header = ctx.interface_header?.();
    const intfIdent = header?.interface_identifier?.();
    const ident = intfIdent?.identifier?.();
    const simple = ident?.simple_identifier?.();
    const token = simple?.start;
  
    if (simple && token) {
      const name = simple.text;
      this.symbolTable[name] = {
        name,
        line: token.line,
        column: token.charPositionInLine,
        uri: this.uri,
        type: 'interface'
      };
    }
  
    this.visitChildren(ctx);
  }
  
  visitPackage_declaration(ctx: Package_declarationContext): void {
    const ident = ctx.package_identifier()?.identifier()?.simple_identifier();
    const token = ident?.start;
  
    if (ident && token) {
      const name = ident.text;
      this.symbolTable[name] = {
        name,
        line: token.line,
        column: token.charPositionInLine,
        uri: this.uri,
        type: 'package'
      };
    }
  
    this.visitChildren(ctx);
  }
  
  visitClass_declaration(ctx: Class_declarationContext): void {
    const ident = ctx.class_identifier()?.identifier()?.simple_identifier();
    const token = ident?.start;
  
    if (ident && token) {
      const name = ident.text;
      this.symbolTable[name] = {
        name,
        line: token.line,
        column: token.charPositionInLine,
        uri: this.uri,
        type: 'class'
      };
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
    
    // Only log if it's been more than 1 second since last visit
    if (now - lastVisit > 1000 && Object.keys(this.symbolTable).length > 0) {
      console.log(`[SymbolCollectorVisitor] Found ${Object.keys(this.symbolTable).length} symbols in ${this.uri}`);
      lastVisitTime[this.uri] = now;
    }
    return;
  }
}
  