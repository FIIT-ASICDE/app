"use client";

import { commitSchema } from "@/lib/schemas/git-schemas";
import { RouterInputs, api } from "@/lib/trpc/react";
import type {
    BottomPanelContentTab,
    Configuration,
    SidebarContentTab,
} from "@/lib/types/editor";
import type {
    FileDisplayItem,
    FileItem,
    Repository,
    RepositoryItem,
} from "@/lib/types/repository";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";
import {
    type ElementRef,
    ReactElement,
    RefObject,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
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

interface EditorPageProps {
    repository: Repository;
    lastSimulation: string | null;
}

const DynamicEditor = dynamic(() => import("@/components/editor/editor"), {
    loading: () => <p>Loading...</p>,
    ssr: false,
});

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

    const [verticalCollapsed, setVerticalCollapsed] = useState<boolean>(false);
    const [horizontalCollapsed, setHorizontalCollapsed] =
        useState<boolean>(false);
    const [lastOpenedSidebarSize, setLastOpenedSidebarSize] =
        useState<number>(20);
    const [lastOpenedBottomPanelSize, setLastOpenedBottomPanelSize] =
        useState<number>(20);
    const [activeFile, setActiveFile] = useState<FileDisplayItem | null>(null);
    const [openFiles, setOpenFiles] = useState<Array<FileDisplayItem>>([]);

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

    const onStartSimulation = () => {
        if (
            configuration &&
            configuration.simulation &&
            configuration.simulation.type &&
            configuration.simulation.testBench
        ) {
            // TODO: adam start simulation

            // simulateMutation.mutate({
            //     repoId: repository.id,
            //     testbenchPath: selectedTestbenchFile.absolutePath,
            //     svPath: selectedSvFile.absolutePath
            // });

            console.log(
                "Starting simulation with type: " +
                configuration.simulation.type +
                " and file: " +
                configuration.simulation.testBench?.absolutePath +
                " and directory: " +
                configuration?.simulation.directory,
            );

            if (configuration.simulation.type === "verilatorC++") {
                const newInput = {
                    repoId: repository.id,
                    testbenchPath: configuration.simulation.testBench.absolutePath,
                    directory: configuration?.simulation.directory
                };
                setVerilatorCppInput(newInput); // <- toto spustí subscription
            }

            if (configuration.simulation.type === "verilatorSystemVerilog") {
                const newInput = {
                    repoId: repository.id,
                    testbenchPath: configuration.simulation.testBench.absolutePath,
                    directory: configuration?.simulation.directory
                };
                setVerilatorSvInput(newInput); // <- toto spustí subscription
            }

            if (configuration?.simulation.type === "icarusVerilog") {
                const newInput = {
                    repoId: repository.id,
                    testbenchPath: configuration.simulation.testBench.absolutePath,
                    directory: configuration?.simulation.directory
                };
                setIcarusInput(newInput); // <- toto spustí subscription
            }
        }
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

    const onOpenDiffEditorAction = (filePath: string) => {
        const newActiveFile: RepositoryItem | undefined = findItemInTree(
            tree,
            filePath,
        );

        if (!newActiveFile) return;
        if (
            newActiveFile.type !== "file-display" &&
            newActiveFile.type !== "file"
        ) {
            return;
        }

        const fileDisplay: FileDisplayItem = {
            type: "file-display",
            name: "Diff: " + newActiveFile.name,
            absolutePath: "Diff: " + newActiveFile.absolutePath,
            lastActivity: newActiveFile.lastActivity,
            language: newActiveFile.language,
        };

        if (
            !openFiles.some(
                (file: FileDisplayItem) => file.absolutePath === filePath,
            )
        ) {
            setOpenFiles((prevFiles: Array<FileDisplayItem>) => [
                ...prevFiles,
                fileDisplay,
            ]);
        }
        setShowDiffEditor(true);
        setActiveFile(fileDisplay);
    };

    const handleFileClick = (item: RepositoryItem) => {
        if (item.type === "file" || item.type === "file-display") {
            handleOpenFile(item);
        }
    };

    const handleTabSwitch = (item: FileDisplayItem) => {
        if (item.name.startsWith("Diff:")) {
            setShowDiffEditor(true);
        } else {
            setShowDiffEditor(false);
        }
        setActiveFile(item);
        setSelectedItem(item);
        // TODO: expand all directories in which the item is nested
    };

    const { data: session } = api.editor.getSession.useQuery({
        repoId: repository.id,
    });
    const saveSession = api.editor.saveSession.useMutation();

    const handleCloseTab = (fileToClose: FileDisplayItem) => {
        const filteredFiles = openFiles.filter(
            (file) => file.name !== fileToClose.name,
        );
        setOpenFiles(filteredFiles);

        if (activeFile?.name === fileToClose.name) {
            setActiveFile(filteredFiles.length > 0 ? filteredFiles[0] : null);
        }
    };

    useEffect(() => {
        if (session) {
            setOpenFiles(session.openFiles || []);
            setActiveFile(session.activeFile);
        }
    }, [session]);

    const serializeFile = (file: FileDisplayItem) => ({
        name: file.name,
        type: file.type,
        lastActivity: new Date(file.lastActivity),
        language: file.language,
        absolutePath: file.absolutePath,
    });

    const saveSessionDebounced = useDebouncedCallback(() => {
        const transformedOpenFiles = openFiles.map(serializeFile);

        const transformedActiveFile = activeFile ? serializeFile(activeFile) : null;

        saveSession.mutate({
            activeFile: transformedActiveFile,
            openFiles: transformedOpenFiles,
            repoId: repository.id,
        });
    }, 500);

    const isDiagramFile = (file: FileDisplayItem) => {
        if (file.name != undefined) {
            const fileName = file.name.toLowerCase();
            return fileName.endsWith('.bd');
        }

    };

    useEffect(() => {
        saveSessionDebounced();
    }, [openFiles, activeFile]);

    const handleOpenFile = useCallback((item: FileDisplayItem | FileItem) => {
        const absolutePath = item.absolutePath.toLowerCase();

        setOpenFiles((prev) => {
            const exists = prev.some((f) => f.absolutePath.toLowerCase() === absolutePath);
            if (!exists) {
                const newFile: FileDisplayItem = {
                    type: "file-display",
                    name: item.name,
                    absolutePath: item.absolutePath,
                    language: item.language,
                    lastActivity: item.lastActivity,
                };
                setShowDiffEditor(false);
                setActiveFile(newFile);
                return [...prev, newFile];
            } else {
                const file = prev.find((f) => f.absolutePath.toLowerCase() === absolutePath)!;
                setActiveFile(file);
                return prev;
            }
        });
    }, []);

    const editorTheme = () => {
        if (theme === "dark" || resolvedTheme === "dark") {
            return "vs-dark";
        } else if (theme === "light" || resolvedTheme === "light") {
            return "vs-light";
        }
        return "vs-light";
    };

    const resolveMainContent = () => {
        const diagramCondition: boolean = !!(activeFile && !showDiffEditor && isDiagramFile(activeFile));
        const diffEditorCondition: boolean = !!(activeFile && showDiffEditor && !isDiagramFile(activeFile));
        const editorCondition: boolean = !!(activeFile && !showDiffEditor && !isDiagramFile(activeFile));

        switch (true) {
            case diagramCondition:
                return (
                    <DiagramPage
                        repository={repository}
                        activeFile={activeFile!}
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
                            activeFile!.absolutePath
                        }
                        language={activeFile!.language}
                        theme={editorTheme()}
                    />
                );
            case editorCondition:
                return (
                    <DynamicEditor
                        filePath={
                            repository.ownerName +
                            "/" +
                            repository.name +
                            "/" +
                            activeFile!.absolutePath
                        }
                        language={activeFile!.language}
                        theme={editorTheme()}
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

                        <ResizablePanel defaultSize={80} minSize={15}>
                            <EditorTabs
                                openFiles={openFiles}
                                setOpenFilesAction={setOpenFiles}
                                activeFile={activeFile}
                                setActiveFileAction={setActiveFile}
                                handleTabSwitchAction={handleTabSwitch}
                                handleCloseTabAction={handleCloseTab}
                            />
                            {resolveMainContent()}
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
