import SettingsPage from "@/app/orgs/[organisationslug]/(organisation)/settings/settings-page";

export default async function OrganisationSettingsPage({
    params,
}: {
    params: Promise<{ orgslug: string }>;
}) {
    const orgSlug = (await params).orgslug;

    return <SettingsPage orgSlug={orgSlug} />;
}
