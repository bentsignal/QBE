import { Loader2, ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { markdownComponents } from "./markdown-components";
import { useSmoothText } from "@convex-dev/agent/react";
import { cn } from "@/lib/utils";

interface ReasoningMessageProps {
  message: string;
  loading: boolean;
  mostRecent: boolean;
}

export default function ReasoningMessage({
  message,
  loading,
  mostRecent,
}: ReasoningMessageProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [text] = useSmoothText(message);

  return (
    <div className="my-4 flex w-full flex-col items-start gap-2">
      <div
        className={cn("flex items-center gap-2", "cursor-pointer")}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <ChevronDown className="h-4 w-4" />
        ) : (
          <ChevronRight className="h-4 w-4 " />
        )}
        <span
          className={cn(
            "mr-1 font-semibold",
            loading && mostRecent && "animate-pulse",
          )}
        >
          Reasoning
        </span>
        {loading && mostRecent && <Loader2 className="h-4 w-4 animate-spin" />}
      </div>
      {isOpen && (
        <div
          className="bg-card prose dark:prose-invert scrollbar-thin
          scrollbar-thumb-background scrollbar-track-transparent relative 
          mt-2 max-h-96 w-full max-w-72 overflow-y-auto rounded-md border 
          p-4 sm:max-w-full"
        >
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
            components={markdownComponents}
          >
            {text}
          </ReactMarkdown>
        </div>
      )}
    </div>
  );
}
