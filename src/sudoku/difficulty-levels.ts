export const DifficultyLevel = { Easy: 20, Medium: 40, Hard: 60 } as const;
export type DifficultyLevel =
  (typeof DifficultyLevel)[keyof typeof DifficultyLevel];

export const DIFFICULTY_METADATA = [
  { level: DifficultyLevel.Easy, label: "Easy" },
  { level: DifficultyLevel.Medium, label: "Medium" },
  { level: DifficultyLevel.Hard, label: "Hard" },
] as const;
