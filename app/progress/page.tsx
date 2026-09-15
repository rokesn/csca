"use client";

import { useEffect, useMemo, useState } from "react";
import {
  loadAttempts,
  masteryFor,
  topicStats,
  type AttemptRecord,
} from "../../lib/progress-store";
import { calcReadiness } from "../../lib/readiness";
import {
  Callout,
  Card,
  Meter,
  PageHeader,
  PrimaryLink,
  Stat,
  TonalCard,
  toneBadge,
  type Tone,
} from "../../components/ui";

/** Real-data topics (attempt topic slugs). */
const TOPIC_SLUGS = [
  "derivatives",
  "functions",
  "algebra",
  "geometry",
  "probability",
  "calculus",
  "vectors",
  "complex",
] as const;

function label(slug: string): string {
  return slug.charAt(0).toUpperCase() + slug.slice(1);
}

function statusFor(score: number): "Strong" | "Needs work" | "Weak" {
  if (score >= 85) return "Strong";
  if (score >= 70) return "Needs work";
  return "Weak";
}

function toneFor(value: number): Tone {
  if (value >= 85) return "emerald";
  if (value >= 70) return "cyan";
  return "rose";
}

function statusBadge(status: string): string {
  if (status === "Strong") return toneBadge.emerald;
  if (status === "Weak") return toneBadge.rose;
  return toneBadge.amber;
}

function avg(nums: number[]): number {
  if (nums.length === 0) return 0;
  return Math.round(nums.reduce((a, b) => a + b, 0) / nums.length);
}

export default function ProgressPage() {
  const [attempts, setAttempts] = useState<AttemptRecord[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setAttempts(loadAttempts());
    setLoaded(true);
  }, []);

  const perTopic = useMemo(
    () =>
      TOPIC_SLUGS.map((slug) => {
        const stats = loaded
          ? topicStats(slug)
          : { answered: 0, correct: 0, accuracy: 0, avgTimeSec: 0 };
        const mastery = loaded
          ? masteryFor(slug)
          : { knowledge: 0, accuracy: 0, speed: 0 };
        const score = stats.accuracy;
        return { slug, ...stats, mastery, score, status: statusFor(score) };
      }),
    [loaded, attempts],
  );

  const withData = useMemo(() => perTopic.filter((t) => t.answered > 0), [perTopic]);

  const readiness = useMemo(() => {
    const knowledge = avg(withData.map((t) => t.mastery.knowledge));
    const accuracy = avg(withData.map((t) => t.mastery.accuracy));
    const speed = avg(withData.map((t) => t.mastery.speed));
    // No dedicated mock-history store: use overall accuracy as the
    // consistency proxy so the score reflects real attempts.
    const mockConsistency = accuracy;
    // Share of all tracked topics at/above 70% (higher = fewer weak areas).
    const weakTopics =
      perTopic.length === 0
        ? 0
        : Math.round((perTopic.filter((t) => t.accuracy >= 70).length / perTopic.length) * 100);
    const weakTopicNames = withData
      .filter((t) => t.accuracy < 70)
      .sort((a, b) => a.accuracy - b.accuracy)
      .map((t) => label(t.slug));
    return calcReadiness({ knowledge, accuracy, speed, mockConsistency, weakTopics, weakTopicNames });
  }, [perTopic, withData]);

  const dimensions = [
    { label: "Knowledge", value: readiness.breakdown.knowledge, hint: "Do you understand it?" },
    { label: "Accuracy", value: readiness.breakdown.accuracy, hint: "Do you get it right?" },
    { label: "Speed", value: readiness.breakdown.speed, hint: "Under pressure?" },
    { label: "Mock consistency", value: readiness.breakdown.mockConsistency, hint: "Stable across mocks?" },
    { label: "Weak topics", value: readiness.breakdown.weakTopics, hint: "Worst areas covered?" },
  ] as const;

  const weakest = useMemo(
    () =>
      withData.length > 0
        ? [...withData].sort((a, b) => a.accuracy - b.accuracy)[0]
        : null,
    [withData],
  );

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 text-slate-200">
      <PageHeader eyebrow="Progress" title="Am I ready for the real exam?" tone="violet" />

      <TonalCard tone="violet" className="mt-6 text-center">
        <p className="text-sm font-medium text-slate-400">Preparation Readiness</p>
        <p className="mt-1 font-display text-5xl font-extrabold text-white">{readiness.overall}%</p>
        <div className="mx-auto mt-3 max-w-md">
          <Meter value={readiness.overall} tone="violet" />
        </div>
        <div className="mx-auto mt-3 max-w-md text-left">
          <Callout tone="violet" title={readiness.status}>
            {readiness.focus}
          </Callout>
        </div>
        <p className="mt-2 text-xs text-slate-500">
          {readiness.disclaimer}
        </p>
      </TonalCard>

      {loaded && attempts.length === 0 ? (
        <Card tone="violet" className="mt-6 text-center">
          <p className="text-sm text-slate-300">No attempts yet — Take the diagnostic to seed your progress.</p>
          <div className="mt-4">
            <PrimaryLink href="/diagnostic">Take the diagnostic →</PrimaryLink>
          </div>
        </Card>
      ) : null}

      <Card tone="violet" className="mt-6">
        <h2 className="text-lg font-bold text-white">Three skills + consistency</h2>
        <div className="mt-4 space-y-4">
          {dimensions.map((d) => (
            <div key={d.label}>
              <Stat value={`${d.value}%`} label={`${d.label} · ${d.hint}`} tone={toneFor(d.value)} />
              <div className="mt-2">
                <Meter value={d.value} tone={toneFor(d.value)} />
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card tone="violet" className="mt-6">
        <h2 className="text-lg font-bold text-white">Per-topic breakdown</h2>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 text-xs uppercase tracking-wide text-slate-500">
                <th className="py-2 pr-4">Topic</th>
                <th className="py-2 pr-4">Score</th>
                <th className="py-2 pr-4">Mastery</th>
                <th className="py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {perTopic.map((t) => (
                <tr key={t.slug} className="border-b border-white/5 last:border-0">
                  <td className="py-2.5 pr-4 font-medium text-slate-200">
                    {label(t.slug)}
                    <span className="ml-2 text-xs font-normal text-slate-500">{t.answered} attempts</span>
                  </td>
                  <td className="py-2.5 pr-4 font-bold text-white">{t.score}%</td>
                  <td className="py-2.5 pr-4">
                    <div className="w-28">
                      <Meter value={t.score} tone={toneFor(t.score)} />
                    </div>
                  </td>
                  <td className="py-2.5">
                    <span
                      className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${statusBadge(t.status)}`}
                    >
                      {t.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {weakest ? (
          <div className="mt-3">
            <Callout tone="rose">
              <>Before the next mock, review <strong>{label(weakest.slug)}</strong>.</>
            </Callout>
          </div>
        ) : (
          <div className="mt-3">
            <Callout tone="slate">Practice any topic to start building this table.</Callout>
          </div>
        )}
      </Card>
    </main>
  );
}
