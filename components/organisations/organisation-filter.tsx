import {
    MemberCountSort,
    OrganisationDisplay,
    RoleOrganisationFilter,
} from "@/lib/types/organisation";
import {
    ArrowDown01,
    ArrowUp10, Building,
    RotateCcw,
    Shield,
    SlidersHorizontal,
    UserRound,
} from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import * as React from "react";

import { TooltipDropdown } from "@/components/tooltip-dropdown/tooltip-dropdown";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface OrganisationFilterProps {
    roleFilter: RoleOrganisationFilter;
    setRoleFilter: Dispatch<SetStateAction<RoleOrganisationFilter>>;
    memberCountSort: MemberCountSort;
    setMemberCountSort: Dispatch<SetStateAction<MemberCountSort>>;
}

export const filterOrganisations = (
    organisations: Array<OrganisationDisplay>,
    organisationSearchPhrase: string,
    roleFilter: RoleOrganisationFilter,
    memberCountSort: MemberCountSort,
) => {
    let newFilteredOrganisations: Array<OrganisationDisplay> =
        organisations.filter((organisation: OrganisationDisplay) =>
            organisation.name
                .toLowerCase()
                .includes(organisationSearchPhrase.toLowerCase()),
        );

    if (roleFilter !== "all") {
        newFilteredOrganisations = newFilteredOrganisations.filter(
            (organisation: OrganisationDisplay) => {
                if (roleFilter === organisation.userRole) {
                    return organisation;
                }
            },
        );
    }

    if (memberCountSort !== "none") {
        newFilteredOrganisations = newFilteredOrganisations.sort(
            (a: OrganisationDisplay, b: OrganisationDisplay) => {
                if (memberCountSort === "asc") {
                    return a.memberCount - b.memberCount;
                } else {
                    return b.memberCount - a.memberCount;
                }
            },
        );
    }

    return newFilteredOrganisations;
};

export const OrganisationFilter = ({
    roleFilter,
    setRoleFilter,
    memberCountSort,
    setMemberCountSort,
}: OrganisationFilterProps) => {
    return (
        <TooltipDropdown
            tooltip="Filter organisations"
            dropdownTrigger={
                <button className="rounded bg-transparent p-2 hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                    <SlidersHorizontal />
                </button>
            }
            dropdownContent={
                <DropdownMenuContent className="w-52 space-y-1">
                    <DropdownMenuLabel className="text-center">
                        Filter by role
                    </DropdownMenuLabel>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="w-full">
                                {roleFilter === "all" ? (
                                    <>
                                        <Building className="text-muted-foreground" />
                                        All
                                    </>
                                ) : roleFilter === "admin" ? (
                                    <>
                                        <Shield className="text-muted-foreground" />
                                        Admin
                                    </>
                                ) : (
                                    <>
                                        <UserRound className="text-muted-foreground" />
                                        Member
                                    </>
                                )}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem
                                onClick={() => setRoleFilter("all")}
                            >
                                <Building className="text-muted-foreground" />
                                All
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => setRoleFilter("admin")}
                            >
                                <Shield className="text-muted-foreground" />
                                Admin
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => setRoleFilter("member")}
                            >
                                <UserRound className="text-muted-foreground" />
                                Member
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <DropdownMenuSeparator />

                    <DropdownMenuLabel className="text-center">
                        Sort by member count
                    </DropdownMenuLabel>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="w-full">
                                {memberCountSort === "none" ? (
                                    <>
                                        <Building className="text-muted-foreground" />
                                        None
                                    </>
                                ) : memberCountSort === "asc" ? (
                                    <>
                                        <ArrowDown01 className="text-muted-foreground" />
                                        Ascending
                                    </>
                                ) : (
                                    <>
                                        <ArrowUp10 className="text-muted-foreground" />
                                        Descending
                                    </>
                                )}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem
                                onClick={() => setMemberCountSort("none")}
                            >
                                <Building className="text-muted-foreground" />
                                None
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => setMemberCountSort("asc")}
                            >
                                <ArrowDown01 className="text-muted-foreground" />
                                Ascending
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => setMemberCountSort("desc")}
                            >
                                <ArrowUp10 className="text-muted-foreground" />
                                Descending
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <DropdownMenuSeparator />

                    <Button
                        variant="outline"
                        className="w-full cursor-pointer text-muted-foreground"
                        onClick={() => {
                            setRoleFilter("all");
                            setMemberCountSort("none");
                        }}
                    >
                        <RotateCcw />
                        Reset filter
                    </Button>
                </DropdownMenuContent>
            }
            tooltipSide="top"
        />
    );
};
