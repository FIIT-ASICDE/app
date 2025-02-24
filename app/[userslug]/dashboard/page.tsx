import DashboardPage from "@/app/[userslug]/dashboard/dashboard-page";

export default async function UserDashboard({
    params,
}: {
    params: Promise<{ userslug: string }>;
}) {
    const userSlug = (await params).userslug;
    return <DashboardPage userSlug={userSlug} />;
}
