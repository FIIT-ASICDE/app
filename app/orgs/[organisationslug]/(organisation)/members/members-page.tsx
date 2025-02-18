"use client";

import { LayoutType } from "@/lib/types/generic";
import {
    OrganisationMember,
    RoleOrganisationFilter,
} from "@/lib/types/organisation";
import { UsersRound } from "lucide-react";
import { useEffect, useState } from "react";

import { getWidthFromResponsivenessCheckpoint } from "@/components/generic/generic";
import { LayoutOptions } from "@/components/layout/layout-options";
import { NoData } from "@/components/no-data/no-data";
import {
    MemberFilter,
    filterMembers,
} from "@/components/organisations/members/member-filter";
import { MemberFilterBadges } from "@/components/organisations/members/member-filter-badges";
import { OrganisationMemberCard } from "@/components/organisations/members/organisation-member-card";
import { Input } from "@/components/ui/input";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

interface MembersPageProps {
    userSlug: string;
}

const data = {
    id: "",
    bio: "",
    createdAt: new Date(),
    userIsAdmin: true,
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

export default function MembersPage(
    {
        // userSlug
    }: MembersPageProps,
) {
    const [membersLayout, setMembersLayout] = useState<LayoutType>("grid");
    const [isLg, setIsLg] = useState<boolean>(false);

    useEffect(() => {
        const handleResize = () => {
            const lg =
                window.innerWidth < getWidthFromResponsivenessCheckpoint("lg");
            setIsLg(lg);
            if (lg) {
                setMembersLayout("rows");
            }
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const members: Array<OrganisationMember> = data.members;
    const [filteredMembers, setFilteredMembers] = useState<
        Array<OrganisationMember>
    >(data.members);
    const [membersSearchPhrase, setMembersSearchPhrase] = useState<string>("");
    const [roleFilter, setRoleFilter] = useState<RoleOrganisationFilter>("all");

    useEffect(() => {
        setFilteredMembers(
            filterMembers(members, membersSearchPhrase, roleFilter),
        );
    }, [membersSearchPhrase, roleFilter, members]);

    return (
        <div className="bg-background text-foreground">
            <div className="flex items-center justify-between">
                <div className="m-6 mb-0 flex w-1/2 items-center space-x-5">
                    <div className="relative w-full">
                        <UsersRound className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search members..."
                            className="pl-8"
                            value={membersSearchPhrase}
                            onChange={(event) =>
                                setMembersSearchPhrase(event.target.value)
                            }
                        />
                    </div>
                    <LayoutOptions
                        layout={membersLayout}
                        setLayout={setMembersLayout}
                        responsivenessCheckpoint={"lg"}
                    />
                </div>
                <div className="m-6 mb-0 flex space-x-3">
                    <MemberFilterBadges
                        roleFilter={roleFilter}
                        setRoleFilter={setRoleFilter}
                    />
                    <MemberFilter
                        roleFilter={roleFilter}
                        setRoleFilter={setRoleFilter}
                    />
                </div>
            </div>

            <main>
                <div
                    className={
                        filteredMembers.length === 0
                            ? "m-6 flex flex-col"
                            : isLg || membersLayout === "grid"
                              ? "m-6 grid grid-cols-1 gap-3 lg:grid-cols-2"
                              : "m-6 grid grid-cols-1 gap-3"
                    }
                >
                    {filteredMembers.length === 0 && (
                        <NoData
                            icon={UsersRound}
                            message={"No organisations found."}
                        />
                    )}
                    {filteredMembers.map(
                        (organisationMember: OrganisationMember) => (
                            <OrganisationMemberCard
                                key={organisationMember.id}
                                organisationId={data.id}
                                organisationMember={organisationMember}
                                userIsAdmin={data.userIsAdmin}
                            />
                        ),
                    )}
                </div>
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious href="#" />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">1</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationNext href="#" />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </main>
        </div>
    );
}
