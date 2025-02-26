import { OrganisationDisplay } from "@/lib/types/organisation";
import { Repository } from "@/lib/types/repository";
import { Folders } from "lucide-react";

import { NoData } from "@/components/no-data/no-data";
import { CreateRepositoryDialog } from "@/components/repositories/create-repository-dialog";
import RepositoryCard from "@/components/repositories/repository-card";
import { LayoutOptions } from "@/components/layout/layout-options";
import { DynamicPagination } from "@/components/dynamic-pagination/dynamic-pagination";
import { cn } from "@/lib/utils";
import Search from "@/components/ui/search";

interface RepositoriesPageProps {
    repos: Array<Repository>;
    canUserCreate: boolean;
    userOrgs?: Array<Omit<OrganisationDisplay, "memberCount">>;
    searchParams?: Promise<{
        query?: string;
        page?: string;
        rows?: boolean;
    }>;
}

export default async function RepositoriesPage({
    repos,
    canUserCreate,
    userOrgs,
    searchParams
}: RepositoriesPageProps) {
    const reposSearchParams = await searchParams;
    const query: string = reposSearchParams?.query || "";
    const currentPage: number = Number(reposSearchParams?.page) || 0;
    const rows: boolean = reposSearchParams?.rows || false;

    const pageSize: number = 6;

    // TODO move to server side
    /*const [pinnedFilter, setPinnedFilter] =
        useState<PinnedRepositoriesFilter>("all");
    const [favoriteFilter, setFavoriteFilter] =
        useState<FavoriteRepositoriesFilter>("all");
    const [visibilityFilter, setVisibilityFilter] =
        useState<VisibilityRepositoriesFilter>("all");*/

    // useEffect(() => {
    //     setFilteredRepositories(
    //         filterRepositories(
    //             repositories,
    //             repositorySearchPhrase,
    //             pinnedFilter,
    //             favoriteFilter,
    //             visibilityFilter,
    //         ),
    //     );
    // }, [
    //     repositorySearchPhrase,
    //     pinnedFilter,
    //     favoriteFilter,
    //     visibilityFilter,
    //     repositories,
    // ]);

    return (
        <div className="bg-background text-foreground">
            <div className="flex items-center justify-between">
                <div className="m-6 mb-0 flex w-1/2 items-center space-x-5">
                    <Search placeholder="Search repositories..." />
                    <LayoutOptions
                        layout={reposSearchParams?.rows ? "rows" : "grid"}
                        responsivenessCheckpoint={"lg"}
                    />
                </div>
                <div className="m-6 mb-0 flex flex-row space-x-3">
                    {/*<RepositoryFilterBadges
                        pinnedFilter={pinnedFilter}
                        setPinnedFilter={setPinnedFilter}
                        favoriteFilter={favoriteFilter}
                        setFavoriteFilter={setFavoriteFilter}
                        visibilityFilter={visibilityFilter}
                        setVisibilityFilter={setVisibilityFilter}
                    />
                    <RepositoryFilter
                        pinnedFilter={pinnedFilter}
                        setPinnedFilter={setPinnedFilter}
                        favoriteFilter={favoriteFilter}
                        setFavoriteFilter={setFavoriteFilter}
                        visibilityFilter={visibilityFilter}
                        setVisibilityFilter={setVisibilityFilter}
                    />*/}
                    {canUserCreate && (
                        <CreateRepositoryDialog
                            usersOrganisations={userOrgs ?? []}
                        />
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
                                !reposSearchParams?.rows ? "lg:grid-cols-2" : ""
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
                            totalCount={1}
                            pageSize={10}
                            page={1}
                            className="m-6"
                        />
                    </>
                )}
            </main>
        </div>
    );
}
