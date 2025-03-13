import { Skeleton } from "@/components/ui/skeleton"
import { RepoOrgSubmenuSkeleton } from "@/components/skeletons/repo-org-submenu-skeleton";
import { FolderPlus } from "lucide-react";
import { RepoOrgCardSkeleton } from "@/components/skeletons/repo-org-card-skeleton";

export default function Loading() {
    return (
        <Skeleton className="bg-background text-foreground">
            <RepoOrgSubmenuSkeleton
                searchText="Search repositories..."
                createText="Create repository"
                icon={FolderPlus}
                importFromGithub={true}
            />
            <main>
                <div className="m-6 grid grid-cols-1 gap-3 lg:grid-cols-2">
                    <RepoOrgCardSkeleton/>
                    <RepoOrgCardSkeleton/>
                </div>
            </main>
        </Skeleton>
    );
}