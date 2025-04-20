import Image from "next/image";
import type React from "react";
import type { ReactElement } from "react";
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import remarkGfm from "remark-gfm";

import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";


interface MarkdownRendererProps {
    content: string;
}

type ComponentType = React.ComponentPropsWithoutRef<
    typeof Markdown
>["components"];

/**
 * Component that renders a markdown file
 *
 * @param {MarkdownRendererProps} props - Component props
 * @returns {ReactElement} Render component
 */
export const MarkdownRenderer = ({
    content,
}: MarkdownRendererProps): ReactElement => {
    const components: ComponentType = {
        code({ className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");

            return match ? (
                <SyntaxHighlighter
                    // @ts-expect-error this is according to the official docs
                    style={oneDark}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                    className="rounded-lg border border-border bg-muted"
                >
                    {String(children).trim()}
                </SyntaxHighlighter>
            ) : (
                <code className="rounded bg-muted px-1 py-0.5 text-muted-foreground">
                    {children}
                </code>
            );
        },
        h1: ({ children }) => (
            <>
                <h1 className="mb-2 text-2xl font-bold text-primary">
                    {children}
                </h1>
                <Separator className="mb-4 border-border" />
            </>
        ),
        h2: ({ children }) => (
            <>
                <h2 className="mb-2 text-xl font-bold text-primary">
                    {children}
                </h2>
                <Separator className="mb-3 border-border" />
            </>
        ),
        h3: ({ children }) => (
            <h3 className="mb-2 text-lg font-semibold text-foreground">
                {children}
            </h3>
        ),
        p: ({ children }) => <p className="mb-4 text-foreground">{children}</p>,
        a: ({ href, children }) => (
            <a href={href} className="text-primary hover:underline">
                {children}
            </a>
        ),
        ul: ({ children }) => (
            <ul className="mb-4 list-inside list-disc text-muted-foreground">
                {children}
            </ul>
        ),
        ol: ({ children }) => (
            <ol className="mb-4 list-inside list-decimal text-muted-foreground">
                {children}
            </ol>
        ),
        img: ({ src, alt }) => (
            <Image
                sizes="100vw"
                className="rounded-lg border border-border"
                style={{ width: "100%", height: "auto" }}
                alt={alt || ""}
                src={src || ""}
                width={500}
                height={300}
            />
        ),
        blockquote: ({ children }) => (
            <blockquote className="border-primary/50 my-4 border-l-4 pl-4 italic text-muted-foreground">
                {children}
            </blockquote>
        ),
    };

    return (
        <Card className="p-6">
            <Markdown
                remarkPlugins={[remarkGfm]}
                components={components}
                className="prose prose-invert max-w-none"
            >
                {content}
            </Markdown>
        </Card>
    );
};
