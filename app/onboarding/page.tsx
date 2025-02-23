import { auth } from "@/auth";
import { redirectIfNotOnboarded } from "@/lib/onboarding-guard";

import { OnboardingForm } from "./onboarding-form";

export default async function OnboardingPage() {
    const session = await auth();
    await redirectIfNotOnboarded(session, "onboarding");

    return (
        <main className="flex min-h-screen items-center justify-center p-4">
            <div className="w-full max-w-md space-y-8">
                <div className="text-center">
                    <h1 className="text-3xl font-bold tracking-tight">
                        Tells us more about you
                    </h1>
                    <p className="mt-2 text-muted-foreground">
                        Please provide some additional information to complete
                        your account
                    </p>
                    <OnboardingForm />
                </div>
            </div>
        </main>
    );
}
