// Study hub: SUBJECT → CHAPTER → TOPIC (spec Sec 27).
// Four designed subject cards route to each subject area.

import Link from "next/link";
import { MATH_SYLLABUS, MATH_TOPIC_COUNT } from "../../data/syllabus";
import { PageHeader, toneBadge } from "../../components/ui";
import type { Tone } from "../../components/ui";

interface SubjectCard {
  name: string;
  href: string;
  tone: Tone;
  mark: string;
  meta: string;
  desc: string;
  cta: string;
  badge?: string;
}

const SUBJECTS: SubjectCard[] = [
  {
    name: "Mathematics",
    href: "/study/mathematics",
    tone: "indigo",
    mark: "M",
    meta: `EN / CN · 60 min · 48 MCQ · ${MATH_SYLLABUS.length} chapters · ${MATH_TOPIC_COUNT} topics`,
    desc: "Sets, functions, calculus, geometry, vectors, probability — full 5-stage lessons, formula book and 48-question bank.",
    cta: "Start studying →",
    badge: "Complete",
  },
  {
    name: "Physics",
    href: "/study/physics",
    tone: "cyan",
    mark: "P",
    meta: "EN / CN · 60 min · 48 MCQ · 4 modules",
    desc: "Mechanics, electricity & magnetism, thermodynamics, optics and modern physics — syllabus, modules and exam tips.",
    cta: "Open Physics →",
  },
  {
    name: "Chemistry",
    href: "/study/chemistry",
    tone: "emerald",
    mark: "C",
    meta: "EN / CN · 60 min · 48 MCQ · 4 modules",
    desc: "Basic concepts, inorganic, organic, physical chemistry and experiments — reactions, equations and mole math.",
    cta: "Open Chemistry →",
  },
  {
    name: "Professional Chinese",
    href: "/study/chinese",
    tone: "amber",
    mark: "文",
    meta: "CN only · 90 min · 80 MCQ · Humanities / STEM",
    desc: "Reading, vocabulary, grammar and writing mechanics — plus which stream you need and who is exempt.",
    cta: "Open Chinese →",
  },
];

const toneGradient: Record<Tone, string> = {
  indigo: "from-indigo-500 to-blue-500",
  emerald: "from-emerald-500 to-teal-500",
  amber: "from-amber-500 to-orange-500",
  rose: "from-rose-500 to-pink-500",
  cyan: "from-cyan-500 to-sky-500",
  violet: "from-violet-500 to-purple-500",
  slate: "from-slate-500 to-slate-400",
};

export default function StudyPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <PageHeader
        eyebrow="Study"
        title="Pick your subject."
        desc="Four papers, one system. Mathematics has full 5-stage lessons today — Physics, Chemistry and Chinese ship the same way next. Every topic follows Learn → See → Practice → Timed → Mastery."
        tone="indigo"
      />

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {SUBJECTS.map((s) => (
          <Link
            key={s.name}
            href={s.href}
            className="group rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.02] p-6 shadow-[0_10px_36px_-16px_rgba(0,0,0,0.8)] transition-all duration-200 hover:-translate-y-1"
          >
            <div className="flex items-center gap-3.5">
              <span
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br font-display text-xl font-bold text-white ${toneGradient[s.tone]}`}
              >
                {s.mark}
              </span>
              <div>
                <h2 className="font-display text-xl font-bold text-white">
                  {s.name}
                  {s.badge ? (
                    <span className={`ml-2 rounded-full border px-2 py-0.5 align-middle text-[11px] font-bold ${toneBadge[s.tone]}`}>
                      {s.badge}
                    </span>
                  ) : null}
                </h2>
                <p className="mt-0.5 font-mono text-[11px] text-slate-500">{s.meta}</p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-slate-400">{s.desc}</p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-white">
              <span>{s.cta.replace(" →", "")}</span>
              <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
            </span>
          </Link>
        ))}
      </div>

      <p className="mt-6 text-center text-xs text-slate-500">
        Not sure which papers you need?{" "}
        <Link href="/onboarding" className="font-bold text-slate-200 underline hover:text-white">
          Run the subject wizard
        </Link>
        .
      </p>
    </main>
  );
}
