import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                card: {
                    DEFAULT: "var(--card)",
                    foreground: "var(--card-foreground)",
                    hover: "var(--card-hover)",
                },
                popover: {
                    DEFAULT: "var(--popover)",
                    foreground: "var(--popover-foreground)",
                },
                primary: {
                    DEFAULT: "var(--primary)",
                    foreground: "var(--primary-foreground)",
                    button: {
                        DEFAULT: "var(--primary-button)",
                        hover: "var(--primary-button-hover)",
                    },
                },
                secondary: {
                    DEFAULT: "var(--secondary)",
                    foreground: "var(--secondary-foreground)",
                },
                muted: {
                    DEFAULT: "var(--muted)",
                    foreground: "var(--muted-foreground)",
                },
                accent: {
                    DEFAULT: "var(--accent)",
                    foreground: "var(--accent-foreground)",
                },
                destructive: {
                    DEFAULT: "var(--destructive)",
                    foreground: "var(--destructive-foreground)",
                    hover: "var(--destructive-hover)",
                },
                border: "var(--border)",
                input: "var(--input)",
                ring: "var(--ring)",
                chart: {
                    "1": "var(--chart-1)",
                    "2": "var(--chart-2)",
                    "3": "var(--chart-3)",
                    "4": "var(--chart-4)",
                    "5": "var(--chart-5)",
                },
                header: {
                    DEFAULT: "var(--header)",
                    foreground: "var(--header-foreground)",
                    button: {
                        DEFAULT: "var(--header-button)",
                        hover: "var(--header-button-hover)",
                    },
                },
                sidebar: {
                    DEFAULT: "hsl(var(--sidebar-background))",
                    foreground: "hsl(var(--sidebar-foreground))",
                    primary: "hsl(var(--sidebar-primary))",
                    "primary-foreground":
                        "hsl(var(--sidebar-primary-foreground))",
                    accent: "hsl(var(--sidebar-accent))",
                    "accent-foreground":
                        "hsl(var(--sidebar-accent-foreground))",
                    border: "hsl(var(--sidebar-border))",
                    ring: "hsl(var(--sidebar-ring))",
                },
                tertiary: {
                    DEFAULT: "var(--tertiary)",
                    button: {
                        DEFAULT: "var(--tertiary-button)",
                        foreground: "var(--tertiary-button-foreground)",
                        hover: "var(--tertiary-button-hover)",
                    },
                },
                badge: {
                    public: {
                        DEFAULT: "var(--badge-public)",
                        foreground: "var(--badge-public-foreground)",
                        hover: "var(--badge-public-hover)",
                    },
                    private: {
                        DEFAULT: "var(--badge-private)",
                        foreground: "var(--badge-private-foreground)",
                        hover: "var(--badge-private-hover)",
                    },
                    admin: {
                        DEFAULT: "var(--badge-admin)",
                        foreground: "var(--badge-admin-foreground)",
                        hover: "var(--badge-admin-hover)",
                    },
                    member: {
                        DEFAULT: "var(--badge-member)",
                        foreground: "var(--badge-member-foreground)",
                        hover: "var(--badge-member-hover)",
                    },
                },
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
        },
    },
};
export default config;
