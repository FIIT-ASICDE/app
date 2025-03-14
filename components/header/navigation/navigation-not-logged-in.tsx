import Link from "next/link";

import { Button } from "@/components/ui/button";

export const NavigationNotLoggedIn = () => {
    return (
        <nav className="absolute right-0 mr-2 flex flex-row items-center gap-2">
            <Link href={"/public"}>
                <Button
                    variant="default"
                    className="bg-header-button px-6 text-base font-normal hover:bg-header-button-hover"
                >
                    Home
                </Button>
            </Link>
            <Link href={"/about"}>
                <Button
                    variant="default"
                    className="bg-header-button px-6 text-base font-normal hover:bg-header-button-hover"
                >
                    About Us
                </Button>
            </Link>
            <Link href={"/features"}>
                <Button
                    variant="default"
                    className="bg-header-button px-6 text-base font-normal hover:bg-header-button-hover"
                >
                    Features
                </Button>
            </Link>
            <Link href={"/pricing"}>
                <Button
                    variant="default"
                    className="mr-2 bg-header-button px-6 text-base font-normal hover:bg-header-button-hover"
                >
                    Pricing
                </Button>
            </Link>
        </nav>
    );
};
