// Sets & Inequalities — chapter teaching content.
// Source: content/sets-and-inequalities.md
// Math strings use \(...\) inline and \[...\] display delimiters,
// rendered by <M> / <MBlock> (KaTeX).

export interface ChapterLesson {
  id: string;
  no: number;
  title: string;
  /** Short teaching paragraphs (math-aware). */
  body: string[];
  /** Rule/method bullets (math-aware). */
  points: string[];
  /** The trap to avoid (math-aware). */
  trap: string;
}

export const SETS_LESSONS: ChapterLesson[] = [
  {
    id: "set-basics",
    no: 1,
    title: "Set Basics",
    body: [
      "A **set** is a well-defined collection of distinct objects, called **elements**. Write \\(x \\in A\\) when \\(x\\) belongs to \\(A\\), and \\(x \\notin A\\) when it does not.",
      "Never confuse the two: \\(x \\in A\\) says \\(x\\) is an *element* of \\(A\\), while \\(\\{x\\} \\subseteq A\\) says the *set containing* \\(x\\) is a subset of \\(A\\).",
    ],
    points: [
      "Finite sets list elements: \\(A = \\{2, 4, 6, 8\\}\\), so \\(|A| = 4\\).",
      "Special sets: empty \\(\\varnothing\\), singleton \\(\\{5\\}\\), infinite \\(\\mathbb{N} = \\{1, 2, 3, \\ldots\\}\\).",
      "Sets are equal iff they hold exactly the same elements — order and repetition don't matter: \\(\\{1, 2, 3\\} = \\{3, 2, 1\\}\\).",
    ],
    trap: "Trap: \\(\\{0\\}\\) is NOT empty — it holds one element. \\(\\{x \\in \\mathbb{R} : x^2+1 = 0\\}\\) is empty because no real \\(x\\) works.",
  },
  {
    id: "set-representation",
    no: 2,
    title: "Set Representation",
    body: [
      "Every set can be written three ways. **Roster form** lists elements: \\(A = \\{2, 4, 6, 8\\}\\). **Set-builder form** gives a rule: \\(A = \\{x \\in \\mathbb{Z} : x \\text{ is even and } 2 \\le x \\le 8\\}\\). **Descriptive form** uses words.",
      "The exam loves converting between forms — read the rule, list the elements, and check endpoints.",
    ],
    points: [
      "Number sets: \\(\\mathbb{N}\\) naturals, \\(\\mathbb{Z}\\) integers, \\(\\mathbb{Q}\\) rationals, \\(\\mathbb{R}\\) reals, with \\(\\mathbb{N} \\subseteq \\mathbb{Z} \\subseteq \\mathbb{Q} \\subseteq \\mathbb{R}\\).",
      "Watch whether \\(\\mathbb{N}\\) starts at 0 or 1 — follow the question's convention.",
    ],
    trap: "Trap: set-builder conditions like \\(2 \\le x \\le 8\\) include both endpoints — don't drop them when listing.",
  },
  {
    id: "subsets-power-sets",
    no: 3,
    title: "Subsets and Power Sets",
    body: [
      "\\(A \\subseteq B\\) means every element of \\(A\\) is in \\(B\\). Every set is a subset of itself, and \\(\\varnothing \\subseteq A\\) always. A **proper** subset excludes equality: \\(A \\subseteq B\\) and \\(A \\ne B\\).",
      "Counting is mechanical: an \\(n\\)-element set has \\(2^n\\) subsets and \\(2^n - 1\\) proper subsets, because each element is either in or out.",
    ],
    points: [
      "Subsets: \\(\\boxed{2^n}\\). Proper subsets: \\(\\boxed{2^n - 1}\\).",
      "Power set \\(\\mathcal{P}(A)\\) collects all subsets: if \\(A = \\{1, 2\\}\\) then \\(\\mathcal{P}(A) = \\{\\varnothing, \\{1\\}, \\{2\\}, \\{1, 2\\}\\}\\), so \\(|\\mathcal{P}(A)| = 2^{|A|}\\).",
      "Subsets containing one fixed element: fix it in, choose freely from the rest → \\(2^{n-1}\\).",
      "Exactly-\\(k\\) subsets: choose which \\(k\\) → \\(C(n,k)\\); e.g. an 8-element set has \\(C(8,3) = 56\\) three-element subsets.",
    ],
    trap: "Trap: \\(\\{1, 3\\} \\not\\subseteq \\{1, 2\\}\\) — one outsider breaks a subset. Always check every element.",
  },
  {
    id: "set-operations",
    no: 4,
    title: "Set Operations",
    body: [
      "Three operations do all the work. **Union** \\(A \\cup B\\) collects elements in either set (OR). **Intersection** \\(A \\cap B\\) keeps only common elements (AND). **Difference** \\(A - B\\) keeps elements of \\(A\\) outside \\(B\\).",
      "With \\(A = \\{1, 2, 3, 4\\}\\) and \\(B = \\{3, 4, 5, 6\\}\\): \\(A \\cup B = \\{1, 2, 3, 4, 5, 6\\}\\), \\(A \\cap B = \\{3, 4\\}\\), \\(A - B = \\{1, 2\\}\\).",
    ],
    points: [
      "Complement \\(A^c = U - A\\) needs the universal set \\(U\\): with \\(U = \\{1, \\ldots, 6\\}\\) and \\(A = \\{1, 2, 3\\}\\), \\(A^c = \\{4, 5, 6\\}\\).",
      "Sizes follow: \\(|A - B| = |A| - |A \\cap B|\\) and \\(|A^c| = |U| - |A|\\).",
      "Cardinality: \\(|A|\\) counts elements; Cartesian product \\(|A \\times B| = |A| \\cdot |B|\\).",
    ],
    trap: "Trap: \\(A - B \\ne B - A\\) in general, and you cannot find a complement without knowing \\(U\\).",
  },
  {
    id: "set-laws",
    no: 5,
    title: "Set Laws",
    body: [
      "Union and intersection are commutative and associative, and they distribute over each other: \\(A \\cap (B \\cup C) = (A \\cap B) \\cup (A \\cap C)\\).",
      "Identity and domination laws handle the edge cases: \\(A \\cup \\varnothing = A\\), \\(A \\cap U = A\\), \\(A \\cup U = U\\), \\(A \\cap \\varnothing = \\varnothing\\).",
    ],
    points: [
      "Complement laws: \\(A \\cup A^c = U\\), \\(A \\cap A^c = \\varnothing\\), \\((A^c)^c = A\\).",
      "Commutative: \\(A \\cup B = B \\cup A\\), \\(A \\cap B = B \\cap A\\).",
      "Associative: \\((A \\cup B) \\cup C = A \\cup (B \\cup C)\\), same for \\(\\cap\\).",
      "Distributive: \\(A \\cap (B \\cup C) = (A \\cap B) \\cup (A \\cap C)\\) and \\(A \\cup (B \\cap C) = (A \\cup B) \\cap (A \\cup C)\\).",
      "Identity: \\(A \\cup \\varnothing = A\\), \\(A \\cap U = A\\). Domination: \\(A \\cup U = U\\), \\(A \\cap \\varnothing = \\varnothing\\).",
      "Idempotent: \\(A \\cup A = A\\), \\(A \\cap A = A\\).",
      "De Morgan (boxed): \\((A \\cup B)^c = A^c \\cap B^c\\), \\((A \\cap B)^c = A^c \\cup B^c\\) — NOT-OR becomes AND-NOT.",
      "If \\(A \\subseteq B\\) then \\(A \\cap B = A\\) and \\(A \\cup B = B\\) — instant simplifications.",
    ],
    trap: "Trap: distribution looks like algebra but isn't: \\(A \\cup (B \\cap C) = (A \\cup B) \\cap (A \\cup C)\\), with union outside AND inside.",
  },
  {
    id: "venn-diagrams",
    no: 6,
    title: "Venn Diagrams",
    body: [
      "Translate wording before counting. \\(A\\) or \\(B\\) → \\(A \\cup B\\). \\(A\\) and \\(B\\) → \\(A \\cap B\\). \\(A\\) but not \\(B\\) → \\(A - B\\). Neither → \\((A \\cup B)^c\\).",
      "Fill the diagram inside-out: both/all-three first, then only-regions, then the outside.",
    ],
    points: [
      "Only A = \\(A - B\\); exactly one of A, B = A-only + B-only.",
      "Exactly two of A, B, C = pairwise-only regions; all three = triple intersection.",
      "Neither A nor B = total − \\(|A \\cup B|\\).",
      "“At least one” → union; “both” → intersection.",
      "“Or” is inclusive unless the question says “but not both”.",
    ],
    trap: "Trap: “only A” is \\(A - B\\), not \\(A\\) — subtract the overlap before answering.",
  },
  {
    id: "inclusion-exclusion",
    no: 7,
    title: "Inclusion-Exclusion",
    body: [
      "Adding \\(|A| + |B|\\) counts the overlap twice, so subtract it once: \\[|A \\cup B| = |A| + |B| - |A \\cap B|\\]",
      "Three sets extend the same idea — add singles, subtract pairs, add back the triple: \\[|A \\cup B \\cup C| = |A|+|B|+|C| - |A\\cap B|-|B\\cap C|-|C\\cap A| + |A\\cap B\\cap C|\\]",
    ],
    points: [
      "A-only region: \\(|A| - |A \\cap B| - |A \\cap C| + |A \\cap B \\cap C|\\).",
      "Disjoint sets: overlap is 0, so \\(|A \\cup B| = |A| + |B|\\).",
      "Max union \\(= |A| + |B|\\) (disjoint); min union \\(= \\max(|A|, |B|)\\) (one inside the other).",
    ],
    trap: "Trap: forgetting to add back the triple intersection — pairs subtract it three times but it was added three times, so net needs +1.",
  },
  {
    id: "cartesian-products",
    no: 8,
    title: "Cartesian Products",
    body: [
      "\\(A \\times B\\) holds ordered pairs \\((a, b)\\) with \\(a \\in A, b \\in B\\). Counting is multiplication: \\[|A \\times B| = |A| \\cdot |B|\\]",
      "Order matters: \\((a, b) \\ne (b, a)\\) unless the coordinates are equal.",
    ],
    points: [
      "Example: \\(|A| = 4, |B| = 3\\) gives \\(4 \\times 3 = 12\\) ordered pairs.",
    ],
    trap: "Trap: \\(|A \\times B|\\) multiplies (\\(mn\\)), it is not \\(m + n\\) — don't confuse pairs with unions.",
  },
  {
    id: "inequality-basics",
    no: 9,
    title: "Inequality Basics",
    body: [
      "Solve like an equation — isolate \\(x\\) — with one extra rule: multiplying or dividing by a **negative** flips the sign: \\(-2x > 6 \\Rightarrow x < -3\\).",
      "Adding or subtracting never flips anything.",
    ],
    points: [
      "Interval notation: \\(x > 2 \\Rightarrow (2, \\infty)\\), \\(x \\le 5 \\Rightarrow (-\\infty, 5]\\). Infinity always takes a round bracket.",
      "\\(2 < x + 1 \\le 7\\) is an AND: subtract 1 everywhere → \\(1 < x \\le 6\\).",
    ],
    trap: "Trap: decide AND vs OR first. \\(x > 2\\) and \\(x < 7\\) combine to \\(2 < x < 7\\); “or” stays two separate intervals.",
  },
  {
    id: "compound-inequalities",
    no: 10,
    title: "Compound Inequalities",
    body: [
      "AND means both must hold (one merged interval); OR means at least one holds (separate intervals). Example: \\(-4 \\le 2x + 2 < 8\\) → subtract 2, divide by 2 → \\(-3 \\le x < 3\\).",
      "Word codes: at least \\(\\ge\\), at most \\(\\le\\), no more than \\(\\le\\), no less than \\(\\ge\\).",
    ],
    points: [
      "“At least 10” is \\(x \\ge 10\\), not \\(x > 10\\). “At most 10” is \\(x \\le 10\\).",
    ],
    trap: "Trap: never auto-merge two inequalities — check whether the wording is AND or OR before combining.",
  },
  {
    id: "absolute-value",
    no: 11,
    title: "Absolute Value",
    body: [
      "\\(|x|\\) is distance from zero, never negative. \\(|x| = a\\) (with \\(a > 0\\)) splits: \\(x = a\\) or \\(x = -a\\); shifted, \\(|x - c| = a\\) gives \\(x = c \\pm a\\).",
      "Inequalities follow one memory rule: **< means AND, > means OR**. \\(|x| < a \\iff -a < x < a\\), while \\(|x| > a \\iff x < -a\\) or \\(x > a\\).",
    ],
    points: [
      "Equations first: \\(|x| = a \\Rightarrow x = \\pm a\\); shifted \\(|x - c| = a \\Rightarrow x = c \\pm a\\) (distance \\(a\\) from \\(c\\)).",
      "\\(|x - 3| \\le 5 \\iff -5 \\le x - 3 \\le 5 \\iff -2 \\le x \\le 8\\).",
      "Two absolute values (\\(|2x-3| < |x+1|\\)): square both sides, then run a sign chart — here \\(\\frac23 < x < 4\\).",
      "Sums like \\(|x-2| + |x+2| \\le 6\\): split at the critical points \\(-2, 2\\) into three regions, drop each \\(|·|\\) with the correct sign per region, and solve — here \\(-3 \\le x \\le 3\\). Shortcut: read it as distance — points whose distances to \\(2\\) and \\(-2\\) total at most 6.",
    ],
    trap: "Trap: treating \\(|x| > a\\) as an AND (a single interval) — it is always two rays.",
  },
  {
    id: "quadratic-inequalities",
    no: 12,
    title: "Quadratic Inequalities",
    body: [
      "Recipe: move everything to one side, factor, find zeros, sign-chart the intervals, then include/exclude endpoints by \\(\\le/\\ge\\) vs \\(</>\\).",
      "For \\((x-a)(x-b)\\) with \\(a < b\\) and positive leading coefficient: outside the roots is positive, between is negative.",
    ],
    points: [
      "\\(x^2 - 5x + 6 \\le 0 \\Rightarrow (x-2)(x-3) \\le 0 \\Rightarrow 2 \\le x \\le 3\\).",
      "\\(x^2 - 6x + 9 = (x-3)^2 \\ge 0\\) always, so \\((x-3)^2 < 0\\) has no real solution.",
    ],
    trap: "Trap: including a root under a strict \\(</>\\) sign, or forgetting that a repeated (even-multiplicity) root doesn't change sign.",
  },
  {
    id: "polynomial-inequalities",
    no: 13,
    title: "Polynomial Inequalities",
    body: [
      "Same sign-chart engine, more factors: order all real zeros, test one point per interval, keep the intervals with the wanted sign.",
      "Multiplicity decides: odd multiplicity flips the sign at the root, even multiplicity touches and keeps it.",
    ],
    points: [
      "\\((x+1)(x-2)(x-4) > 0 \\Rightarrow (-1, 2) \\cup (4, \\infty)\\).",
      "\\((x-1)^2(x+2) < 0\\): \\((x-1)^2 \\ge 0\\) (zero only at \\(x = 1\\), excluded), so need \\(x + 2 < 0 \\Rightarrow x < -2\\).",
    ],
    trap: "Trap: expanding a factored polynomial — the factored form IS the sign chart input; expanding wastes time and invites errors.",
  },
  {
    id: "rational-inequalities",
    no: 14,
    title: "Rational Inequalities",
    body: [
      "Collect numerator zeros AND denominator zeros, order them, sign-chart, then select. The golden rule: **denominator zeros are always excluded**, even under \\(\\ge/\\le\\).",
      "Example: \\(\\frac{x-1}{x+3} > 0\\) → critical \\(x = 1, x = -3\\) (excluded) → \\(x < -3\\) or \\(x > 1\\).",
    ],
    points: [
      "\\(\\frac{x-3}{x+2} \\ge 0 \\Rightarrow (-\\infty, -2) \\cup [3, \\infty)\\): numerator zero \\(3\\) included, denominator zero \\(-2\\) excluded.",
      "\\(\\frac{1}{(x-2)(x+3)} \\le 0 \\Rightarrow -3 < x < 2\\): numerator never zero, both critical points excluded.",
    ],
    trap: "Trap: cross-multiplying by a denominator of unknown sign, or simplifying away a factor and forgetting its zero stays excluded.",
  },
  {
    id: "word-problems",
    no: 15,
    title: "Word Problems",
    body: [
      "Translate first, solve second. “At least 40” → \\(\\ge 40\\); “no more than 20 and greater than 5” → \\((5, 20]\\).",
      "Two-variable \\(y > 2x + 1\\) shades **above** the boundary; strict \\(</>\\) uses a dashed (excluded) boundary, \\(\\le/\\ge\\) a solid one.",
    ],
    points: [
      "Rectangle width \\(x\\), length \\(x+3\\), area at least 40: \\(x(x+3) \\ge 40\\) with \\(x > 0\\).",
      "“5 units from 2, at least”: \\(|x - 2| \\ge 5\\).",
      "Full codebook: greater than \\(>\\), less than \\(<\\), at least \\(\\ge\\), at most \\(\\le\\), no more than \\(\\le\\), no less than \\(\\ge\\), minimum \\(\\ge\\), maximum \\(\\le\\), more than \\(>\\), fewer than \\(<\\).",
    ],
    trap: "Trap: “at least” (\\(\\ge\\)) vs “more than” (\\(>\\)) — one boundary point decides the option.",
  },
  {
    id: "two-variable-inequalities",
    no: 16,
    title: "Two-Variable Inequalities",
    body: [
      "A linear inequality in two variables like \\(y > 2x + 1\\) describes a **region** of the coordinate plane, cut by its boundary line \\(y = 2x + 1\\).",
      "Shading rule: \\(y > f(x)\\) shades **above** the boundary; \\(y < f(x)\\) shades **below** it. Test with \\((0,0)\\) when unsure — if it satisfies the inequality, its side is shaded.",
    ],
    points: [
      "Strict \\(</>\\) → dashed boundary (excluded); \\(\\le/\\ge\\) → solid boundary (included).",
      "Example: \\(y > 3x - 2\\) is the region strictly above the line \\(y = 3x - 2\\).",
      "Vertical/horizontal cases work the same way: \\(x > 1\\) is everything right of the line \\(x = 1\\).",
    ],
    trap: "Trap: shading the wrong side, or drawing a solid line for a strict inequality — always test one point.",
  },
];

