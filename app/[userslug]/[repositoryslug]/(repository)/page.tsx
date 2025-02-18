import OverviewPage from "@/app/[userslug]/[repositoryslug]/(repository)/overview-page";

export default async function RepositoryHome({
    params,
}: {
    params: Promise<{ userslug: string }>;
}) {
    const userSlug = (await params).userslug;

    return <OverviewPage userSlug={userSlug} />;
}
