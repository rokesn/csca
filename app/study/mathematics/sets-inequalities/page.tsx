import type { Metadata } from "next";
import SetsChapterClient from "./chapter-client";

export const metadata: Metadata = {
  title: "Sets & Inequalities — Full Chapter | CSCA-Prep",
  description:
    "Complete Sets & Inequalities chapter: 16 lessons, master formula sheet, traps, problem recognition and 100 CSCA-style practice problems with answers.",
};

export default function SetsChapterPage() {
  return <SetsChapterClient />;
}
