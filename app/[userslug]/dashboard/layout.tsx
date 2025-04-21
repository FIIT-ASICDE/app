import { TRPCError } from "@trpc/server";
import React, { ReactElement } from "react";

import Header from "@/components/header/header";

interface DashboardLayoutProps {
    children: React.ReactNode;
    params: Promise<{ userslug: string }>;
}

/**
 * Layout for user dashboard
 *
 * @param {DashboardLayoutProps} props - Component props
 * @returns {Promise<ReactElement>} User dashboard layout component
 */
export default async function DashboardLayout({
    children,
}: DashboardLayoutProps): Promise<ReactElement> {
    try {
        return (
            <>
                <Header />
                {children}
            </>
        );
    } catch (e) {
        if (e instanceof TRPCError) {
            if (e.code === "NOT_FOUND") {
                return (
                    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
                        <h2 className="text-2xl font-bold">User Not Found</h2>
                        <p className="text-muted-foreground">
                            The user you're looking for doesn't exist.
                        </p>
                    </div>
                );
            }
        }
        console.error("unknown error", e);
        throw e;
    }
}
