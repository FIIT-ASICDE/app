import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import { symbolTableManager } from "@/antlr/SystemVerilog/utilities/monacoEditor/symbolTable";
import { trpcClient } from "@/lib/trpc/client";

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
  monaco.languages.registerDefinitionProvider(language, {
    async provideDefinition(model, position) {
      const word = model.getWordAtPosition(position);
      if (!word) return;

      const allSymbols = Object.values(symbolTableManager.getAllSymbols());
      const symbol = allSymbols.find((s) => s.name === word.word);
      if (!symbol) return;

      const targetUri = monaco.Uri.parse(symbol.uri);
      let targetModel = monaco.editor.getModel(targetUri);

      if (!targetModel) {
        try {
          const { ownerSlug, repositorySlug, path } = extractRepoInfoFromUri(targetUri);
          console.log("Loading file", { path });

          const fileResult = await trpcClient.repo.loadRepoItem.query({
            ownerSlug,
            repositorySlug,
            path,
          });

          if (fileResult.type === "file") {
            try {
              const maybeExisting = monaco.editor.getModel(targetUri);
              if (!maybeExisting) {
                targetModel = monaco.editor.createModel(fileResult.content, "systemverilog", targetUri);
              } else {
                targetModel = maybeExisting;
              }
            } catch (e: any) {
              if (e.message?.includes("already exists")) {
                targetModel = monaco.editor.getModel(targetUri);
              } else {
                throw e;
              }
            }
          }
          
        } catch (err) {
          return;
        }
      }

      if (!targetModel) {
        return;
      }

      const range = new monaco.Range(
        symbol.line,
        symbol.column + 1,
        symbol.line,
        symbol.column + symbol.name.length + 1
      );

      if (pendingNavigationRef) {
        pendingNavigationRef.current = { uri: targetUri, range };
      }

      return { uri: targetUri, range };
    },
  });
}
