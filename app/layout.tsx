import "@/app/globals.css";
import { TRPCReactProvider } from "@/lib/trpc/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import React, { Suspense } from "react";

import DevControls from "@/components/dev/dev-controls";
import { Toaster } from "@/components/ui/sonner";
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
                <ThemeProvider attribute="class" disableTransitionOnChange>
                    <Suspense fallback={<div>TODO: LOADING</div>}>
                        <TooltipProvider delayDuration={0}>
                            <TRPCReactProvider>
                                {children}
                                <Toaster closeButton />
                            </TRPCReactProvider>
                            {process.env.NODE_ENV === "development" && (
                                <DevControls />
                            )}
                        </TooltipProvider>
                    </Suspense>
                </ThemeProvider>
            </body>
        </html>
    );
}
