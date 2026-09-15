import type { Metadata } from "next";
import FunctionsChapterClient from "./client";

export const metadata: Metadata = {
  title: "Functions — Full Chapter | CSCA-Prep",
  description:
    "Complete Functions chapter: 25 lessons, master formula sheet, traps, problem recognition, practice bank and previous CSCA exam questions with answers.",
};

export default function FunctionsChapterPage() {
  return <FunctionsChapterClient />;
}
