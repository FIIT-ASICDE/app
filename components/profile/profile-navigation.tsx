"use client";

import { User } from "@/lib/types/user";
import { BookUser, Folders, Settings, UsersRound } from "lucide-react";
import { usePathname } from "next/navigation";

import { NavigationButton } from "@/components/navigation-button/navigation-button";

interface ProfileNavigationProps {
    profile: User;
    isItMe: boolean;
}

export const ProfileNavigation = ({
    profile,
    isItMe,
}: ProfileNavigationProps) => {
    const pathname: string = usePathname();

    const getCurrentPage = (): string => {
        const parts = pathname.split("/").filter(Boolean);
        return parts.length > 1 ? "/" + parts.slice(1).join("/") : "/";
    };

    const currentPage: string = getCurrentPage();

    return (
        <div className="mr-6 flex flex-row justify-end gap-x-1">
            <NavigationButton
                title="Overview"
                icon={BookUser}
                variant={currentPage === "/" ? "secondary" : "outline"}
                link={"/" + profile.username}
                access="interactive"
            />
            <NavigationButton
                title="Repositories"
                icon={Folders}
                variant={
                    currentPage === "/repositories" ? "secondary" : "outline"
                }
                link={"/" + profile.username + "/repositories"}
                access="interactive"
            />
            <NavigationButton
                title="Organisations"
                icon={UsersRound}
                variant={
                    currentPage === "/organisations" ? "secondary" : "outline"
                }
                link={"/" + profile.username + "/organisations"}
                access="interactive"
            />
            <NavigationButton
                title="Settings"
                icon={Settings}
                variant={currentPage === "/settings" ? "secondary" : "outline"}
                link={"/" + profile.username + "/settings"}
                access={isItMe ? "interactive" : "none"}
            />
        </div>
    );
};
