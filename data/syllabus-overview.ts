// Shared syllabus source of truth for /syllabus section.
// Mirrors the /study subject pages + cscamaster.com/syllabus structure:
// Mathematics (Sets & Inequalities, Functions, Geometry & Algebra, Probability & Statistics),
// Physics, Chemistry, Professional Chinese (Humanities / STEM) — 4 modules each.

import type { SubjectConfig } from "@/components/subject-overview";

export interface SyllabusSubjectEntry {
  href: string;
  slug: string;
  config: SubjectConfig;
}

export const SYLLABUS_SUBJECTS: SyllabusSubjectEntry[] = [
  {
    href: "/syllabus/mathematics",
    slug: "mathematics",
    config: {
      area: "Syllabus · Mathematics",
      mark: "M",
      name: "Mathematics",
      tone: "indigo",
      meta: [
        ["Language", "EN / CN"],
        ["Duration", "60 min"],
        ["Questions", "48 MCQ"],
        ["Score", "0–100"],
      ],
      intro:
        "Required for ALL majors. Sets & inequalities, functions, geometry & algebra, probability & statistics — about Grade 12 level, tested at ~75s per question.",
      modules: [
        {
          title: "Sets & Inequalities",
          points: [
            "Set notation, subsets, union, intersection, complement and Venn diagrams",
            "De Morgan's laws and inclusion–exclusion counting (|A ∪ B| = |A| + |B| − |A ∩ B|)",
            "Linear, quadratic, fractional and absolute-value inequalities via sign charts",
            "Interval notation and domain restrictions (denominators, roots, logs)",
          ],
        },
        {
          title: "Functions",
          points: [
            "Domain & range: roots, fractions, logarithms and composite functions",
            "Monotonicity, even/odd parity and symmetry shortcuts",
            "Power, exponential and logarithmic functions, log laws and change of base",
            "Trigonometric functions: unit circle, identities, period/amplitude, trig equations",
          ],
        },
        {
          title: "Geometry & Algebra",
          points: [
            "Sequences: arithmetic (aₙ = a₁ + (n−1)d) and geometric (aₙ = a₁qⁿ⁻¹) plus series sums",
            "Analytic geometry: lines, circles, ellipses, hyperbolas, parabolas",
            "Vectors, complex numbers and solid geometry basics",
            "Calculus: limits (0/0 forms, sin x/x → 1), derivatives, tangents, extrema",
          ],
        },
        {
          title: "Probability & Statistics",
          points: [
            "Counting, conditional probability and classic distributions",
            "Descriptive statistics: mean, variance and data interpretation",
            "Random variables and expectation basics",
            "Exam-style data problems under timed conditions",
          ],
        },
      ],
      examTips: [
        "Draw Venn regions center-first (both/all-three) before counting anything.",
        "Condense logs to one per side, equate arguments, then reject roots with argument ≤ 0.",
        "Circle outer vs inner functions before differentiating — never drop the ×g′(x) factor.",
        "Practice at 75s per question; flag multi-step items and return with fresh eyes.",
      ],
    },
  },
  {
    href: "/syllabus/physics",
    slug: "physics",
    config: {
      area: "Syllabus · Science",
      name: "Physics",
      mark: "P",
      tone: "cyan",
      meta: [
        ["Language", "EN / CN"],
        ["Duration", "60 min"],
        ["Questions", "48 MCQ"],
        ["Score", "0–100"],
      ],
      intro:
        "Required by most science, engineering, agriculture and medical programs alongside Mathematics. Concept understanding, formula recall, calculation accuracy and diagram reading at ~75s per question.",
      modules: [
        {
          title: "Mechanics",
          points: [
            "Kinematics: displacement, velocity, acceleration graphs",
            "Newton's laws, friction, circular motion",
            "Work, energy, power and conservation laws",
            "Momentum, collisions and simple harmonic motion",
          ],
        },
        {
          title: "Electricity & Magnetism",
          points: [
            "Electric field, potential, capacitance",
            "DC circuits: Ohm's law, Kirchhoff's rules",
            "Magnetic field, Lorentz force, induction",
          ],
        },
        {
          title: "Thermodynamics",
          points: [
            "Temperature, heat, ideal gas law",
            "First law, work in gas processes",
            "Heat engines and efficiency basics",
          ],
        },
        {
          title: "Optics & Modern Physics",
          points: [
            "Reflection, refraction, lenses and mirrors",
            "Interference and diffraction basics",
            "Photoelectric effect, atomic models, radioactivity",
          ],
        },
      ],
      examTips: [
        "Draw the diagram first — most mechanics and E&M items are solved once forces/fields are labeled.",
        "Memorize conditions, not just formulas: know when conservation of energy vs momentum applies.",
        "Units check every answer — it catches most calculation slips in ~10 seconds.",
        "Practice at 75s per question; flag multi-step items and return with fresh eyes.",
      ],
    },
  },
  {
    href: "/syllabus/chemistry",
    slug: "chemistry",
    config: {
      area: "Syllabus · Science",
      name: "Chemistry",
      mark: "C",
      tone: "emerald",
      meta: [
        ["Language", "EN / CN"],
        ["Duration", "60 min"],
        ["Questions", "48 MCQ"],
        ["Score", "0–100"],
      ],
      intro:
        "Required by many science and medical programs — medicine often asks for Chemistry specifically. Reaction recognition, equation balancing, mole calculations and lab-concept questions dominate.",
      modules: [
        {
          title: "Basic Concepts",
          points: [
            "Atomic structure, periodic trends",
            "Chemical bonding and molecular geometry",
            "Mole, concentration, solutions and pH",
          ],
        },
        {
          title: "Inorganic Chemistry",
          points: [
            "Main-group and transition elements",
            "Oxides, acids, bases, salts",
            "Qualitative analysis basics",
          ],
        },
        {
          title: "Organic Chemistry",
          points: [
            "Hydrocarbons and functional groups",
            "Isomerism and nomenclature",
            "Core reaction types and mechanisms",
          ],
        },
        {
          title: "Physical Chemistry & Experiments",
          points: [
            "Redox and electrochemistry",
            "Chemical equilibrium and kinetics",
            "Thermochemistry basics and lab apparatus",
          ],
        },
      ],
      examTips: [
        "Balance the equation before any mole math — half of calculation errors start here.",
        "Learn functional groups by reaction, not by name: one reagent → one transformation.",
        "For equilibrium items, write the expression first, then plug numbers.",
        "pH/log items are free points if you drill the log rules from Math first.",
      ],
    },
  },
  {
    href: "/syllabus/chinese",
    slug: "chinese",
    config: {
      area: "Syllabus · Language",
      name: "Professional Chinese",
      mark: "文",
      tone: "amber",
      meta: [
        ["Language", "CN only"],
        ["Duration", "90 min"],
        ["Questions", "80 MCQ"],
        ["Score", "0–100"],
      ],
      intro:
        "Humanities and STEM streams — sit the one matching your major (Chinese only, no English option). Fully English-taught programs are exempt; Chinese Language majors may be exempt with HSK Level 4.",
      modules: [
        {
          title: "Reading Comprehension",
          points: [
            "Academic passages in Humanities or STEM contexts",
            "Main idea, detail and inference questions",
            "90 minutes for 80 items — pace is the real test (~65s each)",
          ],
        },
        {
          title: "Vocabulary",
          points: [
            "Academic and subject-specific terms (stream-dependent)",
            "Near-synonym discrimination",
            "Collocations and formal register",
          ],
        },
        {
          title: "Grammar",
          points: [
            "Sentence structure and connectors",
            "Common error types in formal Chinese",
            "Classical-to-modern transfer items",
          ],
        },
        {
          title: "Writing Mechanics",
          points: [
            "Cohesion across paragraphs",
            "Punctuation and style norms",
            "Revision-type items: pick the better sentence",
          ],
        },
      ],
      examTips: [
        "Pick your stream (Humanities vs STEM) before preparing — vocab lists differ.",
        "80 items in 90 minutes means ~65s each: never re-read a whole passage twice.",
        "Answer vocabulary-in-context from the sentence, not from memory.",
        "If exempt (English-taught program or HSK 4 route), confirm in writing with your university.",
      ],
    },
  },
];
