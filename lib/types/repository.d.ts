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
    createdAt?: Date;
    userRole: RepoUserRole;
};

export type RepoUserRole =
    | "owner"
    | "admin"
    | "contributor"
    | "viewer"
    | "guest";

export type RepositoryDisplay = {
    id: string;
    ownerName: string;
    ownerImage?: string;
    name: string;
    visibility: RepositoryVisibility;
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

export type RepositoryCreationStatus =
    | "initial"
    | "nameEmpty"
    | "nameTaken"
    | "ownerEmpty"
    | "freeToCreate";

export type RepositoryEditStatus =
    | "notChanged"
    | "nameEmpty"
    | "nameTaken"
    | "freeToEdit";
