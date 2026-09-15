/**
 * Exam readiness calculator (teregttomack.txt Sec 22).
 *
 * Combines five 0–100 signals into a single Preparation Readiness %.
 * Readiness estimates study completeness — it is NEVER a pass guarantee.
 */

export type ReadinessStatus =
  | "Not ready"
  | "Building"
  | "Almost ready"
  | "Exam ready";

export type ReadinessInput = {
  /** Do you understand the concepts? (0–100) */
  knowledge: number;
  /** Do you answer correctly? (0–100) */
  accuracy: number;
  /** Can you perform under time pressure? (0–100) */
  speed: number;
  /** Are mock scores stable across attempts? (0–100) */
  mockConsistency: number;
  /**
   * Weak-topic coverage score (0–100, higher = fewer weak areas).
   * Named after Sec 22 ("Weak topics 72%").
   */
  weakTopics: number;
  /** Optional topic names driving the focus message, e.g. ["Probability"]. */
  weakTopicNames?: string[];
};

export type ReadinessResult = {
  /** Weighted overall readiness, 0–100. */
  overall: number;
  status: ReadinessStatus;
  /** What to work on next, e.g. "focus on speed and Probability". */
  focus: string;
  breakdown: {
    knowledge: number;
    accuracy: number;
    speed: number;
    mockConsistency: number;
    weakTopics: number;
  };
  /** Fixed disclaimer — readiness is not a pass guarantee. */
  disclaimer: string;
};

const WEIGHTS = {
  knowledge: 0.25,
  accuracy: 0.25,
  speed: 0.2,
  mockConsistency: 0.15,
  weakTopics: 0.15,
} as const;

export const READINESS_DISCLAIMER =
  "Preparation readiness estimates study completeness — it is not a pass guarantee. " +
  "Always verify final requirements with your target university and official CSCA info.";

function clamp(n: number): number {
  if (!Number.isFinite(n)) return 0;
  return Math.min(100, Math.max(0, Math.round(n)));
}

function statusFor(overall: number): ReadinessStatus {
  if (overall >= 90) return "Exam ready";
  if (overall >= 75) return "Almost ready";
  if (overall >= 60) return "Building";
  return "Not ready";
}

const FOCUS_HINT: Record<keyof typeof WEIGHTS, string> = {
  knowledge: "concept review",
  accuracy: "accuracy drills with error logging",
  speed: "timed practice",
  mockConsistency: "regular full mocks",
  weakTopics: "weak-topic repair",
};

/**
 * Readiness formula: weighted mean of the five signals.
 *   overall = 0.25*knowledge + 0.25*accuracy + 0.20*speed
 *           + 0.15*mockConsistency + 0.15*weakTopics
 * Status: Not ready <60, Building 60–74, Almost ready 75–89, Exam ready 90+.
 */
export function calcReadiness(input: ReadinessInput): ReadinessResult {
  const breakdown = {
    knowledge: clamp(input.knowledge),
    accuracy: clamp(input.accuracy),
    speed: clamp(input.speed),
    mockConsistency: clamp(input.mockConsistency),
    weakTopics: clamp(input.weakTopics),
  };

  const overall = Math.round(
    breakdown.knowledge * WEIGHTS.knowledge +
      breakdown.accuracy * WEIGHTS.accuracy +
      breakdown.speed * WEIGHTS.speed +
      breakdown.mockConsistency * WEIGHTS.mockConsistency +
      breakdown.weakTopics * WEIGHTS.weakTopics,
  );

  const status = statusFor(overall);

  const weakest = (
    Object.keys(WEIGHTS) as (keyof typeof WEIGHTS)[]
  ).reduce((a, b) => (breakdown[a] <= breakdown[b] ? a : b));

  const topics =
    input.weakTopicNames?.filter((t) => t.trim().length > 0) ?? [];
  const topicSuffix = topics.length > 0 ? ` and ${topics.join(", ")}` : "";
  const focus =
    weakest === "weakTopics" && topics.length > 0
      ? `Focus on ${topics.join(", ")} before the next mock.`
      : `Focus on ${FOCUS_HINT[weakest]}${topicSuffix}.`.replace(
          " and .",
          ".",
        );

  return {
    overall,
    status,
    focus,
    breakdown,
    disclaimer: READINESS_DISCLAIMER,
  };
}
