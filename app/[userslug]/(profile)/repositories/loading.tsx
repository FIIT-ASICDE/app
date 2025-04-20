import { FolderPlus } from "lucide-react";



import GithubIcon from "@/components/icons/github";
import { RepoOrgCardSkeleton } from "@/components/skeletons/repo-org-card-skeleton";
import { RepoOrgSubmenuSkeleton } from "@/components/skeletons/repo-org-submenu-skeleton";
import { Skeleton } from "@/components/ui/skeleton";
import { ReactElement } from "react";

/**
 * Loading page for repositories page at user profile
 *
 * @returns {ReactElement} Repositories page skeleton component
 */
export default function Loading(): ReactElement {
    return (
        <Skeleton className="bg-background text-foreground">
            <RepoOrgSubmenuSkeleton
                searchText="Search repositories..."
                createButton={{
                    icon: FolderPlus,
                    title: "Create repository",
                }}
                importButton={{
                    icon: GithubIcon,
                    title: "Import repository",
                }}
            />
            <main>
                <div className="m-6 grid grid-cols-1 gap-3 lg:grid-cols-2">
                    <RepoOrgCardSkeleton />
                    <RepoOrgCardSkeleton />
                </div>
            </main>
        </Skeleton>
    );
}
