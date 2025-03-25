import { PaginationResult } from "@/lib/types/generic";
import {
    OrganisationDisplay,
    RoleOrganisationFilter,
} from "@/lib/types/organisation";
import { cn } from "@/lib/utils";
import { Building } from "lucide-react";

import { DynamicPagination } from "@/components/generic/dynamic-pagination";
import { LayoutOptions } from "@/components/generic/layout-options";
import { NoData } from "@/components/generic/no-data";
import { CreateOrganisationDialog } from "@/components/organisations/create-organisation-dialog";
import { OrganisationCard } from "@/components/organisations/organisation-card";
import { OrganisationFilter } from "@/components/organisations/organisation-filter";
import Search from "@/components/ui/search";

interface OrganisationsPageProps {
    usersOrganisations: Array<OrganisationDisplay>;
    searchParams: {
        query: string;
        rows: boolean;
        role: RoleOrganisationFilter;
        pagination: PaginationResult;
    };
    isItMe: boolean;
}

export default function OrganisationsPage({
    usersOrganisations,
    searchParams,
    isItMe,
}: OrganisationsPageProps) {
    return (
        <div className="bg-background text-foreground">
            <div className="flex items-center justify-between">
                <div className="m-6 mb-0 flex w-1/2 items-center space-x-5">
                    <Search placeholder="Search organisations..." />
                    <LayoutOptions
                        layout={searchParams.rows ? "rows" : "grid"}
                        className="hidden lg:flex"
                    />
                </div>
                <div className="m-6 mb-0 flex flex-row space-x-3">
                    <OrganisationFilter
                        type="organisations"
                        filters={{
                            role: searchParams.role,
                        }}
                    />
                    {isItMe && <CreateOrganisationDialog />}
                </div>
            </div>

            <main>
                {usersOrganisations.length === 0 ? (
                    <NoData
                        icon={Building}
                        message={"No organisations found."}
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
                            {usersOrganisations.map(
                                (organisation: OrganisationDisplay) => (
                                    <OrganisationCard
                                        key={organisation.id}
                                        organisation={organisation}
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
