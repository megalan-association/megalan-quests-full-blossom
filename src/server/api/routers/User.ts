import { TRPCError } from "@trpc/server";

import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  changeName: publicProcedure
    .input(z.object({ userId: z.string(), newName: z.string() }))
    .mutation( async ({ input, ctx }) => {
        try {
            await ctx.prisma.user.update({
                where: {id: input.userId},
                data: {name: input.newName}
            });
            return { status: "success" };
        } catch (error) {
            throw new TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: "An unexpected error occurred, please try again later.",
                cause: error,
            });
        }
    }),
});