import { auth, providerMap, signIn } from "@/auth";
import { redirectIfNotOnboarded } from "@/lib/onboarding-guard";
import { AuthError } from "next-auth";
import Image from "next/image";

import GithubIcon from "@/components/icons/github";
import GoogleIcon from "@/components/icons/google";
import LogoIcon from "@/components/icons/logo";
import { MicrosoftIcon } from "@/components/icons/microsoft";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { ReactElement } from "react";

interface LoginPageProps {
    searchParams: Promise<{
        callbackUrl: string | undefined;
    }>;
}

/**
 * Login page
 *
 * @param {LoginPageProps} props - Component props
 * @returns {ReactElement} Login page component
 */
export default async function LoginPage({
    searchParams
}: LoginPageProps): Promise<ReactElement> {
    const session = await auth();
    await redirectIfNotOnboarded(session, "login");

    const { callbackUrl } = await searchParams;

    const getProviderIcon = (providerName: string) => {
        switch (providerName) {
            case "GitHub":
                return <GithubIcon />;
            case "Google":
                return <GoogleIcon />;
            case "Microsoft":
                return <MicrosoftIcon />;
        }
    };

    return (
        <div className="flex min-h-screen bg-accent dark:bg-background">
            <div className="relative hidden w-1/2 lg:block">
                <Image
                    src="/images/duotone.webp"
                    alt="Duotone"
                    layout="fill"
                    objectFit="cover"
                    className="dark:opacity-50"
                />
            </div>
            <div className="flex flex-1 items-center justify-center">
                <Card className="w-[350px]">
                    <CardHeader>
                        <CardTitle className="flex flex-row items-center gap-x-2">
                            <span>Welcome to</span>
                            <div className="flex flex-row items-center gap-x-1 rounded border border-accent bg-secondary p-2 text-secondary-foreground">
                                <LogoIcon />
                                ASICDE
                            </div>
                        </CardTitle>
                        <CardDescription>
                            Web IDE for ASIC development and collaboration
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {providerMap.map((provider) => (
                                <form
                                    key={provider.id}
                                    action={async () => {
                                        "use server";
                                        try {
                                            await signIn(provider.id, {
                                                redirectTo: callbackUrl ?? "",
                                            });
                                        } catch (error) {
                                            if (error instanceof AuthError) {
                                                console.error(error);
                                            }
                                            throw error;
                                        }
                                    }}
                                >
                                    <Button
                                        variant="outline"
                                        className="flex w-full flex-row justify-start"
                                        type="submit"
                                    >
                                        <div className="pl-12">
                                            {getProviderIcon(provider.name)}
                                        </div>
                                        Sign in with {provider.name}
                                    </Button>
                                </form>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
