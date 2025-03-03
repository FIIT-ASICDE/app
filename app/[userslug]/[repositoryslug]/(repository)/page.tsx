import OverviewPage from "@/app/[userslug]/[repositoryslug]/(repository)/overview-page";
import { api } from "@/lib/trpc/server";

export default async function RepositoryHome({
    params,
}: {
    params: Promise<{ userslug: string; repositoryslug: string }>;
}) {
    const { userslug, repositoryslug } = await params;

    // Don't have to try catch if the search fails, because in the layout.tsx
    // there is a check and if it would fail this wouldn't have run
    const repo = await api.repo.search({
        ownerSlug: userslug,
        repositorySlug: repositoryslug,
    });

    return <OverviewPage repository={repo} />;
}
