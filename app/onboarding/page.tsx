import { OnboardingForm } from "@/app/onboarding/onboarding-form";
import { auth } from "@/auth";
import { redirectIfNotOnboarded } from "@/lib/onboarding-guard";
import { BookUser } from "lucide-react";
import { ReactElement } from "react";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import type { Metadata } from "next";

export const metadata: Metadata = {
    title: 'ASICDE',
}

/**
 * Onboarding page for a user
 *
 * @returns {Promise<ReactElement>} Onboarding page component
 */
export default async function OnboardingPage(): Promise<ReactElement> {
    const session = await auth();
    await redirectIfNotOnboarded(session, "onboarding");

    return (
        <main className="flex min-h-screen items-center justify-center p-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="flex flex-row items-center justify-center gap-x-3 text-center text-3xl font-bold tracking-tight">
                        <BookUser />
                        Tell us more about you
                    </CardTitle>
                    <CardDescription className="text-center">
                        Please provide some additional information to complete
                        your account.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <OnboardingForm />
                </CardContent>
            </Card>
        </main>
    );
}
