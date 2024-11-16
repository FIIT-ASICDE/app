"use client";

import { createSwaggerSpec } from "next-swagger-doc";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

type Props = {
    spec: ReturnType<typeof createSwaggerSpec>;
};

function ReactSwagger({ spec }: Props) {
    return <SwaggerUI spec={spec} />;
}

export default ReactSwagger;
