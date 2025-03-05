import SettingsPage from "@/app/orgs/[organisationslug]/(organisation)/settings/settings-page";
import { OrganisationSettingsTab } from "@/lib/types/organisation";

interface OrganisationSettingsPageProps {
    params: Promise<{
        organisationslug: string;
    }>;
    searchParams?: Promise<{
        tab?: string;
    }>;
}

export default async function OrganisationSettingsPage({
    params,
    searchParams,
}: OrganisationSettingsPageProps) {
    const orgSlug = (await params).organisationslug;

    const settingsSearchParams = await searchParams;
    const tab: OrganisationSettingsTab = (settingsSearchParams?.tab ||
        "general") as OrganisationSettingsTab;

    return <SettingsPage orgSlug={orgSlug} tab={tab} />;
}
