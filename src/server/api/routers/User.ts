import { TRPCError } from "@trpc/server";

import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  changeName: publicProcedure
    .input(z.object({ userId: z.string(), newName: z.string() }))
    .mutation(async ({ input, ctx }) => {
      try {
        await ctx.prisma.user.update({
          where: { id: input.userId },
          data: { name: input.newName }
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

  getRank: protectedProcedure
    .query(async ({ ctx }) => {
      const leaderBoard = await ctx.prisma.user.findMany({
        orderBy: [{ totalPoints: 'desc' }],
        select: { id: true }
      });
      const lb: string[] = []
      leaderBoard.forEach((u) => {lb.push(u.id)});
      const rank = lb.indexOf(ctx.session.user.id );
      return rank + 1;
    }),

  getProgress: protectedProcedure
    .query(async ({ ctx }) => {
      // user points, total points
      const userPoints = await ctx.prisma.user.findFirst({
        where: { id: ctx.session.user.id },
        select: { totalPoints: true }
      });

      const allPoints = await ctx.prisma.task.aggregate({
        _sum: { points: true },

      })
      return { userPoints: userPoints?.totalPoints, allPoints: allPoints._sum.points }
    }),
});