"use client";

import { parseAndCollectSymbols } from "@/antlr/SystemVerilog/utilities/monacoEditor/parseAndCollectSymbols";
import { FileDisplayItem, FileItem } from "@/lib/types/repository";
import { HocuspocusProvider } from "@hocuspocus/provider";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import { ReactElement, useEffect, useRef } from "react";
import { MonacoBinding } from "y-monaco";
import * as Y from "yjs";

import { registerLanguageSupport } from "./editor-config/registerLanguage";

import { useUser } from "@/components/context/user-context";

window.addEventListener("unhandledrejection", (event) => {
    if (
        event.reason?.name === "Canceled" ||
        event.reason?.message === "Canceled"
    ) {
        event.preventDefault();
    }
});

function debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number,
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
    onReady?: () => void;
}

/**
 * Editor component for editor page
 *
 * @param {EditorProps} props - Component props
 * @returns {ReactElement} Editor component
 */
export default function Editor({
    filePath,
    language,
    theme = "vs-dark",
    onOpenFile,
    onReady,
}: EditorProps): ReactElement {
    const { user } = useUser();
    const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
    const monacoEl = useRef<HTMLElement | null>(null);
    const providerRef = useRef<HocuspocusProvider | null>(null);
    const ydocRef = useRef<Y.Doc | null>(null);
    const pendingNavigationRef = useRef<{
        uri: monaco.Uri;
        range: monaco.IRange;
    } | null>(null);

    const debouncedParseRef = useRef<
        ((code: string, uri: string) => void) | null
    >(null);
    const loadedLanguages = useRef<Set<string>>(new Set());

    if (!debouncedParseRef.current) {
        debouncedParseRef.current = debounce((code: string, uri: string) => {
            parseAndCollectSymbols(code, uri);
        }, 2000);
    }

    useEffect(() => {
        if (!monacoEl.current) return;
        const uri = monaco.Uri.parse(`inmemory://${filePath}`);

        const model =
            monaco.editor.getModel(uri) ||
            monaco.editor.createModel("", language, uri);

        if (editorRef.current) {
            const currentModel = editorRef.current.getModel();
            if (
                !currentModel ||
                currentModel.uri.toString() !== model.uri.toString()
            ) {
                editorRef.current.setModel(model);
            }
        } else {
            model.setEOL(monaco.editor.EndOfLineSequence.LF);
            editorRef.current = monaco.editor.create(monacoEl.current, {
                model,
                language,
                theme,
                automaticLayout: true,
            });

            if (onReady) {
                onReady();
            }

            editorRef.current.onMouseDown((event) => {
                if (
                    event.event.ctrlKey &&
                    pendingNavigationRef.current &&
                    event.target.type ===
                        monaco.editor.MouseTargetType.CONTENT_TEXT
                ) {
                    const { uri, range } = pendingNavigationRef.current;

                    if (onOpenFile) {
                        const parts = uri.path.split("/").filter(Boolean);
                        parts.shift(); // remove the first part (repository name)
                        const fileName = parts[parts.length - 1] || "untitled";
                        const filePath = parts.join("/");
                        onOpenFile({
                            type: "file-display",
                            name: fileName,
                            absolutePath: filePath,
                            language: "systemverilog",
                            lastActivity: new Date(),
                        });

                        const tryJump = () => {
                            const model = monaco.editor.getModel(uri);
                            if (model && editorRef.current) {
                                if (model.getValue().length === 0) {
                                    setTimeout(tryJump, 50);
                                    return;
                                }

                                editorRef.current.setModel(model);
                                editorRef.current.setPosition({
                                    lineNumber: range.startLineNumber,
                                    column: range.startColumn,
                                });
                                editorRef.current.revealRangeInCenter(range);
                                editorRef.current.focus();
                                pendingNavigationRef.current = null;
                            } else {
                                setTimeout(tryJump, 50);
                            }
                        };

                        setTimeout(tryJump, 100);
                    }
                }
            });

            if (language && !loadedLanguages.current.has(language)) {
                registerLanguageSupport(language, pendingNavigationRef);
                loadedLanguages.current.add(language);
            }
        }

        if (providerRef.current) providerRef.current.destroy();
        if (ydocRef.current) ydocRef.current.destroy();

        const ydoc = new Y.Doc();
        ydocRef.current = ydoc;

        const provider = new HocuspocusProvider({
            url:
                process.env.NEXT_PUBLIC_EDITOR_SERVER_URL ??
                "http://localhost:42069",
            name: filePath,
            document: ydoc,
            onAwarenessChange(data) {
                // @ts-ignore the data.states includes 'user', but it isn't typed,
                // see the setAwarenessField call down below
                onAwarenessChange(data.states, provider.document.clientID);
            },
        });

        provider.setAwarenessField("user", {
            name: user.username,
            color: getRandomColorForUser(user.username),
        });

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

        const initialCode = model.getValue();
        if (initialCode) {
            parseAndCollectSymbols(initialCode, uri.toString());
        }

        const contentChangeDisposable = model.onDidChangeContent(() => {
            const code = model.getValue();
            if (debouncedParseRef.current) {
                debouncedParseRef.current(code, uri.toString());
            }
        });

        return () => {
            contentChangeDisposable.dispose();
            providerRef.current?.destroy();
            ydocRef.current?.destroy();
        };
    }, [filePath, language, theme, onOpenFile, onReady]);

    useEffect(() => {
        return () => {
            editorRef.current?.dispose();
            editorRef.current = null;
        };
    }, []);

    return <main className="h-full w-full" ref={monacoEl}></main>;
}

