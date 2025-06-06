import SettingsPage from "@/app/[userslug]/[repositoryslug]/(repository)/settings/settings-page";
import { api } from "@/lib/trpc/server";
import { RepositorySettingsTab } from "@/lib/types/repository";

import type { Metadata } from 'next'

export async function generateMetadata(
    input: { params: Promise<{ userslug: string; repositoryslug: string }> }
): Promise<Metadata> {
    const { userslug, repositoryslug } = await input.params;

    try {
        const profile = await api.user.byUsername({ username: userslug });
        const repository = await api.repo.overview({
            ownerSlug: userslug,
            repositorySlug: repositoryslug,
        });

        return {
            title: `${profile.username} | ${repository.name}`,
        };
    } catch (e) {
        return {
            title: "Repository Not Found",
        };
    }
}

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

    const repoSettings = await api.repo.settings({
        ownerSlug: userSlug,
        repositorySlug,
    });

    return <SettingsPage settings={repoSettings} tab={tab} />;
}
