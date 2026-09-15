export type ErrorReason =
  | "concept"
  | "forgot-formula"
  | "calculation"
  | "misread"
  | "time"
  | "guessed";

export const ERROR_REASONS: { id: ErrorReason; label: string }[] = [
  { id: "concept", label: "Didn't know concept" },
  { id: "forgot-formula", label: "Forgot formula" },
  { id: "calculation", label: "Calculation mistake" },
  { id: "misread", label: "Misread question" },
  { id: "time", label: "Ran out of time" },
  { id: "guessed", label: "Guessed" },
];

export interface AttemptRecord {
  qid: string;
  topic: string;
  difficulty: string;
  correct: boolean;
  timeSec: number;
  date: string;
}

const ATTEMPTS_KEY = "csca-attempts-v1";
const MISTAKES_KEY = "csca-mistakes-v1";

export function loadAttempts(): AttemptRecord[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(ATTEMPTS_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed as AttemptRecord[];
  } catch {
    return [];
  }
}

export function saveAttempt(a: AttemptRecord): void {
  if (typeof window === "undefined") return;
  try {
    const all = loadAttempts();
    all.push(a);
    const capped = all.slice(-2000);
    window.localStorage.setItem(ATTEMPTS_KEY, JSON.stringify(capped));
  } catch {
    // ignore storage errors (quota / private mode)
  }
}

export function topicStats(topic: string): {
  answered: number;
  correct: number;
  accuracy: number;
  avgTimeSec: number;
} {
  const all = loadAttempts().filter((a) => a.topic === topic);
  const answered = all.length;
  if (answered === 0) {
    return { answered: 0, correct: 0, accuracy: 0, avgTimeSec: 0 };
  }
  const correct = all.filter((a) => a.correct).length;
  const accuracy = Math.round((correct / answered) * 100);
  const totalTime = all.reduce((sum, a) => sum + a.timeSec, 0);
  const avgTimeSec = Math.round(totalTime / answered);
  return { answered, correct, accuracy, avgTimeSec };
}

export function masteryFor(topic: string): {
  knowledge: number;
  accuracy: number;
  speed: number;
} {
  const all = loadAttempts().filter((a) => a.topic === topic);
  if (all.length === 0) {
    return { knowledge: 0, accuracy: 0, speed: 0 };
  }
  const correct = all.filter((a) => a.correct).length;
  const accuracy = Math.round((correct / all.length) * 100);
  const fast = all.filter((a) => a.timeSec <= 75).length;
  const speed = Math.round((fast / all.length) * 100);
  const easy = all.filter(
    (a) =>
      a.difficulty.toLowerCase() === "foundation" ||
      a.difficulty.toLowerCase() === "basic"
  );
  let knowledge: number;
  if (easy.length === 0) {
    knowledge = accuracy;
  } else {
    const easyCorrect = easy.filter((a) => a.correct).length;
    knowledge = Math.round((easyCorrect / easy.length) * 100);
  }
  return { knowledge, accuracy, speed };
}

export interface MistakeRecord {
  qid: string;
  topic: string;
  stem: string;
  wrong: number | null;
  correct: number;
  reason: ErrorReason;
  date: string;
}

export function loadMistakes(): MistakeRecord[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(MISTAKES_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed as MistakeRecord[];
  } catch {
    return [];
  }
}

export function addMistake(m: MistakeRecord): void {
  if (typeof window === "undefined") return;
  try {
    const all = loadMistakes().filter((x) => x.qid !== m.qid);
    all.push(m);
    const capped = all.slice(-500);
    window.localStorage.setItem(MISTAKES_KEY, JSON.stringify(capped));
  } catch {
    // ignore storage errors (quota / private mode)
  }
}

export function removeMistake(qid: string): void {
  if (typeof window === "undefined") return;
  try {
    const all = loadMistakes().filter((x) => x.qid !== qid);
    window.localStorage.setItem(MISTAKES_KEY, JSON.stringify(all));
  } catch {
    // ignore storage errors (quota / private mode)
  }
}
