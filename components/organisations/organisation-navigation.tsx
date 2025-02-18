"use client";

import type { OrganisationDisplay } from "@/lib/types/organisation";
import { BookUser, Folders, Settings, UsersRound } from "lucide-react";
import { usePathname } from "next/navigation";

import { NavigationButton } from "@/components/navigation-button/navigation-button";

interface OrganisationNavigationProps {
    organisation: OrganisationDisplay;
}

export const OrganisationNavigation = ({
    organisation,
}: OrganisationNavigationProps) => {
    const pathname: string = usePathname();

    const getCurrentPage = (): string => {
        const parts = pathname.split("/").filter(Boolean);
        if (parts.length < 2) throw new Error("Pathname invalid");
        return "/" + parts.slice(2).join("/");
    };

    const currentPage: string = getCurrentPage();

    const showSettings = () => {
        if (!organisation.userRole) return "none";
        else if (organisation.userRole === "admin") return "interactive";
        return "nonInteractive";
    };

    return (
        <div className="mr-6 flex flex-row justify-end gap-x-1">
            <NavigationButton
                title="Overview"
                icon={BookUser}
                variant={currentPage === "/" ? "secondary" : "outline"}
                link={"/orgs/" + organisation.name}
                access="interactive"
            />
            <NavigationButton
                title="Repositories"
                icon={Folders}
                variant={
                    currentPage === "/repositories" ? "secondary" : "outline"
                }
                link={"/orgs/" + organisation.name + "/repositories"}
                access="interactive"
            />
            <NavigationButton
                title="Members"
                icon={UsersRound}
                variant={currentPage === "/members" ? "secondary" : "outline"}
                link={"/orgs/" + organisation.name + "/members"}
                access="interactive"
            />
            <NavigationButton
                title="Settings"
                icon={Settings}
                variant={currentPage === "/settings" ? "secondary" : "outline"}
                link={"/orgs/" + organisation.name + "/settings"}
                access={showSettings()}
            />
        </div>
    );
};
