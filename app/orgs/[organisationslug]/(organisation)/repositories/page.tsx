import RepositoriesPage from "@/app/orgs/[organisationslug]/(organisation)/repositories/repositories-page";
import { api } from "@/lib/trpc/server";

export default async function OrganisationRepositoriesPage({
    params,
}: {
    params: Promise<{ organisationslug: string }>;
}) {
    const orgSlug = (await params).organisationslug.replace(/%20/g, " ");
    const orgsRepos = await api.repo.ownersRepos({ ownerSlug: orgSlug });
    const org = await api.org.byName(orgSlug);

    return <RepositoriesPage org={org} repos={orgsRepos} />;
}
