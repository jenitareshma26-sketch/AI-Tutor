import { Bot } from "lucide-react";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";

function ChatWindow({ messages, isTyping, error, bottomRef, onDeleteMessage }) {
  const showIntro = messages.length === 1 && messages[0]?.role === "assistant";

  return (
    <div className="scrollbar-gutter-stable flex-1 overflow-y-auto bg-[linear-gradient(180deg,#f3efef_0%,#f9f8f8_100%)] px-4 py-5 sm:px-6">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-4">
      {!messages.length ? (
        <div className="flex min-h-[58vh] items-center justify-center">
          <div className="max-w-xl rounded-xl border border-[#E6CBA8] bg-white p-8 text-center shadow-md">
            <div className="mx-auto mb-5 flex h-18 w-18 items-center justify-center rounded-3xl bg-maroon text-white shadow-md ring-1 ring-maroon/15">
              <Bot size={30} strokeWidth={2.3} />
            </div>
            <h3 className="text-2xl font-black text-[#2E2E2E] sm:text-3xl">AI Tutor ready to help</h3>
            <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-gray-600 sm:text-base">
              Ask a question to begin. You can type, speak, or use both together for a smoother tutoring flow.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4 pb-4">
          {showIntro && (
            <div className="rounded-2xl border border-[#E6CBA8] bg-[#f6ecdd] p-5 shadow-sm animate-fadeUp">
              <p className="text-xs font-black uppercase tracking-[0.28em] text-maroon">Your AI tutor is ready</p>
              <p className="mt-2 text-sm leading-relaxed text-[#2E2E2E]">
                Ask a question and Tutorix AI will explain it clearly, step by step, with examples.
              </p>
            </div>
          )}

          {messages.map((message, index) => (
            <MessageBubble
              key={`${message.role}-${index}-${message.content.slice(0, 12)}`}
              role={message.role}
              content={message.content}
              onDelete={() => onDeleteMessage?.(index)}
            />
          ))}

          {isTyping && <TypingIndicator />}

          {error && (
            <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 shadow-sm">
              {error}
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      )}
      </div>
    </div>
  );
}

export default ChatWindow;
