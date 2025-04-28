import { auth } from "@/auth";
import { HydrateClient, api } from "@/lib/trpc/server";
import { RedirectType, redirect } from "next/navigation";
import React, { ReactElement } from "react";

import { UserProvider } from "@/components/context/user-context";

interface ProtectedLayoutProps {
    children: React.ReactNode;
}

/**
 * layout component that lets only a logged-in user continue
 *
 * @param {ProtectedLayoutProps} props - Component props
 * @returns {Promise<ReactElement>} No data component
 */
export default async function ProtectedLayout({
    children,
}: ProtectedLayoutProps): Promise<ReactElement> {
    const session = await auth();

    if (!session || !session.user || !session.user.id) {
        redirect("/login", RedirectType.replace);
    }

    // a bug when Next does not have access to auth headers during SSR, so the first call
    // fails with unauthorized, but if I prefetch it then it is solved. Today it
    // might be solved, look here:
    // https://github.com/trpc/trpc/issues/3297
    // https://github.com/t3-oss/create-t3-app/issues/1765
    api.user.byId.prefetch(session.user.id);
    return (
        <HydrateClient>
            <UserProvider userId={session.user.id}>{children}</UserProvider>
        </HydrateClient>
    );
}
