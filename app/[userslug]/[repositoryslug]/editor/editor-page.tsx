"use client";

import { commitSchema } from "@/lib/schemas/git-schemas";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import { RouterInputs, api } from "@/lib/trpc/react";
import type {
    BottomPanelContentTab,
    Configuration,
    SidebarContentTab, SimulationOutput
} from "@/lib/types/editor";
import type {
    FileDisplayItem,
    FileItem,
    Repository,
    RepositoryItem,
} from "@/lib/types/repository";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";
import React, {
    type ElementRef,
    ReactElement,
    RefObject,
    useCallback,
    useEffect,
    useRef,
    useState,
    SetStateAction,
} from "react";
import { ImperativePanelGroupHandle } from "react-resizable-panels";
import { toast } from "sonner";
import { useDebouncedCallback } from "use-debounce";
import { z } from "zod";

import { BottomPanelTabContent } from "@/components/editor/bottom-panel-content/bottom-panel-tab-content";
import DynamicDiffEditor from "@/components/editor/diff-editor";
import { EditorTabs } from "@/components/editor/editor-tabs";
import { EditorNavigation } from "@/components/editor/navigation/editor-navigation";
import { SidebarTabContent } from "@/components/editor/sidebar-content/sidebar-tab-content";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";
import { findItemInTree } from "@/components/generic/generic";
import DiagramPage from "@/app/[userslug]/[repositoryslug]/block-diagram/diagram-page";
import { symbolTableManager } from "@/app/antlr/SystemVerilog/symbolTable";

interface EditorPageProps {
    repository: Repository;
    lastSimulation: string | null;
}

const DynamicEditor = dynamic(() => import("@/components/editor/editor"), {
    loading: () => <p>Loading...</p>,
    ssr: false,
});

interface EditorState {
    files: FileDisplayItem[];
    activeFile: FileDisplayItem | null;
}

interface SessionResponse {
    id: string;
    editors: Record<string, EditorState>;
}

/**
 * Editor page
 *
 * @param {EditorPageProps} props - Component props
 * @returns {ReactElement} Editor page component
 */
