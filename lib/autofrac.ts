// Auto-convert inline a/b fractions to \frac{a}{b} so site math renders
// stacked (textbook style) instead of with inline slashes.
// Applied to KaTeX math segments only; plain text is never touched.

function isEscaped(s: string, k: number): boolean {
  let n = 0;
  let j = k - 1;
  while (j >= 0 && s[j] === "\\") {
    n++;
    j--;
  }
  return n % 2 === 1;
}

function isStopChar(ch: string): boolean {
  return (
    ch === "=" ||
    ch === "<" ||
    ch === ">" ||
    ch === "," ||
    ch === ";" ||
    ch === ":" ||
    ch === "!" ||
    ch === "?" ||
    ch === "&" ||
    ch === "~"
  );
}

/**
 * Relation/operator commands that bind looser than "/" — a fraction side
 * must never swallow them (e.g. "1/3 \Rightarrow t", "2 \times x").
 * Deliberately excludes \pm (belongs inside values like \pm1/2).
 */
const REL_OPS = new Set([
  "Rightarrow",
  "Leftarrow",
  "Leftrightarrow",
  "Uparrow",
  "Downarrow",
  "Updownarrow",
  "rightarrow",
  "leftarrow",
  "leftrightarrow",
  "longrightarrow",
  "longleftarrow",
  "longleftrightarrow",
  "to",
  "gets",
  "mapsto",
  "implies",
  "impliedby",
  "le",
  "leq",
  "ge",
  "geq",
  "ne",
  "neq",
  "approx",
  "equiv",
  "sim",
  "simeq",
  "cong",
  "propto",
  "in",
  "notin",
  "ni",
  "subset",
  "subseteq",
  "supset",
  "supseteq",
  "cup",
  "cap",
  "vee",
  "wedge",
  "times",
  "cdot",
  "div",
  "mid",
  "parallel",
  "perp",
]);

/** Command name starting at the backslash at i ("\\" + letters), or "". */
function commandNameAt(s: string, i: number): string {
  let k = i + 1;
  let name = "";
  while (
    k < s.length &&
    ((s[k] >= "a" && s[k] <= "z") || (s[k] >= "A" && s[k] <= "Z"))
  ) {
    name += s[k];
    k++;
  }
  return name;
}

/** True when position k starts a relation/operator command. */
function isRelOpAt(s: string, k: number): boolean {
  if (s[k] !== "\\" || isEscaped(s, k)) return false;
  return REL_OPS.has(commandNameAt(s, k));
}

/** Index of the opener matching the closer at i (scan left), -1 if unbalanced. */
function matchLeft(s: string, i: number, open: string, close: string): number {
  let depth = 0;
  for (let k = i; k >= 0; k--) {
    const ch = s[k];
    if ((ch === open || ch === close) && isEscaped(s, k)) continue;
    if (ch === close) depth++;
    else if (ch === open) {
      depth--;
      if (depth === 0) return k;
    }
  }
  return -1;
}

/** Index of the closer matching the opener at i (scan right), -1 if unbalanced. */
function matchRight(s: string, i: number, open: string, close: string): number {
  let depth = 0;
  for (let k = i; k < s.length; k++) {
    const ch = s[k];
    if ((ch === open || ch === close) && isEscaped(s, k)) continue;
    if (ch === open) depth++;
    else if (ch === close) {
      depth--;
      if (depth === 0) return k;
    }
  }
  return -1;
}

interface Num {
  text: string;
  start: number;
}

/** Parse one factor left of the slash at j (e.g. "b" in "a+b/c"). */
function parseNumerator(s: string, j: number): Num | null {
  let i = j - 1;
  while (i >= 0 && s[i] === " ") i--;
  if (i < 0) return null;
  const end = i;
  let start = i + 1;
  let bars = 0;
  while (i >= 0) {
    const ch = s[i];
    const esc = isEscaped(s, i);
    if (ch === " ") {
      let k = i;
      while (k >= 0 && s[k] === " ") k--;
      if (k < 0) break;
      if (s[k] === "\\" && isRelOpAt(s, k)) break;
      const nk = s[k];
      if (
        isStopChar(nk) ||
        nk === "(" ||
        nk === "[" ||
        nk === "{" ||
        ((nk === "+" || nk === "-") && bars % 2 === 0)
      )
        break;
      i = k;
      continue;
    }
    if (!esc && ch === "/") break;
    if (!esc && ch === "\\" && isRelOpAt(s, i)) {
      // The rel-op's letter run (e.g. "times") was already scanned: drop it
      // too, so the numerator ends before the operator ("2 \times 1/16"
      // gives numerator "1", not "times 1").
      let ns = i + 1 + commandNameAt(s, i).length;
      while (ns <= end && s[ns] === " ") ns++;
      start = ns;
      break;
    }
    if (!esc && (isStopChar(ch) || ch === "(" || ch === "[")) break;
    if (!esc && (ch === ")" || ch === "]" || ch === "}")) {
      const open = ch === ")" ? "(" : ch === "]" ? "[" : "{";
      const m = matchLeft(s, i, open, ch);
      if (m < 0) return null;
      start = m;
      i = m - 1;
      continue;
    }
    if (!esc && ch === "{") return null;
    if (!esc && ch === "|") bars++;
    if (!esc && (ch === "+" || ch === "-") && bars % 2 === 0) break;
    start = i;
    i--;
  }
  if (start > end) return null;
  return { text: s.slice(start, end + 1), start };
}

