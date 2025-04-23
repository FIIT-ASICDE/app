import { auth } from "@/auth";
import { redirectIfNotOnboarded } from "@/lib/onboarding-guard";

/**
 * Root page that redirects based on user session
 *
 * @returns {Promise<void>}
 */
export default async function RootPage(): Promise<void> {
    const session = await auth();
    await redirectIfNotOnboarded(session);
}
