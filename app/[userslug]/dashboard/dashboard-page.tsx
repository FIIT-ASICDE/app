import type { Invitation } from "@/lib/types/invitation";
import type { OrganisationDisplay } from "@/lib/types/organisation";
import type { RepositoryDisplay } from "@/lib/types/repository";
import { UserDisplay, UsersDashboard } from "@/lib/types/user";
import {
    CalendarArrowDown,
    CalendarOff,
    Mail,
    MailX,
    Star,
    StarOff,
} from "lucide-react";
import { Suspense } from "react";

import { NoData } from "@/components/no-data/no-data";
import { DynamicPagination } from "@/components/dynamic-pagination/dynamic-pagination";
import { InvitationCardDisplay } from "@/components/profile/invitation-card-display";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { RecentRepositoryCardDisplay } from "@/components/profile/recent-repository-card-display";
import { FavoriteRepositoryCardDisplay } from "@/components/profile/favorite-repository-card-display";

interface DashboardPageProps {
    dashboard: UsersDashboard;
    searchParams: {
        currentPage: number;
    };
}

const data = {
    invitations: [
        {
            id: "1",
            type: "repository",
            sender: {
                id: "1",
                username: "johndoe",
                image: "/avatars/avatar1.png",
            } satisfies UserDisplay,
            repository: {
                id: "1",
                name: "repository-1",
                ownerName: "john-the-owner",
                ownerImage: "/avatars/avatar5.png",
                visibility: "public",
            } satisfies RepositoryDisplay,
            status: "pending",
            createdAt: new Date(),
        } satisfies Invitation,
        {
            id: "2",
            type: "repository",
            sender: {
                id: "2",
                username: "johndoeeeee",
                image: "/avatars/avatar3.png",
            } satisfies UserDisplay,
            repository: {
                id: "2",
                name: "repo-repo",
                ownerName: "john-the-owner-2",
                ownerImage: "/avatars/avatar4.png",
                visibility: "private",
            },
            status: "pending",
            createdAt: new Date(),
        } satisfies Invitation,
        {
            id: "3",
            type: "repository",
            sender: {
                id: "3",
                username: "johndoe",
                image: "/avatars/avatar3.png",
            } satisfies UserDisplay,
            repository: {
                id: "3",
                name: "repository-3",
                ownerName: "john",
                ownerImage: "/avatars/avatar2.png",
                visibility: "public",
            },
            status: "pending",
            createdAt: new Date(),
        } satisfies Invitation,
        {
            id: "4",
            type: "organisation",
            sender: {
                id: "4",
                username: "ceo-googlu",
                image: "/avatars/avatar4.png",
            } satisfies UserDisplay,
            organisation: {
                id: "4",
                name: "Google",
                image: "/avatars/organisation-avatar1.png",
                memberCount: 20,
            } satisfies OrganisationDisplay,
            status: "pending",
            createdAt: new Date(),
        } satisfies Invitation,
        {
            id: "5",
            type: "organisation",
            sender: {
                id: "5",
                username: "microsoft-hr-guy",
                image: "/avatars/avatar5.png",
            } satisfies UserDisplay,
            organisation: {
                id: "5",
                name: "Microsoft",
                image: "/avatars/organisation-avatar2.png",
                memberCount: 150,
            } satisfies OrganisationDisplay,
            status: "accepted",
            createdAt: new Date(),
        } satisfies Invitation,
    ] satisfies Array<Invitation>,
};

export default function DashboardPage({
    dashboard,
    searchParams,
}: DashboardPageProps) {
    const pageSize: number = 6;

    const recentRepositories: Array<RepositoryDisplay> =
        dashboard.recentRepositories
    const favoriteRepositories: Array<RepositoryDisplay> =
        dashboard.favoriteRepositories;
    // still dummy data
    const invitations: Array<Invitation> = data.invitations;

    return (
        <div className="bg-background text-foreground m-6 flex flex-col gap-6 lg:flex-row">
            <aside className="w-full lg:w-1/3">
                <Card>
                    <CardHeader className="flex flex-col space-y-3">
                        <CardTitle className="flex flex-row items-center gap-x-3">
                            <CalendarArrowDown />
                            Recently opened
                        </CardTitle>
                        <CardDescription>
                            Your last opened repositories for easy access.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Suspense
                            fallback={<div>Loading recent activity...</div>}
                        >
                            {recentRepositories.length === 0 ? (
                                <NoData
                                    icon={CalendarOff}
                                    message={"No recent repositories found."}
                                    className="mb-6"
                                />
                            ) : (
                                <div className="flex flex-col gap-y-3">
                                    {recentRepositories.map((repository) => (
                                        <RecentRepositoryCardDisplay
                                            key={"recent" + repository.id}
                                            repository={repository}
                                            className="w-full"
                                        />
                                    ))}
                                </div>
                            )}
                        </Suspense>
                    </CardContent>
                </Card>
            </aside>

            <main className="flex w-full flex-col gap-6 lg:w-2/3">
                <Card className="bg-transparent">
                    <CardHeader>
                        <div className="flex flex-col space-y-3">
                            <CardTitle className="flex flex-row items-center gap-x-3">
                                <Star fill="currentColor" />
                                My favorites
                            </CardTitle>
                            <CardDescription>
                                Repositories that you marked as favorite.
                            </CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent className="pb-0">
                        <Suspense fallback={<div>Loading my favorites...</div>}>
                            {favoriteRepositories.length !== 0 ? (
                                <NoData
                                    icon={StarOff}
                                    message={"No favorite repositories found."}
                                    className="mb-6"
                                />
                            ) : (
                                <>
                                    <div className="flex flex-col gap-y-3">
                                        {favoriteRepositories.map((repository) => (
                                            <FavoriteRepositoryCardDisplay
                                                key={"favorite" + repository.id}
                                                repository={repository}
                                                className="w-full"
                                            />
                                        ))}
                                    </div>
                                    <DynamicPagination
                                        totalCount={2}
                                        pageSize={pageSize}
                                        page={searchParams.currentPage}
                                        className="my-3"
                                    />
                                </>
                            )}
                        </Suspense>
                    </CardContent>
                </Card>

                <Card className="bg-transparent">
                    <CardHeader className="flex flex-col space-y-3">
                        <CardTitle className="flex flex-row items-center gap-x-3">
                            <Mail />
                            Invitations
                        </CardTitle>
                        <CardDescription>
                            Invitations to join an organisation or to
                            collaborate on a repository.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Suspense fallback={<div>Loading invitations...</div>}>
                            {invitations.length === 0 ? (
                                <NoData
                                    icon={MailX}
                                    message={"No invitations found."}
                                />
                            ) : (
                                <div className="flex flex-col gap-y-3">
                                    {invitations.map((invitation: Invitation) => (
                                        <InvitationCardDisplay
                                            key={invitation.id}
                                            invitation={invitation}
                                            className="w-full"
                                        />
                                    ))}
                                </div>
                            )}
                        </Suspense>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}
