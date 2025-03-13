import { FileIcon } from "lucide-react";

import { MarkdownRenderer } from "@/components/repositories/code/markdown-renderer";
import { getTimeDeltaString } from "@/components/generic/generic";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ReadMeFilePreviewProps {
    name: string;
    language: string | undefined;
    content: string;
    lastActivity: Date;
}

export const ReadMeFilePreview = ({
    name,
    language,
    content,
    lastActivity,
}: ReadMeFilePreviewProps) => {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex flex-row items-center gap-x-3">
                    <FileIcon className="text-muted-foreground" />
                    <span className="text-lg">{name}</span>
                    <Badge variant="secondary" className="text-foreground">
                        {language}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                        {getTimeDeltaString(lastActivity)}
                    </span>
                </CardTitle>
            </CardHeader>
            <CardContent className="rounded">
                <div className="mx-auto p-4">
                    <MarkdownRenderer content={content} />
                </div>
            </CardContent>
        </Card>
    );
};
