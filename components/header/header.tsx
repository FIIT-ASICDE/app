import { ChevronRight, UserRound } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import LogoIcon from "@/components/icons/logo";

interface HeaderProps {
    type: "logged-in" | "not-logged-in";
    isInOrganisation: boolean;
}

export default function Header({ type, isInOrganisation }: HeaderProps) {
    return (
        <header className="bg-header text-header-foreground">
            <div className="container flex items-center justify-between">
                {!isInOrganisation ? (
                    <div className="flex items-center">
                        <LogoIcon/>
                        <p className="text-xl font-bold">ASICDE</p>
                    </div>
                ) : (
                    <div className="flex items-center space-x-2 p-2">
                        <LogoIcon/>
                        <p className="text-xl font-bold">ASICDE</p>
                        <ChevronRight className="ml-3 h-4 w-4" />
                        <Link href={"/organisation"}>
                            <Button
                                variant="default"
                                className="bg-header-button px-6 text-base font-normal hover:bg-header-button-hover"
                            >
                                Organisation
                            </Button>
                        </Link>
                    </div>
                )}
                {type === "not-logged-in" ? (
                    <nav>
                        <ul className="flex space-x-1">
                            <li className="p-1">
                                <Link href={"/"}>
                                    <Button
                                        variant="default"
                                        className="bg-header-button px-6 text-base font-normal hover:bg-header-button-hover"
                                    >
                                        Home
                                    </Button>
                                </Link>
                            </li>
                            <li className="p-1">
                                <Link href={"/about"}>
                                    <Button
                                        variant="default"
                                        className="bg-header-button px-6 text-base font-normal hover:bg-header-button-hover"
                                    >
                                        About Us
                                    </Button>
                                </Link>
                            </li>
                            <li className="p-1">
                                <Link href={"/features"}>
                                    <Button
                                        variant="default"
                                        className="bg-header-button px-6 text-base font-normal hover:bg-header-button-hover"
                                    >
                                        Features
                                    </Button>
                                </Link>
                            </li>
                            <li className="p-1">
                                <Link href={"/pricing"}>
                                    <Button
                                        variant="default"
                                        className="bg-header-button px-6 text-base font-normal hover:bg-header-button-hover"
                                    >
                                        Pricing
                                    </Button>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                ) : (
                    <nav>
                        <ul className="flex space-x-1">
                            <li className="p-1">
                                <Link href={"/repositories"}>
                                    <Button
                                        variant="default"
                                        className="bg-header-button px-6 text-base font-normal hover:bg-header-button-hover"
                                    >
                                        Repositories
                                    </Button>
                                </Link>
                            </li>
                            <li className="p-1.5 px-6">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <button className="rounded-full bg-header p-1.5 hover:bg-header-button-hover">
                                            <UserRound size={24} />
                                        </button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-auto">
                                        <DropdownMenuLabel>
                                            Name Surname
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <div>
                                            <button className="flex w-full space-x-5 rounded-full py-2 pl-3 pr-5 text-sm hover:bg-gray-100">
                                                Profile
                                            </button>
                                            <button className="flex w-full space-x-5 rounded-full py-2 pl-3 pr-5 text-sm hover:bg-gray-100">
                                                Notifications
                                            </button>
                                            <button className="flex w-full space-x-5 rounded-full py-2 pl-3 pr-5 text-sm hover:bg-gray-100">
                                                Sign out
                                            </button>
                                        </div>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </li>
                        </ul>
                    </nav>
                )}
            </div>
        </header>
    );
}
