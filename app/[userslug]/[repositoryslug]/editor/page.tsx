import EditorPage from "@/app/[userslug]/[repositoryslug]/editor/editor-page";
import { api } from "@/lib/trpc/server";
import { Repository } from "@/lib/types/repository";

import type { Metadata } from 'next'

export async function generateMetadata(
    input: { params: Promise<{ userslug: string; repositoryslug: string }> }
): Promise<Metadata> {
    const { userslug, repositoryslug } = await input.params;

    try {
        const profile = await api.user.byUsername({ username: userslug });
        const repository = await api.repo.overview({
            ownerSlug: userslug,
            repositorySlug: repositoryslug,
        });

        return {
            title: `${profile.username} | ${repository.name}`,
        };
    } catch {
        return {
            title: "Repository Not Found",
        };
    }
}

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
        repo,
    });

    return <EditorPage repository={repo} lastSimulation={lastSimulation} />;
}
