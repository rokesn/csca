-- CSCA-Prep.com — Supabase Postgres schema
-- Spec: teregttomack.txt Sec 8 (question bank) + Sec 30 (database structure).
--
-- Hierarchy: SUBJECT -> CHAPTER -> TOPIC -> LESSON -> PRACTICE -> MOCK -> ANALYTICS (Sec 27).
-- Every question -> topic -> lesson; every mistake -> topic; every mock mistake -> topic.
--
-- Conventions:
--   * All user-owned tables carry user_id uuid (RLS-friendly, references auth.users).
--   * Public curriculum tables (subjects/chapters/topics/lessons/questions/mock_exams)
--     are world-readable, write-restricted to service_role.
--   * updated_at is maintained by set_updated_at() trigger.

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- Helper: updated_at trigger
-- ---------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ---------------------------------------------------------------------------
-- profiles: one row per auth.users id. Goal/target/exam_date drive the
-- subject-selection wizard (Sec 17) and study planner (Sec 23).
-- ---------------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text,
  display_name text,
  goal text check (goal in (
    'mathematics',
    'mathematics-physics',
    'mathematics-chemistry',
    'mathematics-physics-chemistry',
    'professional-chinese',
    'undecided'
  )),
  target text check (target in (
    'admission',
    'scholarship',
    'both',
    'preparation'
  )),
  teaching_language text not null default 'English' check (teaching_language in ('English', 'Chinese')),
  exam_date date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists trg_profiles_updated_at on public.profiles;
create trigger trg_profiles_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- subjects: Mathematics / Physics / Chemistry / Professional Chinese (Sec 4,14-16)
-- ---------------------------------------------------------------------------
create table if not exists public.subjects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text not null default '',
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- chapters: e.g. Mathematics -> Calculus, Geometry ... (Sec 5)
-- ---------------------------------------------------------------------------
create table if not exists public.chapters (
  id uuid primary key default gen_random_uuid(),
  subject_id uuid not null references public.subjects (id) on delete cascade,
  slug text not null,
  title text not null,
  description text not null default '',
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  unique (subject_id, slug)
);

-- ---------------------------------------------------------------------------
-- topics: e.g. Derivatives, Functions ... each topic has the 5-stage
-- learning system (Sec 6) and a per-question time target ~60-75s (Sec 11).
-- ---------------------------------------------------------------------------
create table if not exists public.topics (
  id uuid primary key default gen_random_uuid(),
  subject_id uuid not null references public.subjects (id) on delete cascade,
  chapter_id uuid not null references public.chapters (id) on delete cascade,
  slug text not null,
  title text not null,
  description text not null default '',
  time_target_sec int not null default 70,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  unique (chapter_id, slug)
);

-- ---------------------------------------------------------------------------
-- lessons: Stage 1 (Learn) + Stage 2 (See) content per topic (Sec 6).
-- stage: learn | worked-example | practice-guide
-- ---------------------------------------------------------------------------
create table if not exists public.lessons (
  id uuid primary key default gen_random_uuid(),
  topic_id uuid not null references public.topics (id) on delete cascade,
  slug text not null,
  title text not null,
  stage text not null default 'learn' check (stage in ('learn', 'worked-example', 'practice-guide')),
  content_md text not null default '',
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (topic_id, slug)
);

drop trigger if exists trg_lessons_updated_at on public.lessons;
create trigger trg_lessons_updated_at
  before update on public.lessons
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- questions: full question-bank architecture (Sec 8 + Sec 30).
-- difficulty: Foundation / Basic / CSCA Standard / Challenging / Advanced
-- source_type: official / original / recalled / practice (Sec 29: transparent sourcing)
-- explanation: step-by-step "Why {correct}?" (Sec 11)
-- why_not: per-distractor "Why not {wrong}?" stored as JSONB array of strings
-- concept: concept tested (Sec 11)
-- ---------------------------------------------------------------------------
create table if not exists public.questions (
  id uuid primary key default gen_random_uuid(),
  subject_id uuid not null references public.subjects (id) on delete cascade,
  chapter text not null default '',
  topic text not null default '',
  subtopic text not null default '',
  difficulty text not null default 'CSCA Standard' check (difficulty in (
    'Foundation',
    'Basic',
    'CSCA Standard',
    'Challenging',
    'Advanced'
  )),
  type text not null default 'mcq' check (type in ('mcq',)),
  stem text not null,
  options jsonb not null default '[]'::jsonb,
  answer int not null check (answer between 0 and 3),
  explanation text not null default '',
  why_not jsonb not null default '[]'::jsonb,
  concept text not null default '',
  source text not null default '',
  source_type text not null default 'original' check (source_type in (
    'official',
    'original',
    'recalled',
    'practice'
  )),
  exam_relevance int not null default 3 check (exam_relevance between 1 and 5),
  estimated_time_sec int not null default 70,
  created_at timestamptz not null default now()
);

