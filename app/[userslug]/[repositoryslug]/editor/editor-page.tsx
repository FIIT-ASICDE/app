"use client";

import { commitSchema } from "@/lib/schemas/git-schemas";
import { api, RouterInputs } from "@/lib/trpc/react";
import type {
    BottomPanelContentTab, Configuration,
    SidebarContentTab
} from "@/lib/types/editor";
import type {
    FileDisplayItem,
    Repository,
    RepositoryItem,
} from "@/lib/types/repository";
import dynamic from "next/dynamic";
import { type ElementRef, ReactElement, RefObject, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useDebouncedCallback } from "use-debounce";
import { z } from "zod";

import { BottomPanelTabContent } from "@/components/editor/bottom-panel-content/bottom-panel-tab-content";
import { EditorNavigation } from "@/components/editor/navigation/editor-navigation";
import { SidebarTabContent } from "@/components/editor/sidebar-content/sidebar-tab-content";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";
import { EditorTabs } from "@/components/editor/editor-tabs";
import { ImperativePanelGroupHandle } from "react-resizable-panels";

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
    lastSimulation
}: EditorPageProps): ReactElement {
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

    const [configuration, setConfiguration] = useState<Configuration | undefined>(undefined);

    useEffect(() => {
        const conf: string | null = localStorage.getItem('configuration');
        if (conf) {
            setConfiguration(JSON.parse(conf));
        }
    }, []);

    const [tree, setTree] = useState<Array<RepositoryItem>>(
        repository.tree ?? [],
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

    const [verilatorCppInput, setVerilatorCppInput] = useState<RouterInputs["simulation"]["simulateVerilatorCppStream"] | null>(null);

    const resultVerilatorCpp = api.simulation.simulateVerilatorCppStream.useQuery(verilatorCppInput!, {
        enabled: !!verilatorCppInput,
    });


    const [verilatorSvInput, setVerilatorSvInput] = useState<RouterInputs["simulation"]["simulateVerilatorSvStream"] | null>(null);

    const resultVerilatorSv = api.simulation.simulateVerilatorSvStream.useQuery(verilatorSvInput!, {
        enabled: !!verilatorSvInput,
    });

    const [icarusInput, setIcarusInput] = useState<RouterInputs["simulation"]["simulateIcarusVerilogStream"] | null>(null);

    const resultIcarus = api.simulation.simulateIcarusVerilogStream.useQuery(icarusInput!, {
        enabled: !!icarusInput,
    });

    const onStartSimulation = () => {
        // TODO: adam start simulation
        console.log(configuration?.simulation.type)
        console.log(configuration?.simulation.testBench)

        // simulateMutation.mutate({
        //     repoId: repository.id,
        //     testbenchPath: selectedTestbenchFile.absolutePath,
        //     svPath: selectedSvFile.absolutePath
        // });


        console.log(
            "Starting simulation with type: " +
            configuration?.simulation.type +
            " and file: " +
            configuration?.simulation.testBench,
        );

        if(configuration?.simulation.type === "verilatorC++") {
            const newInput = {
                repoId: repository.id,
                testbenchPath: configuration?.simulation.testBench.absolutePath,
            };
            setVerilatorCppInput(newInput); // <- toto spustí subscription
        }


        if(configuration?.simulation.type === "verilatorSystemVerilog") {
            const newInput = {
                repoId: repository.id,
                testbenchPath: configuration?.simulation.testBench.absolutePath,
            };
            setVerilatorSvInput(newInput); // <- toto spustí subscription
        }

        if(configuration?.simulation.type === "icarusVerilog") {
            const newInput = {
                repoId: repository.id,
                testbenchPath: configuration?.simulation.testBench.absolutePath,
            };
            setIcarusInput(newInput); // <- toto spustí subscription
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

    const onStartSynthesis = () => {
        // TODO: maxo start synthesis
        console.log(
            "Starting synthesis with type: " +
                configuration?.synthesis.type +
                " and file: " +
                configuration?.synthesis.file.absolutePath
        );
    };

    const handleFileClick = (item: RepositoryItem) => {
        if (item.type !== "file-display" && item.type !== "file") {
            return;
        }

        const fileDisplay: FileDisplayItem = {
            type: "file-display",
            name: item.name,
            absolutePath: item.absolutePath,
            lastActivity: item.lastActivity,
            language: item.language,
        };

        if (!openFiles.some((file: FileDisplayItem) => file.absolutePath === item.absolutePath)) {
            setOpenFiles((prevFiles: Array<FileDisplayItem>) => [...prevFiles, fileDisplay]);
        }
        setActiveFile(fileDisplay);
    };

    const handleTabSwitch = (item: FileDisplayItem) => {
        setActiveFile(item);
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

    const saveSessionDebounced = useDebouncedCallback(() => {
        const transformedOpenFiles = openFiles.map((file) => ({
            name: file.name,
            type: file.type,
            lastActivity: new Date(file.lastActivity),
            language: file.language,
            absolutePath: file.absolutePath,
        }));

        const transformedActiveFile = activeFile
            ? {
                  name: activeFile.name,
                  type: activeFile.type,
                  lastActivity: new Date(activeFile.lastActivity),
                  language: activeFile.language,
                  absolutePath: activeFile.absolutePath,
              }
            : null;

        saveSession.mutate({
            activeFile: transformedActiveFile,
            openFiles: transformedOpenFiles,
            repoId: repository.id,
        });
    }, 3000);

    useEffect(() => {
        saveSessionDebounced();
    }, [openFiles, activeFile, repository.id, saveSessionDebounced]);

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
                onStartSimulation={onStartSimulation}
                onStartSynthesis={onStartSynthesis}
                configuration={configuration}
                setConfiguration={setConfiguration}
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
                <ResizablePanel defaultSize={80}>
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
                            collapsible
                            collapsedSize={0}
                        >
                            <SidebarTabContent
                                activeSidebarContent={activeSidebarContent}
                                repository={repository}
                                tree={tree}
                                setTreeAction={setTree}
                                changes={changes.data?.changes ?? []}
                                handleCloseSidebarAction={handleCloseSidebar}
                                onFileClick={handleFileClick}
                                onCommit={{
                                    action: handleOnCommit,
                                    isLoading: commitMutation.isPending,
                                }}
                                configuration={configuration}
                                setConfigurationAction={setConfiguration}
                            />
                        </ResizablePanel>

                        <ResizableHandle />

                        <ResizablePanel defaultSize={80}>
                            <EditorTabs
                                openFiles={openFiles}
                                setOpenFilesAction={setOpenFiles}
                                activeFile={activeFile}
                                setActiveFileAction={setActiveFile}
                                handleTabSwitchAction={handleTabSwitch}
                                handleCloseTabAction={handleCloseTab}
                            />
                            {activeFile ? (
                                <DynamicEditor
                                    filePath={
                                        repository.ownerName +
                                        "/" +
                                        repository.name +
                                        "/" +
                                        activeFile.absolutePath
                                    }
                                />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                                    No file open
                                </div>
                            )}
                        </ResizablePanel>
                    </ResizablePanelGroup>
                </ResizablePanel>

                <ResizableHandle />

                <ResizablePanel defaultSize={20} collapsible collapsedSize={0}>
                    <BottomPanelTabContent
                        activeBottomPanelContent={activeBottomPanelContent}
                        handleCloseBottomPanel={handleCloseBottomPanel}
                        configuration={configuration}
                        simulationOutput={resultVerilatorCpp.data ?? resultIcarus.data ?? resultVerilatorSv.data ?? []}
                        lastSimulation={lastSimulation}
                    />
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    );
}
