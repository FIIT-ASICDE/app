"use client";

import { registerSchema } from "@/lib/schemas/user-schemas";
import { api } from "@/lib/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Lock, Mail, UserRound, UserRoundPen } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import GithubIcon from "@/components/icons/github";
import GoogleIcon from "@/components/icons/google";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export default function Register() {
    const router = useRouter();
    const { theme } = useTheme();

    const [showPassword, setShowPassword] = useState<boolean>(false);

    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "",
            surname: "",
            email: "",
            username: "",
            password: "",
        },
    });

    const onSubmitProcedure = api.user.register.useMutation({
        onSuccess: () => router.replace("/login"),
    });

    const onSubmit = (values: z.infer<typeof registerSchema>) => {
        onSubmitProcedure.mutate(values);
    };

    return (
        <div className="flex flex-col bg-background">
            <main className="container mx-auto my-0 w-3/4 px-10 py-10">
                <div className="flex overflow-hidden rounded-lg bg-card shadow-lg">
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
                            <h1 className="text-2xl font-bold text-primary">
                                Welcome to ASICDE
                            </h1>
                            <p className="text-muted-foreground">
                                Web IDE for ASIC development and collaboration
                            </p>
                        </div>
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-5"
                            >
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    First name
                                                </FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <UserRoundPen className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                                                        <Input
                                                            className="pl-10"
                                                            placeholder="John"
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
                                        name="surname"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Last name</FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <UserRoundPen className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                                                        <Input
                                                            className="pl-10"
                                                            placeholder="Doe"
                                                            {...field}
                                                        />
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                                                    <Input
                                                        className="pl-10"
                                                        placeholder="you@example.com"
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
                                    name="username"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Username</FormLabel>
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
                                <FormMessage>
                                    {onSubmitProcedure.error?.message}
                                </FormMessage>
                                <Button
                                    className="w-full bg-primary text-primary-foreground hover:bg-primary-button-hover"
                                    size="lg"
                                    type="submit"
                                    variant="default"
                                >
                                    Register
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
                            Already have an account?{" "}
                            <Link href="/">Back to login</Link>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
