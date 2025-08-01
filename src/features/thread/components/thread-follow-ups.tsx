import { useConvexAuth, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import useUsage from "@/features/billing/hooks/use-usage";
import useSendMessage from "@/features/composer/hooks/use-send-message";

export default function ThreadFollowUps({ threadId }: { threadId: string }) {
  const { isAuthenticated } = useConvexAuth();
  const args = isAuthenticated ? { threadId } : "skip";
  const followUpQuestions = useQuery(
    api.thread.thread_queries.getThreadFollowUpQuestions,
    args,
  );
  const empty = !followUpQuestions || followUpQuestions.length === 0;

  const { sendMessage } = useSendMessage();
  const { usage } = useUsage();

  if (usage?.limitHit) {
    return null;
  }

  return (
    <div
      className="flex flex-col gap-4 transition-opacity duration-1000 mt-4 max-w-[500px]"
      style={{
        opacity: empty ? 0 : 1,
      }}
    >
      {followUpQuestions?.map((question) => (
        <div
          key={question}
          className="text-sm text-secondary-foreground bg-secondary  
          rounded-md p-4 hover:bg-accent hover:cursor-pointer
          shadow-md transition-all duration-300"
          onClick={() => {
            sendMessage({ prompt: question, redirect: false });
          }}
        >
          {question}
        </div>
      ))}
    </div>
  );
}
