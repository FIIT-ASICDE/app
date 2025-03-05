import SettingsPage from "@/app/[userslug]/[repositoryslug]/(repository)/settings/settings-page";
import { RepositorySettingsTab } from "@/lib/types/repository";

interface RepositorySettingsPageProps {
    params: Promise<{
        userslug: string;
        repositoryslug: string;
    }>;
    searchParams?: Promise<{
        tab?: string;
    }>;
}

export default async function RepositorySettingsPage({
    params,
    searchParams,
}: RepositorySettingsPageProps) {
    const userSlug = (await params).userslug;
    const repositorySlug = (await params).repositoryslug;

    const settingsSearchParams = await searchParams;
    const tab: RepositorySettingsTab = (settingsSearchParams?.tab ||
        "general") as RepositorySettingsTab;

    return (
        <SettingsPage
            userSlug={userSlug}
            repositorySlug={repositorySlug}
            tab={tab}
        />
    );
}
