import { PaginationResult } from "@/lib/types/generic";
import {
    OrganisationDisplay,
    OrganisationMember,
    RoleOrganisationFilter,
} from "@/lib/types/organisation";
import { cn } from "@/lib/utils";
import { UsersRound } from "lucide-react";

import { DynamicPagination } from "@/components/dynamic-pagination/dynamic-pagination";
import { LayoutOptions } from "@/components/layout/layout-options";
import { NoData } from "@/components/no-data/no-data";
import { InviteMemberDialog } from "@/components/organisations/members/invite-member-dialog";
import { MemberCard } from "@/components/organisations/members/member-card";
import { OrganisationFilter } from "@/components/organisations/organisation-filter";
import Search from "@/components/ui/search";

interface MembersPageProps {
    org: OrganisationDisplay;
    members: Array<OrganisationMember>;
    searchParams: {
        query: string;
        rows: boolean;
        role: RoleOrganisationFilter;
        pagination: PaginationResult;
    };
}

export default function MembersPage({
    members,
    searchParams,
    org,
}: MembersPageProps) {
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
                    <OrganisationFilter
                        type="members"
                        filters={{
                            role: searchParams.role,
                        }}
                    />
                    {org.userRole === "admin" && (
                        <InviteMemberDialog organisationName={org.name} />
                    )}
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
                                        organisationId={org.id}
                                        organisationMember={organisationMember}
                                        userIsAdmin={org.userRole === "admin"}
                                    />
                                ),
                            )}
                        </div>
                        <DynamicPagination
                            totalCount={searchParams.pagination.total}
                            pageSize={searchParams.pagination.pageSize}
                            page={searchParams.pagination.page}
                            className="my-3"
                        />
                    </>
                )}
            </main>
        </div>
    );
}
