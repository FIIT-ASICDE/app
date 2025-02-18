import { auth } from "@/auth";
import { RedirectType, redirect } from "next/navigation";

export default async function Page() {
    const session = await auth();

    if (session) {
        redirect("/" + session.user.username, RedirectType.replace);
    } else {
        redirect("/login", RedirectType.replace);
    }
}
