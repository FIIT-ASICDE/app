import OrganisationsPage from "@/app/[userslug]/(profile)/organisations/organisations-page";
import { api } from "@/lib/trpc/server";

interface UserOrganisationsPageProps {
    params: Promise<{
        userslug: string
    }>,
    searchParams?: Promise<{
        query?: string;
        page?: string;
        rows?: boolean;
    }>;
}

export default async function UserOrganisationsPage({
    params,
    searchParams,
}: UserOrganisationsPageProps) {
    const userSlug = (await params).userslug;
    const usersOrganisations = await api.user.usersOrganisations({ username: userSlug });

    const orgsSearchParams = await searchParams;
    const query: string = orgsSearchParams?.query || "";
    const currentPage: number = Number(orgsSearchParams?.page) || 1;
    const rows: boolean = orgsSearchParams?.rows || false;

    return <OrganisationsPage
        usersOrganisations={usersOrganisations}
        searchParams={{
            query,
            currentPage,
            rows
        }}
    />;
}
