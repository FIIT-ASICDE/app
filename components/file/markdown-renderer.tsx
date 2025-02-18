import ReactMarkdown from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/esm/styles/hljs";
import remarkGfm from "remark-gfm";

interface MarkdownRendererProps {
    content: string;
}

export const MarkdownRenderer = ({ content }: MarkdownRendererProps) => {
    return (
        <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
                code({ className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || "");
                    return match ? (
                        <SyntaxHighlighter
                            // @ts-expect-error this is done according to documentation
                            style={darcula}
                            language={match[1]}
                            {...props}
                        >
                            {String(children).replace(/\n$/, "")}
                        </SyntaxHighlighter>
                    ) : (
                        <code className={className} {...props}>
                            {children}
                        </code>
                    );
                },
            }}
        >
            {content}
        </ReactMarkdown>
    );
};
