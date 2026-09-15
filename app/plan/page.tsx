"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import DailyMission from "../../components/daily-mission";
import { Callout, Card, PageHeader, TonalCard, toneBadge, toneText } from "../../components/ui";
import { toneGradientMark } from "../../components/subject-overview";
import { daysUntilExam, recommendNext } from "../../lib/recommender";
import { getPlanMode, type PlanMode } from "../../lib/plan-mode";
import { SYLLABUS_SUBJECTS } from "@/data/syllabus-overview";

const MODES: Record<PlanMode, { title: string; focus: string }> = {
  "30": { title: "30-day mode", focus: "Syllabus + weak topics + steady practice" },
  "14": { title: "14-day mode", focus: "Timed practice + mocks + mistake review" },
  "7": { title: "7-day mode", focus: "Full mocks + formulas + weak-topic bursts" },
  "3": { title: "3-day mode", focus: "Mistake Book + formula sheets + light practice" },
  "1": { title: "1-day mode", focus: "Quick revision, instructions, device prep, timing & rest" },
};

function toISODate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function defaultExamDate(): string {
  const d = new Date();
  d.setDate(d.getDate() + 30);
  return toISODate(d);
}

interface WeakTopic {
  topic: string;
  slug: string;
  accuracy: number;
}

/** Demo weak-topic snapshot per subject (wired to real syllabus module titles). */
const WEAK_BY_SUBJECT: Record<string, { pace: string; topics: WeakTopic[] }> = {
  mathematics: {
    pace: "~75s per question",
    topics: [
      { topic: "Probability & Statistics", slug: "probability", accuracy: 52 },
      { topic: "Functions", slug: "functions", accuracy: 61 },
      { topic: "Geometry & Algebra", slug: "geometry", accuracy: 72 },
    ],
  },
  physics: {
    pace: "~75s per question",
    topics: [
      { topic: "Mechanics", slug: "mechanics", accuracy: 58 },
      { topic: "Electricity & Magnetism", slug: "electricity-magnetism", accuracy: 66 },
      { topic: "Optics & Modern Physics", slug: "optics-modern", accuracy: 74 },
    ],
  },
  chemistry: {
    pace: "~75s per question",
    topics: [
      { topic: "Organic Chemistry", slug: "organic", accuracy: 55 },
      { topic: "Physical Chemistry & Experiments", slug: "physical-chemistry", accuracy: 63 },
      { topic: "Inorganic Chemistry", slug: "inorganic", accuracy: 71 },
    ],
  },
  chinese: {
    pace: "~65s per question",
    topics: [
      { topic: "Reading Comprehension", slug: "reading", accuracy: 60 },
      { topic: "Vocabulary", slug: "vocabulary", accuracy: 68 },
      { topic: "Grammar", slug: "grammar", accuracy: 75 },
    ],
  },
};

/** TODAY plan ratios: 30 weak1 / 20 weak2 / 20 timed / 20 mistake review (Sec 23). */
function buildTodayPlan(
  totalMinutes: number,
  subjectName: string,
  timedLabel: string,
  pace: string,
  weak1: WeakTopic,
  weak2: WeakTopic,
) {
  return [
    { label: `${weak1.topic} (weakest)`, minutes: Math.round(totalMinutes * (30 / 90)), note: `Accuracy ${weak1.accuracy}% — lesson + CSCA-level Qs` },
    { label: `${weak2.topic}`, minutes: Math.round(totalMinutes * (20 / 90)), note: `Accuracy ${weak2.accuracy}% — worked examples first` },
    { label: timedLabel, minutes: Math.round(totalMinutes * (20 / 90)), note: `${subjectName} exam pace ${pace}` },
    { label: "Mistake review", minutes: Math.round(totalMinutes * (20 / 90)), note: "5 hardest mistakes, re-solve without notes" },
  ];
}

