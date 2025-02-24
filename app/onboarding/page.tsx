import { auth } from "@/auth";
import { redirectIfNotOnboarded } from "@/lib/onboarding-guard";
import { BookUser } from "lucide-react";

import { OnboardingForm } from "./onboarding-form";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export default async function OnboardingPage() {
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
