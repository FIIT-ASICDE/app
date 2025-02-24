import type { Invitation } from "@/lib/types/invitation";
import type { OrganisationDisplay } from "@/lib/types/organisation";
import type { RepositoryDisplay } from "@/lib/types/repository";
import type { UserDisplay } from "@/lib/types/user";
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
import { PaginationWithLinks } from "@/components/pagination-with-links/pagination-with-links";
import { InvitationCardDisplay } from "@/components/profile/invitation-card-display";
import { RepositoryCardDisplay } from "@/components/profile/repository-card-display";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

interface DashboardPageProps {
    userSlug: string;
}

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
            name: "recent-repo-1-repooooooo",
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

export default function DashboardPage({} /* userSlug */ : DashboardPageProps) {
    const recentRepositories: Array<RepositoryDisplay> =
        data.recentRepositories;
    const favoriteRepositories: Array<RepositoryDisplay> =
        data.favoriteRepositories;
    const invitations: Array<Invitation> = data.invitations;

    return (
        <div className="m-6 flex flex-col gap-6 lg:flex-row">
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
                                        className="w-full"
                                    />
                                ))}
                            </div>
                        </Suspense>
                    </CardContent>
                </Card>
            </aside>

            <main className="flex w-full flex-col gap-6 lg:w-2/3">
                <Card className="border-none bg-transparent">
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
                                        className="w-full"
                                    />
                                ))}
                            </div>
                        </Suspense>
                        <PaginationWithLinks
                            totalCount={150}
                            pageSize={5}
                            page={2}
                            className="pt-3"
                        />
                    </CardContent>
                </Card>

                <Card className="border-none bg-transparent">
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
                            <div className="flex flex-col gap-y-3">
                                {invitations.length === 0 && (
                                    <NoData
                                        icon={MailX}
                                        message={"No invitations found."}
                                    />
                                )}
                                {invitations.map((invitation: Invitation) => (
                                    <InvitationCardDisplay
                                        key={invitation.id}
                                        invitation={invitation}
                                        className="w-full"
                                    />
                                ))}
                            </div>
                        </Suspense>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}
