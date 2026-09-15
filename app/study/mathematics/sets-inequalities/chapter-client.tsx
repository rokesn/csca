"use client";

import { useEffect, useMemo, useState } from "react";
import {
  LESSON_EXAMPLES,
  SETS_CHECKLIST,
  SETS_FORMULAS,
  SETS_LESSONS,
  SETS_MEMORY,
  SETS_OBJECTIVES,
  SETS_RECOGNITION,
  SETS_STUDY_ORDER,
  SETS_TRAPS,
} from "@/data/sets-inequalities-lessons";
import { SETS_ALL } from "@/data/sets-inequalities-generated";
import { SETS_SOLUTIONS } from "@/data/sets-inequalities-solutions";
import type { ChapterProblemLevel } from "@/data/sets-inequalities-problems";
import { examQuestionsByChapter } from "@/data/previous-exams";
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

const LETTERS = ["A", "B", "C", "D"];
type Filter = "all" | ChapterProblemLevel;

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: `All ${SETS_ALL.length}` },
  { id: "basic", label: `Basic · ${SETS_ALL.filter((p) => p.level === "basic").length}` },
  { id: "intermediate", label: `Intermediate · ${SETS_ALL.filter((p) => p.level === "intermediate").length}` },
  { id: "advanced", label: `Advanced · ${SETS_ALL.filter((p) => p.level === "advanced").length}` },
];

