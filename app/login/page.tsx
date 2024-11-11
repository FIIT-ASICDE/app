"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Lock, UserRound } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { redirect } from 'next/navigation'

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
    usernameOrEmail: z
        .string()
        .min(2, { message: "Username or email must be at least 2 characters" }),
    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters" }),
    keepMeLoggedIn: z.boolean().optional()
});

export default function Login() {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [serverErrorMessage, setServerErrorMessage] = useState<string | null>(null);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            usernameOrEmail: "",
            password: "",
            keepMeLoggedIn: false,
        },
    });
    
    async function onSubmit(values: z.infer<typeof formSchema>) {
        const response = await fetch("http://localhost:3000/api/login", {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(values),
        });
        
        if (response.ok) {
            setServerErrorMessage(null);
            redirect("/")
        } else {
            const responseJSON = await response.json();
            setServerErrorMessage(responseJSON.error);
        }
    }

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
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-5"
                            >
                                <FormField
                                    control={form.control}
                                    name="usernameOrEmail"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Username or email</FormLabel>
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
                                <FormField
                                    control={form.control}
                                    name="keepMeLoggedIn"
                                    render={({ field }) => (
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center space-x-2">
                                                <Checkbox
                                                    id="keepMeLoggedIn"
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />
                                                <label
                                                    htmlFor="keepMeLoggedIn"
                                                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                >
                                                    Keep me logged in
                                                </label>
                                            </div>
                                            <Button variant="link">Forgot password?</Button>
                                        </div>
                                    )}
                                />

                                {serverErrorMessage && (
                                    <FormMessage>{serverErrorMessage}</FormMessage>
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
