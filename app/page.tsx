import Link from "next/link";
import {
  Callout,
  Card,
  Eyebrow,
  GhostLink,
  PrimaryLink,
  Stat,
  TonalCard,
  toneBadge,
  type Tone,
} from "../components/ui";

const FAQ_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the CSCA exam?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The CSCA exam (China Scholastic Competency Assessment) is a standardized assessment used by Chinese universities for international undergraduate admissions. It covers Professional Chinese, Mathematics, Physics and Chemistry, with exact subject requirements set by each university and program. CSCA-Prep.com is an independent study guide — confirm final requirements at csca.cn and your target university.",
      },
    },
    {
      "@type": "Question",
      name: "When is the next CSCA exam in 2026?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "CSCA runs about 5 sessions per year (January, March, April, June, December). The next sitting expected is December 2026 (TBA). Registration opens on csca.cn a few weeks before each session. Results release in about 7 business days online and 14 days for paper-based exams.",
      },
    },
    {
      "@type": "Question",
      name: "How much does the CSCA exam cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The CSCA exam fee is ¥450 CNY for one subject, or ¥700 CNY for two or more subjects. Payment is via Alipay, WeChat Pay, or bank transfer.",
      },
    },
    {
      "@type": "Question",
      name: "What subjects are on the CSCA exam?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Mathematics (60 min, 48 multiple-choice, 0-100), Physics (60 min, 48 multiple-choice, 0-100), Chemistry (60 min, 48 multiple-choice, 0-100), and Professional Chinese Arts/Science (90 min, 80 multiple-choice, 0-100). Math, Physics and Chemistry may be offered in English or Chinese; Professional Chinese is Chinese only.",
      },
    },
    {
      "@type": "Question",
      name: "Can I take the CSCA exam in English?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Math, Physics and Chemistry may be offered in English or Chinese depending on session. Professional Chinese must be taken in Chinese. Confirm available languages on csca.cn when registering.",
      },
    },
    {
      "@type": "Question",
      name: "How do I register for the CSCA exam?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Register on the official csca.cn portal: create an account, choose your subjects, pay (¥450 one subject, ¥700 two or more), then download your admission ticket and the latest test software from Registration – My CSCA. Complete the personal system test before exam day and log in 1 hour early with all identity checks finished at least 15 minutes before each paper starts.",
      },
    },
    {
      "@type": "Question",
      name: "Who must take the CSCA, and who is exempt?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Mathematics is mandatory for all applicants. Professional Chinese is required for Chinese-taught programs (Humanities or STEM stream by major) but fully English-taught programs are exempt. Physics or Chemistry is required for science, engineering, agriculture and medicine majors (medicine often Chemistry). Chinese Language majors may be exempt from Professional Chinese with a valid HSK Level 4. Confirm your exact list in your target university admission guide.",
      },
    },
    {
      "@type": "Question",
      name: "When do CSCA results come out?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Results are released about 7 business days after the exam for online sittings and about 14 days for paper-based sittings (excluding public holidays). Include your scores in your university application materials as required.",
      },
    },
    {
      "@type": "Question",
      name: "What is the most efficient way to prepare for the CSCA exam?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Focus on high-frequency topics, diagnose weak areas, practice weak high-yield topics at CSCA Standard difficulty, redo every mistake until mastered, and rehearse with full timed 48-question/60-minute mocks. CSCA-Prep.com follows Understand → Diagnose → Learn → Practice → Review → Mock → Analyze → Repeat.",
      },
    },
  ],
};

const KEY_FACTS = [
  { k: "Next Exam", v: "December 2026 (TBA)", s: "5 sessions / year" },
  { k: "Registration", v: "csca.cn", s: "Opens weeks before" },
  { k: "Fee · 1 subject", v: "¥450 CNY", s: "Alipay / WeChat / bank" },
  { k: "Fee · 2+ subjects", v: "¥700 CNY", s: "Same payment methods" },
  { k: "Format", v: "Home / Computer / Paper", s: "Varies by session" },
  { k: "Scoring", v: "0–100 / subject", s: "48Q/60min ≈ 75s per Q" },
];

