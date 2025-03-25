import { UserRoundPlus } from "lucide-react";

import { OrganisationCardDisplaySkeleton } from "@/components/skeletons/organisation-card-display-skeleton";
import { RepoOrgSubmenuSkeleton } from "@/components/skeletons/repo-org-submenu-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    const titleWidths: Array<number> = [32, 36, 24, 44, 48, 28, 24, 40];

    return (
        <Skeleton className="bg-background text-muted-foreground">
            <RepoOrgSubmenuSkeleton
                searchText="Search organisations..."
                createButton={{
                    icon: UserRoundPlus,
                    title: "Create organisation",
                }}
            />
            <main>
                <div className="m-6 grid grid-cols-1 gap-3 lg:grid-cols-2">
                    {titleWidths.map((titleWidth: number, index: number) => (
                        <OrganisationCardDisplaySkeleton
                            key={index}
                            titleClassName={"w-" + titleWidth}
                        />
                    ))}
                </div>
            </main>
        </Skeleton>
    );
}
