/**
 * lib/recommender.ts
 * Pure "What should I study now?" recommender for CSCA-Prep.com (Sec 26).
 *
 * Analyzes exam date, weak topics, recent performance, mistakes, and
 * available time — no DB, no network, no AI. Deterministic and testable.
 */

export const ERROR_TYPES = [
  "concept",
  "forgot-formula",
  "calculation",
  "misread",
  "time",
  "guessed",
] as const;

export type ErrorType = (typeof ERROR_TYPES)[number];

export interface WeakTopic {
  topicSlug: string;
  /** 0-100 accuracy, lower = weaker */
  accuracy: number;
  avgTimeSecs?: number;
  attempts?: number;
}

export interface RecentAttempt {
  topicSlug: string;
  correct: boolean;
  timeSecs?: number;
  date?: string | Date;
}

export interface MistakeInput {
  topicSlug?: string;
  errorType?: string;
  date?: string | Date;
}

export interface RecommendInput {
  examDate?: string | Date | null;
  weakTopics?: WeakTopic[];
  recentAttempts?: RecentAttempt[];
  mistakes?: MistakeInput[];
  /** minutes the student has right now */
  minutesAvailable?: number;
}

export interface Recommendation {
  topicSlug: string;
  /** suggested number of questions */
  count: number;
  /** human reason, e.g. "Accuracy 58% weakest Math topic" */
  reason: string;
}

const FALLBACK_TOPIC = "functions";

function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}

/** Questions take ~3 min each with review (75s exam pace + explanation). */
export function questionsForMinutes(minutesAvailable: number): number {
  if (!Number.isFinite(minutesAvailable) || minutesAvailable <= 0) return 10;
  return clamp(Math.floor(minutesAvailable / 3), 5, 30);
}

export function daysUntilExam(examDate?: string | Date | null, now = new Date()): number | null {
  if (!examDate) return null;
  const d = examDate instanceof Date ? examDate : new Date(examDate);
  if (Number.isNaN(d.getTime())) return null;
  const ms = d.getTime() - now.getTime();
  return Math.ceil(ms / (1000 * 60 * 60 * 24));
}

function urgencySuffix(examDate?: string | Date | null): string {
  const days = daysUntilExam(examDate);
  if (days === null) return "";
  if (days < 0) return " • Exam date passed — run a full mock to recalibrate";
  if (days <= 1) return " • Exam tomorrow — keep it light, review only";
  if (days <= 7) return ` • Exam in ${days}d — prioritize timed practice`;
  if (days <= 14) return ` • Exam in ${days}d — mix timed sets with weak topics`;
  return "";
}

/**
 * Pick the next topic to practice.
 *
 * Priority:
 *  1. Weakest topic by accuracy (explicit signal wins)
 *  2. Topic with the most logged mistakes
 *  3. Worst recent-accuracy topic from recent attempts
 *  4. Fallback to high-weight Functions (per diagnostic weighting)
 */
export function recommendNext(input: RecommendInput): Recommendation {
  const {
    examDate = null,
    weakTopics = [],
    recentAttempts = [],
    mistakes = [],
    minutesAvailable = 45,
  } = input ?? {};

  const count = questionsForMinutes(minutesAvailable);
  const suffix = urgencySuffix(examDate);

  // 1. Explicit weak topics — lowest accuracy wins.
  const rankedWeak = [...weakTopics]
    .filter((t) => t && typeof t.topicSlug === "string" && Number.isFinite(t.accuracy))
    .sort((a, b) => a.accuracy - b.accuracy);

  if (rankedWeak.length > 0) {
    const weakest = rankedWeak[0];
    return {
      topicSlug: weakest.topicSlug,
      count,
      reason: `Accuracy ${Math.round(weakest.accuracy)}% weakest Math topic${suffix}`,
    };
  }

  // 2. Mistake book — most-mistaken topic wins.
  const mistakeCounts = new Map<string, number>();
  for (const m of mistakes) {
    if (m?.topicSlug) mistakeCounts.set(m.topicSlug, (mistakeCounts.get(m.topicSlug) ?? 0) + 1);
  }
  if (mistakeCounts.size > 0) {
    const [topSlug, topCount] = Array.from(mistakeCounts.entries()).sort((a, b) => b[1] - a[1])[0];
    return {
      topicSlug: topSlug,
      count,
      reason: `${topCount} mistake${topCount === 1 ? "" : "s"} in ${topSlug} — fix your mistake book first${suffix}`,
    };
  }

  // 3. Recent attempts — worst per-topic accuracy (min 3 attempts).
  const byTopic = new Map<string, { correct: number; total: number }>();
  for (const a of recentAttempts) {
    if (!a?.topicSlug) continue;
    const entry = byTopic.get(a.topicSlug) ?? { correct: 0, total: 0 };
    entry.total += 1;
    if (a.correct) entry.correct += 1;
    byTopic.set(a.topicSlug, entry);
  }
  const recentRanked = Array.from(byTopic.entries())
    .filter(([, v]) => v.total >= 3)
    .map(([slug, v]) => ({ slug, acc: (v.correct / v.total) * 100 }))
    .sort((a, b) => a.acc - b.acc);

  if (recentRanked.length > 0) {
    const worst = recentRanked[0];
    return {
      topicSlug: worst.slug,
      count,
      reason: `Recent accuracy ${Math.round(worst.acc)}% in ${worst.slug} — needs reinforcement${suffix}`,
    };
  }

  // 4. Fallback — high-weight topic, no weak signal yet.
  const days = daysUntilExam(examDate);
  if (days !== null && days <= 7) {
    return {
      topicSlug: "mixed-review",
      count,
      reason: `Exam in ${Math.max(days, 0)}d — mixed timed review across weak areas`,
    };
  }
  return {
    topicSlug: FALLBACK_TOPIC,
    count,
    reason: `No weak signal yet — start with high-weight Functions${suffix}`,
  };
}
