import type {
    BottomPanelContentTab,
    SidebarContentTab,
} from "@/lib/types/editor";
import { Command, File, SearchIcon, Settings, Terminal } from "lucide-react";
import Link from "next/link";
import { Dispatch, RefObject, SetStateAction, useState } from "react";
import { ImperativePanelGroupHandle } from "react-resizable-panels";

import { CommandBarDialog } from "@/components/command-bar-dialog/command-bar-dialog";
import { useUser } from "@/components/context/user-context";
import { NavigationButton } from "@/components/editor/navigation-button";
import { SidebarNavigationButton } from "@/components/editor/sidebar-navigation-button";
import { HeaderDropdown } from "@/components/header/header-dropdown";
import GithubIcon from "@/components/icons/github";
import LogoIcon from "@/components/icons/logo";
import { Separator } from "@/components/ui/separator";

interface EditorNavigationProps {
    activeSidebarContent: SidebarContentTab;
    setActiveSidebarContent: Dispatch<SetStateAction<SidebarContentTab>>;
    activeBottomPanelContent: BottomPanelContentTab;
    setActiveBottomPanelContent: Dispatch<
        SetStateAction<BottomPanelContentTab>
    >;
    verticalGroupRef: RefObject<ImperativePanelGroupHandle>;
    horizontalGroupRef: RefObject<ImperativePanelGroupHandle>;
    verticalCollapsed: boolean;
    setVerticalCollapsed: Dispatch<SetStateAction<boolean>>;
    horizontalCollapsed: boolean;
    setHorizontalCollapsed: Dispatch<SetStateAction<boolean>>;
    lastOpenedBottomPanelSize: number;
    setLastOpenedBottomPanelSize: Dispatch<SetStateAction<number>>;
    lastOpenedSidebarSize: number;
    setLastOpenedSidebarSize: Dispatch<SetStateAction<number>>;
}

export const EditorNavigation = ({
    activeSidebarContent,
    setActiveSidebarContent,
    activeBottomPanelContent,
    setActiveBottomPanelContent,
    verticalGroupRef,
    horizontalGroupRef,
    verticalCollapsed,
    setVerticalCollapsed,
    horizontalCollapsed,
    setHorizontalCollapsed,
    lastOpenedBottomPanelSize,
    setLastOpenedBottomPanelSize,
    lastOpenedSidebarSize,
    setLastOpenedSidebarSize,
}: EditorNavigationProps) => {
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
                    <SidebarNavigationButton
                        value="sourceControl"
                        icon={GithubIcon}
                        tooltip="Source Control"
                        activeSidebarContent={activeSidebarContent}
                        onClick={() => {
                            toggleHorizontalCollapse("sourceControl");
                            setActiveSidebarContent("sourceControl");
                        }}
                    />
                </div>

                <div className="flex flex-col items-center gap-2 p-2">
                    <NavigationButton
                        icon={Terminal}
                        tooltip="Terminal"
                        onClick={() => {
                            toggleVerticalCollapse("terminal");
                            setActiveBottomPanelContent("terminal");
                        }}
                    />
                    <NavigationButton
                        icon={Settings}
                        tooltip="Settings"
                        onClick={() => {
                            toggleVerticalCollapse("settings");
                            setActiveBottomPanelContent("settings");
                        }}
                    />
                    <HeaderDropdown user={user} />
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
