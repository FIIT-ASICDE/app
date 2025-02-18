"use client";

import { api } from "@/lib/trpc/react";

import { OrganisationCardDisplay } from "@/components/profile/organisation-card-display";

export default function OrganizationsPage() {
    const pageSize = 20;

    const orgs = api.org.search.useQuery({
        searchTerm: "",
        page: 0,
        pageSize,
    });

    // TODO kili organisations add pagination and search.
    return (
        <main className="container mx-auto px-4 py-10">
            <h1 className="mb-8 text-center text-3xl font-bold">
                Organizations
            </h1>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {orgs.data?.organizations.map((org) => (
                    <OrganisationCardDisplay
                        key={org.id}
                        id={org.id}
                        name={org.name}
                        image={org.image}
                        role={org.userRole}
                        memberCount={org.memberCount}
                    />
                ))}
            </div>
        </main>
    );
}
