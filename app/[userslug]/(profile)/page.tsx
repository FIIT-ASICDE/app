import OverviewPage from "@/app/[userslug]/(profile)/overview-page";
import { api } from "@/lib/trpc/server";
import type { Metadata } from 'next'

export async function generateMetadata(
    input: { params: Promise<{ userslug: string }> }
): Promise<Metadata> {
    const { userslug } = await input.params;

    try {
        const profile = await api.user.byUsername({ username: userslug });

        return {
            title: `${profile.username} | Overview`,
        };
    } catch (e) {
        return {
            title: "User Not Found",
        };
    }
}


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
