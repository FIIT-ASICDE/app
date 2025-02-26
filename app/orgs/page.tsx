import { api } from "@/lib/trpc/server";
import { cn } from "@/lib/utils";
import { UsersRound } from "lucide-react";

import { LayoutOptions } from "@/components/layout/layout-options";
import { NoData } from "@/components/no-data/no-data";
import { DynamicPagination } from "@/components/dynamic-pagination/dynamic-pagination";
import { OrganisationCardDisplay } from "@/components/profile/organisation-card-display";
import Search from "@/components/ui/search";

export default async function OrganisationsPage(props: {
    searchParams?: Promise<{
        query?: string;
        page?: string;
        rows?: boolean;
    }>;
}) {
    const searchParams = await props.searchParams;
    const query = searchParams?.query || "";
    const currentPage = Number(searchParams?.page) || 0;

    const pageSize = 20;

    const { organizations, pagination } = await api.org.search({
        nameSearchTerm: query,
        page: currentPage,
        pageSize: pageSize,
    });

    return (
        <div className="bg-background text-foreground">
            <div className="flex items-center justify-between">
                <div className="m-6 mb-0 flex w-1/2 items-center space-x-5">
                    <Search placeholder="Search organisations..." />
                    <LayoutOptions
                        layout={searchParams?.rows ? "rows" : "grid"}
                        responsivenessCheckpoint={"lg"}
                    />
                </div>
                <div className="m-6 mb-0 flex space-x-3">
                    {/*<OrganisationFilterBadges
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
                    */}
                </div>
            </div>

            <main>
                {organizations.length === 0 ? (
                    <NoData
                        icon={UsersRound}
                        message={"No organisations found."}
                        className="m-6"
                    />
                ) : (
                    <>
                        <div
                            className={cn(
                            "m-6 grid grid-cols-1 gap-3",
                            !searchParams?.rows ? "lg:grid-cols-2" : "",
                            )}
                        >
                            {organizations.map((org) => (
                                <OrganisationCardDisplay
                                    key={org.id}
                                    id={org.id}
                                    name={org.name}
                                    image={org.image}
                                    role={org.userRole}
                                    memberCount={org.memberCount}
                                />
                            ))}
                        </div>
                        <DynamicPagination
                            totalCount={pagination.pageCount}
                            pageSize={pagination.pageSize}
                            page={pagination.page}
                            className="mb-6"
                        />
                    </>
                )}
            </main>
        </div>
    );
}
