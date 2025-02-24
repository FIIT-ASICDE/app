"use client";

import { LayoutType } from "@/lib/types/generic";
import { OrganisationDisplay } from "@/lib/types/organisation";
import {
    FavoriteRepositoriesFilter,
    PinnedRepositoriesFilter,
    Repository,
    VisibilityRepositoriesFilter,
} from "@/lib/types/repository";
import { Folder, Folders } from "lucide-react";
import { useEffect, useState } from "react";

import { getWidthFromResponsivenessCheckpoint } from "@/components/generic/generic";
import { NoData } from "@/components/no-data/no-data";
import { CreateRepositoryDialog } from "@/components/repositories/create-repository-dialog";
import RepositoryCard from "@/components/repositories/repository-card";
import { RepositoryFilter } from "@/components/repositories/repository-filter";
import { RepositoryFilterBadges } from "@/components/repositories/repository-filter-badges";
import { Input } from "@/components/ui/input";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

interface RepositoriesPageProps {
    repos: Array<Repository>;
    canUserCreate: boolean;
    userOrgs?: Array<Omit<OrganisationDisplay, "memberCount">>;
}

export default function RepositoriesPage({
    repos,
    canUserCreate,
    userOrgs,
}: RepositoriesPageProps) {
    const [repositoriesLayout, setRepositoriesLayout] =
        useState<LayoutType>("grid");
    const [isLg, setIsLg] = useState<boolean>(false);

    useEffect(() => {
        const handleResize = () => {
            const lg =
                window.innerWidth < getWidthFromResponsivenessCheckpoint("lg");
            setIsLg(lg);
            if (lg) {
                setRepositoriesLayout("rows");
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const [repositories, setRepositories] = useState<Array<Repository>>(repos);
    const [repositorySearchPhrase, setRepositorySearchPhrase] =
        useState<string>("");

    const [pinnedFilter, setPinnedFilter] =
        useState<PinnedRepositoriesFilter>("all");
    const [favoriteFilter, setFavoriteFilter] =
        useState<FavoriteRepositoriesFilter>("all");
    const [visibilityFilter, setVisibilityFilter] =
        useState<VisibilityRepositoriesFilter>("all");

    // TODO move to server side
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
                    <div className="relative w-full">
                        <Folder className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search repositories..."
                            className="pl-8"
                            value={repositorySearchPhrase}
                            onChange={(event) =>
                                setRepositorySearchPhrase(event.target.value)
                            }
                        />
                    </div>
                    {/*<LayoutOptions
                        layout={repositoriesLayout}
                        setLayout={setRepositoriesLayout}
                        responsivenessCheckpoint={"lg"}
                    />*/}
                </div>
                <div className="m-6 mb-0 flex flex-row space-x-3">
                    <RepositoryFilterBadges
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
                    />
                    {canUserCreate && (
                        <CreateRepositoryDialog
                            usersOrganisations={userOrgs ?? []}
                            repositories={repositories}
                            setRepositories={setRepositories}
                        />
                    )}
                </div>
            </div>

            <main>
                <div
                    className={
                        repositories.length === 0
                            ? "m-6 flex flex-col"
                            : isLg || repositoriesLayout === "grid"
                              ? "m-6 grid grid-cols-1 gap-3 lg:grid-cols-2"
                              : "m-6 grid grid-cols-1 gap-3"
                    }
                >
                    {repositories.length === 0 && (
                        <NoData
                            icon={Folders}
                            message={"No repositories found."}
                        />
                    )}
                    {repositories.map((repository) => (
                        <RepositoryCard
                            key={repository.id}
                            id={repository.id}
                            ownerId={repository.ownerId}
                            ownerName={repository.ownerName}
                            ownerImage={repository.ownerImage}
                            name={repository.name}
                            visibility={repository.visibility}
                            description={repository.description}
                            favorite={repository.favorite}
                            pinned={repository.pinned}
                            onStateChange={(id, newState) => {
                                setRepositories((oldRepositories) =>
                                    oldRepositories.map((repository) =>
                                        repository.id === id
                                            ? {
                                                  ...repository,
                                                  pinned:
                                                      newState.pinned ?? false,
                                                  favorite: newState.favorite,
                                              }
                                            : repository,
                                    ),
                                );
                            }}
                            isUserOwner={canUserCreate}
                        />
                    ))}
                </div>
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious href="#" />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">1</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationNext href="#" />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </main>
        </div>
    );
}