const SUBJECTS: { name: string; meta: string; desc: string; href: string; tone: Tone }[] = [
  { name: "Mathematics", meta: "EN / CN · 60 min · 48 MCQ · 0–100", desc: "Algebra · Calculus · Geometry · Probability", href: "/practice", tone: "indigo" },
  { name: "Physics", meta: "EN / CN · 60 min · 48 MCQ · 0–100", desc: "Mechanics · E&M · Optics · Modern", href: "/study", tone: "cyan" },
  { name: "Chemistry", meta: "EN / CN · 60 min · 48 MCQ · 0–100", desc: "Organic · Inorganic · Physical", href: "/study", tone: "emerald" },
  { name: "Chinese · Science", meta: "CN only · 90 min · 80 MCQ · 0–100", desc: "Reading · Vocab · Grammar · Writing", href: "/study", tone: "amber" },
  { name: "Chinese · Arts", meta: "CN only · 90 min · 80 MCQ · 0–100", desc: "Reading · Vocab · Grammar · Writing", href: "/study", tone: "violet" },
];

const DAY = [
  ["Professional Chinese", "12:00 – 13:30"],
  ["Physics", "15:00 – 16:00"],
  ["Mathematics", "18:00 – 19:00"],
  ["Chemistry", "20:30 – 21:30"],
];

// 2026 sessions cross-checked across csca.app exam-date posts, CrosslineEdu
// April/June 2026 guideline posts and university notices. Exact December date
// still TBA — always confirm on csca.cn.
const SESSIONS_2026 = [
  { d: "Jan 25, 2026", s: "Completed", note: "First 2026 sitting (Dec 21, 2025 pilot before it)" },
  { d: "Mar 15, 2026", s: "Completed", note: "Ticket + software: Mar 6–15 · system test Mar 7–10" },
  { d: "Apr 25, 2026", s: "Completed", note: "Registration was Apr 1–9 · ticket from Apr 16" },
  { d: "Jun 27, 2026", s: "Completed", note: "Registration was Jun 1–7 · + computer centers" },
  { d: "Dec 2026", s: "Upcoming · TBA", note: "Expected; date + registration announced on csca.cn" },
];

const REG_STEPS = [
  ["1 · Account + subjects", "Register on csca.cn, pick subjects before paying — 2+ subjects in one sitting costs ¥700 total vs ¥450 for one."],
  ["2 · Pay", "Alipay, WeChat Pay, or bank transfer. Keep the receipt."],
  ["3 · Ticket + software", "From Registration – My CSCA download the admission ticket and the latest test software (delete old versions first)."],
  ["4 · System test", "Run the personal equipment/network check in the announced window (e.g. a few days before exam day, typically afternoons)."],
  ["5 · Exam day login", "Log in 1 hour early; finish equipment check, facial recognition and manual verification ≥15 min before each paper."],
];

const EXEMPTIONS = [
  ["Mathematics", "Mandatory for everyone — every applicant sits it."],
  ["Professional Chinese", "Required for Chinese-taught programs (Humanities or STEM stream by major). Exempt if your program is fully English-taught."],
  ["Physics / Chemistry", "At least one required for science, engineering, agriculture, medicine. Medicine often requires Chemistry specifically."],
  ["Chinese Language majors", "May be exempt from Professional Chinese with a valid HSK Level 4 — confirm with your university."],
];

const SYLLABUS_DETAIL = [
  ["Mathematics · 48Q / 60min", "Sets & inequalities · Functions (domain, range, monotonicity, parity, power / exponential / log / trig) · Sequences · Calculus (limits, derivatives, applications) · Geometry & algebra (lines, circles, conics) · Vectors · Complex numbers · Probability & statistics. ~Grade 12 level.", "/study/mathematics"],
  ["Physics · 48Q / 60min", "Mechanics · Electricity & magnetism · Thermodynamics · Optics · Modern physics. Formula knowledge + diagram reading tested.", "/study"],
  ["Chemistry · 48Q / 60min", "Basic concepts · Equations · Solutions & pH · Inorganic & organic · Redox · Equilibrium · Electrochemistry · Experiments.", "/study"],
  ["Professional Chinese · 80Q / 90min", "Humanities and STEM streams. Reading comprehension · Vocabulary · Grammar · Writing. Chinese only — no English option.", "/study"],
];

const FORMATS = [
  ["Home-based online", "Proctored at home. Strict equipment + environment check, facial recognition."],
  ["Computer-based centers", "Official centers; new centers added per session (e.g. Vietnam, Thailand reported for 2026)."],
  ["Paper-based", "Selected regions/sessions. Results take ~14 days instead of ~7."],
];

