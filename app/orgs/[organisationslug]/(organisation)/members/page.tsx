import MembersPage from "@/app/orgs/[organisationslug]/(organisation)/members/members-page";

interface OrganisationMembersPageProps {
    params: Promise<{
        organisationslug: string;
    }>;
    searchParams?: Promise<{
        query?: string;
        page?: string;
        rows?: boolean;
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
    const rows: boolean = membersSearchParams?.rows || false;

    return (
        <MembersPage
            orgSlug={orgSlug}
            searchParams={{
                query,
                currentPage,
                rows,
            }}
        />
    );
}
