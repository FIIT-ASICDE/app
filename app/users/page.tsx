import { UsersPage } from "@/app/users/users-page";
import { api } from "@/lib/trpc/server";

import { parseBoolean } from "@/components/generic/generic";
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'ASICDE',
}

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

    const pageSize: number = 12;

    const { users, pagination } = await api.user.fetchAllUsers({
        nameSearchTerm: query,
        page: currentPage,
        pageSize: pageSize,
    });

    const usersOrganisations = await api.user.usersAdminOrganisations();

    const usersRepositories = await api.user.usersAdminRepos();
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
