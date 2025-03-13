import React, { ReactNode } from "react";

import Header from "@/components/header/header";
import ProtectedLayout from "@/components/generic/protected-layout";

export default async function AllOrganisationsLayout({
    children,
}: Readonly<{ children: ReactNode }>) {
    return (
        <ProtectedLayout>
            <Header />
            {children}
        </ProtectedLayout>
    );
}
