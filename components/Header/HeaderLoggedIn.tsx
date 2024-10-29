import Image from "next/image";
import Link from "next/link";

import { Button } from "../../ui/button";

export default function HeaderLoggedIn() {
    return (
        <header className="bg-gray-800 p-1 text-white">
            <div className="container mx-auto flex items-center justify-between pr-0">
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
                            <Link href={"/classrooms"}>
                                <Button
                                    variant="default"
                                    className="bg-gray-800 px-6 text-base font-normal hover:bg-gray-700"
                                >
                                    Classrooms
                                </Button>
                            </Link>
                        </li>
                        <li className="p-1">
                            <Link href={"/repositories"}>
                                <Button
                                    variant="default"
                                    className="bg-gray-800 px-6 text-base font-normal hover:bg-gray-700"
                                >
                                    Repositories
                                </Button>
                            </Link>
                        </li>
                        <li className="p-1.5 px-6">
                            <Link href={"/profile"}>
                                <button className="rounded-full bg-white p-1.5 hover:bg-gray-400">
                                    <Image
                                        src={"/icons/UserIcon.webp"}
                                        alt="User Icon"
                                        width={24}
                                        height={24}
                                        className="object-cover"
                                    />
                                </button>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}
