import DashboardPage from "@/app/[userslug]/dashboard/dashboard-page";
import { api } from "@/lib/trpc/server";

export default async function UserDashboard({
    params,
}: {
    params: Promise<{ userslug: string }>;
}) {
    const userSlug = (await params).userslug;
    const dashboard = await api.user.usersDashboard({ username: userSlug });

    return <DashboardPage dashboard={dashboard} />;
}
