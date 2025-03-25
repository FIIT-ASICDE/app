import { OrganisationsPage } from "@/app/orgs/organisations-page";
import { api } from "@/lib/trpc/server";

import { parseBoolean } from "@/components/generic/generic";

interface AllOrganisationsPageProps {
    searchParams?: Promise<{
        query?: string;
        page?: string;
        rows?: string;
        role?: string;
    }>;
}

export default async function AllOrganisationsPage({
    searchParams,
}: AllOrganisationsPageProps) {
    const orgsSearchParams = await searchParams;

    const query = orgsSearchParams?.query || "";
    const currentPage = Number(orgsSearchParams?.page) || 1;
    const rows: boolean = parseBoolean(orgsSearchParams?.rows) ?? false;

    const pageSize: number = 8;

    const { organisations, pagination } = await api.org.search({
        nameSearchTerm: query,
        page: currentPage,
        pageSize: pageSize,
    });

    return (
        <OrganisationsPage
            organisations={organisations}
            searchParams={{
                query,
                rows,
                pagination,
            }}
        />
    );
}
