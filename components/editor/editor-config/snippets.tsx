import * as monaco from "monaco-editor/esm/vs/editor/editor.api";

let snippetsCache: { [key: string]: any } = {};
let languageCompletionProviders: { [key: string]: boolean } = {};

const languageToSnippetFileMap: { [key: string]: string } = {
    systemverilog: "systemverilog.json",
};

export async function loadSnippets(language: string) {
    const snippetFile = languageToSnippetFileMap[language];

    if (!snippetFile || snippetsCache[language]) {
        return;
    }

    try {
        console.log(`Fetching snippets for ${language}`);
        const response = await fetch(`/${snippetFile}`);
        const snippets = await response.json();
        snippetsCache[language] = snippets;

        if (languageCompletionProviders[language]) {
            return;
        }

        languageCompletionProviders[language] = true;

        monaco.languages.registerCompletionItemProvider(language, {
            provideCompletionItems: (model, position) => {
                const word = model.getWordUntilPosition(position);
                const range = new monaco.Range(
                    position.lineNumber,
                    word.startColumn,
                    position.lineNumber,
                    word.endColumn
                );

                const suggestions = Object.entries(snippets)
                    .map(([key, snippet]: [string, any]) => ({
                        label: snippet.prefix,
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: Array.isArray(snippet.body) ? snippet.body.join("\n") : snippet.body,
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: snippet.description,
                        range,
                    }))
                    .filter((suggestion, index, self) =>
                        index === self.findIndex((t) => t.label === suggestion.label)
                    );

                return { suggestions };
            },
        });

    } catch (error) {
        console.error("Error fetching snippets:", error);
    }
}
