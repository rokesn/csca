// Functions chapter — lessons + teaching content.
// Lessons 1–21 authored by subagents from data/syllabus.ts (functions
// chapter) and the 57 tagged exam questions in data/previous-exams.ts.
// Math uses \\(...\\) delimiters, rendered by <M> (KaTeX).

export interface FunctionsLesson {
  id: string;
  no: number;
  title: string;
  body: string[];
  points: string[];
  trap: string;
  example: {
    problem: string;
    steps: string[];
    answer: string;
  };
}

export const LESSONS_TRIG_BASICS: FunctionsLesson[] = [
  { id: "trig-values", no: 1, title: "Special Angles and Unit-Circle Values", body: ["Five angles run the whole exam. Memorize \\(0°\\), \\(30°\\), \\(45°\\), \\(60°\\) and \\(90°\\) once and reuse them everywhere.", "On the unit circle, \\(\\cos \\theta\\) is the x-value and \\(\\sin \\theta\\) is the y-value. Then \\(\\tan \\theta = \\sin \\theta / \\cos \\theta\\).", "Degrees and radians match like this: \\(30° = \\pi/6\\), \\(45° = \\pi/4\\), \\(60° = \\pi/3\\), \\(90° = \\pi/2\\)."], points: ["\\(\\sin 30° = 1/2\\), \\(\\cos 30° = \\sqrt{3}/2\\), \\(\\tan 30° = \\sqrt{3}/3\\)", "\\(\\sin 45° = \\sqrt{2}/2\\), \\(\\cos 45° = \\sqrt{2}/2\\), \\(\\tan 45° = 1\\)", "\\(\\sin 60° = \\sqrt{3}/2\\), \\(\\cos 60° = 1/2\\), \\(\\tan 60° = \\sqrt{3}\\)", "\\(\\sin 0° = 0\\), \\(\\cos 0° = 1\\), \\(\\sin 90° = 1\\), \\(\\cos 90° = 0\\)"], trap: "Flipping \\(\\sin 30°\\) and \\(\\cos 30°\\): sine of \\(30°\\) is \\(1/2\\), not \\(\\sqrt{3}/2\\).", example: { problem: "Compute \\((\\sin(\\pi/4) + \\cos(\\pi/4)) \\times \\tan(\\pi/4)\\).", steps: ["\\(\\sin(\\pi/4) = \\sqrt{2}/2\\) and \\(\\cos(\\pi/4) = \\sqrt{2}/2\\), so the sum is \\(\\sqrt{2}\\).", "\\(\\tan(\\pi/4) = 1\\), so \\(\\sqrt{2} \\times 1 = \\sqrt{2}\\)."], answer: "\\(\\sqrt{2}\\)" } },
  { id: "trig-signs", no: 2, title: "Quadrant Signs and Terminal-Side Definitions", body: ["A point \\(P(x, y)\\) on the terminal side with \\(r = \\sqrt{x^{2} + y^{2}}\\) defines everything.", "The quadrant decides the sign. Check signs before you write any value.", "Quadrants I to IV go counter-clockwise starting from positive x-axis."], points: ["\\(\\sin \\alpha = y/r\\), \\(\\cos \\alpha = x/r\\), \\(\\tan \\alpha = y/x\\)", "Quadrant I: \\(\\sin > 0\\), \\(\\cos > 0\\), \\(\\tan > 0\\)", "Quadrant II: \\(\\sin > 0\\), \\(\\cos < 0\\), \\(\\tan < 0\\)", "Quadrant III: \\(\\sin < 0\\), \\(\\cos < 0\\), \\(\\tan > 0\\)", "Quadrant IV: \\(\\sin < 0\\), \\(\\cos > 0\\), \\(\\tan < 0\\)"], trap: "Using \\(\\tan \\alpha = y/r\\): tangent divides \\(y\\) by \\(x\\), never by \\(r\\).", example: { problem: "\\(P(1, y)\\) lies on the terminal side of \\(\\alpha\\) and \\(\\tan \\alpha = 2\\). Find \\(y\\).", steps: ["Use \\(\\tan \\alpha = y/x\\) with \\(x = 1\\).", "So \\(y/1 = 2\\), giving \\(y = 2\\)."], answer: "\\(y = 2\\)" } },
  { id: "trig-reduction", no: 3, title: "Reduction Formulas", body: ["Reduction turns big or negative angles into one acute reference angle.", "The function may stay or change, and a sign may appear. Take it in two steps.", "Step one: keep or co-change. Step two: fix the sign by quadrant."], points: ["\\(\\sin(\\pi - \\alpha) = \\sin \\alpha\\), \\(\\cos(\\pi - \\alpha) = -\\cos \\alpha\\)", "\\(\\sin(\\pi/2 - \\alpha) = \\cos \\alpha\\), \\(\\sin(\\pi/2 + \\alpha) = \\cos \\alpha\\)", "\\(\\tan(\\pi + \\alpha) = \\tan \\alpha\\), \\(\\cos(2\\pi - \\alpha) = \\cos \\alpha\\)", "\\(\\sin(-\\alpha) = -\\sin \\alpha\\), \\(\\cos(-\\alpha) = \\cos \\alpha\\)"], trap: "Writing \\(\\tan(\\pi + \\alpha) = -\\tan \\alpha\\): the \\(\\pi\\) shift keeps tangent unchanged and positive.", example: { problem: "Compute \\(\\sin 120°\\).", steps: ["Write \\(120° = 180° - 60°\\), so \\(\\sin 120° = \\sin 60°\\).", "\\(\\sin 60° = \\sqrt{3}/2\\)."], answer: "\\(\\sin 120° = \\sqrt{3}/2\\)" } },
  { id: "trig-find-values", no: 4, title: "Finding Values From Given Info", body: ["One value plus the quadrant locks all the other values.", "Start from \\(\\sin^{2} \\alpha + \\cos^{2} \\alpha = 1\\) to get the missing square.", "Then pick the sign by quadrant, and divide for tangent."], points: ["\\(\\sin^{2} \\alpha + \\cos^{2} \\alpha = 1\\) links sine and cosine", "Square-root gives two signs: quadrant picks the right one", "\\(\\tan \\alpha = \\sin \\alpha / \\cos \\alpha\\) finishes the triple", "Divide \\(\\sin^{2} + \\cos^{2} = 1\\) by \\(\\cos^{2}\\): \\(1 + \\tan^{2} = \\sec^{2}\\); by \\(\\sin^{2}\\): \\(1 + \\cot^{2} = \\csc^{2}\\)", "Acute angle: all three of \\(\\sin\\), \\(\\cos\\), \\(\\tan\\) are positive"], trap: "Taking the positive root automatically: in quadrant II, \\(\\cos \\alpha\\) must be negative.", example: { problem: "Given \\(\\sin \\alpha = 3/5\\) with \\(\\alpha\\) in quadrant II, find \\(\\cos \\alpha\\) and \\(\\tan \\alpha\\).", steps: ["\\(\\cos^{2} \\alpha = 1 - 9/25 = 16/25\\), and quadrant II gives \\(\\cos \\alpha = -4/5\\).", "\\(\\tan \\alpha = (3/5)/(-4/5) = -3/4\\)."], answer: "\\(\\cos \\alpha = -4/5\\), \\(\\tan \\alpha = -3/4\\)" } },
];

