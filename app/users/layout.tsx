import React, { ReactNode } from "react";

import ProtectedLayout from "@/components/generic/protected-layout";
import Header from "@/components/header/header";

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
