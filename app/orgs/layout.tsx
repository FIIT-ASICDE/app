import React, { ReactElement, ReactNode } from "react";

import ProtectedLayout from "@/components/generic/protected-layout";
import Header from "@/components/header/header";

interface AllOrganisationsLayoutProps {
    children: ReactNode;
}

/**
 * Layout for all organisations page
 *
 * @param {AllOrganisationsLayoutProps} props - Component props
 * @returns {Promise<ReactElement>} User profile layout component
 */
export default async function AllOrganisationsLayout({
    children,
}: AllOrganisationsLayoutProps): Promise<ReactElement> {
    return (
        <ProtectedLayout>
            <Header />
            {children}
        </ProtectedLayout>
    );
}
