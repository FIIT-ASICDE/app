import { auth } from "@/auth";
import { redirectIfNotOnboarded } from "@/lib/onboarding-guard";
import React from "react";

import ProtectedLayout from "@/components/generic/protected-layout";

export default async function UserLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    const session = await auth();
    await redirectIfNotOnboarded(session, "home");
    return <ProtectedLayout>{children}</ProtectedLayout>;
}
