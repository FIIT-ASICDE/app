import MembersPage from "@/app/orgs/[organisationslug]/(organisation)/members/members-page";
import { OrganizationRole } from "@/lib/prisma";
import { api } from "@/lib/trpc/server";
import { RoleOrganisationFilter } from "@/lib/types/organisation";

import { parseBoolean, parseFilterValue } from "@/components/generic/generic";
import type { Metadata } from 'next';

export async function generateMetadata(
    input: { params: Promise<{ organisationslug: string }> }
): Promise<Metadata> {
    const { organisationslug } = await input.params;
    try {
        const org = await api.org.byName(organisationslug);

        return {
            title: `${org.name} | Members`,
        };
    } catch (e) {
        return {
            title: "Organisation Not Found",
        };
    }
}

interface OrganisationMembersPageProps {
    params: Promise<{
        organisationslug: string;
    }>;
    searchParams?: Promise<{
        query?: string;
        page?: string;
        rows?: string;
        role?: string;
    }>;
}

export default async function OrganisationMembersPage({
    params,
    searchParams,
}: OrganisationMembersPageProps) {
    const orgSlug = (await params).organisationslug;

    const membersSearchParams = await searchParams;

    const query: string = membersSearchParams?.query || "";
    const currentPage: number = Number(membersSearchParams?.page) || 1;
    const rows: boolean = parseBoolean(membersSearchParams?.rows) ?? false;

    const roleFilter: RoleOrganisationFilter = parseFilterValue(
        "role",
        membersSearchParams?.role,
    ) as RoleOrganisationFilter;

    const pageSize: number = 8;

    const org = await api.org.byName(orgSlug);
    const { members, pagination } = await api.org.getMembers({
        organisationName: orgSlug,
        nameSearchTerm: query,
        roleFilter:
            roleFilter === "all"
                ? undefined
                : (roleFilter.toUpperCase() as OrganizationRole),
        page: currentPage,
        pageSize: pageSize,
    });

    return (
        <MembersPage
            org={org}
            members={members}
            searchParams={{
                query,
                rows,
                role: roleFilter,
                pagination,
            }}
        />
    );
}
