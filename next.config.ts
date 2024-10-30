import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    // https://github.com/nextauthjs/next-auth/discussions/9385
    transpilePackages: ['next-auth'],
};

export default nextConfig;
