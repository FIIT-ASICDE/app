"use client";

import { commitSchema } from "@/lib/schemas/git-schemas";
import { api } from "@/lib/trpc/react";
import type {
    BottomPanelContentTab,
    SidebarContentTab,
    SimulationConfiguration,
    SimulationType,
} from "@/lib/types/editor";
import type {
    FileDisplayItem,
    Repository,
    RepositoryItem,
} from "@/lib/types/repository";
import { X } from "lucide-react";
import dynamic from "next/dynamic";
import { type ElementRef, useEffect, useRef, useState } from "react";
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
import DiagramPage from "@/app/diagram-test/page";

interface EditorPageProps {
    repository: Repository;
}

const DynamicEditor = dynamic(() => import("@/components/editor/editor"), {
    loading: () => <p>Loading...</p>,
    ssr: false,
});

export default function EditorPage({ repository }: EditorPageProps) {
    const [activeSidebarContent, setActiveSidebarContent] =
        useState<SidebarContentTab>("fileExplorer");
    const [activeBottomPanelContent, setActiveBottomPanelContent] =
        useState<BottomPanelContentTab>("simulation");

    const verticalGroupRef =
        useRef<ElementRef<typeof ResizablePanelGroup>>(null);
    const horizontalGroupRef =
        useRef<ElementRef<typeof ResizablePanelGroup>>(null);

    const [verticalCollapsed, setVerticalCollapsed] = useState<boolean>(false);
    const [horizontalCollapsed, setHorizontalCollapsed] =
        useState<boolean>(false);
    const [lastOpenedSidebarSize, setLastOpenedSidebarSize] =
        useState<number>(20);
    const [lastOpenedBottomPanelSize, setLastOpenedBottomPanelSize] =
        useState<number>(20);
    const [activeFile, setActiveFile] = useState<FileDisplayItem | null>(null);
    const [openFiles, setOpenFiles] = useState<FileDisplayItem[]>([]);

    const [simulationConfiguration, setSimulationConfiguration] = useState<
        SimulationConfiguration | undefined
    >(undefined);

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
            toast.success(
                "Successfully commited " + changes.data?.changes.length,
            );
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

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

    const onStartSimulation = (
        selectedType: SimulationType,
        selectedFile: RepositoryItem,
    ) => {
        // TODO: adam start simulation
        console.log(
            "Starting simulation with type: " +
                selectedType +
                " and file: " +
                selectedFile?.name,
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

        if (!openFiles.some((file) => file.name === item.name)) {
            setOpenFiles((prevFiles) => [...prevFiles, fileDisplay]);
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

    const isDiagramFile = (file: FileDisplayItem) => {
        const fileName = file.name.toLowerCase();
        return fileName.endsWith('.bd');
    };

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
                simulationProps={{
                    onStartSimulation,
                    simulationConfiguration,
                    setSimulationConfiguration,
                }}
                isGitRepo={repository.isGitRepo}
                repository={repository}
                onStartSimulation={onStartSimulation}
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
                            />
                        </ResizablePanel>

                        <ResizableHandle />

                        <ResizablePanel defaultSize={80}>
                            <div className="flex bg-background text-white">
                                {openFiles.map((file) => (
                                    <div key={file.name}>
                                        <span
                                            className={`flex cursor-pointer items-center justify-center px-2 py-2 text-sm font-semibold ${
                                                activeFile?.name === file.name
                                                    ? "bg-[#1e1e1e] text-white"
                                                    : "text-gray-400 hover:bg-[#444444]"
                                            }`}
                                            onClick={() =>
                                                handleTabSwitch(file)
                                            }
                                        >
                                            {file.name}
                                            <button
                                                className="ml-2 hover:text-white"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleCloseTab(file);
                                                }}
                                            >
                                                <X className="h-4 w-4" />
                                            </button>
                                        </span>
                                    </div>
                                ))}
                            </div>
                            {activeFile ? (
                                isDiagramFile(activeFile) ? (
                                    <DiagramPage repository={repository} />
                                    ) : (
                                        <DynamicEditor
                                            filePath={
                                                repository.ownerName +
                                                "/" +
                                                repository.name +
                                                "/" +
                                                activeFile.absolutePath
                                            }
                                        />
                                    )
                            ) : (
                                <div className="flex h-full w-full items-center justify-center text-gray-400">
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
                    />
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    );
}
