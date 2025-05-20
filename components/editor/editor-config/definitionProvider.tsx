import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import { symbolTableManager } from "@/antlr/SystemVerilog/utilities/monacoEditor/symbolTable";
import { trpcClient } from "@/lib/trpc/client";

const registeredLanguages = new Set<string>();
const inFlightRepoLoads: Record<string, Promise<string>> = {};
export const fileContentCache: Record<string, string> = {};

function extractRepoInfoFromUri(uri: monaco.Uri) {
  const pathParts = decodeURIComponent(uri.path).replace(/^\/+/, "").split("/");

  const ownerSlug = decodeURIComponent(uri.authority);
  const repositorySlug = pathParts.shift() || "";
  const path = pathParts.join("/");

  return { ownerSlug, repositorySlug, path };
}

export function registerDefinitionProvider(
  language: string,
  pendingNavigationRef?: React.MutableRefObject<{
    uri: monaco.Uri;
    range: monaco.IRange;
  } | null>
) {
  if (registeredLanguages.has(language)) {
    return;
  }
  registeredLanguages.add(language);

  monaco.languages.registerDefinitionProvider(language, {
    async provideDefinition(model, position) {
      const word = model.getWordAtPosition(position);
      if (!word) return;

      const allSymbols = Object.values(symbolTableManager.getAllSymbols());
      const uriString = model.uri.toString();

      const currentScope = symbolTableManager.getScopeForLine(uriString, position.lineNumber);
      const scopedKey = `${word.word}::${currentScope ?? "<global>"}`;
      const symbol = symbolTableManager.getSymbolByKey(scopedKey)
        ?? allSymbols.find(s => s.name === word.word && s.uri === uriString)
        ?? allSymbols.find(s => s.name === word.word);


      if (!symbol) return;

      const parsedUri = monaco.Uri.parse(symbol.uri);
      const { ownerSlug, repositorySlug, path } = extractRepoInfoFromUri(parsedUri);
      const targetUri = monaco.Uri.parse(`inmemory://${encodeURIComponent(ownerSlug)}/${repositorySlug}/${path}`);

      const range = new monaco.Range(
        symbol.line,
        symbol.column + 1,
        symbol.line,
        symbol.column + symbol.name.length + 1
      );

      if (pendingNavigationRef) {
        pendingNavigationRef.current = { uri: targetUri, range };
      }

      const modelExists = monaco.editor.getModel(targetUri);
      if (!modelExists) {
        try {
          const uriKey = targetUri.toString();

          if (!fileContentCache[uriKey]) {
            if (!inFlightRepoLoads[uriKey]) {
              inFlightRepoLoads[uriKey] = trpcClient.repo.loadRepoItem.query({
                ownerSlug,
                repositorySlug,
                path,
              }).then((res) => {
                if (res.type === "file") {
                  fileContentCache[uriKey] = res.content;
                  if (!monaco.editor.getModel(targetUri)) {
                    monaco.editor.createModel(res.content, language, targetUri);
                  }
                }
                return fileContentCache[uriKey];
              }).catch((e) => {
                console.warn("Failed to load file content", uriKey, e);
                delete inFlightRepoLoads[uriKey];
                return "";
              });
            }
          
            await inFlightRepoLoads[uriKey];
          }
          
        } catch {
          return;
        }
      }
      
      return {
        uri: targetUri,
        range,
        originSelectionRange: new monaco.Range(
          position.lineNumber,
          word.startColumn,
          position.lineNumber,
          word.endColumn
        ),
      };
    },
  });
}
