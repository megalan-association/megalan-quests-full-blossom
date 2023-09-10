import { TRPCError } from "@trpc/server";

import { z } from "zod";

import {
  createTRPCRouter,
  // protectedProcedure,
  publicProcedure,
  adminProcedure,
} from "~/server/api/trpc";




export const tasksRouter = createTRPCRouter({
  getAdminTasks: adminProcedure
  .query(async ({ctx}) => {
    const adminTasks = ctx.prisma.society.findMany({
      where: {
        admins: {every: {id: ctx.session.user.id}}
      },
      select : {name: true, tasks: {select : {id: true, name: true, points: true, type: true, promotedBy: true, isAvailable: true}}}
    });

    return adminTasks;
  }),

  toggleTaskAvailability: adminProcedure

    .input(z.object({ taskId: z.string(), availability: z.boolean()}))
    .mutation(async ({ input, ctx }) => {
      try {
        await ctx.prisma.task.update({
          where: {id: input.taskId},
          data: {isAvailable: input.availability}
        });
        return { status: "success" };
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'An unexpected error occurred, please try again later.',
          cause: error,
        });
      }   
    }),

});