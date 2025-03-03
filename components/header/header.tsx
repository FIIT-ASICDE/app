import { auth } from "@/auth";
import { api } from "@/lib/trpc/server";
import Link from "next/link";

import { CommandBar } from "@/components/header/header-command";
import { NavigationLoggedIn } from "@/components/header/navigation-logged-in";
import LogoIcon from "@/components/icons/logo";

export default async function Header() {
    const session = await auth();

    const user = session ? await api.user.byId(session.user.id) : undefined;
    if (!user || user?.type === "non-onboarded") {
        return <></>;
    }

    return (
        <div>
            {session && (
                <header className="bg-header text-header-foreground">
                    <div className="relative flex h-14 items-center justify-between">
                        <div className="absolute left-0 ml-2 items-center">
                            <Link
                                href={"/"}
                                className="flex h-[40px] items-center space-x-2 rounded-md px-2 hover:bg-header-button-hover"
                            >
                                <LogoIcon />
                                <p className="text-xl font-bold">ASICDE</p>
                            </Link>
                        </div>
                        <CommandBar user={user} />
                        <NavigationLoggedIn user={user} />
                    </div>
                </header>
            )}
        </div>
    );
}
