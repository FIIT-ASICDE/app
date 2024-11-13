"use client";

import { User } from "@/types/User";
import { SessionProvider, signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";


import Image from "next/image";
import GithubIcon from "@/components/icons/github";
import GoogleIcon from "@/components/icons/google";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Lock, UserRound } from "lucide-react";


const formSchema = z.object({
    email: z
        .string()
        .min(2, { message: "Username or email must be at least 2 characters" }),
    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters" }),
    keepMeLoggedIn: z.boolean().optional()
});

const HomeComponent = () => {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [keepMeLoggedIn, setKeepMeLoggedIn] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [message, setMessage] = useState("");
    const router = useRouter();
    const [userData, setUserData] = useState<User | null>(null);
    
    const { data: session, status } = useSession();

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [serverErrorMessage, setServerErrorMessage] = useState<string | null>(null);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
            keepMeLoggedIn: false,
        },
    });

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

    /* TODO */
    const forgotPassword = () => {
        console.log("User forgot password")
    }

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
            <div className="flex flex-col gradient-background">
                <main className="container mx-auto my-0 w-3/4 px-10 py-10">
                    <div className="flex h-full overflow-hidden rounded-lg bg-card shadow-lg">
                        <div className="w-1/2 relative">
                            <Image
                                src={"/images/duotone.webp"}
                                alt="Duotone"
                                width={600}
                                height={600}
                                className="h-full w-full object-cover"
                            />
                            <div className="absolute top-4 left-4 bg-transparent">
                                <h1 className="text-secondary text-xl font-bold">> ASICDE</h1>
                            </div>
                        </div>
                        <div className="w-1/2 overflow-y-auto p-8">
                            <div className="mb-10 space-y-2">
                                <h1 className="text-2xl font-bold text-secondary-foreground">
                                    Welcome to ASICDE
                                </h1>
                                <p className="text-gray-500">
                                    Web IDE for ASIC development and collaboration
                                </p>
                            </div>
                            <Form {...form}>
                                <form
                                    onSubmit={handleLogin}
                                    className="space-y-5"
                                >
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Username or email</FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <UserRound className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                                                        <Input
                                                            className="pl-10"
                                                            placeholder="johndoe"
                                                            onChange={(e) => setEmail(e.target.value)}
                                                        />
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Password</FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                                                        <Input
                                                            className="pl-10 pr-10"
                                                            type={showPassword ? "text" : "password"}
                                                            placeholder="********"
                                                            onChange={(e) => setPassword(e.target.value)}
                                                        />
                                                        <Button
                                                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                                            onClick={() => setShowPassword(!showPassword)}
                                                            variant="ghost"
                                                            type="button"
                                                        >
                                                            {showPassword ? (
                                                                <EyeOff className="h-5 w-5 text-muted-foreground" />
                                                            ) : (
                                                                <Eye className="h-5 w-5 text-muted-foreground" />
                                                            )}
                                                            <span className="sr-only">
                                                                {showPassword ? "Hide password" : "Show password"}
                                                            </span>
                                                        </Button>
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </form>
                            </Form>
                            <div className="flex justify-between items-center">
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="keepMeLoggedIn"
                                        checked={keepMeLoggedIn}
                                        onCheckedChange={() => setKeepMeLoggedIn(!keepMeLoggedIn)}
                                    />
                                    <label
                                        htmlFor="keepMeLoggedIn"
                                        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Keep me logged in
                                    </label>
                                </div>
                                <Button 
                                    variant="link"
                                    onClick={() => forgotPassword()}
                                >
                                    Forgot password?
                                </Button>
                            </div>

                            {serverErrorMessage && (
                                <FormMessage>{serverErrorMessage}</FormMessage>
                            )}
                            <Form {...form}>
                                <form
                                    onSubmit={handleLogin}
                                    className="space-y-5"
                                >
                                    <Button
                                        className="w-full bg-primary text-primary-foreground hover:bg-primary-button-hover"
                                        size="lg"
                                        type="submit"
                                        variant="default"
                                        onClick={() => handleLogin}
                                    >
                                        Login
                                    </Button>
                                </form>
                            </Form>
                            <div className="flex items-center justify-center">
                                <div className="flex justify-center text-xs">
                                    <span className="my-5 bg-background px-2 text-muted-foreground">
                                        OR CONTINUE WITH
                                    </span>
                                </div>
                            </div>
                            <div className="mb-5 grid gap-4 sm:grid-cols-2">
                                <Button variant="outline" size="lg">
                                    <GoogleIcon />
                                    Google
                                </Button>
                                <Button variant="outline" size="lg">
                                    <GithubIcon />
                                    GitHub
                                </Button>
                            </div>
                            <div className="text-center text-sm">
                                Don't have an account?{" "}
                                <Button variant="link">Register</Button>
                            </div>
                        </div>
                    </div>
                </main>
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
