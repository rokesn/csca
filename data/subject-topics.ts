// Per-topic breakdown for the non-Math subjects.
// Each syllabus module becomes a chapter; each bullet point becomes a topic
// with its own page at /study/[subject]/[topic]. Full lessons land on those
// pages later — for now they render a structured placeholder shell.

import { SYLLABUS_SUBJECTS } from "./syllabus-overview";

export interface SubjectTopic {
  id: string;
  slug: string;
  subjectSlug: string;
  subjectName: string;
  chapter: string;
  title: string;
  description: string;
}

export interface SubjectChapter {
  id: string;
  title: string;
  description: string;
  topics: SubjectTopic[];
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

/** Chapters + topics for a syllabus subject (physics | chemistry | chinese). */
export function buildSubjectChapters(subjectSlug: string): SubjectChapter[] {
  const entry = SYLLABUS_SUBJECTS.find((s) => s.slug === subjectSlug);
  if (!entry) return [];
  const used = new Set<string>();
  return entry.config.modules.map((m, mi) => {
    const topics: SubjectTopic[] = m.points.map((point, pi) => {
      let slug = slugify(point);
      if (used.has(slug)) slug = `${slug}-${pi + 1}`;
      used.add(slug);
      return {
        id: `${subjectSlug}-m${mi + 1}-t${pi + 1}`,
        slug,
        subjectSlug,
        subjectName: entry.config.name,
        chapter: m.title,
        title: point,
        description: `${point} — a ${entry.config.name} exam point in “${m.title}”.`,
      };
    });
    return {
      id: `${subjectSlug}-ch${mi + 1}`,
      title: m.title,
      description: `Module ${mi + 1} of the ${entry.config.name} syllabus.`,
      topics,
    };
  });
}

/** Flat topic list for a subject, in chapter order. */
export function getSubjectTopics(subjectSlug: string): SubjectTopic[] {
  return buildSubjectChapters(subjectSlug).flatMap((ch) => ch.topics);
}

/** Look up one topic by subject + slug. */
export function getSubjectTopic(
  subjectSlug: string,
  topicSlug: string,
): { topic: SubjectTopic; prev: SubjectTopic | null; next: SubjectTopic | null } | null {
  const all = getSubjectTopics(subjectSlug);
  const idx = all.findIndex((t) => t.slug === topicSlug);
  if (idx === -1) return null;
  return {
    topic: all[idx],
    prev: idx > 0 ? all[idx - 1] : null,
    next: idx < all.length - 1 ? all[idx + 1] : null,
  };
}
