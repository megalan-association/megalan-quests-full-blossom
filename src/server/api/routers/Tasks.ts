// import { type Task } from "@prisma/client";
// import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  createTRPCRouter,
  // protectedProcedure,
  publicProcedure,
  // adminProcedure,
} from "~/server/api/trpc";


export const tasksRouter = createTRPCRouter({
  
  getAllTasks: publicProcedure
    .query(async ({ ctx }) => {
      const data = await ctx.prisma.task.findMany({
        select: {id: true, name: true, points: true, type: true, promotedBy: true, society: true, isAvailable: true}
    });
    return data;  
    }),
  
  getRoomTasks: publicProcedure
  .input(z.object({ roomId: z.string() }))
  .query(async ({input, ctx}) => {
    
    const roomTasks = await ctx.prisma.society.findMany({
      where: {roomId: input.roomId},
      select: {
        id: true,
        name: true,
        tasks : {select: {id: true, isAvailable: true, name: true, points: true, type: true, promotedBy: true, society: true}}
      }
    });
    return roomTasks;
  }),

 






});