export const SETS_STUDY_ORDER: string[] = [
  "Read the concept in simple words.",
  "Write down the exact notation.",
  "Work one easy example by hand.",
  "Memorize the general formula or method.",
  "Solve one exam-style example.",
  "Name the trap for this type out loud.",
  "Solve 2–5 questions: Basic → Intermediate → Advanced.",
  "Finish with mixed practice — identify the method yourself first.",
  "Ask: what type is this? → what rule? → fastest safe method? → boundaries checked?",
];

export const SETS_OBJECTIVES: string[] = [
  "Read and write sets in roster, set-builder, and descriptive form.",
  "Count subsets (\\(2^n\\)) and proper subsets (\\(2^n-1\\)).",
  "Compute union, intersection, difference, complement, and Cartesian products.",
  "Apply De Morgan's laws and inclusion–exclusion (2-set and 3-set).",
  "Solve linear, compound, absolute-value, quadratic, polynomial, and rational inequalities.",
  "Run sign charts and always exclude denominator zeros.",
  "Translate “at least / at most / only / neither” into exact math.",
];

export const SETS_FORMULAS: { group: string; items: string[] }[] = [
  {
    group: "Counting",
    items: [
      "Subsets of an \\(n\\)-element set: \\(\\boxed{2^n}\\)",
      "Proper subsets: \\(\\boxed{2^n-1}\\)",
      "Power set size: \\(|\\mathcal{P}(A)| = 2^{|A|}\\)",
      "Subsets containing a fixed element: \\(2^{n-1}\\)",
      "Cartesian product: \\(|A \\times B| = |A| \\cdot |B|\\)",
    ],
  },
  {
    group: "Operations & laws",
    items: [
      "Complement: \\(A^c = U - A\\)",
      "De Morgan: \\((A \\cup B)^c = A^c \\cap B^c\\), \\((A \\cap B)^c = A^c \\cup B^c\\)",
      "Two-set union: \\(|A \\cup B| = |A| + |B| - |A \\cap B|\\)",
      "Three-set union: add singles, subtract pairs, add back the triple",
      "If \\(A \\subseteq B\\): \\(A \\cap B = A\\), \\(A \\cup B = B\\)",
    ],
  },
  {
    group: "Absolute value",
    items: [
      "\\(|x| < a \\iff -a < x < a\\) (AND)",
      "\\(|x| \\le a \\iff -a \\le x \\le a\\)",
      "\\(|x| > a \\iff x < -a \\text{ or } x > a\\) (OR)",
      "\\(|x| \\ge a \\iff x \\le -a \\text{ or } x \\ge a\\)",
    ],
  },
  {
    group: "Inequality engine",
    items: [
      "Negative multiply/divide flips: \\(< \\leftrightarrow >\\), \\(\\le \\leftrightarrow \\ge\\)",
      "Quadratic \\((x-a)(x-b)\\), \\(a<b\\): \\(>0\\) outside, \\(<0\\) between",
      "Odd multiplicity flips sign; even multiplicity keeps it",
      "Rational: numerator zeros + denominator zeros, sign chart, denominator always excluded",
    ],
  },
];

