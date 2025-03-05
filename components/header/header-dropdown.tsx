"use client";

import { imgSrc } from "@/lib/client-file-utils";
import { OnboardedUser } from "@/lib/types/user";
import {
    Building,
    Folders,
    LayoutDashboard,
    LogOut,
    Settings,
    UserRound,
    UsersRound,
} from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import * as React from "react";

import { AvatarDisplay } from "@/components/avatar-display/avatar-display";
import { DynamicTitle } from "@/components/dynamic-title-link/dynamic-title";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TooltipProvider } from "@/components/ui/tooltip";

interface HeaderDropdownProps {
    user: OnboardedUser;
}

export const HeaderDropdown = ({ user }: HeaderDropdownProps) => {
    const { username, name, surname, image } = user;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="rounded-full">
                <AvatarDisplay
                    displayType={"card"}
                    image={imgSrc(image)}
                    name={name + " " + surname}
                    className="bg-header-button-hover text-header-foreground"
                />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="min-w-44">
                <DropdownMenuLabel>
                    <div className="flex flex-row items-center gap-x-3">
                        <AvatarDisplay
                            displayType={"card"}
                            image={imgSrc(image)}
                            name={name + " " + surname}
                        />
                        <div className="flex flex-col gap-x-3">
                            <span className="text-sm">
                                {name} {surname}
                            </span>
                            <TooltipProvider delayDuration={0}>
                                <DynamicTitle
                                    title={username}
                                    link={"/" + username}
                                    className="text-sm"
                                />
                            </TooltipProvider>
                        </div>
                    </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <Link href={"/" + username + "/dashboard"} className="text-sm">
                    <DropdownMenuItem className="flex cursor-pointer justify-between p-2">
                        <span>Dashboard</span>
                        <LayoutDashboard className="text-muted-foreground" />
                    </DropdownMenuItem>
                </Link>

                <Link href={"/" + username} className="text-sm">
                    <DropdownMenuItem className="flex cursor-pointer justify-between p-2">
                        <span>My profile</span>
                        <UserRound className="text-muted-foreground" />
                    </DropdownMenuItem>
                </Link>

                <Link
                    href={"/" + username + "/repositories"}
                    className="text-sm"
                >
                    <DropdownMenuItem className="flex cursor-pointer justify-between p-2">
                        <span>My repositories</span>
                        <Folders className="text-muted-foreground" />
                    </DropdownMenuItem>
                </Link>

                <Link
                    href={"/" + username + "/organisations"}
                    className="text-sm"
                >
                    <DropdownMenuItem className="flex cursor-pointer justify-between p-2">
                        <span>My organisations</span>
                        <Building className="text-muted-foreground" />
                    </DropdownMenuItem>
                </Link>

                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                    <DropdownMenuLabel className="text-xs text-muted-foreground">
                        General
                    </DropdownMenuLabel>

                    <Link href={"/orgs"} className="text-sm">
                        <DropdownMenuItem className="flex cursor-pointer justify-between p-2">
                            <span>All organisations</span>
                            <Building className="text-muted-foreground" />
                        </DropdownMenuItem>
                    </Link>

                    <Link href={"/users"} className="text-sm">
                        <DropdownMenuItem className="flex cursor-pointer justify-between p-2">
                            <span>All users</span>
                            <UsersRound className="text-muted-foreground" />
                        </DropdownMenuItem>
                    </Link>

                    <Link
                        href={"/" + username + "/settings"}
                        className="text-sm"
                    >
                        <DropdownMenuItem className="flex cursor-pointer justify-between p-2">
                            <span>Settings</span>
                            <Settings className="text-muted-foreground" />
                        </DropdownMenuItem>
                    </Link>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <button
                    className="w-full rounded border border-accent bg-background"
                    onClick={() => signOut()}
                >
                    <DropdownMenuItem className="flex cursor-pointer justify-between p-2">
                        <span>Log out</span>
                        <LogOut className="text-muted-foreground" />
                    </DropdownMenuItem>
                </button>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
