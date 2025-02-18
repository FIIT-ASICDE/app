import OrganisationsPage from "@/app/[userslug]/(profile)/organisations/organisations-page";

export default async function UserOrganisationsPage({
    params,
}: {
    params: Promise<{ userslug: string }>;
}) {
    const userSlug = (await params).userslug;

    return <OrganisationsPage userSlug={userSlug} />;
}
