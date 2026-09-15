import type { Metadata } from "next";
import Link from "next/link";
import "katex/dist/katex.min.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "CSCA Exam 2026: Dates, Fees, Syllabus & Free Practice | CSCA-Prep.com",
  description:
    "Complete CSCA exam guide 2026: what is CSCA, dates, registration at csca.cn, fees ¥450/¥700, subjects (Math 48Q/60min, Physics, Chemistry, Professional Chinese 80Q/90min), syllabus, format, plus free CSCA Standard practice, timed sets and full mock exams.",
  keywords: [
    "CSCA exam",
    "CSCA test",
    "China Scholastic Competency Assessment",
    "CSCA 2026 dates",
    "CSCA syllabus",
    "CSCA mathematics",
    "CSCA physics",
    "CSCA chemistry",
    "CSCA practice",
    "CSCA mock exam",
  ],
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "16x16 32x32 48x48" },
      { url: "/icon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-64.png", sizes: "64x64", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  openGraph: {
    title: "CSCA Exam Guide 2026 + Free Practice | CSCA-Prep.com",
    description:
      "Dates, fees, subjects, syllabus and format explained. Diagnose your level, practice CSCA Standard questions, take full 48Q/60min mocks.",
    type: "website",
  },
};

const NAV = [
  { href: "/study", label: "Study" },
  { href: "/practice", label: "Practice" },
  { href: "/mock", label: "Mock Exams" },
  { href: "/plan", label: "Study Plan" },
  { href: "/progress", label: "Progress" },
  { href: "/resources", label: "Resources" },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;600;700&family=JetBrains+Mono:wght@500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#060a17] font-sans text-slate-200 antialiased">
        <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0a1022]/90 backdrop-blur">
          <nav className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-2 gap-y-2 px-4 py-3 sm:px-6">
            <Link href="/" className="mr-2 flex items-center gap-2.5">
              <img
                src="/mark.svg"
                alt="CSCA-Prep logo"
                width={36}
                height={36}
                className="h-9 w-9 rounded-xl"
              />
              <span className="leading-tight">
                <span className="block text-[15px] font-extrabold tracking-tight text-white">
                  CSCA-Prep
                </span>
                <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                  Professional Study
                </span>
              </span>
            </Link>
            <div className="ml-auto flex flex-wrap items-center gap-1 text-sm font-semibold">
              {NAV.map((item) => (
                <Link
                  key={item.href + item.label}
                  href={item.href}
                  className="rounded-lg px-3 py-1.5 text-slate-300 hover:bg-white/5 hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/diagnostic"
                className="ml-1 rounded-lg bg-white px-4 py-1.5 text-slate-950 hover:bg-slate-200"
              >
                Free Diagnostic
              </Link>
            </div>
          </nav>
        </header>

        {children}

        <footer className="mt-14 border-t border-white/10 bg-black/40">
          <div className="mx-auto grid max-w-6xl gap-8 px-6 py-10 sm:grid-cols-4">
            <div>
              <p className="font-extrabold text-white">CSCA-Prep</p>
              <p className="mt-2 text-sm text-slate-400">
                Understand → Diagnose → Learn → Practice → Review → Mock → Analyze → Repeat.
              </p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Study</p>
              <ul className="mt-2 space-y-1 text-sm text-slate-300">
                <li><Link href="/study/mathematics" className="hover:text-white">Mathematics</Link></li>
                <li><Link href="/study" className="hover:text-white">Physics</Link></li>
                <li><Link href="/study" className="hover:text-white">Chemistry</Link></li>
                <li><Link href="/diagnostic" className="hover:text-white">Diagnostic</Link></li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Practice</p>
              <ul className="mt-2 space-y-1 text-sm text-slate-300">
                <li><Link href="/practice" className="hover:text-white">CSCA Standard bank</Link></li>
                <li><Link href="/practice/timed" className="hover:text-white">Timed practice</Link></li>
                <li><Link href="/mock" className="hover:text-white">Full mocks 48Q/60min</Link></li>
                <li><Link href="/mistakes" className="hover:text-white">Mistake Book</Link></li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Plan</p>
              <ul className="mt-2 space-y-1 text-sm text-slate-300">
                <li><Link href="/plan" className="hover:text-white">Study plan</Link></li>
                <li><Link href="/progress" className="hover:text-white">Readiness</Link></li>
                <li><Link href="/resources" className="hover:text-white">Resources</Link></li>
                <li><Link href="/onboarding" className="hover:text-white">Subject wizard</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 px-6 py-4 text-center text-xs text-slate-500">
            Independent study guide — not affiliated with the official CSCA exam. Confirm at csca.cn and your university.
          </div>
        </footer>
      </body>
    </html>
  );
}
