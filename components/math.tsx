// KaTeX math rendering for lesson/problem text.
// Supports \(...\) inline, \[...\] display and $$...$$ display delimiters.
// Any non-math text passes through unchanged (as plain text, not HTML).

import katex from "katex";
import { autoFrac } from "@/lib/autofrac";

function renderMath(source: string, displayMode: boolean): string {
  try {
    // Stacked textbook fractions: cos(π/4) renders with π over 4.
    return katex.renderToString(autoFrac(source), {
      displayMode,
      throwOnError: false,
      strict: false,
      trust: false,
    });
  } catch {
    return source;
  }
}

interface Segment {
  math: boolean;
  display: boolean;
  text: string;
}

/** Split a string into text / math segments (no modern regex features). */
function splitSegments(input: string): Segment[] {
  const out: Segment[] = [];
  let i = 0;
  const n = input.length;
  while (i < n) {
    let open = -1;
    let close = "";
    let display = false;
    const iBk1 = input.indexOf("\\[", i);
    const iBk2 = input.indexOf("\\(", i);
    const iDol = input.indexOf("$$", i);
    let best = -1;
    if (iBk1 !== -1 && (best === -1 || iBk1 < best)) { best = iBk1; open = 2; close = "\\]"; display = true; }
    if (iBk2 !== -1 && (best === -1 || iBk2 < best)) { best = iBk2; open = 2; close = "\\)"; display = false; }
    if (iDol !== -1 && (best === -1 || iDol < best)) { best = iDol; open = 2; close = "$$"; display = true; }
    if (best === -1) {
      out.push({ math: false, display: false, text: input.slice(i) });
      break;
    }
    const end = input.indexOf(close, best + open);
    if (end === -1) {
      out.push({ math: false, display: false, text: input.slice(i) });
      break;
    }
    if (best > i) out.push({ math: false, display: false, text: input.slice(i, best) });
    out.push({ math: true, display, text: input.slice(best + open, end) });
    i = end + close.length;
  }
  return out;
}

/** Inline math-aware text (renders inside a <span>). */
export function M({ children, className = "" }: { children: string; className?: string }) {
  const html = splitSegments(children)
    .map((s) => (s.math ? renderMath(s.text, s.display) : escapeHtml(s.text)))
    .join("");
  return (
    <span
      className={`math-text ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

/** Block math-aware text (renders inside a <div>). */
export function MBlock({ children, className = "" }: { children: string; className?: string }) {
  const html = splitSegments(children)
    .map((s) => (s.math ? renderMath(s.text, s.display) : escapeHtml(s.text)))
    .join("");
  return (
    <div
      className={`math-text ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
