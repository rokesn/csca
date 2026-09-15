// CSCA Mathematics syllabus — single source of truth for the Study section.
// Spec: teregttomack.txt Sec 5 (syllabus areas) + Sec 6 (5-stage topic system)
// + Sec 8/9 (difficulty levels) + Sec 11 (60-75s time target per question).
//
// NOTE: Topic taxonomy follows the currently published CSCA syllabus info.
// Validate against the official syllabus before publishing (spec Sec 5).
// Module weights/hours below follow the widely-reported third-party outline
// (not the official syllabus) — validate weights against the official syllabus
// before publishing.

export interface WorkedExample {
  /** Problem statement shown to the student. */
  problem: string;
  /** Step-by-step solution lines. */
  steps: string[];
  /** Final answer. */
  answer: string;
}

export interface TopicLesson {
  /** 1-2 sentences on why CSCA tests this topic. */
  whyItMatters: string;
  /** 4-6 detailed teaching bullets a student must memorize. */
  keyPoints: string[];
  /** 3-4 classic traps. */
  commonMistakes: string[];
  /** 1 concrete exam tactic. */
  examTip: string;
}

export interface SyllabusTopic {
  id: string;
  /** URL slug used by /study/mathematics/[topic]. */
  slug: string;
  /** Parent chapter title. */
  chapter: string;
  title: string;
  description: string;
  /** Concept + rule bullets for Stage 1 (Learn). */
  concepts: string[];
  /** Formula sheet lines for Stage 1 (Learn). */
  formulas: string[];
  /** Exam-focused teaching guide (added; does not affect study stages). */
  lesson: TopicLesson;
  /** Exactly 2 worked examples for Stage 2 (See). */
  examples: WorkedExample[];
  /** Target seconds per question (spec Sec 11: 60-75s). */
  timeTargetSec: number;
}

export interface SyllabusChapter {
  id: string;
  title: string;
  description: string;
  /** Exam module 1-4 (see MATH_MODULES). */
  module: 1 | 2 | 3 | 4;
  /** Module exam weight in percent (third-party outline; validate officially). */
  weightPct: number;
  /** Suggested study hours for this chapter. */
  hours: number;
  /** Chapter difficulty. */
  difficulty: "Easy" | "Medium" | "Hard";
  topics: SyllabusTopic[];
}

