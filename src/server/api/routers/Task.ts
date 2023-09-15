import { TaskDifficulty, TaskType } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { TaskDifficultyConst } from "~/utils/constants";
import { CompletedTask } from "@prisma/client";

import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  adminProcedure,
} from "~/server/api/trpc";




export const taskRouter = createTRPCRouter({
  createTask: adminProcedure
    .input(z.object({               // can just dump taskData state as input in frontend
        id: z.string(), 
        taskName: z.string(),        
        societyId: z.string(),
        taskDescription: z.union([z.string(), z.null()]),
        taskDifficulty: z.nativeEnum(TaskDifficulty),
        taskPoints: z.number(), 
        promotion: z.union([z.string(), z.null()]),
         }))
        .mutation( async ({ input, ctx }) => {
        try {
            await ctx.prisma.task.create({
                data: {
                    name: input.taskName,
                    points: input.taskPoints,
                    description: input.taskDescription,
                    difficulty: input.taskDifficulty,
                    promotedBy: input.promotion,
                    society: {
                        connect: {
                            id: input.societyId,
                        },
                    },
                },
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
    editTask: adminProcedure
    .input(z.object({               // can just dump taskData state as input in frontend
        id: z.string(), 
        taskName: z.string(), 
        societyName: z.string(),
        societyId: z.string(),
        taskDescription: z.union([z.string(), z.null()]),
        taskDifficulty: z.enum(TaskDifficultyConst),
        taskPoints: z.number(), 
        societyImage: z.string(), 
        taskAvailability: z.boolean(),
        promotion: z.union([z.string(), z.null()]),
        completed: z.boolean() }))
        .mutation( async ({ input, ctx }) => {
        try {
            await ctx.prisma.task.update({
                where: {id: input.id},
                data: {
                    name: input.taskName,
                    description: input.taskDescription,
                    difficulty: input.taskDifficulty,
                },
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