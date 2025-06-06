import OrganisationsPage from "@/app/[userslug]/(profile)/organisations/organisations-page";
import { auth } from "@/auth";
import { OrganizationRole } from "@/lib/prisma";
import { api } from "@/lib/trpc/server";
import { RoleOrganisationFilter } from "@/lib/types/organisation";

import { parseBoolean, parseFilterValue } from "@/components/generic/generic";

import type { Metadata } from 'next'

export async function generateMetadata(
    input: { params: Promise<{ userslug: string }> }
): Promise<Metadata> {
    const { userslug } = await input.params;

    try {
        const profile = await api.user.byUsername({ username: userslug });

        return {
            title: `${profile.username} | Organisations`,
        };
    } catch (e) {
        return {
            title: "User Not Found",
        };
    }
}

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
    const session = await auth();

    const userSlug = (await params).userslug;
    const user = await api.user.byUsername({ username: userSlug });

    const orgsSearchParams = await searchParams;

    const query: string = orgsSearchParams?.query || "";
    const currentPage: number = Number(orgsSearchParams?.page) || 1;
    const rows: boolean = parseBoolean(orgsSearchParams?.rows) ?? false;

    const roleFilter: RoleOrganisationFilter = parseFilterValue(
        "role",
        orgsSearchParams?.role,
    ) as RoleOrganisationFilter;

    const pageSize: number = 8;

    const { usersOrganisations, pagination } = await api.org.fetchUserOrgs({
        username: userSlug,
        nameSearchTerm: query,
        roleFilter:
            roleFilter === "all"
                ? undefined
                : (roleFilter.toUpperCase() as OrganizationRole),
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
            isItMe={session?.user.id === user.id}
        />
    );
}
