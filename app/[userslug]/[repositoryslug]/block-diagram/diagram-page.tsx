/**
 * Main entry point for the block diagram editor application.
 * Provides context and layout for the diagram editing interface.
 */

"use client";

import React from "react";
import Layout from "@/app/[userslug]/[repositoryslug]/block-diagram/components/layout/layout";
import { DiagramProvider } from "@/app/[userslug]/[repositoryslug]/block-diagram/context/diagram-context";
import type { Repository, FileDisplayItem, RepositoryItem } from "@/lib/types/repository";

/**
 * Props interface for the DiagramPage component
 */

interface DiagramPageProps {
    repository: Repository;      // Current repository information
    activeFile: FileDisplayItem; // Currently active file in the editor
    tree: RepositoryItem[];      // Repository file tree structure
    setTree: React.Dispatch<React.SetStateAction<RepositoryItem[]>>; // Function to update the file tree
}

/**
 * DiagramPage Component
 * Wraps the diagram editor layout with necessary context providers.
 * Manages the state and configuration for the block diagram editor.
 * 
 * @param repository - Repository information including name, owner, etc.
 * @param activeFile - Currently selected file in the editor
 * @param tree - File tree structure of the repository
 * @param setTree - Function to update the repository file tree
 */
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
