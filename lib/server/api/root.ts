import { editorRouter } from "@/lib/server/api/routers/editor";
import { gitRouter } from "@/lib/server/api/routers/git";
import { orgRouter } from "@/lib/server/api/routers/orgs";
import { repoRouter } from "@/lib/server/api/routers/repos";
import { simulationRouter } from "@/lib/server/api/routers/simulation";
import { synthesisRouter } from "@/lib/server/api/routers/synthesis";
import { userRouter } from "@/lib/server/api/routers/user";
import { createCallerFactory, createTRPCRouter } from "@/lib/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
    user: userRouter,
    org: orgRouter,
    repo: repoRouter,
    git: gitRouter,
    editor: editorRouter,
    simulation: simulationRouter,
    synthesis: synthesisRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
