import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({ baseDirectory: __dirname });

const eslintConfig = [
    // There is an issue https://github.com/microsoft/rushstack/issues/4965 which
    // causes the lint to fail. When it is fixed uncomment following line and pray
    // that the errors will be easily fixable
    // ...compat.extends("next/core-web-vitals"),
    ...compat.extends("next/typescript"),
    ...compat.extends("prettier"),
    {
        rules: {
            "no-restricted-imports": ["error", { patterns: ["../*", "./*"] }],
        },
    },
    {
        ignores: ["node_modules", ".next/", "lib/prisma/**", "**/antlr/**"],
    },
];

export default eslintConfig;
