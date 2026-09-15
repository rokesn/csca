"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  DIFFICULTIES,
  SAMPLE_QUESTIONS,
  TOPICS,
  type Difficulty,
  type Question
} from "../../data/questions";
import QuestionCard from "../../components/question-card";
import QuestionExplanation from "../../components/question-explanation";
import { addMistake, saveAttempt } from "../../lib/progress-store";
import MistakeDialog from "../../components/mistake-dialog";
import {
  BackLink,
  Callout,
  Card,
  GhostLink,
  PageHeader,
  Stat
} from "../../components/ui";

type DifficultyFilter = Difficulty | "All (mixed)";

function isDifficulty(value: string | null): value is Difficulty {
  return (
    value !== null &&
    (DIFFICULTIES as string[]).includes(value)
  );
}

function PracticeInner() {
  const searchParams = useSearchParams();
  const topicParam = searchParams.get("topic");
  const levelParam = searchParams.get("level");

  // CSCA Standard mode enforced: default difficulty is CSCA Standard.
  const [difficulty, setDifficulty] = useState<DifficultyFilter>(() =>
    isDifficulty(levelParam) ? levelParam : "CSCA Standard"
  );
  const [topic, setTopic] = useState<string>(() => topicParam ?? "all");
  const [answers, setAnswers] = useState<Record<string, number | null>>({});
  const [flagged, setFlagged] = useState<Record<string, boolean>>({});
  const [elapsed, setElapsed] = useState<Record<string, number>>({});
  const [mistakeSaved, setMistakeSaved] = useState<Record<string, boolean>>(
    {}
  );

  const filtered = useMemo(() => {
    return SAMPLE_QUESTIONS.filter((q) => {
      const okDiff =
        difficulty === "All (mixed)" ? true : q.difficulty === difficulty;
      const okTopic = topic === "all" ? true : q.topic === topic;
      return okDiff && okTopic;
    });
  }, [difficulty, topic]);

  const isMixed = difficulty === "All (mixed)";

  // Per-question elapsed timers: tick while the question is unanswered.
  useEffect(() => {
    const t = setInterval(() => {
      setElapsed((prev) => {
        const next = { ...prev };
        for (const q of filtered) {
          if (answers[q.id] === undefined || answers[q.id] === null) {
            next[q.id] = (prev[q.id] ?? 0) + 1;
          }
        }
        return next;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [filtered, answers]);

  const answered = Object.values(answers).filter((a) => a !== null && a !== undefined).length;
  const correct = filtered.filter((q) => answers[q.id] === q.answer).length;

  const handleSelect = (q: Question, idx: number) => {
    setAnswers((p) => ({ ...p, [q.id]: idx }));
    saveAttempt({
      qid: q.id,
      topic: q.topic,
      difficulty: q.difficulty,
      correct: idx === q.answer,
      timeSec: elapsed[q.id] ?? 0,
      date: new Date().toISOString()
    });
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 text-slate-200">
      <BackLink href="/">← Home</BackLink>
      <div className="mt-3">
        <PageHeader
          eyebrow="Practice · CSCA Standard"
          title="Practice"
          desc="Exam-realistic reps at a single difficulty. Answer, review the explanation, and log every miss."
          tone="emerald"
          actions={
            <GhostLink href="/practice/timed">
              Go to Timed Practice (10 Qs / 12 min) →
            </GhostLink>
          }
        />
      </div>

      {/* CSCA Standard mode banner — never mix without a label (Spec Sec 9). */}
      <div className="mt-5">
        {isMixed ? (
          <Callout tone="amber" title="Mixed-difficulty set">
            Difficulties are labeled on every question. Switch back to “CSCA
            Standard” for exam-realistic practice.
          </Callout>
        ) : (
          <Callout tone="emerald" title={`${difficulty} Practice`}>
            Every question below is labeled {difficulty}. Not a random mixed
            set.
          </Callout>
        )}
      </div>

      <Card tone="emerald" className="mt-4">
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="block">
            <span className="text-[11px] font-bold uppercase tracking-widest text-slate-500">
              Difficulty
            </span>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value as DifficultyFilter)}
              className="field-dark mt-1.5"
            >
              {DIFFICULTIES.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
              <option value="All (mixed)">All (mixed — labeled)</option>
            </select>
          </label>
          <label className="block">
            <span className="text-[11px] font-bold uppercase tracking-widest text-slate-500">
              Topic
            </span>
            <select
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="field-dark mt-1.5"
            >
              <option value="all">All topics</option>
              {TOPICS.map((t) => (
                <option key={t.slug} value={t.slug}>
                  {t.label}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
          <Stat
            value={String(filtered.length)}
            label="Questions in set"
            tone="emerald"
          />
          <Stat
            value={`${correct}/${answered}`}
            label="Correct / answered"
            tone="slate"
          />
        </div>
      </Card>

      <div className="mt-6 grid gap-6">
        {filtered.length === 0 && (
          <Card tone="emerald" className="text-center text-slate-400">
            No questions match this filter. Try CSCA Standard + All topics.
          </Card>
        )}
        {filtered.map((q, i) => {
          const sel = answers[q.id] ?? null;
          const showDialog =
            sel !== null && sel !== q.answer && !mistakeSaved[q.id];
          return (
            <div key={q.id} className="grid gap-3">
              <QuestionCard
                question={q}
                selected={sel}
                onSelect={(idx) => handleSelect(q, idx)}
                flagged={!!flagged[q.id]}
                onToggleFlag={() =>
                  setFlagged((p) => ({ ...p, [q.id]: !p[q.id] }))
                }
                timerSec={elapsed[q.id] ?? 0}
                timerLabel="Elapsed"
                questionNumber={i + 1}
                totalCount={filtered.length}
              />
              {sel !== null && (
                <QuestionExplanation question={q} userAnswer={sel} />
              )}
              {showDialog && (
                <MistakeDialog
                  onPick={(reason: any) => {
                    addMistake({
                      qid: q.id,
                      topic: q.topic,
                      stem: q.stem,
                      wrong: sel,
                      correct: q.answer,
                      reason,
                      date: new Date().toISOString()
                    });
                    setMistakeSaved((p) => ({ ...p, [q.id]: true }));
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </main>
  );
}

export default function PracticePage() {
  return (
    <Suspense fallback={null}>
      <PracticeInner />
    </Suspense>
  );
}
