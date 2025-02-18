import SettingsPage from "@/app/[userslug]/(profile)/settings/settings-page";

export default async function UserSettingsPage({
    params,
}: {
    params: Promise<{ userslug: string }>;
}) {
    const userSlug = (await params).userslug;

    return <SettingsPage userSlug={userSlug} />;
}
