"use client";

import { OrganisationDisplay } from "@/lib/types/organisation";
import { RepositoryDisplay } from "@/lib/types/repository";
import { UsersOverview } from "@/lib/types/user";
import {
    Calendar,
    CalendarOff,
    Ellipsis,
    PinOff,
    StarOff,
    UsersRound,
} from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

import { getDateString } from "@/components/generic/generic";
import { NoData } from "@/components/no-data/no-data";
import { OrganisationCardDisplay } from "@/components/profile/organisation-card-display";
import { RepositoryCardDisplay } from "@/components/profile/repository-card-display";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";

const data = {
    favoriteRepositories: [
        {
            id: "1",
            ownerName: "johndoe1",
            ownerImage: undefined,
            name: "favorite-repo-1",
            visibility: "public",
        } satisfies RepositoryDisplay,
        {
            id: "2",
            ownerName: "johndoe2",
            ownerImage: undefined,
            name: "favorite-repo-2",
            visibility: "public",
        } satisfies RepositoryDisplay,
        {
            id: "3",
            ownerName: "johndoe3",
            ownerImage: undefined,
            name: "favorite-repo-3",
            visibility: "public",
        } satisfies RepositoryDisplay,
    ] satisfies Array<RepositoryDisplay>,
    recentRepositories: [
        {
            id: "1",
            ownerName: "kili",
            ownerImage: undefined,
            name: "recent-repo-1",
            visibility: "public",
        } satisfies RepositoryDisplay,
        {
            id: "2",
            ownerName: "kili",
            ownerImage: undefined,
            name: "recent-repo-2",
            visibility: "public",
        } satisfies RepositoryDisplay,
        {
            id: "3",
            ownerName: "kili",
            ownerImage: undefined,
            name: "recent-repo-3",
            visibility: "public",
        } satisfies RepositoryDisplay,
    ] satisfies Array<RepositoryDisplay>,
};

interface OverviewPageProps {
    overview: UsersOverview;
}

export default function OverviewPage({ overview }: OverviewPageProps) {
    const profile = overview.profile;
    const organisations = overview.organisations;
    const pinnedRepositories = overview.pinnedRepositories;

    /* TODO: this in db */
    const favoriteRepositories = data.favoriteRepositories;
    const recentRepositories = data.recentRepositories;

    return (
        <div className="m-6 flex flex-col gap-x-3 md:flex-row">
            <aside className="flex w-full flex-col gap-y-3 md:w-1/3">
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex flex-col items-start">
                            {profile.bio && (
                                <div className="mb-4">{profile.bio}</div>
                            )}
                            <div className="flex items-center text-muted-foreground">
                                <Calendar className="mr-2 h-5 w-5" />
                                {getDateString("Joined", profile.createdAt)}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {overview.isItMe && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent activity</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Suspense
                                fallback={<div>Loading recent activity...</div>}
                            >
                                <div className="flex flex-col gap-y-3">
                                    {recentRepositories.length === 0 && (
                                        <NoData
                                            icon={CalendarOff}
                                            message={
                                                "No recent repositories found."
                                            }
                                        />
                                    )}
                                    {recentRepositories.map((repository) => (
                                        <RepositoryCardDisplay
                                            type="recent"
                                            key={"recent" + repository.id}
                                            id={repository.id}
                                            ownerName={repository.ownerName}
                                            name={repository.name}
                                            visibility={repository.visibility}
                                            ownerImage={repository.ownerImage}
                                        />
                                    ))}
                                </div>
                            </Suspense>
                        </CardContent>
                    </Card>
                )}
            </aside>

            <main className="mt-3 flex w-full flex-col gap-y-3 md:mt-0 md:w-2/3">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex flex-row justify-between">
                            <span>Pinned repositories</span>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Link
                                        href={
                                            "/" +
                                            profile.username +
                                            "/repositories"
                                        }
                                    >
                                        <button className="rounded p-1.5 text-muted-foreground hover:bg-accent">
                                            <Ellipsis />
                                        </button>
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent>
                                    View all repositories
                                </TooltipContent>
                            </Tooltip>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Suspense
                            fallback={<div>Loading pinned repositories...</div>}
                        >
                            <div className="flex flex-col gap-y-3">
                                {pinnedRepositories.length === 0 && (
                                    <NoData
                                        icon={PinOff}
                                        message={
                                            "No pinned repositories found."
                                        }
                                    />
                                )}
                                {pinnedRepositories.map((repository) => (
                                    <RepositoryCardDisplay
                                        type="pinned"
                                        key={"pinned" + repository.id}
                                        id={repository.id}
                                        ownerName={repository.ownerName}
                                        name={repository.name}
                                        visibility={repository.visibility}
                                        ownerImage={repository.ownerImage}
                                    />
                                ))}
                            </div>
                        </Suspense>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex flex-row justify-between">
                            <span>Organisations</span>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Link
                                        href={
                                            "/" +
                                            profile.username +
                                            "/organisations"
                                        }
                                    >
                                        <button className="rounded p-1.5 text-muted-foreground hover:bg-accent">
                                            <Ellipsis />
                                        </button>
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent>
                                    View all organisations
                                </TooltipContent>
                            </Tooltip>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Suspense
                            fallback={<div>Loading organisations...</div>}
                        >
                            <div className="flex flex-col gap-y-3">
                                {organisations.length === 0 && (
                                    <NoData
                                        icon={UsersRound}
                                        message={"No organisations found."}
                                    />
                                )}
                                {organisations.map(
                                    (organisation: OrganisationDisplay) => (
                                        <OrganisationCardDisplay
                                            key={organisation.id}
                                            id={organisation.id}
                                            image={organisation.image}
                                            name={organisation.name}
                                            role={organisation.userRole}
                                            memberCount={
                                                organisation.memberCount
                                            }
                                        />
                                    ),
                                )}
                            </div>
                        </Suspense>
                    </CardContent>
                </Card>

                {overview.isItMe && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex flex-row justify-between">
                                <span>My favorites</span>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Link
                                            href={
                                                "/" +
                                                profile.username +
                                                "/favorites"
                                            }
                                        >
                                            <button className="rounded p-1.5 text-muted-foreground hover:bg-accent">
                                                <Ellipsis />
                                            </button>
                                        </Link>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        View all of my favorites
                                    </TooltipContent>
                                </Tooltip>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Suspense
                                fallback={<div>Loading my favorites...</div>}
                            >
                                <div className="flex flex-col gap-y-3">
                                    {favoriteRepositories.length === 0 && (
                                        <NoData
                                            icon={StarOff}
                                            message={
                                                "No favorite repositories found."
                                            }
                                        />
                                    )}
                                    {favoriteRepositories.map((repository) => (
                                        <RepositoryCardDisplay
                                            type="favorite"
                                            key={"favorite" + repository.id}
                                            id={repository.id}
                                            ownerName={repository.ownerName}
                                            name={repository.name}
                                            visibility={repository.visibility}
                                            ownerImage={repository.ownerImage}
                                        />
                                    ))}
                                </div>
                            </Suspense>
                        </CardContent>
                    </Card>
                )}
            </main>
        </div>
    );
}
