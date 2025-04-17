// DiagramPage.tsx
"use client";

import React from "react";
import Layout from "@/app/[userslug]/[repositoryslug]/block-diagram/components/Layout/Layout";
import { DiagramProvider } from "@/app/[userslug]/[repositoryslug]/block-diagram/context/DiagramContext";
import type { Repository, FileDisplayItem, RepositoryItem } from "@/lib/types/repository";

interface DiagramPageProps {
    repository: Repository;
    activeFile: FileDisplayItem;
    tree: RepositoryItem[];
    setTree: React.Dispatch<React.SetStateAction<RepositoryItem[]>>;
}

const DiagramPage = ({ repository, activeFile, tree, setTree }: DiagramPageProps) => {
    return (
        <DiagramProvider
            repository={repository}
            activeFile={activeFile}
            tree={tree}
            setTree={setTree}
        >
            <Layout />
        </DiagramProvider>
    );
};

export default DiagramPage;
