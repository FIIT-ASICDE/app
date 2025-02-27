import { OrganisationDisplay } from "@/lib/types/organisation";
import { cn } from "@/lib/utils";
import { Building } from "lucide-react";

import { DynamicPagination } from "@/components/dynamic-pagination/dynamic-pagination";
import { LayoutOptions } from "@/components/layout/layout-options";
import { NoData } from "@/components/no-data/no-data";
import { CreateOrganisationDialog } from "@/components/organisations/create-organisation-dialog";
import { OrganisationCard } from "@/components/organisations/organisation-card";
import Search from "@/components/ui/search";

interface OrganisationsPageProps {
    usersOrganisations: Array<OrganisationDisplay>;
    searchParams: {
        query: string;
        currentPage: number;
        rows: boolean;
    };
}

export default function OrganisationsPage({
    usersOrganisations,
    searchParams,
}: OrganisationsPageProps) {
    const pageSize: number = 6;

    // TODO: move org filters to server side
    /*const [roleFilter, setRoleFilter] = useState<RoleOrganisationFilter>("all");
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
    }, [organisationSearchPhrase, roleFilter, memberCountSort, organisations]);*/

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
                    />*/}
                    <CreateOrganisationDialog />
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
