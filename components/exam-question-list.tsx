"use client";

import { useMemo, useState } from "react";
import type { ExamQuestion } from "@/data/previous-exams";
import { M } from "./math";
import { Callout } from "./ui";

const LETTERS = ["A", "B", "C", "D"];

/** Interactive previous-exam question list (handles disputed source items). */
export default function ExamQuestionList({ questions, unit = "exam questions" }: { questions: ExamQuestion[]; unit?: string }) {
  const [picked, setPicked] = useState<Record<string, number>>({});

  const solvable = useMemo(() => questions.filter((q) => q.answer !== -1), [questions]);
  const answered = solvable.filter((q) => picked[q.id] !== undefined).length;
  const correct = solvable.filter((q) => picked[q.id] === q.answer).length;

  if (questions.length === 0) {
    return <p className="mt-3 text-sm text-slate-500">No previous-exam questions tagged here yet.</p>;
  }

  return (
    <div>
      <p className="mt-1 font-mono text-xs text-slate-400">
        {questions.length} {unit} · {correct}/{answered} correct
      </p>
      <ol className="mt-4 space-y-3">
        {questions.map((q) => {
          const disputed = q.answer === -1;
          const sel = picked[q.id];
          const done = disputed || sel !== undefined;
          return (
            <li key={q.id} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-md bg-white/10 px-2 py-0.5 font-mono text-[11px] font-bold text-slate-200">
                  {q.exam} · Q{q.no}
                </span>
                <span className="rounded-md border border-white/10 px-2 py-0.5 font-mono text-[11px] text-slate-400">
                  {q.topic}
                </span>
                {disputed ? (
                  <span className="rounded-md border border-amber-400/40 bg-amber-400/10 px-2 py-0.5 font-mono text-[11px] font-bold text-amber-200">
                    source issue
                  </span>
                ) : null}
              </div>
              <div className="mt-2 text-[15px] font-semibold leading-relaxed text-white">
                <M>{q.question}</M>
              </div>
              {disputed ? (
                <div className="mt-3 space-y-2">
                  <Callout tone="amber" title="No correct option in the source paper">
                    <M>{q.dispute ?? ""}</M>
                  </Callout>
                  <Callout tone="slate" title="Correct math">
                    <M>{q.thinking}</M>
                  </Callout>
                </div>
              ) : (
                <>
                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    {q.options.map((opt, i) => {
                      const isAnswer = i === q.answer;
                      const isSel = sel === i;
                      let cls = "border-white/10 bg-white/[0.03] text-slate-200 hover:border-white/30 hover:bg-white/[0.06]";
                      if (done && isAnswer) cls = "border-emerald-400/60 bg-emerald-400/10 text-white";
                      else if (done && isSel) cls = "border-rose-400/60 bg-rose-400/10 text-white";
                      return (
                        <button
                          key={i}
                          type="button"
                          disabled={done}
                          onClick={() => setPicked((s) => ({ ...s, [q.id]: i }))}
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
                    <div className="mt-3">
                      <Callout tone={sel === q.answer ? "emerald" : "rose"} title={sel === q.answer ? `Correct — ${LETTERS[q.answer]}` : `Answer: ${LETTERS[q.answer]}`}>
                        <M>{q.thinking}</M>
                      </Callout>
                    </div>
                  ) : null}
                </>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