export const LESSONS_TRIG_IDENTITIES: FunctionsLesson[] = [
  { id: "double-angle", no: 5, title: "Double-Angle Formulas", body: ["Double-angle turns \\(2\\alpha\\) into \\(\\alpha\\). CSCA gives one trig value and asks for \\(\\sin 2\\alpha\\) or \\(\\cos 2\\alpha\\).", "For \\(\\cos 2\\alpha\\) pick the form that matches what you know. If you know \\(\\sin\\alpha\\), use \\(1 - 2\\sin^{2}\\alpha\\)."], points: ["\\(\\sin 2\\alpha = 2\\sin\\alpha\\cos\\alpha\\)", "\\(\\cos 2\\alpha = \\cos^{2}\\alpha - \\sin^{2}\\alpha\\)", "\\(\\cos 2\\alpha = 2\\cos^{2}\\alpha - 1 = 1 - 2\\sin^{2}\\alpha\\)", "\\(\\tan 2\\alpha = 2\\tan\\alpha / (1 - \\tan^{2}\\alpha)\\)", "Find the missing \\(\\sin\\) or \\(\\cos\\) first with \\(\\sin^{2} + \\cos^{2} = 1\\)"], trap: "Using \\(\\cos 2\\alpha = 2\\cos^{2}\\alpha - 1\\) when you only know \\(\\sin\\). Use \\(1 - 2\\sin^{2}\\alpha\\) instead.", example: { problem: "Given \\(\\sin\\alpha = 1/4\\), find \\(\\cos 2\\alpha\\).", steps: ["Pick \\(\\cos 2\\alpha = 1 - 2\\sin^{2}\\alpha\\).", "\\(\\cos 2\\alpha = 1 - 2 \\times 1/16 = 1 - 1/8\\)."], answer: "\\(7/8\\)" } },
  { id: "half-angle", no: 6, title: "Half-Angle Formulas", body: ["Half-angle turns \\(\\alpha\\) into \\(\\alpha/2\\). CSCA gives \\(\\cos\\alpha\\) and asks for \\(\\sin(\\alpha/2)\\) or \\(\\cos(\\alpha/2)\\).", "The square root gives \\(\\pm\\). The quadrant of \\(\\alpha/2\\) picks the sign. Halve the interval first."], points: ["\\(\\sin^{2}(\\alpha/2) = (1 - \\cos\\alpha)/2\\)", "\\(\\cos^{2}(\\alpha/2) = (1 + \\cos\\alpha)/2\\)", "\\(\\tan(\\alpha/2) = \\sin\\alpha / (1 + \\cos\\alpha)\\)", "Halve the whole interval: \\(\\alpha \\in (0, \\pi/2) \\Rightarrow \\alpha/2\\) in QI; \\((\\pi/2, \\pi) \\Rightarrow\\) QI; \\((\\pi, 3\\pi/2) \\Rightarrow\\) QII; \\((3\\pi/2, 2\\pi) \\Rightarrow\\) QII", "If \\(\\alpha \\in (\\pi/2, \\pi)\\), then \\(\\alpha/2 \\in (\\pi/4, \\pi/2)\\), so QI"], trap: "Keeping \\(\\pm\\) in the answer. Acute \\(\\alpha/2\\) means positive only.", example: { problem: "\\(\\cos\\alpha = -1/2\\), \\(\\alpha \\in (\\pi/2, \\pi)\\). Find \\(\\sin(\\alpha/2)\\).", steps: ["\\(\\alpha/2\\) is in QI, so take the positive root.", "\\(\\sin^{2} = (1 + 1/2)/2 = 3/4\\), so \\(\\sin = \\sqrt{3}/2\\)."], answer: "\\(\\sqrt{3}/2\\)" } },
  { id: "sum-difference", no: 7, title: "Sum and Difference Formulas", body: ["Some angles split into special ones. \\(75^{\\circ} = 45^{\\circ} + 30^{\\circ}\\). \\(\\pi/12 = \\pi/4 - \\pi/6\\).", "Write the split, apply the formula, then plug in the special values."], points: ["\\(\\sin(A \\pm B) = \\sin A\\cos B \\pm \\cos A\\sin B\\)", "\\(\\cos(A + B) = \\cos A\\cos B - \\sin A\\sin B\\)", "\\(\\cos(A - B) = \\cos A\\cos B + \\sin A\\sin B\\)", "\\(\\cos(\\pi/4) = \\sin(\\pi/4) = \\sqrt{2}/2\\)"], trap: "Wrong sign in \\(\\cos(A - B)\\). Minus inside becomes plus outside.", example: { problem: "Find \\(\\cos 75^{\\circ}\\).", steps: ["\\(\\cos(45^{\\circ} + 30^{\\circ}) = \\cos45^{\\circ}\\cos30^{\\circ} - \\sin45^{\\circ}\\sin30^{\\circ}\\).", "\\(= \\sqrt{2}/2 \\times \\sqrt{3}/2 - \\sqrt{2}/2 \\times 1/2\\)."], answer: "\\((\\sqrt{6} - \\sqrt{2})/4\\)" } },
  { id: "tan-from-ratio", no: 8, title: "Tan From Sin-Cos Ratio", body: ["CSCA hides \\(\\tan\\) inside \\(\\sin\\) and \\(\\cos\\). One classic is \\((\\cos - \\sin)/(\\cos + \\sin)\\).", "Divide top and bottom by \\(\\cos\\alpha\\). Every \\(\\sin/\\cos\\) becomes \\(\\tan\\)."], points: ["\\(\\tan\\alpha = \\sin\\alpha / \\cos\\alpha\\)", "Divide each term by \\(\\cos\\alpha\\) to make \\(\\tan\\).", "\\((1 - t)/(1 + t) = k\\) solves to \\(t = (1 - k)/(1 + k)\\)", "Acute \\(\\cos = 2/3\\) gives \\(\\sin = \\sqrt{5}/3\\), \\(\\tan = \\sqrt{5}/2\\)"], trap: "Cross-multiplying before dividing by \\(\\cos\\). Divide first, then solve for \\(t\\).", example: { problem: "\\((\\cos\\alpha - \\sin\\alpha)/(\\cos\\alpha + \\sin\\alpha) = 1/3\\). Find \\(\\tan\\alpha\\).", steps: ["Divide by \\(\\cos\\alpha\\): \\((1 - t)/(1 + t) = 1/3\\).", "\\(3 - 3t = 1 + t\\), so \\(4t = 2\\)."], answer: "\\(1/2\\)" } },
];

