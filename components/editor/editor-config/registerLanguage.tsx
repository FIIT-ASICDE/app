import { parseAndCollectSymbols as parseSystemVerilog } from "@/antlr/SystemVerilog/utilities/monacoEditor/parseAndCollectSymbols";
import { registerParser } from "@/antlr/SystemVerilog/utilities/monacoEditor/parserRegistry";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";

import { registerDefinitionProvider } from "@/components/editor/editor-config/definitionProvider";
import { loadSnippets } from "@/components/editor/editor-config/snippets";

export async function registerLanguageSupport(
    language: string,
    pendingNavigationRef?: React.MutableRefObject<{
        uri: monaco.Uri;
        range: monaco.IRange;
    } | null>,
) {
    switch (language.toLowerCase()) {
        case "systemverilog":
            await loadSnippets(language);
            registerDefinitionProvider(language, pendingNavigationRef);
            registerParser(language, parseSystemVerilog);
            break;

        case "verilog":
            //await loadSnippets(language);
            //registerDefinitionProvider("verilog");
            break;

        case "vhdl":
            await loadSnippets(language);
            //registerDefinitionProvider("vhdl");
            break;

        default:
            console.warn(`Unsupported language: ${language}`);
    }
}
