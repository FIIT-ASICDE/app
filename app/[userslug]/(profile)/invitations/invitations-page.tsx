import { Mail } from "lucide-react";
import { UserDisplay } from "@/lib/types/user";
import { Invitation } from "@/lib/types/invitation";
import { RepositoryDisplay } from "@/lib/types/repository";
import { OrganisationDisplay } from "@/lib/types/organisation";
import { InvitationCardDisplay } from "@/components/profile/invitation-card-display";
import { NoData } from "@/components/no-data/no-data";
import Search from "@/components/ui/search";
import { cn } from "@/lib/utils";
import { LayoutOptions } from "@/components/layout/layout-options";

interface InvitationsPageProps {
    userSlug: string;
    searchParams?: Promise<{
        query?: string;
        page?: string;
        rows?: boolean;
    }>;
}

const data = {
    invitations: [
        {
            id: "1",
            type: "repository",
            sender: {
                id: "1",
                username: "johndoe",
                image: "/avatars/avatar1.png"
            } satisfies UserDisplay,
            repository: {
                id: "1",
                name: "repository-1",
                ownerName: "john-the-owner",
                ownerImage: "/avatars/avatar5.png",
                visibility: "public",
            } satisfies RepositoryDisplay,
            status: "pending",
            createdAt: new Date()
        } satisfies Invitation,
        {
            id: "2",
            type: "repository",
            sender: {
                id: "2",
                username: "johndoeeeee",
                image: "/avatars/avatar3.png"
            } satisfies UserDisplay,
            repository: {
                id: "2",
                name: "repo-repo",
                ownerName: "john-the-owner-2",
                ownerImage: "/avatars/avatar4.png",
                visibility: "private",
            },
            status: "pending",
            createdAt: new Date()
        } satisfies Invitation,
        {
            id: "3",
            type: "repository",
            sender: {
                id: "3",
                username: "johndoe",
                image: "/avatars/avatar3.png"
            } satisfies UserDisplay,
            repository: {
                id: "3",
                name: "repository-3",
                ownerName: "john",
                ownerImage: "/avatars/avatar2.png",
                visibility: "public",
            },
            status: "pending",
            createdAt: new Date()
        } satisfies Invitation,
        {
            id: "4",
            type: "organisation",
            sender: {
                id: "4",
                username: "ceo-googlu",
                image: "/avatars/avatar4.png"
            } satisfies UserDisplay,
            organisation: {
                id: "4",
                name: "Google",
                image: "/avatars/organisation-avatar1.png",
                memberCount: 20,
            } satisfies OrganisationDisplay,
            status: "pending",
            createdAt: new Date()
        } satisfies Invitation,
        {
            id: "5",
            type: "organisation",
            sender: {
                id: "5",
                username: "microsoft-hr-guy",
                image: "/avatars/avatar5.png"
            } satisfies UserDisplay,
            organisation: {
                id: "5",
                name: "Microsoft",
                image: "/avatars/organisation-avatar2.png",
                memberCount: 150,
            } satisfies OrganisationDisplay,
            status: "accepted",
            createdAt: new Date()
        } satisfies Invitation,
    ] satisfies Array<Invitation>
};

export default async function InvitationsPage(
    props : InvitationsPageProps
) {
    const searchParams = await props.searchParams;
    // const query = searchParams?.query || "";
    // const currentPage = Number(searchParams?.page) || 1;

    const invitations: Array<Invitation> = data.invitations;

    console.log("searchParams:", searchParams);

    return (
        <div className="bg-background text-foreground">
            <div className="flex items-center justify-between">
                <div className="m-6 mb-0 flex w-1/2 items-center space-x-5">
                    <Search placeholder="Search invitations..." />
                    <LayoutOptions
                        layout={searchParams?.rows ? "rows" : "grid"}
                        responsivenessCheckpoint={"lg"}
                    />
                </div>
                <div className="m-6 mb-0 flex space-x-3">

                </div>
            </div>

            <main>
                <div
                    className={cn(
                        "m-6 grid grid-cols-1 gap-3",
                        !searchParams?.rows ? "lg:grid-cols-2" : ""
                    )}
                >
                    {invitations.length === 0 && (
                        <NoData
                            icon={Mail}
                            message={"No invitations found."}
                        />
                    )}
                    {invitations.map((invitation: Invitation) => (
                        <InvitationCardDisplay
                            key={invitation.id}
                            invitation={invitation}
                        />
                    ))}
                </div>
                {/*<div className="mb-6">
                    <PaginationWithLinks
                        totalCount={pagination.pageCount}
                        pageSize={pagination.pageSize}
                        page={pagination.page}
                    />
                </div>*/}
            </main>
        </div>
    );
};