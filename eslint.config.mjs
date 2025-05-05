import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({ baseDirectory: __dirname });

const eslintConfig = [
    // There is some issue,
    // Prisma 6.6.0 must have specified where to generate things to, so it is
    // generated inside our code, BUUUUUUUT, I don't want to lint that code.
    // It must be ignored, hence there is the 'ignores' entry. BUUUUUUUT there is
    // and issue https://github.com/microsoft/rushstack/issues/4965 which causes
    // the lint to fail. When it is fixed uncomment following two lines and pray
    // that the errors will be easily fixable
    ...compat.extends("next/core-web-vitals"),
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
