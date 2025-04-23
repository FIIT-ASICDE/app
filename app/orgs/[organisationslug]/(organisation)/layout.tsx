import { api } from "@/lib/trpc/server";
import { TRPCError } from "@trpc/server";
import { UserRoundX } from "lucide-react";
import React, { ReactElement } from "react";

import { OrganisationHeader } from "@/components/organisations/organisation-header";
import { Separator } from "@/components/ui/separator";

interface OrganisationLayoutProps {
    children: React.ReactNode;
    params: Promise<{ organisationslug: string }>;
}

/**
 * Layout for organisation profile
 *
 * @param {OrganisationLayoutProps} props - Component props
 * @returns {Promise<ReactElement>} Organisation profile layout component
 */
export default async function OrganisationLayout({
    children,
    params,
}: OrganisationLayoutProps): Promise<ReactElement> {
    const orgSlug = (await params).organisationslug.replace(/%20/g, " ");
    try {
        const org = await api.org.byName(orgSlug);
        return (
            <>
                <OrganisationHeader organisation={org} />
                <Separator className="mx-6 w-auto border-accent" />
                {children}
            </>
        );
    } catch (e) {
        if (e instanceof TRPCError) {
            if (e.code === "NOT_FOUND") {
                return (
                    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
                        <UserRoundX className="h-12 w-12 text-muted-foreground" />
                        <h2 className="text-2xl font-bold">
                            Organisation Not Found
                        </h2>
                        <p className="text-muted-foreground">
                            {
                                "The organisation you're looking for doesn't exist."
                            }
                        </p>
                    </div>
                );
            }
        }
        console.error("unknown error", e);
        throw e;
    }
}
