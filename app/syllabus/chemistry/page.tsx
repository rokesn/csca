import type { Metadata } from "next";
import SubjectSyllabusPage from "@/components/subject-syllabus";

export const metadata: Metadata = {
  title: "Chemistry Syllabus — Full Topic Breakdown | CSCA-Prep",
  description:
    "Complete CSCA Chemistry syllabus: basic concepts, inorganic, organic, physical chemistry & experiments. 48 MCQ, 60 min.",
};

export default function ChemistrySyllabusPage() {
  return <SubjectSyllabusPage slug="chemistry" />;
}
