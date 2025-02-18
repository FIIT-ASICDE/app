import { RepositoryFilePreview } from "@/lib/types/repository";
import { Code, FileIcon, X } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { darcula, docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

import { getTimeDeltaString } from "@/components/generic/generic";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface FilePreviewProps {
    name: string;
    language: string | undefined;
    content: string;
    lastActivity: Date;
    setFilePreview: Dispatch<SetStateAction<RepositoryFilePreview | undefined>>;
    openInIDEPath?: string;
}

export const FilePreview = ({
    name,
    language,
    content,
    lastActivity,
    setFilePreview,
    openInIDEPath,
}: FilePreviewProps) => {
    const { theme, resolvedTheme } = useTheme();

    const themeToSyntaxHighlighterStyle = () => {
        if (theme === "system") {
            return resolvedTheme === "light" ? docco : darcula;
        }
        return theme === "light" ? docco : darcula;
    };

    return (
        <Card className="m-6">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex flex-col items-center gap-3 sm:flex-row">
                    <div className="flex flex-row items-center gap-3">
                        <FileIcon className="text-muted-foreground" />
                        <span className="text-lg">{name}</span>
                    </div>
                    <div className="flex flex-row items-center gap-3">
                        <Badge variant="secondary" className="text-foreground">
                            {language}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                            {getTimeDeltaString(lastActivity)}
                        </span>
                    </div>
                </CardTitle>
                <div className="flex flex-row items-center gap-x-3">
                    {openInIDEPath && (
                        <Link href={openInIDEPath}>
                            <Button variant="secondary">
                                <Code />
                                Open in IDE
                            </Button>
                        </Link>
                    )}
                    <button
                        className="m-0 rounded bg-transparent p-1 hover:bg-accent"
                        onClick={() => setFilePreview(undefined)}
                    >
                        <X />
                    </button>
                </div>
            </CardHeader>
            <CardContent className="rounded">
                <SyntaxHighlighter
                    language={language}
                    style={themeToSyntaxHighlighterStyle()}
                    showLineNumbers
                >
                    {content}
                </SyntaxHighlighter>
            </CardContent>
        </Card>
    );
};
