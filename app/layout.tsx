import { TRPCReactProvider } from "@/lib/trpc/react";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import React, { Suspense } from "react";

import "./globals.css";

import DevControls from "@/components/dev-controls/dev-controls";
import Header from "@/components/header/header";
import { TooltipProvider } from "@/components/ui/tooltip";

const ThemeProvider = ({
    children,
    ...props
}: React.ComponentProps<typeof NextThemesProvider>) => {
    return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body>
                <SessionProvider>
                    <Header />
                    <ThemeProvider attribute="class" disableTransitionOnChange>
                        <TooltipProvider delayDuration={0}>
                            <Suspense fallback={<div>TODO: LOADING</div>}>
                                <TRPCReactProvider>
                                    {children}
                                </TRPCReactProvider>
                                {process.env.NODE_ENV === "development" && (
                                    <DevControls />
                                )}
                            </Suspense>
                        </TooltipProvider>
                    </ThemeProvider>
                </SessionProvider>
            </body>
        </html>
    );
}
