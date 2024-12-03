import { auth } from "@/auth";
import { HttpError } from "lib/errors/HttpError";

export async function authenticate() {
    const loggedInUser = await auth();

    if (loggedInUser) {
        return loggedInUser;
    }

    throw new HttpError("Unauthenticated", 401);
}