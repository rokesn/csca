// CSCA-Prep.com — Question bank architecture (Spec Sec 8-11).
// Fields per spec: Question ID, Subject, Chapter, Topic, Subtopic,
// Difficulty, Question type, Correct answer, Explanation, Source,
// Source type, Exam relevance, Estimated time.

export type Difficulty =
  | "Foundation"
  | "Basic"
  | "CSCA Standard"
  | "Challenging"
  | "Advanced";

export type SourceType = "official" | "original" | "recalled" | "practice";

export type TopicSlug =
  | "derivatives"
  | "functions"
  | "algebra"
  | "geometry"
  | "probability"
  | "calculus"
  | "vectors"
  | "complex";

export interface Question {
  id: string;
  subject: "Mathematics";
  chapter: string;
  /** URL-safe topic slug, used by /practice/[topic] */
  topic: TopicSlug;
  subtopic: string;
  difficulty: Difficulty;
  type: "mcq";
  stem: string;
  /** Exactly 4 options, A/B/C/D order */
  options: [string, string, string, string];
  /** Index 0-3 into options */
  answer: number;
  /** Step-by-step "Why {correct}?" */
  explanationSteps: string[];
  /** One entry per distractor: why each wrong option is wrong */
  whyNot: string[];
  concept: string;
  source: string;
  sourceType: SourceType;
  /** 1 (low) - 5 (high) exam relevance */
  examRelevance: number;
  /** Seconds. CSCA Standard targets ~60-75s (Spec Sec 11, 20). */
  estimatedTimeSec: number;
}

export const DIFFICULTIES: Difficulty[] = [
  "Foundation",
  "Basic",
  "CSCA Standard",
  "Challenging",
  "Advanced"
];

export const TOPICS: { slug: TopicSlug; label: string; chapter: string }[] = [
  { slug: "derivatives", label: "Derivatives", chapter: "Calculus" },
  { slug: "functions", label: "Functions", chapter: "Functions" },
  { slug: "algebra", label: "Algebra", chapter: "Sets & Inequalities" },
  { slug: "geometry", label: "Geometry", chapter: "Geometry" },
  { slug: "probability", label: "Probability", chapter: "Probability" },
  { slug: "calculus", label: "Calculus", chapter: "Calculus" },
  { slug: "vectors", label: "Vectors", chapter: "Vectors" },
  { slug: "complex", label: "Complex Numbers", chapter: "Complex Numbers" }
];

export function topicLabel(slug: string): string {
  return TOPICS.find((t) => t.slug === slug)?.label ?? slug;
}

export const CSCA_STANDARD_TIME_MIN = 60;
export const CSCA_STANDARD_TIME_MAX = 75;

