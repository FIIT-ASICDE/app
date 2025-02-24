import OrganisationsPage from "@/app/[userslug]/(profile)/organisations/organisations-page";
import { api } from "@/lib/trpc/server";

export default async function UserOrganisationsPage({
    params,
}: {
    params: Promise<{ userslug: string }>;
}) {
    const userSlug = (await params).userslug;
    const usersOrganisations = await api.user.usersOrganisations({ username: userSlug });

    return <OrganisationsPage usersOrganisations={usersOrganisations} />;
}
