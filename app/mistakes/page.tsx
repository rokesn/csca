"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import MistakeAnalytics from "../../components/mistake-analytics";
import {
  Callout,
  Card,
  PageHeader,
  PrimaryLink,
  toneBadge,
} from "../../components/ui";
import {
  ERROR_REASONS,
  loadMistakes,
  removeMistake,
  type ErrorReason,
  type MistakeRecord,
} from "../../lib/progress-store";

type Filter = ErrorReason | "all";

function optionLetter(idx: number | null): string {
  if (idx === null || idx === undefined) return "—";
  return String.fromCharCode(65 + idx);
}

function shortDate(iso: string): string {
  if (!iso) return "";
  return iso.slice(0, 10);
}

export default function MistakesPage() {
  const [filter, setFilter] = useState<Filter>("all");
  const [mistakes, setMistakes] = useState<MistakeRecord[]>([]);

  useEffect(() => {
    setMistakes(loadMistakes());
  }, []);

  const visible = useMemo(
    () => (filter === "all" ? mistakes : mistakes.filter((m) => m.reason === filter)),
    [filter, mistakes],
  );

  const countFor = (id: ErrorReason) => mistakes.filter((m) => m.reason === id).length;

  const handleRemove = (qid: string) => {
    removeMistake(qid);
    setMistakes(loadMistakes());
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 text-slate-200">
      <PageHeader
        eyebrow="Mistake Book"
        title="I got this wrong"
        desc="Question · Topic · Wrong / Correct · Reason · Date (Sec 12). Review the weak ones first."
        tone="rose"
      />

      <div className="mt-6">
        <MistakeAnalytics mistakes={mistakes.map((m) => ({ errorType: m.reason, reason: m.reason }))} />
      </div>

      <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label="Filter by error type">
        <FilterButton active={filter === "all"} onClick={() => setFilter("all")}>
          All ({mistakes.length})
        </FilterButton>
        {ERROR_REASONS.map((t) => (
          <FilterButton key={t.id} active={filter === t.id} onClick={() => setFilter(t.id)}>
            {t.label} ({countFor(t.id)})
          </FilterButton>
        ))}
      </div>

      {mistakes.length === 0 ? (
        <Card tone="rose" className="mt-4 text-center">
          <p className="text-sm text-slate-300">No mistakes yet — practice and log why you missed it.</p>
          <div className="mt-4">
            <PrimaryLink href="/practice">Go to Practice →</PrimaryLink>
          </div>
        </Card>
      ) : (
        <ul className="mt-4 space-y-3">
          {visible.map((m) => (
            <li key={m.qid}>
              <Card tone="rose">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-slate-100">{m.stem}</p>
                    <p className="mt-1 text-xs text-slate-500">
                      {m.topic} · {shortDate(m.date)}
                    </p>
                  </div>
                  <span className={`shrink-0 rounded-full border px-2.5 py-1 text-xs font-semibold ${toneBadge.rose}`}>
                    {ERROR_REASONS.find((r) => r.id === m.reason)?.label ?? m.reason}
                  </span>
                </div>
                <div className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
                  <p className="rounded-lg border border-rose-400/20 bg-rose-400/10 px-3 py-2 text-rose-200">
                    <span className="font-semibold">Wrong: </span>
                    {optionLetter(m.wrong)}
                  </p>
                  <p className="rounded-lg border border-emerald-400/20 bg-emerald-400/10 px-3 py-2 text-emerald-200">
                    <span className="font-semibold">Correct: </span>
                    {optionLetter(m.correct)}
                  </p>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  <PrimaryLink href={`/practice?topic=${encodeURIComponent(m.topic)}&mistake=${encodeURIComponent(m.qid)}`}>
                    Review
                  </PrimaryLink>
                  <button
                    type="button"
                    onClick={() => handleRemove(m.qid)}
                    className="rounded-2xl border border-white/15 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-white/10"
                  >
                    Remove
                  </button>
                </div>
              </Card>
            </li>
          ))}
        </ul>
      )}

      {mistakes.length > 0 && visible.length === 0 ? (
        <div className="mt-4">
          <Callout tone="slate">Nothing with this error type — clear it or pick another filter.</Callout>
        </div>
      ) : null}
    </main>
  );
}

function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
        active
          ? "border-white bg-white text-slate-950"
          : "border-white/15 text-slate-200 hover:bg-white/5"
      }`}
    >
      {children}
    </button>
  );
}
