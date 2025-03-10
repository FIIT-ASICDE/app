import RepositoriesPage from "@/app/[userslug]/(profile)/repositories/repositories-page";
import { auth } from "@/auth";
import { api } from "@/lib/trpc/server";
import {
    FavoriteRepositoriesFilter,
    PinnedRepositoriesFilter,
    PublicRepositoriesFilter
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

    // const userRepos = await api.repo.ownersRepos({ ownerSlug: userSlug });
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

    const pageSize: number = 8;

    const { userRepos, pagination } = await api.repo.fetchUserRepos({
        ownerSlug: userSlug,
        nameSearchTerm: query,
        pinnedFilter: reposSearchParams?.pinned !== undefined ? reposSearchParams.pinned === "true" : undefined,
        favoriteFilter: reposSearchParams?.favorite !== undefined ? reposSearchParams.favorite === "true" : undefined,
        publicFilter: reposSearchParams?.public !== undefined ? reposSearchParams.public === "true" : undefined,
        page: currentPage,
        pageSize: pageSize,
    });

    const githubRepositories = await api.github.userRepos({});

    return (
        <RepositoriesPage
            repos={userRepos}
            canUserCreate={session?.user.id === user.id}
            userOrgs={usersOrgs}
            githubRepositories={githubRepositories.repos}
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
