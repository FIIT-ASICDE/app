import CodePage from "@/app/[userslug]/[repositoryslug]/(repository)/code/code-page";

export default async function RepositoryCodePage({
    params,
}: {
    params: Promise<{ userslug: string; repositoryslug: string }>;
}) {
    const userSlug = (await params).userslug;
    const repositorySlug = (await params).repositoryslug;

    return <CodePage userSlug={userSlug} repositorySlug={repositorySlug} />;
}
