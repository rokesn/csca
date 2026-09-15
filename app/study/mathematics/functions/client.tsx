"use client";

import { useEffect, useMemo, useState } from "react";
import {
  FUNCTIONS_CHECKLIST,
  FUNCTIONS_FORMULAS,
  FUNCTIONS_LESSONS,
  FUNCTIONS_MEMORY,
  FUNCTIONS_OBJECTIVES,
  FUNCTIONS_RECOGNITION,
  FUNCTIONS_TRAPS,
} from "@/data/functions-lessons";
import { examQuestionsForFunctions } from "@/data/previous-exams";
import { FUNCTIONS_PRACTICE } from "@/data/functions-practice";
import ExamQuestionList from "@/components/exam-question-list";
import { M, MBlock } from "@/components/math";
import { toneGradientMark } from "@/components/subject-overview";
import {
  BackLink,
  Callout,
  Eyebrow,
  GhostLink,
  PrimaryLink,
  Stat,
  TonalCard,
} from "@/components/ui";

function Checklist() {
  const [done, setDone] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem("functions-checklist");
      if (raw) setDone(JSON.parse(raw));
    } catch (_e) {
      /* storage unavailable */
    }
  }, []);

  const toggle = (key: string) => {
    setDone((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      try {
        window.localStorage.setItem("functions-checklist", JSON.stringify(next));
      } catch (_e) {
        /* ignore */
      }
      return next;
    });
  };

  const total = FUNCTIONS_CHECKLIST.reduce((s, g) => s + g.items.length, 0);
  const count = Object.values(done).filter(Boolean).length;

  return (
    <div>
      <p className="mt-1 font-mono text-xs text-slate-400">
        {count}/{total} checked{count === total ? " — exam ready ✓" : ""}
      </p>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        {FUNCTIONS_CHECKLIST.map((g) => (
          <TonalCard key={g.group} tone="indigo">
            <h3 className="font-display font-bold text-white">{g.group}</h3>
            <ul className="mt-2 space-y-1.5 text-sm text-slate-300">
              {g.items.map((c) => {
                const checked = !!done[c];
                return (
                  <li key={c}>
                    <button
                      type="button"
                      onClick={() => toggle(c)}
                      aria-pressed={checked}
                      className={`flex w-full items-start gap-2.5 rounded-lg border px-2.5 py-2 text-left transition ${
                        checked
                          ? "border-emerald-400/40 bg-emerald-400/10"
                          : "border-white/10 bg-black/20 hover:border-white/30 hover:bg-white/[0.04]"
                      }`}
                    >
                      <span
                        aria-hidden="true"
                        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border font-mono text-xs font-bold ${
                          checked
                            ? "border-emerald-400 bg-emerald-400 text-slate-950"
                            : "border-white/25 text-transparent"
                        }`}
                      >
                        ✓
                      </span>
                      <span className={checked ? "text-slate-400 line-through" : ""}>
                        <M>{c}</M>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </TonalCard>
        ))}
      </div>
    </div>
  );
}

export default function FunctionsChapterClient() {
  const examQs = useMemo(() => examQuestionsForFunctions(), []);
  const examTotal = examQs.core.length + examQs.cross.length;

  return (
    <main className="text-slate-200">
      {/* Hero */}
      <section className="study-grid-bg border-b border-white/10">
        <div className="mx-auto max-w-4xl px-4 pb-10 pt-10">
          <BackLink href="/syllabus/mathematics">← Mathematics syllabus</BackLink>
          <div className="mt-4 flex items-start gap-4 sm:gap-5">
            <span
              aria-hidden="true"
              className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br font-display text-2xl font-bold text-white shadow-lg sm:h-16 sm:w-16 sm:text-3xl ${toneGradientMark.indigo}`}
            >
              F
            </span>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <Eyebrow tone="indigo">Mathematics · Module 2</Eyebrow>
                <Eyebrow tone="slate">{FUNCTIONS_LESSONS.length} lessons · biggest chapter</Eyebrow>
              </div>
              <h1 className="mt-2.5 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Functions — full chapter
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base">
                Trig, domains, monotonicity, parity, power, exponential and log —
                the most-tested chapter on the paper. Learn each idea, drill it,
                then prove it on previous-exam questions.
              </p>
            </div>
          </div>
          <div className="mt-5 flex flex-wrap gap-2.5">
            <PrimaryLink href="#practice">Start practice →</PrimaryLink>
            <GhostLink href="#formulas">Formula sheet →</GhostLink>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Stat value={String(FUNCTIONS_LESSONS.length)} label="lessons" tone="indigo" />
            <Stat value={String(examTotal)} label="previous-exam Qs" tone="indigo" />
            <Stat value={String(FUNCTIONS_FORMULAS.reduce((s, g) => s + g.items.length, 0))} label="key formulas" tone="indigo" />
            <Stat value="35%" label="exam weight" tone="indigo" />
          </div>
        </div>
      </section>

      {/* Sticky nav */}
      <div className="sticky top-16 z-30 border-b border-white/10 bg-[#060a17]/90 backdrop-blur">
        <div className="mx-auto flex max-w-4xl gap-2 overflow-x-auto px-4 py-2.5">
          {[
            ["#lessons", "Lessons"],
            ["#formulas", "Formulas"],
            ["#traps", "Traps"],
            ["#practice", "Practice"],
            ["#exam", "Previous exams"],
            ["#checklist", "Checklist"],
          ].map(([href, label]) => (
            <a
              key={href}
              href={href}
              className="shrink-0 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-xs font-bold text-slate-300 transition hover:border-white/25 hover:text-white"
            >
              {label}
            </a>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-10">
        {/* Objectives */}
        <TonalCard tone="indigo">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
            After this chapter you can
          </p>
          <ul className="mt-2 space-y-1.5 text-sm text-slate-300">
            {FUNCTIONS_OBJECTIVES.map((o) => (
              <li key={o} className="flex gap-2">
                <span aria-hidden="true" className="font-bold text-indigo-300">✓</span>
                <M>{o}</M>
              </li>
            ))}
          </ul>
        </TonalCard>

        {/* How to study */}
        <TonalCard tone="cyan" className="mt-3">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
            How to study this chapter
          </p>
          <ol className="mt-2 grid gap-1.5 sm:grid-cols-2">
            {[
              "Read the concept in simple words.",
              "Write down the exact formula.",
              "Work one easy example by hand.",
              "Name the trap for this type out loud.",
              "Solve Basic → Intermediate → Advanced.",
              "Finish with mixed + previous-exam questions.",
            ].map((s, i) => (
              <li key={s} className="flex gap-2 text-sm text-slate-300">
                <span aria-hidden="true" className="font-mono font-bold text-cyan-300">
                  {i + 1}.
                </span>
                <span>{s}</span>
              </li>
            ))}
          </ol>
        </TonalCard>

        {/* Lessons */}
        <h2 id="lessons" className="mt-12 scroll-mt-32 font-display text-2xl font-bold text-white">
          Lessons
        </h2>
        <div className="mt-4 space-y-5">
          {FUNCTIONS_LESSONS.map((l) => (
            <TonalCard key={l.id} tone="indigo" className="p-6 transition duration-200 hover:-translate-y-0.5 sm:p-7">
              <div className="flex items-center gap-4">
                <span
                  aria-hidden="true"
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br font-mono text-base font-bold text-white ${toneGradientMark.indigo}`}
                >
                  {String(l.no).padStart(2, "0")}
                </span>
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-slate-500">
                    Lesson {l.no} of {FUNCTIONS_LESSONS.length}
                  </p>
                  <h3 className="mt-0.5 font-display text-xl font-bold text-white">{l.title}</h3>
                </div>
              </div>

              <p className="mt-5 text-[11px] font-bold uppercase tracking-[0.18em] text-indigo-300">
                Learn the idea
              </p>
              <div className="mt-2 space-y-2.5 text-[15px] leading-relaxed text-slate-300">
                {l.body.map((p, i) => (
                  <MBlock key={i}>{p}</MBlock>
                ))}
              </div>

              <p className="mt-6 text-[11px] font-bold uppercase tracking-[0.18em] text-indigo-300">
                Key rules to memorize
              </p>
              <ol className="mt-2.5 space-y-2">
                {l.points.map((p, i) => (
                  <li key={p} className="flex gap-3 rounded-xl border border-white/10 bg-black/25 px-4 py-3 text-sm leading-relaxed text-slate-200">
                    <span aria-hidden="true" className="font-mono text-xs font-bold text-indigo-300">
                      {i + 1}.
                    </span>
                    <M>{p}</M>
                  </li>
                ))}
              </ol>

              <p className="mt-6 text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-300">
                Worked example
              </p>
              <div className="mt-2.5 rounded-xl border border-emerald-400/25 bg-emerald-400/[0.06] px-4 py-4 sm:px-5">
                <p className="text-[15px] font-semibold leading-relaxed text-white">
                  <M>{l.example.problem}</M>
                </p>
                <ol className="mt-3 space-y-1.5">
                  {l.example.steps.map((s, i) => (
                    <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-slate-300">
                      <span aria-hidden="true" className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-400/20 font-mono text-[10px] font-bold text-emerald-200">
                        {i + 1}
                      </span>
                      <M>{s}</M>
                    </li>
                  ))}
                </ol>
                <p className="mt-3 rounded-lg bg-black/30 px-3 py-2 font-mono text-sm font-bold text-emerald-200">
                  <M>{l.example.answer}</M>
                </p>
              </div>

              <div className="mt-5">
                <Callout tone="amber" title="Classic trap">
                  <M>{l.trap}</M>
                </Callout>
              </div>
            </TonalCard>
          ))}
        </div>

        {/* Formula sheet */}
        <h2 id="formulas" className="mt-12 scroll-mt-32 font-display text-2xl font-bold text-white">
          Master formula sheet
        </h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {FUNCTIONS_FORMULAS.map((g) => (
            <TonalCard key={g.group} tone="indigo">
              <h3 className="font-display font-bold text-white">{g.group}</h3>
              <ul className="mt-2 space-y-1.5">
                {g.items.map((f) => (
                  <li
                    key={f}
                    className="rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-slate-100"
                  >
                    <M>{f}</M>
                  </li>
                ))}
              </ul>
            </TonalCard>
          ))}
        </div>

        {/* Traps + recognition */}
        <h2 id="traps" className="mt-12 scroll-mt-32 font-display text-2xl font-bold text-white">
          Traps &amp; recognition
        </h2>
        <div className="mt-4 grid gap-3 lg:grid-cols-2">
          <Callout tone="amber" title={`${FUNCTIONS_TRAPS.length} classic traps`}>
            <ol className="list-decimal space-y-1 pl-5">
              {FUNCTIONS_TRAPS.map((t) => (
                <li key={t}>
                  <M>{t}</M>
                </li>
              ))}
            </ol>
          </Callout>
          <Callout tone="cyan" title="Fast problem recognition">
            <ul className="space-y-2">
              {FUNCTIONS_RECOGNITION.map((r) => (
                <li key={r.cue} className="border-b border-white/5 pb-2 last:border-0 last:pb-0">
                  <p className="font-bold text-slate-100">{r.cue}</p>
                  <p className="mt-0.5 text-slate-300">
                    <M>{r.action}</M>
                  </p>
                </li>
              ))}
            </ul>
          </Callout>
        </div>

        {/* Practice bank: 4 drills per lesson */}
        <h2 id="practice" className="mt-12 scroll-mt-32 font-display text-2xl font-bold text-white">
          Practice — 100 drill problems
        </h2>
        <p className="mt-1 max-w-3xl text-sm leading-relaxed text-slate-400">
          Four drills per lesson, basic to exam-pattern, each with the thinking
          shown. Master these and the previous-exam set below, and the chapter
          is yours. Tagged by lesson so you can drill exactly what you missed.
        </p>
        <div className="mt-2">
          <ExamQuestionList questions={FUNCTIONS_PRACTICE} unit="practice problems" />
        </div>

        {/* Previous exam questions */}
        <h2 id="exam" className="mt-12 scroll-mt-32 font-display text-2xl font-bold text-white">
          Previous CSCA exam questions
        </h2>
        <p className="mt-1 max-w-3xl text-sm leading-relaxed text-slate-400">
          Real Functions questions from the Dec 2025, Jan 2026 and Apr 2026 papers —
          solved with the thinking shown. Answers solved by the app; items with
          source errors are marked and still teach the correct math. Below the
          core set, {examQs.cross.length} related questions from other chapters
          drill the same Functions skills.
        </p>
        <div className="mt-2">
          <ExamQuestionList questions={examQs.core} />
        </div>
        <h3 className="mt-8 font-display text-lg font-bold text-white">
          Related — Functions skills tested elsewhere ({examQs.cross.length})
        </h3>
        <ul className="mt-2 space-y-1.5">
          {examQs.cross.map(({ q, why }) => (
            <li key={q.id} className="flex gap-2 text-sm text-slate-400">
              <span aria-hidden="true" className="font-mono text-[11px] font-bold text-cyan-300">
                {q.exam} · Q{q.no}
              </span>
              <M>{why}</M>
            </li>
          ))}
        </ul>
        <div className="mt-2">
          <ExamQuestionList questions={examQs.cross.map((c) => c.q)} />
        </div>

        {/* Checklist + memory */}
        <h2 id="checklist" className="mt-12 scroll-mt-32 font-display text-2xl font-bold text-white">
          Exam checklist
        </h2>
        <div className="mt-2">
          <Checklist />
        </div>
        <TonalCard tone="emerald" className="mt-3">
          <h3 className="font-display font-bold text-white">One-minute memory sheet</h3>
          <ul className="mt-2 grid gap-1.5 sm:grid-cols-2">
            {FUNCTIONS_MEMORY.map((m) => (
              <li key={m} className="rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm font-semibold text-slate-100">
                <M>{m}</M>
              </li>
            ))}
          </ul>
        </TonalCard>

        <div className="mt-8 flex flex-wrap gap-2.5">
          <PrimaryLink href="/practice">Timed practice →</PrimaryLink>
          <GhostLink href="/syllabus/mathematics">Back to syllabus →</GhostLink>
        </div>
      </div>
    </main>
  );
}
