import { api } from "@/lib/trpc/server";
import OverviewPage from "@/app/[userslug]/[repositoryslug]/(repository)/overview-page";

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
    const repo = await api.repo.overview({
        ownerSlug: userslug,
        repositorySlug: repositoryslug,
    });

    return <OverviewPage repository={repo} />;
};
