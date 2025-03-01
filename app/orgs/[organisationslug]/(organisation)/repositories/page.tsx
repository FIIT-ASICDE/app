import RepositoriesPage from "@/app/orgs/[organisationslug]/(organisation)/repositories/repositories-page";
import { api } from "@/lib/trpc/server";
import { PaginationResult } from "@/lib/types/generic";
import {
    FavoriteRepositoriesFilter,
    PinnedRepositoriesFilter,
    PublicRepositoriesFilter,
} from "@/lib/types/repository";

import { parseBoolean, parseFilterValue } from "@/components/generic/generic";

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

    const pinnedFilter: PinnedRepositoriesFilter = parseFilterValue(
        "pinned",
        reposSearchParams?.pinned,
    ) as PinnedRepositoriesFilter;
    const favoriteFilter: FavoriteRepositoriesFilter = parseFilterValue(
        "favorite",
        reposSearchParams?.favorite,
    ) as FavoriteRepositoriesFilter;
    const publicFilter: PublicRepositoriesFilter = parseFilterValue(
        "public",
        reposSearchParams?.public,
    ) as PublicRepositoriesFilter;

    const pageSize: number = 6;

    /*
     * TODO: this method on BE
     * Explanation: Here I need orgs repositories (by ownerSlug),
     * filtered by nameSearchTerm,
     * filtered by pinned, favorite & public filters (value "all" = no need to filter),
     * and i need the pagination object (PaginationResult),
     * the method's name or path can be customized.
     */
    /*const { repositories, pagination } = api.repo.ownersRepos.search({
        ownerSlug: orgSlug,
        nameSearchTerm: query,
        pinnedFilter: pinnedFilter,
        favoriteFilter: favoriteFilter,
        publicFilter: publicFilter,
        page: currentPage,
        pageSize: pageSize,
    });*/

    // dummy data so it does not break
    const pagination: PaginationResult = {
        total: 0,
        pageCount: 0,
        page: currentPage,
        pageSize: pageSize,
    };

    return (
        <RepositoriesPage
            org={org}
            repos={orgsRepos}
            searchParams={{
                query,
                rows,
                pinned: pinnedFilter,
                favorite: favoriteFilter,
                public: publicFilter,
                pagination,
            }}
        />
    );
}
