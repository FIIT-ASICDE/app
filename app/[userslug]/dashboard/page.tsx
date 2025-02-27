import DashboardPage from "@/app/[userslug]/dashboard/dashboard-page";
import { api } from "@/lib/trpc/server";

interface UserDashboardPageProps {
    params: Promise<{
        userslug: string
    }>,
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

    return (
        <DashboardPage
            dashboard={dashboard}
            searchParams={{
                currentPage,
            }}
        />
    );
}
