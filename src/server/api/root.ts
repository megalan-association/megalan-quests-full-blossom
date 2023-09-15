import { createTRPCRouter } from "~/server/api/trpc";
import { userRouter } from "./routers/User";
import { adminRouter } from "./routers/Admin";
import { tasksRouter } from "./routers/Tasks";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  admin: adminRouter,
  tasks: tasksRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
