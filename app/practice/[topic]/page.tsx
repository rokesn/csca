"use client";

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import {
  DIFFICULTIES,
  SAMPLE_QUESTIONS,
  isValidTopic,
  topicLabel,
  type Difficulty,
  type Question
} from "../../../data/questions";
import QuestionCard from "../../../components/question-card";
import QuestionExplanation from "../../../components/question-explanation";
import { addMistake, saveAttempt } from "../../../lib/progress-store";
import MistakeDialog from "../../../components/mistake-dialog";
import {
  BackLink,
  Callout,
  Card,
  PageHeader,
  Stat
} from "../../../components/ui";

type DifficultyFilter = Difficulty | "All (mixed)";

export default function TopicPracticePage({
  params
}: {
  params: { topic: string };
}) {
  const { topic } = params;
  const valid = isValidTopic(topic);

  const [difficulty, setDifficulty] =
    useState<DifficultyFilter>("CSCA Standard");
  const [answers, setAnswers] = useState<Record<string, number | null>>({});
  const [flagged, setFlagged] = useState<Record<string, boolean>>({});
  const [elapsed, setElapsed] = useState<Record<string, number>>({});
  const [mistakeSaved, setMistakeSaved] = useState<Record<string, boolean>>(
    {}
  );

  const filtered = SAMPLE_QUESTIONS.filter((q) => {
    const okTopic = q.topic === topic;
    const okDiff =
      difficulty === "All (mixed)" ? true : q.difficulty === difficulty;
    return okTopic && okDiff;
  });

  const isMixed = difficulty === "All (mixed)";

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topic, difficulty, answers]);

  if (!valid) notFound();

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
      <div className="flex flex-wrap gap-4">
        <BackLink href="/">← Home</BackLink>
        <BackLink href="/practice">← All practice</BackLink>
      </div>
      <div className="mt-3">
        <PageHeader
          eyebrow={`Practice · ${topicLabel(topic)}`}
          title={`${topicLabel(topic)} Practice`}
          desc={`Focused ${topicLabel(topic)} reps at a single labeled difficulty.`}
          tone="emerald"
        />
      </div>

      <div className="mt-5">
        {isMixed ? (
          <Callout tone="amber" title="Mixed-difficulty set">
            Mixed-difficulty set for {topicLabel(topic)} — every question is
            still labeled by difficulty.
          </Callout>
        ) : (
          <Callout tone="emerald" title={`${difficulty} · ${topicLabel(topic)}`}>
            Every question below is labeled {difficulty}.
          </Callout>
        )}
      </div>

      <Card tone="emerald" className="mt-4">
        <label className="block max-w-xs">
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
        <div className="mt-4">
          <Stat
            value={String(filtered.length)}
            label="Questions in set"
            tone="emerald"
          />
        </div>
      </Card>

      <div className="mt-6 grid gap-6">
        {filtered.length === 0 && (
          <Card tone="emerald" className="text-center text-slate-400">
            No {difficulty} questions for this topic yet. Try “All (mixed —
            labeled)” or pick another topic.
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
