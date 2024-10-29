import Link from "next/link";

import { Button } from "../../ui/button";

export default function HeaderDefault() {
    return (
        <header className="bg-gray-800 p-1 text-white">
            <div className="container mx-auto flex items-center justify-between pr-5">
                <div className="flex items-center space-x-2 p-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-white">
                        <span className="text-xl font-bold text-gray-800">
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
                                    className="bg-gray-800 px-6 text-base font-normal hover:bg-gray-700"
                                >
                                    Home
                                </Button>
                            </Link>
                        </li>
                        <li className="p-1">
                            <Link href={"/about"}>
                                <Button
                                    variant="default"
                                    className="bg-gray-800 px-6 text-base font-normal hover:bg-gray-700"
                                >
                                    About Us
                                </Button>
                            </Link>
                        </li>
                        <li className="p-1">
                            <Link href={"/features"}>
                                <Button
                                    variant="default"
                                    className="bg-gray-800 px-6 text-base font-normal hover:bg-gray-700"
                                >
                                    Features
                                </Button>
                            </Link>
                        </li>
                        <li className="p-1">
                            <Link href={"/pricing"}>
                                <Button
                                    variant="default"
                                    className="bg-gray-800 px-6 text-base font-normal hover:bg-gray-700"
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