create index if not exists idx_questions_subject on public.questions (subject_id);
create index if not exists idx_questions_topic on public.questions (topic);
create index if not exists idx_questions_difficulty on public.questions (difficulty);
create index if not exists idx_questions_source_type on public.questions (source_type);

-- ---------------------------------------------------------------------------
-- attempts: one row per answered question (Sec 30).
-- error_type (Sec 12): concept / forgot-formula / calculation / misread / time / guessed
-- ---------------------------------------------------------------------------
create table if not exists public.attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  question_id uuid not null references public.questions (id) on delete cascade,
  answer int check (answer between 0 and 3),
  is_correct boolean not null default false,
  time_spent_sec int not null default 0,
  error_type text check (error_type in (
    'concept',
    'forgot-formula',
    'calculation',
    'misread',
    'time',
    'guessed'
  )),
  created_at timestamptz not null default now()
);

create index if not exists idx_attempts_user on public.attempts (user_id);
create index if not exists idx_attempts_question on public.attempts (question_id);
create index if not exists idx_attempts_user_created on public.attempts (user_id, created_at desc);

-- ---------------------------------------------------------------------------
-- mistakes: Mistake Book entries, auto-added on wrong answers (Sec 12).
-- ---------------------------------------------------------------------------
create table if not exists public.mistakes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  question_id uuid not null references public.questions (id) on delete cascade,
  topic text not null default '',
  wrong_answer int check (wrong_answer between 0 and 3),
  correct_answer int not null check (correct_answer between 0 and 3),
  error_type text check (error_type in (
    'concept',
    'forgot-formula',
    'calculation',
    'misread',
    'time',
    'guessed'
  )),
  review_count int not null default 0,
  resolved boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_mistakes_user on public.mistakes (user_id);
create index if not exists idx_mistakes_user_created on public.mistakes (user_id, created_at desc);

drop trigger if exists trg_mistakes_updated_at on public.mistakes;
create trigger trg_mistakes_updated_at
  before update on public.mistakes
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- mock_exams: Quick 10q/15m, Half 24q/30m, Full 48q/60m, Final simulation (Sec 18)
-- ---------------------------------------------------------------------------
create table if not exists public.mock_exams (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  subject_id uuid references public.subjects (id) on delete set null,
  mode text not null default 'quick' check (mode in ('quick', 'half', 'full', 'final')),
  total_questions int not null default 10,
  total_sec int not null default 900,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- mock_attempts: result analytics (Sec 19): score, accuracy, speed,
-- confidence, correct/wrong/skipped, per-topic breakdown.
-- ---------------------------------------------------------------------------
create table if not exists public.mock_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  mock_exam_id uuid not null references public.mock_exams (id) on delete cascade,
  score int not null default 0,
  accuracy numeric not null default 0,
  speed numeric not null default 0,
  confidence numeric not null default 0,
  correct_count int not null default 0,
  wrong_count int not null default 0,
  skipped_count int not null default 0,
  topic_breakdown jsonb not null default '{}'::jsonb,
  started_at timestamptz not null default now(),
  submitted_at timestamptz
);

create index if not exists idx_mock_attempts_user on public.mock_attempts (user_id);
create index if not exists idx_mock_attempts_exam on public.mock_attempts (mock_exam_id);

-- ---------------------------------------------------------------------------
-- study_plans: dynamic planner output (Sec 23) + 30/14/7/3/1-day modes (Sec 25).
-- ---------------------------------------------------------------------------
create table if not exists public.study_plans (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  exam_date date,
  subjects text[] not null default '{}',
  mode text not null default '30' check (mode in ('30', '14', '7', '3', '1')),
  plan jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_study_plans_user on public.study_plans (user_id);

drop trigger if exists trg_study_plans_updated_at on public.study_plans;
create trigger trg_study_plans_updated_at
  before update on public.study_plans
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- progress: per-user per-topic mastery (Sec 6 Stage 5 + Sec 7 three skills).
-- knowledge / accuracy / speed 0-100; mastery is the blended score.
-- ---------------------------------------------------------------------------
create table if not exists public.progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  subject_id uuid references public.subjects (id) on delete set null,
  topic text not null default '',
  knowledge numeric not null default 0,
  accuracy numeric not null default 0,
  speed numeric not null default 0,
  mastery numeric not null default 0,
  updated_at timestamptz not null default now(),
  unique (user_id, topic)
);

create index if not exists idx_progress_user on public.progress (user_id);