/** Interactive exam checklist — click to mark done, progress saved in browser. */
function Checklist() {
  const [done, setDone] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem("sets-checklist");
      if (raw) setDone(JSON.parse(raw));
    } catch (_e) {
      /* storage unavailable — checklist still works for this visit */
    }
  }, []);

  const toggle = (key: string) => {
    setDone((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      try {
        window.localStorage.setItem("sets-checklist", JSON.stringify(next));
      } catch (_e) {
        /* ignore */
      }
      return next;
    });
  };

  const total = SETS_CHECKLIST.reduce((s, g) => s + g.items.length, 0);
  const count = Object.values(done).filter(Boolean).length;

  return (
    <div>
      <p className="mt-1 font-mono text-xs text-slate-400">
        {count}/{total} checked{count === total ? " — exam ready ✓" : ""}
      </p>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        {SETS_CHECKLIST.map((g) => (
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

export default function SetsChapterClient() {
  const [filter, setFilter] = useState<Filter>("all");
  const [picked, setPicked] = useState<Record<number, number>>({});

  const problems = useMemo(
    () => (filter === "all" ? SETS_ALL : SETS_ALL.filter((p) => p.level === filter)),
    [filter],
  );
  const answered = Object.keys(picked).length;
  const correct = useMemo(
    () =>
      SETS_ALL.filter((p) => picked[p.id] === p.answer).length,
    [picked],
  );

  return (
    <main className="text-slate-200">
      {/* Hero */}
      <section className="study-grid-bg border-b border-white/10">
        <div className="mx-auto max-w-4xl px-4 pb-10 pt-10">
          <BackLink href="/syllabus/mathematics">← Mathematics syllabus</BackLink>
          <div className="mt-4 flex items-start gap-4 sm:gap-5">
            <span
              aria-hidden="true"
              className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br font-display text-xl font-bold text-white shadow-lg sm:h-16 sm:w-16 sm:text-2xl ${toneGradientMark.indigo}`}
            >
              ∩
            </span>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <Eyebrow tone="indigo">Mathematics · Module 1</Eyebrow>
                <Eyebrow tone="slate">{SETS_LESSONS.length} lessons · {SETS_ALL.length} problems</Eyebrow>
              </div>
              <h1 className="mt-2.5 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Sets &amp; Inequalities — full chapter
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base">
                Learn each idea, drill it with Basic → Intermediate → Advanced
                problems, and finish with mixed practice. Every problem shows
                its thinking right after you answer.
              </p>
            </div>
          </div>
          <div className="mt-5 flex flex-wrap gap-2.5">
            <PrimaryLink href="#practice">Start practice →</PrimaryLink>
            <GhostLink href="#formulas">Formula sheet →</GhostLink>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Stat value={String(SETS_LESSONS.length)} label="lessons" tone="indigo" />
            <Stat value={String(SETS_ALL.length)} label="practice problems" tone="indigo" />
            <Stat value={String(SETS_FORMULAS.reduce((s, g) => s + g.items.length, 0))} label="key formulas" tone="indigo" />
            <Stat value={String(answered)} label={`answered · ${correct} correct`} tone="indigo" />
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
            ["#practice", "Practice 100"],
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
            {SETS_OBJECTIVES.map((o) => (
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
            {SETS_STUDY_ORDER.map((s, i) => (
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
          {SETS_LESSONS.map((l) => {
            const ex = LESSON_EXAMPLES[l.id];
            return (
            <TonalCard key={l.id} tone="indigo" className="p-6 transition duration-200 hover:-translate-y-0.5 sm:p-7">
              {/* Header */}
              <div className="flex items-center gap-4">
                <span
                  aria-hidden="true"
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br font-mono text-base font-bold text-white ${toneGradientMark.indigo}`}
                >
                  {String(l.no).padStart(2, "0")}
                </span>
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-slate-500">
                    Lesson {l.no} of {SETS_LESSONS.length}
                  </p>
                  <h3 className="mt-0.5 font-display text-xl font-bold text-white">{l.title}</h3>
                </div>
              </div>

              {/* Learn */}
              <p className="mt-5 text-[11px] font-bold uppercase tracking-[0.18em] text-indigo-300">
                Learn the idea
              </p>
              <div className="mt-2 space-y-2.5 text-[15px] leading-relaxed text-slate-300">
                {l.body.map((p, i) => (
                  <MBlock key={i}>{p}</MBlock>
                ))}
              </div>

              {/* Key rules */}
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

              {/* Worked example */}
              {ex ? (
                <>
                  <p className="mt-6 text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-300">
                    Worked example
                  </p>
                  <div className="mt-2.5 rounded-xl border border-emerald-400/25 bg-emerald-400/[0.06] px-4 py-4 sm:px-5">
                    <p className="text-[15px] font-semibold leading-relaxed text-white">
                      <M>{ex.problem}</M>
                    </p>
                    <ol className="mt-3 space-y-1.5">
                      {ex.steps.map((s, i) => (
                        <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-slate-300">
                          <span aria-hidden="true" className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-400/20 font-mono text-[10px] font-bold text-emerald-200">
                            {i + 1}
                          </span>
                          <M>{s}</M>
                        </li>
                      ))}
                    </ol>
                    <p className="mt-3 rounded-lg bg-black/30 px-3 py-2 font-mono text-sm font-bold text-emerald-200">
                      <M>{ex.answer}</M>
                    </p>
                  </div>
                </>
              ) : null}

              {/* Trap */}
              <div className="mt-5">
                <Callout tone="amber" title="Classic trap">
                  <M>{l.trap}</M>
                </Callout>
              </div>
            </TonalCard>
            );
          })}
        </div>

        {/* Formula sheet */}
        <h2 id="formulas" className="mt-12 scroll-mt-32 font-display text-2xl font-bold text-white">
          Master formula sheet
        </h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {SETS_FORMULAS.map((g) => (
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
          <Callout tone="amber" title="15 classic traps">
            <ol className="list-decimal space-y-1 pl-5">
              {SETS_TRAPS.map((t) => (
                <li key={t}>
                  <M>{t}</M>
                </li>
              ))}
            </ol>
          </Callout>
          <Callout tone="cyan" title="Fast problem recognition">
            <ul className="space-y-2">
              {SETS_RECOGNITION.map((r) => (
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

        {/* Practice */}
        <div className="mt-12 flex flex-wrap items-center justify-between gap-3">
          <h2 id="practice" className="scroll-mt-32 font-display text-2xl font-bold text-white">
            Practice — {SETS_ALL.length} problems
          </h2>
          <p className="font-mono text-xs text-slate-400">
            {correct}/{answered} correct
          </p>
        </div>
        <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Difficulty filter">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              aria-pressed={filter === f.id}
              className={`rounded-full border px-4 py-1.5 text-xs font-bold ${
                filter === f.id
                  ? "border-white bg-white text-slate-950"
                  : "border-white/15 text-slate-200 hover:bg-white/5"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <ol className="mt-4 space-y-3">
          {problems.map((p) => {
            const sel = picked[p.id];
            const done = sel !== undefined;
            const steps = p.steps ?? SETS_SOLUTIONS[p.id] ?? [];
            return (
              <li key={p.id} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-5">
                <div className="flex items-center gap-2">
                  <span className="rounded-md bg-white/10 px-2 py-0.5 font-mono text-[11px] font-bold text-slate-200">
                    Q{p.id}
                  </span>
                  <span className="rounded-md border border-white/10 px-2 py-0.5 font-mono text-[11px] text-slate-400">
                    {p.level} · {p.topic}
                  </span>
                </div>
                <div className="mt-2 text-[15px] font-semibold leading-relaxed text-white">
                  <M>{p.question}</M>
                </div>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {p.options.map((opt, i) => {
                    const isAnswer = i === p.answer;
                    const isSel = sel === i;
                    let cls = "border-white/10 bg-white/[0.03] text-slate-200 hover:border-white/30 hover:bg-white/[0.06]";
                    if (done && isAnswer) cls = "border-emerald-400/60 bg-emerald-400/10 text-white";
                    else if (done && isSel) cls = "border-rose-400/60 bg-rose-400/10 text-white";
                    return (
                      <button
                        key={i}
                        type="button"
                        disabled={done}
                        onClick={() => setPicked((s) => ({ ...s, [p.id]: i }))}
                        className={`flex items-center gap-2.5 rounded-xl border px-3.5 py-2.5 text-left text-sm transition ${cls}`}
                      >
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-black/30 font-mono text-[11px] font-bold">
                          {LETTERS[i]}
                        </span>
                        <M>{opt}</M>
                      </button>
                    );
                  })}
                </div>
                {done ? (
                  <div className="mt-3 space-y-2">
                    <Callout tone={sel === p.answer ? "emerald" : "rose"} title={sel === p.answer ? `Correct — ${LETTERS[p.answer]}` : `Answer: ${LETTERS[p.answer]}`}>
                      <M>{p.thinking}</M>
                    </Callout>
                    {steps.length > 0 ? (
                      <div className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3">
                        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
                          Full solution
                        </p>
                        <ol className="mt-2 space-y-1.5">
                          {steps.map((s, i) => (
                            <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-slate-200">
                              <span aria-hidden="true" className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/10 font-mono text-[10px] font-bold text-slate-300">
                                {i + 1}
                              </span>
                              <M>{s}</M>
                            </li>
                          ))}
                        </ol>
                      </div>
                    ) : null}
                  </div>
                ) : null}
              </li>
            );
          })}
        </ol>

        {/* Previous CSCA exam questions */}
        <h2 id="exam" className="mt-12 scroll-mt-32 font-display text-2xl font-bold text-white">
          Previous CSCA exam questions
        </h2>
        <p className="mt-1 max-w-3xl text-sm leading-relaxed text-slate-400">
          Real questions from the Dec 2025, Jan 2026 and Apr 2026 papers that test
          this chapter — solved with the thinking shown. Answers solved by the app
          (the source papers publish no official key); items with source errors are
          marked and still teach the correct math.
        </p>
        <div className="mt-2">
          <ExamQuestionList questions={examQuestionsByChapter("sets-inequalities")} />
        </div>

        {/* Checklist + memory */}
        <h2 id="checklist" className="mt-12 scroll-mt-32 font-display text-2xl font-bold text-white">
          Exam checklist
        </h2>
        <Checklist />
        <TonalCard tone="emerald" className="mt-3">
          <h3 className="font-display font-bold text-white">One-minute memory sheet</h3>
          <ul className="mt-2 grid gap-1.5 sm:grid-cols-2">
            {SETS_MEMORY.map((m) => (
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
