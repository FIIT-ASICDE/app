import SettingsPage from "@/app/[userslug]/(profile)/settings/settings-page";
import { UserSettingsTab } from "@/lib/types/user";

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
