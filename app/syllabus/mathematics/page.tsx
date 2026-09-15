import type { Metadata } from "next";
import Link from "next/link";
import { MATH_MODULES, MATH_SYLLABUS, MATH_TOPIC_COUNT } from "@/data/syllabus";
import { SETS_ALL } from "@/data/sets-inequalities-generated";
import { SYLLABUS_SUBJECTS } from "@/data/syllabus-overview";
import { toneGradientMark } from "@/components/subject-overview";
import {
  BackLink,
  Eyebrow,
  GhostLink,
  PrimaryLink,
  Stat,
  TonalCard,
} from "@/components/ui";

export const metadata: Metadata = {
  title: "Mathematics Syllabus — Full Topic Breakdown | CSCA-Prep",
  description: `Complete CSCA Mathematics syllabus: 4 exam modules, ${MATH_TOPIC_COUNT} topics with lessons, formulas and pacing. 48 MCQ, 60 min.`,
};

const math = SYLLABUS_SUBJECTS.find((s) => s.slug === "mathematics")!;
const tone = math.config.tone;

const TOTAL_HOURS = MATH_MODULES.reduce((sum, m) => sum + m.hours, 0);

export default function MathematicsSyllabusPage() {
  return (
    <main className="text-slate-200">
      {/* Hero */}
      <section className="study-grid-bg border-b border-white/10">
        <div className="mx-auto max-w-4xl px-4 pb-10 pt-10">
          <BackLink href="/syllabus">← All syllabi</BackLink>
          <div className="mt-4 flex items-start gap-4 sm:gap-5">
            <span
              aria-hidden="true"
              className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br font-display text-2xl font-bold text-white shadow-lg sm:h-16 sm:w-16 sm:text-3xl ${toneGradientMark[tone]}`}
            >
              M
            </span>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <Eyebrow tone={tone}>Syllabus · Mathematics</Eyebrow>
                <Eyebrow tone="slate">Required for all majors</Eyebrow>
              </div>
              <h1 className="mt-2.5 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Mathematics — full syllabus
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base">
                {math.config.intro} Every topic below has a complete 5-stage
                lesson (Learn → See → Practice → Timed → Mastery) — open any
                topic to start.
              </p>
            </div>
          </div>
          <div className="mt-5 flex flex-wrap gap-2.5">
            <PrimaryLink href="/study/mathematics">Start studying →</PrimaryLink>
            <GhostLink href="/study/mathematics/formulas">Formula Book →</GhostLink>
            <GhostLink href="/mock">Full mock →</GhostLink>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Stat value="48Q / 60m" label="format · ~75s per Q" tone={tone} />
            <Stat value={String(MATH_TOPIC_COUNT)} label="topics with lessons" tone={tone} />
            <Stat value="4" label="exam modules" tone={tone} />
            <Stat value={`${TOTAL_HOURS} hr`} label="suggested study time" tone={tone} />
          </div>
        </div>
      </section>

      {/* Sticky module nav */}
      <div className="sticky top-16 z-30 border-b border-white/10 bg-[#060a17]/90 backdrop-blur">
        <div className="mx-auto flex max-w-4xl gap-2 overflow-x-auto px-4 py-2.5">
          {MATH_MODULES.map((m) => (
            <a
              key={m.id}
              href={`#module-${m.id}`}
              className="shrink-0 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-xs font-bold text-slate-300 transition hover:border-white/25 hover:text-white"
            >
              {m.id}. {m.title}
            </a>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-10">
        {/* 4 exam modules → chapters → every topic */}
        {MATH_MODULES.map((mod) => {
          const chapters = MATH_SYLLABUS.filter((ch) =>
            mod.chapterIds.includes(ch.id),
          );
          const topicCount = chapters.reduce(
            (sum, ch) => sum + ch.topics.length,
            0,
          );
          return (
            <section key={mod.id} id={`module-${mod.id}`} className="mt-12 scroll-mt-32 first:mt-2">
              <div className="flex items-center gap-3.5">
                <span
                  aria-hidden="true"
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br font-mono text-lg font-bold text-white ${toneGradientMark[tone]}`}
                >
                  {String(mod.id).padStart(2, "0")}
                </span>
                <div className="min-w-0 flex-1">
                  <h2 className="font-display text-2xl font-bold text-white">
                    {mod.title}
                  </h2>
                  <p className="mt-0.5 font-mono text-[11px] text-slate-500">
                    {mod.weightPct}% weight · {mod.hours} hr · {mod.difficulty} · {topicCount} topics
                  </p>
                </div>
              </div>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-400">
                {mod.summary}
              </p>

              {chapters.map((ch) => (
                <div key={ch.id} className="mt-6">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h3 className="font-display text-lg font-bold text-white">
                      {ch.title}
                    </h3>
                    <span className="font-mono text-[11px] text-slate-500">
                      {ch.topics.length} topic{ch.topics.length === 1 ? "" : "s"} · {ch.hours} hr · {ch.difficulty}
                    </span>
                    {ch.id === "sets-inequalities" ? (
                      <Link
                        href="/study/mathematics/sets-inequalities"
                        className="rounded-lg border border-white/10 px-2.5 py-1 text-[11px] font-bold text-slate-200 transition hover:bg-white/5 hover:text-white"
                      >
                        Full chapter: 16 lessons + {SETS_ALL.length} problems →
                      </Link>
                    ) : ch.id === "functions" ? (
                      <Link
                        href="/study/mathematics/functions"
                        className="rounded-lg border border-white/10 px-2.5 py-1 text-[11px] font-bold text-slate-200 transition hover:bg-white/5 hover:text-white"
                      >
                        Full chapter: 21 lessons + exam questions →
                      </Link>
                    ) : null}
                  </div>
                  <p className="mt-1 max-w-3xl text-sm leading-relaxed text-slate-500">
                    {ch.description}
                  </p>

                  <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                    {ch.topics.map((t, ti) => (
                      <li key={t.id}>
                        <Link
                          href={`/study/mathematics/${t.slug}`}
                          className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 transition duration-200 hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/[0.05]"
                        >
                          <span
                            aria-hidden="true"
                            className="font-mono text-xs font-bold text-slate-500"
                          >
                            {String(ti + 1).padStart(2, "0")}
                          </span>
                          <span className="flex-1 text-sm font-bold text-slate-100 transition group-hover:text-white">
                            {t.title}
                          </span>
                          <span className="shrink-0 font-mono text-[11px] text-slate-500">
                            ~{t.timeTargetSec}s
                          </span>
                          <span
                            aria-hidden="true"
                            className="shrink-0 text-slate-500 transition group-hover:translate-x-0.5 group-hover:text-white"
                          >
                            →
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>
          );
        })}

        {/* Bottom CTA */}
        <div className={`mt-12 rounded-3xl bg-gradient-to-br p-6 shadow-lg sm:p-7 ${toneGradientMark[tone]}`}>
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/80">
            {MATH_TOPIC_COUNT} topics · one system
          </p>
          <p className="mt-1.5 font-display text-xl font-bold text-white">
            Pick a topic and run its 5 stages.
          </p>
          <p className="mt-1 text-sm text-white/85">
            Learn → See → Practice → Timed → Mastery, then prove it in a full 48Q mock.
          </p>
          <div className="mt-4 flex flex-wrap gap-2.5">
            <PrimaryLink href="/study/mathematics">Browse lessons →</PrimaryLink>
            <GhostLink href="/practice">Practice questions →</GhostLink>
          </div>
        </div>
        <p className="mt-4 text-xs text-slate-500">
          Topic taxonomy follows currently published CSCA syllabus info — validate
          against the official syllabus before publishing. Weights/hours follow the
          widely-reported third-party outline.
        </p>
      </div>
    </main>
  );
}
