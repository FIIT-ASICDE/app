import {
    OrganisationMember,
    RoleOrganisationFilter,
} from "@/lib/types/organisation";
import {
    RotateCcw,
    Shield,
    SlidersHorizontal,
    UserRound,
    UsersRound,
} from "lucide-react";
import { Dispatch, SetStateAction } from "react";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface MembersFilterProps {
    roleFilter: RoleOrganisationFilter;
    setRoleFilter: Dispatch<SetStateAction<RoleOrganisationFilter>>;
}

const phraseOccurrence = (member: OrganisationMember, searchPhrase: string) => {
    const removeAccents = (str: string) =>
        str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    const memberFields: Array<string> = [
        removeAccents(member.username.toLowerCase()),
        removeAccents(member.name.toLowerCase()),
        removeAccents(member.surname.toLowerCase()),
    ];

    for (let i = 0; i < memberFields.length; i++) {
        if (memberFields[i].includes(searchPhrase.toLowerCase())) {
            return true;
        }
    }
    return false;
};

export const filterMembers = (
    organisationMembers: Array<OrganisationMember>,
    membersSearchPhrase: string,
    roleFilter: RoleOrganisationFilter,
) => {
    let newFilteredOrganisationMembers: Array<OrganisationMember> =
        organisationMembers.filter((organisationMember: OrganisationMember) => {
            if (phraseOccurrence(organisationMember, membersSearchPhrase)) {
                return organisationMember;
            }
        });

    if (roleFilter !== "all") {
        newFilteredOrganisationMembers = newFilteredOrganisationMembers.filter(
            (organisationMember: OrganisationMember) => {
                if (roleFilter === organisationMember.role) {
                    return organisationMember;
                }
            },
        );
    }
    return newFilteredOrganisationMembers;
};

export const MemberFilter = ({
    roleFilter,
    setRoleFilter,
}: MembersFilterProps) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="rounded bg-transparent p-2 hover:bg-accent">
                    <SlidersHorizontal />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40 space-y-1">
                <DropdownMenuLabel className="text-center">
                    Filter by role
                </DropdownMenuLabel>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="w-full">
                            {roleFilter === "all" ? (
                                <>
                                    <UsersRound className="text-muted-foreground" />
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
                        <DropdownMenuItem onClick={() => setRoleFilter("all")}>
                            <UsersRound className="text-muted-foreground" />
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
                <Button
                    variant="outline"
                    className="w-full cursor-pointer text-muted-foreground"
                    onClick={() => {
                        setRoleFilter("all");
                    }}
                >
                    <RotateCcw />
                    Reset filter
                </Button>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
