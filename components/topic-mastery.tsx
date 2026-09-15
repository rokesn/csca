// Three-skill mastery display (spec Sec 7): Knowledge (understand?),
// Accuracy (correct?), Speed (under pressure?).
// Pure presentational component: parent passes values from progress-store.
// No Supabase assumption.

import { Callout, Card, Meter, Stat, type Tone } from "./ui";

export interface TopicMasteryProps {
  /** 0-100. Default 0 = not yet measured. */
  knowledge?: number;
  /** 0-100. Default 0 = not yet measured. */
  accuracy?: number;
  /** 0-100. Default 0 = not yet measured. */
  speed?: number;
}

function clamp(n: number): number {
  if (Number.isNaN(n)) return 0;
  return Math.min(100, Math.max(0, Math.round(n)));
}

/** Insight line from the three skills (spec Sec 7 example). */
export function masteryInsight(
  knowledge: number,
  accuracy: number,
  speed: number,
): string {
  const k = clamp(knowledge);
  const a = clamp(accuracy);
  const s = clamp(speed);
  if (k === 0 && a === 0 && s === 0) {
    return "No data yet — finish Stage 3 practice to measure your mastery.";
  }
  if (k > 85 && s < 70) {
    return "You know it but too slow — do timed practice (Stage 4).";
  }
  if (k < 60) {
    return "Concept gap — go back to Stage 1 Learn, then re-try worked examples.";
  }
  if (a < 70) {
    return "Shaky accuracy — do more Stage 3 practice and review every mistake.";
  }
  if (s < 70) {
    return "Correct but slow — drill Stage 4 timed sets to build speed.";
  }
  if (k > 85 && a >= 80 && s >= 80) {
    return "Mastered — move on, and revisit in spaced review.";
  }
  return "Almost ready — focus on your weakest bar above.";
}

function insightTone(k: number, a: number, s: number): Tone {
  if (k === 0 && a === 0 && s === 0) return "indigo";
  if (k > 85 && a >= 80 && s >= 80) return "emerald";
  return "amber";
}

export default function TopicMastery({
  knowledge = 0,
  accuracy = 0,
  speed = 0,
}: TopicMasteryProps) {
  const k = clamp(knowledge);
  const a = clamp(accuracy);
  const s = clamp(speed);
  const overall = Math.round((k + a + s) / 3);
  return (
    <Card tone="slate">
      <h3 className="font-display text-base font-semibold text-white">
        Topic mastery
      </h3>
      <div className="mt-3">
        <Stat value={`${overall}%`} label="Overall mastery" tone="indigo" />
      </div>
      <div className="mt-4 space-y-4">
        <div>
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-slate-300">Knowledge</span>
            <span className="font-mono tabular-nums text-slate-400">{k}%</span>
          </div>
          <div className="mt-1.5">
            <Meter value={k} tone="indigo" />
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-slate-300">Accuracy</span>
            <span className="font-mono tabular-nums text-slate-400">{a}%</span>
          </div>
          <div className="mt-1.5">
            <Meter value={a} tone="emerald" />
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-slate-300">Speed</span>
            <span className="font-mono tabular-nums text-slate-400">{s}%</span>
          </div>
          <div className="mt-1.5">
            <Meter value={s} tone="amber" />
          </div>
        </div>
      </div>
      <div className="mt-4">
        <Callout tone={insightTone(k, a, s)} title="Insight">
          {masteryInsight(k, a, s)}
        </Callout>
      </div>
    </Card>
  );
}
