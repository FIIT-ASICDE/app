import { PaginationResult } from "@/lib/types/generic";
import { OrganisationDisplay } from "@/lib/types/organisation";
import {
    FavoriteRepositoriesFilter,
    PinnedRepositoriesFilter,
    PublicRepositoriesFilter,
    Repository,
} from "@/lib/types/repository";
import { cn } from "@/lib/utils";
import { Folders } from "lucide-react";

import { DynamicPagination } from "@/components/generic/dynamic-pagination";
import { LayoutOptions } from "@/components/generic/layout-options";
import { NoData } from "@/components/generic/no-data";
import { CreateRepositoryDialog } from "@/components/repositories/create-repository-dialog";
import { ImportRepositoryDialog } from "@/components/repositories/import-repository-dialog";
import RepositoryCard from "@/components/repositories/repository-card";
import { RepositoryFilter } from "@/components/repositories/repository-filter";
import Search from "@/components/ui/search";

interface RepositoriesPageProps {
    repos: Array<Repository>;
    canUserCreate: boolean;
    userOrgs?: Array<Omit<OrganisationDisplay, "memberCount">>;
    searchParams: {
        query: string;
        rows: boolean;
        pinned: PinnedRepositoriesFilter;
        favorite: FavoriteRepositoriesFilter;
        public: PublicRepositoriesFilter;
        pagination: PaginationResult;
    };
}

export default async function RepositoriesPage({
    repos,
    canUserCreate,
    userOrgs,
    searchParams,
}: RepositoriesPageProps) {
    return (
        <div className="bg-background text-foreground">
            <div className="flex items-center justify-between">
                <div className="m-6 mb-0 flex w-1/2 items-center space-x-5">
                    <Search placeholder="Search repositories..." />
                    <LayoutOptions
                        layout={searchParams.rows ? "rows" : "grid"}
                        className="hidden lg:flex"
                    />
                </div>
                <div className="m-6 mb-0 flex flex-row space-x-3">
                    <RepositoryFilter
                        filters={{
                            pinned: searchParams.pinned,
                            favorite: searchParams.favorite,
                            public: searchParams.public,
                        }}
                    />
                    {canUserCreate && (
                        <div className="flex flex-row gap-x-3">
                            <ImportRepositoryDialog />
                            <CreateRepositoryDialog
                                usersOrganisations={userOrgs ?? []}
                            />
                        </div>
                    )}
                </div>
            </div>

            <main>
                {repos.length === 0 ? (
                    <NoData
                        icon={Folders}
                        message={"No repositories found."}
                        className="m-6"
                    />
                ) : (
                    <>
                        <div
                            className={cn(
                                "m-6 grid grid-cols-1 gap-3",
                                !searchParams.rows ? "lg:grid-cols-2" : "",
                            )}
                        >
                            {repos.map((repository: Repository) => (
                                <RepositoryCard
                                    key={repository.id}
                                    repository={repository}
                                    isUserOwner={canUserCreate}
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
}
