import type {
    BottomPanelContentTab,
    SidebarContentTab,
    SimulationConfiguration,
    SimulationType,
} from "@/lib/types/editor";
import { Repository, RepositoryItem } from "@/lib/types/repository";
import {
    Cog,
    Command,
    File,
    GitCommitHorizontal,
    SearchIcon,
} from "lucide-react";
import Link from "next/link";
import { Dispatch, RefObject, SetStateAction, useState } from "react";
import type { ImperativePanelGroupHandle } from "react-resizable-panels";

import { CommandBarDialog } from "@/components/command/command-bar-dialog";
import { useUser } from "@/components/context/user-context";
import { NavigationButton } from "@/components/editor/navigation/navigation-button";
import { SidebarNavigationButton } from "@/components/editor/navigation/sidebar-navigation-button";
import { SimulationButton } from "@/components/editor/navigation/simulation-button";
import { SimulationDialog } from "@/components/editor/simulation-dialog";
import { HeaderDropdown } from "@/components/header/header-dropdown";
import LogoIcon from "@/components/icons/logo";
import { Separator } from "@/components/ui/separator";

interface EditorNavigationProps {
    sidebarProps: {
        horizontalGroupRef: RefObject<ImperativePanelGroupHandle>;
        horizontalCollapsed: boolean;
        setHorizontalCollapsed: Dispatch<SetStateAction<boolean>>;
        activeSidebarContent: SidebarContentTab;
        setActiveSidebarContent: Dispatch<SetStateAction<SidebarContentTab>>;
        lastOpenedSidebarSize: number;
        setLastOpenedSidebarSize: Dispatch<SetStateAction<number>>;
    };
    bottomPanelProps: {
        verticalGroupRef: RefObject<ImperativePanelGroupHandle>;
        verticalCollapsed: boolean;
        setVerticalCollapsed: Dispatch<SetStateAction<boolean>>;
        activeBottomPanelContent: BottomPanelContentTab;
        setActiveBottomPanelContent: Dispatch<
            SetStateAction<BottomPanelContentTab>
        >;
        lastOpenedBottomPanelSize: number;
        setLastOpenedBottomPanelSize: Dispatch<SetStateAction<number>>;
    };
    simulationProps: {
        onStartSimulation: (
            selectedType: SimulationType,
            selectedFile: RepositoryItem,
        ) => void;
        simulationConfiguration: SimulationConfiguration | undefined;
        setSimulationConfiguration: Dispatch<
            SetStateAction<SimulationConfiguration | undefined>
        >;
    };
    isGitRepo?: boolean;
    repository: Repository;
}

