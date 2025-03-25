import SettingsPage from "@/app/orgs/[organisationslug]/(organisation)/settings/settings-page";
import { api } from "@/lib/trpc/server";
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

    const orgsSettings = await api.org.settings({ orgName: orgSlug });
    return <SettingsPage settings={orgsSettings} tab={tab} />;
}