drop trigger if exists trg_progress_updated_at on public.progress;
create trigger trg_progress_updated_at
  before update on public.progress
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- saved_questions: bookmarked questions (Sec 30).
-- ---------------------------------------------------------------------------
create table if not exists public.saved_questions (
  user_id uuid not null references auth.users (id) on delete cascade,
  question_id uuid not null references public.questions (id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, question_id)
);

-- ---------------------------------------------------------------------------
-- achievements: streaks, mastery badges, mock milestones.
-- ---------------------------------------------------------------------------
create table if not exists public.achievements (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  slug text not null,
  title text not null,
  description text not null default '',
  unlocked_at timestamptz not null default now(),
  unique (user_id, slug)
);

create index if not exists idx_achievements_user on public.achievements (user_id);

-- ---------------------------------------------------------------------------
-- Row Level Security
-- Public curriculum is readable by everyone; user tables are owner-only.
-- ---------------------------------------------------------------------------
alter table public.profiles enable row level security;
alter table public.subjects enable row level security;
alter table public.chapters enable row level security;
alter table public.topics enable row level security;
alter table public.lessons enable row level security;
alter table public.questions enable row level security;
alter table public.attempts enable row level security;
alter table public.mistakes enable row level security;
alter table public.mock_exams enable row level security;
alter table public.mock_attempts enable row level security;
alter table public.study_plans enable row level security;
alter table public.progress enable row level security;
alter table public.saved_questions enable row level security;
alter table public.achievements enable row level security;

-- Profiles: owner read/write.
drop policy if exists "profiles_owner" on public.profiles;
create policy "profiles_owner" on public.profiles
  for all using (auth.uid() = id) with check (auth.uid() = id);

-- Curriculum: public read (anon + authenticated). Writes via service_role only.
drop policy if exists "subjects_public_read" on public.subjects;
create policy "subjects_public_read" on public.subjects for select using (true);
drop policy if exists "chapters_public_read" on public.chapters;
create policy "chapters_public_read" on public.chapters for select using (true);
drop policy if exists "topics_public_read" on public.topics;
create policy "topics_public_read" on public.topics for select using (true);
drop policy if exists "lessons_public_read" on public.lessons;
create policy "lessons_public_read" on public.lessons for select using (true);
drop policy if exists "questions_public_read" on public.questions;
create policy "questions_public_read" on public.questions for select using (true);
drop policy if exists "mock_exams_public_read" on public.mock_exams;
create policy "mock_exams_public_read" on public.mock_exams for select using (true);

-- User-owned tables: owner read/write.
drop policy if exists "attempts_owner" on public.attempts;
create policy "attempts_owner" on public.attempts
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
drop policy if exists "mistakes_owner" on public.mistakes;
create policy "mistakes_owner" on public.mistakes
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
drop policy if exists "mock_attempts_owner" on public.mock_attempts;
create policy "mock_attempts_owner" on public.mock_attempts
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
drop policy if exists "study_plans_owner" on public.study_plans;
create policy "study_plans_owner" on public.study_plans
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
drop policy if exists "progress_owner" on public.progress;
create policy "progress_owner" on public.progress
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
drop policy if exists "saved_questions_owner" on public.saved_questions;
create policy "saved_questions_owner" on public.saved_questions
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
drop policy if exists "achievements_owner" on public.achievements;
create policy "achievements_owner" on public.achievements
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- Seed: subjects (Sec 4, 14-16) + mock exam shapes (Sec 18).
-- Run once; safe to re-run (upserts on slug).
-- ---------------------------------------------------------------------------
insert into public.subjects (slug, title, description) values
  ('mathematics', 'Mathematics', 'Complete CSCA Mathematics ecosystem: study, practice, timed, mocks, mistakes, progress.'),
  ('physics', 'Physics', 'Mechanics, electromagnetism, thermodynamics, optics, modern physics.'),
  ('chemistry', 'Chemistry', 'Basic concepts, equations, solutions/pH, inorganic/organic, redox, equilibrium, electrochemistry.'),
  ('professional-chinese', 'Professional Chinese', 'STEM Chinese and Humanities Chinese tracks.')
on conflict (slug) do update set title = excluded.title, description = excluded.description;

insert into public.mock_exams (slug, title, mode, total_questions, total_sec) values
  ('quick-mock', 'Quick Mock', 'quick', 10, 900),
  ('half-mock', 'Half Mock', 'half', 24, 1800),
  ('full-mock', 'Full Mock', 'full', 48, 3600),
  ('final-simulation', 'Final Exam Simulation', 'final', 48, 3600)
on conflict (slug) do update set
  title = excluded.title,
  mode = excluded.mode,
  total_questions = excluded.total_questions,
  total_sec = excluded.total_sec;
