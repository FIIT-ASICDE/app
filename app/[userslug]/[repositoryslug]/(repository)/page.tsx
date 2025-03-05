import OverviewPage from "@/app/[userslug]/[repositoryslug]/(repository)/overview-page";
import { api } from "@/lib/trpc/server";

interface RepositoryHomeProps {
    params: Promise<{
        userslug: string;
        repositoryslug: string;
    }>;
}

export default async function RepositoryHome({ params }: RepositoryHomeProps) {
    const { userslug, repositoryslug } = await params;

    // Don't have to try catch if the search fails, because in the layout.tsx
    // there is a check and if it would fail this wouldn't have run
    const repo = await api.repo.search({
        ownerSlug: userslug,
        repositorySlug: repositoryslug,
    });

    const languageStatistics = {
        percentages: [
            {
                language: "typescript",
                loc: 5200,
                percentage: 40.62,
            },
            {
                language: "javascript",
                loc: 3800,
                percentage: 29.69,
            },
            {
                language: "python",
                loc: 1500,
                percentage: 11.72,
            },
            {
                language: "html",
                loc: 950,
                percentage: 7.42,
            },
            {
                language: "css",
                loc: 750,
                percentage: 5.86,
            },
            {
                language: "json",
                loc: 400,
                percentage: 3.13,
            },
            {
                language: "markdown",
                loc: 200,
                percentage: 1.56,
            },
        ],
        totalLoc: 12800,
    };

    return (
        <OverviewPage
            repository={repo}
            languageStatistics={languageStatistics}
        />
    );
}
