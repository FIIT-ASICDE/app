import MembersPage from "@/app/orgs/[organisationslug]/(organisation)/members/members-page";
import { parseBoolean, parseFilterValue } from "@/components/generic/generic";
import { OrganisationMember, RoleOrganisationFilter } from "@/lib/types/organisation";
import { PaginationResult } from "@/lib/types/generic";

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

    const pageSize: number = 6;

    /*
    * TODO: this method on BE
    * Explanation: Here I need all members of an organisation (by orgSlug),
    * filtered by nameSearchTerm,
    * filtered by role filter ("all" = no need to filter),
    * and the pagination object (PaginationResult),
    * the method's name or path can be customized
    */
    /*const { members, pagination } = await api.org.members.search({
        ownerSlug: orgSlug,
        nameSearchTerm: query,
        roleFilter: roleFilter,
        page: currentPage,
        pageSize: pageSize,
    });*/

    // dummy data so it does not break
    const members: Array<OrganisationMember> = [];
    const pagination: PaginationResult = {
        total: 0,
        pageCount: 0,
        page: currentPage,
        pageSize: pageSize,
    };

    return (
        <MembersPage
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
