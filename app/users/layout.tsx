import { ReactNode } from "react";

import ProtectedLayout from "@/components/protected-layout/protected-layout";

export default async function AllUsersLayout({
    children,
}: Readonly<{ children: ReactNode }>) {
    return <ProtectedLayout>{children}</ProtectedLayout>;
}
