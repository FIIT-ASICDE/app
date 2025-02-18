import MonacoWebpackPlugin from "monaco-editor-webpack-plugin";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    webpack: (config, options) => {
        config.module.rules.push({ test: /\.ttf$/, type: "asset/resource" });

        // when `isServer` is `true`, building (`next build`) fails with the following error:
        // "Conflict: Multiple assets emit different content to the same filename ../main.js.nft.json"
        if (!options.isServer) {
            config.plugins.push(
                new MonacoWebpackPlugin({
                    languages: ["json", "systemverilog"],
                    filename: "static/[name].worker.js",
                }),
            );
        }

        return config;
    },
};

export default nextConfig;
