import {
    FavoriteRepositoriesFilter,
    PinnedRepositoriesFilter,
    VisibilityRepositoriesFilter,
} from "@/lib/types/repository";
import { Globe, Lock, Pin, PinOff, Star, StarOff, X } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

import { Badge } from "@/components/ui/badge";

interface RepositoryFilterBadgesProps {
    pinnedFilter: PinnedRepositoriesFilter;
    setPinnedFilter: Dispatch<SetStateAction<PinnedRepositoriesFilter>>;
    favoriteFilter: FavoriteRepositoriesFilter;
    setFavoriteFilter: Dispatch<SetStateAction<FavoriteRepositoriesFilter>>;
    visibilityFilter: VisibilityRepositoriesFilter;
    setVisibilityFilter: Dispatch<SetStateAction<VisibilityRepositoriesFilter>>;
}

export const RepositoryFilterBadges = ({
    pinnedFilter,
    setPinnedFilter,
    favoriteFilter,
    setFavoriteFilter,
    visibilityFilter,
    setVisibilityFilter,
}: RepositoryFilterBadgesProps) => {
    return (
        <div className="flex h-8 flex-row justify-center gap-x-2">
            {pinnedFilter === "pinned" ? (
                <Badge
                    variant="secondary"
                    className="h-10 cursor-pointer space-x-1"
                    onClick={() => setPinnedFilter("all")}
                >
                    <Pin className="h-5 w-5 text-muted-foreground" />
                    <X className="h-4 w-4 text-muted-foreground" />
                </Badge>
            ) : pinnedFilter === "notPinned" ? (
                <Badge
                    variant="secondary"
                    className="h-10 cursor-pointer space-x-1"
                    onClick={() => setPinnedFilter("all")}
                >
                    <PinOff className="h-5 w-5 text-muted-foreground" />
                    <X className="h-4 w-4 text-muted-foreground" />
                </Badge>
            ) : undefined}
            {favoriteFilter === "favorite" ? (
                <Badge
                    variant="secondary"
                    className="h-10 cursor-pointer space-x-1"
                    onClick={() => setFavoriteFilter("all")}
                >
                    <Star className="h-5 w-5 text-muted-foreground" />
                    <X className="h-4 w-4 text-muted-foreground" />
                </Badge>
            ) : favoriteFilter === "notFavorite" ? (
                <Badge
                    variant="secondary"
                    className="h-10 cursor-pointer space-x-1"
                    onClick={() => setFavoriteFilter("all")}
                >
                    <StarOff className="h-5 w-5 text-muted-foreground" />
                    <X className="h-4 w-4 text-muted-foreground" />
                </Badge>
            ) : undefined}
            {visibilityFilter === "public" ? (
                <Badge
                    variant="secondary"
                    className="h-10 cursor-pointer space-x-1"
                    onClick={() => setVisibilityFilter("all")}
                >
                    <Globe className="h-5 w-5 text-muted-foreground" />
                    <X className="h-4 w-4 text-muted-foreground" />
                </Badge>
            ) : visibilityFilter === "private" ? (
                <Badge
                    variant="secondary"
                    className="h-10 cursor-pointer space-x-1"
                    onClick={() => setVisibilityFilter("all")}
                >
                    <Lock className="h-5 w-5 text-muted-foreground" />
                    <X className="h-4 w-4 text-muted-foreground" />
                </Badge>
            ) : undefined}
        </div>
    );
};
