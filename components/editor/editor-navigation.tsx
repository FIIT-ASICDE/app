"use client";

import { imgSrc } from "@/lib/client-file-utils";
import { cn } from "@/lib/utils";
import {
    Building,
    Command,
    File,
    Folders,
    Home,
    LogOut,
    Search,
    Settings,
    Terminal,
} from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { Dispatch, SetStateAction, useState } from "react";

import { AvatarDisplay } from "@/components/avatar-display/avatar-display";
import { CommandBarDialog } from "@/components/command-bar-dialog/command-bar-dialog";
import { useUser } from "@/components/context/user-context";
import { NavigationButton } from "@/components/editor/navigation-button";
import { SidebarNavigationButton } from "@/components/editor/sidebar-navigation-button";
import GithubIcon from "@/components/icons/github";
import LogoIcon from "@/components/icons/logo";
import { TooltipDropdown } from "@/components/tooltip-dropdown/tooltip-dropdown";
import {
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { TabsList } from "@/components/ui/tabs";

interface EditorNavigationProps {
    activeSidebarContent: string;
    setActiveSidebarContentAction: Dispatch<SetStateAction<string>>;
}

export default function EditorNavigation({
    activeSidebarContent,
    setActiveSidebarContentAction,
}: EditorNavigationProps) {
    const { user } = useUser();
    const [commandOpen, setCommandOpen] = useState(false);

    return (
        <>
            <div className="fixed left-0 top-0 z-50 flex h-screen w-14 flex-col rounded-none border-r bg-header">
                <div className="flex flex-col items-center gap-2 p-2">
                    <NavigationButton
                        icon={LogoIcon}
                        tooltip="Home"
                        onClick={() => {}}
                    />
                    <NavigationButton
                        icon={Command}
                        tooltip="Command"
                        onClick={() => setCommandOpen(!commandOpen)}
                    />
                </div>
                <Separator
                    orientation="horizontal"
                    className="mx-auto w-3/5 bg-gray-600"
                />
                <TabsList className="flex flex-1 flex-col items-center gap-2 bg-header p-2">
                    <SidebarNavigationButton
                        value="fileExplorer"
                        icon={File}
                        tooltip="File Explorer"
                        activeSidebarContent={activeSidebarContent}
                        setActiveSidebarContent={setActiveSidebarContentAction}
                    />
                    <SidebarNavigationButton
                        value="search"
                        icon={Search}
                        tooltip="Search"
                        activeSidebarContent={activeSidebarContent}
                        setActiveSidebarContent={setActiveSidebarContentAction}
                    />
                    <SidebarNavigationButton
                        value="sourceControl"
                        icon={GithubIcon}
                        tooltip="Source Control"
                        activeSidebarContent={activeSidebarContent}
                        setActiveSidebarContent={setActiveSidebarContentAction}
                    />
                </TabsList>
                <div className="flex flex-col items-center gap-2 p-2">
                    <NavigationButton
                        icon={Terminal}
                        tooltip="Terminal"
                        onClick={() => {}}
                    />
                    <NavigationButton
                        icon={Settings}
                        tooltip="Settings"
                        onClick={() => {}}
                    />
                    <TooltipDropdown
                        tooltip="Account"
                        dropdownTrigger={
                            <button
                                className={cn(
                                    "flex h-10 w-10 items-center justify-center rounded-full p-0",
                                    "text-header-foreground",
                                    "hover:bg-header-button-hover hover:text-header-foreground",
                                )}
                            >
                                <AvatarDisplay
                                    displayType={"card"}
                                    image={imgSrc(user.image)}
                                    name={user.name + " " + user.surname}
                                />
                            </button>
                        }
                        dropdownContent={
                            <DropdownMenuContent>
                                <DropdownMenuLabel>
                                    <div className="flex flex-row items-center gap-x-3">
                                        <AvatarDisplay
                                            displayType={"card"}
                                            image={imgSrc(user.image)}
                                            name={
                                                user.name + " " + user.surname
                                            }
                                        />
                                        <div className="flex flex-col gap-x-3">
                                            <span className="text-sm">
                                                {user.name} {user.surname}
                                            </span>
                                            <span className="text-xs text-muted-foreground">
                                                {user.username}
                                            </span>
                                        </div>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <Link
                                    href={"/" + user.username}
                                    className="text-sm"
                                >
                                    <DropdownMenuItem className="flex cursor-pointer justify-between p-2">
                                        <span>Home</span>
                                        <Home className="text-muted-foreground" />
                                    </DropdownMenuItem>
                                </Link>
                                <Link
                                    href={"/" + user.username + "/repositories"}
                                    className="text-sm"
                                >
                                    <DropdownMenuItem className="flex cursor-pointer justify-between p-2">
                                        <span>Repositories</span>
                                        <Folders className="text-muted-foreground" />
                                    </DropdownMenuItem>
                                </Link>
                                <Link
                                    href={
                                        "/" + user.username + "/organisations"
                                    }
                                    className="text-sm"
                                >
                                    <DropdownMenuItem className="flex cursor-pointer justify-between p-2">
                                        <span>Organisations</span>
                                        <Building className="text-muted-foreground" />
                                    </DropdownMenuItem>
                                </Link>
                                <DropdownMenuSeparator />
                                <button
                                    className="w-full"
                                    onClick={() => signOut()}
                                >
                                    <DropdownMenuItem className="flex cursor-pointer justify-between p-2">
                                        <span>Log out</span>
                                        <LogOut className="text-muted-foreground" />
                                    </DropdownMenuItem>
                                </button>
                            </DropdownMenuContent>
                        }
                        tooltipSide="right"
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
}
