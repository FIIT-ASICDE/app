import { PaginationResult } from "@/lib/types/generic";
import { OrganisationDisplay } from "@/lib/types/organisation";
import { RepositoryDisplay } from "@/lib/types/repository";
import { UserDisplay } from "@/lib/types/user";
import { cn } from "@/lib/utils";
import { UsersRound } from "lucide-react";
import { ReactElement } from "react";

import { DynamicPagination } from "@/components/generic/dynamic-pagination";
import { LayoutOptions } from "@/components/generic/layout-options";
import { NoData } from "@/components/generic/no-data";
import Search from "@/components/ui/search";
import { UserCard } from "@/components/users/user-card";

interface UsersPageProps {
    users: Array<UserDisplay>;
    usersOrganisations: Array<OrganisationDisplay>;
    usersRepositories: Array<RepositoryDisplay>;
    searchParams: {
        query: string;
        rows: boolean;
        pagination: PaginationResult;
    };
}

/**
 * All users page
 *
 * @param {UsersPageProps} props - Component props
 * @returns {ReactElement} All users page component
 */
export const UsersPage = ({
    users,
    usersOrganisations,
    usersRepositories,
    searchParams,
}: UsersPageProps): ReactElement => {
    return (
        <div className="bg-background text-foreground">
            <div className="m-6 mb-0 flex w-1/2 items-center space-x-5">
                <Search placeholder="Search users..." />
                <LayoutOptions
                    layout={searchParams?.rows ? "rows" : "grid"}
                    className="hidden lg:flex"
                />
            </div>

            <main>
                {users.length === 0 ? (
                    <NoData
                        icon={UsersRound}
                        message={"No users found."}
                        className="m-6"
                    />
                ) : (
                    <>
                        <div
                            className={cn(
                                "m-6 grid grid-cols-1 gap-3",
                                !searchParams?.rows ? "lg:grid-cols-3" : "",
                            )}
                        >
                            {users.map((user: UserDisplay) => (
                                <UserCard
                                    key={user.id}
                                    user={user}
                                    usersOrganisations={usersOrganisations}
                                    usersRepositories={usersRepositories}
                                />
                            ))}
                        </div>
                        <DynamicPagination
                            totalCount={searchParams.pagination.total}
                            pageSize={searchParams.pagination.pageSize}
                            page={searchParams.pagination.page}
                            className="my-3"
                        />
                    </>
                )}
            </main>
        </div>
    );
};