export const EditorNavigation = ({
    sidebarProps: {
        horizontalGroupRef,
        horizontalCollapsed,
        setHorizontalCollapsed,
        activeSidebarContent,
        setActiveSidebarContent,
        lastOpenedSidebarSize,
        setLastOpenedSidebarSize,
    },
    bottomPanelProps: {
        verticalGroupRef,
        verticalCollapsed,
        setVerticalCollapsed,
        activeBottomPanelContent,
        setActiveBottomPanelContent,
        lastOpenedBottomPanelSize,
        setLastOpenedBottomPanelSize,
    },
    simulationProps: {
        onStartSimulation,
        simulationConfiguration,
        setSimulationConfiguration,
    },
    isGitRepo,
    repository,
}: EditorNavigationProps) => {
    const { user } = useUser();

    const [commandOpen, setCommandOpen] = useState<boolean>(false);
    const [simulationOpen, setSimulationOpen] = useState<boolean>(false);

    const toggleVerticalCollapse = (
        bottomPanelContentTab: BottomPanelContentTab,
    ) => {
        if (verticalGroupRef.current) {
            if (bottomPanelContentTab === activeBottomPanelContent) {
                if (verticalCollapsed) {
                    verticalGroupRef.current.setLayout([
                        100 - lastOpenedBottomPanelSize,
                        lastOpenedBottomPanelSize,
                    ]);
                    setVerticalCollapsed(false);
                } else {
                    setLastOpenedBottomPanelSize(
                        verticalGroupRef.current.getLayout()[1],
                    );
                    verticalGroupRef.current.setLayout([100, 0]);
                    setVerticalCollapsed(true);
                }
            } else {
                verticalGroupRef.current.setLayout([
                    100 - lastOpenedBottomPanelSize,
                    lastOpenedBottomPanelSize,
                ]);
                setVerticalCollapsed(false);
            }
        }
    };

    const toggleHorizontalCollapse = (sidebarContentTab: SidebarContentTab) => {
        if (horizontalGroupRef.current) {
            if (sidebarContentTab === activeSidebarContent) {
                if (horizontalCollapsed) {
                    horizontalGroupRef.current.setLayout([
                        lastOpenedSidebarSize,
                        100 - lastOpenedSidebarSize,
                    ]);
                    setHorizontalCollapsed(false);
                } else {
                    setLastOpenedSidebarSize(
                        horizontalGroupRef.current.getLayout()[0],
                    );
                    horizontalGroupRef.current.setLayout([0, 100]);
                    setHorizontalCollapsed(true);
                }
            } else {
                horizontalGroupRef.current.setLayout([
                    lastOpenedSidebarSize,
                    100 - lastOpenedSidebarSize,
                ]);
                setHorizontalCollapsed(false);
            }
        }
    };

    return (
        <>
            <div className="flex h-full w-14 flex-col rounded-none border-r bg-header">
                <div className="flex flex-col items-center gap-2 p-2">
                    <Link href={"/"}>
                        <NavigationButton icon={LogoIcon} tooltip="Home" />
                    </Link>
                    <NavigationButton
                        icon={Command}
                        tooltip="Command"
                        onClick={() => setCommandOpen(!commandOpen)}
                    />
                </div>

                <Separator
                    orientation="horizontal"
                    className="mx-auto w-3/5 bg-accent"
                />

                <div className="flex flex-1 flex-col items-center gap-2 bg-header p-2">
                    <SidebarNavigationButton
                        value="fileExplorer"
                        icon={File}
                        tooltip="File Explorer"
                        activeSidebarContent={activeSidebarContent}
                        onClick={() => {
                            toggleHorizontalCollapse("fileExplorer");
                            setActiveSidebarContent("fileExplorer");
                        }}
                    />
                    <SidebarNavigationButton
                        value="search"
                        icon={SearchIcon}
                        tooltip="Search"
                        activeSidebarContent={activeSidebarContent}
                        onClick={() => {
                            toggleHorizontalCollapse("search");
                            setActiveSidebarContent("search");
                        }}
                    />
                    {isGitRepo && (
                        <SidebarNavigationButton
                            value="sourceControl"
                            icon={GitCommitHorizontal}
                            tooltip="Source Control"
                            activeSidebarContent={activeSidebarContent}
                            onClick={() => {
                                toggleHorizontalCollapse("sourceControl");
                                setActiveSidebarContent("sourceControl");
                            }}
                        />
                    )}
                </div>

                <div className="flex flex-col items-center gap-2 p-2">
                    <SimulationButton
                        setSimulationOpen={setSimulationOpen}
                        onStartSimulation={(
                            selectedType: SimulationType,
                            selectedFile: RepositoryItem,
                        ) => {
                            if (verticalGroupRef.current) {
                                verticalGroupRef.current.setLayout([
                                    100 - lastOpenedBottomPanelSize,
                                    lastOpenedBottomPanelSize,
                                ]);
                                setVerticalCollapsed(false);
                                setActiveBottomPanelContent("simulation");
                            }
                            onStartSimulation(selectedType, selectedFile);
                        }}
                        simulationConfiguration={simulationConfiguration}
                    />
                    <NavigationButton
                        icon={Cog}
                        tooltip="Synthesis"
                        onClick={() => {
                            toggleVerticalCollapse("synthesis");
                            setActiveBottomPanelContent("synthesis");
                        }}
                    />
                    <HeaderDropdown
                        user={user}
                        avatarDisplayType="select"
                        className="my-2"
                    />
                </div>
            </div>

            <SimulationDialog
                repository={repository}
                onStartSimulation={(
                    selectedType: SimulationType,
                    selectedFile: RepositoryItem,
                ) => {
                    if (verticalGroupRef.current) {
                        verticalGroupRef.current.setLayout([
                            100 - lastOpenedBottomPanelSize,
                            lastOpenedBottomPanelSize,
                        ]);
                        setVerticalCollapsed(false);
                        setActiveBottomPanelContent("simulation");
                    }
                    onStartSimulation(selectedType, selectedFile);
                }}
                simulationOpen={simulationOpen}
                setSimulationOpen={setSimulationOpen}
                setSimulationConfiguration={setSimulationConfiguration}
            />

            <CommandBarDialog
                user={user}
                commandOpen={commandOpen}
                setCommandOpen={setCommandOpen}
            />
        </>
    );
};
