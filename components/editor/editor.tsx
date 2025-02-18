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
    autoDetectHighContrast?: boolean;
    readOnly?: boolean;
}

export default function Editor({
    filePath,
    language = "systemverilog",
    theme = "vs-dark",
    autoDetectHighContrast = false,
    readOnly,
}: EditorProps) {
    const editor = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
    const monacoEl = useRef<HTMLElement | null>(null);

    useEffect(() => {
        if (!monacoEl.current || editor.current) {
            return;
        }

        editor.current = monaco.editor.create(monacoEl.current, {
            language,
            theme,
            autoDetectHighContrast,
            readOnly,
        });

        if (process.env.NODE_ENV === "production") {
            const ydoc = new Y.Doc();
            const provider = new WebsocketProvider(
                process.env.NEXT_PUBLIC_EDITOR_SERVER_URL ??
                    "wss://ide.drasic.com/ws",
                "connect",
                ydoc,
                { params: { filePath } },
            );

            const type = ydoc.getText("monaco");
            new MonacoBinding(
                type,
                editor.current.getModel()!,
                new Set([editor.current]),
                provider.awareness,
            );
        }
    });

    return <main className="h-full w-full" ref={monacoEl}></main>;
}
