import { UIMessage } from "ai";
import { Loader2 } from "lucide-react";
import useStreamingMessages from "../hooks/use-streaming-messages";
import { Message } from "./messages";
import { cn } from "@/lib/utils";

interface StreamingMessagesProps {
  threadId: string;
  messages: UIMessage[];
}

export default function StreamingMessages({
  threadId,
  messages,
}: StreamingMessagesProps) {
  const { streamingMessages, waiting, hasNewMessages } = useStreamingMessages({
    threadId,
    messages,
  });

  return (
    <div
      className={cn(
        "w-full flex flex-col justify-start items-start max-w-full gap-16",
        hasNewMessages && "min-h-[calc(100vh-30rem)]",
      )}
    >
      {streamingMessages.map((message) => (
        <Message key={message.id} message={message} streaming={true} />
      ))}
      {waiting && (
        <div className="flex justify-start items-start min-h-[30vh]">
          <Loader2 className="h-4 w-4 animate-spin" />
        </div>
      )}
    </div>
  );
}
