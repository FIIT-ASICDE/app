import SettingsPage from "@/app/orgs/[organisationslug]/(organisation)/settings/settings-page";

export default async function OrganisationSettingsPage({
    params,
}: {
    params: Promise<{ organisationslug: string }>;
}) {
    const orgSlug = (await params).organisationslug;

    return <SettingsPage orgSlug={orgSlug} />;
}
