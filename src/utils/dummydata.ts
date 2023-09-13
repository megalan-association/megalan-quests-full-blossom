import { TaskDifficulty } from "@prisma/client";
import { type SocietyAdminData, type taskCardInfo } from "./types";

export const placeholderTaskData: taskCardInfo[] = [
  {
    id: "1",
    societyImage: "",
    societyId: "1",
    taskName: "Lorem Ipsum Task 1",
    societyName: "Lorem Ipsum Society 1",
    taskDescription:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed cursus tincidunt mauris, id interdum ligula tincidunt a. Integer feugiat suscipit justo, vel congue lorem feugiat id. Sed vulputate eros et libero vulputate.",
    taskDifficulty: TaskDifficulty.Hard,
    taskPoints: 50,
    promotion: "",
    taskAvailability: true,
    completed: false
  },
  {
    id: "2",
    societyImage: "",
    taskName: "Lorem Ipsum Task 2",
    societyName: "Lorem Ipsum Society 2",
    societyId: "2",
    taskDescription:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed cursus tincidunt mauris, id interdum ligula tincidunt a. Integer feugiat suscipit justo, vel congue lorem feugiat id. Sed vulputate eros et libero vulputate.",
    taskDifficulty: TaskDifficulty.Hard,
    taskPoints: 20,
    promotion: "",
    taskAvailability: true,
    completed: false
  },
  {
    id: "3",
    societyImage: "",
    taskName: "Lorem Ipsum Task 3",
    societyName: "Lorem Ipsum Society 3",
    societyId: "3",
    taskDescription:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed cursus tincidunt mauris, id interdum ligula tincidunt a. Integer feugiat suscipit justo, vel congue lorem feugiat id. Sed vulputate eros et libero vulputate.",
    taskDifficulty: TaskDifficulty.Medium,
    taskPoints: 80,
    promotion: "",
    taskAvailability: true,
    completed: false
  },
];

export const placeholderAdminTasksData = [
  {
    societyId: "1",
    societyName: "Lorem Ipsum 1",
    tasks: placeholderTaskData,
  },
  {
    societyId: "2",
    societyName: "Lorem Ipsum 2",
    tasks: placeholderTaskData,
  },
];

export const placeholderAdminsData: SocietyAdminData[] = [
  {
    societyId: "1",
    societyName: "Lorem Ipsum Society 1",
    admins: [
      {
        id: "1",
        name: "Lorem Ipsum",
      },
      {
        id: "2",
        name: "Lorem Ipsum",
      },
      {
        id: "3",
        name: "Lorem Ipsum",
      },
    ],
  },
  {
    societyId: "2",
    societyName: "Lorem Ipsum Society 2",
    admins: [
      {
        id: "1",
        name: "Lorem Ipsum",
      },
      {
        id: "2",
        name: "Lorem Ipsum",
      },
      {
        id: "3",
        name: "Lorem Ipsum",
      },
    ],
  },
];