interface Den {
  text: string;
  end: number;
}

/** Parse one factor right of the slash at j (e.g. "c" in "a+b/c"). */
function parseDenominator(s: string, j: number): Den | null {
  let i = j + 1;
  while (i < s.length && s[i] === " ") i++;
  if (i >= s.length) return null;
  const first = i;
  let end = i - 1;
  let bars = 0;
  while (i < s.length) {
    const ch = s[i];
    const esc = isEscaped(s, i);
    if (ch === " ") {
      let k = i;
      while (k < s.length && s[k] === " ") k++;
      if (k >= s.length) break;
      if (s[k] === "\\" && isRelOpAt(s, k)) break;
      const nk = s[k];
      if (
        isStopChar(nk) ||
        nk === ")" ||
        nk === "]" ||
        nk === "}" ||
        ((nk === "+" || nk === "-") && bars % 2 === 0)
      )
        break;
      i = k;
      continue;
    }
    if (!esc && (isStopChar(ch) || ch === ")" || ch === "]" || ch === "}" || ch === "/"))
      break;
    if (!esc && ch === "\\" && isRelOpAt(s, i)) break;
    if (!esc && (ch === "(" || ch === "[" || ch === "{")) {
      const close = ch === "(" ? ")" : ch === "[" ? "]" : "}";
      const m = matchRight(s, i, ch, close);
      if (m < 0) return null;
      end = m;
      i = m + 1;
      continue;
    }
    if (!esc && ch === "|") bars++;
    if (!esc && (ch === "+" || ch === "-") && bars % 2 === 0) break;
    end = i;
    i++;
  }
  if (end < first) return null;
  return { text: s.slice(first, end + 1), end };
}

/** Strip one layer of outer (...) / [...] wrapping the whole string. */
function stripOuter(s: string): string {
  for (;;) {
    if (
      s.length >= 2 &&
      s[0] === "(" &&
      matchRight(s, 0, "(", ")") === s.length - 1
    ) {
      s = s.slice(1, -1);
      continue;
    }
    if (
      s.length >= 2 &&
      s[0] === "[" &&
      matchRight(s, 0, "[", "]") === s.length - 1
    ) {
      s = s.slice(1, -1);
      continue;
    }
    return s;
  }
}

/**
 * True when the side looks like prose ("max", "or") rather than math.
 * Single letters, digits and short ALL-CAPS tokens (vectors: OA, AB) pass.
 */
function looksLikeProse(s: string): boolean {
  if (s.indexOf("\\text") !== -1) return true;
  const noCmd = s.replace(/\\[A-Za-z]+/g, "").replace(/\\./g, "");
  return /[a-z][A-Za-z]+/.test(noCmd) || /[A-Z]{3,}/.test(noCmd);
}

/** Convert every convertible a/b in a math segment to \frac{a}{b}. */
export function autoFrac(input: string): string {
  // Fixpoint: one pass converts the innermost slash; nested fractions such
  // as (1 + 1/2)/2 need a second pass for the outer one. Each changing pass
  // strictly removes raw slashes, so this always terminates.
  let cur = input;
  for (;;) {
    const next = fracOnce(cur);
    if (next === cur) return cur;
    cur = next;
  }
}

/** Single left-to-right pass: convert the first convertible slash. */
function fracOnce(input: string): string {
  for (let j = 0; j < input.length; j++) {
    if (input[j] !== "/" || isEscaped(input, j)) continue;
    if (input[j + 1] === "/" || input[j - 1] === "/") continue;
    const num = parseNumerator(input, j);
    const den = num ? parseDenominator(input, j) : null;
    if (!num || !den) continue;
    const n = stripOuter(num.text);
    const d = stripOuter(den.text);
    if (n.length === 0 || d.length === 0) continue;
    if (looksLikeProse(n) || looksLikeProse(d)) continue;
    return (
      autoFrac(input.slice(0, num.start)) +
      "\\frac{" +
      autoFrac(n) +
      "}{" +
      autoFrac(d) +
      "}" +
      autoFrac(input.slice(den.end + 1))
    );
  }
  return input;
}
