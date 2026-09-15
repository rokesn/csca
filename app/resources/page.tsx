import Link from "next/link";
import { Callout, Card, PageHeader } from "../../components/ui";

const RESOURCES = [
  { title: "CSCA Guide", desc: "What is CSCA? Who needs it?", href: "/onboarding" },
  { title: "Exam Format", desc: "48Q / 60min structure, ~75s per Q pacing strategy.", href: "/mock" },
  { title: "Syllabus", desc: "All 4 subjects in one place — Math, Physics, Chemistry, Professional Chinese.", href: "/syllabus" },
  { title: "Formula Sheets", desc: "Per-topic formulas from Study pages.", href: "/study" },
  { title: "Exam Dates", desc: "Set your date in Study Plan to unlock 30/14/7/3/1-day mode.", href: "/plan" },
  { title: "FAQ", desc: "Difficulty calibration, sourcing transparency.", href: "/practice" },
  { title: "China Universities", desc: "Always verify requirements with target university.", href: "/onboarding" },
  { title: "Scholarships", desc: "Admission vs scholarship vs both routes.", href: "/onboarding" },
];

export default function ResourcesPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10 text-slate-200">
      <PageHeader eyebrow="Resources" title="CSCA Resources" tone="slate" />
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {RESOURCES.map((r) => (
          <Link key={r.title} href={r.href} className="block">
            <Card tone="slate">
              <p className="font-bold text-white">{r.title}</p>
              <p className="mt-1 text-sm text-slate-400">{r.desc}</p>
            </Card>
          </Link>
        ))}
      </div>
      <div className="mt-6">
        <Callout tone="amber">
          Always verify final requirements with your target university and official CSCA information.
        </Callout>
      </div>
    </main>
  );
}