export const SETS_TRAPS: string[] = [
  "Confusing \\(\\in\\) (element) with \\(\\subseteq\\) (subset).",
  "Forgetting \\(\\varnothing\\) is a subset of every set.",
  "Counting repeated elements twice.",
  "Skipping the subtracted intersection in union counting.",
  "Dropping the added-back triple intersection for three sets.",
  "Treating \\(A-B\\) and \\(B-A\\) as the same.",
  "Finding a complement without fixing the universal set \\(U\\).",
  "Not flipping the sign after negative division/multiplication.",
  "Reading \\(|x|>a\\) as AND instead of OR.",
  "Including denominator zeros (never allowed).",
  "Including roots under strict \\(</>\\) signs.",
  "Forgetting even-multiplicity roots keep their sign.",
  "Drawing solid boundaries for strict inequalities.",
  "Mixing up “at least” (\\(\\ge\\)) with “more than” (\\(>\\).",
  "Expanding factored polynomials instead of sign-charting them.",
];

export const SETS_RECOGNITION: { cue: string; action: string }[] = [
  { cue: "“How many subsets?”", action: "Use \\(2^n\\) (proper: \\(2^n-1\\))." },
  { cue: "“Common / both”", action: "Think \\(A \\cap B\\)." },
  { cue: "“Either / or / at least one”", action: "Think \\(A \\cup B\\) + inclusion–exclusion." },
  { cue: "“Not in / neither”", action: "Think complement / difference." },
  { cue: "Linear inequality", action: "Isolate \\(x\\); watch negative division." },
  { cue: "Absolute value", action: "< → AND interval; > → OR rays (or square both sides)." },
  { cue: "Quadratic / polynomial", action: "Roots + sign chart; check multiplicity." },
  { cue: "Rational", action: "Numerator + denominator critical points; exclude denominator zeros." },
];

