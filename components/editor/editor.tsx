"use client";

import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import { useEffect, useRef } from "react";
import { MonacoBinding } from "y-monaco";
import { WebsocketProvider } from "y-websocket";
import * as Y from "yjs";
import { registerLanguageSupport } from "./editor-config/registerLanguage";
import { parseAndCollectSymbols } from "@/app/antlr/SystemVerilog/parseAndCollectSymbols";
import { FileItem, FileDisplayItem } from "@/lib/types/repository";
import { on } from "events";

interface EditorProps {
    filePath: string;
    language?: string;
    theme?: string;
    onOpenFile?: (item: FileDisplayItem) => void;
}

export default function Editor({
    filePath,
    language,
    theme = "vs-dark",
    onOpenFile,
}: EditorProps) {
    const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
    const monacoEl = useRef<HTMLElement | null>(null);
    const providerRef = useRef<WebsocketProvider | null>(null);
    const ydocRef = useRef<Y.Doc | null>(null);
    const pendingNavigationRef = useRef<{
      uri: monaco.Uri;
      range: monaco.IRange;
    } | null>(null);

    const loadedLanguages = useRef<Set<string>>(new Set());

    useEffect(() => {
        if (!monacoEl.current) return;
        const uri = monaco.Uri.parse(`inmemory://${filePath}`);
        const model =
          monaco.editor.getModel(uri) ||
          monaco.editor.createModel("", language, uri);
        
        // ✅ Only update model if different
        if (editorRef.current) {
          const currentModel = editorRef.current.getModel();
          if (!currentModel || currentModel.uri.toString() !== model.uri.toString()) {
            editorRef.current.setModel(model);
          }
        } else {
          editorRef.current = monaco.editor.create(monacoEl.current, {
            model,
            language,
            theme,
            automaticLayout: true,
          });

          editorRef.current?.onMouseDown((event) => {
            if (
              event.event.ctrlKey &&
              pendingNavigationRef.current &&
              event.target.type === monaco.editor.MouseTargetType.CONTENT_TEXT
            ) {
              const { uri, range } = pendingNavigationRef.current;
              const model = monaco.editor.getModel(uri);
          
              if (model) {
                editorRef.current!.setModel(model);
                editorRef.current!.revealRangeInCenter(range);
                editorRef.current!.setPosition({
                  lineNumber: range.startLineNumber,
                  column: range.startColumn,
                });
                editorRef.current!.focus();
              }else if (onOpenFile) {
                const fileName = uri.path.split("/").pop() || "untitled";
                onOpenFile({
                  type: "file-display",
                  name: fileName,
                  absolutePath: fileName,
                  language: "systemverilog", // fallback
                  lastActivity: new Date(),
                });
              }
          
              pendingNavigationRef.current = null;
            }
          });
          
          
    
          if (language && !loadedLanguages.current.has(language)) {
            registerLanguageSupport(language, pendingNavigationRef);
            loadedLanguages.current.add(language);
          }
          
        }

        if (providerRef.current) {
          providerRef.current.destroy();
        }
    
        if (ydocRef.current) {
          ydocRef.current.destroy();
        }

       // if (process.env.NODE_ENV !== "production") {
            const ydoc = new Y.Doc();
            ydocRef.current = ydoc;

            const provider = new WebsocketProvider(
                process.env.NEXT_PUBLIC_EDITOR_SERVER_URL ?? "wss://ide.drasic.com/ws",
                "connect",
                ydoc,
                { params: { filePath } }
            );
            providerRef.current = provider;

            if (editorRef.current) {
                const type = ydoc.getText("monaco");
                new MonacoBinding(
                    type,
                    editorRef.current.getModel()!,
                    new Set([editorRef.current]),
                    provider.awareness
                );
            }
       // }

       model.onDidChangeContent(() => {
        const code = model.getValue();
        parseAndCollectSymbols(code, model.uri.toString());
      });


      return () => {
        providerRef.current?.destroy();
        ydocRef.current?.destroy();
      };
    }, [filePath, language, theme, onOpenFile]);

    useEffect(() => {
      return () => {
        editorRef.current?.dispose();
        editorRef.current = null;
      };
    }, []);

    return <main className="h-full w-full" ref={monacoEl}></main>;
}
