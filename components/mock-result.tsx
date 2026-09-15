"use client";

import type { MockAnswers, MockQuestion } from "@/components/exam-simulator";
import { SEC_PER_QUESTION } from "@/lib/pacing";
import { Callout, Card, Meter, Stat, TonalCard } from "@/components/ui";

type MockResultProps = {
  questions: MockQuestion[];
  answers: MockAnswers;
  /** Seconds the student actually spent (from the simulator). */
  timeSpentSec: number;
  /** Total seconds allowed for the paper. */
  durationSec: number;
  /** Optional parallel flags; when absent, confidence falls back to answered %. */
  flagged?: boolean[];
};

function pctText(pct: number): string {
  if (pct < 50) return "text-rose-300";
  if (pct < 75) return "text-amber-300";
  return "text-emerald-300";
}

export default function MockResult({
  questions,
  answers,
  timeSpentSec,
  durationSec,
  flagged,
}: MockResultProps) {
  const total = questions.length;
  const correct = questions.filter((q, i) => answers[i] === q.answerIndex).length;
  const answered = answers.filter((a) => a !== null).length;
  const wrong = answered - correct;
  const skipped = total - answered;

  const score = total > 0 ? Math.round((correct / total) * 100) : 0;
  const accuracy = answered > 0 ? Math.round((correct / answered) * 100) : 0;
  // Speed vs the ~75s/question target (Sec 20): finishing at target pace = 100.
  const speed =
    total > 0 && timeSpentSec > 0
      ? Math.min(
          100,
          Math.round(((total * SEC_PER_QUESTION) / timeSpentSec) * 100),
        )
      : 0;
  // Confidence: share of questions answered decisively (not flagged, not skipped).
  const flaggedCount = flagged?.filter(Boolean).length ?? 0;
  const confidence =
    total > 0
      ? Math.min(
          100,
          Math.max(
            0,
            Math.round(((total - flaggedCount - skipped) / total) * 100),
          ),
        )
      : 0;

  // Per-topic accuracy table.
  const byTopic = new Map<string, { total: number; correct: number }>();
  questions.forEach((q, i) => {
    const entry = byTopic.get(q.topic) ?? { total: 0, correct: 0 };
    entry.total += 1;
    if (answers[i] === q.answerIndex) entry.correct += 1;
    byTopic.set(q.topic, entry);
  });
  const topicRows = Array.from(byTopic.entries())
    .map(([topic, v]) => ({
      topic,
      ...v,
      pct: v.total > 0 ? Math.round((v.correct / v.total) * 100) : 0,
    }))
    .sort((a, b) => a.pct - b.pct);

  const weakest = topicRows.length > 0 ? topicRows[0] : null;

  const avgSecPerQ = total > 0 && answered > 0 ? Math.round(timeSpentSec / answered) : 0;

  return (
    <div className="space-y-4">
      <TonalCard tone="amber" className="text-center sm:p-8">
        <p className="text-[11px] font-bold uppercase tracking-widest text-slate-500">
          Exam complete → analytics
        </p>
        <p className="mt-2 font-display text-6xl font-bold tabular-nums text-white">
          {score}
          <span className="font-mono text-xl font-bold text-slate-500">/100</span>
        </p>
        <div className="mx-auto mt-4 flex max-w-md items-center justify-center gap-4 font-mono text-sm tabular-nums text-slate-300">
          <span>
            <strong className="text-emerald-300">{correct}</strong> Correct
          </span>
          <span>
            <strong className="text-rose-300">{wrong}</strong> Wrong
          </span>
          <span>
            <strong className="text-slate-400">{skipped}</strong> Skipped
          </span>
        </div>
      </TonalCard>

      <Card tone="amber">
        <div className="grid gap-2.5 sm:grid-cols-3">
          <Stat value={`${accuracy}%`} label="Accuracy" tone="emerald" />
          <Stat value={`${speed}%`} label="Speed" tone="amber" />
          <Stat value={`${confidence}%`} label="Confidence" tone="violet" />
        </div>
        <div className="mt-4 space-y-4">
          <div>
            <div className="mb-1.5 flex justify-between text-sm font-bold text-slate-200">
              <span>Accuracy</span>
              <span className="font-mono tabular-nums">{accuracy}%</span>
            </div>
            <Meter value={accuracy} tone="emerald" />
          </div>
          <div>
            <div className="mb-1.5 flex justify-between text-sm font-bold text-slate-200">
              <span>Speed</span>
              <span className="font-mono tabular-nums">{speed}%</span>
            </div>
            <Meter value={speed} tone="amber" />
          </div>
          <div>
            <div className="mb-1.5 flex justify-between text-sm font-bold text-slate-200">
              <span>Confidence</span>
              <span className="font-mono tabular-nums">{confidence}%</span>
            </div>
            <Meter value={confidence} tone="violet" />
          </div>
        </div>
        <p className="mt-4 font-mono text-xs tabular-nums text-slate-500">
          {Math.floor(timeSpentSec / 60)}m {timeSpentSec % 60}s used of{" "}
          {Math.round(durationSec / 60)}m allowed
          {avgSecPerQ > 0 ? ` · ~${avgSecPerQ}s per answered question` : ""} ·
          target ~{SEC_PER_QUESTION}s.
        </p>
      </Card>

      <Card tone="amber">
        <h3 className="font-display font-bold text-white">Topic analysis</h3>
        <p className="mt-0.5 text-[11px] font-bold uppercase tracking-widest text-slate-500">
          Worst-first
        </p>
        {topicRows.length === 0 ? (
          <p className="mt-2 text-sm text-slate-400">No topics to analyze.</p>
        ) : (
          <table className="mt-3 w-full text-sm">
            <thead>
              <tr className="text-left text-[11px] uppercase tracking-widest text-slate-500">
                <th className="py-2 pr-2 font-bold">Topic</th>
                <th className="py-2 pr-2 font-bold">Correct</th>
                <th className="py-2 text-right font-bold">Accuracy</th>
              </tr>
            </thead>
            <tbody>
              {topicRows.map((row) => (
                <tr key={row.topic} className="border-t border-white/5">
                  <td className="py-2 pr-2 font-medium text-slate-200">{row.topic}</td>
                  <td className="py-2 pr-2 font-mono tabular-nums text-slate-400">
                    {row.correct}/{row.total}
                  </td>
                  <td className={`py-2 text-right font-mono font-bold tabular-nums ${pctText(row.pct)}`}>
                    {row.pct}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {weakest && (
          <div className="mt-4">
            <Callout tone="amber" title={`Before next mock, review ${weakest.topic}.`}>
              <span className="font-mono font-bold tabular-nums">
                {weakest.correct}/{weakest.total} · {weakest.pct}%
              </span>{" "}
              — weakest topic in this paper, shown first above.
            </Callout>
          </div>
        )}
      </Card>
    </div>
  );
}
