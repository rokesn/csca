import type { Metadata } from "next";
import SubjectSyllabusPage from "../../../components/subject-syllabus";

export const metadata: Metadata = {
  title: "Physics Study | CSCA-Prep",
  description:
    "Study CSCA Physics: mechanics, electricity & magnetism, thermodynamics, optics & modern physics — every topic with its own lesson page.",
};

export default function PhysicsPage() {
  return <SubjectSyllabusPage slug="physics" backHref="/study" backLabel="← Study" />;
}
