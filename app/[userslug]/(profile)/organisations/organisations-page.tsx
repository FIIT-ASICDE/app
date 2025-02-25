"use client";

import { LayoutType } from "@/lib/types/generic";
import {
    MemberCountSort,
    OrganisationDisplay,
    RoleOrganisationFilter,
} from "@/lib/types/organisation";
import { UsersRound } from "lucide-react";
import { useEffect, useState } from "react";

import { getWidthFromResponsivenessCheckpoint } from "@/components/generic/generic";
import { NoData } from "@/components/no-data/no-data";
import { CreateOrganisationDialog } from "@/components/organisations/create-organisation-dialog";
import { OrganisationCard } from "@/components/organisations/organisation-card";
import {
    OrganisationFilter,
    filterOrganisations,
} from "@/components/organisations/organisation-filter";
import { OrganisationFilterBadges } from "@/components/organisations/organisation-filter-badges";
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



interface OrganisationsPageProps {
    usersOrganisations: Array<OrganisationDisplay>;
}

export default function OrganisationsPage(
    { usersOrganisations }: OrganisationsPageProps,
) {
    const [organisationsLayout, setOrganisationsLayout] =
        useState<LayoutType>("grid");
    const [isLg, setIsLg] = useState<boolean>(false);

    useEffect(() => {
        const handleResize = () => {
            const lg =
                window.innerWidth < getWidthFromResponsivenessCheckpoint("lg");
            setIsLg(lg);
            if (lg) {
                setOrganisationsLayout("rows");
            }
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const [organisations, setOrganisations] = useState<
        Array<OrganisationDisplay>
    >(usersOrganisations);
    const [filteredOrganisations, setFilteredOrganisations] = useState<
        Array<OrganisationDisplay>
    >(usersOrganisations);
    const [organisationSearchPhrase, setOrganisationSearchPhrase] =
        useState<string>("");
    const [roleFilter, setRoleFilter] = useState<RoleOrganisationFilter>("all");
    const [memberCountSort, setMemberCountSort] =
        useState<MemberCountSort>("none");

    useEffect(() => {
        setFilteredOrganisations(
            filterOrganisations(
                organisations,
                organisationSearchPhrase,
                roleFilter,
                memberCountSort,
            ),
        );
    }, [organisationSearchPhrase, roleFilter, memberCountSort, organisations]);

    return (
        <div className="bg-background text-foreground">
            <div className="flex items-center justify-between">
                <div className="m-6 mb-0 flex w-1/2 items-center space-x-5">
                    <div className="relative w-full">
                        <UsersRound className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search organisations..."
                            className="pl-8"
                            value={organisationSearchPhrase}
                            onChange={(event) =>
                                setOrganisationSearchPhrase(event.target.value)
                            }
                        />
                    </div>
                    {/*<LayoutOptions
                        layout={organisationsLayout}
                        setLayout={setOrganisationsLayout}
                        responsivenessCheckpoint={"lg"}
                    />*/}
                </div>
                <div className="m-6 mb-0 flex space-x-3">
                    <OrganisationFilterBadges
                        roleFilter={roleFilter}
                        setRoleFilter={setRoleFilter}
                        memberCountSort={memberCountSort}
                        setMemberCountSort={setMemberCountSort}
                    />
                    <OrganisationFilter
                        roleFilter={roleFilter}
                        setRoleFilter={setRoleFilter}
                        memberCountSort={memberCountSort}
                        setMemberCountSort={setMemberCountSort}
                    />
                    <CreateOrganisationDialog
                        organisations={organisations}
                        setOrganisations={setOrganisations}
                    />
                </div>
            </div>

            <main>
                <div
                    className={
                        filteredOrganisations.length === 0
                            ? "m-6 flex flex-col"
                            : isLg || organisationsLayout === "grid"
                              ? "m-6 grid grid-cols-1 gap-3 lg:grid-cols-2"
                              : "m-6 grid grid-cols-1 gap-3"
                    }
                >
                    {filteredOrganisations.length === 0 && (
                        <NoData
                            icon={UsersRound}
                            message={"No organisations found."}
                        />
                    )}
                    {filteredOrganisations.map((organisation) => (
                        <OrganisationCard
                            key={organisation.id}
                            id={organisation.id}
                            name={organisation.name}
                            image={organisation.image}
                            role={organisation.userRole}
                            memberCount={organisation.memberCount}
                            description={organisation.bio}
                        />
                    ))}
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
