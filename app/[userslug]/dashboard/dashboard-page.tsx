"use client";

import { PaginationResult } from "@/lib/types/generic";
import type { Invitation } from "@/lib/types/invitation";
import type { RepositoryDisplay } from "@/lib/types/repository";
import { UsersDashboard } from "@/lib/types/user";
import {
    CalendarArrowDown,
    CalendarOff,
    Mail,
    MailX,
    Star,
    StarOff,
} from "lucide-react";
import { Suspense } from "react";

import { DynamicPagination } from "@/components/generic/dynamic-pagination";
import { NoData } from "@/components/generic/no-data";
import { FavoriteRepositoryCardDisplay } from "@/components/repositories/favorite-repository-card-display";
import { InvitationCardDisplay } from "@/components/invitations/invitation-card-display";
import { RecentRepositoryCardDisplay } from "@/components/repositories/recent-repository-card-display";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

interface DashboardPageProps {
    dashboard: UsersDashboard;
    searchParams: {
        pagination: PaginationResult;
    };
    favoriteRepos: Array<RepositoryDisplay>;
}

export default function DashboardPage({
    dashboard,
    searchParams,
    favoriteRepos,
}: DashboardPageProps) {
    const recentRepositories: Array<RepositoryDisplay> =
        dashboard.recentRepositories;
    const favoriteRepositories: Array<RepositoryDisplay> = favoriteRepos;
    const invitations: Array<Invitation> = dashboard.invitations;

    return (
        <div className="m-6 flex flex-col gap-6 bg-background text-foreground lg:flex-row">
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
                            {favoriteRepositories.length === 0 ? (
                                <NoData
                                    icon={StarOff}
                                    message={"No favorite repositories found."}
                                    className="mb-6"
                                />
                            ) : (
                                <>
                                    <div className="flex flex-col gap-y-3">
                                        {favoriteRepositories.map(
                                            (repository) => (
                                                <FavoriteRepositoryCardDisplay
                                                    key={
                                                        "favorite" +
                                                        repository.id
                                                    }
                                                    repository={repository}
                                                    className="w-full"
                                                />
                                            ),
                                        )}
                                    </div>
                                    <DynamicPagination
                                        totalCount={
                                            searchParams.pagination.total
                                        }
                                        pageSize={
                                            searchParams.pagination.pageSize
                                        }
                                        page={searchParams.pagination.page}
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
                                    {invitations.map(
                                        (invitation: Invitation) => (
                                            <InvitationCardDisplay
                                                key={invitation.id}
                                                invitation={invitation}
                                                className="w-full"
                                            />
                                        ),
                                    )}
                                </div>
                            )}
                        </Suspense>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}
