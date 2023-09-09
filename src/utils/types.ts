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
  taskDescription: string;
  taskDifficulty: "Hard" | "Medium" | "Easy";
  taskPoints: number;
}