export const LESSONS_TRIG_GRAPHS: FunctionsLesson[] = [
  { id: "sincos-graphs", no: 9, title: "Sin and Cos Graphs", body: ["Sine starts at \\(0\\), rises to \\(1\\) at \\(\\pi/2\\), returns to \\(0\\) at \\(\\pi\\), dips to \\(-1\\) at \\(3\\pi/2\\).", "Cosine starts at \\(1\\), falls to \\(0\\) at \\(\\pi/2\\), to \\(-1\\) at \\(\\pi\\), and back to \\(1\\) at \\(2\\pi\\).", "Both repeat every \\(2\\pi\\), with domain \\(\\mathbb{R}\\) and range \\([-1, 1]\\)."], points: ["\\(\\sin x\\): zeros at \\(x = k\\pi\\), max \\(1\\) at \\(x = \\pi/2 + 2k\\pi\\), min \\(-1\\) at \\(x = 3\\pi/2 + 2k\\pi\\).", "\\(\\cos x\\): zeros at \\(x = \\pi/2 + k\\pi\\), max \\(1\\) at \\(x = 2k\\pi\\), min \\(-1\\) at \\(x = \\pi + 2k\\pi\\).", "Parity: \\(\\sin(-x) = -\\sin x\\) (odd, origin symmetry); \\(\\cos(-x) = \\cos x\\) (even, y-axis symmetry).", "Odd with domain \\(\\mathbb{R}\\) passes through origin: \\(\\sin 0 = 0\\); even keeps \\(\\cos 0 = 1\\)."], trap: "Sine is odd and cosine is even: \\(\\sin(-x) = -\\sin x\\) but \\(\\cos(-x) = \\cos x\\); do not give both the same sign.", example: { problem: "For \\(y = \\sin x\\), state the max, min, and \\(\\sin(-\\pi/6)\\).", steps: ["Max is \\(1\\), min is \\(-1\\); range is \\([-1, 1]\\).", "Sine is odd: \\(\\sin(-\\pi/6) = -\\sin(\\pi/6) = -1/2\\)."], answer: "Max \\(1\\), min \\(-1\\), \\(\\sin(-\\pi/6) = -1/2\\)." } },
  { id: "period-amplitude-phase", no: 10, title: "Period, Amplitude and Phase Shifts", body: ["For \\(y = A\\sin(Bx + \\varphi)\\), \\(|A|\\) sets the height and \\(|B|\\) squeezes the wave.", "The wave repeats when the inside grows by \\(2\\pi\\), so the period shrinks as \\(|B|\\) grows.", "The shift comes from the inside zero \\(Bx + \\varphi = 0\\), not from \\(\\varphi\\) alone."], points: [    "Amplitude \\(= |A|\\); range of \\(A\\sin(Bx+\\varphi)\\) is \\([-|A|, |A|]\\).", "Sin/cos period \\(T = 2\\pi/|B|\\); tan period \\(T = \\pi/|B|\\).", "Phase shift \\(= -\\varphi/B\\) (negative means right, positive means left).", "Combo: \\(a\\sin x + b\\cos x\\) peaks at \\(R = \\sqrt{a^{2}+b^{2}}\\): max \\(R\\), min \\(-R\\); e.g. \\(3\\sin x + 4\\cos x\\) peaks at \\(5\\).", "Vertical shift \\(+k\\) moves min/max: \\(y = A\\sin(Bx) + k\\) has max \\(|A| + k\\), min \\(-|A| + k\\)."],   trap: "Tan period is \\(\\pi\\), not \\(2\\pi\\): \\(y = \\tan(3x)\\) has \\(T = \\pi/3\\); and shift is \\(-\\varphi/B\\), not \\(\\varphi\\). Max of \\(3\\sin x + 4\\cos x\\) is \\(5\\), not \\(3+4=7\\): the two peaks never align.", example: { problem: "State the amplitude and min positive period of \\(y = 3\\sin(2x)\\).", steps: ["Amplitude \\(= |3| = 3\\); range is \\([-3, 3]\\).", "Period \\(T = 2\\pi/|2| = \\pi\\)."], answer: "Amplitude \\(3\\), min positive period \\(\\pi\\)." } },
  { id: "tan-graph", no: 11, title: "Tan Graph Essentials", body: ["Tan passes through the origin, rises through each interval, then jumps at each break.", "It has no top or bottom: it runs from \\(-\\infty\\) to \\(+\\infty\\) on every branch.", "Each break is a vertical asymptote where \\(\\cos x = 0\\)."], points: ["\\(\\tan x = \\sin x/\\cos x\\); undefined where \\(\\cos x = 0\\), i.e. \\(x = \\pi/2 + k\\pi\\).", "Asymptotes \\(x = \\pi/2 + k\\pi\\); domain excludes these points.", "Period \\(\\pi\\): \\(\\tan(x + \\pi) = \\tan x\\); zeros at \\(x = k\\pi\\).", "Odd function: \\(\\tan(-x) = -\\tan x\\); range is \\(\\mathbb{R}\\) (no amplitude)."], trap: "Tan range is all reals \\(\\mathbb{R}\\), not \\([-1, 1]\\); and its domain is never all of \\(\\mathbb{R}\\).", example: { problem: "On \\((-\\pi, \\pi)\\), where is \\(y = \\tan x\\) undefined?", steps: ["\\(\\tan x = \\sin x/\\cos x\\), undefined where \\(\\cos x = 0\\).", "Inside \\((-\\pi, \\pi)\\) that is \\(x = -\\pi/2\\) and \\(x = \\pi/2\\)."], answer: "Undefined at \\(x = -\\pi/2, \\pi/2\\); both are vertical asymptotes." } },
  { id: "trig-equations", no: 12, title: "Solving Basic Trig Equations",
  body: ["A trig equation gives a family of answers, never one angle. Find the reference angle first, then the branches.",
  "Sine is positive in QI and QII, so \\(\\sin x = c > 0\\) has two branches per period. Cosine pairs QI with QIV.",
  "Add \\(2k\\pi\\) for sin/cos (two branches) or \\(k\\pi\\) for tan (one branch), then keep only what the interval asks for."],
  points: ["Reference angle first: \\(\\sin x = 1/2 \\Rightarrow \\alpha = \\pi/6\\).",
  "\\(\\sin x = c\\): \\(x = \\alpha + 2k\\pi\\) or \\(x = \\pi - \\alpha + 2k\\pi\\).",
  "\\(\\cos x = c\\): \\(x = \\pm\\alpha + 2k\\pi\\).",
  "\\(\\tan x = c\\): \\(x = \\alpha + k\\pi\\).",
  "Always filter to the required interval last."],
  trap: "Reporting only \\(\\pi/6\\) for \\(\\sin x = 1/2\\) on \\([0, 2\\pi)\\). The QII branch \\(5\\pi/6\\) counts too.",
  example: { problem: "Solve \\(\\sin x = 1/2\\) for \\(x \\in [0, 2\\pi)\\).",
  steps: ["Reference angle \\(\\pi/6\\); sine positive in QI and QII.",
  "QI gives \\(\\pi/6\\), QII gives \\(\\pi - \\pi/6 = 5\\pi/6\\); both lie in range."],
  answer: "\\(x = \\pi/6\\) or \\(5\\pi/6\\)" } },
];

