"use client";
import { useState } from "react";
import { SAMPLE_QUESTIONS } from "@/data/questions";
import QuestionCard from "@/components/question-card";
import {
  BackLink,
  Card,
  GhostLink,
  PageHeader,
  PrimaryLink,
  Stat
} from "@/components/ui";

export default function DiagnosticPage() {
  const qs = SAMPLE_QUESTIONS.filter((q) => q.difficulty === "CSCA Standard").slice(0, 10);
  const [answers, setAnswers] = useState<(number | null)[]>(qs.map(() => null));
  const [flags, setFlags] = useState<boolean[]>(qs.map(() => false));
  const [done, setDone] = useState(false);
  const score = qs.filter((q, i) => answers[i] === q.answer).length;
  const answered = answers.filter((a) => a !== null).length;

  if (done) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-10 text-center text-slate-200">
        <PageHeader
          eyebrow="Diagnostic result"
          title="Your starting level"
          tone="emerald"
        />
        <Card tone="emerald" className="mt-5">
          <p className="font-display text-6xl font-bold tabular-nums text-white">
            {Math.round((score / qs.length) * 100)}
            <span className="font-mono text-xl font-bold text-slate-500">/100</span>
          </p>
          <p className="mt-2 font-mono text-sm font-bold tabular-nums text-slate-300">
            {score}/{qs.length} correct
          </p>
          <p className="mt-1 text-sm text-slate-400">
            Balanced across Algebra / Functions / Calculus / Geometry / Vectors /
            Probability
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2.5">
            <PrimaryLink href="/plan">Build my study plan →</PrimaryLink>
            <GhostLink href="/study/mathematics">Review weak topics</GhostLink>
          </div>
        </Card>
        <div className="mt-5">
          <BackLink href="/">← Home</BackLink>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl space-y-4 px-4 py-10 text-slate-200">
      <BackLink href="/">← Home</BackLink>
      <PageHeader
        eyebrow="Diagnostic · 10–15 min"
        title="Discover your level before studying"
        desc="Ten CSCA Standard questions across every topic. Answer honestly — your plan builds from this."
        tone="emerald"
      />
      <div className="grid gap-2.5 sm:grid-cols-2">
        <Stat
          value={`${answered}/${qs.length}`}
          label="Answered"
          tone="emerald"
        />
        <Stat
          value={String(flags.filter(Boolean).length)}
          label="Flagged"
          tone="slate"
        />
      </div>
      {qs.map((q, i) => (
        <QuestionCard key={q.id} question={q} selected={answers[i]} onSelect={(v) => setAnswers((p) => p.map((a, j) => (j === i ? v : a)))} flagged={flags[i]} onToggleFlag={() => setFlags((p) => p.map((f, j) => (j === i ? !f : f)))} questionNumber={i + 1} totalCount={qs.length} />
      ))}
      <button onClick={() => setDone(true)} className="w-full rounded-2xl bg-white py-3 text-sm font-bold text-slate-950 shadow-lg transition hover:bg-emerald-100">Finish diagnostic</button>
    </main>
  );
}
