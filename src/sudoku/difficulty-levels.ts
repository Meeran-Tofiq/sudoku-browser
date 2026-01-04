export const DifficultyLevel = { Easy: 20, Medium: 40, Hard: 60 } as const;
export type DifficultyLevel =
  (typeof DifficultyLevel)[keyof typeof DifficultyLevel];
