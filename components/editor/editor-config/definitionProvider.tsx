import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import { symbolTableManager } from "@/app/antlr/SystemVerilog/symbolTable";
import { FileItem, FileDisplayItem } from "@/lib/types/repository";

export function registerDefinitionProvider(
  language: string,
  pendingNavigationRef?: React.MutableRefObject<{
    uri: monaco.Uri;
    range: monaco.IRange;
  } | null>
) {
  monaco.languages.registerDefinitionProvider(language, {
    async provideDefinition(model, position) {
      const word = model.getWordAtPosition(position);
      if (!word) return;

      const allSymbols = Object.values(symbolTableManager.getAllSymbols());

      const symbol = allSymbols.find((s) => s.name === word.word);
      if (!symbol) return;

      // Create a proper URI for the target file
      const targetUri = monaco.Uri.parse(`inmemory://${symbol.uri}`);
      const range = new monaco.Range(
        symbol.line,
        symbol.column,
        symbol.line,
        symbol.column + symbol.name.length
      );

      // Store the navigation state for potential custom handling
      if (pendingNavigationRef) {
        pendingNavigationRef.current = { uri: targetUri, range };
      }

      // Return the location to allow editor navigation
      return { uri: targetUri, range };
    },
  });
}
