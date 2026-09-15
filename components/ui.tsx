import Link from "next/link";
import type { ReactNode } from "react";

/* ---------- tone system (Material 3 inspired, dark) ---------- */
export type Tone = "indigo" | "emerald" | "amber" | "rose" | "cyan" | "violet" | "slate";

export const toneText: Record<Tone, string> = {
  indigo: "text-indigo-300",
  emerald: "text-emerald-300",
  amber: "text-amber-300",
  rose: "text-rose-300",
  cyan: "text-cyan-300",
  violet: "text-violet-300",
  slate: "text-slate-300",
};

export const toneBadge: Record<Tone, string> = {
  indigo: "border-indigo-400/30 bg-indigo-400/10 text-indigo-200",
  emerald: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
  amber: "border-amber-400/30 bg-amber-400/10 text-amber-200",
  rose: "border-rose-400/30 bg-rose-400/10 text-rose-200",
  cyan: "border-cyan-400/30 bg-cyan-400/10 text-cyan-200",
  violet: "border-violet-400/30 bg-violet-400/10 text-violet-200",
  slate: "border-white/10 bg-white/5 text-slate-300",
};

export const toneBar: Record<Tone, string> = {
  indigo: "bg-indigo-400",
  emerald: "bg-emerald-400",
  amber: "bg-amber-400",
  rose: "bg-rose-400",
  cyan: "bg-cyan-400",
  violet: "bg-violet-400",
  slate: "bg-slate-300",
};

export const toneRing: Record<Tone, string> = {
  indigo: "hover:border-indigo-400/50",
  emerald: "hover:border-emerald-400/50",
  amber: "hover:border-amber-400/50",
  rose: "hover:border-rose-400/50",
  cyan: "hover:border-cyan-400/50",
  violet: "hover:border-violet-400/50",
  slate: "hover:border-white/30",
};

export const AREA_TONE: Record<string, Tone> = {
  study: "indigo",
  practice: "emerald",
  mock: "amber",
  mistakes: "rose",
  plan: "cyan",
  progress: "violet",
  diagnostic: "emerald",
  onboarding: "cyan",
  resources: "slate",
  formulas: "violet",
};

/* ---------- primitives ---------- */

export function Eyebrow({ children, tone = "slate" }: { children: ReactNode; tone?: Tone }) {
  return (
    <p className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] ${toneBadge[tone]}`}>
      {children}
    </p>
  );
}

export function PageHeader({
  eyebrow,
  title,
  desc,
  tone = "slate",
  actions,
}: {
  eyebrow: string;
  title: string;
  desc?: string;
  tone?: Tone;
  actions?: ReactNode;
}) {
  return (
    <div>
      <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
      <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">{title}</h1>
      {desc ? <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base">{desc}</p> : null}
      {actions ? <div className="mt-5 flex flex-wrap gap-2.5">{actions}</div> : null}
    </div>
  );
}

export function Card({ children, tone = "slate", className = "" }: { children: ReactNode; tone?: Tone; className?: string }) {
  return (
    <div className={`rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.02] p-5 shadow-[0_10px_36px_-16px_rgba(0,0,0,0.8)] transition-all duration-200 hover:-translate-y-0.5 ${toneRing[tone]} ${className}`}>
      {children}
    </div>
  );
}

export function TonalCard({ children, tone = "slate", className = "" }: { children: ReactNode; tone?: Tone; className?: string }) {
  const bg: Record<Tone, string> = {
    indigo: "from-indigo-500/[0.14] to-indigo-500/[0.04] border-indigo-400/20",
    emerald: "from-emerald-500/[0.14] to-emerald-500/[0.04] border-emerald-400/20",
    amber: "from-amber-500/[0.14] to-amber-500/[0.04] border-amber-400/20",
    rose: "from-rose-500/[0.14] to-rose-500/[0.04] border-rose-400/20",
    cyan: "from-cyan-500/[0.14] to-cyan-500/[0.04] border-cyan-400/20",
    violet: "from-violet-500/[0.14] to-violet-500/[0.04] border-violet-400/20",
    slate: "from-white/[0.06] to-white/[0.02] border-white/10",
  };
  return <div className={`rounded-3xl border bg-gradient-to-b p-5 ${bg[tone]} ${className}`}>{children}</div>;
}

export function Callout({ tone = "slate", title, children }: { tone?: Tone; title?: string; children: ReactNode }) {
  return (
    <div className={`rounded-2xl border px-4 py-3 text-sm ${toneBadge[tone]}`}>
      {title ? <p className="font-bold">{title}</p> : null}
      <div className="mt-0.5 text-[13px] leading-relaxed opacity-90">{children}</div>
    </div>
  );
}

export function PrimaryLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="inline-flex items-center gap-1.5 rounded-2xl bg-white px-5 py-2.5 text-sm font-bold text-slate-950 shadow-lg transition hover:bg-indigo-100">
      {children}
    </Link>
  );
}

export function GhostLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="inline-flex items-center gap-1.5 rounded-2xl border border-white/15 bg-white/[0.03] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-white/10">
      {children}
    </Link>
  );
}

export function BackLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="text-[13px] font-bold text-slate-400 transition hover:text-white">
      {children}
    </Link>
  );
}

export function Meter({ value, tone = "indigo" }: { value: number; tone?: Tone }) {
  return (
    <div className="h-2.5 w-full overflow-hidden rounded-full bg-white/10" role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100}>
      <div className={`h-full rounded-full transition-all ${toneBar[tone]}`} style={{ width: `${Math.max(0, Math.min(100, value))}%` }} />
    </div>
  );
}

export function Stat({ value, label, tone = "slate" }: { value: string; label: string; tone?: Tone }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3.5">
      <p className={`font-display text-2xl font-bold ${toneText[tone]}`}>{value}</p>
      <p className="mt-1 text-xs text-slate-500">{label}</p>
    </div>
  );
}
