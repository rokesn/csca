"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  SAMPLE_QUESTIONS,
  cscaStandardQuestions
} from "../../../data/questions";
import QuestionCard from "../../../components/question-card";
import QuestionExplanation from "../../../components/question-explanation";
import { saveAttempt } from "../../../lib/progress-store";
import {
  BackLink,
  Callout,
  Card,
  Meter,
  PageHeader,
  TonalCard
} from "../../../components/ui";

const TIMED_COUNT = 10;
const TIMED_SECONDS = 12 * 60; // 12 minutes

function formatClock(totalSec: number): string {
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function TimedInner() {
  const searchParams = useSearchParams();
  const topicParam = searchParams.get("topic");

  // Timed set: CSCA Standard only (Spec Sec 6 Stage 4: 10 questions, 12 minutes).
  // ?topic= filters the CSCA Standard bank; default is all CSCA Standard.
  const questions = useMemo(() => {
    const standard = cscaStandardQuestions();
    if (topicParam && topicParam !== "all") {
      const scoped = standard.filter((q) => q.topic === topicParam);
      if (scoped.length > 0) return scoped.slice(0, TIMED_COUNT);
    }
    const pool =
      standard.length >= TIMED_COUNT ? standard : SAMPLE_QUESTIONS;
    return pool.slice(0, TIMED_COUNT);
  }, [topicParam]);

  const [answers, setAnswers] = useState<Record<string, number | null>>({});
  const [flagged, setFlagged] = useState<Record<string, boolean>>({});
  const [index, setIndex] = useState(0);
  const [remaining, setRemaining] = useState(TIMED_SECONDS);
  const [submitted, setSubmitted] = useState(false);
  const savedRef = useRef(false);

  // Countdown with auto-submit at 0.
  useEffect(() => {
    if (submitted) return;
    if (remaining <= 0) {
      setSubmitted(true);
      return;
    }
    const t = setTimeout(() => setRemaining((r) => r - 1), 1000);
    return () => clearTimeout(t);
  }, [remaining, submitted]);

  // On finish, save attempts for each answered question with its time share.
  useEffect(() => {
    if (!submitted) return;
    if (savedRef.current) return;
    savedRef.current = true;
    const used = TIMED_SECONDS - Math.max(0, remaining);
    const share = Math.max(
      1,
      Math.round(used / Math.max(1, questions.length))
    );
    const date = new Date().toISOString();
    questions.forEach((x) => {
      const ans = answers[x.id];
      if (ans !== null && ans !== undefined) {
        saveAttempt({
          qid: x.id,
          topic: x.topic,
          difficulty: x.difficulty,
          correct: ans === x.answer,
          timeSec: share,
          date
        });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitted]);

  const q = questions[index];
  const answeredCount = questions.filter(
    (x) => answers[x.id] !== null && answers[x.id] !== undefined
  ).length;
  const correctCount = questions.filter(
    (x) => answers[x.id] === x.answer
  ).length;
  const flaggedCount = Object.values(flagged).filter(Boolean).length;
  const timePct = Math.max(0, Math.min(100, (remaining / TIMED_SECONDS) * 100));
  const urgent = remaining < 60;

  const reset = () => {
    setAnswers({});
    setFlagged({});
    setIndex(0);
    setRemaining(TIMED_SECONDS);
    setSubmitted(false);
    savedRef.current = false;
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 text-slate-200">
      <div className="flex flex-wrap gap-4">
        <BackLink href="/">← Home</BackLink>
        <BackLink href="/practice">← Practice</BackLink>
      </div>
      <div className="mt-3">
        <PageHeader
          eyebrow="Timed Practice · CSCA Standard only"
          title="Timed Practice"
          desc={`CSCA Standard only · ${TIMED_COUNT} questions · ${TIMED_SECONDS / 60} minutes · auto-submit at 0:00. No explanations during the run.${topicParam && topicParam !== "all" ? ` · Topic: ${topicParam}` : ""}`}
          tone="emerald"
        />
      </div>

      {!submitted ? (
        <>
          <TonalCard tone="emerald" className="mt-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span
                aria-live="polite"
                className={`inline-flex items-center rounded-xl border px-3 py-1.5 font-mono text-lg font-bold tabular-nums ${
                  urgent
                    ? "border-rose-400/40 bg-rose-500/15 text-rose-200"
                    : "border-white/10 bg-slate-950 text-white"
                }`}
              >
                {formatClock(remaining)}
              </span>
              <span className="font-mono text-sm font-bold tabular-nums text-slate-200">
                {answeredCount}/{questions.length}
                <span className="ml-2 font-sans text-xs font-semibold text-slate-400">
                  answered · {flaggedCount} flagged
                </span>
              </span>
              <button
                type="button"
                onClick={() => setSubmitted(true)}
                className="rounded-xl bg-white px-4 py-2 text-sm font-bold text-slate-950 shadow-lg transition hover:bg-emerald-100"
              >
                Submit now
              </button>
            </div>
            <div className="mt-3">
              <Meter value={timePct} tone={urgent ? "rose" : "emerald"} />
              <p className="mt-1.5 text-[11px] font-bold uppercase tracking-widest text-slate-500">
                Time remaining
              </p>
            </div>
          </TonalCard>

          {/* Navigator */}
          <Card tone="emerald" className="mt-4">
            <p className="text-[11px] font-bold uppercase tracking-widest text-slate-500">
              Navigator
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {questions.map((x, i) => {
                const done =
                  answers[x.id] !== null && answers[x.id] !== undefined;
                const isCurrent = i === index;
                const isFlagged = !!flagged[x.id];
                return (
                  <button
                    key={x.id}
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-label={`Go to question ${i + 1}${flagged[x.id] ? " (flagged)" : ""}`}
                    className={`h-9 w-9 rounded-lg border font-mono text-sm font-bold tabular-nums transition ${
                      isCurrent
                        ? "border-white bg-white text-slate-950"
                        : done
                          ? "border-emerald-400/40 bg-emerald-400/20 text-emerald-100 hover:bg-emerald-400/30"
                          : "border-white/15 text-slate-300 hover:bg-white/5"
                    } ${isFlagged && !isCurrent ? "ring-2 ring-amber-400" : ""}`}
                  >
                    {flagged[x.id] ? `★${i + 1}` : i + 1}
                  </button>
                );
              })}
            </div>
          </Card>

          {urgent && (
            <div className="mt-4">
              <Callout tone="amber" title="Under a minute left">
                Finish your current question — the set auto-submits at 0:00.
              </Callout>
            </div>
          )}

          {q && (
            <div className="mt-4">
              <QuestionCard
                question={q}
                selected={answers[q.id] ?? null}
                onSelect={(idx) =>
                  setAnswers((p) => ({ ...p, [q.id]: idx }))
                }
                flagged={!!flagged[q.id]}
                onToggleFlag={() =>
                  setFlagged((p) => ({ ...p, [q.id]: !p[q.id] }))
                }
                timerSec={remaining}
                timerLabel="Remaining"
                questionNumber={index + 1}
                totalCount={questions.length}
              />
              <div className="mt-3 flex justify-between gap-2">
                <button
                  type="button"
                  disabled={index === 0}
                  onClick={() => setIndex((i) => Math.max(0, i - 1))}
                  className="rounded-xl border border-white/15 bg-white/[0.03] px-4 py-2 text-sm font-bold text-white transition hover:bg-white/10 disabled:opacity-40"
                >
                  ← Previous
                </button>
                <button
                  type="button"
                  disabled={index === questions.length - 1}
                  onClick={() =>
                    setIndex((i) => Math.min(questions.length - 1, i + 1))
                  }
                  className="rounded-xl border border-white/15 bg-white/[0.03] px-4 py-2 text-sm font-bold text-white transition hover:bg-white/10 disabled:opacity-40"
                >
                  Next →
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          <div className="mt-5">
            <Callout
              tone="emerald"
              title={remaining <= 0 ? "Time up — auto-submitted." : "Submitted."}
            >
              <span className="font-mono font-bold tabular-nums">
                Score {correctCount}/{questions.length} · Answered{" "}
                {answeredCount}/{questions.length}
              </span>
              <span className="mt-1 block">
                Review each question below, then practice similar topics or retry
                the timer.
              </span>
            </Callout>
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={reset}
                className="rounded-2xl bg-white px-5 py-2.5 text-sm font-bold text-slate-950 shadow-lg transition hover:bg-emerald-100"
              >
                Retry timed set
              </button>
              <Link
                href="/practice"
                className="inline-flex items-center gap-1.5 rounded-2xl border border-white/15 bg-white/[0.03] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-white/10"
              >
                Back to untimed practice
              </Link>
            </div>
          </div>
          <div className="mt-6 grid gap-6">
            {questions.map((x, i) => (
              <div key={x.id} className="grid gap-3">
                <QuestionCard
                  question={x}
                  selected={answers[x.id] ?? null}
                  onSelect={() => {}}
                  flagged={!!flagged[x.id]}
                  onToggleFlag={() => {}}
                  questionNumber={i + 1}
                  totalCount={questions.length}
                  disabled
                />
                <QuestionExplanation
                  question={x}
                  userAnswer={answers[x.id] ?? null}
                />
              </div>
            ))}
          </div>
        </>
      )}
    </main>
  );
}

export default function TimedPracticePage() {
  return (
    <Suspense fallback={null}>
      <TimedInner />
    </Suspense>
  );
}
