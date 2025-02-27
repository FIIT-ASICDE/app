import RepositoriesPage from "@/app/orgs/[organisationslug]/(organisation)/repositories/repositories-page";
import { api } from "@/lib/trpc/server";

interface OrganisationRepositoriesPageProps {
    params: Promise<{
        organisationslug: string;
    }>;
    searchParams?: Promise<{
        query?: string;
        page?: string;
        rows?: boolean;
    }>;
}

export default async function OrganisationRepositoriesPage({
    params,
    searchParams,
}: OrganisationRepositoriesPageProps) {
    const orgSlug = (await params).organisationslug.replace(/%20/g, " ");
    const orgsRepos = await api.repo.ownersRepos({ ownerSlug: orgSlug });
    const org = await api.org.byName(orgSlug);

    const reposSearchParams = await searchParams;
    const query: string = reposSearchParams?.query || "";
    const currentPage: number = Number(reposSearchParams?.page) || 1;
    const rows: boolean = reposSearchParams?.rows || false;

    return (
        <RepositoriesPage
            org={org}
            repos={orgsRepos}
            searchParams={{
                query,
                currentPage,
                rows,
            }}
        />
    );
}
