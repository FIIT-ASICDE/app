"use client";

import { RoleOrganisationFilter } from "@/lib/types/organisation";
import {
    RotateCcw,
    Shield,
    SlidersHorizontal,
    UserRound,
    UsersRound,
    X,
} from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ReactElement, useEffect, useState } from "react";

import { TooltipDropdown } from "@/components/generic/tooltip-dropdown";
import { Badge } from "@/components/ui/badge";
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
    type: "organisations" | "members";
    filters: {
        role: RoleOrganisationFilter;
    };
}

/**
 * Component used to filter a list of organisations
 *
 * @param {OrganisationFilterProps} props - Component props
 * @returns {ReactElement} Filter component
 */
export const OrganisationFilter = ({
    type,
    filters,
}: OrganisationFilterProps): ReactElement => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    const [roleFilter, setRoleFilter] = useState<RoleOrganisationFilter>(
        filters.role,
    );

    useEffect(() => {
        setRoleFilter(filters.role);
    }, [filters]);

    const updateFilter = (key: string, value: string | null) => {
        const params = new URLSearchParams(searchParams);
        if (value === null) {
            params.delete(key);
        } else {
            params.set(key, value);
        }
        router.replace(`${pathname}?${params.toString()}`);
    };

    const handleRoleFilterClick = (newRole: RoleOrganisationFilter) => {
        setRoleFilter(newRole);
        updateFilter(
            "role",
            newRole === "all" ? null : newRole === "admin" ? "true" : "false",
        );
    };

    const handleResetFilters = () => {
        setRoleFilter("all");
        router.replace(pathname);
    };

    return (
        <div className="mb-0 flex flex-row space-x-3">
            <div className="hidden h-8 flex-row justify-center gap-x-2 md:flex">
                {roleFilter !== "all" && (
                    <Badge
                        variant="secondary"
                        className="h-10 cursor-pointer space-x-1"
                        onClick={() => handleRoleFilterClick("all")}
                    >
                        {roleFilter === "admin" ? (
                            <Shield className="h-5 w-5 text-muted-foreground" />
                        ) : (
                            <UserRound className="h-5 w-5 text-muted-foreground" />
                        )}
                        <X className="h-4 w-4 text-muted-foreground" />
                    </Badge>
                )}
            </div>
            <TooltipDropdown
                tooltip={"Filter " + type}
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
                                            <UsersRound /> All
                                        </>
                                    ) : roleFilter === "admin" ? (
                                        <>
                                            <Shield /> Admin
                                        </>
                                    ) : (
                                        <>
                                            <UserRound /> Member
                                        </>
                                    )}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem
                                    onClick={() => handleRoleFilterClick("all")}
                                >
                                    <UsersRound /> All
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() =>
                                        handleRoleFilterClick("admin")
                                    }
                                >
                                    <Shield /> Admin
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() =>
                                        handleRoleFilterClick("member")
                                    }
                                >
                                    <UserRound /> Member
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <DropdownMenuSeparator />

                        <Button
                            variant="outline"
                            className="w-full cursor-pointer text-muted-foreground"
                            onClick={handleResetFilters}
                            disabled={roleFilter === "all"}
                        >
                            <RotateCcw /> Reset filter
                        </Button>
                    </DropdownMenuContent>
                }
                tooltipSide="top"
            />
        </div>
    );
};
