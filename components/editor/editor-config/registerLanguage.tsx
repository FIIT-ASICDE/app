import { loadSnippets } from "./snippets";
import { registerDefinitionProvider } from "./definitionProvider";

import * as monaco from "monaco-editor/esm/vs/editor/editor.api";

export async function registerLanguageSupport(
    language: string,
    pendingNavigationRef?: React.MutableRefObject<{ uri: monaco.Uri; range: monaco.IRange } | null>
  ) {
    switch (language.toLowerCase()) {
        case "systemverilog":
            await loadSnippets("systemverilog");
            registerDefinitionProvider(language, pendingNavigationRef);
            break;

        case "verilog":
            await loadSnippets("verilog");
            //registerDefinitionProvider("verilog");
            break;

        case "vhdl":
            await loadSnippets("vhdl");
            //registerDefinitionProvider("vhdl");
            break;

        default:
            console.warn(`Unsupported language: ${language}`);
    }
}
