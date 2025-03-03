import RepositoriesPage from "@/app/[userslug]/(profile)/repositories/repositories-page";
import { auth } from "@/auth";
import { api } from "@/lib/trpc/server";
import { PaginationResult } from "@/lib/types/generic";
import {
    FavoriteRepositoriesFilter,
    PinnedRepositoriesFilter,
    PublicRepositoriesFilter,
} from "@/lib/types/repository";

import { parseBoolean, parseFilterValue } from "@/components/generic/generic";

interface UserRepositoriesPageProps {
    params: Promise<{
        userslug: string;
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

export default async function UserRepositoriesPage({
    params,
    searchParams,
}: UserRepositoriesPageProps) {
    const session = await auth();

    const userSlug = (await params).userslug;
    const user = await api.user.byUsername({ username: userSlug });

    const userRepos = await api.repo.ownersRepos({ ownerSlug: userSlug });
    // if the current user is asking for his/her repos, also fetch orgs needed
    // to create a new one, but only those where he/she is admin
    const usersOrgs =
        session?.user.id === user.id
            ? await api.org.userOrgs({
                  usersId: session.user.id,
                  role: "ADMIN",
              })
            : undefined;

    const reposSearchParams = await searchParams;

    const query: string = reposSearchParams?.query || "";
    const currentPage: number = Number(reposSearchParams?.page) || 0;
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

    const pageSize: number = 8;

    /*
     * TODO: this method on BE
     * Explanation: Here I need all users repositories (by ownerSlug),
     * filtered by nameSearchTerm,
     * filtered by pinned, favorite & public filters ("all" = no need to filter),
     * and the pagination object (PaginationResult),
     * the method's name or path can be customized.
     * */
    /*const { userRepos, pagination } = await api.repo.ownersRepos.search({
        ownerSlug: userSlug;
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
            repos={userRepos}
            canUserCreate={session?.user.id === user.id}
            userOrgs={usersOrgs}
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