export const LESSONS_FOUNDATIONS: FunctionsLesson[] = [
  { id: "domain-range", no: 13, title: "Domain and Range Basics", body: ["Domain is all \\(x\\) you can put in. Range is all \\(y\\) you can get out.", "CSCA loves roots, fractions, and logs. Each one blocks some \\(x\\).", "Write each rule on its own line. Keep only \\(x\\) that pass every rule."], points: ["\\(\\sqrt{g(x)}\\) needs \\(g(x) \\ge 0\\)", "\\(1/g(x)\\) needs \\(g(x) \\ne 0\\)", "\\(\\log_{a}(g(x))\\) needs \\(g(x) > 0\\)", "Range of \\((x-h)^{2}+k\\) is \\([k,\\infty)\\)"], trap: "Fixing the root but forgetting the fraction, like giving \\([2,\\infty)\\) for \\(\\sqrt{x-2}+1/(x-5)\\) instead of \\([2,5)\\cup(5,\\infty)\\).", example: { problem: "Find the domain of \\(f(x)=1/x+\\sqrt{1-x}\\).", steps: ["Need \\(x \\ne 0\\) and \\(1-x \\ge 0\\).", "So \\(x \\le 1\\) with \\(x \\ne 0\\)."],   answer: "\\((-\\infty,0)\\cup(0,1]\\)" } },
  { id: "quadratics", no: 14, title: "Quadratics: Vertex, Range and Completing the Square",
  body: ["Complete the square to read a quadratic: \\(x^{2} - 4x + 1 = (x-2)^{2} - 3\\). The squared part is never negative.",
  "Vertex form \\((x-h)^{2} + k\\) shows the vertex \\((h, k)\\) at once.",
  "If \\(a > 0\\) the parabola opens up: minimum \\(k\\), range \\([k, \\infty)\\). If \\(a < 0\\) it opens down: maximum \\(k\\)."],
  points: ["\\(x^{2} - 4x + 1 = (x-2)^{2} - 3\\): vertex \\((2, -3)\\), range \\([-3, \\infty)\\).",
  "Vertex shortcut: \\(x = -b/2a\\), then \\(y = f(-b/2a)\\).",
  "\\(a > 0\\): range \\([y_{v}, \\infty)\\); \\(a < 0\\): range \\((-\\infty, y_{v}]\\).",
  "Check the vertex by plugging back in."],
  trap: "Keeping \\([-3, \\infty)\\) for \\(-x^{2} + 4x - 1\\). Negative \\(a\\) flips it to \\((-\\infty, -3]\\).",
  example: { problem: "Find the range of \\(f(x) = x^{2} - 4x + 1\\).",
  steps: ["Complete the square: \\(f(x) = (x-2)^{2} - 3\\).",
  "\\((x-2)^{2} \\ge 0\\), so \\(f(x) \\ge -3\\), equality at \\(x = 2\\)."],
  answer: "\\([-3, \\infty)\\)" } },
  { id: "composite-shifted-domains", no: 15, title: "Composite and Shifted Domains", body: ["For \\(f(g(x))\\), the inside \\(g(x)\\) must stay in the domain of \\(f\\).", "For \\(1/\\lg|x-5|\\), two rules fire at once. Check both.", "Shifts like \\(|x-5|\\) move the bad points. Do not guess them."], points: ["Need \\(g(x)\\) in the domain of \\(f\\)", "Need \\(|x-5| > 0\\), so \\(x \\ne 5\\)", "Need \\(\\lg|x-5| \\ne 0\\), so \\(x \\ne 4,6\\)", "Solve \\(-1 < x^{2}-1 < 0\\) as \\(0 < x^{2} < 1\\)"], trap: "Only removing \\(x=5\\) for \\(1/\\lg|x-5|\\) and missing \\(x=4,6\\) where the log is zero.", example: { problem: "If \\(f\\) has domain \\((-1,0)\\), find the domain of \\(f(x^{2}-1)\\).", steps: ["Need \\(-1 < x^{2}-1 < 0\\).", "Add 1: \\(0 < x^{2} < 1\\).", "So \\(x \\in (-1,0)\\cup(0,1)\\)."], answer: "\\((-1,0)\\cup(0,1)\\)" } },
  { id: "same-function-test", no: 16, title: "Same Function Test", body: ["Two functions match only if domains match and rules match.", "First compare domains. Then simplify the rules.", "One bad \\(x\\) is enough to say not the same."], points: ["Check domain first, then rule", "\\(\\sqrt{x^{2}}=|x|\\), not \\(x\\)", "\\((\\sqrt{x})^{2}\\) has domain \\([0,\\infty)\\)", "\\((x^{4}-1)/(x^{2}+1)=x^{2}-1\\) on \\(\\mathbb{R}\\)"], trap: "Saying \\(x\\) and \\(\\sqrt{x^{2}}\\) are the same. At \\(x=-1\\), one gives \\(-1\\) and one gives \\(1\\).", example: { problem: "Are \\((x^{4}-1)/(x^{2}+1)\\) and \\(x^{2}-1\\) the same function?", steps: ["Denominator \\(x^{2}+1 \\ne 0\\) always, so domain is \\(\\mathbb{R}\\).", "Factor top: \\((x^{2}-1)(x^{2}+1)/(x^{2}+1)=x^{2}-1\\)."], answer: "Yes, same function on \\(\\mathbb{R}\\)" } },
  { id: "inverse-functions", no: 17, title: "Inverse Functions", body: ["Inverse swaps \\(x\\) and \\(y\\). Write \\(x=\\) in \\(y\\), then solve for \\(y\\).", "Lines and odd cubes keep domain \\(\\mathbb{R}\\). Log shifts keep \\(x\\) limits.", "Domain of \\(f\\) becomes range of \\(f^{-1}\\)."], points: ["Steps: swap \\(x\\) and \\(y\\), then solve", "\\(y=x^{3}+3\\) gives \\(y=\\sqrt[3]{x-3}\\)", "\\(y=10x+3\\) gives \\(y=(x-3)/10\\)", "Strictly monotonic on an interval \\(\\Rightarrow\\) invertible there, and the inverse keeps the direction", "\\(y=2+\\log_{a}(x-3)\\) needs \\(x > 3\\)"], trap: "Adding \\(x \\ge 3\\) to \\(y=\\sqrt[3]{x-3}\\). Cube roots accept every real \\(x\\).", example: { problem: "Find the inverse of \\(y=x^{3}+3\\).", steps: ["Swap: \\(x=y^{3}+3\\).", "Solve: \\(y^{3}=x-3\\), so \\(y=\\sqrt[3]{x-3}\\)."], answer: "\\(y=\\sqrt[3]{x-3}\\), \\(x \\in \\mathbb{R}\\)" } },
  { id: "monotonicity-parity", no: 18, title: "Monotonicity and Parity", body: ["Increasing means bigger \\(x\\) gives bigger \\(y\\). Decreasing flips it.", "Even means \\(f(-x)=f(x)\\). Odd means \\(f(-x)=-f(x)\\).", "Test with \\(f(-x)\\). Never guess from one term."], points: ["\\(a > 1\\): \\(a^{x}\\) rises; \\(0 < a < 1\\): it falls", "\\(|x|\\) falls for \\(x < 0\\), rises for \\(x > 0\\)", "Even: \\(\\cos x\\), \\(x\\sin x\\); odd: \\(\\sin x\\), \\(-x\\)", "Products: even \\(\\times\\) even = even; odd \\(\\times\\) odd = even; even \\(\\times\\) odd = odd (so \\(x \\cdot \\sin x\\) is even)", "Sums keep like parity only: odd \\(\\pm\\) odd = odd, even \\(\\pm\\) even = even", "Odd and defined at \\(0\\) \\(\\Rightarrow f(0) = 0\\); predict symmetric values, e.g. odd \\(f(2) = 7 \\Rightarrow f(-2) = -7\\)", "Parity needs a symmetric domain first: defined only for \\(x \\ge 0\\) means neither", "Odd plus constant is neither, like \\(x^{3}+1\\)"], trap: "Calling \\(x^{3}+1\\) odd because of \\(x^{3}\\). The \\(+1\\) breaks it, so it is neither.", example: { problem: "Check the parity of \\(f(x)=x\\sin x\\).", steps: ["Compute \\(f(-x)=(-x)\\sin(-x)\\).", "Use \\(\\sin(-x)=-\\sin x\\): product is \\(x\\sin x\\)."], answer: "Even, since \\(f(-x)=f(x)\\)" } },
  { id: "mono-families", no: 19, title: "Monotonicity of Lines, Cubics and Reciprocals",
  body: ["\\(y = mx + b\\) follows its slope: \\(m > 0\\) rises everywhere, \\(m < 0\\) falls everywhere.",
  "\\(y = x^{3}\\) rises on all of \\(\\mathbb{R}\\). \\(y = x^{2} + 1\\) does not: it falls left of \\(0\\) and rises right of \\(0\\).",
  "\\(y = -1/x\\) falls on \\((-\\infty, 0)\\) and falls on \\((0, \\infty)\\) — but \\(x = 0\\) splits the domain, so it is NOT decreasing on \\(\\mathbb{R}\\)."],
  points: ["\\(m > 0\\): line rises on \\(\\mathbb{R}\\); \\(m < 0\\): falls on \\(\\mathbb{R}\\) (e.g. \\(y = -x + 5\\)).",
  "\\(x^{3}\\) is strictly increasing on \\(\\mathbb{R}\\).",
  "Even powers are never monotone on \\(\\mathbb{R}\\): split at the vertex.",
  "\\(-1/x\\): decreasing on each branch, undefined at \\(0\\) — never claim it for the whole \\(\\mathbb{R}\\).",
  "Sums and compositions: increasing + increasing = increasing; two decreasing compose to increasing; mixed composes to decreasing."],
  trap: "Calling \\(-1/x\\) decreasing on \\((-\\infty, +\\infty)\\). The hole at \\(0\\) breaks the claim — name each branch.",
  example: { problem: "Which decreases on \\((-\\infty, +\\infty)\\): \\(y = -x+5\\), \\(y = x^{3}\\), \\(y = x^{2}+1\\), \\(y = -1/x\\)?",
  steps: ["\\(y = -x+5\\) has slope \\(-1 < 0\\): falls everywhere.",
  "\\(x^{3}\\) rises; \\(x^{2}+1\\) turns at \\(0\\); \\(-1/x\\) is undefined at \\(0\\)."],
  answer: "\\(y = -x + 5\\)" } },
  { id: "lines-as-functions", no: 20, title: "Lines as Functions: Slope, Equations, Intersections",
  body: ["Slope measures direction: \\(m = (y_{2}-y_{1})/(x_{2}-x_{1})\\), and also \\(m = \\tan\\theta\\) for inclination \\(\\theta\\).",
  "Point-slope builds the equation: \\(y - y_{1} = m(x - x_{1})\\).",
  "Two lines meet where their functions agree: solve \\(f(x) = g(x)\\), then check in both. Mirror \\((x, y)\\) across the x-axis to \\((x, -y)\\)."],
  points: ["\\(m = (y_{2}-y_{1})/(x_{2}-x_{1})\\): e.g. \\((-2,3)\\), \\((3,1)\\) give \\(m = -2/5\\).",
  "\\(m = \\tan\\theta\\): \\(60^{\\circ} \\Rightarrow \\sqrt{3}\\); \\(45^{\\circ} \\Rightarrow 1\\), so through \\((0,2)\\) that is \\(y = x+2\\).",
  "Point-slope: slope \\(-3\\) through \\((1,2)\\) is \\(y - 2 = -3(x-1)\\), i.e. \\(3x + y - 5 = 0\\).",
  "Intersection: substitute one line into the other, solve, verify in both equations.",
  "Linear-in-\\(n\\) bonus: \\(a_{n} = 2n-1\\) gives \\(1, 3, 5, \\ldots\\), constant step \\(2\\)."],
  trap: "Solving the system but checking in only one line. A slip survives unless both equations confirm it.",
  example: { problem: "Line with slope \\(-3\\) through \\((1,2)\\): equation?",
  steps: ["Point-slope: \\(y - 2 = -3(x - 1)\\).",
  "Expand: \\(y = -3x + 5\\), i.e. \\(3x + y - 5 = 0\\)."],
  answer: "\\(3x + y - 5 = 0\\)" } },
];

