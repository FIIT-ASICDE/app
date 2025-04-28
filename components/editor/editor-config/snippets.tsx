import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import { InterfaceSymbolInfo, ModuleSymbolInfo, ProgramSymbolInfo, symbolTableManager } from "@/antlr/SystemVerilog/utilities/monacoEditor/symbolTable";

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

          const matchingSymbols = Object.values(allSymbols).filter(
            (s): s is ModuleSymbolInfo | InterfaceSymbolInfo | ProgramSymbolInfo =>
              (s.type === "module" || s.type === "interface" || s.type === "program") &&
              s.name.toLowerCase().startsWith(word.toLowerCase()) &&
              Array.isArray(s.ports)
          );

          for (const symbol of matchingSymbols) {
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

          const testbenchSymbols = Object.values(allSymbols).filter(
            (s): s is ModuleSymbolInfo =>
              s.type === "module" &&
              s.name.toLowerCase().startsWith(word.toLowerCase()) &&
              Array.isArray(s.ports)
          );

          for (const symbol of testbenchSymbols) {
            const tbName = `tb_${symbol.name}`;
            const dutName = `u_${symbol.name}`;

            const signalDecls = symbol.ports
              .map(p => `  ${p.direction} ${p.datatype} ${p.name};`)
              .join("\n");
          
            const portConns = symbol.ports
              .map((p, i) => `    .${p.name}(\${${i + 1}:${p.name}})`)
              .join(",\n");
          
          

              const insertText = [
                `module ${tbName};`,
                "",
                signalDecls,
                "",
                "// DUT instantiation",
                `${symbol.name} ${dutName} (`,
                portConns,
                ");",
                "",
                "endmodule"
              ].join("\n");

            dynamicSuggestions.push({
              label: `${symbol.name} testbench`,
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: insertText,
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: `Testbench wrapper for ${symbol.name}`,
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
