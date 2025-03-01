import DashboardPage from "@/app/[userslug]/dashboard/dashboard-page";
import { api } from "@/lib/trpc/server";
import { PaginationResult } from "@/lib/types/generic";

interface UserDashboardPageProps {
    params: Promise<{
        userslug: string;
    }>;
    searchParams?: Promise<{
        page?: string;
    }>;
}

export default async function UserDashboardPage({
    params,
    searchParams,
}: UserDashboardPageProps) {
    const userSlug = (await params).userslug;
    const dashboard = await api.user.usersDashboard({ username: userSlug });

    const favoritesSearchParams = await searchParams;
    const currentPage: number = Number(favoritesSearchParams?.page) || 1;

    const pageSize: number = 3;

    /*
     * TODO: this method on BE
     * Explanation: The recent repositories are alright,
     * but I need favorites that will return
     * a pagination object (PaginationResult)
     */
    /*const { favoriteRepositories, pagination } = await api.user.favoriteRepositories({
        page: currentPage,
        pageSize: pageSize,
    });*/

    /* I also need invitations, but they don't need to be paginated,
     * so just a regular call.
     * Everything can be inside the dashboard variable,
     * it doesn't need to be 3 different API calls.
     */

    // dummy data so it does not break
    const pagination: PaginationResult = {
        total: 0,
        pageCount: 0,
        page: currentPage,
        pageSize: pageSize,
    };

    return (
        <DashboardPage
            dashboard={dashboard}
            searchParams={{
                pagination,
            }}
        />
    );
}
