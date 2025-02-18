import OverviewPage from "@/app/orgs/[organisationslug]/(organisation)/overview-page";
import { api } from "@/lib/trpc/server";

export default async function OrganisationHome({
    params,
}: {
    params: Promise<{ organisationslug: string }>;
}) {
    const orgSlug = (await params).organisationslug.replace(/%20/g, " ");
    try {
        const orgOverview = await api.org.overview(orgSlug);
        return <OverviewPage overview={orgOverview} />;
    } catch (e) {
        console.error("unkown error", e);
        return <></>;
    }
}
