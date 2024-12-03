"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Lock, Mail, UserRound, UserRoundPen } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";
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

const passwordValidation = {
    upperCase: new RegExp(/[A-Z]/),
    lowerCase: new RegExp(/[a-z]/),
    number: new RegExp(/[0-9]/),
    special: new RegExp(/[!@#$%^&*(),.?":{}|<>]/),
};

const formSchema = z.object({
    name: z.string().min(1, { message: "First name is required" }),
    surname: z.string().min(1, { message: "Last name is required" }),
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
    const [serverErrorMessage, setServerErrorMessage] = useState<string | null>(
        null,
    );

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            surname: "",
            email: "",
            username: "",
            password: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        // client-side validated, TODO: server-side validation
        const response = await fetch("/api/register", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(values),
        });
        if (response.ok) {
            setServerErrorMessage(null);
            redirect("/");
            // login page isn't present yet
        } else {
            const responseJSON = await response.json();
            if (response.status === 400) {
                if (responseJSON.errorCode === "missing_field") {
                    setServerErrorMessage(responseJSON.error);
                } else if (responseJSON.errorCode === "password_length") {
                    setServerErrorMessage(responseJSON.error);
                }
            } else if (response.status === 409) {
                setServerErrorMessage(responseJSON.error);
            } else if (response.status === 500) {
                setServerErrorMessage(responseJSON.error);
            }
        }
    }

    return (
        <div className="flex flex-col bg-gradient-to-r from-slate-200 to-indigo-200">
            <main className="container mx-auto my-0 w-3/4 px-10 py-10">
                <div className="flex h-full overflow-hidden rounded-lg bg-card shadow-lg">
                    <div className="relative w-1/2">
                        <Image
                            src={"/images/duotone.webp"}
                            alt="Duotone"
                            width={600}
                            height={600}
                            className="h-full w-full object-cover"
                        />
                        <div className="absolute left-4 top-4 bg-transparent">
                            <h1 className="text-xl font-bold text-secondary">
                                {">"} ASICDE
                            </h1>
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
                                <FormMessage>{serverErrorMessage}</FormMessage>
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
                            Already have an account?
                            <Button className="px-2" variant="link">
                                Back to login
                            </Button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
