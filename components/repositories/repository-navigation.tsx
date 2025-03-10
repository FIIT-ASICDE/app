"use client";

import { Repository } from "@/lib/types/repository";
import { BookUser, Code, CodeXml, Settings } from "lucide-react";
import { usePathname } from "next/navigation";

import { getCurrentPage } from "@/components/generic/generic";
import { NavigationButton } from "@/components/navigation-button/navigation-button";

interface RepositoryNavigationProps {
    repository: Repository;
}

export const RepositoryNavigation = ({
    repository,
}: RepositoryNavigationProps) => {
    const pathname: string = usePathname();
    const currentPage: string = getCurrentPage(pathname, 2);

    const settingsAccess = () => {
        if (repository.userRole === "GUEST") {
            return "none";
        } else if (
            repository.userRole === "OWNER" ||
            repository.userRole === "ADMIN"
        ) {
            return "interactive";
        }
        // repository.userRole === 'viewer'
        return "nonInteractive";
    };

    return (
        <div className="mr-6 flex flex-row justify-end gap-x-1">
            <NavigationButton
                title="overview"
                icon={BookUser}
                variant={currentPage === "/" ? "secondary" : "outline"}
                link={"/" + repository.ownerName + "/" + repository.name + "/"}
                access="interactive"
            />
            <NavigationButton
                title="code"
                icon={Code}
                variant={currentPage === "/code" ? "secondary" : "outline"}
                link={
                    "/" + repository.ownerName + "/" + repository.name + "/code"
                }
                access="interactive"
            />
            <NavigationButton
                title="settings"
                icon={Settings}
                variant={currentPage === "/settings" ? "secondary" : "outline"}
                link={
                    "/" +
                    repository.ownerName +
                    "/" +
                    repository.name +
                    "/settings"
                }
                access={settingsAccess()}
            />
            <NavigationButton
                title={"open in IDE"}
                icon={CodeXml}
                variant={"default"}
                link={
                    "/" +
                    repository.ownerName +
                    "/" +
                    repository.name +
                    "/editor"
                }
                access={"interactive"}
                className={"hover:bg-primary-button-hover"}
            />
        </div>
    );
};
