import { RepositoryDisplay } from "./repository";
import { $Enums } from ".prisma/client";

import UserRole = $Enums.UserRole;

export type User = {
    id: string;
    name: string;
    surname: string;
    username: string;
    email: string;
    role: UserRole;
    createdAt: Date;
    image?: string;
    bio?: string;
};

export type UserDisplay = {
    id: string;
    username: string;
    image?: string;
};

export interface UsersOverview {
    isItMe: boolean;
    profile: User;
    organisations: Array<OrganisationDisplay>;
    pinnedRepositories: Array<RepositoryDisplay>;
}
