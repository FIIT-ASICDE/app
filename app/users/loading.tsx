import { RepoOrgSubmenuSkeleton } from "@/components/skeletons/repo-org-submenu-skeleton";
import { UserCardSkeleton } from "@/components/skeletons/user-card-skeleton";
import { Skeleton } from "@/components/ui/skeleton";
import { ReactElement } from "react";

/**
 * Loading page for all users page
 *
 * @returns {ReactElement} All users page skeleton component
 */
export default function Loading(): ReactElement {
    const titleWidths: Array<number> = [
        32, 36, 24, 44, 48, 28, 24, 40, 36, 24, 32, 44,
    ];

    return (
        <Skeleton className="bg-background text-muted-foreground">
            <RepoOrgSubmenuSkeleton searchText="Search users..." hideFilter />
            <main>
                <div className="m-6 grid grid-cols-1 gap-3 lg:grid-cols-3">
                    {titleWidths.map((titleWidth: number, index: number) => (
                        <UserCardSkeleton
                            key={index}
                            titleClassName={"w-" + titleWidth}
                        />
                    ))}
                </div>
            </main>
        </Skeleton>
    );
}
