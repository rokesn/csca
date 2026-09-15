import { notFound } from "next/navigation";
import TopicShell from "@/components/topic-shell";
import { getSubjectTopic } from "@/data/subject-topics";

export async function generateMetadata({ params }: { params: { topic: string } }) {
  const found = getSubjectTopic("chemistry", params.topic);
  return {
    title: found ? `${found.topic.title} — Chemistry | CSCA-Prep` : "Chemistry Topic | CSCA-Prep",
  };
}

export default function ChemistryTopicPage({ params }: { params: { topic: string } }) {
  const found = getSubjectTopic("chemistry", params.topic);
  if (!found) notFound();
  return (
    <TopicShell
      subjectSlug="chemistry"
      topic={found.topic}
      prev={found.prev}
      next={found.next}
    />
  );
}
