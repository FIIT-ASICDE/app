import CodePage from "@/app/[userslug]/[repositoryslug]/(repository)/code/code-page";
import { api } from "@/lib/trpc/server";
import { RepositoryItem } from "@/lib/types/repository";
import { ReactElement } from "react";

interface RepoSubDirectoryPageProps {
    params: Promise<{
        userslug: string;
        repositoryslug: string;
        subpath: Array<string>;
    }>;
}

/**
 * Repository subpath page for code page
 *
 * @param {RepoSubDirectoryPageProps} props - Component props
 * @returns {Promise<ReactElement>} Repository subpath page component
 */
export default async function RepoSubDirectoryPage({
    params,
}: RepoSubDirectoryPageProps): Promise<ReactElement> {
    const { userslug, repositoryslug, subpath } = await params;
    const repoSubDir: RepositoryItem = await api.repo.loadRepoItem({
        path: subpath.join("/"),
        ownerSlug: userslug,
        repositorySlug: repositoryslug,
    });

    if (repoSubDir.type !== "directory") {
        throw new Error("directory wasn't loaded");
    }

    return (
        <CodePage
            subPath={subpath.join("/")}
            repositoryName={repositoryslug}
            repositoryOwnerName={userslug}
            tree={repoSubDir.children}
        />
    );
}
