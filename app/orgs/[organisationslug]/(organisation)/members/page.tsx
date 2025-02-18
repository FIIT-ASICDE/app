import MembersPage from "@/app/orgs/[organisationslug]/(organisation)/members/members-page";

export default async function OrganisationMembersPage({
    params,
}: {
    params: Promise<{ userslug: string }>;
}) {
    const userSlug = (await params).userslug;

    return <MembersPage userSlug={userSlug} />;
}
