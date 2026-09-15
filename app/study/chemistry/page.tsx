import type { Metadata } from "next";
import SubjectSyllabusPage from "../../../components/subject-syllabus";

export const metadata: Metadata = {
  title: "Chemistry Study | CSCA-Prep",
  description:
    "Study CSCA Chemistry: basic concepts, inorganic, organic, physical chemistry & experiments — every topic with its own lesson page.",
};

export default function ChemistryPage() {
  return <SubjectSyllabusPage slug="chemistry" backHref="/study" backLabel="← Study" />;
}
