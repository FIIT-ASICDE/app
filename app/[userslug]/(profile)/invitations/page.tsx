import InvitationsPage from "@/app/[userslug]/(profile)/invitations/invitations-page";

export default async function UserInvitationsPage({ params, }: { params: Promise<{ userslug: string }>; }) {
    const userSlug = (await params).userslug;

    return <InvitationsPage userSlug={userSlug} />;
}
