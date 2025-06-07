import OverviewPage from "@/app/orgs/[organisationslug]/(organisation)/overview-page";
import { api } from "@/lib/trpc/server";
import { OrganisationOverview } from "@/lib/types/organisation";
import type { Metadata } from 'next';

export async function generateMetadata(
    input: { params: Promise<{ organisationslug: string }> }
): Promise<Metadata> {
    const { organisationslug } = await input.params;
    const orgSlug = organisationslug.replace(/%20/g, " ");

    try {
        const orgOverview = await api.org.overview(orgSlug);

        return {
            title: `${orgOverview.organisation.name} | Overview`,
        };
    } catch {
        return {
            title: "Organisation Not Found",
        };
    }
}


export default async function OrganisationHome({
    params,
}: {
    params: Promise<{ organisationslug: string }>;
}) {
    const orgSlug = (await params).organisationslug.replace(/%20/g, " ");
    try {
        const orgOverview: OrganisationOverview =
            await api.org.overview(orgSlug);
        return <OverviewPage overview={orgOverview} />;
    } catch (e) {
        console.error("unknown error", e);
        return <></>;
    }
}
