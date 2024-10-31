"use client";

import { User } from "@/types/User";
import { SessionProvider, signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const HomeComponent = () => {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [message, setMessage] = useState("");
    const router = useRouter();
    const [userData, setUserData] = useState<User | null>(null);

    const { data: session, status } = useSession();

    /* Funkcia pre handling loginu, po logine refreshne tu istu domovsku stranku */
    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const result = await signIn("credentials", {
            redirect: false,
            email,
            password,
        });

        if (result?.error) {
            setMessage("Invalid credentials");
            setIsModalOpen(true);
        } else {
            router.push("/");
        }
    };

    /* TODO - zatial pre priklad len fetchovanie users data,
        neskor ked budu endpointy sa pridaju aj dalsie potrebne data pre userovu home page */
    const fetchUserData = async () => {
        if (session) {
            const response = await fetch(`/api/users/${session?.user?.id}`);
            if (response.ok) {
                const data = await response.json();
                setUserData(data);
            } else {
                console.error("Failed to fetch user data");
            }
        }
    };

    /* Dáta sa fetchnú len ak je autorizovaná session */
    useEffect(() => {
        fetchUserData();
    }, [session]);

    const closeModal = () => {
        setIsModalOpen(false);
    };

    /* Tuto treba nejaké kolečko počas autorizacia a fetchovania dát */
    if (status === "loading") {
        return <div>Loading...</div>;
    }

    if (session) {
        /* TODO - ak je session autorizovana zobrazi sa home page pre prihlaseneho usera */
        return (
            <div>
                <h1>Welcome, {session.user?.name}!</h1>
                <button
                    onClick={() => signOut()}
                    className="mt-4 rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                >
                    Sign Out
                </button>
                {userData && (
                    <div>
                        <h2>User Details:</h2>
                        <p>Email: {userData.email}</p>
                        <p>Name: {userData.name}</p>
                    </div>
                )}
            </div>
        );
    } else {
        /* TODO - ak session nie je autorizovana zobrazi sa klasicka landing page
         *   kde budemat user moznost sa prihlasit */
        return (
            <div className="flex h-screen w-screen items-center justify-center space-x-10 bg-gray-100">
                <form
                    onSubmit={handleLogin}
                    className="w-80 rounded bg-white p-6 shadow-md"
                >
                    <h2 className="mb-4 text-2xl font-semibold">Login</h2>
                    {isModalOpen && (
                        <p className="mb-4 text-red-500">{message}</p>
                    )}{" "}
                    {/* Zobrazovanie chybových správ */}
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="mt-1 w-full rounded border border-gray-300 p-2"
                        />
                    </div>
                    <div className="mb-6">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="mt-1 w-full rounded border border-gray-300 p-2"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                    >
                        Login
                    </button>
                </form>

                {/* Modal pre neúspešný login */}
                {isModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="rounded bg-white p-6 shadow-lg">
                            <h2 className="mb-2 text-lg font-bold">
                                {message}
                            </h2>
                            <button
                                className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
                                onClick={closeModal}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </div>
        );
    }
};

export default function Home() {
    return (
        /* Kazda page ktora musi byt zobrazena az po autorizacii
         * musi byt v elemente SessionProvider */
        <SessionProvider>
            <HomeComponent />
        </SessionProvider>
    );
}
