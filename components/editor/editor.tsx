"use client";

import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import { useEffect, useRef } from "react";
import { MonacoBinding } from "y-monaco";
import { WebsocketProvider } from "y-websocket";
import * as Y from "yjs";

interface EditorProps {
    filePath: string;
    language?: string;
    theme?: string;
}

export default function Editor({
    filePath,
    language = "systemverilog",
    theme = "vs-dark",
}: EditorProps) {
    const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
    const monacoEl = useRef<HTMLElement | null>(null);
    const providerRef = useRef<WebsocketProvider | null>(null);
    const ydocRef = useRef<Y.Doc | null>(null);

    useEffect(() => {
        if (!monacoEl.current) return;

        if (editorRef.current) {
            editorRef.current.dispose();
            editorRef.current = null;
        }

        if (providerRef.current) {
            providerRef.current.destroy();
            providerRef.current = null;
        }

        if (ydocRef.current) {
            ydocRef.current.destroy();
            ydocRef.current = null;
        }

        const model = monaco.editor.createModel("", language);
        editorRef.current = monaco.editor.create(monacoEl.current, {
            model,
            language,
            theme,
            automaticLayout: true,
        });

        if (process.env.NODE_ENV === "production") {
            const ydoc = new Y.Doc();
            ydocRef.current = ydoc;

            const provider = new WebsocketProvider(
                process.env.NEXT_PUBLIC_EDITOR_SERVER_URL ??
                    "wss://ide.drasic.com/ws",
                "connect",
                ydoc,
                { params: { filePath } },
            );
            providerRef.current = provider;

            if (editorRef.current) {
                const type = ydoc.getText("monaco");
                new MonacoBinding(
                    type,
                    editorRef.current.getModel()!,
                    new Set([editorRef.current]),
                    provider.awareness,
                );
            }
        }

        return () => {
            if (editorRef.current) {
                editorRef.current.dispose();
                editorRef.current = null;
            }
            if (providerRef.current) {
                providerRef.current.destroy();
                providerRef.current = null;
            }
            if (ydocRef.current) {
                ydocRef.current.destroy();
                ydocRef.current = null;
            }
        };
    }, [filePath, language, theme]);

    return <main className="h-full w-full" ref={monacoEl}></main>;
}
