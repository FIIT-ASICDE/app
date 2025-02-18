export type Repository = {
    id: string;
    ownerId: string;
    ownerName: string;
    name: string;
    visibility: RepositoryVisibility;
    favorite: boolean;
    pinned: boolean;
    description?: string;
    ownerImage?: string;
    tree?: Array<RepositoryFile>;
};

export type RepositoryVisibility = "public" | "private";

export type RepositoryFile = {
    name: string;
    isDirectory: boolean;
    lastActivity: Date;
    language?: string;
    children?: RepositoryFile[];
};

export type RepositoryFilePreview = {
    name: string;
    content: string;
    lastActivity: Date;
    language?: string;
};

export type PinnedRepositoriesFilter = "all" | "pinned" | "notPinned";

export type FavoriteRepositoriesFilter = "all" | "favorite" | "notFavorite";

export type VisibilityRepositoriesFilter = "all" | "public" | "private";

export enum RepositoryCreationStatus {
    INITIAL = "initial",
    NAME_EMPTY = "name-empty",
    NAME_TAKEN = "name-taken",
    OWNER_EMPTY = "owner-empty",
    FREE_TO_CREATE = "free-to-create",
}

export type RepositoryEditStatus =
    | "notChanged"
    | "nameEmpty"
    | "nameTaken"
    | "freeToEdit";
