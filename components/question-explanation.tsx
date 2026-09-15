"use client";

import type { Difficulty, Question } from "../data/questions";
import { PrimaryLink, toneBadge, type Tone } from "./ui";

const OPTION_LABELS = ["A", "B", "C", "D"];

const DIFFICULTY_TONE: Record<Difficulty, Tone> = {
  Foundation: "slate",
  Basic: "cyan",
  "CSCA Standard": "emerald",
  Challenging: "amber",
  Advanced: "rose",
};

function difficultyBadge(d: Question["difficulty"]): string {
  return toneBadge[DIFFICULTY_TONE[d]];
}

interface QuestionExplanationProps {
  question: Question;
  /** 0-3 or null (skipped) */
  userAnswer: number | null;
}

export default function QuestionExplanation({
  question,
  userAnswer
}: QuestionExplanationProps) {
  const correct = question.answer;
  const isCorrect = userAnswer === correct;
  const userLabel =
    userAnswer === null ? "Skipped" : OPTION_LABELS[userAnswer];
  const correctLabel = OPTION_LABELS[correct];

  return (
    <section
      aria-label={`Explanation for ${question.id}`}
      className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.02] p-5 shadow-[0_10px_36px_-16px_rgba(0,0,0,0.8)]"
    >
      <div className="flex flex-wrap items-center gap-2">
        <span
          className={`rounded-full border px-3 py-1 text-xs font-bold ${isCorrect ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-200" : "border-rose-400/30 bg-rose-400/10 text-rose-200"}`}
        >
          {isCorrect ? "Correct" : "Review"}
        </span>
        <span
          className={`rounded-full border px-3 py-1 text-xs font-bold ${difficultyBadge(question.difficulty)}`}
        >
          Difficulty: {question.difficulty}
        </span>
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs font-semibold text-slate-400">
          Time target: ~{question.estimatedTimeSec}s
        </span>
      </div>

      <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
        <div
          className={`rounded-2xl border p-3 ${isCorrect ? "border-emerald-400/30 bg-emerald-400/10" : "border-rose-400/30 bg-rose-400/10"}`}
        >
          <dt className="font-semibold text-slate-400">Your answer</dt>
          <dd
            className={`mt-1 font-bold ${isCorrect ? "text-emerald-300" : "text-rose-300"}`}
          >
            {userLabel}
            {userAnswer !== null && <> — {question.options[userAnswer]}</>}
          </dd>
        </div>
        <div className="rounded-2xl border border-emerald-400/30 bg-emerald-400/10 p-3">
          <dt className="font-semibold text-emerald-200">Correct</dt>
          <dd className="mt-1 font-bold text-emerald-300">
            {correctLabel} — {question.options[correct]}
          </dd>
        </div>
      </dl>

      <div className="mt-4">
        <h3 className="font-display font-bold text-white">
          Why {correctLabel}? (step-by-step)
        </h3>
        <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm leading-relaxed text-slate-200">
          {question.explanationSteps.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>
      </div>

      <div className="mt-4">
        <h3 className="font-display font-bold text-white">
          Why not the others?
        </h3>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed text-slate-400">
          {question.whyNot.map((w, i) => (
            <li key={i}>{w}</li>
          ))}
        </ul>
      </div>

      <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-3 text-sm leading-relaxed text-slate-300">
        <p>
          <span className="font-bold text-white">Concept tested: </span>
          {question.concept}
        </p>
        <p className="mt-1 font-mono text-xs text-slate-400">
          Source: {question.source} ({question.sourceType}) · Exam relevance{" "}
          {question.examRelevance}/5
        </p>
      </div>

      <div className="mt-4">
        <PrimaryLink href={`/practice/${question.topic}`}>
          Practice similar ({question.topic})
        </PrimaryLink>
      </div>
    </section>
  );
}
