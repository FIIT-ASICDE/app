import MembersPage from "@/app/orgs/[organisationslug]/(organisation)/members/members-page";

export default async function OrganisationMembersPage(
    {
        params,
    } : {
        params: Promise<{ orgslug: string }>;
}) {
    const orgSlug = (await params).orgslug;

    return <MembersPage orgSlug={orgSlug} />;
}
