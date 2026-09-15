"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { formatMMSS } from "@/lib/pacing";
import { Callout, Card, Eyebrow, Meter, TonalCard } from "@/components/ui";

/** Single multiple-choice question used by the mock simulator. */
export type MockQuestion = {
  id: string;
  subject: string;
  topic: string;
  stem: string;
  /** Options A–D in display order. */
  options: [string, string, string, string];
  /** Index of the correct option (0–3). */
  answerIndex: 0 | 1 | 2 | 3;
  difficulty?: string;
  timeTargetSec?: number;
};

/** Parallel to `questions`: selected option index, or null when skipped. */
export type MockAnswers = (number | null)[];

type ExamSimulatorProps = {
  questions: MockQuestion[];
  /** Total exam time in seconds (e.g. 900 for a 15-minute quick mock). */
  durationSec: number;
  onComplete: (answers: MockAnswers, timeSpentSec: number) => void;
};

const OPTION_LABELS = ["A", "B", "C", "D"] as const;

const RULES = [
  "Full timer — the clock never pauses.",
  "No explanations and no hints during the exam.",
  "Flag tough questions and return to them later.",
  "Jump freely with Previous / Next and the question navigator.",
  "Auto-submit when the timer hits 00:00.",
] as const;

export default function ExamSimulator({
  questions,
  durationSec,
  onComplete,
}: ExamSimulatorProps) {
  const [phase, setPhase] = useState<"rules" | "running">("rules");
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<MockAnswers>(() =>
    questions.map(() => null),
  );
  const [flagged, setFlagged] = useState<boolean[]>(() =>
    questions.map(() => false),
  );
  const [timeLeft, setTimeLeft] = useState(durationSec);
  const finishRef = useRef(false);
  const answersRef = useRef(answers);
  answersRef.current = answers;

  const total = questions.length;
  const answeredCount = useMemo(
    () => answers.filter((a) => a !== null).length,
    [answers],
  );

  // Countdown + auto-submit on timeout.
  useEffect(() => {
    if (phase !== "running") return;
    if (total === 0) return;
    const id: ReturnType<typeof setInterval> = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(id);
          if (!finishRef.current) {
            finishRef.current = true;
            onComplete(answersRef.current, durationSec);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [phase, total, durationSec, onComplete]);

  if (total === 0) {
    return (
      <Card tone="amber">
        <p className="font-display font-bold text-white">No questions available.</p>
        <p className="mt-1 text-sm text-slate-400">
          The question bank for this mode is empty.
        </p>
      </Card>
    );
  }

  if (phase === "rules") {
    return (
      <TonalCard tone="amber" className="sm:p-8">
        <Eyebrow tone="amber">Simulation rules</Eyebrow>
        <h2 className="mt-3 font-display text-2xl font-bold text-white">
          <span className="font-mono tabular-nums">{total}</span> questions ·{" "}
          <span className="font-mono tabular-nums">{formatMMSS(durationSec)}</span>
        </h2>
        <ul className="mt-4 space-y-2 text-sm leading-relaxed text-slate-300">
          {RULES.map((rule, i) => (
            <li
              key={rule}
              className="flex items-start gap-3 rounded-xl border border-amber-400/15 bg-slate-950/60 px-3 py-2"
            >
              <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-amber-400/30 bg-amber-400/10 font-mono text-[11px] font-bold text-amber-200">
                {i + 1}
              </span>
              <span>{rule}</span>
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={() => setPhase("running")}
          className="mt-6 rounded-2xl bg-white px-6 py-3 text-sm font-bold text-slate-950 shadow-lg transition hover:bg-amber-100"
        >
          Start exam
        </button>
        <p className="mt-2 text-[11px] font-bold uppercase tracking-widest text-slate-500">
          Timer starts immediately
        </p>
      </TonalCard>
    );
  }

  const q = questions[index];
  const selected = answers[index];
  const lowTime = timeLeft < 300;

  const choose = (opt: number) => {
    setAnswers((prev) => prev.map((a, i) => (i === index ? opt : a)));
  };

  const toggleFlag = () => {
    setFlagged((prev) => prev.map((f, i) => (i === index ? !f : f)));
  };

  const submit = () => {
    if (finishRef.current) return;
    finishRef.current = true;
    onComplete(answers, durationSec - timeLeft);
  };

  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-slate-950 shadow-[0_18px_60px_-20px_rgba(0,0,0,0.9)]">
      {/* Status bar: QUESTION x/y + timer */}
      <div className="border-b border-white/10 bg-white/[0.02] px-4 py-3 sm:px-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-[11px] font-bold uppercase tracking-widest text-slate-500">
            Question{" "}
            <span className="font-mono text-sm text-white tabular-nums">
              {index + 1}/{total}
            </span>
          </p>
          <p
            className={`inline-flex items-center gap-2 rounded-xl border px-3 py-1.5 font-mono text-sm font-bold tabular-nums ${
              lowTime
                ? "border-rose-400/40 bg-rose-500/15 text-rose-200"
                : "border-white/10 bg-white/[0.04] text-white"
            }`}
            aria-live="polite"
          >
            <span
              aria-hidden="true"
              className={`h-2 w-2 rounded-full ${lowTime ? "bg-rose-400" : "bg-emerald-400"}`}
            />
            {formatMMSS(timeLeft)}
          </p>
          <p className="w-full font-mono text-xs font-bold tabular-nums text-slate-400 sm:w-auto">
            {answeredCount}/{total} answered
            {flagged.some(Boolean)
              ? ` · ${flagged.filter(Boolean).length} flagged`
              : ""}
          </p>
        </div>
        <div className="mt-2.5">
          <Meter
            value={total > 0 ? (answeredCount / total) * 100 : 0}
            tone="amber"
          />
        </div>
      </div>

      <div className="grid gap-4 p-4 sm:p-5 lg:grid-cols-[1fr_240px]">
        {/* Question card */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
          <p className="text-[11px] font-bold uppercase tracking-widest text-slate-500">
            {q.topic}
            {q.difficulty ? ` · ${q.difficulty}` : ""}
          </p>
          <p className="mt-2 text-lg font-medium leading-relaxed text-slate-100">{q.stem}</p>

          <div className="mt-4 space-y-2" role="radiogroup" aria-label="Options">
            {q.options.map((opt, i) => {
              const active = selected === i;
              return (
                <button
                  key={OPTION_LABELS[i]}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => choose(i)}
                  className={`flex w-full items-start gap-3 rounded-xl border px-4 py-3 text-left transition ${
                    active
                      ? "border-amber-300/60 bg-amber-400/10 font-semibold text-white"
                      : "border-white/10 text-slate-200 hover:border-white/30 hover:bg-white/5"
                  }`}
                >
                  <span
                    className={`inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md border font-mono text-xs font-bold ${
                      active
                        ? "border-amber-300/50 bg-amber-400/20 text-amber-100"
                        : "border-white/15 text-slate-400"
                    }`}
                  >
                    {OPTION_LABELS[i]}
                  </span>
                  <span>{opt}</span>
                </button>
              );
            })}
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={toggleFlag}
              aria-pressed={flagged[index]}
              className={`rounded-xl border px-4 py-2 text-sm font-bold transition ${
                flagged[index]
                  ? "border-amber-400/40 bg-amber-400/15 text-amber-100"
                  : "border-white/15 bg-white/[0.03] text-white hover:bg-white/10"
              }`}
            >
              {flagged[index] ? "★ Unflag" : "☆ Flag"}
            </button>
            <button
              type="button"
              onClick={() => setIndex((i) => Math.max(0, i - 1))}
              disabled={index === 0}
              className="rounded-xl border border-white/15 bg-white/[0.03] px-4 py-2 text-sm font-bold text-white transition hover:bg-white/10 disabled:opacity-40"
            >
              ← Previous
            </button>
            {index < total - 1 ? (
              <button
                type="button"
                onClick={() => setIndex((i) => Math.min(total - 1, i + 1))}
                className="rounded-xl bg-white px-4 py-2 text-sm font-bold text-slate-950 shadow-lg transition hover:bg-amber-100"
              >
                Next →
              </button>
            ) : (
              <button
                type="button"
                onClick={submit}
                className="rounded-xl bg-white px-4 py-2 font-mono text-sm font-bold tabular-nums text-slate-950 shadow-lg transition hover:bg-amber-100"
              >
                Submit ({answeredCount}/{total})
              </button>
            )}
          </div>
          {lowTime && (
            <div className="mt-4">
              <Callout tone="rose" title="Under 5 minutes">
                The terminal auto-submits at 00:00. Sweep flagged questions now.
              </Callout>
            </div>
          )}
        </div>

        {/* Question navigator grid */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
          <p className="text-[11px] font-bold uppercase tracking-widest text-slate-500">
            Navigator
          </p>
          <div className="mt-3 grid grid-cols-6 gap-1.5 lg:grid-cols-4">
            {questions.map((item, i) => {
              const isCurrent = i === index;
              const isAnswered = answers[i] !== null;
              const isFlagged = flagged[i];
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Question ${i + 1}${isAnswered ? ", answered" : ""}${isFlagged ? ", flagged" : ""}`}
                  className={`rounded-lg border px-0 py-1.5 font-mono text-xs font-bold tabular-nums transition ${
                    isCurrent
                      ? "border-white bg-white text-slate-950"
                      : isAnswered
                        ? "border-emerald-400/40 bg-emerald-400/20 text-emerald-100 hover:bg-emerald-400/30"
                        : "border-white/10 text-slate-400 hover:bg-white/5"
                  } ${isFlagged && !isCurrent ? "ring-2 ring-amber-400" : ""} ${isFlagged && isCurrent ? "outline outline-2 outline-amber-400" : ""}`}
                >
                  {i + 1}
                </button>
              );
            })}
          </div>
          <button
            type="button"
            onClick={submit}
            className="mt-4 w-full rounded-xl border border-white/15 bg-white/[0.03] px-4 py-2 text-sm font-bold text-white transition hover:bg-white/10"
          >
            Submit exam
          </button>
          <p className="mt-2 text-xs leading-relaxed text-slate-500">
            Auto-submits at 00:00. Unanswered questions count as skipped.
          </p>
        </div>
      </div>
    </div>
  );
}
