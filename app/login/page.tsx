"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Lock, UserRound } from "lucide-react";
import { SessionProvider, signIn, useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

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

const formSchema = z.object({
    email: z.string(),
    password: z.string(),
    keepMeLoggedIn: z.boolean().optional(),
});

function LoginPage() {
    const { data: session } = useSession();
    const [keepMeLoggedIn, setKeepMeLoggedIn] = useState(false);
    const router = useRouter();
    const { theme } = useTheme();

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [serverErrorMessage, setServerErrorMessage] = useState<string | null>(
        null,
    );

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
            keepMeLoggedIn: false,
        },
    });

    useEffect(() => {
        if (session) {
            router.replace("/" + session?.user.username);
            router.refresh();
        }
    }, [session, router]);

    const handleLogin = async (values: z.infer<typeof formSchema>) => {
        const result = await signIn("credentials", {
            redirect: false,
            email: values.email,
            password: values.password,
        });

        if (result?.error) {
            setServerErrorMessage("Invalid credentials");
        }
    };

    return (
        <div className="flex flex-col bg-background">
            <main className="px-auto container mx-auto my-0 w-3/4 py-10">
                <div className="flex h-full overflow-hidden rounded-lg bg-card shadow-lg">
                    <div className="relative w-1/2">
                        <Image
                            src={
                                theme === "light"
                                    ? "/images/duotone.webp"
                                    : "/images/duotone-dark-v2.webp"
                            }
                            alt="Duotone"
                            width={600}
                            height={600}
                            className="h-full w-full object-cover"
                        />
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
                                onSubmit={form.handleSubmit(handleLogin)}
                                className="space-y-5"
                            >
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Username or email
                                            </FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <UserRound className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                                                    <Input
                                                        className="pl-10"
                                                        placeholder="johndoe"
                                                        {...field}
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
                                                        type={
                                                            showPassword
                                                                ? "text"
                                                                : "password"
                                                        }
                                                        placeholder="********"
                                                        {...field}
                                                    />
                                                    <Button
                                                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                                        onClick={() =>
                                                            setShowPassword(
                                                                !showPassword,
                                                            )
                                                        }
                                                        variant="ghost"
                                                        type="button"
                                                    >
                                                        {showPassword ? (
                                                            <EyeOff className="h-5 w-5 text-muted-foreground" />
                                                        ) : (
                                                            <Eye className="h-5 w-5 text-muted-foreground" />
                                                        )}
                                                        <span className="sr-only">
                                                            {showPassword
                                                                ? "Hide password"
                                                                : "Show password"}
                                                        </span>
                                                    </Button>
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="keepMeLoggedIn"
                                            checked={keepMeLoggedIn}
                                            onCheckedChange={() =>
                                                setKeepMeLoggedIn(
                                                    !keepMeLoggedIn,
                                                )
                                            }
                                        />
                                        <label
                                            htmlFor="keepMeLoggedIn"
                                            className="cursor-pointer text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            Keep me logged in
                                        </label>
                                    </div>
                                    <Button
                                        variant="link"
                                        onClick={(e) => {
                                            e.preventDefault();
                                        }}
                                    >
                                        Forgot password?
                                    </Button>
                                </div>

                                {serverErrorMessage && (
                                    <FormMessage>
                                        {serverErrorMessage}
                                    </FormMessage>
                                )}
                                <Button
                                    className="w-full bg-primary text-primary-foreground hover:bg-primary-button-hover"
                                    size="lg"
                                    type="submit"
                                    variant="default"
                                >
                                    Login
                                </Button>
                            </form>
                        </Form>
                        <div className="flex items-center justify-center">
                            <div className="flex justify-center text-xs">
                                <span className="my-5 bg-card px-2 text-muted-foreground">
                                    Or continue with
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
                            Don&apos;t have an account?
                            <Button
                                className="px-2"
                                variant="link"
                                onClick={() => router.push("/register")}
                            >
                                Register
                            </Button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default function Page() {
    return (
        <SessionProvider>
            <LoginPage />
        </SessionProvider>
    );
}