const STEPS = [
  ["01", "Know what's tested", "High-frequency topics, not the whole textbook.", "/study/mathematics"],
  ["02", "Find your gaps", "10–15 min diagnostic before studying.", "/diagnostic"],
  ["03", "Fix weak spots", "CSCA Standard difficulty, exam-calibrated.", "/practice"],
  ["04", "Clear mistakes", "Redo every error until cold.", "/mistakes"],
  ["05", "Rehearse real conditions", "Full 48Q / 60min mocks + analytics.", "/mock"],
];

export default function Home() {
  return (
    <main className="text-slate-200">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSON_LD) }} />

      {/* HERO */}
      <section className="study-grid-bg border-b border-white/10">
        <div className="mx-auto max-w-6xl px-6 pb-14 pt-14">
          <div className="flex flex-wrap items-center gap-2">
            <Eyebrow tone="slate">CSCA Exam Guide 2026</Eyebrow>
            <Eyebrow tone="emerald">Dec sitting TBA</Eyebrow>
          </div>
          <h1 className="mt-5 max-w-3xl text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl">
            Master the CSCA exam with a professional study system.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg">
            The <span className="text-slate-100">CSCA (China Scholastic Competency Assessment)</span> is
            the admissions exam for international undergraduates — Mathematics, Physics, Chemistry and
            Professional Chinese. Diagnose your level, train at exam difficulty, rehearse full mocks.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <PrimaryLink href="/diagnostic">Start free diagnostic</PrimaryLink>
            <GhostLink href="/mock">Full mock · 48Q / 60min</GhostLink>
            <Link href="/study/mathematics" className="rounded-xl px-6 py-3 text-sm font-bold text-slate-300 hover:text-white">
              Browse syllabus →
            </Link>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              ["48 / 60", "questions / minutes"],
              ["25", "math topics mapped"],
              ["75s", "target pace per Q"],
              ["3", "skills tracked: K·A·S"],
            ].map(([a, b]) => (
              <Stat key={a + b} value={a} label={b} tone="slate" />
            ))}
          </div>
          <p className="mt-5 text-xs text-slate-500">
            Independent study guide. Not affiliated with the official CSCA platform — confirm at csca.cn and your university.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-8 px-4 py-10 sm:px-6">
        {/* METHOD STRIP */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] px-5 py-3 text-center text-xs font-semibold tracking-wide text-slate-400">
          Understand <span className="text-slate-600">→</span> Diagnose <span className="text-slate-600">→</span> Learn <span className="text-slate-600">→</span> Practice <span className="text-slate-600">→</span> Review <span className="text-slate-600">→</span> Mock <span className="text-slate-600">→</span> Analyze <span className="text-slate-600">→</span> Repeat
        </div>

        {/* KEY FACTS */}
        <section aria-label="CSCA 2026 key facts">
          <div className="flex items-baseline justify-between">
            <h2 className="text-xl font-bold text-white">Key facts</h2>
            <span className="text-xs text-slate-500">Source: csca.cn · verify before registering</span>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {KEY_FACTS.map((f) => (
              <Card key={f.k} tone="slate" className="p-4">
                <p className="text-[11px] font-bold uppercase tracking-widest text-slate-500">{f.k}</p>
                <p className="mt-1 font-mono text-lg font-bold text-white">{f.v}</p>
                <p className="mt-0.5 text-xs text-slate-500">{f.s}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* 2026 SESSIONS TIMELINE */}
        <section aria-label="2026 exam sessions">
          <div className="flex items-baseline justify-between">
            <h2 className="text-xl font-bold text-white">2026 sessions</h2>
            <span className="text-xs text-slate-500">Status as of Sep 2026 · confirm on csca.cn</span>
          </div>
          <ol className="mt-4 grid gap-3 sm:grid-cols-5">
            {SESSIONS_2026.map((s) => (
              <li key={s.d}>
                <Card tone={s.s.startsWith("Upcoming") ? "emerald" : "slate"} className="h-full p-4">
                  <p className="font-mono text-sm font-bold text-white">{s.d}</p>
                  <p className={`mt-1 inline-block rounded-full border px-2 py-0.5 text-[11px] font-bold ${s.s.startsWith("Upcoming") ? toneBadge.emerald : toneBadge.slate}`}>{s.s}</p>
                  <p className="mt-2 text-xs leading-relaxed text-slate-500">{s.note}</p>
                </Card>
              </li>
            ))}
          </ol>
        </section>

        {/* SUBJECTS */}
        <section aria-label="Exam subjects">
          <h2 className="text-xl font-bold text-white">Subjects</h2>
          <div className="mt-4 grid gap-3 lg:grid-cols-3">
            {SUBJECTS.map((s) => (
              <Link key={s.name} href={s.href} className="group block">
                <TonalCard tone={s.tone} className="h-full transition duration-200 hover:-translate-y-0.5">
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-white">{s.name}</p>
                    <span className="text-slate-500 transition group-hover:translate-x-1 group-hover:text-white">→</span>
                  </div>
                  <p className="mt-1 font-mono text-xs text-slate-400">{s.meta}</p>
                  <p className="mt-2 text-sm text-slate-400">{s.desc}</p>
                </TonalCard>
              </Link>
            ))}
            <Link href="/onboarding" className="rounded-2xl border border-white bg-white p-5 text-slate-950 transition duration-200 hover:-translate-y-0.5">
              <p className="font-bold">Not sure what you need?</p>
              <p className="mt-1 text-sm text-slate-600">4 questions → your required route.</p>
              <p className="mt-3 text-sm font-bold">Open subject wizard →</p>
            </Link>
          </div>
        </section>

        {/* SCHEDULE + FEES */}
        <section className="grid gap-3 sm:grid-cols-3">
          <TonalCard tone="cyan">
            <Eyebrow tone="cyan">Schedule · 2026+</Eyebrow>
            <ul className="mt-3 space-y-2 font-mono text-sm">
              <li className="flex justify-between border-b border-white/5 pb-2"><span className="text-slate-400">Sessions</span><span className="text-white">Jan · Mar · Apr · Jun · Dec</span></li>
              <li className="flex justify-between border-b border-white/5 pb-2"><span className="text-slate-400">Results online</span><span className="text-white">~7 days</span></li>
              <li className="flex justify-between"><span className="text-slate-400">Results paper</span><span className="text-white">~14 days</span></li>
            </ul>
          </TonalCard>
          <TonalCard tone="cyan">
            <Eyebrow tone="cyan">Exam day · Beijing</Eyebrow>
            <ul className="mt-3 space-y-2 text-sm">
              {DAY.map(([s, t]) => (
                <li key={s} className="flex justify-between border-b border-white/5 pb-2 last:border-0 last:pb-0">
                  <span className="text-slate-300">{s}</span><span className="font-mono text-slate-100">{t}</span>
                </li>
              ))}
            </ul>
            <p className="mt-2 text-[11px] leading-relaxed text-slate-500">Recent home-based sessions ran this order; exact times vary by session and format — your admission ticket is final.</p>
          </TonalCard>
          <TonalCard tone="amber">
            <Eyebrow tone="amber">Fees · CNY</Eyebrow>
            <div className="mt-3 space-y-2 font-mono">
              <div className="flex items-center justify-between rounded-xl bg-white/[0.04] px-4 py-3"><span className="text-sm text-slate-400">1 subject</span><strong className="text-lg text-white">¥450</strong></div>
              <div className="flex items-center justify-between rounded-xl bg-white px-4 py-3 text-slate-950"><span className="text-sm">2+ subjects</span><strong className="text-lg">¥700</strong></div>
            </div>
            <p className="mt-2 text-xs text-slate-500">Alipay · WeChat Pay · bank transfer</p>
          </TonalCard>
        </section>

        {/* REGISTRATION + EXAM-DAY CHECKLIST */}
        <section className="grid gap-3 lg:grid-cols-2">
          <Card tone="slate" className="p-6">
            <Eyebrow tone="slate">Registration · csca.cn</Eyebrow>
            <h2 className="mt-3 text-xl font-bold text-white">How registration works</h2>
            <ol className="mt-4 space-y-3 text-sm">
              {REG_STEPS.map(([t, d]) => (
                <li key={t} className="rounded-xl border border-white/10 bg-white/[0.03] p-3.5">
                  <p className="font-bold text-slate-100">{t}</p>
                  <p className="mt-1 text-xs leading-relaxed text-slate-400">{d}</p>
                </li>
              ))}
            </ol>
            <p className="mt-3 text-xs text-slate-500">Bring: ID photo, valid ID, and a working payment method — see the full requirements list on csca.cn.</p>
          </Card>
          <Card tone="slate" className="p-6">
            <Eyebrow tone="slate">Who sits what</Eyebrow>
            <h2 className="mt-3 text-xl font-bold text-white">Required vs exempt</h2>
            <ul className="mt-4 space-y-3 text-sm">
              {EXEMPTIONS.map(([t, d]) => (
                <li key={t} className="border-b border-white/5 pb-3 last:border-0 last:pb-0">
                  <p className="font-bold text-slate-100">{t}</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-slate-400">{d}</p>
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <PrimaryLink href="/onboarding">Check my route in the wizard →</PrimaryLink>
            </div>
          </Card>
        </section>

        {/* METHOD */}
        <TonalCard tone="indigo" className="p-6 sm:p-7">
          <h2 className="text-xl font-bold text-white">The study method</h2>
          <p className="mt-1 text-sm text-slate-400">Five steps. No random question piles.</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-5">
            {STEPS.map(([n, t, d, h]) => (
              <Link key={n} href={h} className="block">
                <Card tone="indigo" className="h-full p-4">
                  <p className="font-mono text-xs text-slate-500">{n}</p>
                  <p className="mt-1 text-sm font-bold text-white">{t}</p>
                  <p className="mt-1 text-xs leading-relaxed text-slate-500">{d}</p>
                </Card>
              </Link>
            ))}
          </div>
        </TonalCard>

        {/* DETAILED SYLLABUS */}
        <TonalCard tone="violet" className="p-6 sm:p-7">
          <Eyebrow tone="violet">Syllabus · ~Grade 12 level</Eyebrow>
          <h2 className="mt-3 text-xl font-bold text-white">What each paper covers</h2>
          <p className="mt-1 text-xs text-slate-500">Topic lists summarized from official syllabus documents — download the PDFs on csca.cn and prepare from those, not from any summary.</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {SYLLABUS_DETAIL.map(([t, d, h]) => (
              <Card key={t} tone="violet" className="p-4">
                <p className="font-mono text-sm font-bold text-white">{t}</p>
                <p className="mt-2 text-xs leading-relaxed text-slate-400">{d}</p>
                <Link href={h} className="mt-3 inline-block rounded-lg border border-white/10 px-3 py-1.5 text-xs font-bold text-slate-200 hover:bg-white/5">Study this →</Link>
              </Card>
            ))}
          </div>
        </TonalCard>

        {/* FORMATS + SCORING */}
        <section className="grid gap-3 lg:grid-cols-2">
          <Card tone="slate" className="p-6">
            <Eyebrow tone="slate">Where you sit it</Eyebrow>
            <h2 className="mt-3 text-xl font-bold text-white">Test formats</h2>
            <ul className="mt-4 space-y-3 text-sm">
              {FORMATS.map(([t, d]) => (
                <li key={t} className="border-b border-white/5 pb-3 last:border-0 last:pb-0">
                  <p className="font-bold text-slate-100">{t}</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-slate-400">{d}</p>
                </li>
              ))}
            </ul>
          </Card>
          <Card tone="slate" className="p-6">
            <Eyebrow tone="slate">Scoring + results</Eyebrow>
            <h2 className="mt-3 text-xl font-bold text-white">How you are scored</h2>
            <ul className="mt-4 space-y-2 font-mono text-sm">
              <li className="flex justify-between border-b border-white/5 pb-2"><span className="text-slate-400">Per subject</span><span className="text-white">0–100</span></li>
              <li className="flex justify-between border-b border-white/5 pb-2"><span className="text-slate-400">Question type</span><span className="text-white">All multiple-choice</span></li>
              <li className="flex justify-between border-b border-white/5 pb-2"><span className="text-slate-400">Results online</span><span className="text-white">~7 business days</span></li>
              <li className="flex justify-between"><span className="text-slate-400">Results paper</span><span className="text-white">~14 days</span></li>
            </ul>
            <p className="mt-3 text-xs leading-relaxed text-slate-500">Include scores in your application materials where required. Universities set their own cutoffs — a score is not a pass/fail by itself.</p>
            <div className="mt-4">
              <PrimaryLink href="/mock">Rehearse scoring in a mock →</PrimaryLink>
            </div>
          </Card>
        </section>

        {/* OFFICIAL 3-PHASE PREP */}
        <Card tone="slate" className="p-6 sm:p-7">
          <Eyebrow tone="slate">Recommended by official prep guides</Eyebrow>
          <h2 className="mt-3 text-xl font-bold text-white">Prepare in three phases</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {[
              ["Phase 1 · Foundation", "Cover every syllabus point systematically. Understand core concepts — this site's Stage 1–2 lessons.", "/study/mathematics"],
              ["Phase 2 · Intensification", "Timed drills on weak areas. Accuracy first, then speed (~75s/Q). Log every error by cause.", "/practice/timed"],
              ["Phase 3 · Sprint", "Full mocks on the official day schedule. Review against syllabus + mistake log after each.", "/mock"],
            ].map(([t, d, h]) => (
              <Link key={t} href={h} className="block">
                <Card tone="slate" className="h-full p-4">
                  <p className="text-sm font-bold text-white">{t}</p>
                  <p className="mt-1 text-xs leading-relaxed text-slate-500">{d}</p>
                </Card>
              </Link>
            ))}
          </div>
        </Card>

        {/* SYLLABUS + FAQ */}
        <section className="grid gap-3 lg:grid-cols-2">
          <Card tone="slate" className="p-6">
            <h2 className="text-xl font-bold text-white">Syllabus</h2>
            <ul className="mt-4 space-y-3 text-sm">
              {[
                ["Mathematics", "Algebra · Calculus · Geometry · Probability", "/study/mathematics"],
                ["Physics", "Mechanics · E&M · Optics · Modern", "/study"],
                ["Chemistry", "Organic · Inorganic · Physical", "/study"],
                ["Professional Chinese", "Reading · Vocab · Grammar · Writing", "/study"],
              ].map(([t, d, h]) => (
                <li key={t as string} className="flex items-center justify-between gap-3 border-b border-white/5 pb-3 last:border-0 last:pb-0">
                  <div><p className="font-bold text-slate-100">{t}</p><p className="text-xs text-slate-500">{d}</p></div>
                  <Link href={h as string} className="shrink-0 rounded-lg border border-white/10 px-3 py-1.5 text-xs font-bold text-slate-200 hover:bg-white/5">Open</Link>
                </li>
              ))}
            </ul>
          </Card>
          <Card tone="slate" className="p-6">
            <h2 className="text-xl font-bold text-white">FAQ</h2>
            <div className="mt-4 space-y-3 text-sm">
              {[
                ["What is the CSCA exam?", "Admissions exam for international undergraduates — subjects set per program."],
                ["Next exam?", "5 sessions/year. Next expected Dec 2026 (TBA) — register at csca.cn."],
                ["Cost?", "¥450 one subject · ¥700 two or more."],
                ["In English?", "Math/Physics/Chemistry may offer English. Chinese is Chinese-only."],
                ["How do I register?", "csca.cn → subjects → pay → ticket + software → system test → login 1hr early."],
                ["Who is exempt from Chinese?", "Fully English-taught programs. HSK 4 may exempt Chinese Language majors."],
                ["When are results out?", "~7 business days online · ~14 days paper."],
                ["Am I ready?", "Core topics solid, mistakes cleared, mocks stable, time to spare."],
              ].map(([q, a]) => (
                <div key={q} className="border-b border-white/5 pb-3 last:border-0 last:pb-0">
                  <p className="font-bold text-slate-100">{q}</p>
                  <p className="mt-0.5 text-slate-400">{a}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 flex gap-2">
              <PrimaryLink href="/progress">Check readiness</PrimaryLink>
              <GhostLink href="/plan">Build plan</GhostLink>
            </div>
          </Card>
        </section>

        <Callout tone="slate" title="Sources & verification · last checked 10 Sep 2026">
          Session dates and procedures cross-checked across the official CSCA portal (csca.cn), Shanghai government study-in-China guides (english.shanghai.gov.cn), participating-university CSCA notices, and the CSCA Academy exam guide. December 2026 details are still TBA. Dates, languages, formats, centers and cutoffs change by session — csca.cn and your target university notice are final.
        </Callout>
      </div>
    </main>
  );
}
