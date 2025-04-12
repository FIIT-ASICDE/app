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

// Add debounce utility
function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: number | null = null;
  return (...args: Parameters<T>) => {
    if (timeout) window.clearTimeout(timeout);
    timeout = window.setTimeout(() => func(...args), wait);
  };
}

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
    const debouncedParseRef = useRef<((code: string, uri: string) => void) | null>(null);

    const loadedLanguages = useRef<Set<string>>(new Set());

    // Initialize debounced function once
    if (!debouncedParseRef.current) {
      debouncedParseRef.current = debounce((code: string, uri: string) => {
        parseAndCollectSymbols(code, uri);
      }, 1000); // Increased to 1 second
    }

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
              
              if (onOpenFile) {
                // Get just the file name from the path
                const fileName = uri.path.split("/").pop() || "untitled";
                
                // Store the range for later use
                const targetRange = range;
                
                // Call onOpenFile with the target file
                onOpenFile({
                  type: "file-display",
                  name: fileName,
                  absolutePath: fileName,
                  language: "systemverilog",
                  lastActivity: new Date(),
                });
                
                // Set up a one-time effect to handle the position after the file is opened
                const disposable = monaco.editor.onDidCreateEditor((editor) => {
                  if (editor.getModel()?.uri.toString() === uri.toString()) {
                    editor.setPosition({
                      lineNumber: targetRange.startLineNumber,
                      column: targetRange.startColumn,
                    });
                    editor.revealRangeInCenter(targetRange);
                    editor.focus();
                    disposable.dispose();
                  }
                });
                
                // Clear navigation state
                pendingNavigationRef.current = null;
                
                // Prevent default behavior
                event.event.preventDefault();
                event.event.stopPropagation();
              }
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
         if (debouncedParseRef.current) {
           debouncedParseRef.current(code, model.uri.toString());
         }
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