export const LESSONS_FAMILIES: FunctionsLesson[] = [
  { id: "power-compare", no: 21, title: "Power Functions and Comparisons",
  body: ["A power function looks like \\(y = x^{n}\\).",
  "Even \\(n\\) gives a U shape. Odd \\(n\\) goes through \\( (0,0) \\).",
  "For big \\(x\\), exponential beats power, and power beats log."],
  points: ["\\(x^{a} \\cdot x^{b} = x^{a+b}\\) and \\((x^{a})^{b} = x^{ab}\\).",
  "\\(x^{-n} = 1/x^{n}\\) for \\(x \\ne 0\\).",
  "\\((xy)^{n} = x^{n}y^{n}\\); \\((x/y)^{n} = x^{n}/y^{n}\\) \\((y \\ne 0)\\); \\(x^{1/2} = \\sqrt{x}\\) \\((x \\ge 0)\\).",
  "\\(x^{m/n} =\\) n-th root of \\(x^{m}\\).",
  "Same exponent \\(>0\\): bigger base wins.",
  "Same base \\(>1\\): bigger exponent wins; same base in \\((0,1)\\): order flips, e.g. \\((1/2)^{3} > (1/2)^{5}\\).",
  "Negative exponents flip first: \\(2.1^{-2} > 1.2^{-2}\\) is false because \\(1/2.1^{2} < 1/1.2^{2}\\).",
  "Plug points in to find coefficients: \\(y = ax^{2}\\) through \\((1,2)\\) gives \\(2 = a\\), so \\(a = 2\\).",
  "Unify first: radicals to fractional exponents, e.g. \\((8x^{6})^{1/3} = 2x^{2}\\)."],
  trap: "Never write \\(\\sqrt{x^{2}} = x\\). It is \\(|x|\\).",
  example: { problem: "Compare \\(2.1^{2/3}\\) and \\(1.2^{2/3}\\).",
  steps: ["Same positive exponent \\(2/3\\).",
  "Base \\(2.1 > 1.2\\), so order stays."],
  answer: "\\(2.1^{2/3} > 1.2^{2/3}\\)" } },
  { id: "exp-graphs", no: 22, title: "Exponential Graphs and Monotonicity",
  body: ["\\(y = a^{x}\\) needs \\(a > 0\\) and \\(a \\ne 1\\).",
  "It is always positive. It passes through \\((0,1)\\).",
  "If \\(a > 1\\) it rises. If \\(0 < a < 1\\) it falls."],
  points: ["Domain is \\(R\\). Range is \\((0, +\\infty)\\).",
  "\\(a^{x} \\cdot a^{y} = a^{x+y}\\); \\(a^{x}/a^{y} = a^{x-y}\\); \\((a^{x})^{y} = a^{xy}\\); \\((ab)^{x} = a^{x}b^{x}\\).",
  "\\(a^{0} = 1\\) and \\(a^{-x} = 1/a^{x}\\).",
  "\\(a > 1\\): increasing. \\(0 < a < 1\\): decreasing.",
  "\\(a^{x} > 0\\) always, so \\(a^{x} = -3\\) has no root."],
  trap: "Base \\(0.75 < 1\\) flips order. So \\(0.75^{-0.2} < 0.75^{-0.4}\\). From \\(a > b\\) alone, \\(1/a < 1/b\\) fails (try \\(a=1, b=-2\\)), \\(a^{2} > b^{2}\\) fails (try \\(a=1, b=-1\\)), \\(\\sin a > \\sin b\\) fails (sine oscillates).",
  example: { problem: "Compare \\(2^{4.5}\\) and \\(2^{5}\\).",
  steps: ["Base \\(2 > 1\\), so \\(2^{x}\\) is increasing.",
  "Since \\(4.5 < 5\\), the left side is smaller."],
  answer: "\\(2^{4.5} < 2^{5}\\)" } },
  { id: "exp-equations", no: 23, title: "Exponential Equations",
  body: ["First try to make the same base on both sides.",
  "Then set the exponents equal.",
  "If bases differ, take logs on both sides."],
  points: ["\\(a^{f} = a^{g}\\) gives \\(f = g\\).",
  "Rewrite \\(16 = 2^{4}\\) and \\(1/9 = 3^{-2}\\).",
  "If bases differ: \\(x = \\log_{a} b\\) solves \\(a^{x} = b\\).",
  "\\(e \\approx 2.718\\). \\(e^{x}\\) is its own derivative."],
  trap: "Do not equate exponents when bases differ.",
  example: { problem: "Solve \\(2^{x+1} = 16\\).",
  steps: ["Write \\(16 = 2^{4}\\).",
  "Same base gives \\(x+1 = 4\\)."],
  answer: "\\(x = 3\\)" } },
  { id: "log-laws", no: 24, title: "Log Laws and Change of Base",
  body: ["\\(\\log_{a} x\\) asks for the exponent on \\(a\\).",
  "It needs \\(x > 0\\), \\(a > 0\\), \\(a \\ne 1\\).",
  "Condense to one log before solving."],
  points: ["\\(\\log_{a}(xy) = \\log_{a} x + \\log_{a} y\\).",
  "\\(\\log_{a}(x/y) = \\log_{a} x - \\log_{a} y\\).",
  "\\(\\log_{a}(x^{n}) = n \\cdot \\log_{a} x\\).",
  "\\(\\log_{a} x = \\ln x / \\ln a\\); flipped form \\(\\log_{a} b = 1 / \\log_{b} a\\).",
  "\\(\\log_{a} a = 1\\), \\(\\log_{a} 1 = 0\\) and \\(\\ln e = 1\\).",
  "\\(a > 1\\): \\(\\log_{a} x\\) rises like \\(a^{x}\\); \\(0 < a < 1\\): it falls — same direction rule as exponentials."],
  trap: "Never split \\(\\log(x+y)\\) into \\(\\log x + \\log y\\). And never call \\(\\log_{a} x\\) increasing without checking: base \\(0.5\\) means decreasing.",
  example: { problem: "Compute \\(\\log_{2} 32 + \\log_{2}(1/4)\\).",
  steps: ["Condense: \\(\\log_{2}(32 \\cdot 1/4) = \\log_{2} 8\\).",
  "Since \\(2^{3} = 8\\), the value is \\(3\\)."],
  answer: "\\(3\\)" } },
  { id: "log-equations", no: 25, title: "Log Equations and Graphs",
  body: ["\\(y = \\log_{a} x\\) passes through \\((1,0)\\).",
  "It is the inverse of \\(y = a^{x}\\).",
  "So \\(f(x) = 2 + \\log_{a}(x-3)\\) passes through \\((4,2)\\)."],
  points: ["\\(\\log_{a} x = y\\) means \\(a^{y} = x\\).",
  "Domain is \\((0, +\\infty)\\). Range is \\(R\\).",
  "Condense to one log per side, then equate arguments.",
  "Check every root in the original line.",
  "\\(e^{\\ln x} = x\\) for \\(x > 0\\)."],
  trap: "Reject any root with argument \\(\\le 0\\). It is extraneous.",
  example: { problem: "Solve \\(\\log_{3}(x+2) = 2\\).",
  steps: ["Rewrite: \\(x+2 = 3^{2} = 9\\), so \\(x = 7\\).",
  "Check: \\(7+2 = 9 > 0\\), valid."],
  answer: "\\(x = 7\\)" } },
];

