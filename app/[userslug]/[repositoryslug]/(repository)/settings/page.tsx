import SettingsPage from "@/app/[userslug]/[repositoryslug]/(repository)/settings/settings-page";

export default async function RepositorySettingsPage({
    params,
}: {
    params: Promise<{ userslug: string }>;
}) {
    const userSlug = (await params).userslug;

    return <SettingsPage userSlug={userSlug} />;
}
