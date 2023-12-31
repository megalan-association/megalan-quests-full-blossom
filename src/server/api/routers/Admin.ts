import { TaskDifficulty, UserType } from "@prisma/client";
import { TRPCError } from "@trpc/server";

import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  adminProcedure,
} from "~/server/api/trpc";
import { fisherYatesShuffle } from "~/utils/raffle";
import { type AdminsTaskData, type SocietyAdminData } from "~/utils/types";

export const adminRouter = createTRPCRouter({
  getAdminTasks: adminProcedure.query(async ({ ctx }) => {
    const adminTasks = await ctx.prisma.society.findMany({
      where: {
        admins: { some: { id: ctx.session.user.id } },
      },
      select: {
        id: true,
        name: true,
        image: true,
        tasks: {
          select: {
            id: true,
            name: true,
            description: true,
            points: true,
            type: true,
            promotedBy: true,
            isAvailable: true,
            difficulty: true,
          },
        },
      },
    });

    const response: AdminsTaskData = [];

    for (const s of adminTasks) {
      response.push({
        societyId: s.id,
        societyName: s.name,
        tasks: s.tasks.map((t) => {
          return {
            id: t.id,
            completed: false,
            taskName: t.name,
            taskPoints: t.points,
            societyId: s.id,
            societyImage: s.image,
            societyName: s.name,
            taskAvailability: t.isAvailable,
            taskDescription: t.description,
            taskDifficulty: t.difficulty,
            promotion: t.promotedBy,
          };
        }),
      });
    }

    return response;
  }),

  toggleTaskAvailability: adminProcedure
    .input(z.object({ taskId: z.string(), availability: z.boolean() }))
    .mutation(async ({ input, ctx }) => {
      try {
        await ctx.prisma.task.update({
          where: { id: input.taskId },
          data: { isAvailable: input.availability },
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

  completeTask: adminProcedure
    .input(z.object({ taskId: z.string(), userId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const check = await ctx.prisma.user.findFirst({
        where: { id: input.userId },
        select: { type: true },
      });

      if (check?.type !== UserType.PARTICIPANT) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "An unexpected error occurred, please try again later.",
          cause: "User is not a Participant",
        });
      }

      try {
        const task = await ctx.prisma.task.findFirst({
          where: { id: input.taskId },
          select: { points: true },
        });
        await ctx.prisma.user.update({
          where: { id: input.userId },
          data: {
            completedTasks: {
              create: {
                authorisedBy: ctx.session.user.name as string,
                task: { connect: { id: input.taskId } },
              },
            },
            totalPoints: { increment: task?.points },
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

  becomeAdmin: protectedProcedure
    .input(z.object({ secret: z.string() }))
    .mutation(async ({ input, ctx }) => {
      // get the soc id from the secret
      const soc = await ctx.prisma.society.findUnique({
        where: { secret: input.secret },
        select: { id: true },
      });

      if (!soc) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Incorrect secret",
          // cause: ,
        });
      }

      await ctx.prisma.user.update({
        where: { id: ctx.session.user.id },
        data: {
          type: UserType.ADMIN,
          totalPoints: 0,
          societies: { connect: { id: soc.id } },
        },
      });
    }),

  getAllAdmins: protectedProcedure.query(async ({ ctx }) => {
    const admin = await ctx.prisma.user.findFirst({
      where: { id: ctx.session.user.id },
      select: {
        societies: {
          include: {
            admins: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    if (!admin) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "admin not found",
      });
    }
    const response: SocietyAdminData[] = [];
    admin.societies.forEach((soc) => {
      response.push({
        societyId: soc.id,
        societyName: soc.name,
        admins: soc.admins.map((admin) => {
          return {
            id: admin.id,
            name: admin.name ?? "unknown name",
          };
        }),
      });
    });

    return response;
  }),

  getRaffleWinner: adminProcedure.query(async ({ ctx }) => {
    const completedTasks = await ctx.prisma.completedTask.findMany({
      where: {
        task: {
          type: "SOCIETY",
        },
        user: {
          type: "PARTICIPANT",
        },
      },
      include: {
        task: {
          select: {
            points: true,
          },
        },
      },
    });

    const raffle: string[] = [];
    completedTasks.forEach((cTask) => {
      raffle.push(cTask.userID);
      if (cTask.task.points == 200) raffle.push(cTask.userID);
    });
    const winnerList = fisherYatesShuffle(raffle);
    console.log(winnerList);

    if (winnerList.length === 0) return { user: null };

    // get  the winners name
    const name = await ctx.prisma.user.findFirstOrThrow({
      where: { id: winnerList[0] },
    });
    console.log(name);

    // return the winner
    return { id: name.id, image: name.image, name: name.name };
  }),

  removeAdmin: protectedProcedure
    .input(z.object({ adminId: z.string(), societyId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      await ctx.prisma.society.update({
        where: { id: input.societyId },
        data: { admins: { disconnect: { id: input.adminId } } },
      });
      const admin = await ctx.prisma.user.findFirst({
        where: { id: ctx.session.user.id },
        select: {
          societies: {
            include: {
              admins: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
        },
      });

      if (!admin) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "admin not found",
        });
      }
      const response: SocietyAdminData[] = [];
      admin.societies.forEach((soc) => {
        response.push({
          societyId: soc.id,
          societyName: soc.name,
          admins: soc.admins.map((admin) => {
            return {
              id: admin.id,
              name: admin.name ?? "unknown name",
            };
          }),
        });
      });

      return response;
    }),

  createTask: adminProcedure
    .input(
      z.object({
        // can just dump taskData state as input in frontend
        taskName: z.string(),
        societyId: z.string(),
        taskDescription: z.union([z.string(), z.null()]),
        taskDifficulty: z.nativeEnum(TaskDifficulty),
        taskPoints: z.number(),
        // promotion: z.union([z.string(), z.null()]),
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        await ctx.prisma.task.create({
          data: {
            name: input.taskName,
            points: input.taskPoints,
            description: input.taskDescription,
            difficulty: input.taskDifficulty,
            // promotedBy: input.promotion,
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
    .input(
      z.object({
        // can just dump taskData state as input in frontend
        id: z.string(),
        taskName: z.string(),
        taskDescription: z.union([z.string(), z.null()]),
        taskDifficulty: z.nativeEnum(TaskDifficulty),
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        await ctx.prisma.task.update({
          where: { id: input.id },
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
