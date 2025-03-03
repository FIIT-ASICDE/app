import { api } from "@/lib/trpc/server";

import CodePage from "../code-page";

export default async function RepoSubDirectoryPage({
    params,
}: {
    params: Promise<{
        userslug: string;
        repositoryslug: string;
        subpath: string[];
    }>;
}) {
    const { userslug, repositoryslug, subpath } = await params;
    const repoSubDir = await api.repo.loadRepoItem({
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
