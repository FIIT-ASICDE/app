import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronRight, UserRound } from 'lucide-react';
import Image from "next/image";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface HeaderProps {
    type: "logged-in" | "not-logged-in";
    isInOrganisation: boolean;
}

export default function Header({ type, isInOrganisation }: HeaderProps) {
    return (
        <header className="bg-header text-header-foreground">
            <div className="container flex justify-between items-center">
                {!isInOrganisation ? (
                    <div className="flex items-center">
                        <div className="w-8 h-8 bg-header-foreground rounded-md text-header font-bold text-xl flex justify-center items-center">A</div>
                        <p className="font-bold text-xl">ASICDE</p>
                    </div>
                ) : (
                    <div className="flex items-center space-x-2 p-2">
                        <div className="w-8 h-8 bg-header-foreground rounded-md text-header font-bold text-xl flex justify-center items-center">A</div>
                        <p className="font-bold text-xl">ASICDE</p>
                        <ChevronRight className="w-4 h-4 ml-3" />
                        <Link href={"/organisation"}>
                            <Button variant="default" className="text-base font-normal px-6 bg-header-button hover:bg-header-button-hover">
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
                                    <Button variant="default" className="text-base font-normal px-6 bg-header-button hover:bg-header-button-hover">
                                        Home
                                    </Button>
                                </Link>
                            </li>
                            <li className="p-1">
                                <Link href={"/about"}>
                                    <Button variant="default" className="text-base font-normal px-6 bg-header-button hover:bg-header-button-hover">
                                        About Us
                                    </Button>
                                </Link>
                            </li>
                            <li className="p-1">
                                <Link href={"/features"}>
                                    <Button variant="default" className="text-base font-normal px-6 bg-header-button hover:bg-header-button-hover">
                                        Features
                                    </Button>
                                </Link>
                            </li>
                            <li className="p-1">
                                <Link href={"/pricing"}>
                                    <Button variant="default" className="text-base font-normal px-6 bg-header-button hover:bg-header-button-hover">
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
                                    <Button variant="default" className="text-base font-normal px-6 bg-header-button hover:bg-header-button-hover">
                                        Repositories
                                    </Button>
                                </Link>
                            </li>
                            <li className="p-1.5 px-6">

                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <button
                                            className="rounded-full p-1.5 bg-header hover:bg-header-button-hover"
                                        >
                                            <UserRound
                                                size={24}
                                            />
                                        </button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-auto">
                                        <DropdownMenuLabel>Name Surname</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <div>
                                            <button className="pl-3 pr-5 py-2 rounded-full hover:bg-gray-100 flex space-x-5 w-full text-sm">
                                                Profile
                                            </button>
                                            <button className="pl-3 pr-5 py-2 rounded-full hover:bg-gray-100 flex space-x-5 w-full text-sm">
                                                Notifications
                                            </button>
                                            <button className="pl-3 pr-5 py-2 rounded-full hover:bg-gray-100 flex space-x-5 w-full text-sm">
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
    )
}