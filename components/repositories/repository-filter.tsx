import {
    FavoriteRepositoriesFilter,
    PinnedRepositoriesFilter,
    Repository,
    VisibilityRepositoriesFilter,
} from "@/lib/types/repository";
import {
    Folders,
    Globe,
    Lock,
    Pin,
    PinOff,
    RotateCcw,
    SlidersHorizontal,
    Star,
} from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import * as React from "react";

import { TooltipDropdown } from "@/components/tooltip-dropdown/tooltip-dropdown";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface RepositoryFilterProps {
    pinnedFilter: PinnedRepositoriesFilter;
    setPinnedFilter: Dispatch<SetStateAction<PinnedRepositoriesFilter>>;
    favoriteFilter: FavoriteRepositoriesFilter;
    setFavoriteFilter: Dispatch<SetStateAction<FavoriteRepositoriesFilter>>;
    visibilityFilter: VisibilityRepositoriesFilter;
    setVisibilityFilter: Dispatch<SetStateAction<VisibilityRepositoriesFilter>>;
}

export const filterRepositories = (
    repositories: Array<Repository>,
    repositorySearchPhrase: string,
    pinnedFilter: PinnedRepositoriesFilter,
    favoriteFilter: FavoriteRepositoriesFilter,
    visibilityFilter: VisibilityRepositoriesFilter,
) => {
    let newFilteredRepositories: Array<Repository> = repositories.filter(
        (repository: Repository) => {
            const repositoryDisplayName: string =
                repository.ownerName + "/" + repository.name;
            if (
                repositoryDisplayName
                    .toLowerCase()
                    .includes(repositorySearchPhrase.toLowerCase())
            ) {
                return repository;
            }
        },
    );

    if (pinnedFilter !== "all") {
        newFilteredRepositories = newFilteredRepositories.filter(
            (repository: Repository) => {
                if (
                    (pinnedFilter === "pinned" && repository.pinned) ||
                    (pinnedFilter === "notPinned" && !repository.pinned)
                ) {
                    return repository;
                }
            },
        );
    }

    if (favoriteFilter !== "all") {
        newFilteredRepositories = newFilteredRepositories.filter(
            (repository: Repository) => {
                if (
                    (favoriteFilter === "favorite" && repository.favorite) ||
                    (favoriteFilter === "notFavorite" && !repository.favorite)
                ) {
                    return repository;
                }
            },
        );
    }

    if (visibilityFilter !== "all") {
        newFilteredRepositories = newFilteredRepositories.filter(
            (repository: Repository) => {
                if (visibilityFilter === repository.visibility) {
                    return repository;
                }
            },
        );
    }

    return newFilteredRepositories;
};

export const RepositoryFilter = ({
    pinnedFilter,
    setPinnedFilter,
    favoriteFilter,
    setFavoriteFilter,
    visibilityFilter,
    setVisibilityFilter,
}: RepositoryFilterProps) => {
    return (
        <TooltipDropdown
            tooltip="Filter repositories"
            dropdownTrigger={
                <button className="rounded bg-transparent p-2 hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                    <SlidersHorizontal />
                </button>
            }
            dropdownContent={
                <DropdownMenuContent className="w-52 space-y-1">
                    <DropdownMenuLabel className="text-center">
                        Filter by pinned
                    </DropdownMenuLabel>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="w-full">
                                {pinnedFilter === "all" ? (
                                    <>
                                        <Folders className="text-muted-foreground" />
                                        All
                                    </>
                                ) : pinnedFilter === "pinned" ? (
                                    <>
                                        <Pin className="text-muted-foreground" />
                                        Pinned
                                    </>
                                ) : (
                                    <>
                                        <PinOff className="text-muted-foreground" />
                                        Not pinned
                                    </>
                                )}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem
                                onClick={() => setPinnedFilter("all")}
                            >
                                <Folders className="text-muted-foreground" />
                                All
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => setPinnedFilter("pinned")}
                            >
                                <Pin className="text-muted-foreground" />
                                Pinned
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => setPinnedFilter("notPinned")}
                            >
                                <PinOff className="text-muted-foreground" />
                                Not pinned
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel className="text-center">
                        Filter by favorite
                    </DropdownMenuLabel>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="w-full">
                                {favoriteFilter === "all" ? (
                                    <>
                                        <Folders className="text-muted-foreground" />
                                        All
                                    </>
                                ) : favoriteFilter === "favorite" ? (
                                    <>
                                        <Star
                                            fill="currentColor"
                                            className="text-muted-foreground"
                                        />
                                        Favorite
                                    </>
                                ) : (
                                    <>
                                        <Star className="text-muted-foreground" />
                                        Not favorite
                                    </>
                                )}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem
                                onClick={() => setFavoriteFilter("all")}
                            >
                                <Folders className="text-muted-foreground" />
                                All
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => setFavoriteFilter("favorite")}
                            >
                                <Star
                                    fill="currentColor"
                                    className="text-muted-foreground"
                                />
                                Favorite
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => setFavoriteFilter("notFavorite")}
                            >
                                <Star className="text-muted-foreground" />
                                Not favorite
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel className="text-center">
                        Filter by visibility
                    </DropdownMenuLabel>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="w-full">
                                {visibilityFilter === "all" ? (
                                    <>
                                        <Folders className="text-muted-foreground" />
                                        All
                                    </>
                                ) : visibilityFilter === "public" ? (
                                    <>
                                        <Globe className="text-muted-foreground" />
                                        Public
                                    </>
                                ) : (
                                    <>
                                        <Lock className="text-muted-foreground" />
                                        Private
                                    </>
                                )}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem
                                onClick={() => setVisibilityFilter("all")}
                            >
                                <Folders className="text-muted-foreground" />
                                All
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => setVisibilityFilter("public")}
                            >
                                <Globe className="text-muted-foreground" />
                                Public
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => setVisibilityFilter("private")}
                            >
                                <Lock className="text-muted-foreground" />
                                Private
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <DropdownMenuSeparator />
                    <Button
                        variant="outline"
                        className="w-full cursor-pointer text-muted-foreground"
                        onClick={() => {
                            setPinnedFilter("all");
                            setFavoriteFilter("all");
                            setVisibilityFilter("all");
                        }}
                    >
                        <RotateCcw />
                        Reset filter
                    </Button>
                </DropdownMenuContent>
            }
            tooltipSide="top"
        />
    );
};
