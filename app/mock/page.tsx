import { PACING_STRATEGY, SEC_PER_QUESTION } from "@/lib/pacing";
import {
  BackLink,
  Callout,
  Card,
  GhostLink,
  PageHeader,
  PrimaryLink,
  Stat,
  TonalCard
} from "@/components/ui";

const MODES = [
  {
    slug: "quick",
    name: "Quick Mock",
    spec: "10 questions / 15 min",
    desc: "A 15-minute check on one sitting. Best for daily readiness pulses.",
    cta: "Start Quick Mock",
    ready: true,
  },
  {
    slug: "half",
    name: "Half Mock",
    spec: "24 questions / 30 min",
    desc: "Half-paper pressure. Practice the 0–30m easy+medium sweep.",
    cta: "Start Half Mock",
    ready: true,
  },
  {
    slug: "full",
    name: "Full Mock",
    spec: "48 questions / 60 min",
    desc: "The real thing: full timer, no hints, navigator, auto-submit.",
    cta: "Start Full Mock",
    ready: true,
  },
  {
    slug: "final",
    name: "Final Exam Simulation",
    spec: "Multi-subject · placeholder",
    desc: "Full experience across your required subjects. Coming soon.",
    cta: "Preview Final Simulation",
    ready: false,
  },
] as const;

export default function MockIndexPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10 text-slate-200">
      <BackLink href="/">← Home</BackLink>
      <div className="mt-3">
        <PageHeader
          eyebrow="Mock Exams"
          title="Take a mock under real rules."
          desc={`Full timer, no explanations, no hints. Target pace ~${SEC_PER_QUESTION}s per question.`}
          tone="amber"
        />
      </div>

      <div className="mt-6 grid gap-2.5 sm:grid-cols-3">
        <Stat value={`~${SEC_PER_QUESTION}s`} label="Target pace / question" tone="amber" />
        <Stat value="48q / 60m" label="Full paper spec" tone="slate" />
        <Stat value="00:00" label="Auto-submit at zero" tone="slate" />
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {MODES.map((m) => (
          <Card key={m.slug} tone="amber" className="flex flex-col">
            <p className="font-mono text-[11px] font-bold uppercase tracking-widest text-slate-500">
              {m.spec}
            </p>
            <h2 className="mt-1 font-display text-xl font-bold text-white">{m.name}</h2>
            <p className="mt-1 flex-1 text-sm leading-relaxed text-slate-400">{m.desc}</p>
            <div className="mt-4">
              {m.ready ? (
                <PrimaryLink href={`/mock/${m.slug}`}>{m.cta}</PrimaryLink>
              ) : (
                <GhostLink href={`/mock/${m.slug}`}>{m.cta}</GhostLink>
              )}
            </div>
          </Card>
        ))}
      </div>

      <TonalCard tone="amber" className="mt-6">
        <h2 className="font-display font-bold text-white">Suggested pacing (48q / 60m)</h2>
        <ul className="mt-2 space-y-1 text-sm leading-relaxed text-slate-400">
          {PACING_STRATEGY.map((p) => (
            <li key={p.label}>
              <strong className="text-slate-200">{p.label}:</strong> {p.focus}
            </li>
          ))}
        </ul>
      </TonalCard>

      <div className="mt-4">
        <Callout tone="amber" title="Exam rules apply">
          No explanations and no hints during the paper. Flag tough questions
          and return to them in the sweep.
        </Callout>
      </div>
    </main>
  );
}
