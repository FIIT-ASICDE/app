"use client";

import { Folder, Folders } from "lucide-react";
import { Input } from "@/components/ui/input";
import { NoData } from "@/components/no-data/no-data";
import RepositoryCard from "@/components/repositories/repository-card";
import {
    Pagination,
    PaginationContent, PaginationEllipsis,
    PaginationItem,
    PaginationLink, PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination";
import { useEffect, useState } from "react";
import { LayoutType } from "@/lib/types/generic";
import { getWidthFromResponsivenessCheckpoint } from "@/components/generic/generic";
import { Repository } from "@/lib/types/repository";
import { useUser } from "@/components/context/user-context";

interface FavoritesPageProps {
    userSlug: string;
}

const data = {
    favorites: [
        {
            id: "1",
            ownerId: "1",
            ownerName: "johndoe1",
            ownerImage: "/avatars/avatar1.png",
            name: "favorite-repo-1",
            visibility: "public",
            favorite: true,
            pinned: false,
            userRole: "guest"
        } satisfies Repository,
        {
            id: "2",
            ownerId: "2",
            ownerName: "johndoe2",
            ownerImage: "/avatars/avatar2.png",
            name: "favorite-repo-2",
            visibility: "public",
            favorite: true,
            pinned: false,
            userRole: "guest"
        } satisfies Repository,
        {
            id: "3",
            ownerId: "3",
            ownerName: "johndoe3",
            ownerImage: "/avatars/avatar3.png",
            name: "favorite-repo-3",
            visibility: "public",
            favorite: true,
            pinned: false,
            userRole: "guest"
        } satisfies Repository,
        {
            id: "4",
            ownerId: "4",
            ownerName: "johndoe4",
            ownerImage: "/avatars/avatar4.png",
            name: "favorite-repo-4",
            visibility: "public",
            favorite: true,
            pinned: false,
            userRole: "guest"
        } satisfies Repository,
        {
            id: "5",
            ownerId: "5",
            ownerName: "johndoe5",
            ownerImage: "/avatars/avatar5.png",
            name: "favorite-repo-5",
            visibility: "public",
            favorite: true,
            pinned: false,
            userRole: "guest"
        } satisfies Repository,
    ],
};

export default function FavoritesPage(
    {
        // userslug,
    } : FavoritesPageProps
) {
    const { user } = useUser();

    const [favoritesLayout, setFavoritesLayout] = useState<LayoutType>("grid");
    const [isLg, setIsLg] = useState<boolean>(false);

    useEffect(() => {
        const handleResize = () => {
            const lg =
                window.innerWidth < getWidthFromResponsivenessCheckpoint("lg");
            setIsLg(lg);
            if (lg) {
                setFavoritesLayout("rows");
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const [favorites, setFavorites] = useState<Array<Repository>>(data.favorites);
    const [favoriteSearchPhrase, setFavoriteSearchPhrase] = useState<string>("");

    return (
        <div className="bg-background text-foreground">
            <div className="flex items-center justify-between">
                <div className="m-6 mb-0 flex w-1/2 items-center space-x-5">
                    <div className="relative w-full">
                        <Folder className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search favorites..."
                            className="pl-9"
                            value={favoriteSearchPhrase}
                            onChange={(event) =>
                                setFavoriteSearchPhrase(event.target.value)
                            }
                        />
                    </div>
                    {/*<LayoutOptions
                        layout={repositoriesLayout}
                        setLayout={setRepositoriesLayout}
                        responsivenessCheckpoint={"lg"}
                    />*/}
                </div>
            </div>

            <main>
                <div
                    className={
                        favorites.length === 0
                            ? "m-6 flex flex-col"
                            : isLg || favoritesLayout === "grid"
                                ? "m-6 grid grid-cols-1 gap-3 lg:grid-cols-2"
                                : "m-6 grid grid-cols-1 gap-3"
                    }
                >
                    {favorites.length === 0 && (
                        <NoData
                            icon={Folders}
                            message={"No repositories found."}
                        />
                    )}
                    {favorites.map((repository) => (
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
                                setFavorites((oldRepositories) =>
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
                            isUserOwner={repository.ownerId === user.id}
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
};