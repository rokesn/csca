// Tab bar for the 5-stage topic system (spec Sec 6):
// 1 Learn → 2 See → 3 Practice → 4 Timed → 5 Mastery.
// Controlled component: parent owns the active stage state.

"use client";

export const STAGES = [
  { id: 1, label: "Learn" },
  { id: 2, label: "See" },
  { id: 3, label: "Practice" },
  { id: 4, label: "Timed" },
  { id: 5, label: "Mastery" },
] as const;

export type StageId = (typeof STAGES)[number]["id"];

export interface StageTabsProps {
  active: StageId;
  onChange: (stage: StageId) => void;
}

export default function StageTabs({ active, onChange }: StageTabsProps) {
  return (
    <div
      role="tablist"
      aria-label="Topic stages"
      className="flex flex-wrap gap-1 rounded-2xl border border-white/10 bg-white/[0.03] p-1.5"
    >
      {STAGES.map((stage) => {
        const selected = active === stage.id;
        const completed = stage.id < active;
        return (
          <button
            key={stage.id}
            type="button"
            role="tab"
            aria-selected={selected}
            onClick={() => onChange(stage.id)}
            className={`flex items-center gap-2 rounded-xl px-3.5 py-2 text-sm font-bold transition ${
              selected
                ? "bg-white text-slate-950 shadow-lg"
                : "text-slate-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            <span
              className={`flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold ${
                selected
                  ? "bg-slate-950 text-white"
                  : "bg-white/10 text-slate-300"
              }`}
            >
              {stage.id}
            </span>
            {stage.label}
            {completed && !selected ? (
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-emerald-400"
              />
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
