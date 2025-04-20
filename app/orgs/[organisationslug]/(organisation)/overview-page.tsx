import {
    Organisation,
    OrganisationMember,
    OrganisationOverview,
} from "@/lib/types/organisation";
import { Calendar, Ellipsis, PinOff, UsersRound } from "lucide-react";
import Link from "next/link";
import { ReactElement, Suspense } from "react";

import { getDateString } from "@/components/generic/generic";
import { NoData } from "@/components/generic/no-data";
import { MemberCardDisplay } from "@/components/organisations/members/member-card-display";
import { PinnedRepositoryCardDisplay } from "@/components/repositories/pinned-repository-card-display";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface OverviewPageProps {
    overview: OrganisationOverview;
}

/**
 * Overview page for organisation profile
 *
 * @param {OverviewPageProps} props - Component props
 * @returns {ReactElement} Overview page component
 */
export default function OverviewPage({
    overview
}: OverviewPageProps): ReactElement {
    const organisation: Organisation = overview.organisation;

    return (
        <div className="m-6 flex flex-col gap-x-3 md:flex-row">
            <aside className="flex w-full flex-col gap-y-3 md:w-1/3">
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex flex-col items-start">
                            {organisation.bio && (
                                <div className="mb-4">{organisation.bio}</div>
                            )}
                            <div className="flex items-center text-muted-foreground">
                                <Calendar className="mr-2 h-5 w-5" />
                                {getDateString(
                                    "Created",
                                    organisation.createdAt,
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </aside>

            <main className="mt-3 flex w-full flex-col gap-y-3 md:mt-0 md:w-2/3">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex flex-row justify-between">
                            Pinned repositories
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Link
                                        href={
                                            "/orgs/" +
                                            organisation.name +
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
                        <Suspense
                            fallback={<div>Loading pinned repositories...</div>}
                        >
                            <div className="flex flex-col gap-y-3">
                                {organisation.repositories.length === 0 && (
                                    <NoData
                                        icon={PinOff}
                                        message={
                                            "No pinned repositories found."
                                        }
                                    />
                                )}
                                {organisation.repositories.map((repository) => (
                                    <PinnedRepositoryCardDisplay
                                        key={"pinned" + repository.id}
                                        repository={repository}
                                    />
                                ))}
                            </div>
                        </Suspense>
                    </CardContent>
                </Card>

                {organisation.showMembers && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex flex-row items-center justify-between">
                                Members
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Link
                                            href={
                                                "/orgs/" +
                                                organisation.name +
                                                "/members"
                                            }
                                        >
                                            <button className="rounded p-1.5 text-muted-foreground hover:bg-accent">
                                                <Ellipsis />
                                            </button>
                                        </Link>
                                    </TooltipTrigger>
                                    <TooltipContent className="font-normal tracking-normal">
                                        View all members
                                    </TooltipContent>
                                </Tooltip>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Suspense fallback={<div>Loading members...</div>}>
                                <div className="flex flex-col gap-y-3">
                                    {organisation.members.length === 0 && (
                                        <NoData
                                            icon={UsersRound}
                                            message={"No members found."}
                                        />
                                    )}
                                    {organisation.members
                                        .slice(0, 3)
                                        .map((member: OrganisationMember) => (
                                            <MemberCardDisplay
                                                key={member.id}
                                                member={member}
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
