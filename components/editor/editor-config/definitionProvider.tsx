
  import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import { symbolIndex } from "@/app/antlr/SystemVerilog/symbolTable";
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

      const allSymbols = Object.values(symbolIndex).flatMap((table) =>
        Object.values(table)
      );

      const symbol = allSymbols.find((s) => s.name === word.word);
      if (!symbol) return;

      const targetUri = monaco.Uri.parse(symbol.uri);
      const range = new monaco.Range(
        symbol.line,
        symbol.column,
        symbol.line,
        symbol.column + symbol.name.length
      );

      const isSameFile = symbol.uri === model.uri.toString();

      if (!isSameFile && pendingNavigationRef) {
        pendingNavigationRef.current = { uri: targetUri, range };
        return null; // 👈 prevent auto jump on hover
      }

      return { uri: targetUri, range };
    },
  });
}