export const FUNCTIONS_LESSONS: FunctionsLesson[] = [
  ...LESSONS_TRIG_BASICS,
  ...LESSONS_TRIG_IDENTITIES,
  ...LESSONS_TRIG_GRAPHS,
  ...LESSONS_FOUNDATIONS,
  ...LESSONS_FAMILIES,
];

export const FUNCTIONS_OBJECTIVES: string[] = [
  "Evaluate trig functions at special angles from the unit circle.",
  "Fix signs by quadrant and use terminal-side definitions.",
  "Apply reduction, double-angle, half-angle, and sum formulas.",
  "Solve trig equations with two branches and interval filtering.",
  "Read amplitude, period, and phase from \\(A\\sin(Bx+\\varphi)\\).",
  "Find domains of roots, fractions, logs, and composite functions.",
  "Complete the square: vertex and range of quadratics.",
  "Write line equations from slope and points; solve intersections.",
  "Test monotonicity and parity (including mixed terms).",
  "Compare powers and exponentials by base and exponent.",
  "Solve exponential and log equations with domain checks.",
];

export const FUNCTIONS_FORMULAS: { group: string; items: string[] }[] = [
  {
    group: "Trig values",
    items: [
      "\\(\\sin 30° = 1/2\\), \\(\\cos 30° = \\sqrt{3}/2\\), \\(\\tan 30° = \\sqrt{3}/3\\)",
      "\\(\\sin 45° = \\cos 45° = \\sqrt{2}/2\\), \\(\\tan 45° = 1\\)",
      "\\(\\sin 60° = \\sqrt{3}/2\\), \\(\\cos 60° = 1/2\\), \\(\\tan 60° = \\sqrt{3}\\)",
      "\\(\\sin^2\\alpha + \\cos^2\\alpha = 1\\); \\(\\tan\\alpha = \\sin\\alpha/\\cos\\alpha\\)",
    ],
  },
  {
    group: "Identities",
    items: [
      "\\(\\sin 2\\alpha = 2\\sin\\alpha\\cos\\alpha\\)",
      "\\(\\cos 2\\alpha = 1 - 2\\sin^2\\alpha = 2\\cos^2\\alpha - 1\\)",
      "\\(\\sin^2(\\alpha/2) = (1-\\cos\\alpha)/2\\), \\(\\cos^2(\\alpha/2) = (1+\\cos\\alpha)/2\\)",
      "\\(\\sin(A\\pm B) = \\sin A\\cos B \\pm \\cos A\\sin B\\)",
      "\\(\\cos(A-B) = \\cos A\\cos B + \\sin A\\sin B\\)",
      "\\(1 + \\tan^2\\theta = \\sec^2\\theta\\); \\(1 + \\cot^2\\theta = \\csc^2\\theta\\) (divide \\(\\sin^2+\\cos^2=1\\))",
      "\\(\\sin x = c\\): \\(x = \\alpha+2k\\pi\\) or \\(\\pi-\\alpha+2k\\pi\\); \\(\\tan x = c\\): \\(x = \\alpha+k\\pi\\)",
    ],
  },
  {
    group: "Graphs",
    items: [
      "Amplitude \\(|A|\\); sin/cos period \\(2\\pi/|B|\\); tan period \\(\\pi/|B|\\)",
      "\\(\\sin\\) odd, \\(\\cos\\) even, \\(\\tan\\) odd with asymptotes \\(x = \\pi/2+k\\pi\\)",
      "Range \\(A\\sin(Bx)+k\\): \\([-|A|+k, |A|+k]\\)",
    ],
  },
  {
    group: "Domain & parity",
    items: [
      "\\(\\sqrt{g} \\Rightarrow g \\ge 0\\); \\(1/g \\Rightarrow g \\ne 0\\); \\(\\log g \\Rightarrow g > 0\\)",
      "Even: \\(f(-x) = f(x)\\); odd: \\(f(-x) = -f(x)\\); odd at \\(0 \\Rightarrow f(0) = 0\\)",
      "Same function needs same domain AND same rule",
      "Inverse: swap \\(x,y\\), then solve",
    ],
  },
  {
    group: "Quadratics & lines",
    items: [
      "\\((x-h)^{2}+k\\): vertex \\((h,k)\\); \\(a > 0 \\Rightarrow\\) min \\(k\\), \\(a < 0 \\Rightarrow\\) max \\(k\\)",
      "Vertex at \\(x = -b/2a\\); check by plugging back",
      "Slope \\(m = (y_{2}-y_{1})/(x_{2}-x_{1}) = \\tan\\theta\\); line \\(y-y_{1} = m(x-x_{1})\\)",
      "Intersection solves \\(f(x) = g(x)\\); verify in both lines",
    ],
  },
  {
    group: "Power, exp, log",
    items: [
      "\\(x^a x^b = x^{a+b}\\); \\(x^{-n} = 1/x^n\\); \\(\\sqrt{x^2} = |x|\\)",
      "\\(a > 1\\): \\(a^x\\) rises; \\(0<a<1\\): falls; always \\(> 0\\)",
      "\\(a > 1\\): \\(\\log_a x\\) rises; \\(0<a<1\\): falls",
      "\\(\\log_a(xy) = \\log_a x + \\log_a y\\); \\(\\log_a(x^n) = n\\log_a x\\)",
      "\\(\\log_a x = \\ln x/\\ln a\\); reject roots with argument \\(\\le 0\\)",
    ],
  },
];

