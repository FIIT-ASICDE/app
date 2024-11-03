import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header/header";
import Footer from '@/components/footer/footer';

export const metadata: Metadata = {
    title: "ASICDE",
    description: "Web based HDL IDE"
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <Header type="logged-in" isInOrganisation={true} />
                {children}
                <Footer />
            </body>
        </html>
    );
}
