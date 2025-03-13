import React, { ReactNode } from "react";

import Header from "@/components/header/header";
import ProtectedLayout from "@/components/generic/protected-layout";

export default async function AllUsersLayout({
    children,
}: Readonly<{ children: ReactNode }>) {
    return (
        <ProtectedLayout>
            <Header />
            {children}
        </ProtectedLayout>
    );
}
