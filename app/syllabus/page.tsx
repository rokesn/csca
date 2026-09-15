import type { Metadata } from "next";
import Link from "next/link";
import { SYLLABUS_SUBJECTS } from "@/data/syllabus-overview";
import { toneGradientMark } from "@/components/subject-overview";
import {
  BackLink,
  Eyebrow,
  GhostLink,
  PrimaryLink,
  Stat,
  TonalCard,
  toneText,
} from "@/components/ui";

export const metadata: Metadata = {
  title: "Syllabus — All Subjects | CSCA-Prep",
  description:
    "Complete CSCA syllabus in one place: Mathematics, Physics, Chemistry (48 MCQ / 60 min each) and Professional Chinese (80 MCQ / 90 min). Each subject has its own detail page.",
};

const STATS: [string, string][] = [
  ["4", "subjects mapped"],
  ["16", "modules total"],
  ["48Q / 60m", "sciences pace"],
  ["80Q / 90m", "chinese pace"],
];

export default function SyllabusIndexPage() {
  return (
    <main className="text-slate-200">
      {/* Hero */}
      <section className="study-grid-bg border-b border-white/10">
        <div className="mx-auto max-w-4xl px-4 pb-10 pt-10">
          <BackLink href="/">← Home</BackLink>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <Eyebrow tone="violet">Syllabus · 2026</Eyebrow>
            <Eyebrow tone="slate">All papers in one place</Eyebrow>
          </div>
          <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-white sm:text-5xl">
            Every paper, mapped.
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base">
            Mathematics, Physics and Chemistry run 48 multiple-choice in 60
            minutes (0–100); Professional Chinese runs 80 multiple-choice in
            90 minutes (Humanities / STEM streams, Chinese only). Study the
            full breakdown below or open a subject page.
          </p>
          <div className="mt-5 flex flex-wrap gap-2.5">
            <PrimaryLink href="/diagnostic">Test my level →</PrimaryLink>
            <GhostLink href="/mock">Full mock →</GhostLink>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {STATS.map(([v, l]) => (
              <Stat key={l} value={v} label={l} tone="violet" />
            ))}
          </div>
        </div>
      </section>

      {/* Sticky subject nav */}
      <div className="sticky top-16 z-30 border-b border-white/10 bg-[#060a17]/90 backdrop-blur">
        <div className="mx-auto flex max-w-4xl gap-2 overflow-x-auto px-4 py-2.5">
          {SYLLABUS_SUBJECTS.map(({ slug, config }) => (
            <a
              key={slug}
              href={`#${slug}`}
              className="flex shrink-0 items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-xs font-bold text-slate-300 transition hover:border-white/25 hover:text-white"
            >
              <span
                aria-hidden="true"
                className={`flex h-5 w-5 items-center justify-center rounded-md bg-gradient-to-br text-[10px] font-bold text-white ${toneGradientMark[config.tone]}`}
              >
                {config.mark ?? config.name.charAt(0)}
              </span>
              {config.name}
            </a>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-10">
        {/* Subject cards */}
        <div className="grid gap-3 sm:grid-cols-2">
          {SYLLABUS_SUBJECTS.map(({ href, config }) => (
            <Link key={href} href={href} className="group block">
              <TonalCard
                tone={config.tone}
                className="h-full transition duration-200 hover:-translate-y-1"
              >
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br font-display text-lg font-bold text-white ${toneGradientMark[config.tone]}`}
                  >
                    {config.mark ?? config.name.charAt(0)}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate font-display text-lg font-bold text-white">
                      {config.name}
                    </p>
                    <p className="truncate font-mono text-[11px] text-slate-500">
                      {config.meta.map(([, v]) => v).join(" · ")}
                    </p>
                  </div>
                  <span
                    aria-hidden="true"
                    className="ml-auto text-slate-500 transition group-hover:translate-x-1 group-hover:text-white"
                  >
                    →
                  </span>
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {config.modules.map((m) => (
                    <span
                      key={m.title}
                      className="rounded-full border border-white/10 bg-black/20 px-2.5 py-1 text-[11px] font-semibold text-slate-300"
                    >
                      {m.title}
                    </span>
                  ))}
                </div>
              </TonalCard>
            </Link>
          ))}
        </div>

        {/* Full syllabus, all subjects on this page */}
        {SYLLABUS_SUBJECTS.map(({ href, slug, config }) => (
          <section key={slug} id={slug} className="mt-12 scroll-mt-32">
            <div className="flex items-center gap-3.5">
              <span
                aria-hidden="true"
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br font-display text-xl font-bold text-white ${toneGradientMark[config.tone]}`}
              >
                {config.mark ?? config.name.charAt(0)}
              </span>
              <div className="min-w-0 flex-1">
                <h2 className="font-display text-2xl font-bold text-white">
                  {config.name}
                </h2>
                <p className="mt-0.5 font-mono text-[11px] text-slate-500">
                  {config.meta.map(([k, v]) => `${k}: ${v}`).join(" · ")}
                </p>
              </div>
              <Link
                href={href}
                className="shrink-0 rounded-xl border border-white/10 px-3.5 py-2 text-xs font-bold text-slate-200 transition hover:bg-white/5 hover:text-white"
              >
                Full page →
              </Link>
            </div>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-400">
              {config.intro}
            </p>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {config.modules.map((m, i) => (
                <TonalCard
                  key={m.title}
                  tone={config.tone}
                  className="transition duration-200 hover:-translate-y-0.5"
                >
                  <div className="flex items-center gap-3">
                    <span
                      aria-hidden="true"
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br font-mono text-sm font-bold text-white ${toneGradientMark[config.tone]}`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-display text-lg font-bold leading-tight text-white">
                      {m.title}
                    </h3>
                  </div>
                  <ul className="mt-3 space-y-1.5 text-sm text-slate-400">
                    {m.points.map((p) => (
                      <li key={p} className="flex gap-2">
                        <span
                          aria-hidden="true"
                          className={`font-bold ${toneText[config.tone]}`}
                        >
                          ✓
                        </span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </TonalCard>
              ))}
            </div>

            <TonalCard tone={config.tone} className="mt-3">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
                Exam tips
              </p>
              <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-slate-300">
                {config.examTips.map((t) => (
                  <li key={t} className="flex gap-2">
                    <span
                      aria-hidden="true"
                      className={`font-bold ${toneText[config.tone]}`}
                    >
                      ✓
                    </span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </TonalCard>
          </section>
        ))}

        {/* Bottom CTA */}
        <div className="mt-12 rounded-3xl bg-gradient-to-br from-violet-500 to-indigo-500 p-6 shadow-lg sm:p-7">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/80">
            Next step
          </p>
          <p className="mt-1.5 font-display text-xl font-bold text-white">
            Know the syllabus. Now find your gaps.
          </p>
          <p className="mt-1 text-sm text-white/85">
            A 10–15 minute diagnostic shows exactly which modules need work.
          </p>
          <div className="mt-4 flex flex-wrap gap-2.5">
            <PrimaryLink href="/diagnostic">Start free diagnostic →</PrimaryLink>
            <GhostLink href="/practice">Practice questions →</GhostLink>
          </div>
        </div>
        <p className="mt-4 text-xs text-slate-500">
          Topic lists summarize the official syllabus documents — always verify
          against csca.cn and your target university notice before exam day.
        </p>
      </div>
    </main>
  );
}
