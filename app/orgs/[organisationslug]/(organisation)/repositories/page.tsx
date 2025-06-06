import RepositoriesPage from "@/app/orgs/[organisationslug]/(organisation)/repositories/repositories-page";
import { api } from "@/lib/trpc/server";
import { PublicRepositoriesFilter } from "@/lib/types/repository";

import { parseBoolean, parseFilterValue } from "@/components/generic/generic";
import type { Metadata } from 'next';

export async function generateMetadata(
    input: { params: Promise<{ organisationslug: string }> }
): Promise<Metadata> {
    const { organisationslug } = await input.params;
    try {
        const org = await api.org.byName(organisationslug);

        return {
            title: `${org.name} | Repositories`,
        };
    } catch {
        return {
            title: "Organisation Not Found",
        };
    }
}

interface OrganisationRepositoriesPageProps {
    params: Promise<{
        organisationslug: string;
    }>;
    searchParams?: Promise<{
        query?: string;
        page?: string;
        rows?: string;
        pinned?: string;
        favorite?: string;
        public?: string;
    }>;
}

export default async function OrganisationRepositoriesPage({
    params,
    searchParams,
}: OrganisationRepositoriesPageProps) {
    const orgSlug = (await params).organisationslug;
    const org = await api.org.byName(orgSlug);

    const reposSearchParams = await searchParams;

    const query: string = reposSearchParams?.query || "";
    const currentPage: number = Number(reposSearchParams?.page) || 1;
    const rows: boolean = parseBoolean(reposSearchParams?.rows) ?? false;

    const publicFilter: PublicRepositoriesFilter = parseFilterValue(
        "public",
        reposSearchParams?.public,
    ) as PublicRepositoriesFilter;

    const pageSize: number = 6;

    const { repositories, pagination } = await api.repo.fetchOrgRepos({
        organizationName: orgSlug,
        nameSearchTerm: query,
        publicFilter:
            reposSearchParams?.public !== undefined
                ? reposSearchParams.public === "true"
                : undefined,
        page: currentPage,
        pageSize: pageSize,
    });

    return (
        <RepositoriesPage
            org={org}
            repos={repositories}
            searchParams={{
                query,
                rows,
                public: publicFilter,
                pagination,
            }}
        />
    );
}
