import { UsersPage } from "@/app/users/users-page";
import { OrganisationDisplay } from "@/lib/types/organisation";
import { RepositoryDisplay } from "@/lib/types/repository";

import { parseBoolean } from "@/components/generic/generic";
import { api } from "@/lib/trpc/server";

interface AllUsersPageProps {
    searchParams?: Promise<{
        query?: string;
        page?: string;
        rows?: string;
    }>;
}

export default async function AllUsersPage({
    searchParams,
}: AllUsersPageProps) {
    const usersSearchParams = await searchParams;

    const query = usersSearchParams?.query || "";
    const currentPage = Number(usersSearchParams?.page) || 1;
    const rows: boolean = parseBoolean(usersSearchParams?.rows) ?? false;

    const pageSize: number = 8;
    
    const { users, pagination } = await api.user.fetchAllUsers({
        nameSearchTerm: query,
        page: currentPage,
        pageSize: pageSize,
    });

    // TODO ADAM FETCH ON BACKEND
    const usersOrganisations: Array<OrganisationDisplay> = [
        {
            id: "1",
            name: "Org 1",
            image: "/avatars/organisation-avatar1.png",
            memberCount: 20,
        } satisfies OrganisationDisplay,
    ] satisfies Array<OrganisationDisplay>;

    const usersRepositories: Array<RepositoryDisplay> = [
        {
            id: "1",
            ownerName: "johndoe",
            ownerImage: "/avatars/avatar3.png",
            name: "Repo 1",
            visibility: "public",
        } satisfies RepositoryDisplay,
    ] satisfies Array<RepositoryDisplay>;

    return (
        <UsersPage
            users={users}
            usersOrganisations={usersOrganisations}
            usersRepositories={usersRepositories}
            searchParams={{
                query,
                rows,
                pagination,
            }}
        />
    );
}