export default function EditorPage({
    repository,
    lastSimulation,
}: EditorPageProps): ReactElement {
    const { theme, resolvedTheme } = useTheme();

    const [activeSidebarContent, setActiveSidebarContent] =
        useState<SidebarContentTab>("fileExplorer");
    const [activeBottomPanelContent, setActiveBottomPanelContent] =
        useState<BottomPanelContentTab>("simulation");

    const verticalGroupRef: RefObject<ImperativePanelGroupHandle> =
        useRef<ElementRef<typeof ResizablePanelGroup>>(null);
    const horizontalGroupRef: RefObject<ImperativePanelGroupHandle> =
        useRef<ElementRef<typeof ResizablePanelGroup>>(null);
    const editorGroupRef: RefObject<ImperativePanelGroupHandle> =
        useRef<ElementRef<typeof ResizablePanelGroup>>(null);

    const [verticalCollapsed, setVerticalCollapsed] = useState<boolean>(false);
    const [horizontalCollapsed, setHorizontalCollapsed] =
        useState<boolean>(false);
    const [lastOpenedSidebarSize, setLastOpenedSidebarSize] =
        useState<number>(20);
    const [lastOpenedBottomPanelSize, setLastOpenedBottomPanelSize] =
        useState<number>(20);
    const lastSavedSessionRef = useRef<string | null>(null);

    const [editors, setEditors] = useState<{
        [key: string]: {
            files: FileDisplayItem[];
            activeFile: FileDisplayItem | null;
        };
    }>({
        'editor1': {
            files: [],
            activeFile: null
        }
    });

    const pendingNavigationRef = useRef<{
        uri: monaco.Uri;
        range: monaco.IRange;
      } | null>(null);

    const [activeEditorId, setActiveEditorId] = useState<string>('editor1');

    const [showDiffEditor, setShowDiffEditor] = useState<boolean>(false);

    const [configuration, setConfiguration] = useState<
        Configuration | undefined
    >(undefined);

    useEffect(() => {
        const conf: string | null = localStorage.getItem("configuration");
        if (conf) {
            setConfiguration(JSON.parse(conf));
        }
    }, []);

    const [tree, setTree] = useState<Array<RepositoryItem>>(
        repository.tree ?? [],
    );

    const [selectedItem, setSelectedItem] = useState<RepositoryItem | undefined>(undefined);
    const [expandedItems, setExpandedItems] = useState<Array<RepositoryItem>>(
        [],
    );

    const changes = api.git.changes.useQuery(
        { repoId: repository.id },
        {
            enabled: repository.isGitRepo,
            refetchInterval: 5_000,
        },
    );

    const commitMutation = api.git.commit.useMutation({
        onSuccess: () => {
            const changesCount: number = changes.data?.changes.length ?? 0;
            toast.success(
                "Successfully commited " +
                    changesCount +
                    " change" +
                    (changesCount !== 1 && "s"),
            );
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    const [verilatorCppInput, setVerilatorCppInput] = useState<
        RouterInputs["simulation"]["simulateVerilatorCppStream"] | null
    >(null);

    const resultVerilatorCpp =
        api.simulation.simulateVerilatorCppStream.useQuery(verilatorCppInput!, {
            enabled: !!verilatorCppInput,
        });

    const [verilatorSvInput, setVerilatorSvInput] = useState<
        RouterInputs["simulation"]["simulateVerilatorSvStream"] | null
    >(null);

    const resultVerilatorSv = api.simulation.simulateVerilatorSvStream.useQuery(
        verilatorSvInput!,
        {
            enabled: !!verilatorSvInput,
        },
    );

    const [icarusInput, setIcarusInput] = useState<
        RouterInputs["simulation"]["simulateIcarusVerilogStream"] | null
    >(null);

    const resultIcarus = api.simulation.simulateIcarusVerilogStream.useQuery(
        icarusInput!,
        {
            enabled: !!icarusInput,
        },
    );

    const [errorOutputInput, setErrorOutputInput] = useState<SimulationOutput[] | null>(null);


    const onStartSimulation = () => {

        console.log(
            "Starting simulation with type: " +
            configuration?.simulation?.type +
            " and file: " +
            configuration?.simulation?.testBench?.absolutePath +
            " and directory: " +
            configuration?.simulation?.directory,
        );

        if (configuration?.simulation?.type === "verilatorC++") {
            const newInput = {
                repoId: repository.id,
                testbenchPath: configuration?.simulation?.testBench?.absolutePath,
                directory: configuration?.simulation?.directory
            };
            setVerilatorCppInput(newInput); // <- toto spustí subscription
        }

        if (configuration?.simulation?.type === "verilatorSystemVerilog") {
            const newInput = {
                repoId: repository.id,
                testbenchPath: configuration?.simulation?.testBench?.absolutePath,
                directory: configuration?.simulation?.directory
            };
            setVerilatorSvInput(newInput); // <- toto spustí subscription
        }

        if (configuration?.simulation?.type === "icarusVerilog") {
            const newInput = {
                repoId: repository.id,
                testbenchPath: configuration?.simulation?.testBench?.absolutePath,
                directory: configuration?.simulation.directory
            };
            setIcarusInput(newInput); // <- toto spustí subscription

        }

        setErrorOutputInput([
            {
                type: "error",
                content: "Missing or invalid simulation configuration.",
            },
        ]);
    };

    const handleOnCommit = async (data: z.infer<typeof commitSchema>) => {
        await commitMutation.mutateAsync(data);
        await changes.refetch();
    };

    const handleCloseSidebar = () => {
        if (horizontalGroupRef && horizontalGroupRef.current) {
            setLastOpenedSidebarSize(horizontalGroupRef.current.getLayout()[0]);
            horizontalGroupRef.current.setLayout([0, 100]);
            setHorizontalCollapsed(true);
        }
    };

    const handleCloseBottomPanel = () => {
        if (verticalGroupRef && verticalGroupRef.current) {
            setLastOpenedBottomPanelSize(
                verticalGroupRef.current.getLayout()[1],
            );
            verticalGroupRef.current.setLayout([100, 0]);
            setVerticalCollapsed(true);
        }
    };

    const [yosysInput, setYosysInput] = useState<
        RouterInputs["synthesis"]["runYosysStream"] | null
    >(null);

    const resultYosys = api.synthesis.runYosysStream.useQuery(yosysInput!, {
        enabled: !!yosysInput,
    });

    const onStartSynthesis = () => {
        if (
            configuration &&
            configuration.synthesis &&
            configuration.synthesis.type &&
            configuration.synthesis.file
        ) {
            // TODO: maxo start synthesis
            console.log(
                "Starting synthesis with type: " +
                configuration.synthesis.type +
                " and file: " +
                configuration.synthesis.file.absolutePath,
            );

            if (configuration.synthesis.type === "yosys") {
                const input = {
                    repoId: repository.id,
                    verilogFilePath: configuration.synthesis.file.absolutePath,
                };
                setYosysInput(input);
            }
        }
    };

    const handleOpenFile = useCallback((item: FileDisplayItem | FileItem) => {
        const absolutePath = item.absolutePath.toLowerCase();
        const newFile: FileDisplayItem = {
            type: "file-display",
            name: item.name,
            absolutePath: item.absolutePath,
            language: item.language || "txt",
            lastActivity: new Date(),
        };
        setShowDiffEditor(false);

        setEditors(prev => {
            for (const [editorId, editor] of Object.entries(prev)) {
                const match = editor.files.find(f => f.absolutePath.toLowerCase() === absolutePath);
                if (match) {
                    setActiveEditorId(editorId);
                    return {
                        ...prev,
                        [editorId]: {
                            ...editor,
                            activeFile: match,
                        },
                    };
                }
            }

            const currentEditor = prev[activeEditorId];
            return {
                ...prev,
                [activeEditorId]: {
                    files: [...currentEditor.files, newFile],
                    activeFile: newFile,
                },
            };
        });
    }, [activeEditorId]);



    const handleTabSwitch = (item: FileDisplayItem, editorId: string) => {
        if (item.name.startsWith("Diff:")) {
            setShowDiffEditor(true);
        } else {
            setShowDiffEditor(false);
        }
        setEditors(prev => ({
            ...prev,
            [editorId]: {
                ...prev[editorId],
                activeFile: item
            }
        }));
    };

    const handleCloseTab = (item: FileDisplayItem, editorId: string) => {
        setEditors(prev => {
            const editor = prev[editorId];
            const newFiles = editor.files.filter(f => f.absolutePath !== item.absolutePath);

            // If there are still files, just update the active file
            if (newFiles.length > 0) {
                return {
                    ...prev,
                    [editorId]: {
                        files: newFiles,
                        activeFile: editor.activeFile?.absolutePath === item.absolutePath
                            ? newFiles[0] || null
                            : editor.activeFile
                    }
                };
            }

            // If this is the last file in the editor
            if (editorId === 'editor1') {
                // If there are other editors, promote one to editor1
                if (Object.keys(prev).length > 1) {
                    const otherEditorId = Object.keys(prev).find(id => id !== 'editor1');
                    if (otherEditorId) {
                        const newEditors = { ...prev };
                        newEditors['editor1'] = newEditors[otherEditorId];
                        delete newEditors[otherEditorId];
                        return newEditors;
                    }
                }
                // If no other editors, just clear editor1
                return {
                    ...prev,
                    [editorId]: {
                        files: [],
                        activeFile: null
                    }
                };
            }

            // For non-editor1 editors, remove them when empty
            const newEditors = { ...prev };
            delete newEditors[editorId];
            return newEditors;
        });
    };

    const handleSplitEditor = (item: FileDisplayItem) => {
        const newEditorId = `editor${Object.keys(editors).length + 1}`;
        setEditors(prev => {
            // Find the source editor that contains the file
            const sourceEditorId = Object.entries(prev).find(([, editor]) =>
                editor.files.some(f => f.absolutePath === item.absolutePath)
            )?.[0];

            if (!sourceEditorId) return prev;

            // Remove the file from the source editor
            const newState = { ...prev };
            newState[sourceEditorId] = {
                ...prev[sourceEditorId],
                files: prev[sourceEditorId].files.filter(f => f.absolutePath !== item.absolutePath),
                activeFile: prev[sourceEditorId].activeFile?.absolutePath === item.absolutePath
                    ? prev[sourceEditorId].files[0] || null
                    : prev[sourceEditorId].activeFile
            };

            // Add the file to the new editor
            newState[newEditorId] = {
                files: [item],
                activeFile: item
            };

            return newState;
        });
    };

    const handleCloseAllTabs = (editorId: string) => {
        setEditors(prev => {
            if (editorId === 'editor1' && Object.keys(prev).length > 1) {
                const otherEditorId = Object.keys(prev).find(id => id !== 'editor1');
                if (otherEditorId) {
                    const newEditors = { ...prev };
                    newEditors['editor1'] = newEditors[otherEditorId];
                    delete newEditors[otherEditorId];
                    return newEditors;
                }
            }

            if (editorId === 'editor1') {
                return {
                    ...prev,
                    [editorId]: {
                        files: [],
                        activeFile: null
                    }
                };
            }

            const newEditors = { ...prev };
            delete newEditors[editorId];
            return newEditors;
        });
    }

        const onOpenDiffEditorAction = (filePath: string) => {
            const repoItem = findItemInTree(tree, filePath);
            if (!repoItem || (repoItem.type !== "file" && repoItem.type !== "file-display")) return;

            const newFile: FileDisplayItem = {
                type: "file-display",
                name: "Diff: " + repoItem.name,
                absolutePath: "Diff: " + repoItem.absolutePath,
                language: repoItem.language || "txt",
                lastActivity: new Date(),
            };

            setShowDiffEditor(true);

            setEditors(prev => {
                const currentEditor = prev[activeEditorId];
                const alreadyOpen = currentEditor.files.some(f => f.absolutePath === newFile.absolutePath);

                return {
                    ...prev,
                    [activeEditorId]: {
                        ...currentEditor,
                        files: alreadyOpen ? currentEditor.files : [...currentEditor.files, newFile],
                        activeFile: newFile,
                    }
                };
            });
        };


    const { data: session } = api.editor.getSession.useQuery({
        repoId: repository.id,
    });
    const saveSession = api.editor.saveSession.useMutation();

    const serializeFile = (file: FileDisplayItem) => ({
        name: file.name,
        type: file.type,
        lastActivity: new Date(new Date(file.lastActivity).toISOString()),
        language: file.language,
        absolutePath: file.absolutePath,
      });

    const saveSessionDebounced = useDebouncedCallback(() => {
        const serializedEditors = Object.entries(editors).reduce((acc, [id, editor]) => {
            acc[id] = {
                files: editor.files.map(serializeFile),
                activeFile: editor.activeFile ? serializeFile(editor.activeFile) : null
            };
            return acc;
        }, {} as Record<string, { files: FileDisplayItem[]; activeFile: FileDisplayItem | null }>);

        const sessionData = {
            repoId: repository.id,
            editors: serializedEditors,
          };

          const sessionString = JSON.stringify(sessionData);
          if (lastSavedSessionRef.current === sessionString) {
            return;
          }
          lastSavedSessionRef.current = sessionString;

          saveSession.mutate(sessionData);
    }, 1500);

    useEffect(() => {
        if (session) {
            const sessionResponse = session as unknown as SessionResponse;
            if (sessionResponse.editors) {
                setEditors(sessionResponse.editors);
            }
        }
    }, [session]);

    const isDiagramFile = (file: FileDisplayItem) => {
        if (file.name != undefined) {
            const fileName = file.name.toLowerCase();
            return fileName.endsWith('.bd');
        }

    };

    useEffect(() => {
        const serialized = JSON.stringify(editors);
        if (lastSavedSessionRef.current !== serialized) {
          lastSavedSessionRef.current = serialized;
          saveSessionDebounced();
        }
      }, [editors, saveSessionDebounced]);

    const handleEditorReady = useCallback(() => {
        if (repository.symbolTable) {
            symbolTableManager.initializeWithData({
                ...repository.symbolTable,
                fileSymbols: {
                    ...repository.symbolTable.fileSymbols,
                    symbols: repository.symbolTable.fileSymbols.symbols.map(symbol => ({
                        ...symbol,
                        type: "typedef" as const,
                        scope: symbol.scope ?? "<global>",
                    })),
                },
            });
        } else {
            symbolTableManager.initialize();
        }
    }, [repository]);

    const editorTheme = () => {
        if (theme === "dark" || resolvedTheme === "dark") {
            return "vs-dark";
        } else if (theme === "light" || resolvedTheme === "light") {
            return "vs-light";
        }
        return "vs-light";
    };

    const handleFileClick = (item: RepositoryItem) => {
        if (item.type === "file" || item.type === "file-display") {
            const fileItem: FileDisplayItem = {
                type: "file-display",
                name: item.name,
                absolutePath: item.absolutePath.replace(/\\/g, "/"),
                language: item.language || "txt",
                lastActivity: new Date(),
            };
            handleOpenFile(fileItem);
        }
    };

    const hasOpenFiles = Object.values(editors).some(editor => editor.files.length > 0);

    const handleMoveTab = (file: FileDisplayItem, sourceEditorId: string, targetEditorId: string) => {
        setEditors(prev => {
            const newEditors = { ...prev };

            // Remove file from source editor
            newEditors[sourceEditorId] = {
                ...prev[sourceEditorId],
                files: prev[sourceEditorId].files.filter(f => f.absolutePath !== file.absolutePath),
                activeFile: prev[sourceEditorId].activeFile?.absolutePath === file.absolutePath
                    ? prev[sourceEditorId].files[0] || null
                    : prev[sourceEditorId].activeFile
            };

            // Add file to target editor if it's not already there
            if (!newEditors[targetEditorId].files.some(f => f.absolutePath === file.absolutePath)) {
                newEditors[targetEditorId] = {
                    ...prev[targetEditorId],
                    files: [...prev[targetEditorId].files, file],
                    activeFile: file
                };
            }

            // If source editor is empty and it's editor1, promote another editor
            if (newEditors[sourceEditorId].files.length === 0 && sourceEditorId === 'editor1') {
                const otherEditorId = Object.keys(newEditors).find(id => id !== 'editor1');
                if (otherEditorId) {
                    newEditors['editor1'] = newEditors[otherEditorId];
                    delete newEditors[otherEditorId];
                }
            }
            // If source editor is empty and not editor1, remove it
            else if (newEditors[sourceEditorId].files.length === 0 && sourceEditorId !== 'editor1') {
                delete newEditors[sourceEditorId];
            }

            return newEditors;
        });
    };

    const resolveMainContent = (editor: { files?: FileDisplayItem[]; activeFile: FileDisplayItem | null; }) => {
        const diagramCondition: boolean = !!(editor.activeFile && !showDiffEditor && isDiagramFile(editor.activeFile));
        const diffEditorCondition: boolean = !!(editor.activeFile && showDiffEditor && !isDiagramFile(editor.activeFile));
        const editorCondition: boolean = !!(editor.activeFile && !showDiffEditor && !isDiagramFile(editor.activeFile));

        switch (true) {
            case diagramCondition:
                return (
                    <DiagramPage
                        repository={repository}
                        activeFile={editor.activeFile!}
                        tree={tree}
                        setTree={setTree}
                    />
                );
            case diffEditorCondition:
                return (
                    <DynamicDiffEditor
                        filePath={
                            repository.ownerName +
                            "/" +
                            repository.name +
                            "/" +
                            editor.activeFile!.absolutePath
                        }
                        language={editor.activeFile!.language}
                        theme={editorTheme()}
                    />
                );
            case editorCondition:
                return (
                    <DynamicEditor
                        key={editor.activeFile!.absolutePath}
                        filePath={`${repository.ownerName}/${repository.name}/${editor.activeFile!.absolutePath}`}
                        onOpenFile={handleOpenFile}
                        onReady={handleEditorReady}
                        language={editor.activeFile!.language.replace(" ", "")}
                        theme={editorTheme()}
                        activeFile={editor.activeFile}
                        pendingNavigationRef={pendingNavigationRef}
                    />
                );
            default:
                return (
                    <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                        No file open
                    </div>
                );
        }
    };

    return (
        <div className="flex h-screen flex-row">
            <EditorNavigation
                sidebarProps={{
                    horizontalGroupRef,
                    horizontalCollapsed,
                    setHorizontalCollapsed,
                    activeSidebarContent,
                    setActiveSidebarContent,
                    lastOpenedSidebarSize,
                    setLastOpenedSidebarSize,
                }}
                bottomPanelProps={{
                    verticalGroupRef,
                    verticalCollapsed,
                    setVerticalCollapsed,
                    activeBottomPanelContent,
                    setActiveBottomPanelContent,
                    lastOpenedBottomPanelSize,
                    setLastOpenedBottomPanelSize,
                }}
                onStartSimulationAction={onStartSimulation}
                onStartSynthesisAction={onStartSynthesis}
                configuration={configuration}
                isGitRepo={repository.isGitRepo}
                repository={repository}
            />

            <ResizablePanelGroup
                direction="vertical"
                ref={verticalGroupRef}
                onLayout={(sizes) => {
                    setVerticalCollapsed(sizes[1] === 0);
                    if (sizes[1] > 0) {
                        setLastOpenedBottomPanelSize(sizes[1]);
                    }
                }}
            >
                <ResizablePanel defaultSize={80} minSize={15}>
                    <ResizablePanelGroup
                        direction="horizontal"
                        ref={horizontalGroupRef}
                        onLayout={(sizes) => {
                            setHorizontalCollapsed(sizes[0] === 0);
                            if (sizes[0] > 0) {
                                setLastOpenedSidebarSize(sizes[0]);
                            }
                        }}
                    >
                        <ResizablePanel
                            defaultSize={20}
                            minSize={15}
                            collapsible
                            collapsedSize={0}
                        >
                            <SidebarTabContent
                                activeSidebarContent={activeSidebarContent}
                                repository={repository}
                                tree={tree}
                                setTreeAction={setTree}
                                selectedItem={selectedItem}
                                setSelectedItemAction={setSelectedItem}
                                expandedItems={expandedItems}
                                setExpandedItemsAction={setExpandedItems}
                                changes={changes.data?.changes ?? []}
                                handleCloseSidebarAction={handleCloseSidebar}
                                onFileClick={handleFileClick}
                                onCommit={{
                                    action: handleOnCommit,
                                    isLoading: commitMutation.isPending,
                                }}
                                configuration={configuration}
                                setConfigurationAction={setConfiguration}
                                onOpenDiffEditorAction={onOpenDiffEditorAction}
                            />
                        </ResizablePanel>

                        <ResizableHandle />

                        <ResizablePanel defaultSize={80}>
                            {!hasOpenFiles ? (
                                <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                                    No file open
                                </div>
                            ) : (
                                <ResizablePanelGroup
                                    direction="horizontal"
                                    ref={editorGroupRef}
                                >
                                    {Object.entries(editors).map(([editorId, editor], index) => (
                                        <React.Fragment key={editorId}>
                                            {index > 0 && <ResizableHandle />}
                                            <ResizablePanel defaultSize={100 / Object.keys(editors).length}>
                                                <EditorTabs
                                                    openFiles={editor.files}
                                                    setOpenFilesAction={(files) => {
                                                        if (Array.isArray(files)) {
                                                            setEditors(prev => ({
                                                                ...prev,
                                                                [editorId]: { ...prev[editorId], files }
                                                            }));
                                                        }
                                                    }}
                                                    activeFile={editor.activeFile}
                                                    setActiveFileAction={(value: SetStateAction<FileDisplayItem | null>) => {
                                                        setEditors(prev => {
                                                            const newState = { ...prev };
                                                            newState[editorId] = {
                                                                ...prev[editorId],
                                                                activeFile: typeof value === 'function' ? value(prev[editorId].activeFile) : value
                                                            };
                                                            return newState;
                                                        });
                                                    }}
                                                    handleTabSwitchAction={(file) => handleTabSwitch(file, editorId)}
                                                    handleCloseTabAction={(file) => handleCloseTab(file, editorId)}
                                                    handleSplitEditor={handleSplitEditor}
                                                    handleCloseAllTabs={() => handleCloseAllTabs(editorId)}
                                                    editorId={editorId}
                                                    onTabDrop={(file, sourceEditorId) => handleMoveTab(file, sourceEditorId, editorId)}
                                                />
                                                <div className="relative h-full">
                                                    {editor.activeFile && Object.keys(editor.activeFile).length > 0 ? (
                                                        resolveMainContent(editor)
                                                    ) : null}
                                                    {Object.keys(editors).length < 2 && (editor.activeFile && !isDiagramFile(editor.activeFile)) && (
                                                        <div
                                                            className="absolute right-0 top-0 bottom-0 w-64 flex items-center justify-center"
                                                            onDragOver={(e) => {
                                                                e.preventDefault();
                                                            }}
                                                            onDrop={(e) => {
                                                                e.preventDefault();
                                                                const sourceEditorId = e.dataTransfer.getData('editorId');
                                                                const fileData = e.dataTransfer.getData('file');
                                                                if (fileData) {
                                                                    const file = JSON.parse(fileData);
                                                                    if (file) {
                                                                        if (sourceEditorId) {
                                                                            const editorId = Object.keys(editors)[0];
                                                                            if (editors[editorId].files.length > 1) {
                                                                                handleSplitEditor(file);
                                                                            }
                                                                        } else {
                                                                            handleSplitEditor(file);
                                                                        }
                                                                    }
                                                                }
                                                            }}
                                                        />
                                                    )}
                                                </div>
                                            </ResizablePanel>
                                        </React.Fragment>
                                    ))}
                                </ResizablePanelGroup>
                            )}
                        </ResizablePanel>
                    </ResizablePanelGroup>
                </ResizablePanel>

                <ResizableHandle />

                <ResizablePanel defaultSize={20} collapsible collapsedSize={0} minSize={15}>
                    <BottomPanelTabContent
                        activeBottomPanelContent={activeBottomPanelContent}
                        handleCloseBottomPanel={handleCloseBottomPanel}
                        configuration={configuration}
                        simulationOutput={
                            resultVerilatorCpp.data ??
                            resultIcarus.data ??
                            resultVerilatorSv.data ??
                            errorOutputInput ??
                            []
                        }
                        lastSimulation={lastSimulation}
                        synthesisOutput={resultYosys.data ?? []}
                        lastSynthesis={resultYosys.data?.[0]?.content ?? null}
                        onStartSimulationAction={onStartSimulation}
                    />
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    );
}
