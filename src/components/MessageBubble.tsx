import type { ChatMessage } from "@/lib/types";
import { SourceCitation } from "./SourceCitation";

interface MessageBubbleProps {
  message: ChatMessage;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-3 ${
          isUser
            ? "bg-blue-600 text-white"
            : "border border-slate-200 bg-white text-slate-800 shadow-sm"
        }`}
      >
        {!isUser && (
          <div className="mb-1 flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-600">
              AI
            </div>
            <span className="text-xs font-medium text-slate-500">CorpPilot</span>
          </div>
        )}
        <div className="whitespace-pre-wrap text-sm leading-relaxed">
          {message.content}
        </div>
        {!isUser && message.sources && (
          <SourceCitation sources={message.sources} />
        )}
      </div>
    </div>
  );
}
