// DiagramPage.tsx
"use client";

import React from "react";
import Layout from "./components/Layout/Layout";
import { DiagramProvider } from "@/app/diagram-test/context/DiagramContext";
import type { Repository } from "@/lib/types/repository";

interface DiagramPageProps {
    repository: Repository;
}

const DiagramPage = ({ repository }: DiagramPageProps) => {
    return (
        <DiagramProvider repository={repository}>
            <Layout />
        </DiagramProvider>
    );
};

export default DiagramPage;
