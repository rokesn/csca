// Full syllabus page shared by Physics, Chemistry and Professional Chinese:
// hero + stats + sticky chapter nav + topic-name lists (like Mathematics),
// each topic linking to its dedicated lesson page at /study/[subject]/[topic].

import Link from "next/link";
import { SYLLABUS_SUBJECTS } from "@/data/syllabus-overview";
import { buildSubjectChapters } from "@/data/subject-topics";
import { toneGradientMark } from "./subject-overview";
import {
  BackLink,
  Eyebrow,
  GhostLink,
  PrimaryLink,
  Stat,
} from "./ui";
import { notFound } from "next/navigation";

export default function SubjectSyllabusPage({
  slug,
  backHref = "/syllabus",
  backLabel = "← All syllabi",
}: {
  slug: string;
  backHref?: string;
  backLabel?: string;
}) {
  const entry = SYLLABUS_SUBJECTS.find((s) => s.slug === slug);
  if (!entry) notFound();
  const config = entry.config;
  const tone = config.tone;
  const mark = config.mark ?? config.name.charAt(0);
  const chapters = buildSubjectChapters(slug);
  const topicCount = chapters.reduce((sum, ch) => sum + ch.topics.length, 0);

  return (
    <main className="text-slate-200">
      {/* Hero */}
      <section className="study-grid-bg border-b border-white/10">
        <div className="mx-auto max-w-4xl px-4 pb-10 pt-10">
          <BackLink href={backHref}>{backLabel}</BackLink>
          <div className="mt-4 flex items-start gap-4 sm:gap-5">
            <span
              aria-hidden="true"
              className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br font-display text-2xl font-bold text-white shadow-lg sm:h-16 sm:w-16 sm:text-3xl ${toneGradientMark[tone]}`}
            >
              {mark}
            </span>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <Eyebrow tone={tone}>{config.area}</Eyebrow>
              </div>
              <h1 className="mt-2.5 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
                {config.name} — full syllabus
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base">
                {config.intro} Open any topic for its dedicated lesson page.
              </p>
            </div>
          </div>
          <div className="mt-5 flex flex-wrap gap-2.5">
            <PrimaryLink href="/practice">Practice →</PrimaryLink>
            <GhostLink href="/mock">Full mock →</GhostLink>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {config.meta.map(([k, v]) => (
              <Stat key={k} value={v} label={k.toLowerCase()} tone={tone} />
            ))}
          </div>
        </div>
      </section>

      {/* Sticky chapter nav */}
      <div className="sticky top-16 z-30 border-b border-white/10 bg-[#060a17]/90 backdrop-blur">
        <div className="mx-auto flex max-w-4xl gap-2 overflow-x-auto px-4 py-2.5">
          {chapters.map((ch, i) => (
            <a
              key={ch.id}
              href={`#${ch.id}`}
              className="shrink-0 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-xs font-bold text-slate-300 transition hover:border-white/25 hover:text-white"
            >
              {i + 1}. {ch.title}
            </a>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-10">
        <p className="font-mono text-xs text-slate-500">
          {chapters.length} modules · {topicCount} topics
        </p>

        {chapters.map((ch, i) => (
          <section key={ch.id} id={ch.id} className="mt-10 scroll-mt-32">
            <div className="flex items-center gap-3.5">
              <span
                aria-hidden="true"
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br font-mono text-base font-bold text-white ${toneGradientMark[tone]}`}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h2 className="font-display text-xl font-bold text-white">
                  {ch.title}
                </h2>
                <p className="font-mono text-[11px] text-slate-500">
                  {ch.topics.length} topic{ch.topics.length === 1 ? "" : "s"}
                </p>
              </div>
            </div>

            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {ch.topics.map((t, ti) => (
                <li key={t.id}>
                  <Link
                    href={`/study/${slug}/${t.slug}`}
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
          </section>
        ))}

        {/* Bottom CTA */}
        <div className={`mt-12 rounded-3xl bg-gradient-to-br p-6 shadow-lg sm:p-7 ${toneGradientMark[tone]}`}>
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/80">
            {topicCount} topics · one system
          </p>
          <p className="mt-1.5 font-display text-xl font-bold text-white">
            Pick a topic and start learning.
          </p>
          <p className="mt-1 text-sm text-white/85">
            Full lessons with formulas land on each topic page next.
          </p>
          <div className="mt-4 flex flex-wrap gap-2.5">
            <PrimaryLink href="/practice">Practice questions →</PrimaryLink>
            <GhostLink href="/mock">Full mock →</GhostLink>
          </div>
        </div>
      </div>
    </main>
  );
}
