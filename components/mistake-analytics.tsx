import { ERROR_TYPES } from "../lib/recommender";
import { Callout, Card, Meter, type Tone } from "./ui";

export interface MistakeLike {
  errorType?: string;
  reason?: string;
}

function keyOf(m: MistakeLike): string {
  return m.reason ?? m.errorType ?? "";
}

const LABELS: Record<string, string> = {
  concept: "Concept gaps",
  "forgot-formula": "Forgot formula",
  calculation: "Calculation",
  misread: "Misreading",
  time: "Time pressure",
  guessed: "Guessing",
};

/** Action hint per dominant error type (Sec 13). */
const ACTIONS: Record<string, string> = {
  concept: "review lessons and worked examples",
  "forgot-formula": "drill the Formula Book daily",
  calculation: "slow down and double-check each step",
  misread: "underline key info before solving",
  time: "do more timed practice sets",
  guessed: "learn the concept before attempting",
};

const BAR_TONES: Record<string, Tone> = {
  concept: "indigo",
  "forgot-formula": "violet",
  calculation: "amber",
  misread: "emerald",
  time: "rose",
  guessed: "slate",
};

const PIE_COLORS: Record<string, string> = {
  concept: "#818cf8",
  "forgot-formula": "#8b5cf6",
  calculation: "#f59e0b",
  misread: "#10b981",
  time: "#f43f5e",
  guessed: "#64748b",
};

export function mistakeInsight(mistakes: MistakeLike[]): string {
  if (mistakes.length === 0) return "No mistakes logged yet — keep practicing.";
  const counts = new Map<string, number>();
  for (const m of mistakes) {
    const key = keyOf(m);
    if (!key) continue;
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  if (counts.size === 0) return "No mistakes logged yet — keep practicing.";
  const [topType, topCount] = Array.from(counts.entries()).sort((a, b) => b[1] - a[1])[0];
  const pct = Math.round((topCount / mistakes.length) * 100);

  // Spec example: "Biggest problem is calculation accuracy"
  const problemName =
    topType === "concept"
      ? "concept gaps"
      : topType === "forgot-formula"
        ? "formula recall"
        : topType === "calculation"
          ? "calculation accuracy"
          : topType === "misread"
            ? "misreading questions"
            : topType === "time"
              ? "time management"
              : topType === "guessed"
                ? "guessing under pressure"
                : topType;
  const action = ACTIONS[topType] ?? "review those questions this week";
  return `Biggest problem is ${problemName} (${pct}%) — ${action}.`;
}

export default function MistakeAnalytics({ mistakes }: { mistakes: MistakeLike[] }) {
  const total = mistakes.length;

  const rows = ERROR_TYPES.map((type) => {
    const count = mistakes.filter((m) => keyOf(m) === type).length;
    const pct = total === 0 ? 0 : Math.round((count / total) * 100);
    return { type, count, pct };
  }).sort((a, b) => b.count - a.count);

  const insight = mistakeInsight(mistakes);

  // CSS-only pie via conic-gradient (no chart dependency).
  const pie =
    total === 0
      ? "conic-gradient(rgba(255,255,255,0.1) 0 100%)"
      : (() => {
          let acc = 0;
          const stops: string[] = [];
          for (const r of rows.slice().reverse()) {
            if (r.count === 0) continue;
            const start = (acc / total) * 100;
            acc += r.count;
            const end = (acc / total) * 100;
            stops.push(`${PIE_COLORS[r.type]} ${start}% ${end}%`);
          }
          return `conic-gradient(${stops.join(", ")})`;
        })();

  return (
    <section aria-label="Mistake analytics">
      <Card tone="rose">
        <h2 className="text-lg font-bold text-white">Mistake analytics</h2>
        <p className="mt-1 text-sm text-slate-400">
          Last {total} mistake{total === 1 ? "" : "s"} by error type
        </p>

        {total === 0 ? (
          <div className="mt-4">
            <Callout tone="slate">{insight}</Callout>
          </div>
        ) : (
          <div className="mt-4 flex flex-col gap-5 sm:flex-row sm:items-center">
            <div className="flex items-center gap-4">
              <div
                aria-hidden
                className="h-28 w-28 shrink-0 rounded-full border border-white/10"
                style={{ background: pie }}
              />
              <ul className="space-y-1.5 text-xs text-slate-400">
                {rows.map((r) => (
                  <li
                    key={r.type}
                    className="flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-white/[0.03] px-2.5 py-1.5"
                  >
                    <span className="flex items-center gap-2">
                      <span
                        aria-hidden
                        className="inline-block h-2.5 w-2.5 rounded-sm"
                        style={{ background: PIE_COLORS[r.type] }}
                      />
                      {LABELS[r.type]}
                    </span>
                    <span className="font-bold text-slate-200">{r.pct}%</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex-1 space-y-2">
              {rows.map((r) => (
                <div key={r.type}>
                  <div className="flex justify-between text-xs font-medium text-slate-300">
                    <span>{LABELS[r.type]}</span>
                    <span>
                      {r.count} · {r.pct}%
                    </span>
                  </div>
                  <div className="mt-1">
                    <Meter value={r.pct} tone={BAR_TONES[r.type] ?? "slate"} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {total > 0 ? (
          <div className="mt-4">
            <Callout tone="rose">{insight}</Callout>
          </div>
        ) : null}
      </Card>
    </section>
  );
}
