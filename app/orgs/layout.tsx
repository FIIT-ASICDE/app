import React, { ReactNode } from "react";

import ProtectedLayout from "@/components/generic/protected-layout";
import Header from "@/components/header/header";

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
