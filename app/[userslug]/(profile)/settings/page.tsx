import SettingsPage from "@/app/[userslug]/(profile)/settings/settings-page";
import { UserSettingsTab } from "@/lib/types/user";
import { api } from "@/lib/trpc/server";
import type { Metadata } from 'next'

export async function generateMetadata(
    input: { params: Promise<{ userslug: string }> }
): Promise<Metadata> {
    const { userslug } = await input.params;

    try {
        const profile = await api.user.byUsername({ username: userslug });

        return {
            title: `${profile.username} | Settings`,
        };
    } catch (e) {
        return {
            title: "User Not Found",
        };
    }
}

interface UserSettingsPageProps {
    params: Promise<{
        userslug: string;
    }>;
    searchParams?: Promise<{
        tab?: string;
    }>;
}

export default async function UserSettingsPage({
    params,
    searchParams,
}: UserSettingsPageProps) {
    const userSlug = decodeURIComponent((await params).userslug);

    const settingsSearchParams = await searchParams;
    const tab: UserSettingsTab = (settingsSearchParams?.tab ||
        "account") as UserSettingsTab;

    return <SettingsPage userSlug={userSlug} tab={tab} />;
}