export const SETS_CHECKLIST: { group: string; items: string[] }[] = [
  {
    group: "Sets",
    items: [
      "I know \\(\\in\\), \\(\\notin\\), \\(\\subseteq\\), \\(\\subset\\).",
      "I can write roster and set-builder form.",
      "I can count subsets with \\(2^n\\) and proper subsets with \\(2^n-1\\).",
      "I can compute union, intersection, difference, complement.",
      "I know De Morgan's laws cold.",
      "I can solve two-set and three-set counting problems.",
      "I understand Cartesian products.",
    ],
  },
  {
    group: "Inequalities",
    items: [
      "I flip the sign after negative multiply/divide.",
      "I can solve compound inequalities (AND vs OR).",
      "I can use interval notation correctly.",
      "I can solve absolute-value equations and inequalities.",
      "I can factor quadratics and run sign charts.",
      "I handle repeated roots and denominator zeros.",
      "I can translate “at least / at most” exactly.",
    ],
  },
];

export const SETS_MEMORY: string[] = [
  "Union = OR, Intersection = AND",
  "Subsets \\(= 2^n\\), proper \\(= 2^n-1\\)",
  "\\(|A \\cup B| = |A| + |B| - |A \\cap B|\\)",
  "Negative multiply/divide = flip the sign",
  "\\(|x| < a \\Rightarrow\\) AND, \\(|x| > a \\Rightarrow\\) OR",
  "Quadratic/polynomial = roots + sign chart",
  "Rational = numerator + denominator zeros + sign chart",
  "Denominator zero = ALWAYS excluded",
];

