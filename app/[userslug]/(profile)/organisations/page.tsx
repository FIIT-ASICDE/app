import OrganisationsPage from "@/app/[userslug]/(profile)/organisations/organisations-page";
import {
    RoleOrganisationFilter,
} from "@/lib/types/organisation";

import { parseBoolean, parseFilterValue } from "@/components/generic/generic";
import { api } from "@/lib/trpc/server";
import { $Enums } from ".prisma/client";
import OrganizationRole = $Enums.OrganizationRole;

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
    params,
    searchParams,
}: UserOrganisationsPageProps) {
    const userSlug = (await params).userslug;
    const orgsSearchParams = await searchParams;

    const query: string = orgsSearchParams?.query || "";
    const currentPage: number = Number(orgsSearchParams?.page) || 1;
    const rows: boolean = parseBoolean(orgsSearchParams?.rows) ?? false;

    const roleFilter: RoleOrganisationFilter = parseFilterValue(
        "role",
        orgsSearchParams?.role,
    ) as RoleOrganisationFilter

    const pageSize: number = 8;

    const { usersOrganisations, pagination } = await api.org.fetchUserOrgs({
        username: userSlug,
        nameSearchTerm: query,
        roleFilter: roleFilter === "all" ? undefined : roleFilter.toUpperCase() as OrganizationRole,
        page: currentPage,
        pageSize: pageSize,
    });

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