export default function PlanPage() {
  const [examDate, setExamDate] = useState<string>(defaultExamDate);
  const [minutes, setMinutes] = useState<number>(90);
  const [subjectSlug, setSubjectSlug] = useState<string>("mathematics");
  const [showRec, setShowRec] = useState(false);

  const active = SYLLABUS_SUBJECTS.find((s) => s.slug === subjectSlug) ?? SYLLABUS_SUBJECTS[0];
  const weak = WEAK_BY_SUBJECT[active.slug] ?? WEAK_BY_SUBJECT.mathematics;
  const [weak1, weak2, weak3] = weak.topics;

  const daysLeft = useMemo(() => daysUntilExam(examDate || null), [examDate]);
  const mode = getPlanMode(daysLeft);
  const todayPlan = useMemo(
    () =>
      buildTodayPlan(
        minutes,
        active.config.name,
        `Timed ${active.config.name} set`,
        weak.pace,
        weak1,
        weak2,
      ),
    [minutes, active, weak, weak1, weak2],
  );

  const recommendation = useMemo(
    () =>
      recommendNext({
        examDate: examDate || null,
        weakTopics: weak.topics.map((t) => ({ topicSlug: t.slug, accuracy: t.accuracy })),
        recentAttempts: [],
        mistakes: [{ topicSlug: weak1.slug }, { topicSlug: weak1.slug }, { topicSlug: weak2.slug }],
        minutesAvailable: 45,
      }),
    [examDate, weak, weak1, weak2],
  );

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 text-slate-200">
      <PageHeader eyebrow="Study Plan" title="What should I study now?" tone="cyan" />

      <TonalCard tone="cyan" className="mt-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-lg font-bold text-white">
              {MODES[mode].title}
              {daysLeft !== null ? (
                <span className="ml-2 text-sm font-semibold text-slate-300">
                  · {daysLeft < 0 ? "exam passed" : `${daysLeft} day${daysLeft === 1 ? "" : "s"} left`}
                </span>
              ) : null}
            </p>
            <p className="mt-1 text-sm text-slate-400">{MODES[mode].focus}</p>
          </div>
          <label className="text-sm font-medium text-slate-300">
            Exam date{" "}
            <input
              type="date"
              value={examDate}
              onChange={(e) => setExamDate(e.target.value)}
              className="field-dark ml-1 w-auto"
            />
          </label>
        </div>
      </TonalCard>

      {/* Subject switcher — plan covers all 4 papers, not just Math */}
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {SYLLABUS_SUBJECTS.map(({ slug, config }) => {
          const selected = slug === active.slug;
          return (
            <button
              key={slug}
              type="button"
              onClick={() => setSubjectSlug(slug)}
              aria-pressed={selected}
              className={`rounded-2xl border p-3.5 text-left transition duration-200 hover:-translate-y-0.5 ${
                selected
                  ? "border-white bg-white/[0.07]"
                  : "border-white/10 bg-white/[0.02] hover:border-white/25"
              }`}
            >
              <span
                aria-hidden="true"
                className={`flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br font-display text-base font-bold text-white ${toneGradientMark[config.tone]}`}
              >
                {config.mark ?? config.name.charAt(0)}
              </span>
              <p className="mt-2 text-sm font-bold text-white">{config.name}</p>
              <p className="mt-0.5 font-mono text-[10px] text-slate-500">
                {config.meta.map(([, v]) => v).join(" · ")}
              </p>
            </button>
          );
        })}
      </div>

      <Card tone={active.config.tone} className="mt-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-bold text-white">
            TODAY · {active.config.name.toUpperCase()} · {minutes} MIN
          </h2>
          <div className="flex gap-2" role="group" aria-label="Available minutes">
            {[30, 60, 90, 120].map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMinutes(m)}
                aria-pressed={minutes === m}
                className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                  minutes === m
                    ? "border-white bg-white text-slate-950"
                    : "border-white/15 text-slate-200 hover:bg-white/5"
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>
        <ul className="mt-4 space-y-2">
          {todayPlan.map((block) => (
            <li
              key={block.label}
              className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3 text-sm"
            >
              <div>
                <p className="font-semibold text-slate-200">{block.label}</p>
                <p className="text-xs text-slate-400">{block.note}</p>
              </div>
              <span className={`shrink-0 rounded-full border px-3 py-1 text-xs font-bold ${toneBadge[active.config.tone]}`}>
                {block.minutes} min
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-xs text-slate-500">
          Dynamic, not Monday = Math: the plan re-balances as {weak1.topic} {weak1.accuracy}% → 78%.
        </p>
      </Card>

      <Card tone={active.config.tone} className="mt-6">
        <h2 className="text-lg font-bold text-white">Smart recommendation · {active.config.name}</h2>
        <p className="mt-1 text-sm text-slate-400">
          Weighs exam date, weak topics, recent performance, mistakes, and time available.
        </p>
        <button
          type="button"
          onClick={() => setShowRec((v) => !v)}
          className="mt-3 rounded-2xl bg-white px-5 py-2.5 text-sm font-bold text-slate-950 shadow-lg transition hover:bg-indigo-100"
        >
          {showRec ? "Hide recommendation" : "What should I study now?"}
        </button>
        {showRec ? (
          <div className="mt-3">
            <Callout tone={active.config.tone} title={`Practice ${recommendation.topicSlug} · ${recommendation.count} Qs`}>
              Why? {recommendation.reason}
            </Callout>
          </div>
        ) : null}
      </Card>

      {/* Syllabus coverage — every topic the plan can assign, per subject */}
      <div className="mt-10 flex items-baseline justify-between gap-3">
        <h2 className="font-display text-xl font-bold text-white">Syllabus coverage</h2>
        <Link href="/syllabus" className="text-xs font-bold text-slate-300 hover:text-white">
          Full syllabus →
        </Link>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {SYLLABUS_SUBJECTS.map(({ href, slug, config }) => (
          <TonalCard key={slug} tone={config.tone}>
            <div className="flex items-center gap-2.5">
              <span
                aria-hidden="true"
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br font-display text-sm font-bold text-white ${toneGradientMark[config.tone]}`}
              >
                {config.mark ?? config.name.charAt(0)}
              </span>
              <div className="min-w-0">
                <p className="truncate font-bold text-white">{config.name}</p>
                <p className="truncate font-mono text-[10px] text-slate-500">
                  {config.meta.map(([, v]) => v).join(" · ")}
                </p>
              </div>
            </div>
            <ul className="mt-3 space-y-1.5 text-sm text-slate-400">
              {config.modules.map((m) => (
                <li key={m.title} className="flex gap-2">
                  <span aria-hidden="true" className={`font-bold ${toneText[config.tone]}`}>✓</span>
                  <span>{m.title}</span>
                </li>
              ))}
            </ul>
            <Link
              href={href}
              className="mt-3 inline-block rounded-lg border border-white/10 px-3 py-1.5 text-xs font-bold text-slate-200 hover:bg-white/5"
            >
              Open {config.name} syllabus →
            </Link>
          </TonalCard>
        ))}
      </div>
      <p className="mt-3 text-xs text-slate-500">
        Weakest topic per subject: {weak3 ? `${weak1.topic} ${weak1.accuracy}%, ${weak2.topic} ${weak2.accuracy}%, ${weak3.topic} ${weak3.accuracy}%` : null} — plan blocks follow these modules.
      </p>

      <div className="mt-6">
        <DailyMission />
      </div>
    </main>
  );
}
