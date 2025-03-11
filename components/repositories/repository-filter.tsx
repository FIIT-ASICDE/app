"use client";

import {
    type FavoriteRepositoriesFilter,
    type PinnedRepositoriesFilter,
    type PublicRepositoriesFilter,
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
    StarOff,
    X,
} from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { TooltipDropdown } from "@/components/tooltip-dropdown/tooltip-dropdown";
import { Badge } from "@/components/ui/badge";
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
    filters: {
        pinned?: PinnedRepositoriesFilter;
        favorite?: FavoriteRepositoriesFilter;
        public?: PublicRepositoriesFilter;
    };
}

export const RepositoryFilter = ({ filters }: RepositoryFilterProps) => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    const [pinnedFilter, setPinnedFilter] = useState<
        PinnedRepositoriesFilter | undefined
    >(filters.pinned);
    const [favoriteFilter, setFavoriteFilter] = useState<
        FavoriteRepositoriesFilter | undefined
    >(filters.favorite);
    const [publicFilter, setPublicFilter] = useState<
        PublicRepositoriesFilter | undefined
    >(filters.public);

    useEffect(() => {
        setPinnedFilter(filters.pinned);
        setFavoriteFilter(filters.favorite);
        setPublicFilter(filters.public);
    }, [filters]);

    const updateFilter = (key: string, value: string | null) => {
        const params = new URLSearchParams(searchParams);
        if (value === null) {
            params.delete(key);
        } else {
            params.set(key, value);
        }
        router.replace(`${pathname}?${params.toString()}`);
    };

    const handlePinnedFilterClick = (newPinned: PinnedRepositoriesFilter) => {
        setPinnedFilter(newPinned);
        updateFilter(
            "pinned",
            newPinned === "all"
                ? null
                : newPinned === "pinned"
                  ? "true"
                  : "false",
        );
    };

    const handleFavoriteFilterClick = (
        newFavorite: FavoriteRepositoriesFilter,
    ) => {
        setFavoriteFilter(newFavorite);
        updateFilter(
            "favorite",
            newFavorite === "all"
                ? null
                : newFavorite === "favorite"
                  ? "true"
                  : "false",
        );
    };

    const handlePublicFilterClick = (newPublic: PublicRepositoriesFilter) => {
        setPublicFilter(newPublic);
        updateFilter(
            "public",
            newPublic === "all"
                ? null
                : newPublic === "public"
                  ? "true"
                  : "false",
        );
    };

    const handleResetFilters = () => {
        setPinnedFilter("all");
        setFavoriteFilter("all");
        setPublicFilter("all");
        router.replace(pathname);
    };

    if (
        pinnedFilter === undefined &&
        favoriteFilter === undefined &&
        publicFilter === undefined
    ) {
        return <></>;
    }

    return (
        <div className="mb-0 flex flex-row space-x-3">
            <div className="hidden h-8 flex-row justify-center gap-x-2 md:flex">
                {pinnedFilter !== undefined && pinnedFilter !== "all" && (
                    <Badge
                        variant="secondary"
                        className="h-10 cursor-pointer space-x-1"
                        onClick={() => handlePinnedFilterClick("all")}
                    >
                        {pinnedFilter === "pinned" ? (
                            <Pin className="h-5 w-5 text-muted-foreground" />
                        ) : (
                            <PinOff className="h-5 w-5 text-muted-foreground" />
                        )}
                        <X className="h-4 w-4 text-muted-foreground" />
                    </Badge>
                )}
                {favoriteFilter !== undefined && favoriteFilter !== "all" && (
                    <Badge
                        variant="secondary"
                        className="h-10 cursor-pointer space-x-1"
                        onClick={() => handleFavoriteFilterClick("all")}
                    >
                        {favoriteFilter === "favorite" ? (
                            <Star
                                fill="currentColor"
                                className="h-5 w-5 text-muted-foreground"
                            />
                        ) : (
                            <StarOff className="h-5 w-5 text-muted-foreground" />
                        )}
                        <X className="h-4 w-4 text-muted-foreground" />
                    </Badge>
                )}
                {publicFilter !== undefined && publicFilter !== "all" && (
                    <Badge
                        variant="secondary"
                        className="h-10 cursor-pointer space-x-1"
                        onClick={() => handlePublicFilterClick("all")}
                    >
                        {publicFilter === "public" ? (
                            <Globe className="h-5 w-5 text-muted-foreground" />
                        ) : (
                            <Lock className="h-5 w-5 text-muted-foreground" />
                        )}
                        <X className="h-4 w-4 text-muted-foreground" />
                    </Badge>
                )}
            </div>
            <TooltipDropdown
                tooltip="Filter repositories"
                dropdownTrigger={
                    <button className="rounded bg-transparent p-2 hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                        <SlidersHorizontal />
                    </button>
                }
                dropdownContent={
                    <DropdownMenuContent className="w-52 space-y-1">
                        {pinnedFilter !== undefined && (
                            <>
                                <DropdownMenuLabel className="text-center">
                                    Filter by pinned
                                </DropdownMenuLabel>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            className="w-full"
                                        >
                                            {pinnedFilter === "all" ? (
                                                <>
                                                    <Folders /> All
                                                </>
                                            ) : pinnedFilter === "pinned" ? (
                                                <>
                                                    <Pin /> Pinned
                                                </>
                                            ) : (
                                                <>
                                                    <PinOff /> Not pinned
                                                </>
                                            )}
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuItem
                                            onClick={() =>
                                                handlePinnedFilterClick("all")
                                            }
                                        >
                                            <Folders /> All
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            onClick={() =>
                                                handlePinnedFilterClick(
                                                    "pinned",
                                                )
                                            }
                                        >
                                            <Pin /> Pinned
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            onClick={() =>
                                                handlePinnedFilterClick(
                                                    "notPinned",
                                                )
                                            }
                                        >
                                            <PinOff /> Not pinned
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                <DropdownMenuSeparator />
                            </>
                        )}

                        {favoriteFilter !== undefined && (
                            <>
                                <DropdownMenuLabel className="text-center">
                                    Filter by favorite
                                </DropdownMenuLabel>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            className="w-full"
                                        >
                                            {favoriteFilter === "all" ? (
                                                <>
                                                    <Folders /> All
                                                </>
                                            ) : favoriteFilter ===
                                              "favorite" ? (
                                                <>
                                                    <Star fill="currentColor" />{" "}
                                                    Favorite
                                                </>
                                            ) : (
                                                <>
                                                    <Star /> Not favorite
                                                </>
                                            )}
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuItem
                                            onClick={() =>
                                                handleFavoriteFilterClick("all")
                                            }
                                        >
                                            <Folders /> All
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            onClick={() =>
                                                handleFavoriteFilterClick(
                                                    "favorite",
                                                )
                                            }
                                        >
                                            <Star fill="currentColor" />{" "}
                                            Favorite
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            onClick={() =>
                                                handleFavoriteFilterClick(
                                                    "notFavorite",
                                                )
                                            }
                                        >
                                            <Star /> Not favorite
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                <DropdownMenuSeparator />
                            </>
                        )}

                        {publicFilter !== undefined && (
                            <>
                                <DropdownMenuLabel className="text-center">
                                    Filter by visibility
                                </DropdownMenuLabel>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            className="w-full"
                                        >
                                            {publicFilter === "all" ? (
                                                <>
                                                    <Folders /> All
                                                </>
                                            ) : publicFilter === "public" ? (
                                                <>
                                                    <Globe /> Public
                                                </>
                                            ) : (
                                                <>
                                                    <Lock /> Private
                                                </>
                                            )}
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuItem
                                            onClick={() =>
                                                handlePublicFilterClick("all")
                                            }
                                        >
                                            <Folders /> All
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            onClick={() =>
                                                handlePublicFilterClick(
                                                    "public",
                                                )
                                            }
                                        >
                                            <Globe /> Public
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            onClick={() =>
                                                handlePublicFilterClick(
                                                    "private",
                                                )
                                            }
                                        >
                                            <Lock /> Private
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                <DropdownMenuSeparator />
                            </>
                        )}

                        <Button
                            variant="outline"
                            className="w-full cursor-pointer text-muted-foreground"
                            onClick={handleResetFilters}
                        >
                            <RotateCcw /> Reset filter
                        </Button>
                    </DropdownMenuContent>
                }
                tooltipSide="top"
            />
        </div>
    );
};