export const MATH_SYLLABUS: SyllabusChapter[] = [
  {
    id: "sets-inequalities",
    title: "Sets & Inequalities",
    description:
      "Set notation and operations, Venn diagrams, and solving linear, quadratic and absolute-value inequalities.",
    module: 1,
    weightPct: 15,
    hours: 2,
    difficulty: "Easy",
    topics: [
      {
        id: "sets",
        slug: "sets",
        chapter: "Sets & Inequalities",
        title: "Sets & Set Operations",
        description:
          "Sets, subsets, union, intersection, complement, Venn diagrams and De Morgan's laws for counting problems.",
        concepts: [
          "A set is a collection of distinct objects; x ∈ A means x is an element of A.",
          "B ⊆ A means every element of B is also in A; the empty set ∅ is a subset of every set.",
          "A ∪ B collects elements in either set; A ∩ B keeps only common elements; Aᶜ keeps everything outside A.",
          "De Morgan's laws: (A ∪ B)ᶜ = Aᶜ ∩ Bᶜ and (A ∩ B)ᶜ = Aᶜ ∪ Bᶜ.",
          "Translate word problems into Venn diagram regions before counting anything.",
        ],
        formulas: [
          "|A ∪ B| = |A| + |B| − |A ∩ B|",
          "(A ∪ B)ᶜ = Aᶜ ∩ Bᶜ",
          "(A ∩ B)ᶜ = Aᶜ ∪ Bᶜ",
          "A − B = A ∩ Bᶜ",
          "If B ⊆ A then |A − B| = |A| − |B|",
          "|A ∪ B ∪ C| = |A| + |B| + |C| − |A ∩ B| − |B ∩ C| − |A ∩ C| + |A ∩ B ∩ C|",
          "|A| + |Aᶜ| = |U|",
          "|A ∩ B| = |A| + |B| − |A ∪ B|",
        ],
        lesson: {
          whyItMatters:
            "CSCA tests sets through Venn-diagram counting problems because they check whether you can turn wordy survey statements into exact regions without double-counting.",
          keyPoints: [
            "Translate each sentence into a Venn region first: 'both' is the intersection, 'only A' is A − B, and 'neither' is the complement of the union.",
            "Inclusion–exclusion corrects double-counting: elements in both sets were counted twice, so subtract the intersection once.",
            "De Morgan's laws swap union/intersection under complement, which is how 'neither A nor B' becomes Aᶜ ∩ Bᶜ.",
            "A − B = A ∩ Bᶜ: 'A but not B' keeps the part of A outside B, the most common 'only' phrasing on the exam.",
            "For three sets, fill the diagram inside-out: triple intersection first, then pairwise-only regions, then only-regions, then the outside.",
          ],
          commonMistakes: [
            "Adding |A| + |B| without subtracting the overlap, which counts 'both' twice.",
            "Reading 'only A' as A instead of A − B, or 'neither' as an intersection instead of a complement.",
            "Applying De Morgan backwards, e.g. writing (A ∪ B)ᶜ as Aᶜ ∪ Bᶜ.",
            "Forgetting that the universal set U bounds the complement: |Aᶜ| = |U| − |A|.",
          ],
          examTip:
            "Draw the Venn diagram and label every region with its count before answering — fill center-first (both/all three) and work outward.",
        },
        examples: [
          {
            problem:
              "In a class of 40 students, 25 like math, 20 like physics, and 12 like both. How many like neither?",
            steps: [
              "Let M = math fans, P = physics fans. |M ∪ P| = 25 + 20 − 12 = 33.",
              "Neither = total − |M ∪ P| = 40 − 33 = 7.",
            ],
            answer: "7 students",
          },
          {
            problem:
              "Given U = {1, 2, …, 10}, A = {2, 4, 6, 8, 10}, B = {3, 6, 9}, find (A ∩ B)ᶜ.",
            steps: [
              "A ∩ B keeps common elements: {6}.",
              "Complement in U = every element except 6.",
            ],
            answer: "{1, 2, 3, 4, 5, 7, 8, 9, 10}",
          },
        ],
        timeTargetSec: 60,
      },
      {
        id: "inequalities",
        slug: "inequalities",
        chapter: "Sets & Inequalities",
        title: "Inequalities",
        description:
          "Solving linear, quadratic, fractional and absolute-value inequalities with sign charts and interval notation.",
        concepts: [
          "Solve f(x) > 0 / < 0 by finding zeros, then testing the sign on each interval (sign chart).",
          "For quadratics ax² + bx + c, the sign follows the leading coefficient outside the roots (a > 0: positive outside).",
          "Never multiply an inequality by an expression of unknown sign — case-split or move everything to one side.",
          "|x| < a ⇔ −a < x < a; |x| > a ⇔ x < −a or x > a (a > 0).",
          "Write final answers in interval notation, e.g. (−2, 3].",
        ],
        formulas: [
          "|x| < a ⇔ −a < x < a (a > 0)",
          "|x| > a ⇔ x < −a or x > a (a > 0)",
          "|x − c| < r ⇔ x ∈ (c − r, c + r)",
          "x² < a² ⇔ −a < x < a; x² > a² ⇔ x < −a or x > a",
          "a/b > 0 ⇔ a and b have the same sign (b ≠ 0)",
          "(x − a)(x − b) > 0 ⇔ x < min(a, b) or x > max(a, b)",
          "(x − a)(x − b) < 0 ⇔ x strictly between a and b",
          "√f(x) defined ⇔ f(x) ≥ 0; 1/g(x) defined ⇔ g(x) ≠ 0 — intersect with the solution set",
        ],
        lesson: {
          whyItMatters:
            "Inequalities appear constantly as domain restrictions, sign conditions, and range bounds, so CSCA uses them to test careful case-splitting under speed.",
          keyPoints: [
            "Standard recipe: move everything to one side, factor, find zeros (plus excluded points), then build a sign chart interval by interval.",
            "For quadratics with a > 0, the expression is positive outside the roots and negative between them; flip the picture when a < 0.",
            "Absolute values split by definition: |u| < a becomes a double inequality, while |u| > a becomes two separate rays.",
            "Fractional inequalities require a sign chart on numerator and denominator together — never cross-multiply by an expression of unknown sign.",
            "Always intersect the algebraic solution with the domain (denominators nonzero, even roots nonnegative, log arguments positive).",
          ],
          commonMistakes: [
            "Multiplying or dividing by x (or an expression) without splitting into positive/negative cases, which flips or breaks the inequality.",
            "Dropping the denominator's excluded points from the sign chart, or wrongly including them as closed dots in the answer.",
            "Writing the union of two rays as a single interval, e.g. (−∞, −2] ∪ [3, ∞) as [−2, 3].",
            "Forgetting to reverse the inequality sign when multiplying by a negative number.",
          ],
          examTip:
            "Test one number per interval on the sign chart and mark +/- above each interval — it takes 10 seconds and kills sign errors.",
        },
        examples: [
          {
            problem: "Solve x² − 5x + 6 < 0.",
            steps: [
              "Factor: (x − 2)(x − 3) < 0, zeros at x = 2 and x = 3.",
              "Leading coefficient positive, so the expression is negative between the roots.",
            ],
            answer: "(2, 3)",
          },
          {
            problem: "Solve |2x − 1| ≥ 5.",
            steps: [
              "Split: 2x − 1 ≥ 5 or 2x − 1 ≤ −5.",
              "Solve each: x ≥ 3 or x ≤ −2.",
            ],
            answer: "(−∞, −2] ∪ [3, ∞)",
          },
        ],
        timeTargetSec: 70,
      },
    ],
  },
  {
    id: "functions",
    title: "Functions",
    description:
      "Domain and range, monotonicity, parity, and the power, exponential, logarithmic and trigonometric families.",
    module: 2,
    weightPct: 35,
    hours: 10,
    difficulty: "Hard",
    topics: [
      {
        id: "domain-range",
        slug: "domain-range",
        chapter: "Functions",
        title: "Domain & Range",
        description:
          "Finding the domain (allowed inputs) and range (possible outputs) of functions, including roots and fractions.",
        concepts: [
          "Domain = all x with a defined f(x). Exclude: zeros of denominators, negatives under even roots, non-positive log arguments.",
          "Range = all possible output values; find it by solving y = f(x) for x, or by monotonicity/bounds.",
          "For √(g(x)) require g(x) ≥ 0; for 1/g(x) require g(x) ≠ 0.",
          "For log_a(g(x)) require g(x) > 0 (and a > 0, a ≠ 1).",
          "Endpoints matter: track open vs closed dots in interval answers.",
        ],
        formulas: [
          "dom(1/g) = {x | g(x) ≠ 0}",
          "dom(√g) = {x | g(x) ≥ 0}",
          "dom(log_a g) = {x | g(x) > 0}, a > 0, a ≠ 1",
          "range of ax² + bx + c (a > 0): [−Δ/4a, ∞)",
          "range of ax² + bx + c (a < 0): (−∞, −Δ/4a]",
          "Vertex of ax² + bx + c at x = −b/2a; extremal value y = f(−b/2a)",
          "dom(f + g) = dom(f) ∩ dom(g); dom(f ∘ g) requires g(x) ∈ dom(f)",
          "range of eˣ: (0, ∞); range of ln x: ℝ; range of sin x: [−1, 1]",
        ],
        lesson: {
          whyItMatters:
            "Almost every CSCA function question silently tests domain and range first, since an answer outside the allowed inputs or outputs is automatically wrong.",
          keyPoints: [
            "Scan for the three domain killers: zero denominators, negative values under even roots, and non-positive log arguments — each gives a condition to intersect.",
            "Combine conditions with intersection: every restriction must hold at once, so the domain is the overlap of all allowed sets.",
            "Find ranges by completing the square for quadratics, by monotonicity/bounds for roots, exponentials and trig, or by solving y = f(x) for x.",
            "For composite functions f(g(x)), first restrict x to dom(g), then require the output g(x) to lie in dom(f).",
            "Track open vs closed endpoints: strict inequalities (>, ≠) give round brackets, non-strict (≥, root of even multiplicity) give square brackets.",
          ],
          commonMistakes: [
            "Forgetting the denominator's x ≠ value after handling the root, e.g. reporting [2, ∞) instead of [2, 5) ∪ (5, ∞).",
            "Including the endpoint where a log argument is zero, or where a denominator vanishes.",
            "Confusing domain (allowed x) with range (possible y), especially when completing the square.",
            "Writing √(x²) = x instead of |x|, which breaks range claims for even roots.",
          ],
          examTip:
            "List each restriction on its own line (root ≥ 0; denominator ≠ 0; log > 0), solve each, then intersect — never try to hold all three in your head.",
        },
        examples: [
          {
            problem: "Find the domain of f(x) = √(x − 2) + 1/(x − 5).",
            steps: [
              "Root needs x − 2 ≥ 0, so x ≥ 2.",
              "Fraction needs x − 5 ≠ 0, so x ≠ 5.",
            ],
            answer: "[2, 5) ∪ (5, ∞)",
          },
          {
            problem: "Find the range of f(x) = x² − 4x + 1.",
            steps: [
              "Complete the square: f(x) = (x − 2)² − 3.",
              "(x − 2)² ≥ 0, so f(x) ≥ −3 with equality at x = 2.",
            ],
            answer: "[−3, ∞)",
          },
        ],
        timeTargetSec: 60,
      },
      {
        id: "monotonicity",
        slug: "monotonicity",
        chapter: "Functions",
        title: "Monotonicity",
        description:
          "Increasing/decreasing behavior, maxima and minima, and reading monotonicity from graphs and derivatives.",
        concepts: [
          "f is increasing on I if x₁ < x₂ ⇒ f(x₁) ≤ f(x₂); strictly increasing with <.",
          "A differentiable f increases where f′(x) > 0 and decreases where f′(x) < 0.",
          "Points with f′(x) = 0 are candidates for local max/min — check the sign change.",
          "Monotonic functions are injective, so they have inverses on that interval.",
          "Compare function values by monotonicity: on an increasing interval, larger input ⇒ larger output.",
        ],
        formulas: [
          "f′(x) > 0 ⇒ f strictly increasing",
          "f′(x) < 0 ⇒ f strictly decreasing",
          "Local extremum candidate: f′(x₀) = 0",
          "a > b and f increasing ⇒ f(a) > f(b)",
          "Composition of two decreasing functions is increasing",
          "Increasing + increasing = increasing; decreasing + decreasing = decreasing",
          "f increasing ⇔ f⁻¹ exists and is increasing on the range",
          "aˣ with a > 1 increasing; with 0 < a < 1 decreasing",
        ],
        lesson: {
          whyItMatters:
            "Monotonicity is CSCA's favorite comparison shortcut: it lets you order powers, exponentials and logs without a calculator and locate extrema without plotting.",
          keyPoints: [
            "Differentiable f rises exactly where f′ > 0 and falls where f′ < 0, so factor f′ and run a sign chart to get increasing/decreasing intervals.",
            "Points with f′ = 0 (or where f′ is undefined) are only candidates — confirm a max/min by a sign change of f′ across the point.",
            "On an increasing interval, inequalities are preserved (larger input gives larger output); on a decreasing interval they reverse.",
            "A strictly monotonic function is injective, hence invertible on that interval, and its inverse keeps the same monotonicity.",
            "Parity of composition: two decreasing functions compose to an increasing one, while mixed monotonicity composes to decreasing.",
          ],
          commonMistakes: [
            "Declaring a max/min from f′(x₀) = 0 alone, e.g. calling x = 0 an extremum of x³.",
            "Merging disjoint increasing intervals into one, e.g. writing 1/x as increasing on its whole domain.",
            "Forgetting that a decreasing base (0 < a < 1) reverses exponent comparisons.",
            "Mixing up non-decreasing (≤) with strictly increasing (<) at flat points.",
          ],
          examTip:
            "For compare-without-calculator items, name the base function (e.g. 2ˣ), state its direction once, then feed in the ordered inputs.",
        },
        examples: [
          {
            problem: "Find where f(x) = x³ − 3x is increasing.",
            steps: [
              "f′(x) = 3x² − 3 = 3(x − 1)(x + 1), zeros at ±1.",
              "f′ > 0 outside the roots: x < −1 or x > 1.",
            ],
            answer: "Increasing on (−∞, −1] and [1, ∞)",
          },
          {
            problem: "Compare 2^0.3 and 2^0.5 without a calculator.",
            steps: [
              "f(x) = 2ˣ is strictly increasing (base > 1).",
              "0.3 < 0.5, so f(0.3) < f(0.5).",
            ],
            answer: "2^0.3 < 2^0.5",
          },
        ],
        timeTargetSec: 70,
      },
      {
        id: "even-odd-functions",
        slug: "even-odd-functions",
        chapter: "Functions",
        title: "Even & Odd Functions",
        description:
          "Parity tests, symmetry of graphs, and shortcuts for values and integrals of even/odd functions.",
        concepts: [
          "Even: f(−x) = f(x) for all x — graph symmetric about the y-axis.",
          "Odd: f(−x) = −f(x) for all x — graph symmetric about the origin; odd functions through 0 satisfy f(0) = 0.",
          "Test parity by computing f(−x) and comparing with f(x) and −f(x).",
          "Even ± even = even; odd ± odd = odd; even × odd = odd; odd × odd = even.",
          "Many functions are neither even nor odd — always test, never guess.",
        ],
        formulas: [
          "Even: f(−x) = f(x)",
          "Odd: f(−x) = −f(x)",
          "∫₋ₐᵃ even f = 2∫₀ᵃ f; ∫₋ₐᵃ odd f = 0",
          "xⁿ is even if n even, odd if n odd",
          "cos is even; sin and tan are odd",
          "Even ± even = even; odd ± odd = odd; even × odd = odd; odd × odd = even",
          "Odd f defined at 0 ⇒ f(0) = 0",
          "Parity needs a symmetric domain: f(−x) must exist whenever f(x) does",
        ],
        lesson: {
          whyItMatters:
            "Parity questions are cheap CSCA points: one substitution f(−x) halves graph work, predicts symmetric values, and zeroes symmetric integrals.",
          keyPoints: [
            "Test parity by computing f(−x) and simplifying fully, then compare against f(x) for even and −f(x) for odd before concluding.",
            "Even graphs mirror across the y-axis while odd graphs rotate 180° about the origin, so one side determines the other.",
            "Parity arithmetic is fixed: sums keep parity of like terms, while products follow sign-like rules (odd × odd = even).",
            "An odd function defined at x = 0 must pass through the origin since f(0) = −f(0).",
            "Parity requires a symmetric domain first — a function defined only for x ≥ 0 is neither even nor odd.",
          ],
          commonMistakes: [
            "Guessing from a single term, e.g. calling x³ + 1 odd because of x³ while ignoring the constant.",
            "Stopping the f(−x) simplification one step early and missing that it equals ±f(x).",
            "Claiming f(0) = 0 for every odd-looking function even when 0 is outside its domain.",
            "Forgetting that most functions are neither — parity must be tested, not assumed.",
          ],
          examTip:
            "Always compute f(−x) explicitly on scrap paper and line it up under f(x) and −f(x); the match (or neither) is visible in seconds.",
        },
        examples: [
          {
            problem: "Determine the parity of f(x) = x³ − x.",
            steps: [
              "f(−x) = (−x)³ − (−x) = −x³ + x = −(x³ − x).",
              "f(−x) = −f(x), so f is odd.",
            ],
            answer: "Odd function",
          },
          {
            problem: "f is odd and f(2) = 7. What is f(−2)?",
            steps: [
              "Odd ⇒ f(−2) = −f(2).",
              "−f(2) = −7.",
            ],
            answer: "−7",
          },
        ],
        timeTargetSec: 60,
      },
      {
        id: "power-functions",
        slug: "power-functions",
        chapter: "Functions",
        title: "Power Functions",
        description:
          "Functions xⁿ for integer, rational and real exponents: graphs, parity, growth, and exponent rules.",
        concepts: [
          "xⁿ with even n behaves like a parabola (min at 0); with odd n behaves like a cubic (through origin).",
          "x^(1/n) is the inverse on the right domain: √(x²) = |x|, not x.",
          "Negative exponents flip: x⁻ⁿ = 1/xⁿ (x ≠ 0).",
          "Compare powers with the same exponent by base, or the same base by exponent (watch monotonicity direction).",
          "Growth race for large x: exponential > power > logarithm.",
        ],
        formulas: [
          "xᵃ · xᵇ = xᵃ⁺ᵇ; (xᵃ)ᵇ = xᵃᵇ",
          "x⁻ⁿ = 1/xⁿ; x^(m/n) = ⁿ√(xᵐ)",
          "√(x²) = |x|",
          "(xy)ⁿ = xⁿyⁿ",
          "For x > 1, larger exponent ⇒ larger value",
          "For 0 < x < 1, larger exponent ⇒ smaller value",
          "(x/y)ⁿ = xⁿ/yⁿ (y ≠ 0); x^(1/2) = √x (x ≥ 0)",
          "Large-x growth: exponential > power > logarithm",
        ],
        lesson: {
          whyItMatters:
            "Power rules underpin half of CSCA algebra: simplifying radicals, comparing magnitudes, and ranking growth all reduce to exponent manipulation.",
          keyPoints: [
            "Unify bases before operating: convert radicals to fractional exponents and decimals to fractions so the laws apply directly.",
            "Even roots and even powers erase sign, so √(x²) = |x| and x^(2k) ≥ 0 — restore the absolute value or ± whenever you invert them.",
            "Negative exponents mean reciprocal, and fractional exponents mean root-of-power; handle the sign/domain before moving terms.",
            "Comparison direction depends on the base: for x > 1 bigger exponent wins, but for 0 < x < 1 the order reverses.",
            "Memorize the growth hierarchy (exponential beats any power, any power beats log) to settle limit and ordering questions instantly.",
          ],
          commonMistakes: [
            "Writing √(x²) = x and losing the negative branch, or dropping |·| after an even root.",
            "Adding exponents across different bases, e.g. x² · y³ = (xy)⁵.",
            "Distributing powers over sums: (x + y)ⁿ ≠ xⁿ + yⁿ.",
            "Forgetting that a negative base to a fractional power may be undefined in ℝ.",
          ],
          examTip:
            "Rewrite everything with prime bases and fractional exponents first (e.g. 8 = 2³) — the simplification then becomes pure exponent arithmetic.",
        },
        examples: [
          {
            problem: "Simplify (8x⁶)^(1/3).",
            steps: [
              "Split: 8^(1/3) · (x⁶)^(1/3) = 2 · x².",
            ],
            answer: "2x²",
          },
          {
            problem: "Compare (1/2)^3 and (1/2)^5.",
            steps: [
              "Base 1/2 is in (0, 1), so the exponential is decreasing.",
              "3 < 5 ⇒ (1/2)^3 > (1/2)^5.",
            ],
            answer: "(1/2)^3 > (1/2)^5",
          },
        ],
        timeTargetSec: 70,
      },
      {
        id: "exponential-functions",
        slug: "exponential-functions",
        chapter: "Functions",
        title: "Exponential Functions",
        description:
          "aˣ graphs and properties, the number e, and solving exponential equations by equalizing bases.",
        concepts: [
          "f(x) = aˣ (a > 0, a ≠ 1): domain ℝ, range (0, ∞), always positive, passes through (0, 1).",
          "a > 1 ⇒ increasing; 0 < a < 1 ⇒ decreasing.",
          "Solve a^f(x) = a^g(x) by setting f(x) = g(x) (same base).",
          "For different bases, take logs of both sides.",
          "e ≈ 2.718; eˣ is its own derivative — the Calculus bridge.",
        ],
        formulas: [
          "aˣ · aʸ = aˣ⁺ʸ; aˣ/aʸ = aˣ⁻ʸ",
          "(aˣ)ʸ = aˣʸ",
          "a^0 = 1; a⁻ˣ = 1/aˣ",
          "a^f = a^g ⇔ f = g (a > 0, a ≠ 1)",
          "e ≈ 2.718; lim(n→∞)(1 + 1/n)ⁿ = e",
          "(ab)ˣ = aˣbˣ; aˣ > 0 for all real x",
          "a > 1 ⇒ aˣ increasing; 0 < a < 1 ⇒ aˣ decreasing",
          "aˣ = b ⇔ x = log_a b (b > 0)",
        ],
        lesson: {
          whyItMatters:
            "Exponential equations are CSCA staples because they fuse exponent laws with log inversion, and eˣ previews the derivative rules tested in Calculus.",
          keyPoints: [
            "First try to write both sides as powers of one base; equal bases with a valid a > 0, a ≠ 1 let you equate exponents directly.",
            "When bases cannot be unified, take logs (ln or log) of both sides and pull the exponent down with the power law.",
            "Memorize the shape: aˣ always positive, through (0, 1), increasing for a > 1 and decreasing for 0 < a < 1.",
            "e ≈ 2.718 is the natural base: eˣ is its own derivative, and (1 + 1/n)ⁿ → e links sequences to exponentials.",
            "Reject no roots for sign reasons alone — aˣ = negative has no real solution — but check log steps for domain slips.",
          ],
          commonMistakes: [
            "Equating exponents when the bases differ, e.g. concluding x = 2 from 2ˣ = 3².",
            "Splitting exponentials over sums: a^(x+y) ≠ aˣ + aʸ (it equals aˣ · aʸ).",
            "Forgetting aˣ > 0 always, then 'solving' aˣ = −3 as if a real x existed.",
            "Allowing base a ≤ 0 or a = 1 in the equal-base step, where the equivalence fails.",
          ],
          examTip:
            "Always attempt the same-base rewrite before reaching for logs — spotting 16 = 2⁴ or 1/9 = 3⁻² solves the item in one line.",
        },
        examples: [
          {
            problem: "Solve 2^(x+1) = 16.",
            steps: [
              "Write 16 as a power of 2: 16 = 2⁴.",
              "Equal bases ⇒ x + 1 = 4.",
            ],
            answer: "x = 3",
          },
          {
            problem: "Solve 3ˣ = 5 (give the exact form).",
            steps: [
              "Bases differ, so take logs: x · ln 3 = ln 5.",
              "Divide: x = ln 5 / ln 3.",
            ],
            answer: "x = log₃5",
          },
        ],
        timeTargetSec: 70,
      },
      {
        id: "logarithmic-functions",
        slug: "logarithmic-functions",
        chapter: "Functions",
        title: "Logarithmic Functions",
        description:
          "log_a(x) as the inverse of aˣ, log laws, change of base, and solving logarithmic equations with domain checks.",
        concepts: [
          "log_a(x) = y ⇔ aʸ = x; domain (0, ∞), range ℝ, passes through (1, 0).",
          "Log of a product/sum rules: log(xy) = log x + log y; log(xⁿ) = n log x.",
          "Change of base: log_a(x) = ln x / ln a.",
          "After solving a log equation, reject any root that makes an argument ≤ 0.",
          "ln x and eˣ are inverses: e^(ln x) = x (x > 0), ln(eˣ) = x.",
        ],
        formulas: [
          "log_a(xy) = log_a x + log_a y",
          "log_a(x/y) = log_a x − log_a y",
          "log_a(xⁿ) = n · log_a x",
          "log_a x = ln x / ln a",
          "a^(log_a x) = x (x > 0)",
          "log_a a = 1; log_a 1 = 0; ln e = 1",
          "log_a x + log_a y = log_a(xy) — condense before solving",
          "log_a b = 1 / log_b a (a, b > 0, ≠ 1)",
        ],
        lesson: {
          whyItMatters:
            "Logarithms invert the exponentials CSCA loves, so log laws plus the mandatory domain check decide many equation and comparison items.",
          keyPoints: [
            "Read log_a(x) as 'the exponent on a giving x': log_a(x) = y ⇔ aʸ = x, with domain x > 0 and base a > 0, a ≠ 1.",
            "Expand products into sums and condense sums into single logs deliberately — condensing usually exposes the substitution that solves the equation.",
            "Change of base (ln x / ln a) unifies mixed bases so terms can be combined or compared.",
            "Every candidate root must make each original log argument strictly positive; extraneous roots come from arguments ≤ 0.",
            "ln x and eˣ are inverses: e^(ln x) = x for x > 0 and ln(eˣ) = x for all real x.",
          ],
          commonMistakes: [
            "Keeping a root that makes a log argument zero or negative — always substitute back into the original arguments.",
            "Splitting log(x + y) as log x + log y, or log(x − y) as a difference.",
            "Applying log laws to different bases without converting bases first.",
            "Forgetting the base conditions a > 0, a ≠ 1 when equating log arguments.",
          ],
          examTip:
            "Condense to one log per side (single log = single argument), then drop the logs by equating arguments — and check each candidate in the original line.",
        },
        examples: [
          {
            problem: "Compute log₂32 + log₂(1/4).",
            steps: [
              "Combine: log₂(32 · 1/4) = log₂8.",
              "2³ = 8, so log₂8 = 3.",
            ],
            answer: "3",
          },
          {
            problem: "Solve log₃(x + 2) = 2.",
            steps: [
              "Rewrite: x + 2 = 3² = 9, so x = 7.",
              "Check: argument 7 + 2 = 9 > 0, valid.",
            ],
            answer: "x = 7",
          },
        ],
        timeTargetSec: 70,
      },
      {
        id: "trigonometric-functions",
        slug: "trigonometric-functions",
        chapter: "Functions",
        title: "Trigonometric Functions",
        description:
          "sin, cos, tan on the unit circle, key identities, graphs, period/amplitude, and solving basic trig equations.",
        concepts: [
          "On the unit circle: cos θ = x-coordinate, sin θ = y-coordinate, tan θ = sin θ / cos θ.",
          "Core identity: sin²θ + cos²θ = 1 — derive most simplifications from it.",
          "Periods: sin/cos 2π, tan π; amplitude |A| and period 2π/|B| for A·sin(Bx).",
          "Special angles 0, π/6, π/4, π/3, π/2 and their sin/cos values must be instant recall.",
          "Trig equations give families of solutions: add 2πk (sin/cos) or πk (tan).",
        ],
        formulas: [
          "sin²θ + cos²θ = 1",
          "sin(A ± B) = sin A cos B ± cos A sin B",
          "cos(A ± B) = cos A cos B ∓ sin A sin B",
          "sin 2θ = 2 sin θ cos θ; cos 2θ = cos²θ − sin²θ",
          "tan θ = sin θ / cos θ",
          "1 + tan²θ = sec²θ; 1 + cot²θ = csc²θ",
          "cos 2θ = 2cos²θ − 1 = 1 − 2sin²θ; tan 2θ = 2tan θ/(1 − tan²θ)",
          "sin(−θ) = −sin θ; cos(−θ) = cos θ; tan(−θ) = −tan θ",
          "Periods: sin/cos 2π, tan π; A·sin(Bx): amplitude |A|, period 2π/|B|",
          "Special values: sin/cos of 0, π/6, π/4, π/3, π/2 — instant recall",
        ],
        lesson: {
          whyItMatters:
            "Trigonometry is CSCA's heaviest identity workout: unit-circle signs, double-angle rewrites, and multi-solution equations recur across Functions and Calculus.",
          keyPoints: [
            "Anchor everything to the unit circle: cos θ and sin θ are the x- and y-coordinates, and the quadrant fixes every sign.",
            "Derive from sin²θ + cos²θ = 1 by dividing: 1 + tan²θ = sec²θ and 1 + cot²θ = csc²θ cover the secant/cosecant cases.",
            "Memorize angle-sum and double-angle forms plus the two alternate cos 2θ versions, which convert between powers and multiples.",
            "For A·sin(Bx + φ), read amplitude |A|, period 2π/|B|, and phase shift from the inside-zero Bx + φ = 0.",
            "Trig equations give families: add 2πk for sin/cos (two branches per period) or πk for tan, then cut to the required interval.",
          ],
          commonMistakes: [
            "Dropping the ± when square-rooting sin² + cos² = 1 instead of fixing the sign by quadrant.",
            "Reporting only the reference-angle solution and missing the second branch (e.g. only π/6, not 5π/6).",
            "Mixing up sum formulas, especially the sign flip in cos(A ± B).",
            "Using degrees and radians interchangeably, or misreading period as 2π for tan.",
          ],
          examTip:
            "Write the reference angle plus the two quadrant branches first, then add 2πk (πk for tan) and filter to the interval — never solve inside the interval directly.",
        },
        examples: [
          {
            problem: "Given sin θ = 3/5 with θ in quadrant II, find cos θ.",
            steps: [
              "cos²θ = 1 − 9/25 = 16/25.",
              "Quadrant II ⇒ cos θ < 0, so cos θ = −4/5.",
            ],
            answer: "−4/5",
          },
          {
            problem: "Solve sin x = 1/2 for x ∈ [0, 2π).",
            steps: [
              "Reference angle π/6; sine positive in quadrants I and II.",
              "x = π/6 or x = π − π/6 = 5π/6.",
            ],
            answer: "x = π/6 or 5π/6",
          },
        ],
        timeTargetSec: 75,
      },
    ],
  },
  {
    id: "sequences",
    title: "Sequences",
    description:
      "Arithmetic and geometric sequences and series: general terms, sums, and applied growth problems.",
    module: 2,
    weightPct: 35,
    hours: 4,
    difficulty: "Hard",
    topics: [
      {
        id: "arithmetic-sequences",
        slug: "arithmetic-sequences",
        chapter: "Sequences",
        title: "Arithmetic Sequences",
        description:
          "Constant-difference sequences: general term, sum of the first n terms, and finding terms from partial sums.",
        concepts: [
          "Arithmetic ⇔ constant difference d = aₙ₊₁ − aₙ.",
          "General term: aₙ = a₁ + (n − 1)d.",
          "Sum: Sₙ = n(a₁ + aₙ)/2 = n(2a₁ + (n − 1)d)/2 — pair first and last terms.",
          "aₙ = Sₙ − Sₙ₋₁ recovers terms from partial sums.",
          "Three numbers in arithmetic progression: write them as a − d, a, a + d.",
        ],
        formulas: [
          "aₙ = a₁ + (n − 1)d",
          "Sₙ = n(a₁ + aₙ)/2",
          "Sₙ = n(2a₁ + (n − 1)d)/2",
          "aₙ = Sₙ − Sₙ₋₁ (n ≥ 2)",
          "a, b, c in A.P. ⇔ 2b = a + c",
          "d = aₙ − aₙ₋₁; aₖ = aₘ + (k − m)d",
          "1 + 2 + … + n = n(n + 1)/2",
          "Sₙ is quadratic in n (no constant term); aₙ is linear in n",
        ],
        lesson: {
          whyItMatters:
            "Arithmetic sequences test whether you can move fluently between a term, the difference, and the paired sum — the template for all CSCA series word problems.",
          keyPoints: [
            "Diagnose arithmetic by a constant first difference d = aₙ₊₁ − aₙ; the general term is then linear: aₙ = a₁ + (n − 1)d.",
            "Both sum forms pair first with last: Sₙ = n(a₁ + aₙ)/2 counts n pairs averaging to the midpoint.",
            "Recover hidden terms from partial sums with aₙ = Sₙ − Sₙ₋₁, and a₁ = S₁ directly.",
            "Three-term arithmetic conditions collapse to 2b = a + c, and symmetric triples are best written a − d, a, a + d.",
            "Sₙ as a function of n is quadratic with zero constant term, so a quadratic-with-constant partial sum signals non-arithmetic from n = 1.",
          ],
          commonMistakes: [
            "Off-by-one indexing: using n instead of n − 1 in a₁ + (n−1)d, especially for 'the 10th term'.",
            "Applying aₙ = Sₙ − Sₙ₋₁ at n = 1, where S₀ does not exist (use a₁ = S₁).",
            "Assuming any quadratic Sₙ means arithmetic — the constant term must be zero.",
            "Mixing up aₙ (one term) with Sₙ (sum of n terms) in word problems.",
          ],
          examTip:
            "Write down a₁, d, n explicitly before touching a formula — half of arithmetic errors are plugging the wrong n.",
        },
        examples: [
          {
            problem: "The 1st term is 3 and the common difference is 4. Find the 10th term.",
            steps: ["a₁₀ = 3 + (10 − 1) · 4 = 3 + 36."],
            answer: "39",
          },
          {
            problem: "Find the sum 1 + 2 + … + 100.",
            steps: [
              "Arithmetic with a₁ = 1, a₁₀₀ = 100, n = 100.",
              "S = 100 · (1 + 100)/2 = 50 · 101.",
            ],
            answer: "5050",
          },
        ],
        timeTargetSec: 70,
      },
      {
        id: "geometric-sequences",
        slug: "geometric-sequences",
        chapter: "Sequences",
        title: "Geometric Sequences",
        description:
          "Constant-ratio sequences: general term, finite and infinite sums, and compound-growth applications.",
        concepts: [
          "Geometric ⇔ constant ratio q = aₙ₊₁/aₙ (nonzero terms).",
          "General term: aₙ = a₁ · qⁿ⁻¹.",
          "Finite sum (q ≠ 1): Sₙ = a₁(1 − qⁿ)/(1 − q).",
          "Infinite sum exists only for |q| < 1: S = a₁/(1 − q).",
          "Growth/decay, interest and half-life problems are geometric sequences in disguise.",
        ],
        formulas: [
          "aₙ = a₁ · qⁿ⁻¹",
          "Sₙ = a₁(1 − qⁿ)/(1 − q), q ≠ 1",
          "S = a₁/(1 − q), |q| < 1",
          "a, b, c in G.P. ⇔ b² = ac",
          "Compound growth: A = P(1 + r)ⁿ",
          "q = aₙ/aₙ₋₁; aₖ = aₘ · q^(k−m)",
          "Sₙ = a₁(qⁿ − 1)/(q − 1), q ≠ 1 (equivalent form)",
          "|q| ≥ 1 ⇒ infinite series diverges (no finite sum)",
        ],
        lesson: {
          whyItMatters:
            "Geometric sequences model every CSCA growth story — compound interest, decay, half-life — and the infinite-sum convergence test is a classic trap item.",
          keyPoints: [
            "Diagnose geometric by a constant ratio q = aₙ₊₁/aₙ with nonzero terms; the general term is exponential in n: aₙ = a₁qⁿ⁻¹.",
            "Finite sums multiply out the (1 − q) factor: Sₙ = a₁(1 − qⁿ)/(1 − q) for q ≠ 1, and Sₙ = na₁ when q = 1.",
            "The infinite sum S = a₁/(1 − q) exists if and only if |q| < 1; verify the ratio bound before using it.",
            "Three-term geometric conditions collapse to b² = ac (same sign required for real progressions).",
            "Translate growth/decay language directly: 'r% per period' means q = 1 ± r, and repeated multiplication is a geometric sequence.",
          ],
          commonMistakes: [
            "Using the infinite-sum formula when |q| ≥ 1, where the series diverges.",
            "Off-by-one exponents: writing aₙ = a₁qⁿ instead of a₁qⁿ⁻¹.",
            "Dividing by (1 − q) without handling q = 1 as the separate Sₙ = na₁ case.",
            "Confusing arithmetic difference with geometric ratio in mixed word problems.",
          ],
          examTip:
            "Check |q| < 1 first on any 'infinite sum' item — if it fails, the answer is 'diverges', no computation needed.",
        },
        examples: [
          {
            problem: "Find the 6th term of 2, 6, 18, ….",
            steps: [
              "Ratio q = 6/2 = 3, a₁ = 2.",
              "a₆ = 2 · 3⁵ = 2 · 243.",
            ],
            answer: "486",
          },
          {
            problem: "Find 1 + 1/2 + 1/4 + … (infinite sum).",
            steps: [
              "Geometric with a₁ = 1, q = 1/2, |q| < 1.",
              "S = 1/(1 − 1/2) = 2.",
            ],
            answer: "2",
          },
        ],
        timeTargetSec: 70,
      },
    ],
  },
  {
    id: "calculus",
    title: "Calculus",
    description:
      "Limits, derivative rules, and basic applications: tangents, monotonicity, extrema and simple optimization.",
    module: 2,
    weightPct: 35,
    hours: 6,
    difficulty: "Hard",
    topics: [
      {
        id: "limits",
        slug: "limits",
        chapter: "Calculus",
        title: "Limits",
        description:
          "Intuitive limits, 0/0 forms by factoring and rationalizing, and the two classic special limits.",
        concepts: [
          "lim(x→c) f(x) is the value f approaches — it need not equal f(c).",
          "0/0 form: factor and cancel, or rationalize roots, then substitute.",
          "One-sided limits must agree for the two-sided limit to exist.",
          "Memorize: lim(x→0) sin x / x = 1 and lim(n→∞)(1 + 1/n)ⁿ = e.",
          "Limits justify continuity checks and the definition of the derivative.",
        ],
        formulas: [
          "lim(x→0) sin x / x = 1",
          "lim(n→∞)(1 + 1/n)ⁿ = e",
          "lim(x→c)(f ± g) = lim f ± lim g",
          "lim(x→c)(f · g) = lim f · lim g",
          "0/0: factor-cancel or rationalize first",
          "lim(x→0)(1 − cos x)/x = 0; lim(x→0)(eˣ − 1)/x = 1",
          "Two-sided limit exists ⇔ left and right limits agree",
          "Continuous at c ⇔ lim(x→c) f(x) = f(c)",
        ],
        lesson: {
          whyItMatters:
            "Limits gatekeep CSCA calculus: every derivative, continuity check, and asymptote question starts by resolving a 0/0 form or a one-sided mismatch.",
          keyPoints: [
            "Try direct substitution first; only the indeterminate forms (0/0, ∞/∞) need algebra, while the rest evaluate immediately.",
            "For 0/0 with polynomials, factor and cancel the common zero factor; with roots, rationalize by the conjugate, then substitute.",
            "Scale to the memorized specials: sin u/u → 1 and (1 − cos u)/u → 0 require the inside argument u → 0.",
            "A two-sided limit exists only if both one-sided limits exist and agree — piecewise joints and absolute values need both sides checked.",
            "Continuity at c means three things coincide: f(c) defined, the limit exists, and the limit equals f(c).",
          ],
          commonMistakes: [
            "Cancelling (x − 2) while forgetting x ≠ 2 matters only for the function value, not the limit — then refusing to substitute.",
            "Applying lim sin x/x = 1 when the argument does not tend to 0, e.g. sin 3x/x without rescaling to 3·sin(3x)/(3x).",
            "Checking only one side at a piecewise joint or cusp and declaring the limit exists.",
            "Concluding a limit equals f(c) for a discontinuous function without verifying continuity.",
          ],
          examTip:
            "On sight of 0/0, decide factor vs rationalize in two seconds (polynomial → factor; square-root difference → conjugate), then execute — don't stare.",
        },
        examples: [
          {
            problem: "Compute lim(x→2) (x² − 4)/(x − 2).",
            steps: [
              "Direct substitution gives 0/0 — factor: (x − 2)(x + 2)/(x − 2).",
              "Cancel (x ≠ 2 near the limit): limit = 2 + 2.",
            ],
            answer: "4",
          },
          {
            problem: "Compute lim(x→0) sin 3x / x.",
            steps: [
              "Rewrite: 3 · (sin 3x)/(3x).",
              "As x → 0, sin 3x/(3x) → 1, so the limit is 3.",
            ],
            answer: "3",
          },
        ],
        timeTargetSec: 75,
      },
      {
        id: "derivatives",
        slug: "derivatives",
        chapter: "Calculus",
        title: "Derivatives",
        description:
          "Derivative meaning (slope + rate of change), power/product/quotient/chain rules, and derivatives of key functions.",
        concepts: [
          "f′(x) = instantaneous rate of change = slope of the tangent line.",
          "Power rule: (xⁿ)′ = n·xⁿ⁻¹ — handle every polynomial term with it.",
          "Product rule: (uv)′ = u′v + uv′; quotient rule: (u/v)′ = (u′v − uv′)/v².",
          "Chain rule: differentiate outside, multiply by the derivative of the inside.",
          "Derivatives of eˣ, ln x, sin x, cos x must be automatic.",
        ],
        formulas: [
          "(xⁿ)′ = n·xⁿ⁻¹",
          "(uv)′ = u′v + uv′",
          "(u/v)′ = (u′v − uv′)/v²",
          "[f(g(x))]′ = f′(g(x)) · g′(x)",
          "(eˣ)′ = eˣ; (ln x)′ = 1/x; (sin x)′ = cos x; (cos x)′ = −sin x",
          "(c)′ = 0; (cu)′ = cu′; (u ± v)′ = u′ ± v′",
          "(tan x)′ = sec²x; (aˣ)′ = aˣ ln a; (log_a x)′ = 1/(x ln a)",
          "f′(a) = lim(h→0)(f(a+h) − f(a))/h — slope of tangent at a",
        ],
        lesson: {
          whyItMatters:
            "Derivative rules are CSCA's calculus engine: tangents, monotonicity, and every optimization item reduce to differentiating correctly and fast.",
          keyPoints: [
            "Classify the structure before differentiating: single power → power rule, product → product rule, quotient → quotient rule, nested → chain rule.",
            "Chain rule multiplies rates layer by layer: derivative of the outside at the inside, times the derivative of the inside — repeat for triple nesting.",
            "Memorize the transcendental five: eˣ reproduces, ln x gives 1/x, sin ↔ cos with the minus on (cos)′, plus aˣ ln a and tan → sec².",
            "Simplify first (expand products, split quotients, convert roots to fractional powers) so the power rule handles more terms directly.",
            "Read f′(a) geometrically as the tangent slope at a and physically as the instantaneous rate of change of f at a.",
          ],
          commonMistakes: [
            "Dropping the inner derivative in the chain rule, e.g. writing (sin(x²))′ = cos(x²).",
            "Swapping quotient-rule order to (uv′ − u′v)/v² or forgetting to square the denominator.",
            "Writing (ln x)′ = 1/x without restricting x > 0, or (xⁿ)′ = nxⁿ without lowering the exponent.",
            "Applying product/quotient rules to compositions (or vice versa) instead of naming the outer structure first.",
          ],
          examTip:
            "Circle the outer function and box the inner one before writing anything — visible nesting makes the missing ×g′(x) factor almost impossible to drop.",
        },
        examples: [
          {
            problem: "Differentiate f(x) = x³·eˣ.",
            steps: [
              "Product rule: f′ = 3x²·eˣ + x³·eˣ.",
              "Factor: x²eˣ(x + 3).",
            ],
            answer: "f′(x) = x²eˣ(x + 3)",
          },
          {
            problem: "Differentiate f(x) = sin(x²).",
            steps: [
              "Chain rule: outside sin → cos(x²).",
              "Multiply by inside derivative 2x.",
            ],
            answer: "f′(x) = 2x·cos(x²)",
          },
        ],
        timeTargetSec: 70,
      },
      {
        id: "calculus-applications",
        slug: "calculus-applications",
        chapter: "Calculus",
        title: "Basic Applications",
        description:
          "Tangent lines, increasing/decreasing intervals, local extrema, and one-variable optimization word problems.",
        concepts: [
          "Tangent at x₀: y = f(x₀) + f′(x₀)(x − x₀).",
          "f′ > 0 ⇒ increasing; f′ < 0 ⇒ decreasing; sign change of f′ locates max/min.",
          "Closed-interval max/min: compare f at critical points AND endpoints.",
          "Optimization recipe: one variable → differentiate → critical points → verify → answer with units.",
          "Watch domain restrictions from the word problem (lengths > 0).",
        ],
        formulas: [
          "Tangent: y = f(x₀) + f′(x₀)(x − x₀)",
          "Critical points: f′(x) = 0 or undefined",
          "Max on [a, b]: max{f(a), f(b), f(critical)}",
          "f′: − → + ⇒ local min; + → − ⇒ local max",
          "Second-derivative check: f′′(x₀) > 0 ⇒ local min",
          "f′ > 0 increasing; f′ < 0 decreasing — sign chart decides",
          "Optimization: single-variable f → f′ = 0 → verify → check endpoints/domain",
          "Second-derivative check: f′′(x₀) < 0 ⇒ local max; = 0 inconclusive",
        ],
        lesson: {
          whyItMatters:
            "Application items convert CSCA calculus into points: tangent lines, max/min classification, and one-variable optimization follow one repeatable recipe.",
          keyPoints: [
            "Tangent lines need exactly two numbers: the point value f(x₀) and the slope f′(x₀), assembled as y = f(x₀) + f′(x₀)(x − x₀).",
            "Collect all critical points (f′ = 0 or undefined but f defined), then run a sign chart: − → + is a min, + → − is a max, no change is neither.",
            "On a closed interval, the global max/min is the largest/smallest among f at the endpoints and at interior critical points — never skip endpoints.",
            "Optimization word problems reduce to one variable via the constraint (e.g. perimeter), then differentiate, solve f′ = 0, and verify with sign or f′′.",
            "Respect the word-problem domain (lengths, counts positive): a critical point outside the feasible interval is discarded.",
          ],
          commonMistakes: [
            "Reporting a local extremum as the global one without evaluating endpoints on [a, b].",
            "Treating f′(x₀) = 0 as sufficient (x³ at 0) without a sign or second-derivative check.",
            "Optimizing a two-variable expression without substituting the constraint first.",
            "Giving the extremal x-value when the question asks for the maximum value f(x) (or vice versa).",
          ],
          examTip:
            "Finish every max/min item with the endpoint-and-critical table {a, criticals, b} → f-values; the largest/smallest row is the answer, no judgment calls.",
        },
        examples: [
          {
            problem: "Find the tangent to f(x) = x² at x = 3.",
            steps: [
              "f(3) = 9, f′(x) = 2x so f′(3) = 6.",
              "y = 9 + 6(x − 3) = 6x − 9.",
            ],
            answer: "y = 6x − 9",
          },
          {
            problem: "Find the local extrema of f(x) = x³ − 3x.",
            steps: [
              "f′(x) = 3x² − 3 = 0 ⇒ x = ±1.",
              "f′ changes + → − at x = −1 (max, f = 2) and − → + at x = 1 (min, f = −2).",
            ],
            answer: "Local max 2 at x = −1; local min −2 at x = 1",
          },
        ],
        timeTargetSec: 75,
      },
    ],
  },
  {
    id: "geometry",
    title: "Geometry",
    description:
      "Coordinate geometry: lines, circles, and the conic sections — ellipses, hyperbolas and parabolas.",
    module: 3,
    weightPct: 30,
    hours: 9,
    difficulty: "Hard",
    topics: [
      {
        id: "analytic-geometry",
        slug: "analytic-geometry",
        chapter: "Geometry",
        title: "Analytic Geometry Basics",
        description:
          "Coordinates, distance, midpoint, slope, and translating between geometric conditions and equations.",
        concepts: [
          "Every geometric condition (equal distances, right angles) becomes an equation — write it down first.",
          "Distance: d = √((x₂−x₁)² + (y₂−y₁)²); midpoint averages the coordinates.",
          "Slope m = (y₂−y₁)/(x₂−x₁); perpendicular slopes multiply to −1.",
          "Symmetry tricks (origin, axes) halve the algebra — look for them before expanding.",
          "Sketch the figure: most analytic-geometry errors are sign errors a sketch would catch.",
        ],
        formulas: [
          "d = √((x₂−x₁)² + (y₂−y₁)²)",
          "Midpoint: ((x₁+x₂)/2, (y₁+y₂)/2)",
          "Slope: m = (y₂−y₁)/(x₂−x₁)",
          "m₁·m₂ = −1 ⇔ perpendicular (non-vertical)",
          "Point-to-origin: d = √(x² + y²)",
          "Section formula: internal division (λ:μ) → ((μx₁ + λx₂)/(λ+μ), (μy₁ + λy₂)/(λ+μ))",
          "Centroid of triangle: ((x₁+x₂+x₃)/3, (y₁+y₂)/3)",
          "Area via coordinates (shoelace) for polygon vertices in order",
        ],
        lesson: {
          whyItMatters:
            "Analytic geometry turns CSCA figures into algebra: once a geometric condition becomes a distance, slope, or midpoint equation, the problem is routine computation.",
          keyPoints: [
            "Convert each geometric phrase immediately: 'equidistant' → equal distances, 'right angle' → slopes multiply to −1, 'midpoint' → coordinate averages.",
            "Distance comes from Pythagoras on coordinate differences; the midpoint averages them — both extend component-wise to 3D.",
            "Undefined slope means a vertical line x = c: handle it as a separate case before using slope formulas.",
            "Exploit symmetry (origin, axes, isosceles setups) by placing the figure cleverly — e.g. midpoint at origin — to halve the algebra.",
            "Sketch from the coordinates first: a rough plot exposes sign errors and picks the right branch (which intersection, which root).",
          ],
          commonMistakes: [
            "Squaring carelessly in the distance formula, e.g. (x₂ − x₁²) instead of (x₂ − x₁)².",
            "Dividing by zero slope-difference for vertical lines instead of treating x = c separately.",
            "Mixing up midpoint (average) with distance (root of squares) under time pressure.",
            "Trusting unsimplified algebra over the sketch and reporting a point in the wrong quadrant.",
          ],
          examTip:
            "Write the geometric condition as an equation in the first 15 seconds ('PA = PB', 'm₁m₂ = −1') — the rest is just solving what you wrote.",
        },
        examples: [
          {
            problem: "Find the distance between A(1, 2) and B(4, 6).",
            steps: ["d = √((4−1)² + (6−2)²) = √(9 + 16) = √25."],
            answer: "5",
          },
          {
            problem: "M is the midpoint of P(−2, 4) and Q(6, −2). Find M.",
            steps: ["Average: ((−2+6)/2, (4−2)/2) = (2, 1)."],
            answer: "(2, 1)",
          },
        ],
        timeTargetSec: 70,
      },
      {
        id: "lines",
        slug: "lines",
        chapter: "Geometry",
        title: "Lines",
        description:
          "Slope-intercept, point-slope and general forms; parallel/perpendicular conditions; intersections and distances.",
        concepts: [
          "Three forms: y = mx + b, y − y₀ = m(x − x₀), Ax + By + C = 0 — switch freely.",
          "Parallel ⇔ equal slopes; perpendicular ⇔ slopes multiply to −1 (or Ax+By with swapped coefficients).",
          "Intersection = solve the two equations simultaneously.",
          "Point-to-line distance: |Ax₀ + By₀ + C|/√(A² + B²).",
          "Watch vertical lines (x = c, undefined slope) as edge cases.",
        ],
        formulas: [
          "y = mx + b; y − y₀ = m(x − x₀)",
          "Ax + By + C = 0",
          "Parallel: m₁ = m₂; perpendicular: m₁m₂ = −1",
          "Distance point→line: |Ax₀ + By₀ + C|/√(A² + B²)",
          "Distance between parallel lines: |C₁ − C₂|/√(A² + B²)",
          "Slope from general form: m = −A/B (B ≠ 0); x-intercept −C/A; y-intercept −C/B",
          "Intersection = simultaneous solution of the two line equations",
          "Vertical line x = c (undefined slope); horizontal line y = c (m = 0)",
        ],
        lesson: {
          whyItMatters:
            "Lines are the CSCA coordinate workhorse: parallel/perpendicular construction, intersections, and point-to-line distance appear in geometry, vectors, and optimization alike.",
          keyPoints: [
            "Pick the form that fits the data: point + slope → point-slope, two points → slope then point-slope, intercepts → general form.",
            "Parallel lines share slopes (m₁ = m₂, including both vertical); perpendicular non-vertical lines satisfy m₁m₂ = −1.",
            "Intersections solve the two equations simultaneously — substitution for one line in slope form, elimination for two general forms.",
            "Point-to-line distance |Ax₀ + By₀ + C|/√(A² + B²) needs the general form first; normalize parallel lines to identical A, B before comparing C's.",
            "Quarantine vertical lines (x = c) and horizontal lines (m = 0) as edge cases whenever slopes are divided or multiplied.",
          ],
          commonMistakes: [
            "Using m₁m₂ = −1 on a vertical/horizontal pair, where one slope is undefined rather than a number.",
            "Forgetting to convert to Ax + By + C = 0 before the distance formula, or dropping the absolute value.",
            "Comparing C₁ − C₂ for 'parallel' lines whose (A, B) are scaled differently — normalize first.",
            "Sign slips in y − y₀ = m(x − x₀), especially with negative coordinates.",
          ],
          examTip:
            "Convert to general form the moment distance or intersection is mentioned — both formulas consume A, B, C directly.",
        },
        examples: [
          {
            problem: "Line through (2, 1) perpendicular to y = 3x + 4. Find its equation.",
            steps: [
              "Given slope 3, perpendicular slope = −1/3.",
              "y − 1 = −(1/3)(x − 2) ⇒ y = −x/3 + 5/3.",
            ],
            answer: "y = −x/3 + 5/3",
          },
          {
            problem: "Find the distance from (1, 1) to the line 3x + 4y − 5 = 0.",
            steps: ["|3·1 + 4·1 − 5|/√(9+16) = |2|/5."],
            answer: "2/5",
          },
        ],
        timeTargetSec: 60,
      },
      {
        id: "circles",
        slug: "circles",
        chapter: "Geometry",
        title: "Circles",
        description:
          "Standard and general circle equations, center/radius by completing the square, and line–circle positions.",
        concepts: [
          "Standard form (x − a)² + (y − b)² = r² shows center (a, b) and radius r directly.",
          "General form x² + y² + Dx + Ey + F = 0: complete the square to read center and radius.",
          "Line–circle position: compare center-to-line distance d with r (d > r separate, d = r tangent, d < r secant).",
          "Tangent at point (x₀, y₀): radius to that point is perpendicular to the tangent.",
          "Two-circle relation: compare center distance with r₁ + r₂ and |r₁ − r₂|.",
        ],
        formulas: [
          "(x − a)² + (y − b)² = r²",
          "Center (−D/2, −E/2), r = √(D² + E² − 4F)/2",
          "d > r separate; d = r tangent; d < r secant",
          "Tangent ⊥ radius at point of tangency",
          "|r₁ − r₂| < d < r₁ + r₂ ⇔ two intersection points",
          "Diameter endpoints (x₁,y₁),(x₂,y₂): (x−x₁)(x−x₂) + (y−y₁)(y−y₂) = 0",
          "Tangent at (x₀,y₀) on x² + y² = r²: xx₀ + yy₀ = r²",
          "Real circle needs D² + E² − 4F > 0; = 0 is a point, < 0 is empty",
        ],
        lesson: {
          whyItMatters:
            "Circle items reward one move — completing the square — which exposes center and radius and reduces tangency and intersection to a single distance comparison.",
          keyPoints: [
            "Standard form (x − a)² + (y − b)² = r² displays center (a, b) and radius r; convert general form by completing the square in x and y independently.",
            "Center and radius also read off as (−D/2, −E/2) with r = √(D² + E² − 4F)/2, valid only when D² + E² − 4F > 0.",
            "Line–circle position is one comparison: center-to-line distance d vs r gives separate (d > r), tangent (d = r), or secant (d < r).",
            "Radius to a point of tangency is perpendicular to the tangent line — use the radius slope to get the tangent slope (or vice versa).",
            "Two circles compare center distance d with r₁ + r₂ and |r₁ − r₂|: outside, tangent (internal/external), intersecting, or contained.",
          ],
          commonMistakes: [
            "Reporting the center with wrong signs, e.g. reading (x − 3)² as center x = −3.",
            "Forgetting the reality check D² + E² − 4F > 0 and 'finding' a radius for an empty equation.",
            "Halving errors in the radius formula — the /2 applies to the whole root, not the inside.",
            "Solving line–circle intersections by full substitution when only the position (0, 1, 2 points) is asked — compare d with r instead.",
          ],
          examTip:
            "Complete the square first on every general-form circle item — center and radius in hand, the question usually collapses to one distance.",
        },
        examples: [
          {
            problem: "Find the center and radius of x² + y² − 6x + 4y − 3 = 0.",
            steps: [
              "Complete squares: (x − 3)² + (y + 2)² = 3 + 9 + 4 = 16.",
              "Center (3, −2), radius 4.",
            ],
            answer: "Center (3, −2), r = 4",
          },
          {
            problem: "Does the line y = x intersect the circle x² + y² = 1?",
            steps: [
              "Center (0,0), r = 1; distance from center to y = x is 0.",
              "0 < 1, so the line cuts the circle twice.",
            ],
            answer: "Yes — two intersection points",
          },
        ],
        timeTargetSec: 70,
      },
      {
        id: "ellipses",
        slug: "ellipses",
        chapter: "Geometry",
        title: "Ellipses",
        description:
          "Standard equations, foci/vertices/axes, the a² = b² + c² relation, and eccentricity.",
        concepts: [
          "Ellipse = points with constant SUM of distances to two foci (sum = 2a).",
          "Standard: x²/a² + y²/b² = 1 (a > b > 0): vertices (±a, 0), foci (±c, 0).",
          "Key relation: a² = b² + c² — solve for the missing parameter with it.",
          "Eccentricity e = c/a (0 < e < 1); rounder ⇔ smaller e.",
          "Use symmetry: compute one quadrant/vertex, mirror the rest.",
        ],
        formulas: [
          "x²/a² + y²/b² = 1 (a > b > 0)",
          "a² = b² + c²",
          "Foci (±c, 0); vertices (±a, 0); co-vertices (0, ±b)",
          "e = c/a, 0 < e < 1",
          "Focal radii sum: PF₁ + PF₂ = 2a",
          "Vertical major axis: y²/a² + x²/b² = 1; foci (0, ±c), vertices (0, ±a)",
          "Minor-axis endpoints: (0, ±b); focal distance from center: c = ae",
          "Directrix: x = ±a/e (major axis horizontal); PF = e · (distance to directrix)",
        ],
        lesson: {
          whyItMatters:
            "Ellipse questions test the single relation a² = b² + c² plus the sum-of-distances definition — two facts that generate foci, vertices, and equations alike.",
          keyPoints: [
            "Define by foci: every point P satisfies PF₁ + PF₂ = 2a, the constant sum that fixes the major-axis length 2a.",
            "Identify the major axis first: the larger denominator sits under the major variable, and foci/vertices lie on that axis at ±c, ±a.",
            "Bridge missing parameters with a² = b² + c² — given any two of a, b, c, the third follows immediately.",
            "Eccentricity e = c/a in (0, 1) measures flatness: near 0 is near-circular, near 1 is highly elongated.",
            "Mirror by symmetry: solve one vertex/focus/co-vertex and reflect across both axes rather than recomputing.",
          ],
          commonMistakes: [
            "Putting foci on the minor axis by assigning c to the smaller denominator's variable.",
            "Using the hyperbola relation c² = a² + b² (plus) instead of the ellipse a² = b² + c².",
            "Confusing a with the semi-minor b when reading vertices vs co-vertices.",
            "Forgetting the vertical form swaps roles: y²/a² + x²/b² = 1 has foci (0, ±c).",
          ],
          examTip:
            "Underline the larger denominator the moment you see the equation — its variable names the major axis and the foci line.",
        },
        examples: [
          {
            problem: "For x²/25 + y²/9 = 1, find the foci.",
            steps: [
              "a² = 25, b² = 9 ⇒ c² = 25 − 9 = 16, c = 4.",
              "Major axis on x-axis: foci (±4, 0).",
            ],
            answer: "(4, 0) and (−4, 0)",
          },
          {
            problem: "An ellipse has vertices (±5, 0) and c = 3. Find its equation.",
            steps: [
              "a = 5, c = 3 ⇒ b² = 25 − 9 = 16.",
              "Equation: x²/25 + y²/16 = 1.",
            ],
            answer: "x²/25 + y²/16 = 1",
          },
        ],
        timeTargetSec: 75,
      },
      {
        id: "hyperbolas",
        slug: "hyperbolas",
        chapter: "Geometry",
        title: "Hyperbolas",
        description:
          "Standard equations, foci/vertices, asymptotes, and the c² = a² + b² relation.",
        concepts: [
          "Hyperbola = points with constant DIFFERENCE of distances to two foci (difference = 2a).",
          "Standard: x²/a² − y²/b² = 1: vertices (±a, 0), foci (±c, 0), asymptotes y = ±(b/a)x.",
          "Key relation: c² = a² + b² (note: plus, unlike the ellipse).",
          "Asymptotes first: the rectangle ±a, ±b gives asymptotes and a sketch instantly.",
          "Eccentricity e = c/a > 1; larger e ⇔ wider opening.",
        ],
        formulas: [
          "x²/a² − y²/b² = 1",
          "c² = a² + b²",
          "Asymptotes: y = ±(b/a)x",
          "Foci (±c, 0); vertices (±a, 0)",
          "e = c/a > 1; |PF₁ − PF₂| = 2a",
          "Vertical transverse axis: y²/a² − x²/b² = 1; foci (0, ±c); asymptotes y = ±(a/b)x",
          "Asymptote rectangle: corners (±a, ±b) — diagonals are the asymptotes",
          "Conjugate axis length 2b; transverse axis length 2a; c = ae",
        ],
        lesson: {
          whyItMatters:
            "Hyperbola items hinge on two contrasts with the ellipse — the minus sign and c² = a² + b² — plus asymptotes, which give a free sketch and equation check.",
          keyPoints: [
            "Define by foci: every point P satisfies |PF₁ − PF₂| = 2a, the constant difference that fixes the transverse-axis length 2a.",
            "The positive term names the transverse axis: x²/a² − y²/b² = 1 opens left-right with vertices (±a, 0) and foci (±c, 0).",
            "Bridge parameters with c² = a² + b² (plus — the opposite of the ellipse) and read asymptotes y = ±(b/a)x off a and b.",
            "Sketch via the central rectangle ±a by ±b: its diagonals are the asymptotes and its left/right midpoints are the vertices.",
            "Eccentricity e = c/a > 1 measures openness: just above 1 is narrow, large e is wide-flaring.",
          ],
          commonMistakes: [
            "Using the ellipse relation a² = b² + c², which understates c for hyperbolas.",
            "Reading vertices off b (the conjugate semi-axis) instead of a (the transverse semi-axis).",
            "Writing asymptotes as ±(a/b)x for the horizontal form — slope is b/a there, a/b only for the vertical form.",
            "Forgetting the absolute value in |PF₁ − PF₂| = 2a, which discards one branch.",
          ],
          examTip:
            "Draw the ±a/±b box and its diagonals before computing anything — wrong a/b assignments become visually obvious.",
        },
        examples: [
          {
            problem: "For x²/16 − y²/9 = 1, find the asymptotes.",
            steps: [
              "a² = 16, b² = 9 ⇒ a = 4, b = 3.",
              "Asymptotes y = ±(3/4)x.",
            ],
            answer: "y = ±3x/4",
          },
          {
            problem: "A hyperbola has vertices (±2, 0) and asymptotes y = ±x. Find its equation.",
            steps: [
              "a = 2; b/a = 1 ⇒ b = 2.",
              "Equation: x²/4 − y²/4 = 1.",
            ],
            answer: "x²/4 − y²/4 = 1",
          },
        ],
        timeTargetSec: 75,
      },
      {
        id: "parabolas",
        slug: "parabolas",
        chapter: "Geometry",
        title: "Parabolas",
        description:
          "Standard forms y² = 2px / x² = 2py, focus, directrix, and the focus–directrix definition.",
        concepts: [
          "Parabola = points equidistant from a focus and a directrix.",
          "y² = 2px (p > 0): opens right, focus (p/2, 0), directrix x = −p/2.",
          "x² = 2py (p > 0): opens up, focus (0, p/2), directrix y = −p/2.",
          "Flip signs to flip direction: negative p opens left/down.",
          "Vertex form y = a(x − h)² + k shows vertex (h, k) and direction (sign of a).",
        ],
        formulas: [
          "y² = 2px: focus (p/2, 0), directrix x = −p/2",
          "x² = 2py: focus (0, p/2), directrix y = −p/2",
          "PF = distance from P to directrix",
          "y = a(x − h)² + k: vertex (h, k)",
          "Focal length = |p|/2",
          "y² = −2px (p > 0): opens left, focus (−p/2, 0), directrix x = p/2",
          "x² = −2py (p > 0): opens down, focus (0, −p/2), directrix y = p/2",
          "Axis of y² = 2px is the x-axis; axis of x² = 2py is the y-axis",
        ],
        lesson: {
          whyItMatters:
            "Parabola questions test the focus–directrix definition directly: matching orientation to the squared variable and placing focus and directrix symmetrically.",
          keyPoints: [
            "Define by focus and directrix: every point P satisfies PF = distance from P to the directrix line.",
            "The squared variable decides the axis: y² = 2px opens horizontally, x² = 2py opens vertically.",
            "Read p from the coefficient (2p = ±number): focus sits |p|/2 from the vertex toward the opening, directrix the same distance behind.",
            "Negative p flips direction: y² = −2px opens left and x² = −2py opens down for p > 0.",
            "Vertex form y = a(x − h)² + k shows vertex (h, k) instantly, with sign of a giving up/down opening.",
          ],
          commonMistakes: [
            "Halving errors: using p instead of p/2 for the focus distance, or 4p-forms mixed with 2p-forms.",
            "Putting the focus on the wrong side (same side as directrix) instead of symmetric about the vertex.",
            "Squaring the wrong variable for the stated opening direction.",
            "Reading the vertex of y = a(x − h)² + k as (h, −k) or (−h, k).",
          ],
          examTip:
            "Mark vertex, then step |p|/2 toward the opening for the focus and |p|/2 backward for the directrix — three dots that verify each other.",
        },
        examples: [
          {
            problem: "For y² = 8x, find the focus and directrix.",
            steps: [
              "2p = 8 ⇒ p = 4, opens right.",
              "Focus (2, 0), directrix x = −2.",
            ],
            answer: "Focus (2, 0); directrix x = −2",
          },
          {
            problem: "A parabola opens up with vertex at origin through (2, 1). Find its equation.",
            steps: [
              "Form x² = 2py; substitute: 4 = 2p · 1 ⇒ p = 2.",
              "Equation: x² = 4y.",
            ],
            answer: "x² = 4y",
          },
        ],
        timeTargetSec: 70,
      },
    ],
  },
  {
    id: "vectors",
    title: "Vectors",
    description:
      "Vector coordinates, magnitude, dot product, parallelism/perpendicularity, and basic geometric applications.",
    module: 3,
    weightPct: 30,
    hours: 3,
    difficulty: "Hard",
    topics: [
      {
        id: "vectors",
        slug: "vectors",
        chapter: "Vectors",
        title: "Vectors",
        description:
          "Vector addition and scaling, magnitude, dot product and angles, plus parallel/perpendicular tests.",
        concepts: [
          "A vector has magnitude and direction; add components head-to-tail, scale by multiplying each component.",
          "Magnitude |a| = √(x² + y²); unit vector = a/|a|.",
          "Dot product a·b = x₁x₂ + y₁y₂ = |a||b|cos θ — zero ⇔ perpendicular (nonzero vectors).",
          "Parallel ⇔ components proportional (cross-multiply: x₁y₂ = x₂y₁ in 2D).",
          "Use vectors for midpoints, collinearity and angle proofs — algebra replaces construction.",
        ],
        formulas: [
          "|a| = √(x² + y²)",
          "a·b = x₁x₂ + y₁y₂ = |a||b|cos θ",
          "cos θ = (a·b)/(|a||b|)",
          "a ⊥ b ⇔ a·b = 0",
          "a ∥ b ⇔ x₁y₂ = x₂y₁ (2D)",
          "|a|² = a·a; unit vector û = a/|a| (a ≠ 0)",
          "Midpoint of AB: (a + b)/2; vector AB = b − a (position-vector difference)",
          "Projection of a onto b: ((a·b)/|b|²) b; scalar projection (a·b)/|b|",
        ],
        lesson: {
          whyItMatters:
            "Vectors algebraize CSCA geometry: parallelism, perpendicularity, and angles become one dot-product or proportionality check instead of a construction.",
          keyPoints: [
            "Build vectors from coordinates: AB = b − a (tip minus tail), and scale/add component-wise for linear combinations.",
            "Magnitude is Pythagoras on components; dividing by it gives the unit vector in the same direction.",
            "The dot product has two faces: coordinate form x₁x₂ + y₁y₂ and geometric form |a||b|cos θ — set them equal to find angles.",
            "Perpendicular (nonzero) vectors have zero dot product; parallel vectors have proportional components (x₁y₂ = x₂y₁ in 2D).",
            "Prove midpoints and collinearity with position vectors: the midpoint is (a + b)/2 and collinear points differ by a scalar multiple.",
          ],
          commonMistakes: [
            "Reversing AB as a − b instead of b − a (tip minus tail).",
            "Concluding perpendicular from a zero component rather than a zero dot product.",
            "Dividing by |a| = 0 when normalizing the zero vector.",
            "Mixing the angle formula numerator/denominator: cos θ = (a·b)/(|a||b|), not the reciprocal.",
          ],
          examTip:
            "For any angle/perpendicular question, compute a·b first — zero ends it (90°), otherwise feed it straight into cos θ.",
        },
        examples: [
          {
            problem: "Given a = (3, 4), find |a| and its unit vector.",
            steps: [
              "|a| = √(9 + 16) = 5.",
              "Unit vector: (3/5, 4/5).",
            ],
            answer: "|a| = 5; unit vector (3/5, 4/5)",
          },
          {
            problem: "Are a = (1, 2) and b = (−2, 1) perpendicular?",
            steps: ["a·b = 1·(−2) + 2·1 = 0."],
            answer: "Yes — dot product is 0",
          },
        ],
        timeTargetSec: 70,
      },
    ],
  },
  {
    id: "complex-numbers",
    title: "Complex Numbers",
    description:
      "The complex plane, modulus and argument, the four operations, conjugates, and quadratic roots.",
    module: 3,
    weightPct: 30,
    hours: 3,
    difficulty: "Hard",
    topics: [
      {
        id: "complex-numbers",
        slug: "complex-numbers",
        chapter: "Complex Numbers",
        title: "Complex Numbers",
        description:
          "a + bi arithmetic, conjugates, modulus, division by rationalizing, and complex roots of quadratics.",
        concepts: [
          "i² = −1; every complex number is a + bi with real part a and imaginary part b.",
          "Add/subtract component-wise; multiply with FOIL and replace i² by −1.",
          "Divide by multiplying top and bottom by the conjugate: (a+bi)(a−bi) = a² + b².",
          "Modulus |z| = √(a² + b²) is the distance from the origin in the complex plane.",
          "Quadratics with Δ < 0 have conjugate complex roots: x = (−b ± i√|Δ|)/2a.",
        ],
        formulas: [
          "i² = −1",
          "(a + bi)(a − bi) = a² + b²",
          "|a + bi| = √(a² + b²)",
          "1/i = −i",
          "Δ < 0 ⇒ x = (−b ± i√|Δ|)/2a",
          "|z|² = z·z̄; z̄ = a − bi for z = a + bi",
          "i-cycle: i¹ = i, i² = −1, i³ = −i, i⁴ = 1 (period 4)",
          "z₁ + z₂ = (a+c) + (b+d)i; z₁z₂ via FOIL with i² = −1",
        ],
        lesson: {
          whyItMatters:
            "Complex numbers test conjugate discipline: division, modulus, and quadratic roots with Δ < 0 all run through multiply-by-conjugate or the conjugate-pair theorem.",
          keyPoints: [
            "Write every number as a + bi and operate component-wise for addition/subtraction; multiply with FOIL then replace i² by −1.",
            "Divide by multiplying top and bottom by the conjugate of the denominator, using (a+bi)(a−bi) = a² + b² to real-ize it.",
            "Modulus |a + bi| = √(a² + b²) is the origin distance, and |z|² = z·z̄ converts modulus conditions into real equations.",
            "Reduce powers of i modulo 4 (i, −1, −i, 1 cycle) before any other algebra.",
            "Real-coefficient quadratics with Δ < 0 have conjugate roots (−b ± i√|Δ|)/2a — if one root is given, the other is its conjugate.",
          ],
          commonMistakes: [
            "Leaving i² un-replaced after FOIL, or replacing it with 1 instead of −1.",
            "Rationalizing with the wrong conjugate (same sign) so the denominator stays complex.",
            "Forgetting to divide both real and imaginary parts after rationalizing.",
            "Reporting only one complex root of a real quadratic instead of the conjugate pair.",
          ],
          examTip:
            "On any complex division, write the conjugate multiplier explicitly on the first line — the denominator becomes a² + b² mechanically.",
        },
        examples: [
          {
            problem: "Compute (2 + 3i)(1 − i).",
            steps: [
              "FOIL: 2 − 2i + 3i − 3i² = 2 + i − 3(−1).",
              "Simplify: 5 + i.",
            ],
            answer: "5 + i",
          },
          {
            problem: "Compute (1 + i)/(1 − i).",
            steps: [
              "Multiply by conjugate (1 + i): (1 + i)²/(1 + 1) = 2i/2.",
            ],
            answer: "i",
          },
        ],
        timeTargetSec: 70,
      },
    ],
  },
  {
    id: "solid-geometry",
    title: "Solid Geometry",
    description:
      "Space lines and planes, and surface area / volume of prisms, pyramids, cylinders, cones and spheres.",
    module: 3,
    weightPct: 30,
    hours: 3,
    difficulty: "Hard",
    topics: [
      {
        id: "solid-geometry",
        slug: "solid-geometry",
        chapter: "Solid Geometry",
        title: "Solid Geometry",
        description:
          "Positions of lines and planes in space, projections, and volume/surface-area formulas for common solids.",
        concepts: [
          "In space, two lines can be parallel, intersecting, or skew (neither).",
          "A line ⊥ plane if it is perpendicular to two intersecting lines in the plane.",
          "Volume = base area × height for prisms/cylinders; divide by 3 for pyramids/cones.",
          "Cross-sections reduce 3D problems to 2D: cut through the axis or the key vertices.",
          "Track units: area in square units, volume in cubic units.",
        ],
        formulas: [
          "Prism/cylinder: V = Bh",
          "Pyramid/cone: V = Bh/3",
          "Sphere: V = 4πr³/3; S = 4πr²",
          "Cylinder lateral area: 2πrh; cone lateral area: πrl",
          "a² + b² + c² = space diagonal² of a box",
          "Pyramid/cone total surface = base area + lateral area; prism/cylinder total = 2B + lateral",
          "Cone slant height: l = √(r² + h²)",
          "Cross-section through the axis reduces cone/cylinder to an isosceles triangle/rectangle",
        ],
        lesson: {
          whyItMatters:
            "Solid geometry converts CSCA 3D items into flat ones: classifying line–plane positions and cutting cross-sections through the axis exposes the operative 2D figure.",
          keyPoints: [
            "Classify space relations first: two lines are parallel, intersecting, or skew; a line is parallel to, contained in, or intersecting a plane.",
            "Memorize the volume ladder: prisms/cylinders V = Bh, pyramids/cones V = Bh/3, sphere V = 4πr³/3 with surface 4πr².",
            "Cut cross-sections through the axis or key vertices to reduce cones, cylinders, and pyramids to triangles and rectangles.",
            "A line is perpendicular to a plane if it is perpendicular to two intersecting lines in that plane — the standard perpendicularity test.",
            "Distinguish lateral area (sides only) from total surface (plus bases), and keep area vs volume units separate.",
          ],
          commonMistakes: [
            "Forgetting the /3 on pyramid/cone volumes, or applying it to prisms/cylinders.",
            "Using vertical height h where slant height l = √(r² + h²) is needed for cone lateral area πrl.",
            "Confusing skew lines with parallel ones — skew lines never meet and are not parallel.",
            "Reporting area units for volume (or vice versa) after multi-step computation.",
          ],
          examTip:
            "Draw the axial cross-section immediately for any cone/cylinder/sphere item — the 3D formula choice becomes a 2D Pythagoras or area read-off.",
        },
        examples: [
          {
            problem: "Find the volume of a cone with r = 3 and h = 4.",
            steps: ["V = πr²h/3 = π · 9 · 4/3 = 12π."],
            answer: "12π",
          },
          {
            problem: "A box is 3 × 4 × 12. Find its space diagonal.",
            steps: ["d = √(3² + 4² + 12²) = √(9 + 16 + 144) = √169."],
            answer: "13",
          },
        ],
        timeTargetSec: 75,
      },
    ],
  },
  {
    id: "probability",
    title: "Probability",
    description:
      "Classical probability, counting (permutations/combinations), conditional probability and independence.",
    module: 4,
    weightPct: 20,
    hours: 7,
    difficulty: "Medium",
    topics: [
      {
        id: "probability",
        slug: "probability",
        chapter: "Probability",
        title: "Probability",
        description:
          "Sample spaces, P = favorable/total, permutations vs combinations, conditional probability and independence.",
        concepts: [
          "Classical probability: P(A) = favorable outcomes / total equally-likely outcomes.",
          "Order matters ⇒ permutation A(n,k); order irrelevant ⇒ combination C(n,k).",
          "Complement shortcut: P(at least one) = 1 − P(none).",
          "Conditional: P(A|B) = P(A∩B)/P(B); independent ⇔ P(A∩B) = P(A)·P(B).",
          "Check bounds: every probability is in [0, 1]; probabilities over a partition sum to 1.",
        ],
        formulas: [
          "P(A) = |A|/|Ω|",
          "A(n,k) = n!/(n−k)!; C(n,k) = n!/(k!(n−k)!)",
          "P(A ∪ B) = P(A) + P(B) − P(A ∩ B)",
          "P(A|B) = P(A ∩ B)/P(B)",
          "Independent: P(A ∩ B) = P(A) · P(B)",
          "P(Aᶜ) = 1 − P(A); P(at least one) = 1 − P(none)",
          "Bayes: P(B|A) = P(A|B)P(B)/P(A); total probability: P(A) = Σ P(A|Bᵢ)P(Bᵢ)",
          "C(n,k) = C(n,n−k); C(n,0) = C(n,n) = 1; P(∅) = 0, P(Ω) = 1",
          "Mutually exclusive: P(A ∩ B) = 0 ⇒ P(A ∪ B) = P(A) + P(B)",
          "Order matters ⇒ A(n,k); order irrelevant ⇒ C(n,k)",
        ],
        lesson: {
          whyItMatters:
            "Probability fuses counting with conditional logic, so CSCA uses it to test the two highest-error decisions: permutation vs combination, and independent vs conditional.",
          keyPoints: [
            "Start from the classical model: equally-likely outcomes give P(A) = favorable/total — verify equal likelihood before counting.",
            "Choose the counter by order: sequences/arrangements use permutations A(n,k), subsets/teams use combinations C(n,k).",
            "Condition with P(A|B) = P(A ∩ B)/P(B): restrict the sample space to B, then measure A inside it.",
            "Test independence as P(A ∩ B) = P(A)P(B) — independent means the product rule holds, not merely that events 'seem unrelated'.",
            "Reach for complements (1 − P) for 'at least one' phrasing and Bayes/total-probability when the sample splits into cases.",
          ],
          commonMistakes: [
            "Using permutations for team/committee selection where order is irrelevant (overcounting by k!).",
            "Multiplying P(A)P(B) for dependent events, or assuming mutual exclusivity implies independence.",
            "Confusing P(A|B) with P(B|A) — always divide by the probability of the given condition.",
            "Reporting probabilities outside [0, 1] without noticing, or forgetting case probabilities must sum to 1.",
          ],
          examTip:
            "Ask 'does order matter?' before writing any factorial — that one answer picks A(n,k) vs C(n,k) and prevents the most common overcount.",
        },
        examples: [
          {
            problem: "Two dice are rolled. What is P(sum = 9)?",
            steps: [
              "36 equally-likely pairs; sum 9: (3,6),(4,5),(5,4),(6,3) — 4 cases.",
              "P = 4/36 = 1/9.",
            ],
            answer: "1/9",
          },
          {
            problem: "From 5 people choose a 2-person team. How many teams?",
            steps: [
              "Order irrelevant ⇒ C(5,2) = 5!/(2!·3!) = 10.",
            ],
            answer: "10",
          },
        ],
        timeTargetSec: 75,
      },
    ],
  },
  {
    id: "statistics",
    title: "Statistics",
    description:
      "Mean, median, mode, variance and standard deviation, plus reading frequency tables and basic charts.",
    module: 4,
    weightPct: 20,
    hours: 5,
    difficulty: "Medium",
    topics: [
      {
        id: "statistics",
        slug: "statistics",
        chapter: "Statistics",
        title: "Statistics",
        description:
          "Measures of center and spread (mean, median, mode, variance, σ) and interpreting tables and charts.",
        concepts: [
          "Mean = average; median = middle value (robust to outliers); mode = most frequent.",
          "Variance = average squared deviation; standard deviation σ = its square root (same units as data).",
          "Larger σ ⇔ more spread; σ = 0 ⇔ all values identical.",
          "Read charts carefully: check axes, units and whether bars/sectors show counts or percentages.",
          "Mean uses every value (sensitive to extremes); median only cares about order.",
        ],
        formulas: [
          "mean x̄ = (Σx)/n",
          "variance σ² = Σ(x − x̄)²/n",
          "σ = √variance",
          "Median position (odd n): (n+1)/2-th ordered value",
          "Range = max − min",
          "Median (even n): average of the two middle ordered values",
          "Weighted/grouped mean: x̄ = (Σ fᵢxᵢ)/(Σ fᵢ)",
          "σ = 0 ⇔ all values identical; larger σ ⇔ more spread (same units as data)",
        ],
        lesson: {
          whyItMatters:
            "Statistics items test interpretation under outliers and units: picking mean vs median and reading variance as spread decides otherwise-trivial questions.",
          keyPoints: [
            "Match the center to the data: mean uses every value (efficient but outlier-sensitive), median uses order only (robust), mode uses frequency.",
            "Order the data before any median: odd n takes the middle value, even n averages the two middle values.",
            "Variance averages squared deviations and standard deviation σ is its root, restoring the original data units for interpretation.",
            "σ = 0 exactly when all values are identical; otherwise larger σ means wider spread around the mean.",
            "Read tables and charts literally first: confirm whether entries are counts or percentages and check axis labels and units before computing.",
          ],
          commonMistakes: [
            "Taking the median of unordered data, or averaging all values for even n instead of the middle two.",
            "Reporting variance units as data units (variance is squared units; σ carries the data units).",
            "Using the mean on heavily skewed data with outliers where the median is the intended center.",
            "Dividing by the wrong n in grouped means — total frequency Σfᵢ, not the number of groups.",
          ],
          examTip:
            "Sort the data on scrap paper as step zero — ordered values make median, range, and outlier-spotting automatic.",
        },
        examples: [
          {
            problem: "Find the mean and median of 2, 4, 4, 9.",
            steps: [
              "Mean: (2 + 4 + 4 + 9)/4 = 19/4 = 4.75.",
              "Ordered already; median = average of middle two: (4 + 4)/2 = 4.",
            ],
            answer: "Mean 4.75; median 4",
          },
          {
            problem: "Data: 1, 2, 3. Find the population variance.",
            steps: [
              "Mean = 2; squared deviations: 1, 0, 1.",
              "Variance = (1 + 0 + 1)/3 = 2/3.",
            ],
            answer: "2/3",
          },
        ],
        timeTargetSec: 70,
      },
    ],
  },
];

