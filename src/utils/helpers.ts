export const ConvertDifficultyToString = (difficulty: number): string => {
  if (difficulty === 0) return "Hard";
  if (difficulty === 1) return "Medium";
  return "Easy";
};
