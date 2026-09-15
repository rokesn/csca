// Topic page: the 5-stage learning system (spec Sec 6).
//   Stage 1 Learn    — detailed lesson when present (why/key points/traps/tip),
//                      otherwise concept + rules + formulas (from syllabus data)
//   Stage 2 See      — 2 static worked examples (from syllabus data)
//   Stage 3 Practice — links to /practice?topic=slug&level=… (Foundation/Basic/CSCA Standard)
//   Stage 4 Timed    — link to /practice/timed?topic=slug
//   Stage 5 Mastery  — Knowledge/Accuracy/Speed bars (TopicMastery)
//
// Client component using useParams() so it works regardless of how the
// App Router version passes route params. Mastery values come from
// progress-store masteryFor() — no Supabase dependency.

"use client";

import { notFound, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { PRACTICE_LEVELS, getMathTopicBySlug } from "../../../../data/syllabus";
import { masteryFor } from "../../../../lib/progress-store";
import StageTabs, { type StageId } from "../../../../components/stage-tabs";
import TopicMastery from "../../../../components/topic-mastery";
import {
  BackLink,
  Callout,
  Card,
  GhostLink,
  PageHeader,
  PrimaryLink,
  TonalCard,
  toneBadge,
  type Tone,
} from "../../../../components/ui";

interface StoredMastery {
  knowledge: number;
  accuracy: number;
  speed: number;
}

const LEVEL_TONE: Record<(typeof PRACTICE_LEVELS)[number], Tone> = {
  Foundation: "slate",
  Basic: "cyan",
  "CSCA Standard": "emerald",
};

export default function TopicPage() {
  const params = useParams();
  const slug = Array.isArray(params.topic) ? params.topic[0] : params.topic;
  const topic = getMathTopicBySlug(slug ?? "");

  const [stage, setStage] = useState<StageId>(1);
  const [mastery, setMastery] = useState<StoredMastery>(() =>
    topic
      ? masteryFor(topic.slug)
      : { knowledge: 0, accuracy: 0, speed: 0 },
  );

  useEffect(() => {
    if (topic) setMastery(masteryFor(topic.slug));
  }, [topic]);

  if (!topic) notFound();

  // Defensive: `lesson` lands from a parallel data agent — may be absent.
  // Shape: { whyItMatters, keyPoints[4-6], commonMistakes[3-4], examTip }.
  const lesson: any = (topic as any)?.lesson ?? null;
  const keyPoints: string[] = (lesson as any)?.keyPoints ?? [];
  const commonMistakes: string[] = (lesson as any)?.commonMistakes ?? [];
  const whyItMatters: string | null = (lesson as any)?.whyItMatters ?? null;
  const examTip: string | null = (lesson as any)?.examTip ?? null;
  const hasLesson: boolean =
    !!lesson &&
    (keyPoints.length > 0 ||
      commonMistakes.length > 0 ||
      !!whyItMatters ||
      !!examTip);

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <BackLink href="/study/mathematics">← Mathematics</BackLink>
      <div className="mt-2">
        <PageHeader
          eyebrow={topic.chapter}
          title={topic.title}
          desc={topic.description}
          tone="indigo"
          actions={
            <>
              <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-xs text-slate-300">
                Time target: ~{topic.timeTargetSec}s per question
              </span>
              <GhostLink href="/study/mathematics/formulas">
                All formulas →
              </GhostLink>
            </>
          }
        />
      </div>

      <div className="mt-6">
        <StageTabs active={stage} onChange={setStage} />
      </div>

      <div className="mt-6">
        {stage === 1 && (
          <section aria-label="Stage 1 Learn">
            <h2 className="font-display text-xl font-semibold text-white">
              Stage 1 — Learn
            </h2>
            {hasLesson ? (
              <>
                {whyItMatters ? (
                  <TonalCard tone="indigo" className="mt-4">
                    <h3 className="font-display font-semibold text-white">
                      Why this matters
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate-400">
                      {whyItMatters}
                    </p>
                  </TonalCard>
                ) : null}
                {keyPoints.length > 0 ? (
                  <>
                    <h3 className="mt-6 font-display font-semibold text-white">
                      Key points
                    </h3>
                    <Card tone="slate" className="mt-2">
                      <ul className="list-disc space-y-1 pl-5 text-sm leading-relaxed text-slate-300">
                        {keyPoints.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    </Card>
                  </>
                ) : (
                  <>
                    <h3 className="mt-6 font-display font-semibold text-white">
                      Concept & rules
                    </h3>
                    <Card tone="slate" className="mt-2">
                      <ul className="list-disc space-y-1 pl-5 text-sm leading-relaxed text-slate-300">
                        {topic.concepts.map((concept) => (
                          <li key={concept}>{concept}</li>
                        ))}
                      </ul>
                    </Card>
                  </>
                )}
                <h3 className="mt-6 font-display font-semibold text-white">
                  Formulas
                </h3>
                <ul className="mt-2 space-y-1">
                  {topic.formulas.map((formula) => (
                    <li
                      key={formula}
                      className="rounded-lg border border-white/10 bg-black/40 px-3 py-2 font-mono text-sm text-slate-100"
                    >
                      {formula}
                    </li>
                  ))}
                </ul>
                {commonMistakes.length > 0 ? (
                  <div className="mt-4">
                    <Callout tone="amber" title="Classic traps">
                      <ul className="list-disc space-y-1 pl-5">
                        {commonMistakes.map((mistake) => (
                          <li key={mistake}>{mistake}</li>
                        ))}
                      </ul>
                    </Callout>
                  </div>
                ) : null}
                {examTip ? (
                  <div className="mt-4">
                    <Callout tone="emerald" title="Exam tip">
                      {examTip}
                    </Callout>
                  </div>
                ) : null}
              </>
            ) : (
              <>
                <h3 className="mt-6 font-display font-semibold text-white">
                  Concept & rules
                </h3>
                <Card tone="slate" className="mt-2">
                  <ul className="list-disc space-y-1 pl-5 text-sm leading-relaxed text-slate-300">
                    {topic.concepts.map((concept) => (
                      <li key={concept}>{concept}</li>
                    ))}
                  </ul>
                </Card>
                <h3 className="mt-6 font-display font-semibold text-white">
                  Formulas
                </h3>
                <ul className="mt-2 space-y-1">
                  {topic.formulas.map((formula) => (
                    <li
                      key={formula}
                      className="rounded-lg border border-white/10 bg-black/40 px-3 py-2 font-mono text-sm text-slate-100"
                    >
                      {formula}
                    </li>
                  ))}
                </ul>
              </>
            )}
            <button
              type="button"
              onClick={() => setStage(2)}
              className="mt-4 inline-flex items-center gap-1.5 rounded-2xl bg-white px-5 py-2.5 text-sm font-bold text-slate-950 shadow-lg transition hover:bg-indigo-100"
            >
              Next: See worked examples →
            </button>
          </section>
        )}

        {stage === 2 && (
          <section aria-label="Stage 2 See">
            <h2 className="font-display text-xl font-semibold text-white">
              Stage 2 — See
            </h2>
            <p className="mt-1 text-sm leading-relaxed text-slate-400">
              Two worked examples. Cover the solution, try it yourself, then
              compare.
            </p>
            <ol className="mt-4 space-y-4">
              {topic.examples.map((example, i) => (
                <li key={example.problem}>
                  <Card tone="slate">
                    <p className="font-medium text-white">
                      Example {i + 1}: {example.problem}
                    </p>
                    <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm leading-relaxed text-slate-300">
                      {example.steps.map((step) => (
                        <li key={step}>{step}</li>
                      ))}
                    </ol>
                    <p className="mt-2 text-sm font-bold text-emerald-300">
                      Answer: {example.answer}
                    </p>
                  </Card>
                </li>
              ))}
            </ol>
            <button
              type="button"
              onClick={() => setStage(3)}
              className="mt-4 inline-flex items-center gap-1.5 rounded-2xl bg-white px-5 py-2.5 text-sm font-bold text-slate-950 shadow-lg transition hover:bg-indigo-100"
            >
              Next: Practice →
            </button>
          </section>
        )}

        {stage === 3 && (
          <section aria-label="Stage 3 Practice">
            <h2 className="font-display text-xl font-semibold text-white">
              Stage 3 — Practice
            </h2>
            <p className="mt-1 text-sm leading-relaxed text-slate-400">
              Easy → Medium → CSCA level. Never mix levels without knowing —
              pick one.
            </p>
            <ul className="mt-4 space-y-3">
              {PRACTICE_LEVELS.map((level) => (
                <li key={level}>
                  <Link
                    href={`/practice?topic=${topic.slug}&level=${encodeURIComponent(level)}`}
                    className="block"
                  >
                    <Card tone="slate" className="p-4">
                      <span
                        className={`inline-block rounded-full border px-2.5 py-0.5 text-xs font-bold ${toneBadge[LEVEL_TONE[level]]}`}
                      >
                        {level}
                      </span>
                      <span className="mt-1.5 block font-medium text-white">
                        {level} practice →
                      </span>
                      <span className="mt-1 block text-sm leading-relaxed text-slate-400">
                        {topic.title} questions at {level} difficulty
                      </span>
                    </Card>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {stage === 4 && (
          <section aria-label="Stage 4 Timed">
            <h2 className="font-display text-xl font-semibold text-white">
              Stage 4 — Timed
            </h2>
            <p className="mt-1 text-sm leading-relaxed text-slate-400">
              10 questions, 12 minutes — exam pressure on this topic only.
            </p>
            <div className="mt-4">
              <PrimaryLink href={`/practice/timed?topic=${topic.slug}`}>
                Start timed set →
              </PrimaryLink>
            </div>
          </section>
        )}

        {stage === 5 && (
          <section aria-label="Stage 5 Mastery">
            <h2 className="font-display text-xl font-semibold text-white">
              Stage 5 — Mastery
            </h2>
            <p className="mt-1 text-sm leading-relaxed text-slate-400">
              Knowledge (understand?) · Accuracy (correct?) · Speed (under
              pressure?)
            </p>
            <div className="mt-4">
              <TopicMastery
                knowledge={mastery.knowledge}
                accuracy={mastery.accuracy}
                speed={mastery.speed}
              />
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
