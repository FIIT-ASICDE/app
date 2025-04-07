import {
    Module_declarationContext
  } from "./generated/SystemVerilogParser";
  
  import { AbstractParseTreeVisitor } from "antlr4ts/tree";
  import { SystemVerilogParserVisitor } from "./generated/SystemVerilogParserVisitor";
  import { SymbolInfo } from "./symbolTable";
  import { DescriptionContext, Source_textContext } from "./generated/SystemVerilogParser";
  
  export class SymbolCollectorVisitor
    extends AbstractParseTreeVisitor<void>
    implements SystemVerilogParserVisitor<void>
  {
    constructor(private readonly uri: string) {
        super();
      }
    public symbolTable: Record<string, SymbolInfo> = {};
  
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
      return;
    }
  }
  