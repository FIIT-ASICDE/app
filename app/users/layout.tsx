import React, { ReactElement, ReactNode } from "react";

import ProtectedLayout from "@/components/generic/protected-layout";
import Header from "@/components/header/header";

interface AllUsersLayoutProps {
    children: ReactNode;
}

/**
 * Layout for all users
 *
 * @param {AllUsersLayoutProps} props - Component props
 * @returns {Promise<ReactElement>} All users layout component
 */
export default async function AllUsersLayout({
    children,
}: AllUsersLayoutProps): Promise<ReactElement> {
    return (
        <ProtectedLayout>
            <Header />
            {children}
        </ProtectedLayout>
    );
}
