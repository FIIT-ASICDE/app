"use client";

import { env } from "@/app/env";
import { HocuspocusProvider } from "@hocuspocus/provider";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import { ReactElement, useEffect, useRef } from "react";
import { MonacoBinding } from "y-monaco";
import * as Y from "yjs";

import { useUser } from "@/components/context/user-context";

interface EditorProps {
    filePath: string;
    language?: string;
    theme?: string;
}

/**
 * Editor component for editor page
 *
 * @param {EditorProps} props - Component props
 * @returns {ReactElement} Editor component
 */
export default function Editor({
    filePath,
    language = "systemverilog",
    theme = "vs-dark",
}: EditorProps): ReactElement {
    const { user } = useUser();
    const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
    const monacoEl = useRef<HTMLElement | null>(null);
    const providerRef = useRef<HocuspocusProvider | null>(null);
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
        model.setEOL(monaco.editor.EndOfLineSequence.LF);
        editorRef.current = monaco.editor.create(monacoEl.current, {
            model,
            language,
            theme,
            automaticLayout: true,
        });

        const ydoc = new Y.Doc();
        ydocRef.current = ydoc;

        const provider = new HocuspocusProvider({
            url: env.NEXT_PUBLIC_EDITOR_SERVER_URL ?? "http://localhost:42069",
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
