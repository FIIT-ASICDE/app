import { PaginationResult } from "@/lib/types/generic";
import {
    OrganisationDisplay,
} from "@/lib/types/organisation";
import { cn } from "@/lib/utils";
import { Building } from "lucide-react";

import { DynamicPagination } from "@/components/dynamic-pagination/dynamic-pagination";
import { LayoutOptions } from "@/components/layout/layout-options";
import { NoData } from "@/components/no-data/no-data";
import { CreateOrganisationDialog } from "@/components/organisations/create-organisation-dialog";
import { OrganisationCardDisplay } from "@/components/profile/organisation-card-display";
import Search from "@/components/ui/search";

interface OrganisationsPageProps {
    organisations: Array<OrganisationDisplay>;
    searchParams: {
        query: string;
        rows: boolean;
        pagination: PaginationResult;
    };
}

export const OrganisationsPage = ({
    organisations,
    searchParams,
}: OrganisationsPageProps) => {
    return (
        <div className="bg-background text-foreground">
            <div className="flex items-center justify-between">
                <div className="m-6 mb-0 flex w-1/2 items-center space-x-5">
                    <Search placeholder="Search organisations..." />
                    <LayoutOptions
                        layout={searchParams?.rows ? "rows" : "grid"}
                        className="hidden lg:flex"
                    />
                </div>
                <div className="m-6 mb-0 flex space-x-3">
                    <CreateOrganisationDialog />
                </div>
            </div>

            <main>
                {organisations.length === 0 ? (
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
                                !searchParams?.rows ? "lg:grid-cols-2" : "",
                            )}
                        >
                            {organisations.map(
                                (organisation: OrganisationDisplay) => (
                                    <OrganisationCardDisplay
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
};
