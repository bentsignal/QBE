import { useEffect, useRef } from "react";
import useComposerInput from "../hooks/use-composer-input";
import useSendMessage from "../hooks/use-send-message";

export default function ComposerInput({
  showInstantLoad,
}: {
  showInstantLoad?: () => void;
}) {
  const { value, setPrompt, disabled, placeholder } = useComposerInput();
  const { sendMessage } = useSendMessage();

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (value === "" && textareaRef.current) {
      textareaRef.current.style.height = "auto";
    } else if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      showInstantLoad?.();
      sendMessage();
    }
  };

  return (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={(e) => setPrompt(e.target.value)}
      onKeyDown={handleKeyPress}
      placeholder={placeholder}
      disabled={disabled}
      rows={1}
      maxLength={20000}
      className={`file:text-foreground placeholder:text-muted-foreground selection:bg-primary 
              selection:text-primary-foreground focus-visible:ring-ring/0 
              aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 scrollbar-thin 
              scrollbar-thumb-secondary scrollbar-track-transparent flex h-auto max-h-32 min-h-[36px] w-full 
              min-w-0 resize-none overflow-y-auto py-2 text-base transition-[color,box-shadow] outline-none 
              focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed 
              disabled:opacity-50 sm:px-3 md:text-sm`}
    />
  );
}
