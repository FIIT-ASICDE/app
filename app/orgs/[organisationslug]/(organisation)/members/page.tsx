import MembersPage from "@/app/orgs/[organisationslug]/(organisation)/members/members-page";

export default async function OrganisationMembersPage({
    params,
}: {
    params: Promise<{ organisationslug: string }>;
}) {
    const orgSlug = (await params).organisationslug;

    return <MembersPage orgSlug={orgSlug} />;
}
