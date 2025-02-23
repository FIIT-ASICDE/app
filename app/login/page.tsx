import { auth, providerMap, signIn } from "@/auth";
import { redirectIfNotOnboarded } from "@/lib/onboarding-guard";
import { AuthError } from "next-auth";
import Image from "next/image";

export default async function LoginPage(props: {
    searchParams: Promise<{ callbackUrl: string | undefined }>;
}) {
    const session = await auth();
    await redirectIfNotOnboarded(session, "login");

    const { callbackUrl } = await props.searchParams;
    console.log("callbackUrl is", callbackUrl);

    return (
        <div className="flex flex-col bg-background">
            <main className="px-auto container mx-auto my-0 w-3/4 py-10">
                <div className="flex h-full overflow-hidden rounded-lg bg-card shadow-lg">
                    <div className="relative w-1/2">
                        <Image
                            priority
                            src={"/images/duotone.webp"}
                            alt="Duotone"
                            width={600}
                            height={600}
                            className="h-full w-full object-cover"
                        />
                    </div>

                    {Object.values(providerMap).map((provider) => (
                        <form
                            key={provider.id}
                            action={async () => {
                                "use server";
                                try {
                                    await signIn(provider.id, {
                                        redirectTo: callbackUrl ?? "",
                                    });
                                } catch (error) {
                                    //  TODO
                                    // Signin can fail for a number of reasons, such as the user
                                    // not existing, or the user not having the correct role.
                                    // In some cases, you may want to redirect to a custom error
                                    if (error instanceof AuthError) {
                                        console.error(error);
                                        // return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`);
                                    }

                                    // Otherwise if a redirects happens Next.js can handle it
                                    // so you can just re-thrown the error and let Next.js handle it.
                                    // Docs:
                                    // https://nextjs.org/docs/app/api-reference/functions/redirect#server-component
                                    throw error;
                                }
                            }}
                        >
                            <button type="submit">
                                <span>Sign in with {provider.name}</span>
                            </button>
                        </form>
                    ))}
                </div>
            </main>
        </div>
    );
}
