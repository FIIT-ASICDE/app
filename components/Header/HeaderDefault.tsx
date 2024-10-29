import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function HeaderDefault() {
    return (
        <header className="bg-header p-1 text-primary-foreground">
            <div className="container mx-auto flex items-center justify-between pr-5">
                <div className="flex items-center space-x-2 p-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-header-foreground">
                        <span className="text-xl font-bold text-header">
                            A
                        </span>
                    </div>
                    <span className="text-xl font-bold">ASICDE</span>
                </div>
                <nav>
                    <ul className="flex space-x-1">
                        <li className="p-1">
                            <Link href={"/"}>
                                <Button
                                    variant="default"
                                    className="bg-header px-6 text-base font-normal hover:bg-header-button-hover"
                                >
                                    Home
                                </Button>
                            </Link>
                        </li>
                        <li className="p-1">
                            <Link href={"/about"}>
                                <Button
                                    variant="default"
                                    className="bg-header px-6 text-base font-normal hover:bg-header-button-hover"
                                >
                                    About Us
                                </Button>
                            </Link>
                        </li>
                        <li className="p-1">
                            <Link href={"/features"}>
                                <Button
                                    variant="default"
                                    className="bg-header px-6 text-base font-normal hover:bg-header-button-hover"
                                >
                                    Features
                                </Button>
                            </Link>
                        </li>
                        <li className="p-1">
                            <Link href={"/pricing"}>
                                <Button
                                    variant="default"
                                    className="bg-header px-6 text-base font-normal hover:bg-header-button-hover"
                                >
                                    Pricing
                                </Button>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}
