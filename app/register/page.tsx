"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { Mail, User, Lock, EyeOff, Eye, UserRound, UserPen } from "lucide-react";
import { useState } from "react";

const passwordValidation = {
    upperCase: new RegExp(/[A-Z]/),
    lowerCase: new RegExp(/[a-z]/),
    number: new RegExp(/[0-9]/),
    special: new RegExp(/[!@#$%^&*(),.?":{}|<>]/),
};

const formSchema = z.object({
    firstName: z.string().min(1, { message: "First name is required" }),
    lastName: z.string().min(1, { message: "Last name is required" }),
    email: z.string().email().min(1, { message: "Email is required" }),
    username: z
        .string()
        .min(2, { message: "Username must be at least 2 characters" }),
    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters" })
        .regex(passwordValidation.upperCase, {
            message: "Password must contain an uppercase character",
        })
        .regex(passwordValidation.lowerCase, {
            message: "Password must contain a lowercase character",
        })
        .regex(passwordValidation.number, {
            message: "Password must contain a number",
        })
        .regex(passwordValidation.special, {
            message: "Password must contain a special character",
        }),
});

export default function Register() {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            username: "",
            password: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        // client-side validated, TODO: server-side validation
        console.log(values);
    }

    return (
        <div className="flex flex-col bg-background">
            <main className="container mx-auto my-0 w-3/4 px-10 py-10">
                <div className="flex h-full overflow-hidden rounded-lg bg-card shadow-lg">
                    <div className="w-1/2">
                        <Image
                            src={"/images/duotone.webp"}
                            alt="Duotone"
                            width={600}
                            height={600}
                            className="h-full w-full object-cover"
                        />
                    </div>
                    <div className="w-1/2 overflow-y-auto p-8">
                        <div className="space-y-2 mb-10">
                            <h1 className="text-2xl font-bold text-secondary-foreground">Welcome to ASICDE</h1>
                            <p className="text-gray-500">Web IDE for ASIC development and collaboration</p>
                        </div>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <FormField
                                        control={form.control}
                                        name="firstName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>First name</FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <UserPen className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                                                        <Input className="pl-10" placeholder="John" {...field} />
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="lastName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Last name</FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <UserPen className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                                                        <Input className="pl-10" placeholder="Doe" {...field} />
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
                                                    <Input className="pl-10" placeholder="you@example.com" {...field} />
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
                                                    <Input className="pl-10" placeholder="johndoe" {...field} />
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
                                                        {...field}
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
                                <span className="bg-background px-2 text-muted-foreground my-5">
                                    OR CONTINUE WITH
                                </span>
                            </div>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2 mb-5">
                            <Button variant="outline" size="lg">
                                <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                                    <path
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                        fill="#4285F4"
                                    />
                                    <path
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                        fill="#34A853"
                                    />
                                    <path
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                        fill="#FBBC05"
                                    />
                                    <path
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                        fill="#EA4335"
                                    />
                                </svg>
                                Google
                            </Button>
                            <Button variant="outline" size="lg">
                                <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                </svg>
                                GitHub
                            </Button>
                        </div>
                        <div className="text-center text-sm">
                            Already have an account?{' '}
                            <Button
                                variant="link"
                            >
                                Back to login
                            </Button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
