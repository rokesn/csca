import { notFound } from "next/navigation";
import TopicShell from "@/components/topic-shell";
import { getSubjectTopic } from "@/data/subject-topics";

export async function generateMetadata({ params }: { params: { topic: string } }) {
  const found = getSubjectTopic("physics", params.topic);
  return {
    title: found ? `${found.topic.title} — Physics | CSCA-Prep` : "Physics Topic | CSCA-Prep",
  };
}

export default function PhysicsTopicPage({ params }: { params: { topic: string } }) {
  const found = getSubjectTopic("physics", params.topic);
  if (!found) notFound();
  return (
    <TopicShell
      subjectSlug="physics"
      topic={found.topic}
      prev={found.prev}
      next={found.next}
    />
  );
}
