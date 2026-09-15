import Link from "next/link";
import { notFound } from "next/navigation";
import { SYLLABUS_SUBJECTS } from "@/data/syllabus-overview";
import type { SubjectTopic } from "@/data/subject-topics";
import { BackLink, Callout, Eyebrow, GhostLink, PrimaryLink } from "./ui";
import { toneGradientMark } from "./subject-overview";

export default function TopicShell({
  subjectSlug,
  topic,
  prev,
  next,
}: {
  subjectSlug: string;
  topic: SubjectTopic;
  prev: SubjectTopic | null;
  next: SubjectTopic | null;
}) {
  const entry = SYLLABUS_SUBJECTS.find((s) => s.slug === subjectSlug);
  if (!entry) notFound();
  const config = entry.config;
  const mark = config.mark ?? config.name.charAt(0);

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 text-slate-200">
      <BackLink href={`/syllabus/${subjectSlug}`}>← {config.name} syllabus</BackLink>

      <div className="mt-4 flex items-start gap-4">
        <span
          aria-hidden="true"
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br font-display text-xl font-bold text-white ${toneGradientMark[config.tone]}`}
        >
          {mark}
        </span>
        <div>
          <Eyebrow tone={config.tone}>
            {config.name} · {topic.chapter}
          </Eyebrow>
          <h1 className="mt-2.5 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
            {topic.title}
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-slate-400">
            {topic.description}
          </p>
        </div>
      </div>

      <div className="mt-6">
        <Callout tone="amber" title="Full lesson coming soon">
          The complete lesson for this topic — key points, formulas, worked
          examples, practice and timed sets — lands here next. Meanwhile, train
          it with general practice and full mocks.
        </Callout>
      </div>

      <div className="mt-4 flex flex-wrap gap-2.5">
        <PrimaryLink href="/practice">Practice questions →</PrimaryLink>
        <GhostLink href="/mock">Full mock →</GhostLink>
        <GhostLink href={`/syllabus/${subjectSlug}`}>All {config.name} topics →</GhostLink>
      </div>

      {/* Prev / next topic */}
      <nav className="mt-8 grid gap-3 sm:grid-cols-2" aria-label="More topics">
        {prev ? (
          <Link
            href={`/study/${subjectSlug}/${prev.slug}`}
            className="block rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-white/25 hover:bg-white/[0.05]"
          >
            <p className="font-mono text-[11px] uppercase tracking-widest text-slate-500">← Previous</p>
            <p className="mt-1 text-sm font-bold text-white">{prev.title}</p>
          </Link>
        ) : (
          <span className="hidden sm:block" />
        )}
        {next ? (
          <Link
            href={`/study/${subjectSlug}/${next.slug}`}
            className="block rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-right transition hover:border-white/25 hover:bg-white/[0.05]"
          >
            <p className="font-mono text-[11px] uppercase tracking-widest text-slate-500">Next →</p>
            <p className="mt-1 text-sm font-bold text-white">{next.title}</p>
          </Link>
        ) : null}
      </nav>
    </main>
  );
}