export const SAMPLE_QUESTIONS: Question[] = [
  // ---------------- Derivatives ----------------
  {
    id: "MATH-DER-001",
    subject: "Mathematics",
    chapter: "Calculus",
    topic: "derivatives",
    subtopic: "Power rule",
    difficulty: "Foundation",
    type: "mcq",
    stem: "Let f(x) = 3x² + 2x − 5. What is f′(1)?",
    options: ["6", "8", "10", "5"],
    answer: 1,
    explanationSteps: [
      "Step 1: Differentiate term by term. d/dx(3x²) = 6x, d/dx(2x) = 2, d/dx(−5) = 0.",
      "Step 2: So f′(x) = 6x + 2.",
      "Step 3: Substitute x = 1: f′(1) = 6(1) + 2 = 8."
    ],
    whyNot: [
      "A (6) forgets the derivative of 2x — it only evaluates 6x at x = 1.",
      "C (10) adds the constant −5 back in, but constants differentiate to 0.",
      "D (5) is the value f(0) = −5 confused with a derivative, not f′(1)."
    ],
    concept: "Power rule: d/dx(xⁿ) = n·xⁿ⁻¹; constants vanish.",
    source: "CSCA-Prep original — Calculus fundamentals drill",
    sourceType: "original",
    examRelevance: 3,
    estimatedTimeSec: 45
  },
  {
    id: "MATH-DER-002",
    subject: "Mathematics",
    chapter: "Calculus",
    topic: "derivatives",
    subtopic: "Product rule with logarithm",
    difficulty: "CSCA Standard",
    type: "mcq",
    stem: "Let f(x) = x³·ln x (x > 0). What is f′(e)?",
    options: ["3e²", "4e²", "e³", "e²(3 + ln e)"],
    answer: 1,
    explanationSteps: [
      "Step 1: Use the product rule: (uv)′ = u′v + uv′ with u = x³, v = ln x.",
      "Step 2: u′ = 3x² and v′ = 1/x, so f′(x) = 3x²·ln x + x³·(1/x) = 3x²·ln x + x².",
      "Step 3: Factor: f′(x) = x²(3 ln x + 1).",
      "Step 4: At x = e, ln e = 1, so f′(e) = e²(3·1 + 1) = 4e²."
    ],
    whyNot: [
      "A (3e²) differentiates x³ but drops the second product-rule term x².",
      "C (e³) confuses the original function value f(e) = e³ with its derivative.",
      "D is f′(x) before substituting ln e = 1 — it is unsimplified, not the final value."
    ],
    concept: "Product rule combined with d/dx(ln x) = 1/x.",
    source: "CSCA-Prep original — CSCA Standard derivative practice",
    sourceType: "practice",
    examRelevance: 5,
    estimatedTimeSec: 70
  },
  {
    id: "MATH-DER-003",
    subject: "Mathematics",
    chapter: "Calculus",
    topic: "derivatives",
    subtopic: "Tangent line",
    difficulty: "CSCA Standard",
    type: "mcq",
    stem: "What is the equation of the tangent line to y = x² − 3x + 2 at x = 2?",
    options: ["y = x − 2", "y = x + 2", "y = −x − 2", "y = 2x − 4"],
    answer: 0,
    explanationSteps: [
      "Step 1: Point on the curve: y(2) = 4 − 6 + 2 = 0, so the point is (2, 0).",
      "Step 2: Slope: y′ = 2x − 3, so m = y′(2) = 4 − 3 = 1.",
      "Step 3: Point–slope form: y − 0 = 1·(x − 2), i.e. y = x − 2."
    ],
    whyNot: [
      "B (y = x + 2) has the right slope but misses the point (2, 0): 2 + 2 ≠ 0.",
      "C flips the sign of the slope; y′(2) = +1, not −1.",
      "D (y = 2x − 4) uses y(2) = 0 correctly but doubles the slope."
    ],
    concept: "Tangent line: slope = derivative at the point, then point–slope form.",
    source: "CSCA-Prep original — CSCA Standard derivative practice",
    sourceType: "practice",
    examRelevance: 5,
    estimatedTimeSec: 65
  },
  // ---------------- Functions ----------------
  {
    id: "MATH-FUN-004",
    subject: "Mathematics",
    chapter: "Functions",
    topic: "functions",
    subtopic: "Domain & range",
    difficulty: "Foundation",
    type: "mcq",
    stem: "What is the domain of f(x) = √(x − 2)?",
    options: ["x > 2", "x ≥ 2", "All real x", "x ≥ 0"],
    answer: 1,
    explanationSteps: [
      "Step 1: A real square root needs a non-negative radicand: x − 2 ≥ 0.",
      "Step 2: Solve: x ≥ 2.",
      "Step 3: At x = 2 the value is √0 = 0, which is valid, so 2 is included."
    ],
    whyNot: [
      "A (x > 2) wrongly excludes x = 2, where the function equals 0.",
      "C ignores the square-root restriction entirely.",
      "D (x ≥ 0) is the domain of √x, not of √(x − 2) which is shifted right by 2."
    ],
    concept: "Domain of an even root: radicand must be ≥ 0.",
    source: "CSCA-Prep original — Functions fundamentals drill",
    sourceType: "original",
    examRelevance: 3,
    estimatedTimeSec: 45
  },
  {
    id: "MATH-FUN-005",
    subject: "Mathematics",
    chapter: "Functions",
    topic: "functions",
    subtopic: "Composition",
    difficulty: "CSCA Standard",
    type: "mcq",
    stem: "Let f(x) = 2ˣ and g(x) = x + 1. What is f(g(2))?",
    options: ["6", "8", "5", "16"],
    answer: 1,
    explanationSteps: [
      "Step 1: Work from the inside out: g(2) = 2 + 1 = 3.",
      "Step 2: Then f(g(2)) = f(3) = 2³ = 8."
    ],
    whyNot: [
      "A (6) computes 2·3 instead of 2³ — multiplication instead of exponentiation.",
      "C (5) adds base and exponent (2 + 3) rather than evaluating the power.",
      "D (16) computes f(g(3)) = 2⁴ — it applies g twice."
    ],
    concept: "Function composition is evaluated inside-out.",
    source: "CSCA-Prep original — CSCA Standard functions practice",
    sourceType: "practice",
    examRelevance: 4,
    estimatedTimeSec: 60
  },
  {
    id: "MATH-FUN-006",
    subject: "Mathematics",
    chapter: "Functions",
    topic: "functions",
    subtopic: "Even / odd functions",
    difficulty: "CSCA Standard",
    type: "mcq",
    stem: "Which of the following functions is odd on ℝ?",
    options: [
      "f(x) = x² + 1",
      "f(x) = x³ − 3x",
      "f(x) = 2ˣ",
      "f(x) = |x|"
    ],
    answer: 1,
    explanationSteps: [
      "Step 1: An odd function satisfies f(−x) = −f(x) for all x.",
      "Step 2: Test B: f(−x) = (−x)³ − 3(−x) = −x³ + 3x = −(x³ − 3x) = −f(x).",
      "Step 3: Hence B is odd (and a sum of odd powers stays odd)."
    ],
    whyNot: [
      "A is even: (−x)² + 1 = x² + 1 = f(x), symmetric about the y-axis.",
      "C is neither: 2⁻ˣ ≠ 2ˣ and 2⁻ˣ ≠ −2ˣ.",
      "D is even: |−x| = |x|, not −|x|."
    ],
    concept: "Odd functions: f(−x) = −f(x); odd powers with no even terms.",
    source: "CSCA-Prep original — CSCA Standard functions practice",
    sourceType: "practice",
    examRelevance: 4,
    estimatedTimeSec: 65
  },
  // ---------------- Algebra ----------------
  {
    id: "MATH-ALG-007",
    subject: "Mathematics",
    chapter: "Sets & Inequalities",
    topic: "algebra",
    subtopic: "Quadratic equations",
    difficulty: "Basic",
    type: "mcq",
    stem: "What are the solutions of 2x² − 7x + 3 = 0?",
    options: ["x = 3 or x = 1/2", "x = 3 or x = −1/2", "x = 1 or x = 3", "x = −3 or x = −1/2"],
    answer: 0,
    explanationSteps: [
      "Step 1: Factor: 2x² − 7x + 3 = (2x − 1)(x − 3).",
      "Step 2: Set each factor to zero: 2x − 1 = 0 → x = 1/2; x − 3 = 0 → x = 3.",
      "Step 3: Check: 2(3)² − 7(3) + 3 = 18 − 21 + 3 = 0. ✓"
    ],
    whyNot: [
      "B flips the sign of 1/2 — but (2x + 1)(x − 3) expands to 2x² − 5x − 3.",
      "C (1 and 3) gives 2 − 7 + 3 = −2 ≠ 0 for x = 1.",
      "D negates both roots; substituting −3 gives 18 + 21 + 3 ≠ 0."
    ],
    concept: "Solving quadratics by factoring / zero-product property.",
    source: "CSCA-Prep original — Algebra fundamentals drill",
    sourceType: "original",
    examRelevance: 4,
    estimatedTimeSec: 55
  },
  {
    id: "MATH-ALG-008",
    subject: "Mathematics",
    chapter: "Sets & Inequalities",
    topic: "algebra",
    subtopic: "Arithmetic sequences",
    difficulty: "CSCA Standard",
    type: "mcq",
    stem: "An arithmetic sequence has a₁ = 3 and common difference d = 4. What is the sum of its first 10 terms?",
    options: ["195", "210", "120", "240"],
    answer: 1,
    explanationSteps: [
      "Step 1: Sum formula: Sₙ = n/2 · (2a₁ + (n − 1)d).",
      "Step 2: Substitute n = 10, a₁ = 3, d = 4: S₁₀ = 10/2 · (6 + 9·4).",
      "Step 3: 9·4 = 36, 6 + 36 = 42, 5·42 = 210."
    ],
    whyNot: [
      "A (195) uses (n − 1) = 8 instead of 9 in the formula.",
      "C (120) computes n·(a₁ + d) = 10·12 — the formula for neither sum nor nth term.",
      "D (240) uses 2a₁ = 12 or d = 5 by arithmetic slip; check 5·42 = 210."
    ],
    concept: "Arithmetic series sum Sₙ = n/2 · (2a₁ + (n−1)d).",
    source: "CSCA-Prep original — CSCA Standard sequences practice",
    sourceType: "practice",
    examRelevance: 5,
    estimatedTimeSec: 70
  },
  {
    id: "MATH-ALG-009",
    subject: "Mathematics",
    chapter: "Sets & Inequalities",
    topic: "algebra",
    subtopic: "Absolute-value inequalities",
    difficulty: "Challenging",
    type: "mcq",
    stem: "What is the solution set of |2x − 3| < 5?",
    options: ["−1 < x < 4", "x < −1 or x > 4", "1 < x < 4", "−4 < x < 1"],
    answer: 0,
    explanationSteps: [
      "Step 1: |2x − 3| < 5 means −5 < 2x − 3 < 5.",
      "Step 2: Add 3 everywhere: −2 < 2x < 8.",
      "Step 3: Divide by 2: −1 < x < 4."
    ],
    whyNot: [
      "B solves |2x − 3| > 5 instead — the inequality direction is reversed.",
      "C (1 < x < 4) adds 3 incorrectly on the left (−5 + 3 = −2, not 2).",
      "D mirrors the interval around the wrong center; test x = 0: |−3| = 3 < 5 passes, but x = −4 gives 11 < 5, false."
    ],
    concept: "|u| < a ⟺ −a < u < a; then isolate x.",
    source: "CSCA-Prep original — Challenge inequalities set",
    sourceType: "original",
    examRelevance: 4,
    estimatedTimeSec: 95
  },
  // ---------------- Geometry ----------------
  {
    id: "MATH-GEO-010",
    subject: "Mathematics",
    chapter: "Geometry",
    topic: "geometry",
    subtopic: "Distance formula",
    difficulty: "Basic",
    type: "mcq",
    stem: "What is the distance between points A(1, 2) and B(4, 6)?",
    options: ["4", "5", "6", "√7"],
    answer: 1,
    explanationSteps: [
      "Step 1: Distance formula: d = √((x₂ − x₁)² + (y₂ − y₁)²).",
      "Step 2: dx = 4 − 1 = 3, dy = 6 − 2 = 4.",
      "Step 3: d = √(9 + 16) = √25 = 5 (a 3-4-5 triangle)."
    ],
    whyNot: [
      "A (4) reports only dy, ignoring the horizontal separation.",
      "C (6) adds dx + dy − 1 instead of using Pythagoras.",
      "D takes √(3 + 4) — it forgets to square the differences first."
    ],
    concept: "Coordinate distance = Pythagoras on (dx, dy).",
    source: "CSCA-Prep original — Geometry fundamentals drill",
    sourceType: "original",
    examRelevance: 3,
    estimatedTimeSec: 55
  },
  {
    id: "MATH-GEO-011",
    subject: "Mathematics",
    chapter: "Geometry",
    topic: "geometry",
    subtopic: "Circle equation",
    difficulty: "CSCA Standard",
    type: "mcq",
    stem: "The circle x² + y² − 4x + 6y − 12 = 0 has center and radius:",
    options: [
      "Center (2, −3), radius 5",
      "Center (−2, 3), radius 5",
      "Center (2, −3), radius 25",
      "Center (4, −6), radius 5"
    ],
    answer: 0,
    explanationSteps: [
      "Step 1: Complete the square: (x² − 4x) + (y² + 6y) = 12.",
      "Step 2: (x − 2)² − 4 + (y + 3)² − 9 = 12 → (x − 2)² + (y + 3)² = 25.",
      "Step 3: Standard form (x − h)² + (y − k)² = r² gives center (2, −3), r = 5."
    ],
    whyNot: [
      "B flips both signs — it reads the center as (h, k) = (−2, 3) from the unsquared form.",
      "C confuses r² = 25 with r = 25; the radius is √25 = 5.",
      "D doubles the center coordinates by reading −4x and +6y directly as h, k."
    ],
    concept: "Circle standard form via completing the square.",
    source: "CSCA-Prep original — CSCA Standard analytic geometry",
    sourceType: "practice",
    examRelevance: 5,
    estimatedTimeSec: 75
  },
  {
    id: "MATH-GEO-012",
    subject: "Mathematics",
    chapter: "Geometry",
    topic: "geometry",
    subtopic: "Ellipse foci",
    difficulty: "Challenging",
    type: "mcq",
    stem: "For the ellipse x²/25 + y²/9 = 1, where are the foci?",
    options: ["(±4, 0)", "(0, ±4)", "(±3, 0)", "(±5, 0)"],
    answer: 0,
    explanationSteps: [
      "Step 1: a² = 25, b² = 9 with a > b, so the major axis is horizontal.",
      "Step 2: c² = a² − b² = 25 − 9 = 16, so c = 4.",
      "Step 3: Foci lie on the major axis at (±c, 0) = (±4, 0)."
    ],
    whyNot: [
      "B puts the foci on the minor (vertical) axis; a² > b² means horizontal.",
      "C reports (±b, 0) — the minor semi-axis endpoints, not the foci.",
      "D reports (±a, 0) — the vertices, where c = 0 would be needed."
    ],
    concept: "Ellipse c² = |a² − b²|; foci on the major axis.",
    source: "CSCA-Prep original — Challenge conic sections set",
    sourceType: "original",
    examRelevance: 4,
    estimatedTimeSec: 100
  },
  // ---------------- Probability ----------------
  {
    id: "MATH-PROB-013",
    subject: "Mathematics",
    chapter: "Probability",
    topic: "probability",
    subtopic: "Classical probability",
    difficulty: "Foundation",
    type: "mcq",
    stem: "A fair six-sided die is rolled once. What is P(rolling an even number)?",
    options: ["1/6", "1/3", "1/2", "2/3"],
    answer: 2,
    explanationSteps: [
      "Step 1: Sample space: {1, 2, 3, 4, 5, 6} — 6 equally likely outcomes.",
      "Step 2: Even outcomes: {2, 4, 6} — 3 favorable outcomes.",
      "Step 3: P = 3/6 = 1/2."
    ],
    whyNot: [
      "A (1/6) is P(one specific face), not P(any of three even faces).",
      "B (1/3) counts only two even faces instead of three.",
      "D (2/3) counts four outcomes — e.g. it wrongly includes an odd number."
    ],
    concept: "Classical probability = favorable / total equally likely outcomes.",
    source: "CSCA-Prep original — Probability fundamentals drill",
    sourceType: "original",
    examRelevance: 3,
    estimatedTimeSec: 45
  },
  {
    id: "MATH-PROB-014",
    subject: "Mathematics",
    chapter: "Probability",
    topic: "probability",
    subtopic: "Without replacement",
    difficulty: "CSCA Standard",
    type: "mcq",
    stem: "A box has 3 red and 2 blue balls. Two balls are drawn without replacement. What is P(both red)?",
    options: ["9/25", "3/10", "1/2", "3/5"],
    answer: 1,
    explanationSteps: [
      "Step 1: P(first red) = 3/5.",
      "Step 2: After one red is removed, 2 red remain out of 4: P(second red | first red) = 2/4 = 1/2.",
      "Step 3: Multiply: (3/5)·(1/2) = 3/10."
    ],
    whyNot: [
      "A (9/25) treats the draws as with replacement: (3/5)·(3/5).",
      "C (1/2) is only the conditional second-draw probability, not the joint one.",
      "D (3/5) is only the first-draw probability; it ignores the second draw."
    ],
    concept: "Sequential probability without replacement: denominators shrink.",
    source: "CSCA-Prep original — CSCA Standard probability practice",
    sourceType: "practice",
    examRelevance: 5,
    estimatedTimeSec: 70
  },
  {
    id: "MATH-PROB-015",
    subject: "Mathematics",
    chapter: "Probability",
    topic: "probability",
    subtopic: "Complement rule",
    difficulty: "CSCA Standard",
    type: "mcq",
    stem: "A fair coin is tossed 3 times. What is P(at least one head)?",
    options: ["1/2", "3/8", "7/8", "3/4"],
    answer: 2,
    explanationSteps: [
      "Step 1: Use the complement: P(at least one head) = 1 − P(no heads).",
      "Step 2: P(all tails) = (1/2)³ = 1/8.",
      "Step 3: 1 − 1/8 = 7/8."
    ],
    whyNot: [
      "A (1/2) is P(head on a single toss), not on at least one of three.",
      "B (3/8) adds 1/8 three times — that is P(exactly one head is TTH-pattern) logic misapplied.",
      "D (3/4) is 1 − (1/2)² — it only accounts for two tosses."
    ],
    concept: "Complement rule: P(at least one) = 1 − P(none).",
    source: "CSCA-Prep original — CSCA Standard probability practice",
    sourceType: "practice",
    examRelevance: 4,
    estimatedTimeSec: 60
  },
  // ---------------- Calculus ----------------
  {
    id: "MATH-CAL-016",
    subject: "Mathematics",
    chapter: "Calculus",
    topic: "calculus",
    subtopic: "Limits by factoring",
    difficulty: "Basic",
    type: "mcq",
    stem: "Evaluate lim (x→2) (x² − 4)/(x − 2).",
    options: ["0", "2", "4", "Does not exist"],
    answer: 2,
    explanationSteps: [
      "Step 1: Direct substitution gives 0/0 — factor instead.",
      "Step 2: (x² − 4)/(x − 2) = (x − 2)(x + 2)/(x − 2) = x + 2 for x ≠ 2.",
      "Step 3: The limit is therefore 2 + 2 = 4."
    ],
    whyNot: [
      "A (0) mistakes the 0/0 form for a final answer of 0.",
      "B (2) substitutes x = 2 into only part of the expression.",
      "D is wrong because the removable discontinuity still has a limit of 4."
    ],
    concept: "Removable discontinuity: cancel the common factor, then substitute.",
    source: "CSCA-Prep original — Calculus fundamentals drill",
    sourceType: "original",
    examRelevance: 4,
    estimatedTimeSec: 55
  },
  {
    id: "MATH-CAL-017",
    subject: "Mathematics",
    chapter: "Calculus",
    topic: "calculus",
    subtopic: "Definite integral",
    difficulty: "CSCA Standard",
    type: "mcq",
    stem: "Evaluate ∫₀² (2x + 1) dx.",
    options: ["4", "6", "5", "8"],
    answer: 1,
    explanationSteps: [
      "Step 1: Antiderivative: ∫(2x + 1) dx = x² + x + C.",
      "Step 2: Evaluate 0 → 2: (2² + 2) − (0 + 0) = 6.",
      "Step 3: Geometrically this is the area of a trapezoid with heights 1 and 5 over width 2: (1 + 5)/2 · 2 = 6. ✓"
    ],
    whyNot: [
      "A (4) integrates 2x to x² but drops the +1 term (area 4 vs 6).",
      "C (5) evaluates x² + x at x = 2 as 4 + 1 — an arithmetic slip.",
      "D (8) uses antiderivative x² + 2x or evaluates at the wrong bounds."
    ],
    concept: "Definite integral = antiderivative difference F(b) − F(a).",
    source: "CSCA-Prep original — CSCA Standard calculus practice",
    sourceType: "practice",
    examRelevance: 5,
    estimatedTimeSec: 65
  },
  {
    id: "MATH-CAL-018",
    subject: "Mathematics",
    chapter: "Calculus",
    topic: "calculus",
    subtopic: "Monotonicity",
    difficulty: "CSCA Standard",
    type: "mcq",
    stem: "On which interval is f(x) = x³ − 3x² strictly decreasing?",
    options: ["(−∞, 0)", "(0, 2)", "(2, ∞)", "(−∞, ∞)"],
    answer: 1,
    explanationSteps: [
      "Step 1: f′(x) = 3x² − 6x = 3x(x − 2). Critical points at x = 0 and x = 2.",
      "Step 2: Sign chart: f′ > 0 on (−∞, 0), f′ < 0 on (0, 2), f′ > 0 on (2, ∞).",
      "Step 3: Decreasing where f′ < 0, i.e. (0, 2)."
    ],
    whyNot: [
      "A and C are the increasing intervals (f′ > 0 there), the opposite answer.",
      "D is impossible for a cubic with two turning points — it cannot be monotone everywhere."
    ],
    concept: "f decreasing ⟺ f′ < 0 between adjacent critical points.",
    source: "CSCA-Prep original — CSCA Standard calculus practice",
    sourceType: "practice",
    examRelevance: 5,
    estimatedTimeSec: 75
  },
  // ---------------- Vectors ----------------
  {
    id: "MATH-VEC-019",
    subject: "Mathematics",
    chapter: "Vectors",
    topic: "vectors",
    subtopic: "Vector addition",
    difficulty: "Foundation",
    type: "mcq",
    stem: "Let a = (1, 2) and b = (3, −1). What is a + b?",
    options: ["(4, 1)", "(4, 3)", "(2, −3)", "(−2, 3)"],
    answer: 0,
    explanationSteps: [
      "Step 1: Add components: (1 + 3, 2 + (−1)).",
      "Step 2: Simplify: (4, 1)."
    ],
    whyNot: [
      "B adds 2 + 1 instead of 2 + (−1) — a sign error on the y-component.",
      "C computes b − a = (2, −3), the wrong operation.",
      "D computes a − b = (−2, 3), subtracting instead of adding."
    ],
    concept: "Vector addition is component-wise.",
    source: "CSCA-Prep original — Vectors fundamentals drill",
    sourceType: "original",
    examRelevance: 3,
    estimatedTimeSec: 45
  },
  {
    id: "MATH-VEC-020",
    subject: "Mathematics",
    chapter: "Vectors",
    topic: "vectors",
    subtopic: "Magnitude of a difference",
    difficulty: "CSCA Standard",
    type: "mcq",
    stem: "Let a = (2, 1) and b = (1, 3). What is |a − b|?",
    options: ["√2", "√5", "√10", "5"],
    answer: 1,
    explanationSteps: [
      "Step 1: a − b = (2 − 1, 1 − 3) = (1, −2).",
      "Step 2: |v| = √(x² + y²) = √(1 + 4) = √5."
    ],
    whyNot: [
      "A (√2) adds |1| + |−2| = 3 then mis-simplifies, or uses (1, 1).",
      "C (√10) computes |a + b| = |(3, 4)| = 5... no — it computes (1² + 3²) mixing components.",
      "D (5) reports the squared magnitude 1 + 4 without taking the square root."
    ],
    concept: "Magnitude |v| = √(x² + y²); subtract first, then measure.",
    source: "CSCA-Prep original — CSCA Standard vectors practice",
    sourceType: "practice",
    examRelevance: 4,
    estimatedTimeSec: 60
  },
  {
    id: "MATH-VEC-021",
    subject: "Mathematics",
    chapter: "Vectors",
    topic: "vectors",
    subtopic: "Angle between vectors",
    difficulty: "Challenging",
    type: "mcq",
    stem: "What is the angle between a = (1, √3) and b = (√3, 1)?",
    options: ["15°", "30°", "45°", "60°"],
    answer: 1,
    explanationSteps: [
      "Step 1: Dot product: a·b = 1·√3 + √3·1 = 2√3.",
      "Step 2: |a| = √(1 + 3) = 2; |b| = √(3 + 1) = 2.",
      "Step 3: cos θ = (2√3)/(2·2) = √3/2, so θ = 30°."
    ],
    whyNot: [
      "A (15°) halves the true angle — it confuses θ with θ/2 from a half-angle slip.",
      "C (45°) assumes equal components after normalizing, but a·b ≠ |a||b|/√2 here.",
      "D (60°) uses cos θ = 1/2, i.e. it drops a factor of √3 in the dot product."
    ],
    concept: "cos θ = (a·b) / (|a||b|).",
    source: "CSCA-Prep original — Challenge vectors set",
    sourceType: "original",
    examRelevance: 4,
    estimatedTimeSec: 110
  },
  // ---------------- Complex ----------------
  {
    id: "MATH-CPX-022",
    subject: "Mathematics",
    chapter: "Complex Numbers",
    topic: "complex",
    subtopic: "Addition",
    difficulty: "Basic",
    type: "mcq",
    stem: "What is (1 + i) + (2 − 3i)?",
    options: ["3 − 2i", "3 + 4i", "−1 + 4i", "3 − 4i"],
    answer: 0,
    explanationSteps: [
      "Step 1: Group real parts: 1 + 2 = 3.",
      "Step 2: Group imaginary parts: i − 3i = −2i.",
      "Step 3: Result: 3 − 2i."
    ],
    whyNot: [
      "B adds +3i instead of −3i — a sign error on the second imaginary part.",
      "C subtracts the real parts (1 − 2) while adding the imaginary ones.",
      "D computes (1 + i) + (2 + 3i)... it flips the sign of −3i."
    ],
    concept: "Add complex numbers: real with real, imaginary with imaginary.",
    source: "CSCA-Prep original — Complex numbers fundamentals drill",
    sourceType: "original",
    examRelevance: 3,
    estimatedTimeSec: 50
  },
  {
    id: "MATH-CPX-023",
    subject: "Mathematics",
    chapter: "Complex Numbers",
    topic: "complex",
    subtopic: "Modulus",
    difficulty: "CSCA Standard",
    type: "mcq",
    stem: "What is the modulus |z| of z = 3 + 4i?",
    options: ["7", "5", "25", "√7"],
    answer: 1,
    explanationSteps: [
      "Step 1: |a + bi| = √(a² + b²).",
      "Step 2: |z| = √(9 + 16) = √25 = 5."
    ],
    whyNot: [
      "A (7) adds 3 + 4 — the modulus is not the sum of components.",
      "C (25) reports the squared modulus a² + b² without the square root.",
      "D takes √(3 + 4) — it forgets to square before adding."
    ],
    concept: "Modulus = distance from origin: √(a² + b²).",
    source: "CSCA-Prep original — CSCA Standard complex practice",
    sourceType: "practice",
    examRelevance: 4,
    estimatedTimeSec: 60
  },
  {
    id: "MATH-CPX-024",
    subject: "Mathematics",
    chapter: "Complex Numbers",
    topic: "complex",
    subtopic: "Powers of i",
    difficulty: "Challenging",
    type: "mcq",
    stem: "What is (1 + i)⁴?",
    options: ["4i", "−4", "4", "2 + 2i"],
    answer: 1,
    explanationSteps: [
      "Step 1: First square: (1 + i)² = 1 + 2i + i² = 1 + 2i − 1 = 2i.",
      "Step 2: Square again: (2i)² = 4i² = −4.",
      "Step 3: So (1 + i)⁴ = −4."
    ],
    whyNot: [
      "A (4i) stops halfway — that is 2·(1 + i)², not the fourth power.",
      "C (4) drops the sign of i² = −1 in the final step.",
      "D (2 + 2i) is 2(1 + i) — it multiplies by 2 instead of raising to the 4th power."
    ],
    concept: "Powers of (1 + i) via repeated squaring and i² = −1.",
    source: "CSCA-Prep original — Challenge complex numbers set",
    sourceType: "original",
    examRelevance: 4,
    estimatedTimeSec: 105
  },
  // ---------------- NEW: Foundation (025-028) ----------------
  {
    id: "MATH-FUN-025",
    subject: "Mathematics",
    chapter: "Functions",
    topic: "functions",
    subtopic: "Trigonometric values",
    difficulty: "Foundation",
    type: "mcq",
    stem: "What is sin 30°?",
    options: ["1/2", "√3/2", "√2/2", "1"],
    answer: 0,
    explanationSteps: [
      "Step 1: Recall the standard 30°-60°-90° triangle with sides 1 : √3 : 2 (short leg : long leg : hypotenuse).",
      "Step 2: sin 30° = opposite/hypotenuse = 1/2."
    ],
    whyNot: [
      "B (√3/2) is cos 30° (equivalently sin 60°), the adjacent-side ratio.",
      "C (√2/2) is sin 45°, from the isosceles right triangle.",
      "D (1) is sin 90°, the maximum value of sine."
    ],
    concept: "Standard angles: sin 30° = 1/2 from the 1-√3-2 triangle.",
    source: "CSCA-Prep original — Functions fundamentals drill",
    sourceType: "original",
    examRelevance: 3,
    estimatedTimeSec: 40
  },
  {
    id: "MATH-FUN-026",
    subject: "Mathematics",
    chapter: "Functions",
    topic: "functions",
    subtopic: "Logarithm basics",
    difficulty: "Foundation",
    type: "mcq",
    stem: "What is log₁₀ 1000?",
    options: ["2", "3", "4", "10"],
    answer: 1,
    explanationSteps: [
      "Step 1: log₁₀ 1000 asks: 10 raised to what power equals 1000?",
      "Step 2: 10³ = 1000, so log₁₀ 1000 = 3."
    ],
    whyNot: [
      "A (2) is log₁₀ 100, since 10² = 100.",
      "C (4) is log₁₀ 10000, one zero too many.",
      "D (10) confuses the base with the answer."
    ],
    concept: "Common logarithm: log₁₀(10ⁿ) = n.",
    source: "CSCA-Prep original — Functions fundamentals drill",
    sourceType: "original",
    examRelevance: 3,
    estimatedTimeSec: 40
  },
  {
    id: "MATH-PROB-027",
    subject: "Mathematics",
    chapter: "Probability",
    topic: "probability",
    subtopic: "Mean of a data set",
    difficulty: "Foundation",
    type: "mcq",
    stem: "What is the mean of the data set {2, 4, 6, 8, 10}?",
    options: ["5", "6", "7", "8"],
    answer: 1,
    explanationSteps: [
      "Step 1: Sum the values: 2 + 4 + 6 + 8 + 10 = 30.",
      "Step 2: Divide by the count (5): 30 / 5 = 6."
    ],
    whyNot: [
      "A (5) is the count of values, not their average.",
      "C (7) adds an extra 5 to the sum before dividing.",
      "D (8) is the second-largest value, not the balance point."
    ],
    concept: "Mean = sum of values / number of values.",
    source: "CSCA-Prep original — Probability fundamentals drill",
    sourceType: "original",
    examRelevance: 3,
    estimatedTimeSec: 45
  },
  {
    id: "MATH-GEO-028",
    subject: "Mathematics",
    chapter: "Geometry",
    topic: "geometry",
    subtopic: "Volume of a cube",
    difficulty: "Foundation",
    type: "mcq",
    stem: "A cube has side length 3. What is its volume?",
    options: ["9", "18", "27", "36"],
    answer: 2,
    explanationSteps: [
      "Step 1: Volume of a cube: V = s³.",
      "Step 2: V = 3³ = 27."
    ],
    whyNot: [
      "A (9) is the face area s², not the volume.",
      "B (18) is 6s, the total edge-length pattern misapplied — not s³.",
      "D (36) is 6·s² / ... it is the surface area 6·9 = 54 cut down, still not volume; check 3³ = 27."
    ],
    concept: "Cube volume V = s³.",
    source: "CSCA-Prep original — Geometry fundamentals drill",
    sourceType: "original",
    examRelevance: 3,
    estimatedTimeSec: 45
  },
  // ---------------- NEW: Basic (029-032) ----------------
  {
    id: "MATH-FUN-029",
    subject: "Mathematics",
    chapter: "Functions",
    topic: "functions",
    subtopic: "Exponential equations",
    difficulty: "Basic",
    type: "mcq",
    stem: "Solve for x: 2ˣ = 32.",
    options: ["4", "5", "6", "16"],
    answer: 1,
    explanationSteps: [
      "Step 1: Write 32 as a power of 2: 32 = 2⁵.",
      "Step 2: Equal bases give equal exponents: x = 5."
    ],
    whyNot: [
      "A (4) gives 2⁴ = 16, only half of 32.",
      "C (6) gives 2⁶ = 64, double the target.",
      "D (16) is 32 / 2 — it divides instead of taking the logarithm."
    ],
    concept: "Solve aˣ = aⁿ by matching exponents.",
    source: "CSCA-Prep original — Functions fundamentals drill",
    sourceType: "original",
    examRelevance: 3,
    estimatedTimeSec: 50
  },
  {
    id: "MATH-ALG-030",
    subject: "Mathematics",
    chapter: "Sets & Inequalities",
    topic: "algebra",
    subtopic: "Geometric sequences",
    difficulty: "Basic",
    type: "mcq",
    stem: "A geometric sequence starts 2, 6, 18, … What is the next term?",
    options: ["36", "48", "54", "72"],
    answer: 2,
    explanationSteps: [
      "Step 1: Common ratio r = 6 / 2 = 3.",
      "Step 2: Next term = 18 · 3 = 54."
    ],
    whyNot: [
      "A (36) doubles 18 — it uses r = 2 instead of 3.",
      "B (48) adds 30, continuing an addition pattern that is not geometric.",
      "D (72) multiplies 18 by 4, the wrong ratio."
    ],
    concept: "Geometric sequence: multiply by the common ratio r each step.",
    source: "CSCA-Prep original — Algebra fundamentals drill",
    sourceType: "original",
    examRelevance: 4,
    estimatedTimeSec: 55
  },
  {
    id: "MATH-ALG-031",
    subject: "Mathematics",
    chapter: "Sets & Inequalities",
    topic: "algebra",
    subtopic: "Linear inequalities",
    difficulty: "Basic",
    type: "mcq",
    stem: "Solve for x: 3x − 5 < 10.",
    options: ["x < 5", "x > 5", "x < 10/3", "x > 10/3"],
    answer: 0,
    explanationSteps: [
      "Step 1: Add 5 to both sides: 3x < 15.",
      "Step 2: Divide by 3 (positive, so the sign stays): x < 5."
    ],
    whyNot: [
      "B flips the inequality without multiplying/dividing by a negative.",
      "C forgets to add 5 first and divides 10 by 3 directly.",
      "D both skips the +5 step and flips the sign."
    ],
    concept: "Linear inequality: isolate x; flip the sign only when ×/÷ by a negative.",
    source: "CSCA-Prep original — Algebra fundamentals drill",
    sourceType: "original",
    examRelevance: 3,
    estimatedTimeSec: 50
  },
  {
    id: "MATH-CPX-032",
    subject: "Mathematics",
    chapter: "Complex Numbers",
    topic: "complex",
    subtopic: "Modulus",
    difficulty: "Basic",
    type: "mcq",
    stem: "What is the modulus |z| of z = 5 − 12i?",
    options: ["7", "13", "17", "√119"],
    answer: 1,
    explanationSteps: [
      "Step 1: |a + bi| = √(a² + b²) = √(25 + 144).",
      "Step 2: √(169) = 13 (a 5-12-13 triangle)."
    ],
    whyNot: [
      "A (7) computes 12 − 5, ignoring the squares and root.",
      "C (17) is 5 + 12 — the modulus is not the sum of components.",
      "D takes √(25 + 144 − 50) or a similar slip; recompute 25 + 144 = 169."
    ],
    concept: "Modulus = distance from origin: √(a² + b²).",
    source: "CSCA-Prep original — Complex numbers fundamentals drill",
    sourceType: "original",
    examRelevance: 3,
    estimatedTimeSec: 55
  },
  // ---------------- NEW: CSCA Standard (033-044) ----------------
  {
    id: "MATH-FUN-033",
    subject: "Mathematics",
    chapter: "Functions",
    topic: "functions",
    subtopic: "Logarithmic equations",
    difficulty: "CSCA Standard",
    type: "mcq",
    stem: "Solve for x > 2: log₂ x + log₂(x − 2) = 3.",
    options: ["2", "3", "4", "6"],
    answer: 2,
    explanationSteps: [
      "Step 1: Combine: log₂(x(x − 2)) = 3, so x(x − 2) = 2³ = 8.",
      "Step 2: x² − 2x − 8 = 0 → (x − 4)(x + 2) = 0, so x = 4 or x = −2.",
      "Step 3: Reject x = −2 (log of a negative is undefined); check x = 4: log₂4 + log₂2 = 2 + 1 = 3. ✓"
    ],
    whyNot: [
      "A (2) makes log₂(x − 2) = log₂0, which is undefined.",
      "B (3): log₂3 + log₂1 = log₂3 ≈ 1.58, not 3.",
      "D (6): log₂6 + log₂4 ≈ 2.58 + 2 = 4.58, too large."
    ],
    concept: "log a + log b = log(ab); reject extraneous roots outside the domain.",
    source: "CSCA-Prep original — CSCA Standard functions practice",
    sourceType: "practice",
    examRelevance: 5,
    estimatedTimeSec: 70
  },
  {
    id: "MATH-FUN-034",
    subject: "Mathematics",
    chapter: "Functions",
    topic: "functions",
    subtopic: "Trigonometric identities",
    difficulty: "CSCA Standard",
    type: "mcq",
    stem: "If sin θ = 3/5 and θ is acute, what is cos θ?",
    options: ["4/5", "5/4", "3/4", "5/3"],
    answer: 0,
    explanationSteps: [
      "Step 1: Use sin²θ + cos²θ = 1: cos²θ = 1 − 9/25 = 16/25.",
      "Step 2: θ acute → cos θ > 0, so cos θ = 4/5.",
      "Step 3: Sanity check: 3-4-5 triangle. ✓"
    ],
    whyNot: [
      "B (5/4) exceeds 1 — impossible for cosine of a real angle.",
      "C (3/4) satisfies no identity: (3/5)² + (3/4)² = 369/400 ≠ 1.",
      "D (5/3) is cosecant (1/sin θ), not cosine."
    ],
    concept: "Pythagorean identity sin²θ + cos²θ = 1 with quadrant sign.",
    source: "CSCA-Prep original — CSCA Standard functions practice",
    sourceType: "practice",
    examRelevance: 4,
    estimatedTimeSec: 60
  },
  {
    id: "MATH-FUN-035",
    subject: "Mathematics",
    chapter: "Functions",
    topic: "functions",
    subtopic: "Exponential equations",
    difficulty: "CSCA Standard",
    type: "mcq",
    stem: "Solve for x: 4ˣ = 8ˣ⁻¹.",
    options: ["2", "3", "4", "6"],
    answer: 1,
    explanationSteps: [
      "Step 1: Write both sides as powers of 2: 2²ˣ = 2³⁽ˣ⁻¹⁾.",
      "Step 2: Equate exponents: 2x = 3x − 3, so x = 3.",
      "Step 3: Check: 4³ = 64 and 8² = 64. ✓"
    ],
    whyNot: [
      "A (2): 4² = 16 but 8¹ = 8 — the sides disagree.",
      "C (4): 4⁴ = 256 but 8³ = 512 — off by a factor of 2.",
      "D (6): equates 4x with 8(x − 1) on the bases instead of the exponents."
    ],
    concept: "Rewrite exponentials with a common base, then equate exponents.",
    source: "CSCA-Prep original — CSCA Standard functions practice",
    sourceType: "practice",
    examRelevance: 5,
    estimatedTimeSec: 65
  },
  {
    id: "MATH-ALG-036",
    subject: "Mathematics",
    chapter: "Sets & Inequalities",
    topic: "algebra",
    subtopic: "Geometric series sum",
    difficulty: "CSCA Standard",
    type: "mcq",
    stem: "A geometric sequence has a₁ = 3 and ratio r = 2. What is the sum of its first 5 terms?",
    options: ["93", "90", "63", "96"],
    answer: 0,
    explanationSteps: [
      "Step 1: Sum formula: Sₙ = a₁(rⁿ − 1)/(r − 1).",
      "Step 2: S₅ = 3(2⁵ − 1)/(2 − 1) = 3·31 = 93.",
      "Step 3: Check by listing: 3 + 6 + 12 + 24 + 48 = 93. ✓"
    ],
    whyNot: [
      "B (90) rounds or drops the −1 in rⁿ − 1.",
      "C (63) computes 3(2⁴ − 1)... it sums only 4 terms.",
      "D (96) is the 6th term divided... it doubles the last term instead of summing."
    ],
    concept: "Geometric series sum Sₙ = a₁(rⁿ − 1)/(r − 1).",
    source: "CSCA-Prep original — CSCA Standard sequences practice",
    sourceType: "practice",
    examRelevance: 5,
    estimatedTimeSec: 70
  },
  {
    id: "MATH-ALG-037",
    subject: "Mathematics",
    chapter: "Sets & Inequalities",
    topic: "algebra",
    subtopic: "Arithmetic series sum",
    difficulty: "CSCA Standard",
    type: "mcq",
    stem: "What is 1 + 2 + 3 + … + 50?",
    options: ["1225", "1250", "1275", "1325"],
    answer: 2,
    explanationSteps: [
      "Step 1: Pair first and last: (1 + 50) + (2 + 49) + … — 25 pairs of 51.",
      "Step 2: Sum formula Sₙ = n(n + 1)/2 = 50·51/2 = 1275."
    ],
    whyNot: [
      "A (1225) is 50·49/2 — it uses n(n − 1)/2, the wrong pairing.",
      "B (1250) is 50²/2 — it pairs each number with 50 instead of 51.",
      "D (1325) adds an extra 50 to the correct total."
    ],
    concept: "Arithmetic series 1 + … + n = n(n + 1)/2 (Gauss pairing).",
    source: "CSCA-Prep original — CSCA Standard sequences practice",
    sourceType: "practice",
    examRelevance: 4,
    estimatedTimeSec: 65
  },
  {
    id: "MATH-CAL-038",
    subject: "Mathematics",
    chapter: "Calculus",
    topic: "calculus",
    subtopic: "Limits at infinity",
    difficulty: "CSCA Standard",
    type: "mcq",
    stem: "Evaluate lim (x→∞) (3x² + 2x)/(x² − 5).",
    options: ["0", "2", "3", "∞"],
    answer: 2,
    explanationSteps: [
      "Step 1: Divide numerator and denominator by x²: (3 + 2/x)/(1 − 5/x²).",
      "Step 2: As x → ∞, 2/x → 0 and 5/x² → 0.",
      "Step 3: Limit = 3/1 = 3 (ratio of leading coefficients)."
    ],
    whyNot: [
      "A (0) confuses this with a denominator of higher degree.",
      "B (2) reports the coefficient of x instead of x².",
      "D (∞) ignores that numerator and denominator grow at the same rate."
    ],
    concept: "Limit at infinity of a rational function: compare degrees; equal degrees → ratio of leading coefficients.",
    source: "CSCA-Prep original — CSCA Standard calculus practice",
    sourceType: "practice",
    examRelevance: 4,
    estimatedTimeSec: 65
  },
  {
    id: "MATH-GEO-039",
    subject: "Mathematics",
    chapter: "Geometry",
    topic: "geometry",
    subtopic: "Parabola vertex",
    difficulty: "CSCA Standard",
    type: "mcq",
    stem: "What is the vertex of the parabola y = x² − 4x + 3?",
    options: ["(2, −1)", "(−2, 1)", "(2, 1)", "(4, 3)"],
    answer: 0,
    explanationSteps: [
      "Step 1: Complete the square: x² − 4x + 3 = (x − 2)² − 4 + 3 = (x − 2)² − 1.",
      "Step 2: Vertex form y = (x − 2)² − 1 gives vertex (2, −1)."
    ],
    whyNot: [
      "B negates h: −b/2a = +2, not −2.",
      "C keeps h = 2 but adds 4 instead of subtracting: check y(2) = 4 − 8 + 3 = −1.",
      "D (4, 3) solves y = 3 with x² − 4x = 0 → x = 0 or 4, an intercept, not the vertex."
    ],
    concept: "Vertex via completing the square or x = −b/2a.",
    source: "CSCA-Prep original — CSCA Standard analytic geometry",
    sourceType: "practice",
    examRelevance: 5,
    estimatedTimeSec: 65
  },
  {
    id: "MATH-GEO-040",
    subject: "Mathematics",
    chapter: "Geometry",
    topic: "geometry",
    subtopic: "Hyperbola asymptotes",
    difficulty: "CSCA Standard",
    type: "mcq",
    stem: "For the hyperbola x²/16 − y²/9 = 1, what are the asymptote equations?",
    options: ["y = ±3x/4", "y = ±4x/3", "y = ±9x/16", "y = ±x"],
    answer: 0,
    explanationSteps: [
      "Step 1: Standard form x²/a² − y²/b² = 1 has a² = 16, b² = 9, so a = 4, b = 3.",
      "Step 2: Asymptotes: y = ±(b/a)x = ±3x/4."
    ],
    whyNot: [
      "B inverts the ratio — that is the asymptote slope for y²/16 − x²/9 = 1 (transverse axis swapped).",
      "C uses b²/a² = 9/16 as the slope instead of b/a.",
      "D assumes a = b (a rectangular hyperbola), but 16 ≠ 9."
    ],
    concept: "Hyperbola x²/a² − y²/b² = 1 has asymptotes y = ±(b/a)x.",
    source: "CSCA-Prep original — CSCA Standard analytic geometry",
    sourceType: "practice",
    examRelevance: 4,
    estimatedTimeSec: 70
  },
  {
    id: "MATH-GEO-041",
    subject: "Mathematics",
    chapter: "Geometry",
    topic: "geometry",
    subtopic: "Volume of a cylinder",
    difficulty: "CSCA Standard",
    type: "mcq",
    stem: "A right circular cylinder has radius 3 and height 5. What is its volume?",
    options: ["15π", "30π", "45π", "75π"],
    answer: 2,
    explanationSteps: [
      "Step 1: Volume formula: V = πr²h.",
      "Step 2: V = π·3²·5 = 45π."
    ],
    whyNot: [
      "A (15π) computes πrh — it forgets to square the radius.",
      "B (30π) computes 2πrh/… it is the lateral area 2π·3·5, not the volume.",
      "D (75π) cubes nothing correctly: it computes π·5²·3, swapping r and h."
    ],
    concept: "Cylinder volume V = πr²h.",
    source: "CSCA-Prep original — CSCA Standard geometry practice",
    sourceType: "practice",
    examRelevance: 4,
    estimatedTimeSec: 60
  },
  {
    id: "MATH-PROB-042",
    subject: "Mathematics",
    chapter: "Probability",
    topic: "probability",
    subtopic: "Median",
    difficulty: "CSCA Standard",
    type: "mcq",
    stem: "What is the median of the data set {3, 7, 5, 9, 1}?",
    options: ["3", "5", "7", "6"],
    answer: 1,
    explanationSteps: [
      "Step 1: Sort the data: 1, 3, 5, 7, 9.",
      "Step 2: With 5 values, the median is the 3rd (middle) value: 5."
    ],
    whyNot: [
      "A (3) is the second value in sorted order, not the middle.",
      "C (7) is the fourth value — the upper quartile region, not the median.",
      "D (6) is close to the mean (25/5 = 5 too here... actually mean = 5); 6 matches neither; it averages 5 and 7."
    ],
    concept: "Median = middle value of the sorted data set.",
    source: "CSCA-Prep original — CSCA Standard statistics practice",
    sourceType: "practice",
    examRelevance: 4,
    estimatedTimeSec: 60
  },
  {
    id: "MATH-ALG-043",
    subject: "Mathematics",
    chapter: "Sets & Inequalities",
    topic: "algebra",
    subtopic: "Quadratic inequalities",
    difficulty: "CSCA Standard",
    type: "mcq",
    stem: "What is the solution set of x² − 5x + 6 < 0?",
    options: ["2 < x < 3", "x < 2 or x > 3", "−3 < x < −2", "x < 3"],
    answer: 0,
    explanationSteps: [
      "Step 1: Factor: (x − 2)(x − 3) < 0 with roots 2 and 3.",
      "Step 2: Upward parabola is negative between its roots: 2 < x < 3."
    ],
    whyNot: [
      "B solves x² − 5x + 6 > 0 instead — the inequality direction is reversed.",
      "C negates both roots; test x = 0: 6 < 0 is false.",
      "D (x < 3) includes x = 0, but 0² − 0 + 6 = 6 > 0, so it fails."
    ],
    concept: "Quadratic inequality: factor, find roots, take the interval matching the sign.",
    source: "CSCA-Prep original — CSCA Standard inequalities practice",
    sourceType: "practice",
    examRelevance: 5,
    estimatedTimeSec: 70
  },
  {
    id: "MATH-CPX-044",
    subject: "Mathematics",
    chapter: "Complex Numbers",
    topic: "complex",
    subtopic: "Modulus",
    difficulty: "CSCA Standard",
    type: "mcq",
    stem: "What is the modulus |z| of z = 8 − 6i?",
    options: ["2", "6", "10", "14"],
    answer: 2,
    explanationSteps: [
      "Step 1: |z| = √(8² + (−6)²) = √(64 + 36).",
      "Step 2: √100 = 10 (a scaled 3-4-5 triangle)."
    ],
    whyNot: [
      "A (2) subtracts 8 − 6 without squaring.",
      "B (6) reports only the imaginary magnitude.",
      "D (14) adds 8 + 6 — the modulus needs squares and a root."
    ],
    concept: "Modulus = distance from origin: √(a² + b²).",
    source: "CSCA-Prep original — CSCA Standard complex practice",
    sourceType: "practice",
    examRelevance: 4,
    estimatedTimeSec: 60
  },
  // ---------------- NEW: Challenging (045-048) ----------------
  {
    id: "MATH-FUN-045",
    subject: "Mathematics",
    chapter: "Functions",
    topic: "functions",
    subtopic: "Exponential equations",
    difficulty: "Challenging",
    type: "mcq",
    stem: "Solve for x: 2ˣ + 2ˣ⁺¹ = 24.",
    options: ["2", "3", "4", "5"],
    answer: 1,
    explanationSteps: [
      "Step 1: Factor: 2ˣ(1 + 2) = 24, so 3·2ˣ = 24.",
      "Step 2: 2ˣ = 8 = 2³, so x = 3.",
      "Step 3: Check: 8 + 16 = 24. ✓"
    ],
    whyNot: [
      "A (2): 4 + 8 = 12, only half of 24.",
      "C (4): 16 + 32 = 48, double the target.",
      "D (5): 32 + 64 = 96 — it grows by 4× past the answer."
    ],
    concept: "Factor out the common exponential term before equating powers.",
    source: "CSCA-Prep original — Challenge exponentials set",
    sourceType: "original",
    examRelevance: 4,
    estimatedTimeSec: 95
  },
  {
    id: "MATH-FUN-046",
    subject: "Mathematics",
    chapter: "Functions",
    topic: "functions",
    subtopic: "Trigonometric maximum",
    difficulty: "Challenging",
    type: "mcq",
    stem: "What is the maximum value of 3 sin x + 4 cos x over all real x?",
    options: ["5", "7", "4", "3"],
    answer: 0,
    explanationSteps: [
      "Step 1: Write a sin x + b cos x = R sin(x + φ) with R = √(a² + b²).",
      "Step 2: R = √(9 + 16) = 5.",
      "Step 3: Sine peaks at 1, so the maximum is 5·1 = 5."
    ],
    whyNot: [
      "B (7) adds 3 + 4 — the peaks of sin and cos occur at different x, so they never add directly.",
      "C (4) is just the larger coefficient, ignoring the combined amplitude.",
      "D (3) is the smaller coefficient; the combination always reaches further."
    ],
    concept: "a sin x + b cos x has amplitude √(a² + b²).",
    source: "CSCA-Prep original — Challenge trigonometry set",
    sourceType: "original",
    examRelevance: 4,
    estimatedTimeSec: 100
  },
  {
    id: "MATH-GEO-047",
    subject: "Mathematics",
    chapter: "Geometry",
    topic: "geometry",
    subtopic: "Ellipse eccentricity",
    difficulty: "Challenging",
    type: "mcq",
    stem: "For the ellipse x²/16 + y²/7 = 1, what is the eccentricity?",
    options: ["3/4", "9/16", "4/3", "3/5"],
    answer: 0,
    explanationSteps: [
      "Step 1: a² = 16, b² = 7, so a = 4 and c² = a² − b² = 9, c = 3.",
      "Step 2: Eccentricity e = c/a = 3/4.",
      "Step 3: Check 0 < 3/4 < 1, valid for an ellipse. ✓"
    ],
    whyNot: [
      "B (9/16) reports (c/a)² = c²/a² instead of c/a.",
      "C (4/3) inverts to a/c, which exceeds 1 — impossible for an ellipse.",
      "D (3/5) uses c = 3 over the wrong semi-axis 5 (from x²/25 confusion)."
    ],
    concept: "Ellipse eccentricity e = c/a where c² = |a² − b²|.",
    source: "CSCA-Prep original — Challenge conic sections set",
    sourceType: "original",
    examRelevance: 4,
    estimatedTimeSec: 105
  },
  {
    id: "MATH-CAL-048",
    subject: "Mathematics",
    chapter: "Calculus",
    topic: "calculus",
    subtopic: "Limits by rationalizing",
    difficulty: "Challenging",
    type: "mcq",
    stem: "Evaluate lim (x→0) (√(x + 4) − 2)/x.",
    options: ["0", "1/4", "1/2", "Does not exist"],
    answer: 1,
    explanationSteps: [
      "Step 1: Rationalize: multiply top and bottom by (√(x + 4) + 2) to get x / [x(√(x + 4) + 2)].",
      "Step 2: Cancel x (x ≠ 0): 1/(√(x + 4) + 2).",
      "Step 3: Substitute x = 0: 1/(2 + 2) = 1/4."
    ],
    whyNot: [
      "A (0) mistakes the 0/0 form for a final answer of 0.",
      "C (1/2) substitutes into only one of the two conjugate terms.",
      "D is wrong: after canceling, the function extends continuously with value 1/4 at x = 0."
    ],
    concept: "0/0 radical limit: rationalize, cancel, then substitute.",
    source: "CSCA-Prep original — Challenge limits set",
    sourceType: "original",
    examRelevance: 4,
    estimatedTimeSec: 110
  }
];

/** Count questions per difficulty — used by practice pages and verification. */
export function countByDifficulty(): Record<Difficulty, number> {
  const counts: Record<Difficulty, number> = {
    Foundation: 0,
    Basic: 0,
    "CSCA Standard": 0,
    Challenging: 0,
    Advanced: 0
  };
  for (const q of SAMPLE_QUESTIONS) counts[q.difficulty] += 1;
  return counts;
}

export function cscaStandardQuestions(): Question[] {
  return SAMPLE_QUESTIONS.filter((q) => q.difficulty === "CSCA Standard");
}

export function questionsByTopic(topic: TopicSlug): Question[] {
  return SAMPLE_QUESTIONS.filter((q) => q.topic === topic);
}

export function isValidTopic(slug: string): slug is TopicSlug {
  return (TOPICS as { slug: string }[]).some((t) => t.slug === slug);
}
