"use client";

import { imgSrc } from "@/lib/client-file-utils";
import { Folders, Home, LogOut, Mail, Settings, UsersRound } from "lucide-react";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";
import * as React from "react";

import { AvatarDisplay } from "@/components/avatar-display/avatar-display";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HeaderDropdownProps {
    user: Session["user"];
}

export const HeaderDropdown = ({
    user: { username, name, surname, image },
}: HeaderDropdownProps) => {
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
            <DropdownMenuContent>
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
                            <span className="text-xs text-muted-foreground">
                                {username}
                            </span>
                        </div>
                    </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <Link href={"/" + username} className="text-sm">
                    <DropdownMenuItem className="flex cursor-pointer justify-between p-2">
                        <span>Home</span>
                        <Home className="text-muted-foreground" />
                    </DropdownMenuItem>
                </Link>

                <Link
                    href={"/" + username + "/repositories"}
                    className="text-sm"
                >
                    <DropdownMenuItem className="flex cursor-pointer justify-between p-2">
                        <span>Repositories</span>
                        <Folders className="text-muted-foreground" />
                    </DropdownMenuItem>
                </Link>

                <Link
                    href={"/" + username + "/organisations"}
                    className="text-sm"
                >
                    <DropdownMenuItem className="flex cursor-pointer justify-between p-2">
                        <span>Organisations</span>
                        <UsersRound className="text-muted-foreground" />
                    </DropdownMenuItem>
                </Link>

                <Link
                    href={"/" + username + "/invitations"}
                    className="text-sm"
                >
                    <DropdownMenuItem className="flex cursor-pointer justify-between p-2">
                        <span>Invitations</span>
                        <Mail className="text-muted-foreground" />
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

                <DropdownMenuSeparator />

                <button className="w-full border border-accent rounded bg-background" onClick={() => signOut()}>
                    <DropdownMenuItem className="flex cursor-pointer justify-between p-2">
                        <span>Log out</span>
                        <LogOut className="text-muted-foreground" />
                    </DropdownMenuItem>
                </button>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
