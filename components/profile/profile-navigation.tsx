"use client";

import { User } from "@/lib/types/user";
import { BookUser, Building, Folders, Settings } from "lucide-react";
import { usePathname } from "next/navigation";
import { ReactElement } from "react";

import { getCurrentPage } from "@/components/generic/generic";
import { NavigationButton } from "@/components/generic/navigation-button";

interface ProfileNavigationProps {
    profile: User;
    isItMe: boolean;
}

/**
 * Navigation component used on the user profile page
 *
 * @param {ProfileNavigationProps} props - Component props
 * @returns {ReactElement} Navigation component
 */
export const ProfileNavigation = ({
    profile,
    isItMe,
}: ProfileNavigationProps): ReactElement => {
    const pathname: string = usePathname();
    const currentPage: string = getCurrentPage(pathname, 1);

    return (
        <div className="mr-6 flex flex-row justify-end gap-x-1">
            <NavigationButton
                title="overview"
                icon={BookUser}
                variant={currentPage === "/" ? "secondary" : "outline"}
                link={"/" + profile.username}
                access="interactive"
            />
            <NavigationButton
                title="repositories"
                icon={Folders}
                variant={
                    currentPage === "/repositories" ? "secondary" : "outline"
                }
                link={"/" + profile.username + "/repositories"}
                access="interactive"
            />
            <NavigationButton
                title="organisations"
                icon={Building}
                variant={
                    currentPage === "/organisations" ? "secondary" : "outline"
                }
                link={"/" + profile.username + "/organisations"}
                access="interactive"
            />
            <NavigationButton
                title="settings"
                icon={Settings}
                variant={currentPage === "/settings" ? "secondary" : "outline"}
                link={"/" + profile.username + "/settings"}
                access={isItMe ? "interactive" : "none"}
            />
        </div>
    );
};
