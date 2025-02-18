import SettingsPage from "@/app/orgs/[organisationslug]/(organisation)/settings/settings-page";

export default async function OrganisationSettingsPage({
    params,
}: {
    params: Promise<{ userslug: string }>;
}) {
    const userSlug = (await params).userslug;

    return <SettingsPage userSlug={userSlug} />;
}
