

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
      select : {name: true, tasks: {select : {id: true, name: true, points: true, type: true, promotedBy: true,}}}
    });

    return adminTasks;
  }),

  toggleTaskAvailability: adminProcedure

    .input(z.object({ taskId: z.string(), socId: z.string() }))
    .mutation(async ({ input, ctx }) => {
    
    }),

});