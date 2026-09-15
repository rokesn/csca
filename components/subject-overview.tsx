import type { Tone } from "./ui";
import { toneText } from "./ui";
import { BackLink, Callout, Eyebrow, GhostLink, PrimaryLink, TonalCard } from "./ui";

export interface SubjectModule {
  title: string;
  points: string[];
}

export interface SubjectConfig {
  area: string;
  name: string;
  tone: Tone;
  meta: [string, string][];
  intro: string;
  modules: SubjectModule[];
  examTips: string[];
  note?: string;
  /** Short badge shown in the hero mark (e.g. "M", "文"). Defaults to first letter of name. */
  mark?: string;
}

/** Gradient wash for the subject mark badge, keyed by tone. */
export const toneGradientMark: Record<Tone, string> = {
  indigo: "from-indigo-500 to-blue-500",
  emerald: "from-emerald-500 to-teal-500",
  amber: "from-amber-500 to-orange-500",
  rose: "from-rose-500 to-pink-500",
  cyan: "from-cyan-500 to-sky-500",
  violet: "from-violet-500 to-purple-500",
  slate: "from-slate-500 to-slate-400",
};

export default function SubjectOverview({
  config,
  backHref = "/study",
  backLabel = "← All subjects",
}: {
  config: SubjectConfig;
  backHref?: string;
  backLabel?: string;
}) {
  const mark = config.mark ?? config.name.charAt(0);
  return (
    <main className="mx-auto max-w-4xl px-4 py-10 text-slate-200">
      <BackLink href={backHref}>{backLabel}</BackLink>

      {/* Hero */}
      <div className="mt-4 flex items-start gap-4 sm:gap-5">
        <span
          aria-hidden="true"
          className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br font-display text-2xl font-bold text-white shadow-lg sm:h-16 sm:w-16 sm:text-3xl ${toneGradientMark[config.tone]}`}
        >
          {mark}
        </span>
        <div>
          <Eyebrow tone={config.tone}>{config.area}</Eyebrow>
          <h1 className="mt-2.5 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {config.name}
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base">
            {config.intro}
          </p>
        </div>
      </div>
      <div className="mt-5 flex flex-wrap gap-2.5">
        <PrimaryLink href="/diagnostic">Test my level →</PrimaryLink>
        <GhostLink href="/mock">Full mock →</GhostLink>
      </div>

      {/* Exam facts */}
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {config.meta.map(([k, v]) => (
          <div key={k} className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3.5">
            <p className="text-[11px] font-bold uppercase tracking-widest text-slate-500">{k}</p>
            <p className="mt-1 font-mono text-base font-bold text-white">{v}</p>
          </div>
        ))}
      </div>

      {/* Modules */}
      <div className="mt-10 flex items-baseline justify-between gap-3">
        <h2 className="font-display text-xl font-bold text-white">What to study</h2>
        <span className="font-mono text-xs text-slate-500">
          {config.modules.length} modules
        </span>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {config.modules.map((m, i) => (
          <TonalCard key={m.title} tone={config.tone} className="transition duration-200 hover:-translate-y-0.5">
            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br font-mono text-sm font-bold text-white ${toneGradientMark[config.tone]}`}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <p className="font-mono text-[11px] uppercase tracking-widest text-slate-500">
                  Module {i + 1}
                </p>
                <h3 className="font-display text-lg font-bold leading-tight text-white">{m.title}</h3>
              </div>
            </div>
            <ul className="mt-3 space-y-1.5 text-sm text-slate-400">
              {m.points.map((p) => (
                <li key={p} className="flex gap-2">
                  <span aria-hidden="true" className={`font-bold ${toneText[config.tone]}`}>✓</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </TonalCard>
        ))}
      </div>

      {/* Exam tips */}
      <h2 className="mt-10 font-display text-xl font-bold text-white">Exam tips</h2>
      <TonalCard tone={config.tone} className="mt-4">
        <ol className="space-y-3">
          {config.examTips.map((t, i) => (
            <li key={t} className="flex gap-3 text-sm leading-relaxed text-slate-300">
              <span
                aria-hidden="true"
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br font-mono text-[11px] font-bold text-white ${toneGradientMark[config.tone]}`}
              >
                {i + 1}
              </span>
              <span>{t}</span>
            </li>
          ))}
        </ol>
      </TonalCard>

      {config.note ? (
        <div className="mt-4">
          <Callout tone="amber" title="Coming soon">
            {config.note}
          </Callout>
        </div>
      ) : null}

      {/* CTA band */}
      <div className={`mt-8 rounded-3xl bg-gradient-to-br p-6 shadow-lg sm:p-7 ${toneGradientMark[config.tone]}`}>
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/80">
          Keep going
        </p>
        <p className="mt-1.5 font-display text-xl font-bold text-white">
          Ready to train {config.name}?
        </p>
        <p className="mt-1 text-sm text-white/85">
          Diagnose your level first, then drill weak modules at exam pace.
        </p>
        <div className="mt-4 flex flex-wrap gap-2.5">
          <PrimaryLink href="/practice">Practice questions →</PrimaryLink>
          <GhostLink href="/mock">Full mock →</GhostLink>
        </div>
      </div>
    </main>
  );
}
