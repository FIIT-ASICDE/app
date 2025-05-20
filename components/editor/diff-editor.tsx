"use client";

import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import { ReactElement, useEffect, useRef } from "react";

const originalContent: string = `return () => {
            if (diffEditorRef.current) {
                diffEditorRef.current.dispose();
                diffEditorRef.current = null;
            }
        };`;
const modifiedContent: string = `return () => {
            if (diffEditorRef.current) {
                // TODO: dispose
                diffEditorRef.current = null;
            }
        };`;

interface DynamicDiffEditorProps {
    filePath: string;
    language?: string;
    theme?: string;
}

/**
 * DiffEditor component for editor page
 *
 * @param {DynamicDiffEditorProps} props - Component props
 * @returns {ReactElement} DiffEditor component
 */
export default function DynamicDiffEditor({
    language = "systemverilog",
    theme = "vs-dark",
}: DynamicDiffEditorProps): ReactElement {
    const diffEditorRef = useRef<monaco.editor.IStandaloneDiffEditor | null>(
        null,
    );
    const monacoEl = useRef<HTMLElement | null>(null);

    useEffect(() => {
        if (!monacoEl.current) return;

        if (diffEditorRef.current) {
            diffEditorRef.current.dispose();
            diffEditorRef.current = null;
        }

        diffEditorRef.current = monaco.editor.createDiffEditor(
            monacoEl.current,
            {
                theme,
                automaticLayout: true,
            },
        );

        const originalModel = monaco.editor.createModel("", language);
        const modifiedModel = monaco.editor.createModel("", language);

        // const originalContent: string = api.file.originalContent.useQuery({
        //     filePath: filePath,
        // });
        // const modifiedContent: string = api.file.modifiedContent.useQuery({
        //     filePath: filePath,
        // });

        originalModel.setValue(originalContent);
        modifiedModel.setValue(modifiedContent);

        diffEditorRef.current.setModel({
            original: originalModel,
            modified: modifiedModel,
        });

        return () => {
            if (diffEditorRef.current) {
                diffEditorRef.current.dispose();
                diffEditorRef.current = null;
            }
        };
    }, [originalContent, modifiedContent, language, theme]);

    return <main className="h-full w-full" ref={monacoEl}></main>;
}
