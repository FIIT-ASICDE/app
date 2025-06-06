import DashboardPage from "@/app/[userslug]/dashboard/dashboard-page";
import { api } from "@/lib/trpc/server";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: 'ASICDE',
}

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

    const { favoriteRepositories, pagination } =
        await api.repo.fetchUserFavoriteRepos({
            username: userSlug,
            page: currentPage,
            pageSize: pageSize,
        });

    return (
        <DashboardPage
            dashboard={dashboard}
            searchParams={{
                pagination,
            }}
            favoriteRepos={favoriteRepositories}
        />
    );
}
