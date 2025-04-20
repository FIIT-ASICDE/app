import { auth } from "@/auth";
import { redirectIfNotOnboarded } from "@/lib/onboarding-guard";
import React, { ReactElement } from "react";

import ProtectedLayout from "@/components/generic/protected-layout";

interface UserLayoutProps {
    children: React.ReactNode;
}

/**
 * Layout for a user
 *
 * @param {UserLayoutProps} props - Component props
 * @returns {Promise<ReactElement>} User profile layout component
 */
export default async function UserLayout({
    children,
}: UserLayoutProps): Promise<ReactElement> {
    const session = await auth();
    await redirectIfNotOnboarded(session, "home");
    return (
        <ProtectedLayout>
            {children}
        </ProtectedLayout>
    );
};
