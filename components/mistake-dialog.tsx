"use client";

import { ERROR_REASONS, type ErrorReason } from "../lib/progress-store";
import { toneBadge } from "./ui";

export default function MistakeDialog({
  onPick,
}: {
  onPick: (r: ErrorReason) => void;
}) {
  return (
    <div className="rounded-2xl border border-rose-400/20 bg-gradient-to-b from-rose-500/[0.12] to-rose-500/[0.04] p-4">
      <p className="text-[11px] font-bold uppercase tracking-widest text-slate-500">
        Why did you get it wrong?
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {ERROR_REASONS.map((r) => (
          <button
            key={r.id}
            type="button"
            onClick={() => onPick(r.id)}
            className={`rounded-full border px-3.5 py-1.5 text-xs font-bold transition hover:-translate-y-0.5 ${toneBadge.rose} hover:border-rose-300/50`}
          >
            {r.label}
          </button>
        ))}
      </div>
    </div>
  );
}
