/**
 * Exam pacing helpers for CSCA-Prep mock exams.
 *
 * Context (teregttomack.txt Sec 20): for a 48-question / 60-minute paper the
 * average budget is ~75s per question. The phased strategy below is a
 * *suggested* study tactic, not an official exam rule.
 */

export const SEC_PER_QUESTION = 75;

/** Total-exam budget in seconds for a full 48q / 60m paper. */
export const FULL_MOCK_SEC = 48 * SEC_PER_QUESTION; // 3600

export type PacingPhase = {
  /** Phase start in minutes from the exam clock. */
  startMin: number;
  /** Phase end in minutes from the exam clock. */
  endMin: number;
  /** Short label, e.g. "0–30 min — Easy + Medium". */
  label: string;
  /** What to work on during this phase. */
  focus: string;
  /** One-line guidance shown in the UI. */
  detail: string;
};

/**
 * Suggested pacing strategy (not an official rule):
 * 0–30m easy+medium, 30–45m difficult, 45–55m flagged, 55–60m review.
 */
export const PACING_STRATEGY: PacingPhase[] = [
  {
    startMin: 0,
    endMin: 30,
    label: "0–30 min — Easy + Medium",
    focus: "Answer every easy and medium question first.",
    detail: "Bank marks early. Skip anything that resists after ~75s and flag it.",
  },
  {
    startMin: 30,
    endMin: 45,
    label: "30–45 min — Difficult",
    focus: "Attack the difficult questions you skipped.",
    detail: "Spend earned time here only — easy marks are already secured.",
  },
  {
    startMin: 45,
    endMin: 55,
    label: "45–55 min — Flagged",
    focus: "Return to flagged questions.",
    detail: "Second pass with fresh eyes; eliminate options before guessing.",
  },
  {
    startMin: 55,
    endMin: 60,
    label: "55–60 min — Review",
    focus: "Final review, never submit with blanks.",
    detail: "Check misreads and bubbles. Answer everything — no penalty for guessing.",
  },
];

/**
 * Average seconds allowed per question for any paper shape.
 * Falls back to SEC_PER_QUESTION (75s) for invalid input.
 */
export function perQuestionBudget(
  totalQuestions: number,
  totalSec: number,
): number {
  if (!Number.isFinite(totalQuestions) || totalQuestions <= 0) return SEC_PER_QUESTION;
  if (!Number.isFinite(totalSec) || totalSec <= 0) return SEC_PER_QUESTION;
  return Math.round(totalSec / totalQuestions);
}

/**
 * Which pacing phase the elapsed clock is in.
 * `elapsedSec` is seconds since the exam started.
 */
export function pacingPhaseAt(elapsedSec: number): PacingPhase {
  const elapsedMin = Math.max(0, elapsedSec / 60);
  const found = PACING_STRATEGY.find(
    (p) => elapsedMin >= p.startMin && elapsedMin < p.endMin,
  );
  return found ?? PACING_STRATEGY[PACING_STRATEGY.length - 1];
}

/** Format seconds as mm:ss for the countdown display. */
export function formatMMSS(totalSec: number): string {
  const s = Math.max(0, Math.ceil(totalSec));
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${String(m).padStart(2, "0")}:${String(r).padStart(2, "0")}`;
}
