import CodePage from "@/app/[userslug]/[repositoryslug]/(repository)/code/code-page";
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
    } catch (e) {
        return {
            title: "Repository Not Found",
        };
    }
}

interface RepositoryCodePageProps {
    params: Promise<{
        userslug: string;
        repositoryslug: string;
    }>;
}

export default async function RepositoryCodePage({
    params,
}: RepositoryCodePageProps) {
    const { userslug, repositoryslug } = await params;

    // Don't have to try catch if the search fails, because in the layout.tsx
    // there is a check and if it would fail this wouldn't have run
    const repo: Repository = await api.repo.search({
        ownerSlug: userslug,
        repositorySlug: repositoryslug,
    });

    return (
        <CodePage
            subPath=""
            repositoryOwnerName={userslug}
            repositoryName={repositoryslug}
            tree={repo.tree ?? []}
        />
    );
}