export interface LessonExample {
  problem: string;
  steps: string[];
  answer: string;
}

/** One worked example per lesson (math-aware strings). */
export const LESSON_EXAMPLES: Record<string, LessonExample> = {
  "set-basics": {
    problem: "Let \\(A = \\{1, 2, 3, 4\\}\\). Which are true: \\(3 \\in A\\), \\(5 \\in A\\), \\(\\{3\\} \\subseteq A\\)?",
    steps: [
      "\\(3\\) is listed in \\(A\\), so \\(3 \\in A\\) is true.",
      "\\(5\\) is not listed, so \\(5 \\in A\\) is false.",
      "The set \\(\\{3\\}\\) has its only member in \\(A\\), so \\(\\{3\\} \\subseteq A\\) is true.",
    ],
    answer: "\\(3 \\in A\\) ✓ · \\(5 \\in A\\) ✗ · \\(\\{3\\} \\subseteq A\\) ✓",
  },
  "set-representation": {
    problem: "Write \\(A = \\{x \\in \\mathbb{Z} : x \\text{ is even and } 2 \\le x \\le 8\\}\\) in roster form.",
    steps: [
      "Even integers from \\(2\\) to \\(8\\): test \\(2, 3, 4, 5, 6, 7, 8\\).",
      "Keep the evens, endpoints included.",
    ],
    answer: "\\(A = \\{2, 4, 6, 8\\}\\)",
  },
  "subsets-power-sets": {
    problem: "Set \\(A\\) has \\(4\\) elements. How many subsets and proper subsets?",
    steps: [
      "Each element is in or out: \\(2^4 = 16\\) subsets.",
      "Proper drops the set itself: \\(16 - 1 = 15\\).",
    ],
    answer: "\\(16\\) subsets · \\(15\\) proper",
  },
  "set-operations": {
    problem: "With \\(A = \\{1, 2, 3, 4\\}\\), \\(B = \\{3, 4, 5, 6\\}\\), find \\(A \\cup B\\), \\(A \\cap B\\), \\(A - B\\).",
    steps: [
      "Union combines once: \\(\\{1, 2, 3, 4, 5, 6\\}\\).",
      "Intersection keeps commons: \\(\\{3, 4\\}\\).",
      "Difference drops \\(B\\)'s items from \\(A\\): \\(\\{1, 2\\}\\).",
    ],
    answer: "\\(\\cup = \\{1,2,3,4,5,6\\}\\) · \\(\\cap = \\{3,4\\}\\) · \\(- = \\{1,2\\}\\)",
  },
  "set-laws": {
    problem: "Simplify \\((A \\cup B)^c\\).",
    steps: [
      "De Morgan: complement flips \\(\\cup\\) to \\(\\cap\\).",
      "Push the complement inside both sets.",
    ],
    answer: "\\(A^c \\cap B^c\\)",
  },
  "venn-diagrams": {
    problem: "40 students: 25 like math, 20 like physics, 12 both. How many like neither?",
    steps: [
      "At least one: \\(25 + 20 - 12 = 33\\).",
      "Neither: \\(40 - 33 = 7\\).",
    ],
    answer: "\\(7\\) students",
  },
  "inclusion-exclusion": {
    problem: "\\(|A| = 30\\), \\(|B| = 25\\), \\(|A \\cap B| = 10\\). Find \\(|A \\cup B|\\).",
    steps: [
      "Adding counts the overlap twice.",
      "Subtract it once: \\(30 + 25 - 10 = 45\\).",
    ],
    answer: "\\(45\\)",
  },
  "cartesian-products": {
    problem: "\\(|A| = 4\\), \\(|B| = 3\\). How many pairs in \\(A \\times B\\)?",
    steps: [
      "Each of the \\(4\\) A-items pairs with each of the \\(3\\) B-items.",
      "Multiply: \\(4 \\times 3 = 12\\).",
    ],
    answer: "\\(12\\) ordered pairs",
  },
  "inequality-basics": {
    problem: "Solve \\(-2x > 6\\).",
    steps: [
      "Divide by \\(-2\\) — negative, so flip the sign.",
      "Get \\(x < -3\\).",
    ],
    answer: "\\(x < -3\\)",
  },
  "compound-inequalities": {
    problem: "Solve \\(-4 \\le 2x + 2 < 8\\).",
    steps: [
      "Subtract \\(2\\) everywhere: \\(-6 \\le 2x < 6\\).",
      "Divide by \\(2\\) (positive, no flip): \\(-3 \\le x < 3\\).",
    ],
    answer: "\\(-3 \\le x < 3\\)",
  },
  "absolute-value": {
    problem: "Solve \\(|x - 3| \\le 5\\).",
    steps: [
      "\\(\\le\\) means AND: \\(-5 \\le x - 3 \\le 5\\).",
      "Add \\(3\\): \\(-2 \\le x \\le 8\\).",
    ],
    answer: "\\(-2 \\le x \\le 8\\)",
  },
  "quadratic-inequalities": {
    problem: "Solve \\(x^2 - 5x + 6 < 0\\).",
    steps: [
      "Factor: \\((x-2)(x-3) < 0\\), roots \\(2, 3\\).",
      "Upward parabola is negative between the roots.",
    ],
    answer: "\\(2 < x < 3\\)",
  },
  "polynomial-inequalities": {
    problem: "Solve \\((x+1)(x-2)(x-4) > 0\\).",
    steps: [
      "Zeros in order: \\(-1, 2, 4\\).",
      "Rightmost interval positive, signs alternate: \\((-1,2)\\) and \\((4,\\infty)\\).",
    ],
    answer: "\\((-1,2) \\cup (4,\\infty)\\)",
  },
  "rational-inequalities": {
    problem: "Solve \\(\\frac{x-1}{x+3} > 0\\).",
    steps: [
      "Critical points: numerator zero \\(x = 1\\), denominator zero \\(x = -3\\) (always excluded).",
      "Same sign holds outside: \\(x < -3\\) or \\(x > 1\\).",
    ],
    answer: "\\(x < -3\\) or \\(x > 1\\)",
  },
  "word-problems": {
    problem: "Width \\(x\\), length \\(x+3\\), area at least \\(40\\), \\(x > 0\\). Set up the inequality.",
    steps: [
      "Area = width × length = \\(x(x+3)\\).",
      "“At least 40” → \\(\\ge 40\\).",
    ],
    answer: "\\(x(x+3) \\ge 40\\)",
  },
  "two-variable-inequalities": {
    problem: "Where is the solution of \\(y > 2x + 1\\)? Is the boundary included?",
    steps: [
      "\\(y >\\) means the region above the line \\(y = 2x + 1\\).",
      "Strict \\(>\\) → dashed boundary (excluded).",
    ],
    answer: "Above the line, boundary excluded",
  },
};