export const FUNCTIONS_TRAPS: string[] = [
  "Flipping \\(\\sin 30°\\) with \\(\\cos 30°\\).",
  "Using \\(\\tan = y/r\\) instead of \\(y/x\\).",
  "Taking the positive root without checking the quadrant.",
  "Keeping \\(\\pm\\) in a half-angle answer.",
  "Wrong sign in \\(\\cos(A-B)\\).",
  "Giving tan period \\(2\\pi\\) or range \\([-1,1]\\).",
  "Forgetting excluded points in composite/log domains.",
  "Calling \\(x^3+1\\) odd, or \\(x\\) the same as \\(\\sqrt{x^2}\\).",
  "Restricting cube-root domains, or equating exponents across bases.",
  "Splitting \\(\\log(x+y)\\), or keeping log roots with argument \\(\\le 0\\).",
  "Calling \\(\\log_a x\\) increasing without checking a base below 1.",
  "Reporting one trig solution and missing the second branch.",
  "Calling \\(-1/x\\) decreasing on all of \\(\\mathbb{R}\\) (\\(x = 0\\) splits it).",
  "Comparing exponentials without checking whether the base is above or below 1.",
];

export const FUNCTIONS_RECOGNITION: { cue: string; action: string }[] = [
  { cue: "Trig value with π or °", action: "Reduce to an acute special angle, fix sign by quadrant." },
  { cue: "sin x = value on an interval", action: "Reference angle, two branches, add 2kπ (kπ for tan), filter to the interval." },
  { cue: "Vertex / range of a quadratic", action: "Complete the square; sign of a decides min vs max." },
  { cue: "Slope / line equation / intersection", action: "m = Δy/Δx = tanθ; point-slope; solve f = g and check both." },
  { cue: "sin 2α / cos 2α / α/2", action: "Pick the double/half form matching the known value." },
  { cue: "75°, π/12, non-special angle", action: "Split into special angles, apply sum formula." },
  { cue: "(cos±sin)/(cos±sin)", action: "Divide by cos → single tan equation." },
  { cue: "Period / amplitude / min", action: "Read |A|, compute 2π/|B| (π/|B| for tan); a·sin x + b·cos x peaks at √(a²+b²)." },
  { cue: "Domain question", action: "List each rule (root/fraction/log), intersect, keep endpoints honest." },
  { cue: "Same/inverse function", action: "Domains first, then swap-and-solve." },
  { cue: "Odd/even/monotonic", action: "Compute f(−x); test direction on the base." },
  { cue: "Compare powers/exponentials", action: "Same exponent → bigger base; same base → check base vs 1 first." },
  { cue: "aˣ= / log= equations", action: "Unify bases or condense logs; always domain-check roots." },
];

