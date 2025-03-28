"use client";

import React from 'react';
import Layout from './components/Layout/Layout';
import { DiagramProvider } from "@/app/diagram-test/context/DiagramContext";
import styles from './DiagramPage.module.css';

const DiagramPage = () => {
    return (
        <DiagramProvider>
            <Layout />
        </DiagramProvider>
    );
};

export default DiagramPage;

