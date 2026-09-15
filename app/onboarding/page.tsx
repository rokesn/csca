"use client";
import { useState } from "react";
import { GhostLink, PageHeader, PrimaryLink, TonalCard } from "../../components/ui";

const GOALS = ["CSCA Mathematics", "Mathematics + Physics", "Mathematics + Chemistry", "Mathematics + Physics + Chemistry", "Professional Chinese", "I don't know yet"];
const TARGETS = ["University admission", "Scholarship", "Both", "Just preparing for CSCA"];

export default function OnboardingPage() {
  const [goal, setGoal] = useState(GOALS[0]);
  const [target, setTarget] = useState(TARGETS[0]);
  const [major, setMajor] = useState("Computer Science");
  const [lang, setLang] = useState("English");

  return (
    <main className="mx-auto max-w-2xl px-4 py-10 text-slate-200">
      <PageHeader
        eyebrow="Onboarding"
        title="Prepare for CSCA with a complete study system"
        tone="cyan"
      />
      <div className="mt-6 space-y-5">
        <TonalCard tone="cyan">
          <p className="font-bold text-white">Step 1 — Choose your goal</p>
          <div className="mt-2 flex flex-wrap gap-2">{GOALS.map((g) => (
            <button key={g} onClick={() => setGoal(g)} aria-pressed={goal === g} className={`rounded-full border px-3 py-1 text-sm font-semibold ${goal === g ? "border-white bg-white text-slate-950" : "border-white/15 text-slate-200 hover:bg-white/5"}`}>{g}</button>
          ))}</div>
        </TonalCard>
        <TonalCard tone="violet">
          <p className="font-bold text-white">Step 2 — Choose your target</p>
          <div className="mt-2 flex flex-wrap gap-2">{TARGETS.map((t) => (
            <button key={t} onClick={() => setTarget(t)} aria-pressed={target === t} className={`rounded-full border px-3 py-1 text-sm font-semibold ${target === t ? "border-white bg-white text-slate-950" : "border-white/15 text-slate-200 hover:bg-white/5"}`}>{t}</button>
          ))}</div>
        </TonalCard>
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="text-sm font-semibold text-slate-200">Target major<input value={major} onChange={(e) => setMajor(e.target.value)} className="field-dark mt-1" /></label>
          <label className="text-sm font-semibold text-slate-200">Teaching language<select value={lang} onChange={(e) => setLang(e.target.value)} className="field-dark mt-1"><option>English</option><option>Chinese</option></select></label>
        </div>
        <TonalCard tone="indigo">
          <p className="font-bold text-white">Your likely route ({major} / {lang} / {target})</p>
          <ul className="mt-1 list-disc pl-5 text-sm text-slate-300">
            <li>Mathematics — REQUIRED</li>
            <li>Physics — CHECK UNIVERSITY</li>
            <li>Chemistry — CHECK UNIVERSITY</li>
            <li>STEM Chinese — DEPENDS ON PROGRAM</li>
          </ul>
          <p className="mt-2 text-sm text-amber-200">Always verify with your university + official CSCA info.</p>
        </TonalCard>
        <div className="flex flex-wrap gap-2">
          <PrimaryLink href="/diagnostic">Continue to Diagnostic →</PrimaryLink>
          <GhostLink href="/study">Skip to Study</GhostLink>
        </div>
      </div>
    </main>
  );
}
