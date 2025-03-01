import OrganisationsPage from "@/app/[userslug]/(profile)/organisations/organisations-page";
import { PaginationResult } from "@/lib/types/generic";
import {
    OrganisationDisplay,
    RoleOrganisationFilter,
} from "@/lib/types/organisation";

import { parseBoolean, parseFilterValue } from "@/components/generic/generic";

interface UserOrganisationsPageProps {
    params: Promise<{
        userslug: string;
    }>;
    searchParams?: Promise<{
        query?: string;
        page?: string;
        rows?: string;
        role?: string;
    }>;
}

export default async function UserOrganisationsPage({
    // params,
    searchParams,
}: UserOrganisationsPageProps) {
    // const userSlug = (await params).userslug;
    const orgsSearchParams = await searchParams;

    const query: string = orgsSearchParams?.query || "";
    const currentPage: number = Number(orgsSearchParams?.page) || 1;
    const rows: boolean = parseBoolean(orgsSearchParams?.rows) ?? false;

    const roleFilter: RoleOrganisationFilter = parseFilterValue(
        "role",
        orgsSearchParams?.role,
    ) as RoleOrganisationFilter;

    const pageSize: number = 6;

    /*
     * TODO: this method on BE
     * Explanation: Here I need all users organisations (by userSlug),
     * filtered by nameSearchTerm,
     * filtered by role filter ("all" = no need to filter)
     * and the pagination object (PaginationResult),
     * the method's name or path can be customized.
     * */
    /*const { usersOrganisations, pagination } = await api.user.usersOrganisations.search({
        username: userSlug,
        nameSearchTerm: query,
        roleFilter: roleFilter,
        page: currentPage,
        pageSize: pageSize,
    });*/

    /* dummy values so it does not break */
    const usersOrganisations: Array<OrganisationDisplay> = [];
    const pagination: PaginationResult = {
        total: 0,
        pageCount: 0,
        page: currentPage,
        pageSize: pageSize,
    };

    return (
        <OrganisationsPage
            usersOrganisations={usersOrganisations}
            searchParams={{
                query,
                rows,
                role: roleFilter,
                pagination,
            }}
        />
    );
}
