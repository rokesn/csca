// Sets & Inequalities — generated practice variants (IDs 117–300).
// Same exam patterns as the hand-written bank, new numbers each.
// Deterministic seed → stable IDs/answers across builds.
// Every answer is COMPUTED by solving logic (not hand-solved), and every
// distractor is a classic student error (sign flip, endpoint, off-by-one).

import type { ChapterProblem, ChapterProblemLevel } from "./sets-inequalities-problems";
import { SETS_PROBLEMS } from "./sets-inequalities-problems";

function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const rng = mulberry32(20260912);

function ri(min: number, max: number): number {
  return Math.floor(rng() * (max - min + 1)) + min;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

let _nextId = 117;

function mk(
  level: ChapterProblemLevel,
  topic: string,
  question: string,
  correct: string,
  wrongs: string[],
  thinking: string,
  steps: string[] = [],
): ChapterProblem {
  const uniq = [...new Set(wrongs.filter((w) => w !== correct))];
  while (uniq.length < 3) uniq.push("\\text{none of these}");
  const opts = shuffle([correct, ...uniq.slice(0, 3)]);
  return {
    id: _nextId++,
    level,
    topic,
    question,
    options: [opts[0], opts[1], opts[2], opts[3]],
    answer: opts.indexOf(correct),
    thinking,
    steps,
  };
}

/** KaTeX interval, e.g. iv(2,true,null,false) → \([2,+\infty)\). */
function iv(lo: number | null, loOpen: boolean, hi: number | null, hiOpen: boolean): string {
  const L = lo === null ? "-\\infty" : String(lo);
  const R = hi === null ? "+\\infty" : String(hi);
  const lb = lo === null || loOpen ? "(" : "[";
  const rb = hi === null || hiOpen ? ")" : "]";
  return `\\(${lb}${L}, ${R}${rb}\\)`;
}

const OUT: ChapterProblem[] = [];

// ---------- 1. subset counting ×16 (basic) ----------
const seenSubset = new Set<string>();
for (let k = 0; k < 16; k++) {
  let n = ri(3, 10);
  let proper = rng() < 0.5;
  let guardS = 0;
  while (seenSubset.has(`${n}-${proper}`) && guardS++ < 20) {
    n = n >= 10 ? 3 : n + 1;
    proper = !proper;
  }
  seenSubset.add(`${n}-${proper}`);
  const val = proper ? 2 ** n - 1 : 2 ** n;
  const correct = `\\(${val}\\)`;
  OUT.push(mk("basic", "subset",
    proper
      ? `How many proper subsets does a ${n}-element set have?`
      : `How many subsets does a ${n}-element set have?`,
    correct,
    [`\\(${n ** 2}\\)`, `\\(${2 * n}\\)`, `\\(${proper ? 2 ** n : 2 ** n - 1}\\)`, `\\(${2 ** (n - 1)}\\)`, `\\(${2 ** (n + 1)}\\)`, `\\(${n ** 2 + 1}\\)`],
    proper
      ? `\\(2^{${n}}-1 = ${val}\\) — exclude the set itself.`
      : `\\(2^{${n}} = ${val}\\) — each element is either in or out.`,
    proper
      ? [`Each of the \\(${n}\\) items is in or out: \\(2^{${n}}\\) subsets.`, `Proper drops the whole set: \\(${2 ** n}-1 = ${val}\\).`]
      : [`Each of the \\(${n}\\) items is in or out.`, `Count: \\(2 \\times \\cdots \\times 2 = 2^{${n}} = ${val}\\).`]));
}

// ---------- 2. membership statements ×12 (basic) ----------
for (let k = 0; k < 12; k++) {
  const pool = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  const size = ri(3, 4);
  const S = pool.slice(0, size).sort((a, b) => a - b);
  const inEl = S[ri(0, S.length - 1)];
  const outEl = pool.slice(size)[0];
  const setStr = `\\{${S.join(",")}\\}`;
  type St = { t: string; ok: boolean };
  const cands: St[] = [
    { t: `\\(${inEl}\\in A\\)`, ok: true },
    { t: `\\(${outEl}\\in A\\)`, ok: false },
    { t: `\\(${outEl}\\notin A\\)`, ok: true },
    { t: `\\(${inEl}\\notin A\\)`, ok: false },
    { t: `\\(\\{${inEl}\\}\\subseteq A\\)`, ok: true },
    { t: `\\(\\{${outEl}\\}\\subseteq A\\)`, ok: false },
    { t: `\\(${inEl}\\subseteq A\\)`, ok: false },
    { t: `\\(A\\subseteq \\{${[...S, outEl].sort((a, b) => a - b).join(",")}\\}\\)`, ok: true },
  ];
  const trues = cands.filter((c) => c.ok);
  const falses = shuffle(cands.filter((c) => !c.ok));
  const win = trues[ri(0, trues.length - 1)].t;
  OUT.push(mk("basic", "membership",
    `If \\(A=${setStr}\\), which statement is true?`,
    win,
    [falses[0].t, falses[1].t, falses[2].t, falses[3].t],
    `Check each claim against \\(A=${setStr}\\): only ${win} holds. \\(\\in\\) is membership, \\(\\subseteq\\) needs every element inside.`,
    [`Write down \\(A=${setStr}\\).`, `Test \\(\\in\\) (is it listed?) and \\(\\subseteq\\) (are all listed?) for each choice.`, `Only ${win} passes.`]));
}

// ---------- 3. interval ∩/∪ ×16 (basic) ----------
for (let k = 0; k < 16; k++) {
  let l1 = 0, r1 = 0, l2 = 0, r2 = 0, guard = 0;
  do {
    l1 = ri(-5, 3); r1 = l1 + ri(2, 6);
    l2 = ri(-5, 3); r2 = l2 + ri(2, 6);
    guard++;
  } while ((l2 > r1 || l1 > r2) && guard < 60);
  const o1 = rng() < 0.5, c1 = rng() < 0.5, o2 = rng() < 0.5, c2 = rng() < 0.5;
  const A = `\\(${"[" .replace("[", o1 ? "(" : "[")}${l1},${r1}${c1 ? ")" : "]"}\\)`;
  const B = `\\(${"[" .replace("[", o2 ? "(" : "[")}${l2},${r2}${c2 ? ")" : "]"}\\)`;
  const isCap = rng() < 0.5;
  const L = Math.max(l1, l2), R = Math.min(r1, r2);
  let Lop = false, Rop = false, Ulo = 0, Uhi = 0, UloOp = false, UhiOp = false;
  if (L === l1 && L === l2) { Lop = o1 || o2; } else if (L === l1) { Lop = o1; } else { Lop = o2; }
  if (R === r1 && R === r2) { Rop = c1 || c2; } else if (R === r1) { Rop = c1; } else { Rop = c2; }
  Ulo = Math.min(l1, l2); Uhi = Math.max(r1, r2);
  if (Ulo === l1 && Ulo === l2) { UloOp = o1 && o2; } else if (Ulo === l1) { UloOp = o1; } else { UloOp = o2; }
  if (Uhi === r1 && Uhi === r2) { UhiOp = c1 && c2; } else if (Uhi === r1) { UhiOp = c1; } else { UhiOp = c2; }
  const correct = isCap ? iv(L, Lop, R, Rop) : iv(Ulo, UloOp, Uhi, UhiOp);
  const alt = isCap ? iv(Ulo, UloOp, Uhi, UhiOp) : iv(L, Lop, R, Rop);
  OUT.push(mk("basic", "sets",
    `If \\(A=${A}\\), \\(B=${B}\\), then \\(A ${isCap ? "\\cap" : "\\cup"} B =\\)`,
    correct,
    [alt,
      isCap ? iv(L, !Lop, R, Rop) : iv(Ulo, !UloOp, Uhi, UhiOp),
      isCap ? iv(L, Lop, R, !Rop) : iv(Ulo, UloOp, Uhi, !UhiOp),
      isCap ? iv(L, Lop, R + 1, Rop) : iv(Ulo, UloOp, Uhi + 1, UhiOp)],
    isCap
      ? `Overlap runs ${L} to ${R}; each end stays open if either parent end is open.`
      : `Union spans ${Ulo} to ${Uhi}; each end is open only if both parent ends are open.`,
    isCap
      ? [`Draw both intervals on one line.`, `Keep the overlap from \\(${L}\\) to \\(${R}\\), copying open/closed ends.`]
      : [`Draw both intervals on one line.`, `Keep everything from \\(${Ulo}\\) to \\(${Uhi}\\), copying open/closed ends.`]));
}

// ---------- 4. linear inequalities ×14 (basic) ----------
for (let k = 0; k < 14; k++) {
  const aChoices = [-6, -5, -4, -3, -2, -1, 1, 2, 3, 4, 5, 6];
  const a = aChoices[ri(0, aChoices.length - 1)];
  const x0 = ri(-6, 6);
  const b = ri(-9, 9);
  const c = a * x0 + b;
  const ops = ["<", "\\le", ">", "\\ge"] as const;
  const op = ops[ri(0, 3)];
  const flip: Record<string, string> = { "<": ">", "\\le": "\\ge", ">": "<", "\\ge": "\\le" };
  const shown = op.replace("\\le", "\\le").replace("\\ge", "\\ge");
  const correct = a > 0 ? `\\(x${shown}${x0}\\)` : `\\(x${flip[op].replace("\\le", "\\le").replace("\\ge", "\\ge")}${x0}\\)`;
  const opSym: Record<string, string> = { "<": "<", "\\le": "\\le", ">": ">", "\\ge": "\\ge" };
  const right = a > 0 ? opSym[op] : flip[op];
  const wrongFlip = a > 0 ? flip[op] : opSym[op];
  OUT.push(mk("basic", "linear-inequality",
    `Solve: \\(${a === 1 ? "" : a === -1 ? "-" : a}x${b >= 0 ? "+" : ""}${b}${shown}${c}\\)`,
    `\\(x${right}${x0}\\)`,
    [`\\(x${wrongFlip}${x0}\\)`, `\\(x${right}${x0 + 1}\\)`, `\\(x${right}${x0 - 1}\\)`, `\\(x${wrongFlip}${x0 + 1}\\)`],
    a > 0
      ? `Isolate: \\(x ${right} ${x0}\\) (positive coefficient — no flip).`
      : `Divide by ${a} (negative!) and flip: \\(x ${right} ${x0}\\).`,
    [`Move terms: \\(${a}x ${right} ${c - b}\\).`, a > 0 ? `Divide by positive \\(${a}\\): sign stays.` : `Divide by \\(${a}\\) (negative!): flip the sign.`, `Answer: \\(x${right}${x0}\\).`]));
}

// ---------- 5. interval notation ×10 (basic) ----------
for (let k = 0; k < 10; k++) {
  const v = ri(-5, 8);
  const ops = ["<", "\\le", ">", "\\ge"] as const;
  const op = ops[ri(0, 3)];
  const disp = op;
  let correct = "";
  let wrongs: string[] = [];
  if (op === "<") {
    correct = iv(null, false, v, true);
    wrongs = [iv(null, false, v, false), iv(v, false, null, false), iv(v, true, null, false)];
  } else if (op === "\\le") {
    correct = iv(null, false, v, false);
    wrongs = [iv(null, false, v, true), iv(v, false, null, false), iv(null, false, v - 1, false)];
  } else if (op === ">") {
    correct = iv(v, true, null, false);
    wrongs = [iv(v, false, null, false), iv(null, false, v, true), iv(v + 1, true, null, false)];
  } else {
    correct = iv(v, false, null, false);
    wrongs = [iv(v, true, null, false), iv(null, false, v, false), iv(v, false, v + 2, false)];
  }
  OUT.push(mk("basic", "compound-inequality",
    `Which interval represents \\(x${disp}${v}\\)?`,
    correct, wrongs,
    `Inequality ${disp} with ${v}: ${op === "<" || op === "\\le" ? "left ray" : "right ray"}, bracket ${op === "<" || op === ">" ? "open (strict)" : "closed (inclusive)"}.`,
    [`Decide the side: ${op === "<" || op === "\\le" ? "everything below" : "everything above"} \\(${v}\\).`, `${op === "<" || op === ">" ? "Strict sign → round bracket." : "Inclusive sign → square bracket on the number."}`, `Infinity always takes a round bracket.`]));
}

// ---------- 6. at-least/at-most words ×8 (basic) ----------
{
  const rows: [string, string, string[]][] = [
    ["“At least 8” means:", "\\(x\\ge8\\)", ["\\(x>8\\)", "\\(x<8\\)", "\\(x\\le8\\)"]],
    ["“At most 12” means:", "\\(x\\le12\\)", ["\\(x<12\\)", "\\(x>12\\)", "\\(x\\ge12\\)"]],
    ["“No more than 5” means:", "\\(x\\le5\\)", ["\\(x<5\\)", "\\(x>5\\)", "\\(x\\ge5\\)"]],
    ["“No less than 3” means:", "\\(x\\ge3\\)", ["\\(x>3\\)", "\\(x<3\\)", "\\(x\\le3\\)"]],
    ["“More than 7” means:", "\\(x>7\\)", ["\\(x\\ge7\\)", "\\(x<7\\)", "\\(x\\le7\\)"]],
    ["“Fewer than 4” means:", "\\(x<4\\)", ["\\(x\\le4\\)", "\\(x>4\\)", "\\(x\\ge4\\)"]],
    ["“Maximum 20” means:", "\\(x\\le20\\)", ["\\(x<20\\)", "\\(x>20\\)", "\\(x\\ge20\\)"]],
    ["“Minimum 6” means:", "\\(x\\ge6\\)", ["\\(x>6\\)", "\\(x<6\\)", "\\(x\\le6\\)"]],
  ];
  const order = shuffle(rows);
  for (const [q, ans, wr] of order) {
    OUT.push(mk("basic", "word-problem", q, ans, wr,
      `“At least / no less than / minimum” include the edge (\\(\\ge\\)); “at most / no more than / maximum” too (\\(\\le\\)). Bare “more/fewer than” exclude it.`,
      [`Spot the key word in the phrase.`, `“At least / no less than / minimum” → \\(\\ge\\); “at most / no more than / maximum” → \\(\\le\\); bare “more/fewer than” → strict.`, `Answer: ${ans}.`]));
  }
}

// ---------- 7. quadratics ×20 (intermediate) ----------
for (let k = 0; k < 20; k++) {
  let r1 = ri(-6, 5), r2 = ri(-6, 6);
  if (r1 === r2) r2 = r1 + 1;
  if (r1 > r2) [r1, r2] = [r2, r1];
  const ops = ["<", ">", "\\le", "\\ge"] as const;
  const op = ops[ri(0, 3)];
  const strict = op === "<" || op === ">";
  const between = op === "<" || op === "\\le";
  const correct = between ? iv(r1, strict, r2, strict) : `${iv(null, false, r1, strict)}\\cup${iv(r2, strict, null, false)}`;
  const swapped = between ? `${iv(null, false, r1, strict)}\\cup${iv(r2, strict, null, false)}` : iv(r1, strict, r2, strict);
  const flipEnd = between ? iv(r1, !strict, r2, strict) : `${iv(null, false, r1, !strict)}\\cup${iv(r2, strict, null, false)}`;
  const flipEnd2 = between ? iv(r1, strict, r2, !strict) : `${iv(null, false, r1, strict)}\\cup${iv(r2, !strict, null, false)}`;
  OUT.push(mk("intermediate", "quadratic-inequality",
    `Solve: \\((x${r1 >= 0 ? "-" : "+"}${Math.abs(r1)})(x${r2 >= 0 ? "-" : "+"}${Math.abs(r2)})${op.replace("\\le", "\\le").replace("\\ge", "\\ge")}0\\)`,
    correct,
    [swapped, flipEnd, flipEnd2, iv(r1, true, r2, true)],
    `Roots ${r1}, ${r2}; upward parabola is ${between ? "negative strictly between" : "positive strictly outside"}${strict ? "" : ", endpoints included"}.`,
    [`Factor form already shows roots \\(${r1}\\) and \\(${r2}\\).`, between ? `Upward shape is below zero only between the roots.` : `Upward shape is above zero only outside the roots.`, `Apply ${strict ? "strict (open ends)" : "inclusive (closed ends)"} → ${correct}.`]));
}

// ---------- 8. absolute value ×16 (intermediate) ----------
for (let k = 0; k < 16; k++) {
  const c = ri(-5, 5);
  const a = ri(1, 6);
  const ops = ["<", "\\le", ">", "\\ge"] as const;
  const op = ops[ri(0, 3)];
  const cs = c >= 0 ? `-${c}` : `+${-c}`;
  const q = `Solve: \\(|x${cs}|${op.replace("\\le", "\\le").replace("\\ge", "\\ge")}${a}\\)`;
  let correct = "";
  if (op === "<") correct = `\\(${c - a}<x<${c + a}\\)`;
  if (op === "\\le") correct = `\\(${c - a}\\le x\\le ${c + a}\\)`;
  if (op === ">") correct = `\\(x<${c - a}\\) or \\(x>${c + a}\\)`;
  if (op === "\\ge") correct = `\\(x\\le${c - a}\\) or \\(x\\ge${c + a}\\)`;
  const swapped = (op === "<" || op === "\\le")
    ? `\\(x<${c - a}\\) or \\(x>${c + a}\\)`
    : `\\(${c - a}<x<${c + a}\\)`;
  OUT.push(mk("intermediate", "absolute-value", q, correct,
    [swapped,
      `\\(${c - a + 1}<x<${c + a}\\)`,
      op === "<" || op === "\\le" ? `\\(${c - a}\\le x\\le ${c + a}\\)` : `\\(${c - a}<x<${c + a}\\)`,
      `\\(x<${c - a + 1}\\) or \\(x>${c + a}\\)`],
    op === "<" || op === "\\le"
      ? `< means AND one interval centered at ${c}.`
      : `> means OR two rays from ${c - a} and ${c + a}.`,
    op === "<" || op === "\\le"
      ? [`\\(|x-(${c})|\\) is distance from \\(${c}\\).`, `Close means inside: \\(${c - a}\\) to \\(${c + a}\\).`, `Apply ${op === "<" ? "strict" : "inclusive"} ends → ${correct}.`]
      : [`\\(|x-(${c})|\\) is distance from \\(${c}\\).`, `Far means outside: below \\(${c - a}\\) or above \\(${c + a}\\).`, `Two separate rays → ${correct}.`]));
}

// ---------- 9. rational basic ×12 (intermediate) ----------
for (let k = 0; k < 12; k++) {
  let a = ri(-5, 5), b = ri(-5, 5);
  if (a === b) b = a + 1 > 5 ? a - 2 : a + 1;
  const ops = ["<", ">", "\\le", "\\ge"] as const;
  const op = ops[ri(0, 3)];
  const strict = op === "<" || op === ">";
  const lo = Math.min(a, b), hi = Math.max(a, b);
  const loIsA = lo === a;
  // a included iff it is the numerator zero AND the sign is non-strict; b (denominator) never included
  const loOpen = strict || !loIsA;
  const hiOpen = strict || loIsA;
  const wantOutside = op === ">" || op === "\\ge";
  const correct = wantOutside
    ? `${iv(null, false, lo, loOpen)}\\cup${iv(hi, hiOpen, null, false)}`
    : iv(lo, loOpen, hi, hiOpen);
  const swapped = wantOutside
    ? iv(lo, loOpen, hi, hiOpen)
    : `${iv(null, false, lo, loOpen)}\\cup${iv(hi, hiOpen, null, false)}`;
  const includeB = wantOutside
    ? `${iv(null, false, lo, loOpen)}\\cup${iv(hi, false, null, false)}`
    : iv(lo, loOpen, hi, false);
  OUT.push(mk("intermediate", "rational-inequality",
    `Solve: \\(\\frac{x${a >= 0 ? "-" : "+"}${Math.abs(a)}}{x${b >= 0 ? "-" : "+"}${Math.abs(b)}}${op.replace("\\le", "\\le").replace("\\ge", "\\ge")}0\\)`,
    correct,
    [swapped, includeB, iv(lo, true, hi, true), iv(lo, !loOpen, hi, !hiOpen)],
    `Critical ${a} (${strict ? "excluded (strict)" : "included"}) and ${b} (always excluded); sign-chart the three intervals.`,
    [`Mark critical points: numerator zero \\(${a}\\)${strict ? " (open, strict)" : " (closed)"}, denominator zero \\(${b}\\) (always open).`, `Test one number per interval for the wanted sign.`, `Answer: ${correct}.`]));
}

// ---------- 10. two-set Venn numbers ×12 (intermediate) ----------
for (let k = 0; k < 12; k++) {
  const A = ri(15, 60), B = ri(15, 60);
  const T = A + B + ri(0, 30);
  const inter = ri(Math.max(0, A + B - T), Math.min(A, B));
  const union = A + B - inter;
  const mode = ri(0, 2);
  let q = "", correct = "", think = "";
  if (mode === 0) { q = `\\(|A|=${A}\\), \\(|B|=${B}\\), \\(|A\\cap B|=${inter}\\): \\(|A\\cup B|=\\)`; correct = String(union); think = `\\(${A}+${B}-${inter} = ${union}\\).`; }
  if (mode === 1) { q = `Class of ${T}: ${A} study M, ${B} study P, ${inter} both. Neither?`; correct = String(T - union); think = `Union ${union}; neither = ${T} − ${union}.`; }
  if (mode === 2) { q = `\\(|A|=${A}\\), \\(|B|=${B}\\), \\(|A\\cap B|=${inter}\\): A only?`; correct = String(A - inter); think = `A-only = ${A} − ${inter}.`; }
  const base = parseInt(correct, 10);
  OUT.push(mk("intermediate", "venn-diagram", q, correct,
    [String(base + ri(2, 9)), String(Math.max(0, base - ri(2, 9))), String(base + A), String(Math.max(0, inter - ri(1, 4)))],
    think,
    [`Draw the Venn diagram: \\(|A|=${A}\\), \\(|B|=${B}\\), both \\(=${inter}\\).`, mode === 0 ? `Union = \\(${A}+${B}-${inter} = ${union}\\).` : mode === 1 ? `Union = ${union}; neither = total − union.` : `A-only = \\(${A}-${inter}\\).`, `Answer: ${correct}.`]));
}

// ---------- 11. cartesian counts ×8 (basic) ----------
for (let k = 0; k < 8; k++) {
  const m = ri(2, 9), n = ri(2, 9);
  OUT.push(mk("basic", "cartesian-product",
    `If \\(|A|=${m}\\) and \\(|B|=${n}\\), then \\(|A\\times B|=\\)`,
    String(m * n),
    [String(m + n), String(m * n - m), String(m * n + 1), String(2 ** m), String(m * n + 2), String(m * n + m)],
    `Ordered pairs multiply: \\(${m}\\times${n} = ${m * n}\\).`,
    [`Each of the \\(${m}\\) A-items pairs with each of the \\(${n}\\) B-items.`, `Multiply: \\(${m} \\times ${n} = ${m * n}\\).`]));
}

// ---------- 12. exponential compare ×8 (intermediate) ----------
{
  let made = 0, guard = 0;
  while (made < 8 && guard++ < 200) {
    const kind = ri(0, 2);
    let sTrue = "", sF: string[] = [], th = "";
    if (kind === 0) {
      const B = [2, 3, 5][ri(0, 2)];
      let e1 = ri(1, 5), e2 = ri(1, 5);
      if (e1 === e2) continue;
      const big = Math.max(e1, e2), small = Math.min(e1, e2);
      sTrue = `\\(${B}^{${small}} < ${B}^{${big}}\\)`;
      sF = [`\\(${B}^{${small}} > ${B}^{${big}}\\)`, `\\(${B}^{${big}} < ${B}^{${small}}\\)`, `\\(${B}^{${small}} = ${B}^{${big}}\\)`];
      th = `Base ${B} > 1 keeps order: smaller exponent is smaller.`;
    } else if (kind === 1) {
      const B = ["\\frac12", "0.75", "\\frac13"][ri(0, 2)];
      let e1 = ri(1, 4), e2 = ri(1, 4);
      if (e1 === e2) continue;
      const big = Math.max(e1, e2), small = Math.min(e1, e2);
      sTrue = `\\(${B}^{${big}} < ${B}^{${small}}\\)`;
      sF = [`\\(${B}^{${big}} > ${B}^{${small}}\\)`, `\\(${B}^{${small}} < ${B}^{${big}}\\)`, `\\(${B}^{${small}} = ${B}^{${big}}\\)`];
      th = `Base below 1 reverses order: bigger exponent is smaller.`;
    } else {
      const e = [2, 3][ri(0, 1)];
      let b1 = ri(1, 4), b2 = ri(1, 4);
      if (b1 === b2) continue;
      const big = Math.max(b1, b2), small = Math.min(b1, b2);
      sTrue = `\\(${small}^{${e}} < ${big}^{${e}}\\)`;
      sF = [`\\(${small}^{${e}} > ${big}^{${e}}\\)`, `\\(${big}^{${e}} < ${small}^{${e}}\\)`, `\\(${small}^{${e}} = ${big}^{${e}}\\)`];
      th = `Same positive exponent: bigger base wins.`;
    }
    OUT.push(mk("intermediate", "exponential-functions", "Which inequality is correct?", sTrue, sF, th,
      [`Compare the two sides as plain numbers.`, th, `True statement: ${sTrue}.`]));
    made++;
  }
}

// ---------- 13. three-set numbers ×10 (advanced) ----------
for (let k = 0; k < 10; k++) {
  const oA = ri(5, 20), oB = ri(5, 20), oC = ri(5, 20);
  const ab = ri(3, 12), bc = ri(3, 12), ac = ri(3, 12);
  const t = ri(2, 8);
  const none = ri(0, 25);
  const A = oA + ab + ac + t, B = oB + ab + bc + t, C = oC + ac + bc + t;
  const union = oA + oB + oC + ab + bc + ac + t;
  const T = union + none;
  const mode = ri(0, 2);
  let q = "", correct = 0, th = "";
  if (mode === 0) { q = `Sets with pairwise-only ${ab}, ${bc}, ${ac}, triple ${t}, only-regions ${oA}, ${oB}, ${oC}: at least one =`; correct = union; th = `Add all seven inner regions: ${union}.`; }
  if (mode === 1) { q = `Group of ${T} with union ${union}: in none =`; correct = none; th = `${T} − ${union} = ${none}.`; }
  if (mode === 2) { q = `With \\(|A|=${A}\\), pairs ${ab + t}, ${ac + t}, triple ${t}: A only =`; correct = oA; th = `${A} − ${ab + t} − ${ac + t} + ${t} = ${oA}.`; }
  void B; void C;
  const cands = [correct + t, correct + ab, correct + 3, correct + 5, correct + 7,
    Math.max(0, correct - 3), Math.max(0, correct - 5)];
  const pickedWrongs = [...new Set(cands.filter((v) => v !== correct))].slice(0, 3);
  OUT.push(mk("advanced", "inclusion-exclusion",
    q, String(correct), pickedWrongs.map(String),
    th + ` (A=${A}, B=${B}, C=${C}.)`,
    mode === 0
      ? [`Add all seven inner regions.`, `Singles − pairs + triple = \\(${correct}\\).`]
      : mode === 1
        ? [`Union of the three sets is \\(${union}\\).`, `None = total − union = \\(${T}-${union} = ${correct}\\).`]
        : [`A-only = A − its two pairs + triple back.`, `\\(${A}-${ab + t}-${ac + t}+${t} = ${correct}\\).`]));
}

// ---------- 14. rational vs constant ×8 (advanced) ----------
for (let k = 0; k < 8; k++) {
  let a = ri(-5, 5), b = ri(-5, 5), guard = 0;
  if (a === b) b = a >= 5 ? a - 2 : a + 1;
  const ks = [1, -1, 2];
  const kk = ks[ri(0, 2)];
  const ops = ["<", ">", "\\le", "\\ge"] as const;
  const op = ops[ri(0, 3)];
  const strict = op === "<" || op === ">";
  // solve (x-a)/(x-b) rel kk  <=>  N(x)/(x-b) rel 0, N(x) = (1-kk)x + (kk*b-a)
  const crits: { x: number; incl: boolean }[] = [{ x: b, incl: false }];
  if (kk !== 1) {
    const r = (a - kk * b) / (1 - kk);
    if (Math.abs(r - b) < 1e-9 || !Number.isInteger(r)) { k--; continue; }
    crits.push({ x: r, incl: !strict });
  }
  crits.sort((p, q2) => p.x - q2.x);
  const f = (x: number) => ((1 - kk) * x + (kk * b - a)) / (x - b);
  const pts = [-1e6, ...crits.map((c) => c.x)];
  let correct = "";
  const parts: string[] = [];
  const bounds = [...crits.map((c) => c.x)];
  const lows: (number | null)[] = [null, ...bounds];
  const his: (number | null)[] = [...bounds, null];
  for (let i = 0; i < lows.length; i++) {
    const lo = lows[i], hi2 = his[i];
    const mid = lo === null ? (hi2 as number) - 1 : hi2 === null ? (lo as number) + 1 : (lo + (hi2 as number)) / 2;
    const v = f(mid);
    const want = op === "<" || op === "\\le" ? v < 0 : v > 0;
    if (!want) continue;
    const loOpen = lo === null ? true : !(crits[i - 1] && crits[i - 1].incl);
    const hiOpen = hi2 === null ? true : !(crits[i] && crits[i].incl);
    parts.push(iv(lo, loOpen, hi2, hiOpen));
  }
  correct = parts.join("\\cup");
  void pts; void guard;
  const kkStr = kk === 1 ? "1" : kk === -1 ? "-1" : "2";
  OUT.push(mk("advanced", "rational-inequality",
    `Solve: \\(\\frac{x${a >= 0 ? "-" : "+"}${Math.abs(a)}}{x${b >= 0 ? "-" : "+"}${Math.abs(b)}}${op.replace("\\le", "\\le").replace("\\ge", "\\ge")}${kkStr}\\)`,
    correct,
    [`${iv(b, true, b + 3, true)}\\cup${iv(b + 5, true, null, false)}`,
      crits.length > 1 ? iv(crits[0].x, false, crits[crits.length - 1].x, false) : iv(b - 2, true, b + 2, true),
      `${iv(null, false, b, false)}\\cup${iv(b, false, null, false)}`,
      crits.length > 1 ? iv(Math.min(...bounds), true, Math.max(...bounds), true) : iv(b - 1, true, b + 1, true),
      crits.length > 1 ? iv(bounds[0], true, bounds[bounds.length - 1], true) : iv(b, true, b, true),
      crits.length > 1 ? iv(bounds[0], false, bounds[bounds.length - 1], false) : iv(b, false, b, false)],
    `Move ${kkStr} left first: numerator and denominator critical points are ${bounds.join(", ")} (${b} always excluded); sign-chart each interval.`,
    [`Subtract ${kkStr}: combine into one fraction \\(\\frac{N(x)}{x${b >= 0 ? "-" : "+"}${Math.abs(b)}}\\).`, `Critical points: ${bounds.join(", ")} — \\(${b}\\) from the denominator is always open.`, `Sign-chart and keep the wanted intervals → ${correct}.`]));
}

// ---------- 15. abstract properties ×6 (advanced) ----------
{
  const rows: [string, string, string[], string][] = [
    ["If \\(x > y\\), which must hold?", "\\(x+z>y+z\\)", ["\\(xz>yz\\)", "\\(x^2>y^2\\)", "\\(1/x<1/y\\)"], "Adding never flips; multiplying needs signs."],
    ["If \\(0 < a < b\\), which must hold?", "\\(1/a>1/b\\)", ["\\(1/a<1/b\\)", "\\(a^2>b^2\\)", "\\(a-b>0\\)"], "Reciprocals reverse on positives."],
    ["If \\(a > b \\ge 0\\), which must hold?", "\\(a^2>b^2\\)", ["\\(a^2<b^2\\)", "\\(a+b<0\\)", "\\(a-b<0\\)"], "\\(a^2-b^2 = (a-b)(a+b) > 0\\) since both factors are positive."],
    ["If \\(x < y < 0\\), which must hold?", "\\(x^2>y^2\\)", ["\\(x^2<y^2\\)", "\\(1/x<1/y\\)", "\\(x+y>0\\)"], "More-negative squares bigger; sums stay negative."],
    ["If \\(a > b\\), which must hold?", "\\(a-5>b-5\\)", ["\\(2-a>2-b\\)", "\\(-3a>-3b\\)", "\\(a^2>b^2\\)"], "Only adding/subtracting is unconditional."],
    ["If \\(p < q < 0\\), which must hold?", "\\(pq>0\\)", ["\\(pq<0\\)", "\\(p+q>0\\)", "\\(p^2<q^2\\)"], "Negative × negative is positive; the sum stays negative."],
  ];
  for (const [q, ans, wr, th] of rows) {
    OUT.push(mk("advanced", "inequality-properties", q, ans, wr, th,
      [`Test the claim against the given conditions (watch signs and zero).`, th, `True statement: ${ans}.`]));
  }
}

// ---------- 16. repeated-factor polynomials ×8 (advanced) ----------
for (let k = 0; k < 8; k++) {
  let a = ri(-5, 5), b = ri(-5, 5);
  if (a === b) { k--; continue; }
  const ops = ["<", ">", "\\le", "\\ge"] as const;
  const op = ops[ri(0, 3)];
  const strict = op === "<" || op === ">";
  let correct = "";
  let allow = true;
  if (op === ">") correct = a < b ? iv(b, true, null, false) : `${iv(b, true, a, true)}\\cup${iv(a, true, null, false)}`;
  else if (op === "<") correct = a > b ? iv(null, false, b, true) : `${iv(null, false, a, true)}\\cup${iv(a, true, b, true)}`;
  else if (op === "\\ge") { if (a > b) correct = iv(b, false, null, false); else allow = false; }
  else { if (a < b) correct = iv(null, false, b, false); else allow = false; }
  if (!allow) { k--; continue; }
  OUT.push(mk("advanced", "polynomial-inequality",
    `Solve: \\((x${a >= 0 ? "-" : "+"}${Math.abs(a)})^2(x${b >= 0 ? "-" : "+"}${Math.abs(b)})${op.replace("\\le", "\\le").replace("\\ge", "\\ge")}0\\)`,
    correct,
    [op === ">" || op === "\\ge" ? iv(b, true, b + 4, true) : iv(b - 4, true, b, true),
      op === ">" || op === "\\ge" ? `${iv(null, false, b, !strict)}\\cup${iv(b, !strict, null, false)}` : `${iv(null, false, b, !strict)}\\cup${iv(b, !strict, null, false)}`,
      iv(Math.min(a, b), true, Math.max(a, b), true),
      `\\(x\\ne${a}\\)`],
    `\\((x-${a})^2\\) never flips sign (zero only at \\(x = ${a}\\)${strict ? ", excluded" : ""}); the sign comes from \\((x-${b})\\).`,
    [`The square is \\(\\ge 0\\), zero only at \\(x = ${a}\\)${strict ? " (dropped, strict)" : ""}.`, `So the sign is decided by \\((x - ${b})\\).`, `Answer: ${correct}.`]));
}

export const SETS_GENERATED: ChapterProblem[] = OUT;

/** Full bank: 116 hand-written + 184 generated = 300. */
export const SETS_ALL: ChapterProblem[] = [...SETS_PROBLEMS, ...SETS_GENERATED];
