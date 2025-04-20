import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import { InterfaceSymbolInfo, ModuleSymbolInfo, ProgramSymbolInfo, symbolTableManager } from "@/app/antlr/SystemVerilog/symbolTable";

let snippetsCache: { [key: string]: any } = {};
let languageCompletionProviders: { [key: string]: boolean } = {};

const languageToSnippetFileMap: { [key: string]: string } = {
  systemverilog: "systemverilog.json",
  vhdl: "vhdl.json",
  verilog: "verilog.json",
};

export async function loadSnippets(language: string) {
  const snippetFile = languageToSnippetFileMap[language];

  if (!snippetFile || snippetsCache[language]) {
    return;
  }

  try {
    const response = await fetch(`/snippets/${snippetFile}`);
    const snippets = await response.json();
    snippetsCache[language] = snippets;

    if (languageCompletionProviders[language]) {
      return;
    }

    languageCompletionProviders[language] = true;

    monaco.languages.registerCompletionItemProvider(language, {
      provideCompletionItems: (model, position) => {
        const wordInfo = model.getWordUntilPosition(position);
        const word = wordInfo.word;
        const range = new monaco.Range(
          position.lineNumber,
          wordInfo.startColumn,
          position.lineNumber,
          wordInfo.endColumn
        );

        const staticSuggestions = Object.entries(snippets).map(
          ([key, snippet]: [string, any]) => ({
            label: snippet.prefix,
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: Array.isArray(snippet.body)
              ? snippet.body.join("\n")
              : snippet.body,
            insertTextRules:
              monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: snippet.description,
            range,
          })
        );

        const dynamicSuggestions: monaco.languages.CompletionItem[] = [];

        if (language === "systemverilog") {
          const allSymbols = symbolTableManager.getAllSymbols();
          const matchingModules = Object.values(allSymbols).filter(
            (s): s is ModuleSymbolInfo | InterfaceSymbolInfo | ProgramSymbolInfo =>
              (s.type === "module" || s.type === "interface" || s.type === "program") &&
              s.name.toLowerCase().startsWith(word.toLowerCase()) &&
              Array.isArray(s.ports)
          );
          
          
          for (const symbol of matchingModules) {
            const instanceName = `\${0:u_${symbol.name}}`;
            const portLines = symbol.ports.map((p, i) => `  .${p}(\${${i + 1}:${p}})`);
          
            dynamicSuggestions.push({
              label: `${symbol.name} instantiation`,
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: `${symbol.name} ${instanceName} (\n${portLines.join(",\n")}\n);`,
              insertTextRules:
                monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: `Instantiates ${symbol.name} with its ports`,
              range,
            });
          }
          
        }

        const suggestions = [
          ...staticSuggestions,
          ...dynamicSuggestions,
        ].filter(
          (s, i, arr) => arr.findIndex((t) => t.label === s.label) === i
        );

        return { suggestions };
      },
    });
  } catch (error) {
    console.error("Error fetching snippets:", error);
  }
}