const getRandomColorForUser = (username: string): string => {
    let hash = 0;
    for (let i = 0; i < username.length; i++) {
        hash = username.charCodeAt(i) + ((hash << 5) - hash);
    }
    const color = (hash & 0x00ffffff).toString(16).toUpperCase();
    return "#" + "0".repeat(6 - color.length) + color;
};

const getContrastTextColor = (hexColor: string): "white" | "black" => {
    const cleanHex = hexColor.replace(/^#/, "");

    const r = parseInt(cleanHex.substring(0, 2), 16);
    const g = parseInt(cleanHex.substring(2, 4), 16);
    const b = parseInt(cleanHex.substring(4, 6), 16);

    // Calculate the luminance of the color
    // See: https://www.w3.org/TR/WCAG20/#relativeluminance
    const sRGBtoLinear = (c: number): number => {
        c /= 255;
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    };

    const luminance =
        0.2126 * sRGBtoLinear(r) +
        0.7152 * sRGBtoLinear(g) +
        0.0722 * sRGBtoLinear(b);

    // Calculate the contrast ratio with white and black
    // See: https://www.w3.org/TR/WCAG20/#contrast-ratiodef
    const luminanceWhite = 1.0; // Luminance of white
    const luminanceBlack = 0.0; // Luminance of black

    const contrastWithWhite = (luminanceWhite + 0.05) / (luminance + 0.05);
    const contrastWithBlack = (luminance + 0.05) / (luminanceBlack + 0.05);

    // WCAG AA requires a contrast ratio of at least 4.5:1 for normal text
    // and 3:1 for large text. We'll aim for 4.5 for better readability.
    // If contrast with white is sufficient (or better than black), use white.
    // Otherwise, use black.
    if (contrastWithWhite >= 4.5 || contrastWithWhite > contrastWithBlack) {
        return "white";
    } else {
        return "black";
    }
};

interface YjsAwarenessState {
    clientId: number;
    user: { name: string; color: string };
}

function onAwarenessChange(
    states: Array<YjsAwarenessState>,
    myClientId: number,
) {
    const remoteStates = states.filter(
        (state) => state.clientId !== myClientId,
    );

    remoteStates.forEach((state) => {
        const styleId = `yjs-cursor-style-${state.clientId}`;
        let styleElement = document.getElementById(styleId);

        if (!styleElement) {
            styleElement = document.createElement("style");
            styleElement.id = styleId;
            document.head.appendChild(styleElement);
        }

        const cssRules = `
		.yRemoteSelection-${state.clientId} {
			background-color: ${state.user.color}80; /* #RRGGBB + alpha hex value (80 is roughly 50%) */
		}

		.yRemoteSelectionHead-${state.clientId} {
			position: absolute;
			border-left: ${state.user.color} solid 2px;
			border-top: ${state.user.color} solid 2px;
			border-bottom: ${state.user.color} solid 2px;
			height: 100%;
			box-sizing: border-box;
		}
		.yRemoteSelectionHead-${state.clientId}::after {
			position: absolute;
			content: "${state.user.name}";
			background-color: ${state.user.color};
			color: ${getContrastTextColor(state.user.name)};
			padding: 2px 4px;
			font-size: 11px;
			line-height: 1;
			white-space: nowrap;
			border-top-left-radius: 2px;
			border-top-right-radius: 2px;
			bottom: 100%;
			left: -2px;
			z-index: 2;
		}
		`;

        styleElement.innerHTML = cssRules;
    });
}
