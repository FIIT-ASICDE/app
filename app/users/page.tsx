import { UsersPage } from "@/app/users/users-page";
import { PaginationResult } from "@/lib/types/generic";
import { OrganisationDisplay } from "@/lib/types/organisation";
import { RepositoryDisplay } from "@/lib/types/repository";
import { UserDisplay } from "@/lib/types/user";

import { parseBoolean } from "@/components/generic/generic";

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
    const currentPage = Number(usersSearchParams?.page) || 0;
    const rows: boolean = parseBoolean(usersSearchParams?.rows) ?? false;

    const pageSize: number = 8;

    /*
     * TODO: this method on BE
     * Explanation: Here I need all users,
     * filtered by nameSearchTerm,
     * and the pagination object (PaginationResult),
     * the method's name or path can be customized.
     */
    /*const { users, pagination } = await api.org.search({
        nameSearchTerm: query,
        roleFilter: roleFilter,
        page: currentPage,
        pageSize: pageSize,
    });*/

    // dummy data so it does not break
    const users: Array<UserDisplay> = [
        {
            id: "1",
            username: "johndoe",
            image: "/avatars/avatar1.png",
        } satisfies UserDisplay,
    ] satisfies Array<UserDisplay>;

    const pagination: PaginationResult = {
        total: 0,
        pageCount: 0,
        page: currentPage,
        pageSize: pageSize,
    } satisfies PaginationResult;

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
