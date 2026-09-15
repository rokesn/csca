"use client";

import type { Difficulty, Question } from "../data/questions";
import { toneBadge, type Tone } from "./ui";

const OPTION_LABELS = ["A", "B", "C", "D"];

const DIFFICULTY_TONE: Record<Difficulty, Tone> = {
  Foundation: "slate",
  Basic: "cyan",
  "CSCA Standard": "emerald",
  Challenging: "amber",
  Advanced: "rose",
};

export function formatTime(totalSec: number): string {
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

interface QuestionCardProps {
  question: Question;
  /** 0-3 or null when unanswered */
  selected: number | null;
  onSelect: (index: number) => void;
  flagged: boolean;
  onToggleFlag: () => void;
  /** Seconds elapsed on this question (practice) or remaining (timed). */
  timerSec?: number;
  /** Label shown above the timer, e.g. "Elapsed" or "Remaining". */
  timerLabel?: string;
  questionNumber?: number;
  totalCount?: number;
  /** When true (after submit), options are locked. */
  disabled?: boolean;
}

export default function QuestionCard({
  question,
  selected,
  onSelect,
  flagged,
  onToggleFlag,
  timerSec,
  timerLabel = "Time",
  questionNumber,
  totalCount,
  disabled = false
}: QuestionCardProps) {
  return (
    <article className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.02] p-5 shadow-[0_10px_36px_-16px_rgba(0,0,0,0.8)]">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2 text-xs font-medium">
          {typeof questionNumber === "number" &&
            typeof totalCount === "number" && (
              <span className="rounded-full bg-white/10 px-2.5 py-0.5 font-mono text-slate-300">
                Q {questionNumber}/{totalCount}
              </span>
            )}
          <span
            className={`rounded-full border px-2.5 py-0.5 text-xs font-bold ${toneBadge[DIFFICULTY_TONE[question.difficulty]]}`}
          >
            {question.difficulty}
          </span>
          <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-slate-400">
            {question.topic} · {question.subtopic}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {typeof timerSec === "number" && (
            <span
              aria-live="polite"
              className="rounded-full bg-white/10 px-2.5 py-0.5 font-mono text-xs text-slate-200"
            >
              {timerLabel}: {formatTime(timerSec)}
            </span>
          )}
          <button
            type="button"
            onClick={onToggleFlag}
            aria-pressed={flagged}
            className={`rounded-lg border px-3 py-1 text-xs font-semibold ${
              flagged
                ? "border-amber-400/30 bg-amber-400/10 text-amber-200"
                : "border-white/15 text-slate-300 hover:bg-white/5"
            }`}
          >
            {flagged ? "★ Flagged" : "☆ Flag"}
          </button>
        </div>
      </div>

      <h2 className="mt-4 text-lg font-medium leading-relaxed text-slate-100">
        {question.stem}
      </h2>

      <div
        role="radiogroup"
        aria-label={`Options for ${question.id}`}
        className="mt-4 grid gap-2"
      >
        {question.options.map((opt, i) => {
          const isSelected = selected === i;
          return (
            <button
              key={i}
              type="button"
              role="radio"
              aria-checked={isSelected}
              disabled={disabled}
              onClick={() => onSelect(i)}
              className={`flex items-center gap-3 rounded-2xl border px-4 py-3 text-left transition ${
                isSelected
                  ? "border-white bg-white/10 font-semibold text-white"
                  : "border-white/10 text-slate-200 hover:bg-white/5"
              } ${disabled ? "cursor-not-allowed opacity-70" : "cursor-pointer"}`}
            >
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                  isSelected
                    ? "bg-white text-slate-950"
                    : "bg-white/10 text-slate-300"
                }`}
              >
                {OPTION_LABELS[i]}
              </span>
              <span>{opt}</span>
            </button>
          );
        })}
      </div>

      <p className="mt-3 font-mono text-xs text-slate-400">
        Target: ~{question.estimatedTimeSec}s · ID {question.id}
      </p>
    </article>
  );
}
