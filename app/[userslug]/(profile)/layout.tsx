import { auth } from "@/auth";
import { api } from "@/lib/trpc/server";
import { TRPCError } from "@trpc/server";
import React from "react";

import Header from "@/components/header/header";
import { ProfileHeader } from "@/components/profile/profile-header";
import { Separator } from "@/components/ui/separator";

export default async function ProfileLayout({
    children,
    params,
}: Readonly<{
    children: React.ReactNode;
    params: Promise<{ userslug: string }>;
}>) {
    const session = await auth();
    const userSlug = (await params).userslug;
    try {
        const profile = await api.user.byUsername({ username: userSlug });
        return (
            <>
                <Header />
                <ProfileHeader
                    isItMe={session?.user.id === profile.id}
                    profile={profile}
                />
                <Separator className="mx-6 w-auto border-accent" />
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
                            {"The user you're looking for doesn't exist."}
                        </p>
                    </div>
                );
            }
        }
        console.error("unknown error", e);
        throw e;
    }
}
