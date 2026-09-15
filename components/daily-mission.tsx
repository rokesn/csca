"use client";

import { useEffect, useState } from "react";
import { Callout, Card, Meter } from "./ui";

export interface Mission {
  id: string;
  label: string;
  detail?: string;
}

/** Sec 24 — Today's CSCA Mission defaults. */
export const DEFAULT_MISSIONS: Mission[] = [
  { id: "math-15", label: "15 Math Qs", detail: "CSCA Standard difficulty" },
  { id: "mistakes-5", label: "Review 5 mistakes", detail: "Mistake Book first" },
  { id: "timed-10", label: "10-min timed set", detail: "Speed under pressure" },
  { id: "weak-1", label: "Learn one weak topic", detail: "Lesson + 5 practice Qs" },
];

function todayKey(): string {
  // Per-day checklist so missions reset each morning.
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `csca-daily-mission-${y}-${m}-${day}`;
}

export default function DailyMission({
  missions = DEFAULT_MISSIONS,
  storageKey,
}: {
  missions?: Mission[];
  storageKey?: string;
}) {
  const key = storageKey ?? todayKey();
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(key);
      if (raw) setChecked(JSON.parse(raw) as Record<string, boolean>);
    } catch {
      // Corrupt storage — start fresh.
    } finally {
      setLoaded(true);
    }
  }, [key]);

  useEffect(() => {
    if (!loaded) return;
    try {
      window.localStorage.setItem(key, JSON.stringify(checked));
    } catch {
      // Storage full/blocked — checklist still works in memory.
    }
  }, [checked, key, loaded]);

  const done = missions.filter((m) => checked[m.id]).length;
  const pct = missions.length === 0 ? 0 : Math.round((done / missions.length) * 100);

  return (
    <section aria-label="Today's CSCA Mission">
      <Card tone="cyan">
        <div className="flex items-baseline justify-between">
          <h2 className="text-lg font-bold text-white">Today&apos;s CSCA Mission</h2>
          <span className="text-sm font-semibold text-slate-400">
            {done}/{missions.length} · {pct}%
          </span>
        </div>

        <div className="mt-2">
          <Meter value={pct} tone="cyan" />
        </div>

        <ul className="mt-4 space-y-2">
          {missions.map((m) => {
            const isDone = !!checked[m.id];
            return (
              <li key={m.id}>
                <label
                  className={`flex cursor-pointer items-start gap-3 rounded-lg border p-3 text-sm transition ${
                    isDone
                      ? "border-emerald-400/30 bg-emerald-400/10"
                      : "border-white/10 hover:bg-white/5"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isDone}
                    onChange={() => setChecked((prev) => ({ ...prev, [m.id]: !prev[m.id] }))}
                    className="mt-0.5 h-4 w-4 accent-white"
                  />
                  <span>
                    <span className={`font-semibold ${isDone ? "text-emerald-200 line-through" : "text-slate-200"}`}>
                      {m.label}
                    </span>
                    {m.detail ? <span className="block text-xs text-slate-400">{m.detail}</span> : null}
                  </span>
                </label>
              </li>
            );
          })}
        </ul>

        {done === missions.length && missions.length > 0 ? (
          <div className="mt-3">
            <Callout tone="emerald">Mission complete — nicely done. Take a mock or rest.</Callout>
          </div>
        ) : null}

        <button
          type="button"
          onClick={() => setChecked({})}
          className="mt-3 text-xs font-medium text-slate-400 underline hover:text-slate-200"
        >
          Reset today&apos;s checklist
        </button>
      </Card>
    </section>
  );
}
