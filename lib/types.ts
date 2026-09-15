// CSCA-Prep.com — shared entity types (mirror of supabase/schema.sql).
// Spec: teregttomack.txt Sec 8 (question bank) + Sec 30 (database structure).
// Keep in sync with data/questions.ts enums (Difficulty, SourceType).

export type Difficulty =
  | "Foundation"
  | "Basic"
  | "CSCA Standard"
  | "Challenging"
  | "Advanced";

export type SourceType = "official" | "original" | "recalled" | "practice";

export type ErrorType =
  | "concept"
  | "forgot-formula"
  | "calculation"
  | "misread"
  | "time"
  | "guessed";

export type Goal =
  | "mathematics"
  | "mathematics-physics"
  | "mathematics-chemistry"
  | "mathematics-physics-chemistry"
  | "professional-chinese"
  | "undecided";

export type Target = "admission" | "scholarship" | "both" | "preparation";

export type MockMode = "quick" | "half" | "full" | "final";

export type PlanMode = "30" | "14" | "7" | "3" | "1";

export interface Profile {
  id: string;
  email: string | null;
  display_name: string | null;
  goal: Goal | null;
  target: Target | null;
  teaching_language: "English" | "Chinese";
  exam_date: string | null;
  created_at: string;
  updated_at: string;
}

export interface Subject {
  id: string;
  slug: string;
  title: string;
  description: string;
  created_at: string;
}

export interface Chapter {
  id: string;
  subject_id: string;
  slug: string;
  title: string;
  description: string;
  sort_order: number;
  created_at: string;
}

export interface Topic {
  id: string;
  subject_id: string;
  chapter_id: string;
  slug: string;
  title: string;
  description: string;
  time_target_sec: number;
  sort_order: number;
  created_at: string;
}

export interface Lesson {
  id: string;
  topic_id: string;
  slug: string;
  title: string;
  stage: "learn" | "worked-example" | "practice-guide";
  content_md: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Question {
  id: string;
  subject_id: string;
  chapter: string;
  topic: string;
  subtopic: string;
  difficulty: Difficulty;
  type: "mcq";
  stem: string;
  options: string[];
  answer: number;
  explanation: string;
  why_not: string[];
  concept: string;
  source: string;
  source_type: SourceType;
  exam_relevance: number;
  estimated_time_sec: number;
  created_at: string;
}

export interface Attempt {
  id: string;
  user_id: string;
  question_id: string;
  answer: number | null;
  is_correct: boolean;
  time_spent_sec: number;
  error_type: ErrorType | null;
  created_at: string;
}

export interface Mistake {
  id: string;
  user_id: string;
  question_id: string;
  topic: string;
  wrong_answer: number | null;
  correct_answer: number;
  error_type: ErrorType | null;
  review_count: number;
  resolved: boolean;
  created_at: string;
  updated_at: string;
}

export interface MockExam {
  id: string;
  slug: string;
  title: string;
  subject_id: string | null;
  mode: MockMode;
  total_questions: number;
  total_sec: number;
  created_at: string;
}

export interface MockAttempt {
  id: string;
  user_id: string;
  mock_exam_id: string;
  score: number;
  accuracy: number;
  speed: number;
  confidence: number;
  correct_count: number;
  wrong_count: number;
  skipped_count: number;
  topic_breakdown: Record<string, number>;
  started_at: string;
  submitted_at: string | null;
}

export interface StudyPlan {
  id: string;
  user_id: string;
  exam_date: string | null;
  subjects: string[];
  mode: PlanMode;
  plan: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface Progress {
  id: string;
  user_id: string;
  subject_id: string | null;
  topic: string;
  knowledge: number;
  accuracy: number;
  speed: number;
  mastery: number;
  updated_at: string;
}

export interface SavedQuestion {
  user_id: string;
  question_id: string;
  created_at: string;
}

export interface Achievement {
  id: string;
  user_id: string;
  slug: string;
  title: string;
  description: string;
  unlocked_at: string;
}
