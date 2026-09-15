// Mathematics Formula Book: every topic's formulas as mono chips,
// with a sticky chapter index. Defensive: formulas accessed via fallback.

import Link from "next/link";
import * as syllabusData from "../../../../data/syllabus";
import {
  BackLink,
  Callout,
  Card,
  PageHeader,
} from "../../../../components/ui";

const { MATH_SYLLABUS } = syllabusData;

export default function MathFormulasPage() {
  return (
    <main className="mx-auto min-h-screen max-w-4xl px-4 py-10">
      <BackLink href="/study/mathematics">← Mathematics</BackLink>
      <div className="mt-2">
        <PageHeader
          eyebrow="Study · Mathematics"
          title="Formula Book"
          desc="Every Mathematics topic's formulas in one place. Tap a chapter below to jump to it."
          tone="indigo"
        />
      </div>
      <div className="mt-4">
        <Callout tone="indigo" title="Syllabus note">
          Syllabus mapping should be validated against the official syllabus
          (csca.cn).
        </Callout>
      </div>

      <nav
        aria-label="Chapters"
        className="sticky top-0 z-10 -mx-4 mt-6 border-b border-white/10 bg-[#060a17]/95 px-4 py-3 backdrop-blur"
      >
        <div className="flex flex-wrap gap-2">
          {MATH_SYLLABUS.map((chapter: any) => (
            <a
              key={(chapter as any).id}
              href={`#${(chapter as any).id}`}
              className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-semibold text-slate-200 transition hover:bg-white/[0.06] hover:text-white"
            >
              {(chapter as any).title}
            </a>
          ))}
        </div>
      </nav>

      <div className="mt-6 space-y-8">
        {MATH_SYLLABUS.map((chapter: any) => (
          <section
            key={(chapter as any).id}
            id={(chapter as any).id}
            className="scroll-mt-20"
          >
            <h2 className="font-display text-xl font-semibold text-white">
              {(chapter as any).title}
            </h2>
            <p className="mt-1 text-sm leading-relaxed text-slate-400">
              {(chapter as any).description}
            </p>
            <div className="mt-3 space-y-4">
              {(((chapter as any).topics ?? []) as any[]).map((topic: any) => {
                const formulas: string[] =
                  (topic as any)?.formulas ?? [];
                return (
                  <Card
                    key={(topic as any).id}
                    tone="slate"
                    className="p-4"
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="font-display font-medium text-white">
                        {(topic as any).title}
                      </h3>
                      <Link
                        href={`/study/mathematics/${(topic as any).slug}`}
                        className="text-xs font-semibold text-slate-200 underline decoration-slate-600 underline-offset-4 hover:text-white"
                      >
                        Lesson →
                      </Link>
                    </div>
                    {formulas.length > 0 ? (
                      <ul className="mt-2 space-y-1">
                        {formulas.map((formula) => (
                          <li
                            key={formula}
                            className="rounded-lg border border-white/10 bg-black/40 px-3 py-2 font-mono text-sm text-slate-100"
                          >
                            {formula}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="mt-2 text-sm leading-relaxed text-slate-400">
                        No formulas listed for this topic yet.
                      </p>
                    )}
                  </Card>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
