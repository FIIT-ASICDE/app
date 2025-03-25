"use client";

import type { OrganisationDisplay } from "@/lib/types/organisation";
import { BookUser, Folders, Settings, UsersRound } from "lucide-react";
import { usePathname } from "next/navigation";

import { getCurrentPage } from "@/components/generic/generic";
import { NavigationButton } from "@/components/generic/navigation-button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { LeaveOrganisationDialog } from "@/components/organisations/leave-organisation-dialog";

interface OrganisationNavigationProps {
    organisation: OrganisationDisplay;
}

export const OrganisationNavigation = ({
    organisation,
}: OrganisationNavigationProps) => {
    const pathname: string = usePathname();
    const currentPage: string = getCurrentPage(pathname, 2);

    const membersAccess = () => {
        if (organisation.showMembers) return "interactive";
        else return "nonInteractive";
    };

    const settingsAccess = () => {
        if (organisation.userRole === "ADMIN") return "interactive";
        else if (organisation.userRole === "MEMBER") return "nonInteractive";
        return "none";
    };

    return (
        <div className="mr-6 flex flex-row justify-end gap-x-1">
            <NavigationButton
                title="overview"
                icon={BookUser}
                variant={currentPage === "/" ? "secondary" : "outline"}
                link={"/orgs/" + organisation.name}
                access="interactive"
            />
            <NavigationButton
                title="repositories"
                icon={Folders}
                variant={
                    currentPage === "/repositories" ? "secondary" : "outline"
                }
                link={"/orgs/" + organisation.name + "/repositories"}
                access="interactive"
            />
            <NavigationButton
                title="members"
                icon={UsersRound}
                variant={currentPage === "/members" ? "secondary" : "outline"}
                link={"/orgs/" + organisation.name + "/members"}
                access={membersAccess()}
            />
            {settingsAccess() === "interactive" ? (
                <NavigationButton
                    title="settings"
                    icon={Settings}
                    variant={currentPage === "/settings" ? "secondary" : "outline"}
                    link={"/orgs/" + organisation.name + "/settings"}
                    access="interactive"
                />
            ) : settingsAccess() === "nonInteractive" ? (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon">
                            <Settings />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem asChild>
                            <LeaveOrganisationDialog
                                organisation={organisation}
                            />
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ) : (
                <></>
            )}
        </div>
    );
};
