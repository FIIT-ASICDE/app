import SettingsPage from "@/app/orgs/[organisationslug]/(organisation)/settings/settings-page";
import { api } from "@/lib/trpc/server";
import { OrganisationSettingsTab } from "@/lib/types/organisation";
import type { Metadata } from 'next';

export async function generateMetadata(
    input: { params: Promise<{ organisationslug: string }> }
): Promise<Metadata> {
    const { organisationslug } = await input.params;
    try {
        const org = await api.org.byName(organisationslug);

        return {
            title: `${org.name} | Settings`,
        };
    } catch {
        return {
            title: "Organisation Not Found",
        };
    }
}

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
