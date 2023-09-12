export interface taskInfo {
  id: string;
  isSponsorTask: boolean;
  title: string;
  description: string;
  society: string;
  difficulty: string;
  points: number;
  userCompleted: boolean;
}

export interface taskCardInfo {
  id: string;
  societyImage?: string;
  taskName: string;
  societyName: string;
  societyId: string;
  taskDescription: string;
  taskDifficulty: TaskDifficultyEnum;
  taskPoints: number;
}

export enum TaskDifficultyEnum {
  Hard,
  Medium,
  Easy,
}

export type SocietyAdminData = {
  societyId: string;
  societyName: string;
  admins: {
    id: string;
    name: string;
  }[];
};
