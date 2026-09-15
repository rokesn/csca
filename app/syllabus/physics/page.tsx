import type { Metadata } from "next";
import SubjectSyllabusPage from "@/components/subject-syllabus";

export const metadata: Metadata = {
  title: "Physics Syllabus — Full Topic Breakdown | CSCA-Prep",
  description:
    "Complete CSCA Physics syllabus: mechanics, electricity & magnetism, thermodynamics, optics & modern physics. 48 MCQ, 60 min.",
};

export default function PhysicsSyllabusPage() {
  return <SubjectSyllabusPage slug="physics" />;
}
