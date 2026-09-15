export type PlanMode = "30" | "14" | "7" | "3" | "1";

export function getPlanMode(daysLeft: number | null): PlanMode {
  if (daysLeft === null || daysLeft > 14) return "30";
  if (daysLeft > 7) return "14";
  if (daysLeft > 3) return "7";
  if (daysLeft > 1) return "3";
  return "1";
}
