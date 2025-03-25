import { auth } from "@/auth";
import { redirectIfNotOnboarded } from "@/lib/onboarding-guard";

export default async function Page() {
    const session = await auth();
    await redirectIfNotOnboarded(session);
}
