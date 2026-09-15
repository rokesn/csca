import type { Metadata } from "next";
import SubjectSyllabusPage from "@/components/subject-syllabus";

export const metadata: Metadata = {
  title: "Professional Chinese Syllabus — Full Topic Breakdown | CSCA-Prep",
  description:
    "Complete CSCA Professional Chinese syllabus: reading, vocabulary, grammar, writing mechanics. Humanities / STEM streams. 80 MCQ, 90 min.",
};

export default function ChineseSyllabusPage() {
  return <SubjectSyllabusPage slug="chinese" />;
}
