import { api } from "@/lib/trpc/server";
import { TRPCError } from "@trpc/server";
import React from "react";

import Header from "@/components/header/header";
import { RepositoryHeader } from "@/components/repositories/repository-header";
import { Separator } from "@/components/ui/separator";

export default async function RepositoryLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ userslug: string; repositoryslug: string }>;
}) {
    const { userslug, repositoryslug } = await params;

    try {
        const repo = await api.repo.search({
            ownerSlug: userslug,
            repositorySlug: repositoryslug,
        });

        return (
            <>
                <Header />
                <RepositoryHeader
                    repository={repo}
                    canEdit={
                        repo.userRole === "ADMIN" || repo.userRole === "OWNER"
                    }
                />
                <Separator className="mx-6 w-auto border-accent" />
                {children}
            </>
        );
    } catch (e) {
        if (e instanceof TRPCError) {
            if (e.code === "NOT_FOUND") {
                return (
                    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
                        <h2 className="text-2xl font-bold">
                            Repository Not Found
                        </h2>
                        <p className="text-muted-foreground">
                            {"The repository you're looking for doesn't exist."}
                        </p>
                    </div>
                );
            }
        }
        console.error("unknown error", e);
        throw e;
    }
}
