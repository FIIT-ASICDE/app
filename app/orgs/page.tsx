import { OrganisationsPage } from "@/app/orgs/organisations-page";
import { PaginationResult } from "@/lib/types/generic";
import {
    OrganisationDisplay,
    RoleOrganisationFilter,
} from "@/lib/types/organisation";

import { parseBoolean, parseFilterValue } from "@/components/generic/generic";

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
    const currentPage = Number(orgsSearchParams?.page) || 0;
    const rows: boolean = parseBoolean(orgsSearchParams?.rows) ?? false;

    const roleFilter: RoleOrganisationFilter = parseFilterValue(
        "role",
        orgsSearchParams?.role,
    ) as RoleOrganisationFilter;

    const pageSize: number = 8;

    /*
     * TODO: this method on BE
     * Explanation: Here I need all organisations,
     * filtered by nameSearchTerm,
     * filtered by role filter ("all" = no need to filter),
     * and the pagination object (PaginationResult),
     * the method's name or path can be customized.
     */
    /*const { organisations, pagination } = await api.org.search({
        nameSearchTerm: query,
        roleFilter: roleFilter,
        page: currentPage,
        pageSize: pageSize,
    });*/

    // dummy data so it does not break
    const organisations: Array<OrganisationDisplay> = [];
    const pagination: PaginationResult = {
        total: 0,
        pageCount: 0,
        page: currentPage,
        pageSize: pageSize,
    };

    return (
        <OrganisationsPage
            organisations={organisations}
            searchParams={{
                query,
                rows,
                role: roleFilter,
                pagination,
            }}
        />
    );
}
