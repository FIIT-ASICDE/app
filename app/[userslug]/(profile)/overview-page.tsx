import { OrganisationDisplay } from "@/lib/types/organisation";
import { UsersOverview } from "@/lib/types/user";
import { Building, Calendar, Ellipsis, PinOff } from "lucide-react";
import Link from "next/link";

import { getDateString } from "@/components/generic/generic";
import { NoData } from "@/components/no-data/no-data";
import { OrganisationCardDisplay } from "@/components/profile/organisation-card-display";
import { PinnedRepositoryCardDisplay } from "@/components/profile/pinned-repository-card-display";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface OverviewPageProps {
    overview: UsersOverview;
}

export default function OverviewPage({ overview }: OverviewPageProps) {
    const profile = overview.profile;
    const organisations = overview.organisations;
    const pinnedRepositories = overview.pinnedRepositories;

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
                                <TooltipContent className="font-normal tracking-normal">
                                    View all repositories
                                </TooltipContent>
                            </Tooltip>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
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
                                <PinnedRepositoryCardDisplay
                                    key={"pinned" + repository.id}
                                    repository={repository}
                                />
                            ))}
                        </div>
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
                                <TooltipContent className="font-normal tracking-normal">
                                    View all organisations
                                </TooltipContent>
                            </Tooltip>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col gap-y-3">
                            {organisations.length === 0 && (
                                <NoData
                                    icon={Building}
                                    message={"No organisations found."}
                                />
                            )}
                            {organisations.map(
                                (organisation: OrganisationDisplay) => (
                                    <OrganisationCardDisplay
                                        key={organisation.id}
                                        organisation={organisation}
                                    />
                                ),
                            )}
                        </div>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}