export const FUNCTIONS_CHECKLIST: { group: string; items: string[] }[] = [
  {
    group: "Trigonometry",
    items: [
      "I know all special-angle values cold.",
      "I fix signs by quadrant every time.",
      "I can use double-angle, half-angle, and sum formulas.",
      "I solve trig equations with both branches and interval filter.",
      "I read amplitude, period, and phase from \\(A\\sin(Bx+\\varphi)\\).",
      "I know tan's asymptotes, domain, and period \\(\\pi\\).",
    ],
  },
  {
    group: "Functions & families",
    items: [
      "I find domains of roots, fractions, logs, composites.",
      "I complete the square for quadratics: vertex and range.",
      "I write line equations and intersections; slope is \\(\\tan\\theta\\).",
      "I test same/inverse functions correctly.",
      "I test monotonicity and parity without guessing.",
      "I compare powers and exponentials by base direction.",
      "I solve exp/log equations and reject bad roots.",
    ],
  },
];

export const FUNCTIONS_MEMORY: string[] = [
  "Unit circle: \\(\\cos\\) = x, \\(\\sin\\) = y",
  "QI all +, QII sin, QIII tan, QIV cos",
  "\\(\\sin 2\\alpha = 2\\sin\\alpha\\cos\\alpha\\); \\(\\cos 2\\alpha = 1-2\\sin^2\\alpha\\)",
  "Trig equation: ref angle, two branches, \\(+2k\\pi\\) (tan \\(+k\\pi\\))",
  "Period: \\(2\\pi/|B|\\) (\\(\\pi/|B|\\) for tan)",
  "\\(a\\sin x + b\\cos x\\) peaks at \\(\\sqrt{a^{2}+b^{2}}\\)",
  "Vertex \\(x = -b/2a\\); \\((x-h)^{2}+k \\ge k\\)",
  "Slope \\(= \\Delta y/\\Delta x = \\tan\\theta\\)",
  "Domain: root \\(\\ge 0\\), fraction \\(\\ne 0\\), log \\(> 0\\)",
  "Even: \\(f(-x)=f(x)\\); odd: \\(f(-x)=-f(x)\\); odd at 0 \\(\\Rightarrow f(0)=0\\)",
  "Base > 1 rises; base < 1 falls (exp AND log)",
  "Condense logs, unify bases, check every root",
];
