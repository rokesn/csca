import { notFound } from "next/navigation";
import TopicShell from "@/components/topic-shell";
import { getSubjectTopic } from "@/data/subject-topics";

export async function generateMetadata({ params }: { params: { topic: string } }) {
  const found = getSubjectTopic("chinese", params.topic);
  return {
    title: found ? `${found.topic.title} — Professional Chinese | CSCA-Prep` : "Chinese Topic | CSCA-Prep",
  };
}

export default function ChineseTopicPage({ params }: { params: { topic: string } }) {
  const found = getSubjectTopic("chinese", params.topic);
  if (!found) notFound();
  return (
    <TopicShell
      subjectSlug="chinese"
      topic={found.topic}
      prev={found.prev}
      next={found.next}
    />
  );
}
