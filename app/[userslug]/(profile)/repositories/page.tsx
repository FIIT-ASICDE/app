import RepositoriesPage from "@/app/[userslug]/(profile)/repositories/repositories-page";
import { auth } from "@/auth";
import { api } from "@/lib/trpc/server";

interface UserRepositoriesPageProps {
    params: Promise<{
        userslug: string
    }>,
    searchParams?: Promise<{
        query?: string;
        page?: string;
        rows?: boolean;
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
        session?.user.username === userSlug
            ? await api.org.userOrgs({
                  usersId: session.user.id,
                  role: "ADMIN",
              })
            : undefined;

    const reposSearchParams = await searchParams;
    const query: string = reposSearchParams?.query || "";
    const currentPage: number = Number(reposSearchParams?.page) || 1;
    const rows: boolean = reposSearchParams?.rows || false;

    return (
        <RepositoriesPage
            repos={userRepos}
            canUserCreate={session?.user.id === user.id}
            userOrgs={usersOrgs}
            searchParams={{
                query,
                currentPage,
                rows,
            }}
        />
    );
}
