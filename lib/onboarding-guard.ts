import { Session } from "next-auth";
import { RedirectType, redirect } from "next/navigation";

import { api } from "./trpc/server";

export async function redirectIfNotOnboarded(
    session: Session | null,
	currentPage?: "onboarding" | "login" | "home",
) {
    if (session) {
        const user = await api.user.byId(session.user.id);
        if (!user) {
            redirect("/login", RedirectType.replace);
        } else if (user.type === "onboarded" && currentPage !== 'home') {
            redirect("/" + user.username, RedirectType.replace);
        } else if (user.type === "non-onboarded" && currentPage !== "onboarding") {
            redirect("/onboarding", RedirectType.replace);
        }
    } else if (currentPage !== 'login') {
        redirect("/login", RedirectType.replace);
    }
}
