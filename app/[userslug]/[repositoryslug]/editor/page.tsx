import EditorPage from "@/app/[userslug]/[repositoryslug]/editor/editor-page";
import { api } from "@/lib/trpc/server";
import { Repository } from "@/lib/types/repository";

interface RepositoryEditorPageProps {
    params: Promise<{
        userslug: string;
        repositoryslug: string;
    }>;
}

export default async function RepositoryEditorPage({
    params,
}: RepositoryEditorPageProps) {
    const { userslug, repositoryslug } = await params;

    const repo: Repository = await api.repo.search({
        ownerSlug: userslug,
        repositorySlug: repositoryslug,
        loadItemsDisplaysDepth: -1,
    });

    const lastSimulation = await api.simulation.getLastFinishedSimulation({
        repo
    })

    return <EditorPage repository={repo} lastSimulation={lastSimulation} />;
}
