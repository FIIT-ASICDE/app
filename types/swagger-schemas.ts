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
