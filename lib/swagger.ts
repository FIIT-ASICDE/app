import { Organization, User } from "@/types/swagger-schemas";
import { createSwaggerSpec } from "next-swagger-doc";
import "server-only";

export const getApiDocs = async () => {
    const spec = createSwaggerSpec({
        apiFolder: "app/api",
        definition: {
            openapi: "3.0.0",
            info: {
                title: "ASICDE2 API DOC",
                version: "1.0",
            },
            tags: [
                {
                    name: "User",
                    description: "API endpoints related to user.",
                },
                {
                    name: "Organization",
                    description: "API endpoints related to organization.",
                }
            ],
            components: {
                securitySchemes: {
                    BearerAuth: {
                        type: "http",
                        scheme: "bearer",
                        bearerFormat: "JWT",
                    },
                    OAuth2: {
                        type: "oauth2",
                        flows: {
                            authorizationCode: {
                                authorizationUrl:
                                    "https://example.com/oauth/authorize",
                                tokenUrl: "https://example.com/oauth/token",
                                scopes: {
                                    read: "Grants read access",
                                    write: "Grants write access",
                                },
                            },
                        },
                    },
                },
                schemas: {
                    User,
                    Organization
                },
            },
            security: [],
        },
    });
    return spec;
};
