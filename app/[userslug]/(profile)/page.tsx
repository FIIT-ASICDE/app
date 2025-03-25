import OverviewPage from "@/app/[userslug]/(profile)/overview-page";
import { api } from "@/lib/trpc/server";

interface UserProfileProps {
    params: Promise<{
        userslug: string;
    }>;
}

export default async function UserProfile({ params }: UserProfileProps) {
    const userSlug = (await params).userslug;
    // There is no need to catch if the usersOverview throws not found, that
    // is handled in the layout.tsx
    const overview = await api.user.usersOverview({ username: userSlug });
    return <OverviewPage overview={overview} />;
}
