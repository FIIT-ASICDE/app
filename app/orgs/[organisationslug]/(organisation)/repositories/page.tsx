import RepositoriesPage from "@/app/orgs/[organisationslug]/(organisation)/repositories/repositories-page";
import { api } from "@/lib/trpc/server";
import { parseBoolean, parseFilterValue } from "@/components/generic/generic";
import { FavoriteRepositoriesFilter, PinnedRepositoriesFilter, PublicRepositoriesFilter } from "@/lib/types/repository";

interface OrganisationRepositoriesPageProps {
    params: Promise<{
        organisationslug: string;
    }>;
    searchParams?: Promise<{
        query?: string;
        page?: string;
        rows?: string;
        pinned?: string;
        favorite?: string;
        public?: string;
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
    const rows: boolean = parseBoolean(reposSearchParams?.rows) ?? false;

    const pinnedFilter: PinnedRepositoriesFilter = parseFilterValue("pinned", reposSearchParams?.pinned) as PinnedRepositoriesFilter;
    const favoriteFilter: FavoriteRepositoriesFilter = parseFilterValue("favorite", reposSearchParams?.favorite) as FavoriteRepositoriesFilter;
    const publicFilter: PublicRepositoriesFilter = parseFilterValue("public", reposSearchParams?.public) as PublicRepositoriesFilter;

    return (
        <RepositoriesPage
            org={org}
            repos={orgsRepos}
            searchParams={{
                query,
                currentPage,
                rows,
                pinned: pinnedFilter,
                favorite: favoriteFilter,
                public: publicFilter,
            }}
        />
    );
}
