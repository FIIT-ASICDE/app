import React from "react";

import ProtectedLayout from "@/components/protected-layout/protected-layout";

export default async function Layout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return <ProtectedLayout>{children}</ProtectedLayout>;
}
