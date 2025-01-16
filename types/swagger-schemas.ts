export const User = {
    type: "object",
    properties: {
        username: {
            type: "string",
            description: "The username for registration.",
        },
        name: {
            type: "string",
            description: "The user's name.",
        },
        surname: {
            type: "string",
            description: "The user's surname.",
        },
        email: {
            type: "string",
            description: "The user's email address.",
        },
        password: {
            type: "string",
            description: "The user's password.",
        },
    },
    required: ["username", "name", "surname", "email", "password"],
};

export const Organization = {
    type: "object",
    properties: {
        id: {
            type: "string",
            description: "The unique identifier for the organization.",
            format: "uuid",
        },
        name: {
            type: "string",
            description: "The name of the organization.",
            nullable: true,
        },
        users: {
            type: "array",
            description: "The list of users associated with the organization.",
            items: { type: "object" }, // Tu môže byť schéma pre OrganizationUser
        },
        userOrganizationRepo: {
            type: "array",
            description: "The list of repository connections associated with the organization.",
            items: { type: "object" }, // Tu môže byť schéma pre RepoUserOrganization
        },
        description: {
            type: "string",
            description: "The description of the organization.",
        },
        picture: {
            type: "string",
            description: "The URL of the organization's picture.",
        }
    },
    required: ["id", "name", "description", "picture"]
};