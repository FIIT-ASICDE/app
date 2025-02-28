import MembersPage from "@/app/orgs/[organisationslug]/(organisation)/members/members-page";
import { parseBoolean, parseFilterValue } from "@/components/generic/generic";
import { RoleOrganisationFilter } from "@/lib/types/organisation";

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

    const roleFilter: RoleOrganisationFilter = parseFilterValue("role", membersSearchParams?.role) as RoleOrganisationFilter;

    return (
        <MembersPage
            orgSlug={orgSlug}
            searchParams={{
                query,
                currentPage,
                rows,
                role: roleFilter,
            }}
        />
    );
}
