import type { Metadata } from "next";
import SubjectSyllabusPage from "../../../components/subject-syllabus";

export const metadata: Metadata = {
  title: "Professional Chinese Study | CSCA-Prep",
  description:
    "Study Professional Chinese: reading, vocabulary, grammar, writing mechanics (Humanities / STEM) — every topic with its own lesson page.",
};

export default function ChinesePage() {
  return <SubjectSyllabusPage slug="chinese" backHref="/study" backLabel="← Study" />;
}
