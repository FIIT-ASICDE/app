"use client";

import { dia, shapes } from "@joint/core";
import { useEffect, useRef } from "react";

export default function DiagramTest() {
    const paperElement = useRef<HTMLDivElement>(null);

    const graph = new dia.Graph({}, { cellNamespace: { shapes } });

    useEffect(() => {
        const paper = new dia.Paper({
            el: paperElement.current!,
            model: graph,
            width: 800,
            height: 600,
            gridSize: 1,
            drawGrid: true,
            background: {
                color: "#f9f9f9",
            },
        });

        return () => {
            paper.remove();
        };
    });

    const addShape = () => {
        const rect = new shapes.standard.Rectangle();
        rect.position(100, 30);
        rect.resize(100, 40);

        rect.addTo(graph);
    };

    return (
        <>
            <button onClick={addShape}>Add shape</button>
            <div
                ref={paperElement}
                className="flex h-screen w-screen items-center justify-center"
            ></div>
        </>
    );
}
