"use client";

import { useMemo, useState } from "react";
import ExamSimulator, {
  type MockAnswers,
  type MockQuestion,
} from "@/components/exam-simulator";
import MockResult from "@/components/mock-result";
import { SAMPLE_QUESTIONS } from "@/data/questions";
import {
  BackLink,
  Callout,
  Eyebrow,
  PrimaryLink
} from "@/components/ui";

function toMockQuestions(): MockQuestion[] {
  return SAMPLE_QUESTIONS.map((q) => ({
    id: q.id,
    subject: q.subject,
    topic: q.topic,
    stem: q.stem,
    options: q.options,
    answerIndex: q.answer as 0 | 1 | 2 | 3,
    difficulty: q.difficulty,
    timeTargetSec: q.estimatedTimeSec,
  }));
}
const FALLBACK_QUESTIONS: MockQuestion[] = [
  {
    id: "mock-q1",
    subject: "Mathematics",
    topic: "Functions",
    stem: "What is the domain of f(x) = √(x − 3)?",
    options: ["x > 3", "x ≥ 3", "x < 3", "All real numbers"],
    answerIndex: 1,
    difficulty: "Easy",
    timeTargetSec: 60,
  },
  {
    id: "mock-q2",
    subject: "Mathematics",
    topic: "Algebra",
    stem: "If x² − 5x + 6 = 0, what is the sum of the roots?",
    options: ["2", "3", "5", "6"],
    answerIndex: 2,
    difficulty: "Medium",
    timeTargetSec: 75,
  },
  {
    id: "mock-q3",
    subject: "Mathematics",
    topic: "Geometry",
    stem: "What is the distance from (0, 0) to the line 3x + 4y − 10 = 0?",
    options: ["1", "2", "5", "10"],
    answerIndex: 1,
    difficulty: "Medium",
    timeTargetSec: 75,
  },
  {
    id: "mock-q4",
    subject: "Mathematics",
    topic: "Probability",
    stem: "A fair die is rolled once. What is P(rolling an even number)?",
    options: ["1/6", "1/3", "1/2", "2/3"],
    answerIndex: 2,
    difficulty: "Medium",
    timeTargetSec: 60,
  },
  {
    id: "mock-q5",
    subject: "Mathematics",
    topic: "Calculus",
    stem: "If f(x) = x³, what is f′(x)?",
    options: ["x²", "3x", "3x²", "x³/3"],
    answerIndex: 2,
    difficulty: "Easy",
    timeTargetSec: 60,
  },
];

const MOCK_CONFIGS = {
  quick: { title: "Quick Mock", questions: 10, durationSec: 15 * 60 },
  half: { title: "Half Mock", questions: 24, durationSec: 30 * 60 },
  full: { title: "Full Mock", questions: 48, durationSec: 60 * 60 },
} as const;

type Mode = keyof typeof MOCK_CONFIGS | "final";

export default function MockModePage({ params }: { params: { mode: string } }) {
  const mode = params.mode as Mode;
  const [finished, setFinished] = useState<{
    answers: MockAnswers;
    timeSpentSec: number;
  } | null>(null);

  const bank = useMemo(() => {
    const real = toMockQuestions();
    return real.length > 0 ? real : FALLBACK_QUESTIONS;
  }, []);

  if (mode === "final") {
    return (
      <main className="mx-auto max-w-2xl px-4 py-10 text-slate-200">
        <Eyebrow tone="amber">Final Exam Simulation</Eyebrow>
        <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Multi-subject placeholder.
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base">
          The final simulation runs the full experience across your required
          subjects (e.g. Mathematics + Physics + Chemistry) in one sitting.
          Subject routing and cross-paper analytics land here next.
        </p>
        <div className="mt-5">
          <PrimaryLink href="/mock">Back to mock modes</PrimaryLink>
        </div>
      </main>
    );
  }

  const config = MOCK_CONFIGS[mode as keyof typeof MOCK_CONFIGS];
  if (!config) {
    return (
      <main className="mx-auto max-w-2xl px-4 py-10 text-slate-200">
        <h1 className="font-display text-2xl font-bold text-white">Unknown mock mode.</h1>
        <div className="mt-4">
          <Callout tone="rose" title="Unknown mode">
            That mock URL doesn&apos;t match quick, half, full, or final.
          </Callout>
        </div>
        <div className="mt-5">
          <PrimaryLink href="/mock">Back to mock modes</PrimaryLink>
        </div>
      </main>
    );
  }

  // Standalone demo: the inline bank holds 5 questions, fewer than any mode
  // requests. Run with what's available and scale the timer proportionally.
  const questions = bank.slice(0, config.questions);
  const demoShortfall = bank.length < config.questions;
  const durationSec = demoShortfall
    ? Math.max(
        60,
        Math.round((config.durationSec * questions.length) / config.questions),
      )
    : config.durationSec;

  if (finished) {
    return (
      <main className="mx-auto max-w-3xl space-y-4 px-4 py-10 text-slate-200">
        <BackLink href="/mock">← All mock modes</BackLink>
        <MockResult
          questions={questions}
          answers={finished.answers}
          timeSpentSec={finished.timeSpentSec}
          durationSec={durationSec}
        />
        <button
          type="button"
          onClick={() => setFinished(null)}
          className="w-full rounded-2xl border border-white/15 bg-white/[0.03] px-4 py-3 text-sm font-bold text-white transition hover:bg-white/10"
        >
          Retake {config.title}
        </button>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-4xl space-y-4 px-4 py-10 text-slate-200">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <Eyebrow tone="amber">
            {config.title} · <span className="font-mono tabular-nums">{questions.length} questions · {Math.round(durationSec / 60)} min</span>
          </Eyebrow>
          <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">{config.title}</h1>
        </div>
        <BackLink href="/mock">← All mock modes</BackLink>
      </div>
      {demoShortfall && (
        <Callout tone="amber" title="Demo bank">
          Showing <span className="font-mono font-bold tabular-nums">{questions.length} of {config.questions}</span>{" "}
          questions with a scaled{" "}
          <span className="font-mono font-bold tabular-nums">{Math.round(durationSec / 60)}-minute</span> timer.
          Wire in the full bank via <code>data/questions.ts</code> to unlock
          the complete paper.
        </Callout>
      )}
      <ExamSimulator
        questions={questions}
        durationSec={durationSec}
        onComplete={(answers, timeSpentSec) =>
          setFinished({ answers, timeSpentSec })
        }
      />
    </main>
  );
}
