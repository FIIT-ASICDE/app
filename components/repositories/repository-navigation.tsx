"use client";

import { Repository } from "@/lib/types/repository";
import { BookUser, Code, Settings } from "lucide-react";
import { usePathname } from "next/navigation";

import { NavigationButton } from "@/components/navigation-button/navigation-button";

interface RepositoryNavigationProps {
    repository: Repository;
}

export const RepositoryNavigation = ({
    repository,
}: RepositoryNavigationProps) => {
    const pathname: string = usePathname();

    const getCurrentPage = (): string => {
        const parts = pathname.split("/").filter(Boolean);
        if (parts.length < 2) throw new Error("Pathname invalid");
        return "/" + parts.slice(2).join("/");
    };

    const currentPage: string = getCurrentPage();

    const showSettings = () => {
        if (repository.userRole === "guest") {
            return "none";
        } else if (
            repository.userRole === "owner" ||
            repository.userRole === "admin"
        ) {
            return "interactive";
        }
        // repository.userRole === 'viewer'
        return "nonInteractive";
    };

    return (
        <div className="mr-6 flex flex-row justify-end gap-x-1">
            <NavigationButton
                title="Overview"
                icon={BookUser}
                variant={currentPage === "/" ? "secondary" : "outline"}
                link={"/" + repository.ownerName + "/" + repository.name + "/"}
                access="interactive"
            />
            <NavigationButton
                title="Code"
                icon={Code}
                variant={currentPage === "/code" ? "secondary" : "outline"}
                link={
                    "/" + repository.ownerName + "/" + repository.name + "/code"
                }
                access="interactive"
            />
            <NavigationButton
                title="Settings"
                icon={Settings}
                variant={currentPage === "/settings" ? "secondary" : "outline"}
                link={
                    "/" +
                    repository.ownerName +
                    "/" +
                    repository.name +
                    "/settings"
                }
                access={showSettings()}
            />
        </div>
    );
};