/** Flat list of every topic across all chapters. */
export const ALL_MATH_TOPICS: SyllabusTopic[] = MATH_SYLLABUS.flatMap(
  (chapter) => chapter.topics,
);

/** Total number of Math topics (used by overview pages). */
export const MATH_TOPIC_COUNT: number = ALL_MATH_TOPICS.length;

/** Look up a topic by its URL slug. Returns undefined for unknown slugs. */
export function getMathTopicBySlug(slug: string): SyllabusTopic | undefined {
  return ALL_MATH_TOPICS.find((topic) => topic.slug === slug);
}

/** Exam module grouping (weights/hours follow the widely-reported third-party outline). */
export interface MathModule {
  id: number;
  title: string;
  weightPct: number;
  hours: number;
  difficulty: string;
  summary: string;
  chapterIds: string[];
}

/** The 4 exam modules aggregating the 10 chapters. */
export const MATH_MODULES: MathModule[] = [
  {
    id: 1,
    title: "Sets & Inequalities",
    weightPct: 15,
    hours: 2,
    difficulty: "Easy",
    summary:
      "Set operations with Venn counting plus linear, quadratic, fractional and absolute-value inequalities.",
    chapterIds: ["sets-inequalities"],
  },
  {
    id: 2,
    title: "Functions",
    weightPct: 35,
    hours: 20,
    difficulty: "Hard",
    summary:
      "Function families (power, exponential, log, trig), sequences and series, and calculus through basic applications.",
    chapterIds: ["functions", "sequences", "calculus"],
  },
  {
    id: 3,
    title: "Geometry and Algebra",
    weightPct: 30,
    hours: 18,
    difficulty: "Hard",
    summary:
      "Coordinate geometry and conics plus vectors, complex numbers and solid geometry.",
    chapterIds: ["geometry", "vectors", "complex-numbers", "solid-geometry"],
  },
  {
    id: 4,
    title: "Probability and Statistics",
    weightPct: 20,
    hours: 12,
    difficulty: "Medium",
    summary:
      "Counting, classical/conditional probability and independence, plus centers, spread and chart reading.",
    chapterIds: ["probability", "statistics"],
  },
];

/** Practice difficulty levels (spec Sec 8/9). Stage 3 links to the first three. */
export const PRACTICE_LEVELS = ["Foundation", "Basic", "CSCA Standard"] as const;

export type PracticeLevel = (typeof PRACTICE_LEVELS)[number];
