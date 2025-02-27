"use client";

import { OrganisationMember } from "@/lib/types/organisation";
import { cn } from "@/lib/utils";
import { UsersRound } from "lucide-react";

import { DynamicPagination } from "@/components/dynamic-pagination/dynamic-pagination";
import { LayoutOptions } from "@/components/layout/layout-options";
import { NoData } from "@/components/no-data/no-data";
import { InviteMemberDialog } from "@/components/organisations/members/invite-member-dialog";
import { MemberCard } from "@/components/organisations/members/member-card";
import Search from "@/components/ui/search";

interface MembersPageProps {
    orgSlug: string;
    searchParams: {
        query: string;
        currentPage: number;
        rows: boolean;
    };
}

const data = {
    id: "",
    bio: "",
    createdAt: new Date(),
    userIsAdmin: true,
    showMembers: true,
    members: [
        {
            id: "86db4870-15bf-4333-8f03-89eb3d66d6a6",
            username: "nesquiko12",
            name: "Lukáš",
            surname: "Častven",
            image: "/avatars/avatar1.png",
            role: "admin",
        } satisfies OrganisationMember,
        {
            id: "86db4870-15bf-4333-8f03-19eb3d66d6a6",
            username: "stanko444",
            name: "Adam",
            surname: "Grík",
            image: "/avatars/avatar2.png",
            role: "member",
        } satisfies OrganisationMember,
        {
            id: "86db4870-15bf-4333-8f03-29eb3d66d6a6",
            username: "kili",
            name: "Michal",
            surname: "Kilian",
            image: "/avatars/avatar3.png",
            role: "member",
        } satisfies OrganisationMember,
        {
            id: "86db4870-15bf-4333-8f03-39eb3d66d6a6",
            username: "dankosawa",
            name: "Daniel",
            surname: "Sawa",
            image: "/avatars/avatar4.png",
            role: "member",
        } satisfies OrganisationMember,
        {
            id: "86db4870-15bf-4333-8f03-49eb3d66d6a6",
            username: "faxo",
            name: "Maximilián",
            surname: "Strečanský",
            image: "/avatars/avatar5.png",
            role: "member",
        } satisfies OrganisationMember,
        {
            id: "86db4870-15bf-4333-8f03-59eb3d66d6a6",
            username: "maek999",
            name: "Marek",
            surname: "Odpadlík",
            image: "/avatars/avatar6.png",
            role: "member",
        } satisfies OrganisationMember,
        {
            id: "86db4870-15bf-4333-8f03-09eb3d66d6a6",
            username: "jozo",
            name: "Jožo",
            surname: "Jožovič",
            image: "/avatars/avatar1.png",
            role: "member",
        } satisfies OrganisationMember,
    ] satisfies Array<OrganisationMember>,
};

export default function MembersPage({
    // orgSlug,
    searchParams,
}: MembersPageProps) {
    const pageSize: number = 6;

    // still dummy data
    const userIsAdmin: boolean = data.userIsAdmin;
    const members: Array<OrganisationMember> = data.members;

    // TODO: move member filters to server side
    /*const [roleFilter, setRoleFilter] = useState<RoleOrganisationFilter>("all");

    useEffect(() => {
        setFilteredMembers(
            filterMembers(members, membersSearchPhrase, roleFilter),
        );
    }, [membersSearchPhrase, roleFilter, members]);*/

    if (!data.showMembers) {
        return (
            <h3>TODO: This organisation is not showing their member list.</h3>
        );
    }

    return (
        <div className="bg-background text-foreground">
            <div className="flex items-center justify-between">
                <div className="m-6 mb-0 flex w-1/2 items-center space-x-5">
                    <Search placeholder="Search members..." />
                    <LayoutOptions
                        layout={searchParams.rows ? "rows" : "grid"}
                        className="hidden lg:flex"
                    />
                </div>
                <div className="m-6 mb-0 flex flex-row space-x-3">
                    {/*<MemberFilterBadges
                        roleFilter={roleFilter}
                        setRoleFilter={setRoleFilter}
                    />
                    <MemberFilter
                        roleFilter={roleFilter}
                        setRoleFilter={setRoleFilter}
                    />*/}
                    {userIsAdmin && <InviteMemberDialog />}
                </div>
            </div>

            <main>
                {members.length === 0 ? (
                    <NoData
                        icon={UsersRound}
                        message={"No members found."}
                        className="m-6"
                    />
                ) : (
                    <>
                        <div
                            className={cn(
                                "m-6 grid grid-cols-1 gap-3",
                                !searchParams.rows ? "lg:grid-cols-2" : "",
                            )}
                        >
                            {members.map(
                                (organisationMember: OrganisationMember) => (
                                    <MemberCard
                                        key={organisationMember.id}
                                        organisationId={data.id}
                                        organisationMember={organisationMember}
                                        userIsAdmin={data.userIsAdmin}
                                    />
                                ),
                            )}
                        </div>
                        <DynamicPagination
                            totalCount={2}
                            pageSize={pageSize}
                            page={searchParams.currentPage}
                            className="my-3"
                        />
                    </>
                )}
            </main>
        </div>
    );
}
