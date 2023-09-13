// import { type Task } from "@prisma/client";
// import { TRPCError } from "@trpc/server";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  // protectedProcedure,
  publicProcedure,
  // adminProcedure,
} from "~/server/api/trpc";


export const tasksRouter = createTRPCRouter({

  getRooms: protectedProcedure
    .query(async ({ ctx }) => {
      const rooms = await ctx.prisma.room.findMany({
        select: { name: true }
      });
      return rooms;
    }),

  getAllTasks: publicProcedure
    .query(async ({ ctx }) => {
      const data = await ctx.prisma.task.findMany({
        select: {
          id: true,
          name: true,
          points: true, 
          description: true, 
          difficulty: true, 
          type: true, 
          promotedBy: true, 
          society: true, 
          isAvailable: true
        }
      });


      const tasks = []

      for (const t of data) {

        if (!t.society) break
        tasks.push({
          id: t.id,
          societyImage: t.society.image,
          taskName: t.name,
          societyName: t.society.name,
          societyId: t.society.id,
          taskDescription: t.description,
          taskDifficulty: t.difficulty,
          taskPoints: t.points,
          taskAvailability: t.isAvailable,
          promotion: t.promotedBy,
        });
      }

      return tasks;
    }),

  getRoomTasks: publicProcedure
    .input(z.object({ roomName: z.string() }))
    .query(async ({ input, ctx }) => {

      const rt = await ctx.prisma.room.findFirst({
        where: { name: input.roomName },
        select: { societies: { select: { id: true, name: true, image: true, tasks: { select: { id: true, description: true, difficulty: true, isAvailable: true, name: true, points: true, type: true, promotedBy: true, } } } } }
      });

      if (!rt) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'An unexpected error occurred, please try again later.',
          // cause: error,
        });

      }

      const tasks = []

      for (const s of rt.societies) {
        // let td = s.tasks;
        for (const t of s.tasks) {
          tasks.push({
            id: t.id,
            societyImage: s.image,
            taskName: t.name,
            societyName: s.name,
            societyId: s.id,
            taskDescription: t.description,
            taskDifficulty: t.difficulty,
            taskPoints: t.points,
            taskAvailability: t.isAvailable,
            promotion: t.promotedBy,
          });
        }
      }
      return tasks;
    }),

});