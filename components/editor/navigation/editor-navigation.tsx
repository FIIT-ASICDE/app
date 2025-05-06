"use client";

import type {
    BottomPanelContentTab,
    Configuration,
    SidebarContentTab,
} from "@/lib/types/editor";
import { Repository } from "@/lib/types/repository";
import {
    Cog,
    Command,
    File,
    GitCommitHorizontal,
    Play,
    PlayCircle,
    SearchIcon
} from "lucide-react";
import Link from "next/link";
import {
    Dispatch,
    ReactElement,
    RefObject,
    SetStateAction,
    useState,
} from "react";
import type { ImperativePanelGroupHandle } from "react-resizable-panels";

import { CommandBarDialog } from "@/components/command/command-bar-dialog";
import { useUser } from "@/components/context/user-context";
import { NavigationButton } from "@/components/editor/navigation/navigation-button";
import { SidebarNavigationButton } from "@/components/editor/navigation/sidebar-navigation-button";
import { HeaderDropdown } from "@/components/header/header-dropdown";
import LogoIcon from "@/components/icons/logo";
import { Button } from "@/components/ui/button";
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
    onStartSimulationAction: () => void;
    onStartSynthesisAction: () => void;
    configuration: Configuration | undefined;
    isGitRepo?: boolean;
    repository: Repository;
}

/**
 * Navigation component within the editor page
 *
 * @param {EditorNavigationProps} props - Component props
 * @returns {ReactElement} Navigation component
 */
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
    onStartSimulationAction,
    onStartSynthesisAction,
    configuration,
    isGitRepo,
}: EditorNavigationProps): ReactElement => {
    const { user } = useUser();

    const [commandOpen, setCommandOpen] = useState<boolean>(false);

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

    const getSimulationTooltipContent = () => {
        if (!configuration || !configuration.simulation || !configuration.simulation.type || !configuration.simulation.testBench) {
            return (
                <p className="flex flex-row items-center justify-center w-fit gap-x-3">
                    <span className="text-sm text-muted-foreground">Simulation not yet configured</span>
                    <Button
                        variant="outline"
                        size="default"
                        onClick={() => {
                            if (activeSidebarContent !== "configuration" || horizontalCollapsed) {
                                toggleHorizontalCollapse("configuration");
                                setActiveSidebarContent("configuration");
                            }
                        }}
                    >
                        <Cog />
                        Configure
                    </Button>
                </p>
            );
        }

        return (
            <div className="flex w-fit flex-col items-center gap-y-2">
                <Button
                    variant="outline"
                    size="default"
                    onClick={() => {
                        if (activeBottomPanelContent !== "simulation") {
                            toggleVerticalCollapse("simulation");
                            setActiveBottomPanelContent("simulation");
                        }
                        onStartSimulationAction();
                    }}
                    disabled={!configuration || !configuration.simulation || !configuration.simulation.type || !configuration.simulation.testBench}
                >
                    Run simulation
                </Button>
                <div className="flex w-full flex-col gap-y-1">
                    <div className="flex w-full flex-row items-center justify-between gap-x-2 text-sm">
                        <span className="text-muted-foreground">
                            Simulation type:
                        </span>
                        <span>{configuration.simulation.type}</span>
                    </div>
                    <div className="flex w-full flex-row items-center justify-between gap-x-2 text-sm">
                        <span className="text-muted-foreground">
                            TestBench file:
                        </span>
                        <span>{configuration?.simulation?.testBench?.name ?? "N/A"}</span>
                    </div>
                </div>
            </div>
        );
    };

    const getSynthesisTooltipContent = () => {
        if (!configuration || !configuration.synthesis || !configuration.synthesis.type || !configuration.synthesis.file) {
            return (
                <p className="flex flex-row items-center justify-center w-fit gap-x-3">
                    <span className="text-sm text-muted-foreground">Synthesis not yet configured</span>
                    <Button
                        variant="outline"
                        size="default"
                        onClick={() => {
                            if (activeSidebarContent !== "configuration" || horizontalCollapsed) {
                                toggleHorizontalCollapse("configuration");
                                setActiveSidebarContent("configuration");
                            }
                        }}
                    >
                        <Cog />
                        Configure
                    </Button>
                </p>
            );
        }

        return (
            <div className="flex w-fit flex-col items-center gap-y-2">
                <Button
                    variant="outline"
                    size="default"
                    onClick={() => {
                        if (activeBottomPanelContent !== "synthesis") {
                            toggleVerticalCollapse("synthesis");
                            setActiveBottomPanelContent("synthesis");
                        }
                        onStartSynthesisAction();
                    }}
                    disabled={!configuration || !configuration.synthesis || !configuration.synthesis.type || !configuration.synthesis.file}
                >
                    Run synthesis
                </Button>
                <div className="flex w-full flex-col gap-y-1">
                    <div className="flex w-full flex-row items-center justify-between gap-x-2 text-sm">
                        <span className="text-muted-foreground">
                            Synthesis type:
                        </span>
                        <span>{configuration.synthesis.type}</span>
                    </div>
                    <div className="flex w-full flex-row items-center justify-between gap-x-2 text-sm">
                        <span className="text-muted-foreground">File:</span>
                        <span>{configuration.synthesis.file.name ?? "N/A"}</span>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <>
            <div className="flex h-full w-14 flex-col rounded-none border-r bg-header">
                <div className="flex flex-col items-center gap-2 p-2">
                    <Link href={"/"}>
                        <NavigationButton
                            icon={LogoIcon}
                            tooltip={<p>Home</p>}
                        />
                    </Link>
                    <NavigationButton
                        icon={Command}
                        tooltip={<p>Command</p>}
                        onClick={() => setCommandOpen(!commandOpen)}
                    />
                </div>

                <Separator orientation="horizontal" className="mx-auto w-3/5" />

                <div className="flex flex-1 flex-col items-center gap-2 bg-header p-2">
                    <SidebarNavigationButton
                        value="fileExplorer"
                        icon={File}
                        tooltip="File Explorer"
                        activeSidebarContent={activeSidebarContent}
                        sidebarOpen={!horizontalCollapsed}
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
                        sidebarOpen={!horizontalCollapsed}
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
                            sidebarOpen={!horizontalCollapsed}
                            onClick={() => {
                                toggleHorizontalCollapse("sourceControl");
                                setActiveSidebarContent("sourceControl");
                            }}
                        />
                    )}
                    <SidebarNavigationButton
                        value="configuration"
                        icon={Cog}
                        tooltip="Configuration"
                        activeSidebarContent={activeSidebarContent}
                        sidebarOpen={!horizontalCollapsed}
                        onClick={() => {
                            toggleHorizontalCollapse("configuration");
                            setActiveSidebarContent("configuration");
                        }}
                    />
                </div>

                <div className="flex flex-col items-center gap-2 p-2">
                    <NavigationButton
                        icon={Play}
                        tooltip={getSimulationTooltipContent()}
                        onClick={() => {
                            toggleVerticalCollapse("simulation");
                            setActiveBottomPanelContent("simulation");
                        }}
                    />

                    <NavigationButton
                        icon={PlayCircle}
                        tooltip={getSynthesisTooltipContent()}
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

            <CommandBarDialog
                user={user}
                commandOpen={commandOpen}
                setCommandOpen={setCommandOpen}
            />
        </>
    );
};
